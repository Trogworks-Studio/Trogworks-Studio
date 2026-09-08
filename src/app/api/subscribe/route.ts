import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email("Gecerli bir e-posta gir"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Gecersiz veri" },
        { status: 400 }
      );
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    await prisma.subscriber.create({ data: { email: parsed.data.email } });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("subscribe POST error", err);
    return NextResponse.json(
      { error: "Kayit sirasinda bir sorun olustu" },
      { status: 500 }
    );
  }
}
