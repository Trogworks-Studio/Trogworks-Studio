import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCode,
  faGamepad,
  faScroll,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import GameCard from "@/components/GameCard";
import BlogCard from "@/components/BlogCard";
import SpeechBubble from "@/components/SpeechBubble";

export const revalidate = 60;

async function getHomeData() {
  try {
    const [featuredProjects, featuredGames, latestPosts, stats] =
      await Promise.all([
        prisma.project.findMany({
          where: { featured: true },
          orderBy: { publishedAt: "desc" },
          take: 3,
        }),
        prisma.game.findMany({
          where: { featured: true },
          orderBy: { publishedAt: "desc" },
          take: 2,
        }),
        prisma.post.findMany({
          where: { published: true },
          orderBy: { publishedAt: "desc" },
          take: 3,
        }),
        Promise.all([
          prisma.project.count(),
          prisma.game.count(),
          prisma.post.count({ where: { published: true } }),
        ]),
      ]);
    return { featuredProjects, featuredGames, latestPosts, stats };
  } catch {
    return {
      featuredProjects: [],
      featuredGames: [],
      latestPosts: [],
      stats: [0, 0, 0] as [number, number, number],
    };
  }
}

export default async function HomePage() {
  const { featuredProjects, featuredGames, latestPosts, stats } =
    await getHomeData();
  const [projectCount, gameCount, postCount] = stats;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bronze-700/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="rune-divider justify-start font-display text-xs uppercase tracking-[0.3em] text-hex-300 before:hidden">
              <FontAwesomeIcon icon={faShieldHalved} className="h-3.5 w-3.5" />
              Bataklıkta kurulu bir yazılım atölyesi
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-parchment-100 sm:text-6xl">
              Taşların altından
              <br />
              <span className="text-vex-400">çalışan yazılımlar</span>{" "}
              çıkarıyoruz.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-parchment-400">
              Trogworks Studio; araç, oyun ve deneysel yazılım projelerini
              gün yüzüne çıkaran bağımsız bir atölye. Her görevin ilerlemesini
              buradan takip edebilirsin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="btn-hud flex items-center gap-2 bg-vex-600 px-5 py-3 text-sm font-display text-ink-950"
              >
                Görevleri Keşfet
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/games"
                className="btn-hud flex items-center gap-2 border border-hex-500/50 bg-ink-800 px-5 py-3 text-sm font-display text-hex-200"
              >
                Arenaya Göz At
              </Link>
            </div>

            <div className="mt-14 grid max-w-md grid-cols-3 gap-3">
              <div className="hud-panel px-4 py-3 text-center">
                <p className="font-display text-2xl text-parchment-100">{projectCount}</p>
                <p className="text-[10px] uppercase tracking-wider text-parchment-500">Aktif Görev</p>
              </div>
              <div className="hud-panel px-4 py-3 text-center">
                <p className="font-display text-2xl text-parchment-100">{gameCount}</p>
                <p className="text-[10px] uppercase tracking-wider text-parchment-500">Arena Oyunu</p>
              </div>
              <div className="hud-panel px-4 py-3 text-center">
                <p className="font-display text-2xl text-parchment-100">{postCount}</p>
                <p className="text-[10px] uppercase tracking-wider text-parchment-500">Günlük Kaydı</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="animate-float relative mx-auto aspect-square w-full max-w-xs">
              <Image
                src="/trog/wrench.webp"
                alt="Trogworks maskotu, elinde bir İngiliz anahtarıyla"
                fill
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-vex-600/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-hex-600/10 blur-3xl"
        />
      </section>

      {/* Mascot intro line */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SpeechBubble image="/trog/thumbsup.webp" alt="Trog maskotu başparmak yukarı">
          <p>
            <span className="font-display text-parchment-100">Hoş geldin, gezgin.</span>{" "}
            Aşağıda atölyenin şu anki durumunu bulacaksın — hangi görevler
            sürüyor, hangi oyunlar kazanda kaynıyor, hangi kayıtlar
            düşürülmüş. Kemerini bağla.
          </p>
        </SpeechBubble>
      </section>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="Atölye tezgahından" title="Öne Çıkan Görevler" />
            <Link
              href="/projects"
              className="flex items-center gap-1.5 font-display text-sm text-vex-400 hover:text-vex-300"
            >
              Tümünü gör <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Featured games */}
      {featuredGames.length > 0 && (
        <section className="border-t border-bronze-700/40 bg-ink-900/60">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading kicker="Kazanda kaynayan" title="Gelişen Oyunlar" />
              <Link
                href="/games"
                className="flex items-center gap-1.5 font-display text-sm text-hex-300 hover:text-hex-200"
              >
                Tümünü gör <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest posts */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker="Bataklık günlüğü" title="Son Kayıtlar" />
          <Link
            href="/blog"
            className="flex items-center gap-1.5 font-display text-sm text-vex-400 hover:text-vex-300"
          >
            Günlüğü gör <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
          </Link>
        </div>
        {latestPosts.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-parchment-500">
            Henüz kayıt düşülmedi, yakında burada olacak.
          </p>
        )}
      </section>

      {/* What we do */}
      <section className="border-t border-bronze-700/40 bg-ink-900/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <SectionHeading
            kicker="Atölyede neler oluyor"
            title="Üç Kolda Çalışıyoruz"
            description="Trogworks, üç temel alanda ürün çıkarıyor; hepsi aynı çatı altında, aynı ekiple ilerliyor."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="hud-panel p-6">
              <FontAwesomeIcon icon={faCode} className="h-6 w-6 text-vex-400" />
              <h3 className="mt-4 font-display text-lg text-parchment-100">
                Yazılım Araçları
              </h3>
              <p className="mt-2 text-sm text-parchment-500">
                Günlük işleri kolaylaştıran küçük, odaklı araçlar ve
                kütüphaneler geliştiriyoruz.
              </p>
            </div>
            <div className="hud-panel p-6">
              <FontAwesomeIcon icon={faGamepad} className="h-6 w-6 text-hex-400" />
              <h3 className="mt-4 font-display text-lg text-parchment-100">Oyunlar</h3>
              <p className="mt-2 text-sm text-parchment-500">
                Web tabanlı ve masaüstü oyunlar üzerinde çalışıyor,
                gelişimlerini açıkça paylaşıyoruz.
              </p>
            </div>
            <div className="hud-panel p-6">
              <FontAwesomeIcon icon={faScroll} className="h-6 w-6 text-bronze-400" />
              <h3 className="mt-4 font-display text-lg text-parchment-100">
                Açık Günlükler
              </h3>
              <p className="mt-2 text-sm text-parchment-500">
                Her önemli gelişme, karar ve sürüm blog üzerinden anında
                duyuruluyor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
