import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Yorum yapmak için giriş yapmalısın." }, { status: 401 });
  }
  const { postId, body } = await request.json();
  if (!postId || !body?.trim()) {
    return NextResponse.json({ error: "Yorum boş olamaz." }, { status: 400 });
  }
  const id = randomUUID();
  db.prepare(
    "INSERT INTO comments (id, post_id, user_id, body) VALUES (?, ?, ?, ?)"
  ).run(id, postId, session.user.id, body.trim().slice(0, 1000));

  const comment = db
    .prepare(
      `SELECT c.*, u.name as user_name, u.avatar_url as user_avatar
       FROM comments c JOIN users u ON u.id = c.user_id WHERE c.id = ?`
    )
    .get(id);

  return NextResponse.json({ comment });
}
