import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { grantClickXp } from "@/lib/queries/users";
import { progressQuest, getQuestsForUser } from "@/lib/queries/quests";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Oynamak için giriş yapmalısın." }, { status: 401 });
  }

  const result = grantClickXp(session.user.id);

  // "Atölyede tıkla" tipi görevleri otomatik ilerlet
  try {
    const quests = getQuestsForUser(session.user.id);
    const clickQuest = quests.find(
      (q) => q.icon === "hammer" && q.status === "in_progress"
    );
    if (clickQuest) {
      progressQuest(session.user.id, clickQuest.id, 1);
    }
  } catch {
    // görev ilerlemesi opsiyonel, sessizce yok say
  }

  return NextResponse.json(result);
}
