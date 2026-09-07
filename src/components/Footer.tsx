import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="border-t border-bog-500/40 bg-bog-900">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5 font-display text-lg text-bone-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-ooze-600/50 bg-bog-700 text-ooze-400">
                T
              </span>
              Trogworks Studio
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-500">
              Bataklikta kurulan, taslarin altindan cikan yazilimlar
              uzerine calisan bagimsiz bir atolyeyiz.
            </p>
            <div className="mt-4 flex gap-3 text-bone-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="transition-colors hover:text-ooze-400"
              >
                <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Discord"
                className="transition-colors hover:text-rune-400"
              >
                <FontAwesomeIcon icon={faDiscord} className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X (Twitter)"
                className="transition-colors hover:text-bone-200"
              >
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm text-bone-300">Atolye</h3>
            <ul className="mt-3 space-y-2 text-sm text-bone-500">
              <li><Link href="/projects" className="hover:text-ooze-400">Projeler</Link></li>
              <li><Link href="/games" className="hover:text-ooze-400">Oyunlar</Link></li>
              <li><Link href="/blog" className="hover:text-ooze-400">Blog</Link></li>
              <li><Link href="/about" className="hover:text-ooze-400">Hakkimizda</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm text-bone-300">Destek</h3>
            <ul className="mt-3 space-y-2 text-sm text-bone-500">
              <li><Link href="/contact" className="hover:text-ooze-400">Iletisim</Link></li>
              <li><Link href="/admin/login" className="hover:text-ooze-400">Atolye Girisi</Link></li>
            </ul>
          </div>

          <Newsletter />
        </div>

        <div className="rune-divider mt-12 mb-6 text-bog-400">
          <span className="text-xs">✦</span>
        </div>

        <p className="text-center text-xs text-bone-500">
          © {new Date().getFullYear()} Trogworks Studio. Tum haklari bataklikta saklidir.
        </p>
      </div>
    </footer>
  );
}
