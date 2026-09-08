import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Bulunamadi" }, { status: 404 });

  return NextResponse.json(post);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Gecersiz veri" },
        { status: 400 }
      );
    }

    const duplicate = await prisma.post.findFirst({
      where: { slug: parsed.data.slug, NOT: { id: params.id } },
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Bu slug baska bir yazida kullaniliyor" },
        { status: 409 }
      );
    }

    const current = await prisma.post.findUnique({ where: { id: params.id } });

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        // Ilk kez yayinlaniyorsa publishedAt'i simdi ata, zaten yayindaysa koru
        publishedAt: parsed.data.published
          ? current?.publishedAt ?? new Date()
          : null,
      },
    });
    return NextResponse.json(post);
  } catch (err) {
    console.error("admin post PATCH error", err);
    return NextResponse.json(
      { error: "Yazi guncellenirken bir sorun olustu" },
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
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin post DELETE error", err);
    return NextResponse.json(
      { error: "Yazi silinirken bir sorun olustu" },
      { status: 500 }
    );
  }
}
