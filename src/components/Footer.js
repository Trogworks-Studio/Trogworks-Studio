import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="border-t border-surface-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/mascots/mascot-logo.png"
                alt="Trogworks Studio"
                width={38}
                height={38}
                className="rounded-full ring-2 ring-brass/50"
              />
              <span className="font-display text-xl text-brass-bright">Trogworks</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-text">
              Yer altından dünyaya: goblin zanaatkârların elinden çıkan yazılım
              ve oyun projeleri.
            </p>
          </div>

          <FooterCol
            title="Atölye"
            links={[
              { href: "/projects", label: "Yazılım Projeleri" },
              { href: "/games", label: "Oyunlar" },
              { href: "/game", label: "Atölye Oyununu Oyna" },
            ]}
          />
          <FooterCol
            title="Topluluk"
            links={[
              { href: "/blog", label: "Blog & Duyurular" },
              { href: "/community", label: "Topluluk & Skor Tablosu" },
              { href: "/quests", label: "Görevler" },
            ]}
          />
          <div>
            <h3 className="font-display text-lg text-parchment">Bize Katıl</h3>
            <div className="mt-3 flex gap-3">
              <SocialIcon href="https://discord.com" icon={faDiscord} />
              <SocialIcon href="https://github.com" icon={faGithub} />
              <SocialIcon href="https://x.com" icon={faXTwitter} />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-surface-line pt-6 text-xs text-muted-text sm:flex-row">
          <p>© {new Date().getFullYear()} Trogworks Studio. Tüm dişliler saklıdır.</p>
          <p>Atölye is'i ve pirinç parlaklığıyla yapıldı.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="font-display text-lg text-parchment">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted-text hover:text-goblin-bright">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-line bg-surface-raised text-muted-text transition-colors hover:border-brass/60 hover:text-brass-bright"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
