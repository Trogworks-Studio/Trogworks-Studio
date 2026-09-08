import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
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

    const existing = await prisma.post.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu slug zaten kullaniliyor" },
        { status: 409 }
      );
    }

    const post = await prisma.post.create({
      data: {
        ...parsed.data,
        publishedAt: parsed.data.published ? new Date() : null,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("admin posts POST error", err);
    return NextResponse.json(
      { error: "Yazi olusturulurken bir sorun olustu" },
      { status: 500 }
    );
  }
}
