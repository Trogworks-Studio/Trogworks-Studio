import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHammer,
  faCode,
  faGamepad,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import GameCard from "@/components/GameCard";
import BlogCard from "@/components/BlogCard";

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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-bog-500/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="rune-divider justify-start font-display text-sm italic text-rune-300 before:hidden">
              <FontAwesomeIcon icon={faHammer} className="h-3.5 w-3.5" />
              Bataklikta kurulu bir yazilim atolyesi
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-bone-100 sm:text-6xl">
              Taslarin altindan
              <br />
              <span className="text-ooze-400">calisan yazilimlar</span>{" "}
              cikariyoruz.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone-400">
              Trogworks Studio; arac, oyun ve deneysel yazilim projelerini
              gun yuzune cikaran bagimsiz bir atolye. Her adimi, her surumu
              buradan takip edebilirsin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-sm bg-ooze-600 px-5 py-3 text-sm font-medium text-bog-900 shadow-glow-ooze transition-colors hover:bg-ooze-500"
              >
                Projeleri Kesfet
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/games"
                className="flex items-center gap-2 rounded-sm border border-rune-500/50 px-5 py-3 text-sm font-medium text-rune-200 transition-colors hover:bg-rune-900/30"
              >
                Oyunlara Goz At
              </Link>
            </div>

            <div className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-bog-500/40 pt-6">
              <div>
                <p className="font-display text-2xl text-bone-100">{projectCount}</p>
                <p className="text-xs text-bone-500">Aktif Proje</p>
              </div>
              <div>
                <p className="font-display text-2xl text-bone-100">{gameCount}</p>
                <p className="text-xs text-bone-500">Gelisen Oyun</p>
              </div>
              <div>
                <p className="font-display text-2xl text-bone-100">{postCount}</p>
                <p className="text-xs text-bone-500">Gunluk Kaydi</p>
              </div>
            </div>
          </div>
        </div>

        {/* dekoratif bataklik izi */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-ooze-600/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-rune-600/10 blur-3xl"
        />
      </section>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              kicker="Atolye tezgahindan"
              title="Öne cikan projeler"
            />
            <Link
              href="/projects"
              className="flex items-center gap-1.5 text-sm text-ooze-400 hover:text-ooze-300"
            >
              Tumunu gor <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
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
        <section className="border-t border-bog-500/40 bg-bog-900/50">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading kicker="Kazanda kaynayan" title="Gelisen oyunlar" />
              <Link
                href="/games"
                className="flex items-center gap-1.5 text-sm text-rune-300 hover:text-rune-200"
              >
                Tumunu gor <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
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
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker="Bataklik gunlugu" title="Son kayitlar" />
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm text-ooze-400 hover:text-ooze-300"
          >
            Blogu gor <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
          </Link>
        </div>
        {latestPosts.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-bone-500">
            Henuz kayit dusulmedi, yakinda burada olacak.
          </p>
        )}
      </section>

      {/* What we do */}
      <section className="border-t border-bog-500/40 bg-bog-900/50">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            kicker="Atolyede neler oluyor"
            title="Uc kolda calisiyoruz"
            description="Trogworks, uc temel alanda urun cikariyor; hepsi ayni cati altinda, ayni ekiple ilerliyor."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="border border-bog-500/50 bg-bog-800/40 p-6">
              <FontAwesomeIcon icon={faCode} className="h-6 w-6 text-ooze-400" />
              <h3 className="mt-4 font-display text-lg text-bone-100">
                Yazilim Araclari
              </h3>
              <p className="mt-2 text-sm text-bone-500">
                Gunluk isleri kolaylastiran kucuk, odakli araclar ve
                kütüphaneler gelistiriyoruz.
              </p>
            </div>
            <div className="border border-bog-500/50 bg-bog-800/40 p-6">
              <FontAwesomeIcon icon={faGamepad} className="h-6 w-6 text-rune-400" />
              <h3 className="mt-4 font-display text-lg text-bone-100">Oyunlar</h3>
              <p className="mt-2 text-sm text-bone-500">
                Web tabanli ve masaustu oyunlar uzerinde calisiyor,
                gelisimlerini acikca paylasiyoruz.
              </p>
            </div>
            <div className="border border-bog-500/50 bg-bog-800/40 p-6">
              <FontAwesomeIcon icon={faScroll} className="h-6 w-6 text-ember-400" />
              <h3 className="mt-4 font-display text-lg text-bone-100">
                Acik Gunlukler
              </h3>
              <p className="mt-2 text-sm text-bone-500">
                Her onemli gelisme, karar ve surum blog uzerinden aninda
                duyuruluyor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
