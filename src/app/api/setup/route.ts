import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Bu route, terminal kullanmadan tarayicidan tek seferlik admin kullanicisi
// olusturmak icindir. Ziyaret sekli:
//   https://SENIN-SITEN.vercel.app/api/setup?secret=SETUP_SECRET
// SETUP_SECRET, Vercel ortam degiskenlerine eklenen gizli bir kelimedir.
// Islem tamamlandiktan sonra bu adresi tekrar ziyaret etmenin bir zarari
// yoktur (ayni admin zaten varsa hicbir sey yapmaz).
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.SETUP_SECRET) {
    return NextResponse.json(
      { error: "SETUP_SECRET ortam degiskeni Vercel'de tanimli degil." },
      { status: 500 }
    );
  }

  if (secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Yetkisiz: secret hatali." }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Atolye Sahibi";

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      {
        error:
          "ADMIN_EMAIL ve/veya ADMIN_PASSWORD ortam degiskenleri Vercel'de tanimli degil.",
      },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (existing) {
      return NextResponse.json({
        ok: true,
        message: `"${adminEmail}" adresiyle bir admin kullanicisi zaten var. Herhangi bir sey degistirilmedi.`,
      });
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        passwordHash,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      ok: true,
      message: `Admin kullanicisi olusturuldu: ${adminEmail}. Simdi /admin/login adresinden bu e-posta ve ADMIN_PASSWORD ile giris yapabilirsin.`,
    });
  } catch (err) {
    console.error("setup GET error", err);
    return NextResponse.json(
      {
        error:
          "Bir sorun olustu. Veritabani baglantisi (DATABASE_URL/DIRECT_URL) dogru mu kontrol et.",
      },
      { status: 500 }
    );
  }
}
