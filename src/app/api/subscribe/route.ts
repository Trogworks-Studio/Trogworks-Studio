import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email("Gecerli bir e-posta gir"),
});

export async function POST(req: NextRequest) {
  try {
    const requestLimit = rateLimit(req, "subscribe", 3, 60 * 60 * 1000);
    if (!requestLimit.allowed) {
      return NextResponse.json(
        { error: "Cok fazla istek gonderildi. Lutfen daha sonra tekrar dene." },
        { status: 429, headers: { "Retry-After": String(requestLimit.retryAfter) } }
      );
    }

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
