import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; updateId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    await prisma.projectUpdate.delete({ where: { id: params.updateId } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin project update DELETE error", err);
    return NextResponse.json(
      { error: "Guncelleme silinirken bir sorun olustu" },
      { status: 500 }
    );
  }
}
