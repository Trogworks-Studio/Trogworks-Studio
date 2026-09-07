import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGamepad,
  faScroll,
  faEnvelope,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [projectCount, gameCount, postCount, unreadMessages, recentMessages] =
    await Promise.all([
      prisma.project.count(),
      prisma.game.count(),
      prisma.post.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const cards = [
    { label: "Projeler", value: projectCount, icon: faCode, href: "/admin/projects" },
    { label: "Oyunlar", value: gameCount, icon: faGamepad, href: "/admin/games" },
    { label: "Blog Yazilari", value: postCount, icon: faScroll, href: "/admin/posts" },
    {
      label: "Okunmamis Mesaj",
      value: unreadMessages,
      icon: faEnvelope,
      href: "/admin/dashboard",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-parchment-100">Atolye Paneli</h1>
      <p className="mt-1 text-sm text-parchment-500">
        Genel duruma hizli bir bakis.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-ink-500/50 bg-ink-800/50 p-5 transition-colors hover:border-vex-600/50"
          >
            <FontAwesomeIcon icon={card.icon} className="h-5 w-5 text-vex-400" />
            <p className="mt-3 font-display text-2xl text-parchment-100">
              {card.value}
            </p>
            <p className="text-xs text-parchment-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-sm bg-vex-600 px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-vex-500"
        >
          <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
          Yeni Proje
        </Link>
        <Link
          href="/admin/games/new"
          className="flex items-center gap-2 rounded-sm border border-hex-500/50 px-4 py-2.5 text-sm font-medium text-hex-200 hover:bg-hex-900/30"
        >
          <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
          Yeni Oyun
        </Link>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 rounded-sm border border-ink-400/50 px-4 py-2.5 text-sm font-medium text-parchment-300 hover:bg-ink-700"
        >
          <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
          Yeni Yazi
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg text-parchment-100">Son Mesajlar</h2>
        {recentMessages.length === 0 ? (
          <p className="mt-3 text-sm text-parchment-500">Henuz mesaj yok.</p>
        ) : (
          <div className="mt-3 divide-y divide-ink-500/40 border border-ink-500/40">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-parchment-200">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-parchment-500">
                    {formatDate(msg.createdAt)}
                  </p>
                </div>
                <p className="mt-1 text-xs text-parchment-500">
                  {msg.name} · {msg.email}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-parchment-400">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
