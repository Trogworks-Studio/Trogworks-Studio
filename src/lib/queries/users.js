import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { applyXpGain, rollClickXp } from "@/lib/gameLogic";

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase());
}

export function getUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export function createUser({ name, email, password }) {
  const existing = getUserByEmail(email);
  if (existing) {
    throw new Error("Bu e-posta adresi zaten kayıtlı.");
  }
  const id = randomUUID();
  const passwordHash = bcrypt.hashSync(password, 10);
  db.prepare(
    `INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)`
  ).run(id, name, email.toLowerCase(), passwordHash);
  return getUserById(id);
}

export function verifyPassword(user, password) {
  return bcrypt.compareSync(password, user.password_hash);
}

export function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatar_url,
    role: user.role,
    bio: user.bio,
    level: user.level,
    xp: user.xp,
    totalXp: user.total_xp,
    gearCoins: user.gear_coins,
  };
}

// Tıklama oyunu: XP kazandırır, gerekirse seviye atlatır ve
// 25 katı seviyelerde ödül kilidini açar.
export function grantClickXp(userId) {
  const user = getUserById(userId);
  if (!user) throw new Error("Kullanıcı bulunamadı.");

  // Basit hız sınırlama: saniyede en fazla ~6 tıklama
  const now = Date.now();
  const last = user.last_click_at ? new Date(user.last_click_at).getTime() : 0;
  if (now - last < 150) {
    return { rateLimited: true, user: publicUser(user) };
  }

  const roll = rollClickXp();
  const result = applyXpGain({
    level: user.level,
    xp: user.xp,
    totalXp: user.total_xp,
    gainedXp: roll.xp,
  });

  db.prepare(
    `UPDATE users SET level = ?, xp = ?, total_xp = ?, gear_coins = gear_coins + ?, last_click_at = datetime('now') WHERE id = ?`
  ).run(result.level, result.xp, result.totalXp, roll.coins, userId);

  let unlockedRewards = [];
  if (result.unlockedRewardLevels.length > 0) {
    unlockedRewards = unlockRewardsForLevels(userId, result.unlockedRewardLevels);
  }

  const updated = getUserById(userId);
  return {
    rateLimited: false,
    user: publicUser(updated),
    gainedXp: roll.xp,
    gainedCoins: roll.coins,
    isCrit: roll.isCrit,
    leveledUp: result.levelsGained.length > 0,
    levelsGained: result.levelsGained,
    xpForNext: result.xpForNext,
    unlockedRewards,
  };
}

function unlockRewardsForLevels(userId, levels) {
  const unlocked = [];
  const insert = db.prepare(
    `INSERT OR IGNORE INTO user_rewards (id, user_id, reward_id) VALUES (?, ?, ?)`
  );
  const findReward = db.prepare("SELECT * FROM rewards WHERE level = ?");
  for (const lvl of levels) {
    const reward = findReward.get(lvl);
    if (reward) {
      insert.run(randomUUID(), userId, reward.id);
      unlocked.push(reward);
    }
  }
  return unlocked;
}

export function getUserRewards(userId) {
  return db
    .prepare(
      `SELECT r.*, ur.unlocked_at FROM user_rewards ur
       JOIN rewards r ON r.id = ur.reward_id
       WHERE ur.user_id = ? ORDER BY r.level ASC`
    )
    .all(userId);
}

export function getAllRewards() {
  return db.prepare("SELECT * FROM rewards ORDER BY level ASC").all();
}

export function getLeaderboard(limit = 10) {
  return db
    .prepare(
      `SELECT id, name, avatar_url, level, total_xp, gear_coins
       FROM users ORDER BY total_xp DESC, level DESC LIMIT ?`
    )
    .all(limit);
}

export function getCommunityStats() {
  const { count } = db.prepare("SELECT COUNT(*) as count FROM users").get();
  const { totalLevels } = db
    .prepare("SELECT COALESCE(SUM(level),0) as totalLevels FROM users")
    .get();
  const { questsClaimed } = db
    .prepare("SELECT COUNT(*) as questsClaimed FROM user_quests WHERE status = 'claimed'")
    .get();
  return { memberCount: count, totalLevels, questsClaimed };
}
