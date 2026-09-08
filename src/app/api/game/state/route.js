import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserById, publicUser, getUserRewards } from "@/lib/queries/users";
import { xpToNextLevel } from "@/lib/gameLogic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }
  const user = getUserById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
  }
  const rewards = getUserRewards(session.user.id);
  return NextResponse.json({
    user: publicUser(user),
    xpForNext: xpToNextLevel(user.level),
    rewards,
  });
}
