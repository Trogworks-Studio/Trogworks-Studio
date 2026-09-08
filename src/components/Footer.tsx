import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="border-t border-bronze-700/50 bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="hud-panel relative h-10 w-10 shrink-0 overflow-hidden p-0.5">
                <Image src="/trog/logo.webp" alt="" fill className="object-cover" />
              </span>
              <span className="font-display text-base text-parchment-100">
                TROGWORKS STUDIO
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-parchment-500">
              Bataklıkta kurulan, taşların altından çıkan yazılımlar üzerine
              çalışan bağımsız bir atölyeyiz.
            </p>
            <div className="mt-4 flex gap-2.5 text-parchment-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="hud-panel hud-panel-hover flex h-9 w-9 items-center justify-center hover:text-vex-400"
              >
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Discord"
                className="hud-panel hud-panel-hover flex h-9 w-9 items-center justify-center hover:text-hex-400"
              >
                <FontAwesomeIcon icon={faDiscord} className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X (Twitter)"
                className="hud-panel hud-panel-hover flex h-9 w-9 items-center justify-center hover:text-parchment-100"
              >
                <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-bronze-400">
              Atölye
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-parchment-400">
              <li><Link href="/projects" className="hover:text-vex-400">Görevler / Projeler</Link></li>
              <li><Link href="/games" className="hover:text-vex-400">Arena / Oyunlar</Link></li>
              <li><Link href="/blog" className="hover:text-vex-400">Günlük / Blog</Link></li>
              <li><Link href="/about" className="hover:text-vex-400">Loca / Hakkımızda</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-bronze-400">
              Destek
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-parchment-400">
              <li><Link href="/contact" className="hover:text-vex-400">Haberci / İletişim</Link></li>
              <li><Link href="/admin/login" className="hover:text-vex-400">Atölye Girişi</Link></li>
            </ul>
          </div>

          <Newsletter />
        </div>

        <div className="rune-divider mt-12 mb-6 text-bronze-700">
          <span className="text-xs text-bronze-500">◆</span>
        </div>

        <p className="text-center text-xs text-parchment-500">
          © {new Date().getFullYear()} Trogworks Studio. Tüm haklar bataklıkta saklıdır.
        </p>
      </div>
    </footer>
  );
}
