"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faCode,
  faGamepad,
  faScroll,
  faRightFromBracket,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  { href: "/admin/dashboard", label: "Panel", icon: faGaugeHigh },
  { href: "/admin/projects", label: "Projeler", icon: faCode },
  { href: "/admin/games", label: "Oyunlar", icon: faGamepad },
  { href: "/admin/posts", label: "Blog Yazilari", icon: faScroll },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-ink-500/40 bg-ink-900 md:h-screen md:w-60 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2.5 px-5 py-5 font-display text-base text-parchment-200">
        <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-vex-600/50 bg-ink-700 text-vex-400">
          T
        </span>
        Atolye Paneli
      </div>

      <nav className="flex-1 px-3 py-2">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-vex-900/50 text-vex-300"
                  : "text-parchment-400 hover:bg-ink-800 hover:text-parchment-200"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink-500/40 px-3 py-4">
        {session?.user?.name && (
          <p className="mb-2 truncate px-3 text-xs text-parchment-500">
            {session.user.name}
          </p>
        )}
        <Link
          href="/"
          className="mb-1 flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-parchment-400 hover:bg-ink-800 hover:text-parchment-200"
        >
          <FontAwesomeIcon icon={faHouse} className="h-4 w-4" />
          Siteye Don
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm text-bronze-300 hover:bg-bronze-900/20"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="h-4 w-4" />
          Cikis Yap
        </button>
      </div>
    </aside>
  );
}
