// Trogworks Atölyesi — seviye/XP mekaniği
//
// Her seviye bir öncekinden biraz daha fazla XP ister (hafif artan eğri).
// Her 25 seviyede bir ("her 20-30 seviyede özel ödül" isteğine göre)
// özel bir ödül kilidi açılır — bkz. REWARD_INTERVAL ve lib/seed.js.

export const REWARD_INTERVAL = 25;

// Belirli bir seviyeyi tamamlamak için gereken XP miktarı.
export function xpToNextLevel(level) {
  return Math.round(80 * Math.pow(1.14, level - 1));
}

// Ham XP kazanımını mevcut seviye/xp durumuna uygulayıp
// yeni seviye, kalan xp ve atlanan seviyeleri döndürür.
export function applyXpGain({ level, xp, totalXp, gainedXp }) {
  let newLevel = level;
  let newXp = xp + gainedXp;
  const newTotalXp = totalXp + gainedXp;
  const levelsGained = [];

  let needed = xpToNextLevel(newLevel);
  while (newXp >= needed) {
    newXp -= needed;
    newLevel += 1;
    levelsGained.push(newLevel);
    needed = xpToNextLevel(newLevel);
  }

  const unlockedRewardLevels = levelsGained.filter((lvl) => lvl % REWARD_INTERVAL === 0);

  return {
    level: newLevel,
    xp: newXp,
    totalXp: newTotalXp,
    xpForNext: needed,
    levelsGained,
    unlockedRewardLevels,
  };
}

// Bir tıklamada kazanılan taban XP + küçük şans faktörü ("kritik dişli").
export function rollClickXp() {
  const base = 4;
  const critChance = 0.12;
  const isCrit = Math.random() < critChance;
  return {
    xp: isCrit ? base * 3 : base,
    coins: isCrit ? 3 : 1,
    isCrit,
  };
}
