import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(1, "Ad gerekli").max(120),
  email: z.string().email("Gecerli bir e-posta gir"),
  subject: z.string().min(1, "Konu gerekli").max(200),
  message: z.string().min(1, "Mesaj bos olamaz").max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const requestLimit = rateLimit(req, "contact", 5, 60 * 60 * 1000);
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

    const message = await prisma.contactMessage.create({
      data: parsed.data,
    });

    return NextResponse.json({ ok: true, id: message.id }, { status: 201 });
  } catch (err) {
    console.error("contact POST error", err);
    return NextResponse.json(
      { error: "Mesaj gonderilirken bir sorun olustu" },
      { status: 500 }
    );
  }
}
