import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { updates: { orderBy: { createdAt: "desc" } } },
  });
  if (!project) return NextResponse.json({ error: "Bulunamadi" }, { status: 404 });

  return NextResponse.json(project);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Gecersiz veri" },
        { status: 400 }
      );
    }

    const duplicate = await prisma.project.findFirst({
      where: { slug: parsed.data.slug, NOT: { id: params.id } },
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Bu slug baska bir projede kullaniliyor" },
        { status: 409 }
      );
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json(project);
  } catch (err) {
    console.error("admin project PATCH error", err);
    return NextResponse.json(
      { error: "Proje guncellenirken bir sorun olustu" },
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
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin project DELETE error", err);
    return NextResponse.json(
      { error: "Proje silinirken bir sorun olustu" },
      { status: 500 }
    );
  }
}
