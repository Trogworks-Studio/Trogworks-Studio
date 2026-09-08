-- Trogworks Studio veritabanı şeması (SQLite)

CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_url    TEXT NOT NULL DEFAULT '/images/mascots/mascot-waving-bust.png',
  role          TEXT NOT NULL DEFAULT 'member',
  bio           TEXT,
  level         INTEGER NOT NULL DEFAULT 1,
  xp            INTEGER NOT NULL DEFAULT 0,
  total_xp      INTEGER NOT NULL DEFAULT 0,
  gear_coins    INTEGER NOT NULL DEFAULT 0,
  last_click_at TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quests (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'daily',
  icon        TEXT NOT NULL DEFAULT 'scroll',
  xp_reward   INTEGER NOT NULL DEFAULT 50,
  coin_reward INTEGER NOT NULL DEFAULT 10,
  target      INTEGER NOT NULL DEFAULT 1,
  active      INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user_quests (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quest_id    TEXT NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  progress    INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'in_progress',
  claimed_at  TEXT,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, quest_id)
);

CREATE TABLE IF NOT EXISTS rewards (
  id          TEXT PRIMARY KEY,
  level       INTEGER NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url   TEXT NOT NULL DEFAULT '/images/mascots/mascot-electric-thumbsup.png',
  badge_color TEXT NOT NULL DEFAULT 'brass'
);

CREATE TABLE IF NOT EXISTS user_rewards (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id   TEXT NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  unlocked_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, reward_id)
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id           TEXT PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL,
  content      TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT 'duyuru',
  cover_image  TEXT NOT NULL DEFAULT '/images/mascots/mascot-coder-relax.png',
  author       TEXT NOT NULL DEFAULT 'Trogworks Ekibi',
  published_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS comments (
  id         TEXT PRIMARY KEY,
  post_id    TEXT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS projects (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  summary     TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack  TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'gelistiriliyor',
  repo_url    TEXT,
  live_url    TEXT,
  cover_image TEXT NOT NULL DEFAULT '/images/mascots/mascot-tinkerer.png',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS games (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  summary     TEXT NOT NULL,
  description TEXT NOT NULL,
  genre       TEXT NOT NULL DEFAULT 'Macera',
  status      TEXT NOT NULL DEFAULT 'gelistiriliyor',
  play_url    TEXT,
  cover_image TEXT NOT NULL DEFAULT '/images/mascots/mascot-explorer-map.png',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_user_quests_user ON user_quests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_user ON user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
