/**
 * Trogworks Studio — veritabanı tohumlama (seed) betiği.
 * Çalıştırmak için: npm run db:seed
 */
const path = require("node:path");
const fs = require("node:fs");
const crypto = require("node:crypto");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "trogworks.db");
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(
  path.join(process.cwd(), "src", "lib", "schema.sql"),
  "utf-8"
);
db.exec(schema);

const uuid = () => crypto.randomUUID();

function upsertByUnique(table, uniqueCol, uniqueVal, row) {
  const existing = db.prepare(`SELECT id FROM ${table} WHERE ${uniqueCol} = ?`).get(uniqueVal);
  const cols = Object.keys(row);
  if (existing) {
    const setClause = cols.map((c) => `${c} = @${c}`).join(", ");
    db.prepare(`UPDATE ${table} SET ${setClause} WHERE id = @id`).run({
      ...row,
      id: existing.id,
    });
    return existing.id;
  }
  const id = uuid();
  const insertCols = ["id", ...cols];
  const placeholders = insertCols.map((c) => `@${c}`).join(", ");
  db.prepare(
    `INSERT INTO ${table} (${insertCols.join(", ")}) VALUES (${placeholders})`
  ).run({ id, ...row });
  return id;
}

// ---------- Ödüller (her 25 seviyede bir) ----------
const rewards = [
  {
    level: 25,
    title: "Çırak Rozeti",
    description:
      "Atölyeye ayak bastığından beri 25 seviye tırmandın. Trogworks çırakları arasına resmen katıldın — özel 'Çırak' rütbesi ve profil çerçevesi kazandın.",
    image_url: "/images/mascots/mascot-thumbsup-bust.png",
    badge_color: "brass",
  },
  {
    level: 50,
    title: "Kıdemli Zanaatkâr Unvanı",
    description:
      "50. seviye! Artık atölyenin en güvenilir ellerinden birisin. Forum ve Discord'da özel 'Zanaatkâr' rütbesi, ayrıca özel bir avatar çerçevesi seni bekliyor.",
    image_url: "/images/mascots/mascot-tinkerer.png",
    badge_color: "emerald",
  },
  {
    level: 75,
    title: "Gizli Cephane Erişimi",
    description:
      "75 seviyeye ulaşan az sayıda goblin, atölyenin 'GİZLİ' etiketli arşivine erişebilir: erken erişim projeleri ve kapalı beta davetleri.",
    image_url: "/images/mascots/mascot-office-worker.png",
    badge_color: "crimson",
  },
  {
    level: 100,
    title: "Trogworks Efsanesi",
    description:
      "100. seviye — Trogworks tarihine adını yazdırdın. Özel 'Efsane' unvanı, sınırlı üretim dijital rozet ve topluluk duvarında onur köşesi kazandın.",
    image_url: "/images/mascots/mascot-electric-thumbsup.png",
    badge_color: "brass",
  },
];

for (const r of rewards) {
  upsertByUnique("rewards", "level", r.level, r);
}

// ---------- Görevler ----------
const quests = [
  {
    title: "Çekiç Salla",
    description: "Atölye oyununda 10 kez tıkla ve dişli topla.",
    type: "daily",
    icon: "hammer",
    xp_reward: 40,
    coin_reward: 15,
    target: 10,
    active: 1,
  },
  {
    title: "Sabah Kahvesi",
    description: "Bugün siteye giriş yap ve kontrol paneline göz at.",
    type: "daily",
    icon: "mug-hot",
    xp_reward: 20,
    coin_reward: 5,
    target: 1,
    active: 1,
  },
  {
    title: "Duyuruları Takip Et",
    description: "Blog bölümünden en az bir gönderi oku.",
    type: "daily",
    icon: "scroll",
    xp_reward: 25,
    coin_reward: 5,
    target: 1,
    active: 1,
  },
  {
    title: "Vitrin Gezisi",
    description: "Projeler veya Oyunlar sayfasını ziyaret et.",
    type: "weekly",
    icon: "compass",
    xp_reward: 60,
    coin_reward: 20,
    target: 1,
    active: 1,
  },
  {
    title: "Topluluk Ruhu",
    description: "Topluluk sayfasındaki skor tablosuna göz at.",
    type: "weekly",
    icon: "users",
    xp_reward: 50,
    coin_reward: 15,
    target: 1,
    active: 1,
  },
  {
    title: "Usta Zanaatkâr",
    description: "Atölye oyununda tek oturumda 100 tıklamaya ulaş.",
    type: "story",
    icon: "wrench",
    xp_reward: 150,
    coin_reward: 50,
    target: 100,
    active: 1,
  },
];

