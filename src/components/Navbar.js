"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGamepad,
  faUsers,
  faScroll,
  faListCheck,
  faBars,
  faXmark,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const links = [
  { href: "/projects", label: "Projeler", icon: faCode },
  { href: "/games", label: "Oyunlar", icon: faGamepad },
  { href: "/quests", label: "Görevler", icon: faListCheck },
  { href: "/blog", label: "Blog", icon: faScroll },
  { href: "/community", label: "Topluluk", icon: faUsers },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-line/80 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/mascots/mascot-logo.png"
            alt="Trogworks Studio"
            width={44}
            height={44}
            className="rounded-full ring-2 ring-brass/60"
            priority
          />
          <span className="font-display text-2xl text-brass-bright">Trogworks</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-goblin-deep/40 text-goblin-bright"
                    : "text-muted-text hover:bg-surface-raised hover:text-ink-text"
                }`}
              >
                <FontAwesomeIcon icon={link.icon} className="w-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#5865F2]/50 bg-[#5865F2]/15 px-3 py-2 text-sm font-semibold text-[#a7b1ff] transition-colors hover:bg-[#5865F2]/25"
          >
            <FontAwesomeIcon icon={faDiscord} />
            Discord
          </a>

          {status === "authenticated" ? (
            <UserMenu session={session} />
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-brass px-4 py-2 text-sm font-bold text-ink shadow-sm transition-colors hover:bg-brass-bright"
            >
              Giriş Yap
            </Link>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-ink-text lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-xl" />
        </button>
      </div>

      {open && (
        <div className="border-t border-surface-line bg-ink px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-text hover:bg-surface-raised"
              >
                <FontAwesomeIcon icon={link.icon} className="w-4 text-goblin-bright" />
                {link.label}
              </Link>
            ))}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#a7b1ff]"
            >
              <FontAwesomeIcon icon={faDiscord} className="w-4" />
              Discord'a Katıl
            </a>
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-text hover:bg-surface-raised"
                >
                  <FontAwesomeIcon icon={faGear} className="w-4 text-brass" />
                  Kontrol Paneli ({session.user.name})
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-crimson hover:bg-surface-raised"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-lg bg-brass px-3 py-2.5 text-center text-sm font-bold text-ink"
              >
                Giriş Yap
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function UserMenu({ session }) {
  const [open, setOpen] = useState(false);
  const user = session.user;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-surface-line bg-surface-raised py-1 pl-1 pr-3 hover:border-brass/60"
      >
        <Image
          src={user.avatarUrl || "/images/mascots/mascot-waving-bust.png"}
          alt={user.name}
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-sm font-bold text-ink-text">Sv. {user.level}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-52 rounded-xl border border-surface-line bg-surface-raised p-2 shadow-xl">
          <p className="px-2 pb-2 pt-1 text-sm font-bold text-ink-text">{user.name}</p>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-text hover:bg-surface hover:text-ink-text"
          >
            <FontAwesomeIcon icon={faGear} className="w-3.5 text-brass" />
            Kontrol Paneli
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-crimson hover:bg-surface"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5" />
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
