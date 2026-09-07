import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@trogworks.studio";
  const adminPassword = process.env.ADMIN_PASSWORD || "trog-degistir-123";
  const adminName = process.env.ADMIN_NAME || "Bataklik Ustasi";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`Admin kullanicisi hazir: ${admin.email}`);

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.create({
      data: {
        slug: "bogscript",
        title: "BogScript",
        tagline: "Bataklikta dogan, tarayicida kosan betik dili",
        description:
          "BogScript, kucuk araclar ve otomasyon betikleri yazmak icin tasarlanmis, hafif ve gomulmesi kolay bir betik dili. Trogworks atolyesinin ilk acik kaynak projesi.",
        status: "ERKEN_ERISIM",
        techStack: ["TypeScript", "WebAssembly", "Node.js"],
        features: [
          "Sifir bagimlilikla calisan yorumlayici",
          "Tarayici ve sunucuda ayni API",
          "5dk icinde kurulum",
        ],
        websiteUrl: "https://example.com/bogscript",
        sourceUrl: "https://github.com/example/bogscript",
        version: "0.4.0",
        progress: 65,
        featured: true,
        publishedAt: new Date(),
      },
    });
    console.log("Ornek proje eklendi: BogScript");
  }

  const gameCount = await prisma.game.count();
  if (gameCount === 0) {
    await prisma.game.create({
      data: {
        slug: "trollkeep",
        title: "Trollkeep",
        tagline: "Kendi bataklik kalendini kur, komsu klanlari alt et",
        description:
          "Trollkeep, izometrik bir koloni-yonetim oyunu. Trog klanini buyut, kaynak topla, rakip klanlarla mudahale et. Tamamen tarayicida oynanir.",
        status: "GELISTIRILIYOR",
        genres: ["Strateji", "Koloni Yonetimi"],
        platforms: ["WEB"],
        progress: 30,
        featured: true,
        publishedAt: new Date(),
      },
    });
    console.log("Ornek oyun eklendi: Trollkeep");
  }

  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await prisma.post.create({
      data: {
        slug: "trogworks-atolyesi-aciliyor",
        title: "Trogworks Atolyesi kapilarini aciyor",
        excerpt:
          "Bataklikta kurulan yeni yazilim atolyemiz Trogworks, ilk projeleriyle birlikte yayinda.",
        content:
          "# Merhaba Bataklik Sakinleri\n\nTrogworks Studio olarak calismalarimizi artik burada, herkese acik sekilde paylasacagiz. Gelistirdigimiz her arac ve oyun icin ilerleme guncellemeleri, teknik notlar ve yayina cikis duyurulari bu blogdan takip edilebilecek.\n\nIlk projemiz **BogScript** ve ilk oyunumuz **Trollkeep** uzerinde calismalara devam ediyoruz. Takipte kalin.",
        tags: ["duyuru"],
        published: true,
        publishedAt: new Date(),
      },
    });
    console.log("Ornek blog yazisi eklendi.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
