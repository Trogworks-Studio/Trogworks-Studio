import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { applyXpGain } from "@/lib/gameLogic";

export function getActiveQuests() {
  return db.prepare("SELECT * FROM quests WHERE active = 1 ORDER BY type, xp_reward").all();
}

// Kullanıcının görevlerini, henüz atanmamışsa otomatik olarak
// "in_progress" durumunda oluşturarak birlikte döndürür.
export function getQuestsForUser(userId) {
  const quests = getActiveQuests();
  const insert = db.prepare(
    `INSERT OR IGNORE INTO user_quests (id, user_id, quest_id) VALUES (?, ?, ?)`
  );
  for (const q of quests) {
    insert.run(randomUUID(), userId, q.id);
  }

  return db
    .prepare(
      `SELECT q.*, uq.id as user_quest_id, uq.progress, uq.status, uq.claimed_at
       FROM quests q
       JOIN user_quests uq ON uq.quest_id = q.id
       WHERE q.active = 1 AND uq.user_id = ?
       ORDER BY q.type, q.xp_reward`
    )
    .all(userId);
}

// Bir görevde ilerleme kaydeder (ör. oyunda X tıklama, blog okuma vb.)
// İlerleme hedefe ulaşınca durumu "completed" yapar.
export function progressQuest(userId, questId, amount = 1) {
  const uq = db
    .prepare("SELECT * FROM user_quests WHERE user_id = ? AND quest_id = ?")
    .get(userId, questId);
  if (!uq || uq.status !== "in_progress") return null;

  const quest = db.prepare("SELECT * FROM quests WHERE id = ?").get(questId);
  const newProgress = Math.min(uq.progress + amount, quest.target);
  const status = newProgress >= quest.target ? "completed" : "in_progress";

  db.prepare("UPDATE user_quests SET progress = ?, status = ? WHERE id = ?").run(
    newProgress,
    status,
    uq.id
  );
  return { ...uq, progress: newProgress, status };
}

export function claimQuest(userId, userQuestId) {
  const uq = db
    .prepare("SELECT * FROM user_quests WHERE id = ? AND user_id = ?")
    .get(userQuestId, userId);
  if (!uq) throw new Error("Görev bulunamadı.");
  if (uq.status !== "completed") throw new Error("Bu görev henüz tamamlanmadı.");

  const quest = db.prepare("SELECT * FROM quests WHERE id = ?").get(uq.quest_id);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);

  const result = applyXpGain({
    level: user.level,
    xp: user.xp,
    totalXp: user.total_xp,
    gainedXp: quest.xp_reward,
  });

  db.prepare(
    `UPDATE users SET level = ?, xp = ?, total_xp = ?, gear_coins = gear_coins + ? WHERE id = ?`
  ).run(result.level, result.xp, result.totalXp, quest.coin_reward, userId);

  db.prepare(
    `UPDATE user_quests SET status = 'claimed', claimed_at = datetime('now') WHERE id = ?`
  ).run(uq.id);

  let unlockedRewards = [];
  if (result.unlockedRewardLevels.length > 0) {
    const insert = db.prepare(
      `INSERT OR IGNORE INTO user_rewards (id, user_id, reward_id) VALUES (?, ?, ?)`
    );
    const findReward = db.prepare("SELECT * FROM rewards WHERE level = ?");
    for (const lvl of result.unlockedRewardLevels) {
      const reward = findReward.get(lvl);
      if (reward) {
        insert.run(randomUUID(), userId, reward.id);
        unlockedRewards.push(reward);
      }
    }
  }

  return {
    quest,
    xpGained: quest.xp_reward,
    coinsGained: quest.coin_reward,
    leveledUp: result.levelsGained.length > 0,
    unlockedRewards,
  };
}
