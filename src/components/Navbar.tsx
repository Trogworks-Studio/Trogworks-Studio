"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const links = [
  { href: "/projects", label: "Görevler", sub: "Projeler" },
  { href: "/games", label: "Arena", sub: "Oyunlar" },
  { href: "/blog", label: "Günlük", sub: "Blog" },
  { href: "/about", label: "Loca", sub: "Atölye" },
  { href: "/contact", label: "Haberci", sub: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="game-nav sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-5">
        <nav className="game-nav__deck flex items-center justify-between gap-4 px-3 py-2 sm:px-4">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="game-nav__sigil hud-panel relative h-12 w-12 shrink-0 overflow-hidden p-0.5 shadow-hud">
            <Image
              src="/trog/logo.webp"
              alt="Trogworks Studio"
              fill
              className="object-cover"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base tracking-wide text-parchment-100 transition-colors group-hover:text-vex-400">
              TROGWORKS
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-parchment-500">
              World map
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="game-nav__beacon" aria-hidden />
          <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-500">
            Sefer aktif
          </span>
        </div>

        <button
          className="game-nav__toggle text-parchment-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-5 w-5" />
        </button>

        <ul className="hidden items-stretch gap-1.5 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`game-nav__link hud-panel hud-panel-hover flex min-w-[92px] flex-col items-center px-4 py-2 transition-colors ${
                    active
                      ? "!border-vex-400/70 bg-vex-900/10 text-vex-300"
                      : "text-parchment-300"
                  }`}
                >
                  <span className="font-display text-[13px] tracking-wide">
                    {link.label}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-parchment-500">
                    {link.sub}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        </nav>

      {open && (
        <ul className="game-nav__mobile mx-auto flex max-w-7xl flex-col gap-2 px-3 pb-3 sm:px-5 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="game-nav__mobile-link hud-panel flex items-center justify-between px-4 py-2.5 text-parchment-200"
              >
                <span className="font-display text-sm">{link.label}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-500">
                  {link.sub}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
