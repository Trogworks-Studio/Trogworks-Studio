import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; updateId: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const update = await prisma.projectUpdate.findFirst({
      where: { id: params.updateId, projectId: params.id },
      select: { id: true },
    });
    if (!update) {
      return NextResponse.json({ error: "Bulunamadi" }, { status: 404 });
    }

    await prisma.projectUpdate.delete({ where: { id: update.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin project update DELETE error", err);
    return NextResponse.json(
      { error: "Guncelleme silinirken bir sorun olustu" },
      { status: 500 }
    );
  }
}
