import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
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

    const existing = await prisma.project.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu slug zaten kullaniliyor" },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({ data: parsed.data });
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("admin projects POST error", err);
    return NextResponse.json(
      { error: "Proje olusturulurken bir sorun olustu" },
      { status: 500 }
    );
  }
}
