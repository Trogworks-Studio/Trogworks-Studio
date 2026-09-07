import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectUpdateSchema } from "@/lib/validation";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
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
