# Trogworks Studio

Disenchantment'ın tatlı-karanlık fantastik atölye ruhuna bağlı, goblin
temalı bir stüdyo web sitesi. Next.js (App Router) + TailwindCSS v4 +
FontAwesome ile yazıldı; **gerçek bir backend** ile çalışır (SQLite tabanlı,
kendi API rotalarımız üzerinden).

## Özellikler

- 🧑‍💻 **Yazılım Projeleri** vitrini (`/projects`)
- 🎮 **Oyunlar** vitrini (`/games`) + resmi tarayıcı içi tıklama oyunu (`/game`)
- 📜 **Blog / Duyurular** (`/blog`) — kategori filtreleri + yorumlar
- 👥 **Topluluk** sayfası — skor tablosu, istatistikler, Discord bağlantısı
- ✅ **Görevler** (`/quests`) — Discord tarzı günlük/haftalık/hikaye görev panosu
- 📈 **Seviye/XP sistemi** — her tıklama veya tamamlanan görev XP kazandırır,
  seviye eğrisi hafif artan bir üstel eğridir
- 🏆 **Özel seviye ödülleri** — her 25 seviyede bir (`REWARD_INTERVAL`,
  `src/lib/gameLogic.js` içinde ayarlanabilir) özel bir ödülün kilidi açılır
- 🔐 **Email/şifre ile kayıt & giriş** (NextAuth v5, JWT oturum stratejisi)
- 🖥️ **Kontrol Paneli** (`/dashboard`) — seviye, XP, Gear Coin, ödül rafı, görev özeti

## Teknoloji Yığını

| Katman         | Teknoloji                                             |
| -------------- | ------------------------------------------------------ |
| Framework      | Next.js 16 (App Router, Turbopack)                     |
| Stil           | TailwindCSS v4 (özel tema tokenleri, `globals.css`)     |
| İkonlar        | FontAwesome (`react-fontawesome`)                       |
| Fontlar        | `@fontsource/fredericka-the-great`, `@fontsource/baloo-2` (kendi sunucumuzdan servis edilir, harici bağımlılık yok) |
| Kimlik Doğrulama | NextAuth v5 (Credentials Provider, JWT)               |
| Veritabanı     | SQLite (`better-sqlite3`) — dosya tabanlı, kurulumsuz    |
| Şifreleme      | `bcryptjs`                                              |
| Doğrulama      | `zod`                                                    |

> **Not — neden Prisma değil?** Bu proje ilk olarak Prisma ile
> planlandı, ancak geliştirme ortamının ağ kısıtlamaları Prisma'nın
> ikili motor dosyalarını indirmesini engelledi. Bunun yerine
> `better-sqlite3` üzerine ince bir sorgu katmanı (`src/lib/queries/`)
> yazıldı — tamamen taşınabilir, harici indirme gerektirmez ve
> production'da da sorunsuz çalışır. Dilersen ileride Prisma'ya veya
> PostgreSQL'e geçmek için `src/lib/db.js` ve `src/lib/queries/*`
> dosyalarını değiştirmen yeterli.

## Kurulum

```bash
# 1. Bağımlılıkları kur
npm install

# 2. .env dosyasını kontrol et / güncelle (örnek zaten mevcut)
#    AUTH_SECRET production'da mutlaka değiştirilmeli!
cat .env

# 3. Veritabanını oluştur ve örnek verilerle doldur
npm run db:seed

# 4. Geliştirme sunucusunu başlat
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

### Demo Hesap

Seed script'i bir demo hesap oluşturur:

- **E-posta:** `goblin@trogworks.studio`
- **Şifre:** `atolye1234`
- Seviye 24, 2140 toplam XP ile başlar — 25. seviye ödülüne çok yakın.

### Production Build

```bash
npm run build
npm run start
```

`.env` dosyasında `AUTH_TRUST_HOST="true"` tanımlı — bu, uygulamayı
reverse proxy arkasında veya farklı bir portta/hostta çalıştırırken
NextAuth'un "UntrustedHost" hatası vermesini engeller. Production'a
alırken `NEXTAUTH_URL` değerini gerçek alan adınızla güncelleyin.

## Proje Yapısı

```
src/
  app/                    → Next.js App Router sayfaları ve API rotaları
    api/
      auth/[...nextauth]/ → NextAuth handler
      auth/register/      → Kayıt uç noktası
      game/click/         → Oyun tıklama → XP/seviye/ödül mantığı
      game/state/         → Oyuncunun güncel durumu
      quests/             → Görev listeleme
      quests/claim/       → Görev ödülü talep etme
      comments/           → Blog yorumları
    projects/, games/, blog/, community/, quests/, game/,
    dashboard/, login/, register/
  components/             → Yeniden kullanılabilir UI bileşenleri
  lib/
    db.js                 → SQLite bağlantı singleton'ı (şemayı otomatik kurar)
    schema.sql             → Veritabanı şeması
    gameLogic.js            → XP eğrisi, seviye atlama, ödül kilidi mantığı
    auth.js                 → NextAuth yapılandırması
    format.js                → Görüntüleme yardımcı fonksiyonları
    queries/                 → Veritabanı erişim katmanı (users, quests, content)
