import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { projectUpdateSchema } from "@/lib/validation";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = projectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Gecersiz veri" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      select: { id: true },
    });
    if (!project) {
      return NextResponse.json({ error: "Proje bulunamadi" }, { status: 404 });
    }

    const update = await prisma.projectUpdate.create({
      data: { ...parsed.data, projectId: params.id },
    });
    return NextResponse.json(update, { status: 201 });
  } catch (err) {
    console.error("admin project update POST error", err);
    return NextResponse.json(
      { error: "Guncelleme eklenirken bir sorun olustu" },
      { status: 500 }
    );
  }
}
