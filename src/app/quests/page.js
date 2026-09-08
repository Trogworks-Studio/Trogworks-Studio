import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/SectionHeading";
import QuestBoard from "@/components/QuestBoard";
import { auth } from "@/lib/auth";

export const metadata = { title: "Görevler — Trogworks Studio" };

export default async function QuestsPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Görevler"
        title="Atölye Görev Panosu"
        description="Discord sunucumuzdaki görev sistemi gibi düşün: günlük, haftalık ve hikaye görevlerini tamamla, XP ve Gear Coin kazan."
      />

      <div className="mt-10">
        {session ? (
          <QuestBoard />
        ) : (
          <div className="workshop-panel flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
            <Image
              src="/images/mascots/mascot-shocked.png"
              alt="Giriş gerekli"
              width={100}
              height={100}
              className="h-24 w-24 object-contain"
            />
            <h3 className="font-display text-2xl text-parchment">Bir dakika, zanaatkâr!</h3>
            <p className="max-w-sm text-sm text-muted-text">
              Görevleri görmek ve ödül kazanmak için önce atölyeye kaydolman
              gerekiyor.
            </p>
            <div className="mt-2 flex gap-3">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-brass px-5 py-2.5 text-sm font-bold text-ink hover:bg-brass-bright"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                Hesap Oluştur
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-surface-line px-5 py-2.5 text-sm font-bold text-ink-text hover:border-goblin/60"
              >
                <FontAwesomeIcon icon={faListCheck} />
                Giriş Yap
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
