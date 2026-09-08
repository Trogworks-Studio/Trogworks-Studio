import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { claimQuest } from "@/lib/queries/quests";

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }
  try {
    const { userQuestId } = await request.json();
    if (!userQuestId) {
      return NextResponse.json({ error: "Görev belirtilmedi." }, { status: 400 });
    }
    const result = claimQuest(session.user.id, userQuestId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
