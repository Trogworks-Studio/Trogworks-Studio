import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { gameSchema } from "@/lib/validation";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const games = await prisma.game.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(games);
}

export async function POST(req: NextRequest) {
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

    const existing = await prisma.game.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu slug zaten kullaniliyor" },
        { status: 409 }
      );
    }

    const game = await prisma.game.create({ data: parsed.data });
    return NextResponse.json(game, { status: 201 });
  } catch (err) {
    console.error("admin games POST error", err);
    return NextResponse.json(
      { error: "Oyun olusturulurken bir sorun olustu" },
      { status: 500 }
    );
  }
}
