"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const links = [
  { href: "/projects", label: "Projeler" },
  { href: "/games", label: "Oyunlar" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Atolye" },
  { href: "/contact", label: "Iletisim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-bog-500/40 bg-bog-800/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg tracking-tight text-bone-200"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-ooze-600/50 bg-bog-700 text-ooze-400 shadow-carve transition-colors group-hover:border-ooze-400">
            T
          </span>
          Trogworks
          <span className="hidden text-ooze-500 sm:inline">Studio</span>
        </Link>

        <button
          className="text-bone-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menuyu kapat" : "Menuyu ac"}
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-5 w-5" />
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-sm px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-ooze-900/60 text-ooze-300"
                      : "text-bone-400 hover:text-ooze-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-bog-500/40 px-5 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-2 py-2.5 text-bone-300 hover:text-ooze-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
