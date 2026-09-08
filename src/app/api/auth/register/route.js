import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/queries/users";

const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı.").max(40),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı."),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Geçersiz form verisi.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const user = createUser(parsed.data);
    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Kayıt sırasında bir hata oluştu." },
      { status: 400 }
    );
  }
}