for (const q of quests) {
  upsertByUnique("quests", "title", q.title, q);
}

// ---------- Blog / Duyurular ----------
const posts = [
  {
    slug: "trogworks-atolyesine-hos-geldiniz",
    title: "Trogworks Atölyesine Hoş Geldiniz",
    excerpt:
      "Yeraltındaki en gürültülü, en dişli dolu atölyeye hoş geldin. İşte burada neler bulacağını anlatıyoruz.",
    content:
      "Trogworks Studio olarak yazılım ve oyun projelerimizi tek bir çatı altında topladık. Bu blog; duyurularımızı, proje gelişmelerini ve topluluk haberlerini takip edebileceğin ana kaynağın olacak.\n\nAtölye oyununda tıklayarak XP kazanabilir, seviye atladıkça özel ödüller açabilir ve Görevler bölümünden günlük/haftalık görevleri tamamlayarak dişli ve XP kazanabilirsin. Her 25 seviyede bir atölyenin en gizli köşelerinden özel bir ödül seni bekliyor.\n\nBize Discord'da katılmayı, geri bildirim bırakmayı ve elbette atölye çekicini elden bırakmamayı unutma.",
    category: "duyuru",
    cover_image: "/images/mascots/mascot-waving-bust.png",
    author: "Trogworks Ekibi",
  },
  {
    slug: "atolye-oyunu-yayinda",
    title: "Atölye Oyunu Artık Yayında: Tıkla, Dişli Topla, Seviye Atla",
    excerpt:
      "Basic seviye web oyunumuz canlıya alındı. Her tıklama bir dişli, her seviye bir hikaye.",
    content:
      "Uzun süredir üzerinde çalıştığımız atölye tıklama oyunu artık herkese açık! Oyun mekaniği basit: atölyedeki dişliye tıkla, XP ve dişli parası (Gear Coin) topla, seviye atla.\n\nHer 25 seviyede bir özel bir ödül kilidini açıyorsun — rozetler, unvanlar ve ileride eklenecek daha fazlası. Kritik tıklamalar (%12 şans) normalin 3 katı XP veriyor, o yüzden şansını dene!\n\nOyunu Görevler bölümündeki günlük görevlerle birleştirerek çok daha hızlı ilerleyebilirsin.",
    category: "gelisme",
    cover_image: "/images/mascots/mascot-electric-thumbsup.png",
    author: "Trogworks Ekibi",
  },
  {
    slug: "topluluk-etkinligi-mart",
    title: "Topluluk Etkinliği: Gizli Cephane Yarışması",
    excerpt:
      "Discord topluluğumuzda ilk büyük etkinliğimizi duyuruyoruz — ödüller Gear Coin ve özel rozetler.",
    content:
      "Topluluğumuzla birlikte büyümeye devam ediyoruz. Bu ayki etkinlikte, Discord sunucumuzdaki #gizli-cephane kanalında paylaşacağımız bulmacaları çözen ilk 10 kişiye özel 'Kaşif' rozeti ve bonus Gear Coin hediye edeceğiz.\n\nKatılmak için Discord sunucumuza katılman ve topluluk kurallarını okuman yeterli. Görüşmek üzere, zanaatkârlar!",
    category: "topluluk",
    cover_image: "/images/mascots/mascot-rogue.png",
    author: "Topluluk Yöneticisi",
  },
];

for (const p of posts) {
  upsertByUnique("blog_posts", "slug", p.slug, p);
}