scripts/
  seed.js                 → Örnek veri + demo kullanıcı oluşturma betiği
public/images/mascots/    → Sağladığınız goblin illüstrasyonları
```

## Oyun / Seviye Mekaniği Özeti

- Her tıklama temel olarak **4 XP** + **1 Gear Coin** kazandırır.
- %12 ihtimalle **kritik tıklama** gerçekleşir → XP'nin 3 katı, 3 Gear Coin.
- Bir sonraki seviye için gereken XP: `80 × 1.14^(seviye-1)` (yaklaşık,
  `src/lib/gameLogic.js` → `xpToNextLevel`).
- **Her 25 seviyede bir** (`REWARD_INTERVAL`) özel bir `Reward` kaydı
  varsa otomatik olarak kilidi açılır (bkz. `scripts/seed.js` → `rewards`
  dizisi: seviye 25/50/75/100 için tanımlı örnekler). Yeni ödül eklemek
  için seed dosyasına yeni bir `{ level, title, description, ... }`
  nesnesi eklemeniz yeterli.
- Basit hız sınırlama: art arda 150ms'den kısa sürede gelen tıklamalar
  yok sayılır (spam / bot koruması).

## Görev (Quest) Sistemi

Görevler `daily` / `weekly` / `story` tiplerinde tanımlanır
(`scripts/seed.js`). Bir kullanıcı ilk kez `/quests` sayfasını veya
`/api/quests` uç noktasını ziyaret ettiğinde, aktif tüm görevler
otomatik olarak o kullanıcıya "in_progress" durumunda atanır. İlerleme;
oyun tıklamaları (`hammer` ikonlu görev) ve blog yazısı okuma (`scroll`
ikonlu görev) gibi eylemlerle otomatik güncellenir. Hedefe ulaşınca
görev "completed" olur ve kullanıcı "Ödülü Al" butonuyla XP/Gear Coin'i
talep edebilir.

## Yeni İçerik Ekleme

Şu an için içerik (proje, oyun, blog yazısı, görev, ödül) `scripts/seed.js`
üzerinden yönetiliyor — script tekrar çalıştırıldığında mevcut kayıtları
`slug`/`title`/`level` alanına göre günceller (upsert). Gerçek bir admin
paneli bu kapsamın dışında bırakıldı; ihtiyaç halinde `src/lib/queries/`
fonksiyonlarını kullanan basit bir `/admin` alanı eklenebilir.

## Görseller

Sağladığınız 14 goblin illüstrasyonu `public/images/mascots/` altında
anlamlı dosya adlarıyla saklanıyor ve site genelinde (hero, oyun,
görev boş durumları, giriş/kayıt sayfaları, ödül rafı vb.) kullanılıyor.
Production'a almadan önce bu görselleri (her biri ~1-2MB) sıkıştırmanızı
öneririz (`sharp` veya `squoosh` gibi araçlarla WebP'ye çevirmek dosya
boyutunu ciddi şekilde azaltır).

## Bilinen Sınırlamalar / Sonraki Adımlar

- Discord OAuth entegrasyonu yok (email/şifre tercih edildi) — istenirse
  `src/lib/auth.js` içine `next-auth/providers/discord` eklenebilir.
- Admin paneli yok; içerik yönetimi seed script'i üzerinden yapılıyor.
- SQLite tek dosyalı bir veritabanıdır — yüksek trafikli production için
  PostgreSQL'e geçiş önerilir (sorgu katmanı bunun için ayrıştırılmış
  durumda).
