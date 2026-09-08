import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { gameSchema } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const game = await prisma.game.findUnique({ where: { id: params.id } });
  if (!game) return NextResponse.json({ error: "Bulunamadi" }, { status: 404 });

  return NextResponse.json(game);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = gameSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Gecersiz veri" },
        { status: 400 }
      );
    }

    const duplicate = await prisma.game.findFirst({
      where: { slug: parsed.data.slug, NOT: { id: params.id } },
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Bu slug baska bir oyunda kullaniliyor" },
        { status: 409 }
      );
    }

    const game = await prisma.game.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json(game);
  } catch (err) {
    console.error("admin game PATCH error", err);
    return NextResponse.json(
      { error: "Oyun guncellenirken bir sorun olustu" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    await prisma.game.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin game DELETE error", err);
    return NextResponse.json(
      { error: "Oyun silinirken bir sorun olustu" },
      { status: 500 }
    );
  }
}
