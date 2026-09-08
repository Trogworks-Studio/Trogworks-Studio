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
    <header className="sticky top-0 z-50 border-b border-bronze-700/50 bg-ink-950/95 backdrop-blur">
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-vex-500/60 to-transparent" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="hud-panel relative h-11 w-11 shrink-0 overflow-hidden p-0.5">
            <Image
              src="/trog/logo.webp"
              alt="Trogworks Studio"
              fill
              className="object-cover"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base tracking-wide text-parchment-100 group-hover:text-vex-400">
              TROGWORKS
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-parchment-500">
              Studio
            </span>
          </span>
        </Link>

        <button
          className="text-parchment-300 md:hidden"
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
                  className={`hud-panel hud-panel-hover flex flex-col items-center px-4 py-1.5 transition-colors ${
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
        <ul className="flex flex-col gap-2 border-t border-bronze-700/40 px-5 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="hud-panel flex items-center justify-between px-4 py-2.5 text-parchment-200"
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
