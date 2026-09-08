"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCampground,
  faEnvelope,
  faGamepad,
  faKey,
  faMap,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  { href: "/", label: "Harita", sub: "Ana kamp", icon: faMap },
  { href: "/projects", label: "Görevler", sub: "Projeler", icon: faScroll },
  { href: "/games", label: "Arena", sub: "Oyunlar", icon: faGamepad },
  { href: "/blog", label: "Günlük", sub: "Kayıtlar", icon: faBookOpen },
  { href: "/about", label: "Loca", sub: "Ekip", icon: faCampground },
  { href: "/contact", label: "Haberci", sub: "İletişim", icon: faEnvelope },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="game-sidebar" aria-label="Dünya haritası menüsü">
        <Link href="/" className="game-sidebar__brand" aria-label="Trogworks ana kamp">
          <span className="game-sidebar__logo">
            <Image src="/trog/logo.webp" alt="" fill priority className="object-cover" />
          </span>
          <span className="game-sidebar__wordmark">TROG<span>WORKS</span></span>
        </Link>

        <div className="game-sidebar__status">
          <span className="game-sidebar__status-dot" />
          <span><b>SEFER AKTİF</b><small>Bataklık bölgesi</small></span>
        </div>

        <p className="game-sidebar__label">Dünya haritası</p>
        <nav className="game-sidebar__nav">
          {links.map((link) => {
            const active = link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className={`game-sidebar__link ${active ? "is-active" : ""}`}>
                <FontAwesomeIcon icon={link.icon} className="game-sidebar__icon" />
                <span><b>{link.label}</b><small>{link.sub}</small></span>
                {active && <i aria-hidden />}
              </Link>
            );
          })}
        </nav>

        <Link href="/admin/login" className="game-sidebar__login">
          <FontAwesomeIcon icon={faKey} className="game-sidebar__login-icon" />
          <span>
            <b>Atölye girişi</b>
            <small>Yönetim paneli</small>
          </span>
        </Link>
        <div className="game-sidebar__version">TROGWORKS // v1.0</div>
      </aside>

      <div className="mobile-gamebar">
        <Link href="/" className="mobile-gamebar__brand" aria-label="Ana kamp">
          <Image src="/trog/logo.webp" alt="" fill className="object-cover" />
        </Link>
        {links.slice(0, 5).map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={active ? "is-active" : ""} aria-label={link.label}>
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
