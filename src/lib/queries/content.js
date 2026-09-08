import { db } from "@/lib/db";

// ---------- Blog ----------
export function getBlogPosts({ category } = {}) {
  if (category && category !== "all") {
    return db
      .prepare("SELECT * FROM blog_posts WHERE category = ? ORDER BY published_at DESC")
      .all(category);
  }
  return db.prepare("SELECT * FROM blog_posts ORDER BY published_at DESC").all();
}

export function getBlogPostBySlug(slug) {
  return db.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(slug);
}

export function getCommentsForPost(postId) {
  return db
    .prepare(
      `SELECT c.*, u.name as user_name, u.avatar_url as user_avatar
       FROM comments c JOIN users u ON u.id = c.user_id
       WHERE c.post_id = ? ORDER BY c.created_at ASC`
    )
    .all(postId);
}

// ---------- Yazılım Projeleri ----------
export function getProjects({ status } = {}) {
  if (status && status !== "all") {
    return db
      .prepare("SELECT * FROM projects WHERE status = ? ORDER BY created_at DESC")
      .all(status);
  }
  return db.prepare("SELECT * FROM projects ORDER BY created_at DESC").all();
}

export function getProjectBySlug(slug) {
  return db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug);
}

// ---------- Oyunlar ----------
export function getGames({ status } = {}) {
  if (status && status !== "all") {
    return db
      .prepare("SELECT * FROM games WHERE status = ? ORDER BY created_at DESC")
      .all(status);
  }
  return db.prepare("SELECT * FROM games ORDER BY created_at DESC").all();
}

export function getGameBySlug(slug) {
  return db.prepare("SELECT * FROM games WHERE slug = ?").get(slug);
}
