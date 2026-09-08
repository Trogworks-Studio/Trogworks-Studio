# Trogworks Studio

Trogworks Studio, bataklığın içinden çıkan fikirleri, oyunları ve projeleri bir araya getirdiğimiz yaratıcı geliştirme platformumuz.

Burada temel olarak **projeleri takip edebilir, oyunları inceleyebilir, geliştirme sürecini görebilir ve blog içeriklerini okuyabilirsiniz.**

## 🐸 Platformda Neler Var?

### 🎮 Oyunlar

Geliştirdiğimiz ve üzerinde çalıştığımız oyunları buradan takip edebilirsiniz.

Her oyunun kendi sayfasında oyun hakkında temel bilgiler, görseller ve geliştirme sürecine dair içerikler bulunur.

### 🛠️ Projeler

Trogworks bünyesinde geliştirilen projeleri burada bulabilirsiniz.

Projelerin zaman içerisindeki gelişimini de takip edebilirsiniz. Yeni özellikler, değişiklikler ve önemli geliştirme aşamaları proje sayfalarına eklenir.

### 📝 Blog

Stüdyo içerisindeki geliştirme süreci, oyun tasarımı ve çeşitli konulardaki yazılarımızı burada paylaşıyoruz.

Blog yazıları düzenli olarak güncellenebilir ve yeni içerikler eklenebilir.

### 📬 İletişim

Bizimle iletişime geçmek veya bir fikir, öneri ya da geri bildirim paylaşmak için iletişim formunu kullanabilirsiniz.

### 📩 Bülten

Trogworks'teki yeni oyunlardan, projelerden ve önemli gelişmelerden haberdar olmak isterseniz bültene kayıt olabilirsiniz.

## 🌿 Temel Mantık

Platformu mümkün olduğunca basit tuttuk.

**Oyunlar →** Neler geliştiriyoruz?
**Projeler →** Neler üzerinde çalışıyoruz?
**Blog →** Neler oluyor?
**İletişim →** Bize nasıl ulaşabilirsiniz?

Yeni içerikler eklendikçe bunları platform üzerinden takip edebilirsiniz.

## 🐸 Trogworks'e Hoş Geldiniz

Trogworks'i sadece oyunlarımızı göstereceğimiz bir site olarak değil, zaman içerisinde büyüyen kendi küçük evrenimiz olarak geliştiriyoruz.

Yeni oyunlar, yeni projeler ve yeni içeriklerle burayı sürekli geliştirmeye devam edeceğiz.

**Bataklığa hoş geldiniz.**

## Kurulum ve Admin Paneli

1. `.env.example` dosyasını `.env` olarak kopyalayın.
2. PostgreSQL sağlayıcınızdan `DATABASE_URL` ve `DIRECT_URL` değerlerini ekleyin.
3. `NEXTAUTH_SECRET`, `SETUP_SECRET` ve `ADMIN_PASSWORD` için güçlü, benzersiz değerler kullanın. Secret üretmek için `openssl rand -base64 32` çalıştırabilirsiniz.
4. Bağımlılıkları kurup veritabanı şemasını uygulayın:

```bash
npm install
npm run db:push
```

5. Uygulamayı başlatın: `npm run dev`
6. Tek seferlik admin hesabını oluşturmak için tarayıcıda `/api/setup?secret=SETUP_SECRET` adresini açın.
7. `/admin/login` üzerinden `ADMIN_EMAIL` ve `ADMIN_PASSWORD` ile giriş yapın.

İletişim formu, alıcı e-posta adresini ziyaretçilere göstermeden mesajları PostgreSQL içindeki `ContactMessage` tablosuna kaydeder. Mesajlar admin dashboard üzerinde görünür. E-posta bildirimi eklemek için ayrıca bir SMTP veya transactional e-posta sağlayıcısı yapılandırılmalıdır.

## Discord Topluluğu

Site, Trogworks Discord widget'ını kullanır. Topluluk davet adresi: https://discord.gg/M9exXDmgqS
