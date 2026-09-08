import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getQuestsForUser } from "@/lib/queries/quests";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }
  const quests = getQuestsForUser(session.user.id);
  return NextResponse.json({ quests });
}
