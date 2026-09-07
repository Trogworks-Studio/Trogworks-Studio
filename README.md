# Trogworks Studio

Bataklık temalı (Disenchantment esintili "Trog" konsepti), tam işlevsel bir
yazılım stüdyosu sitesi. **Next.js 14 (App Router) + TypeScript + TailwindCSS +
FontAwesome + Prisma/PostgreSQL + NextAuth** ile yazıldı.

## Özellikler

- **Herkese açık site:** Ana sayfa, Projeler (liste + detay), Oyunlar
  (liste + detay), Blog (liste + detay, Markdown destekli), Hakkımızda,
  İletişim formu, bülten (newsletter) kaydı.
- **Gerçek admin paneli:** `/admin/login` üzerinden giriş yapıp projeleri,
  oyunları ve blog yazılarını ekleyip düzenleyebilir, silebilirsiniz. Her
  proje için ayrıca zaman içindeki "gelişme kayıtları" eklenebilir.
- **Gerçek veritabanı:** Tüm içerik PostgreSQL'de (Prisma ORM ile) saklanır;
  hiçbir şey sabit kodlanmış değildir.
- **SEO:** Dinamik `sitemap.xml`, `robots.txt`, her sayfa için özel
  metadata/OpenGraph/Twitter etiketleri, JSON-LD yapısal veri
  (Organization, SoftwareApplication, VideoGame, BlogPosting).
- **Kimlik doğrulama:** NextAuth (credentials/e-posta+şifre), admin
  rotaları middleware ile korunur.

## Gereksinimler

- Node.js 18.18 veya üzeri
- Bir PostgreSQL veritabanı: en kolayı [Supabase](https://supabase.com) veya
  [Neon](https://neon.tech) üzerinde ücretsiz bir proje açmak (ikisi de
  dakikalar içinde bağlantı adresi verir).

## Kurulum

1. Bağımlılıkları kurun:

   ```bash
   npm install
   ```

2. `.env.example` dosyasını `.env` olarak kopyalayın ve doldurun:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URL` / `DIRECT_URL`: Supabase/Neon panelinden aldığınız
     PostgreSQL bağlantı adresi. Supabase kullanıyorsanız "Connection
     Pooling" adresini `DATABASE_URL`'e, "Direct connection" adresini
     `DIRECT_URL`'e yazın (pooler olmayan basit kurulumlarda ikisi aynı
     olabilir).
   - `NEXTAUTH_SECRET`: `openssl rand -base64 32` komutuyla üretin.
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME`: İlk admin
     kullanıcınızın bilgileri (seed script bunu oluşturur).

3. Veritabanı şemasını oluşturun:

   ```bash
   npm run db:push
   ```

4. İlk admin kullanıcısını ve örnek içerikleri ekleyin:

   ```bash
   npm run db:seed
   ```

5. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   ```

   Site: http://localhost:3000
   Admin paneli: http://localhost:3000/admin/login
   (`.env` dosyasındaki `ADMIN_EMAIL` / `ADMIN_PASSWORD` ile giriş yapın)

## Görseller hakkında

Bu proje bilinçli olarak bir **dosya yükleme** sistemi içermez (ekstra
bir depolama servisi — S3, Cloudinary vb. — gerektirmemesi için). Bunun
yerine admin panelindeki "Kapak görseli URL" gibi alanlara, görseli önceden
başka bir yere (örn. Cloudinary, Imgur, Supabase Storage, ya da kendi
CDN'iniz) yükleyip oradan aldığınız linki yapıştırırsınız.

`/public` klasörüne kendi `favicon.ico`, `og-default.png` (1200×630),
`icon-192.png` ve `icon-512.png` dosyalarınızı eklemeniz önerilir — bu
dosyalar `layout.tsx` ve `manifest.ts` içinde referans alınmıştır ama proje
içine hazır olarak konmamıştır.

## Vercel'e Deploy

1. Depoyu GitHub'a itin, Vercel'de "Import Project" ile bağlayın.
2. Vercel proje ayarlarına `.env` dosyasındaki tüm değişkenleri girin
   (`NEXTAUTH_URL`'i canlı domain'inizle güncelleyin).
3. Build komutu zaten `prisma generate && next build` olarak ayarlı
   (`package.json` → `build` script'i).
4. İlk deploy sonrası, veritabanını canlıya taşımak için yerelde
   `DATABASE_URL`'i prod veritabanına çevirip bir kez
   `npm run db:push && npm run db:seed` çalıştırmanız yeterli.

## Proje Yapısı

```
src/
  app/
    (site)/         → herkese açık sayfalar (Navbar/Footer ile)
    admin/           → korumalı yönetim paneli
    api/             → route handler'lar (contact, subscribe, auth, admin CRUD)
    sitemap.ts, robots.ts, manifest.ts
  components/        → paylaşılan ve admin'e özel React bileşenleri
  lib/                → prisma client, auth, yardımcı fonksiyonlar, zod şemaları
  types/               → paylaşılan TypeScript tipleri
prisma/
  schema.prisma       → veritabanı modeli
  seed.ts             → ilk admin kullanıcısı + örnek içerik
```

## Tema

Renk paleti ve tipografi `tailwind.config.ts` ve `src/app/globals.css`
içinde tanımlıdır: bataklık yeşili/siyahı (`bog`, `ooze`), mistik mor
(`rune`), kemik/parşömen (`bone`) ve kor turuncusu (`ember`). Başlıklarda
"Fraunces", gövde metinde "Inter" fontu kullanılır (ikisi de
`next/font/google` ile otomatik yüklenir, ek kuruluma gerek yoktur).