// ---------- Yazılım Projeleri ----------
const projects = [
  {
    slug: "gearlink-api-gateway",
    name: "GearLink API Gateway",
    summary: "Mikroservisler arası trafiği yöneten hafif ve hızlı bir API ağ geçidi.",
    description:
      "GearLink, Trogworks'ün iç servislerini birbirine bağlayan, kimlik doğrulama, hız sınırlama ve loglama katmanlarını tek bir noktada toplayan açık kaynaklı bir API ağ geçidi projesidir. Node.js üzerine inşa edilmiştir ve eklenti mimarisiyle genişletilebilir.",
    tech_stack: "Node.js,TypeScript,Redis,Docker",
    status: "yayinda",
    repo_url: "https://github.com/",
    live_url: null,
    cover_image: "/images/mascots/mascot-wrench-portrait.png",
  },
  {
    slug: "cogwatch-monitoring",
    name: "CogWatch",
    summary: "Sunucu ve servis sağlığını gerçek zamanlı izleyen açık kaynak izleme paneli.",
    description:
      "CogWatch, atölyemizin arka planda çalışan tüm servislerini tek bir panelden izlememizi sağlayan bir gözlemlenebilirlik aracıdır. Metrik toplama, uyarı kuralları ve özelleştirilebilir gösterge panelleri sunar.",
    tech_stack: "Go,PostgreSQL,React",
    status: "gelistiriliyor",
    repo_url: "https://github.com/",
    live_url: null,
    cover_image: "/images/mascots/mascot-coder-laptop.png",
  },
  {
    slug: "trogworks-cli",
    name: "Trogworks CLI",
    summary: "Ekip içi proje şablonlarını saniyeler içinde oluşturan komut satırı aracı.",
    description:
      "Yeni bir proje başlatmak artık tek komut: `trog new`. Trogworks CLI, ekibimizin standartlarına uygun proje iskeletlerini, lint kurallarını ve CI şablonlarını otomatik olarak oluşturur.",
    tech_stack: "Rust,Clap",
    status: "yayinda",
    repo_url: "https://github.com/",
    live_url: null,
    cover_image: "/images/mascots/mascot-coder-relax.png",
  },
];

for (const p of projects) {
  upsertByUnique("projects", "slug", p.slug, p);
}

// ---------- Oyunlar ----------
const games = [
  {
    slug: "atolye-tiklama-oyunu",
    name: "Atölye: Dişli Avcısı",
    summary: "Sitemizin kendi web oyunu — tıkla, XP topla, seviye atla, özel ödüller kazan.",
    description:
      "Trogworks'ün resmi tarayıcı içi oyunu. Basit ama bağımlılık yapan bir tıklama döngüsü etrafında kurulu: her tıklama XP ve Gear Coin kazandırır, seviye atladıkça atölye yükseltmeleri açılır ve her 25 seviyede özel bir ödülün kilidi açılır.",
    genre: "Tıklama / Simülasyon",
    status: "yayinda",
    play_url: "/game",
    cover_image: "/images/mascots/mascot-explorer-map.png",
  },
  {
    slug: "derinlik-madencisi",
    name: "Derinlik Madencisi",
    summary: "Prosedürel olarak üretilen tünellerde ilerleyip nadir cevherler toplayacağın rogue-lite bir keşif oyunu.",
    description:
      "Geliştirme aşamasında olan bu projede, goblin kahramanımız yer altı tünellerinde ilerleyerek nadir madenler topluyor, tuzaklardan kaçıyor ve atölyeye yeni malzemeler taşıyor.",
    genre: "Rogue-lite",
    status: "gelistiriliyor",
    play_url: null,
    cover_image: "/images/mascots/mascot-tired-explorer.png",
  },
  {
    slug: "gizli-cephane-bulmaca",
    name: "Gizli Cephane: Bulmaca Serisi",
    summary: "Her hafta yeni bir bölümle gelen, atölye temalı mantık bulmacaları.",
    description:
      "Topluluk etkinliklerimizle senkronize çalışan haftalık bulmaca serisi. Her bölüm, atölyenin gizli arşivlerinden bir hikaye parçası açığa çıkarıyor.",
    genre: "Bulmaca",
    status: "arsiv",
    play_url: null,
    cover_image: "/images/mascots/mascot-shocked.png",
  },
];

for (const g of games) {
  upsertByUnique("games", "slug", g.slug, g);
}

// ---------- Demo kullanıcı ----------
const demoEmail = "goblin@trogworks.studio";
const existingDemo = db.prepare("SELECT id FROM users WHERE email = ?").get(demoEmail);
if (!existingDemo) {
  const id = uuid();
  const passwordHash = bcrypt.hashSync("atolye1234", 10);
  db.prepare(
    `INSERT INTO users (id, name, email, password_hash, role, level, xp, total_xp, gear_coins)
     VALUES (?, ?, ?, ?, 'admin', 24, 340, 2140, 480)`
  ).run(id, "Baş Zanaatkâr", demoEmail, passwordHash);
  console.log(`Demo kullanıcı oluşturuldu: ${demoEmail} / atolye1234`);
} else {
  console.log("Demo kullanıcı zaten mevcut, atlanıyor.");
}

console.log("Tohumlama tamamlandı.");
db.close();
