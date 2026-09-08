import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGamepad,
  faListCheck,
  faScroll,
  faArrowRight,
  faBolt,
  faTrophy,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import GameCard from "@/components/GameCard";
import BlogCard from "@/components/BlogCard";
import { getProjects, getGames, getBlogPosts } from "@/lib/queries/content";
import { getLeaderboard, getCommunityStats } from "@/lib/queries/users";
import { REWARD_INTERVAL } from "@/lib/gameLogic";

export default function HomePage() {
  const projects = getProjects().slice(0, 3);
  const games = getGames().slice(0, 3);
  const posts = getBlogPosts().slice(0, 3);
  const leaderboard = getLeaderboard(3);
  const stats = getCommunityStats();

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-surface-line">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-goblin/40 bg-goblin/10 px-3 py-1 text-sm font-bold text-goblin-bright">
              <FontAwesomeIcon icon={faBolt} className="text-xs" />
              Yer altının yazılım atölyesi
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-parchment sm:text-6xl">
              Dişliler dönüyor,{" "}
              <span className="text-brass-bright">kod akıyor.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-text">
              Trogworks Studio; goblin zanaatkârların elinden çıkan yazılım
              projelerini, oyunları ve topluluk haberlerini bir araya
              getiren bir atölye. Atölye oyununda tıkla, seviye atla, her{" "}
              {REWARD_INTERVAL} seviyede bir özel ödülün kilidini aç.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/game"
                className="flex items-center gap-2 rounded-xl bg-brass px-5 py-3 font-bold text-ink shadow-lg shadow-brass/20 transition-colors hover:bg-brass-bright"
              >
                <FontAwesomeIcon icon={faGamepad} />
                Atölye Oyununu Oyna
              </Link>
              <Link
                href="/quests"
                className="flex items-center gap-2 rounded-xl border border-surface-line bg-surface-raised px-5 py-3 font-bold text-ink-text transition-colors hover:border-goblin/60 hover:text-goblin-bright"
              >
                <FontAwesomeIcon icon={faListCheck} />
                Görevlere Göz At
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-text">
              <span>
                <strong className="text-parchment">{stats.memberCount}</strong> zanaatkâr
              </span>
              <span>
                <strong className="text-parchment">{stats.questsClaimed}</strong> görev tamamlandı
              </span>
              <span>
                <strong className="text-parchment">{projects.length + games.length}+</strong> yayında proje
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 -z-10 rounded-full bg-goblin/10 blur-3xl" />
            <Image
              src="/images/mascots/mascot-tinkerer.png"
              alt="Trogworks goblin zanaatkârı"
              width={480}
              height={480}
              priority
              className="w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </section>

      {/* ---------- ATÖLYEDE NELER VAR ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Atölyede neler var"
          title="Tek çatı altında dört köşe"
          description="Yazılım projelerimizden oyunlarımıza, topluluk haberlerinden görev listene kadar her şey burada."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureTile
            href="/projects"
            icon={faCode}
            title="Yazılım Projeleri"
            description="Açık kaynak araçlarımız ve dahili sistemlerimiz."
          />
          <FeatureTile
            href="/games"
            icon={faGamepad}
            title="Oyunlar"
            description="Tıklama oyunumuzdan geliştirmedeki projelere."
          />
          <FeatureTile
            href="/quests"
            icon={faListCheck}
            title="Görevler"
            description="Günlük, haftalık ve hikaye görevleriyle XP topla."
          />
          <FeatureTile
            href="/blog"
            icon={faScroll}
            title="Blog & Duyurular"
            description="Gelişmeleri ve topluluk haberlerini kaçırma."
          />
        </div>
      </section>

      {/* ---------- OYUN TANITIM ---------- */}
      <section className="border-y border-surface-line bg-surface/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <span className="text-sm font-bold text-brass">Atölye Oyunu</span>
            <h2 className="mt-1 font-display text-3xl text-parchment sm:text-4xl">
              Tıkla, dişli topla, efsane ol.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-text">
              Basit ama bağımlılık yapan bir döngü: her tıklama XP ve Gear
              Coin kazandırır. Seviye atladıkça atölye seni tanır — ve her{" "}
              {REWARD_INTERVAL} seviyede bir, atölyenin gizli arşivinden özel
              bir ödülün kilidi açılır.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-text">
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faBolt} className="text-brass" />
                Kritik tıklamalarda 3 kat XP şansı
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faTrophy} className="text-brass" />
                Her {REWARD_INTERVAL} seviyede özel rozet ve unvan
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faListCheck} className="text-brass" />
                Görevlerle birleştirerek daha hızlı ilerleme
              </li>
            </ul>
            <Link
              href="/game"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-goblin px-5 py-3 font-bold text-ink shadow-lg shadow-goblin/20 transition-colors hover:bg-goblin-bright"
            >
              Şimdi Oyna <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </Link>
          </div>
          <div className="order-1 mx-auto w-full max-w-sm md:order-2">
            <Image
              src="/images/mascots/mascot-electric-thumbsup.png"
              alt="Atölye oyunu"
              width={420}
              height={420}
              className="w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </section>

      {/* ---------- PROJELER ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Vitrin" title="Son Yazılım Projeleri" />
          <Link href="/projects" className="flex items-center gap-1.5 text-sm font-bold text-brass-bright">
            Tümünü gör <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* ---------- OYUNLAR ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Vitrin" title="Oyunlarımız" />
          <Link href="/games" className="flex items-center gap-1.5 text-sm font-bold text-brass-bright">
            Tümünü gör <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      {/* ---------- BLOG ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Blog" title="Duyurular & Gelişmeler" />
          <Link href="/blog" className="flex items-center gap-1.5 text-sm font-bold text-brass-bright">
            Tümünü gör <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      {/* ---------- TOPLULUK CTA ---------- */}
      <section className="border-t border-surface-line bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Topluluk"
              title="Zanaatkârlar arasına katıl"
              description="Discord'da sohbet et, skor tablosunda yerini al, atölyenin bir parçası ol."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-5 py-3 font-bold text-white transition-colors hover:bg-[#4954d4]"
              >
                <FontAwesomeIcon icon={faDiscord} />
                Discord'a Katıl
              </a>
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl border border-surface-line bg-surface-raised px-5 py-3 font-bold text-ink-text transition-colors hover:border-brass/60 hover:text-brass-bright"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                Hesap Oluştur
              </Link>
            </div>
          </div>

          <div className="workshop-panel rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-display text-xl text-parchment">
              <FontAwesomeIcon icon={faTrophy} className="text-brass" />
              Skor Tablosu Zirvesi
            </h3>
            <ul className="mt-4 space-y-3">
              {leaderboard.map((u, i) => (
                <li key={u.id} className="flex items-center gap-3">
                  <span className="w-5 text-center font-display text-lg text-brass-bright">
                    {i + 1}
                  </span>
                  <Image
                    src={u.avatar_url}
                    alt={u.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="flex-1 truncate text-sm font-semibold text-ink-text">
                    {u.name}
                  </span>
                  <span className="text-xs font-bold text-goblin-bright">Sv. {u.level}</span>
                </li>
              ))}
              {leaderboard.length === 0 && (
                <li className="text-sm text-muted-text">Henüz kimse liderlik tahtasında değil — ilk sen ol!</li>
              )}
            </ul>
            <Link
              href="/community"
              className="mt-4 flex items-center gap-1.5 text-sm font-bold text-brass-bright"
            >
              Tam tabloyu gör <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureTile({ href, icon, title, description }) {
  return (
    <Link
      href={href}
      className="workshop-panel group flex flex-col gap-3 rounded-2xl p-5 transition-transform hover:-translate-y-1"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-goblin/15 text-goblin-bright">
        <FontAwesomeIcon icon={icon} className="text-lg" />
      </div>
      <h3 className="font-display text-xl text-parchment">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-text">{description}</p>
      <span className="mt-auto flex items-center gap-1.5 text-sm font-bold text-brass-bright">
        Keşfet <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
