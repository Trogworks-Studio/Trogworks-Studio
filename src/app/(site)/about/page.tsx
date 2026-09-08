import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faHammer,
  faScroll,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/SectionHeading";
import SpeechBubble from "@/components/SpeechBubble";

export const metadata: Metadata = {
  title: "Atölye",
  description: "Trogworks Studio'nun hikayesi ve çalışma prensipleri.",
};

const values = [
  {
    icon: faSeedling,
    title: "Küçük başla, gerçek yayınla",
    text: "Her görev, kullanılabilir bir sürümle başlar. Önce çalışan bir şey çıkarır, sonra büyütürüz.",
  },
  {
    icon: faScroll,
    title: "Süreci açık tutarız",
    text: "Gelişme notları, kararlar ve aksamalar günlük üzerinden anında paylaşılır. Şaşırtmaca yok.",
  },
  {
    icon: faHammer,
    title: "Elle yapılmış kalite",
    text: "Otomasyonu severiz ama son dokunuşu her zaman insan gözüyle yaparız.",
  },
  {
    icon: faUsers,
    title: "Toplulukla birlikte",
    text: "Kullanıcılarımızın geri bildirimi yol haritamızı doğrudan şekillendirir.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <SectionHeading
        kicker="Bataklıkta bir atölye"
        title="Trogworks Studio kimdir?"
        description="Trogworks Studio, yazılım araçları ve oyunlar üzerine çalışan bağımsız bir atölyedir. Adımızı, işini sessizce ve inatla yapan bataklık trollerinden aldık: görünmez ama her zaman çalışıyoruz."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {values.map((value) => (
          <div key={value.title} className="hud-panel p-6">
            <FontAwesomeIcon icon={value.icon} className="h-6 w-6 text-vex-400" />
            <h3 className="mt-4 font-display text-lg text-parchment-100">
              {value.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-parchment-500">
              {value.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_260px]">
        <div>
          <h2 className="font-display text-2xl text-parchment-100">Nasıl çalışıyoruz</h2>
          <p className="mt-4 leading-relaxed text-parchment-400">
            Her yeni fikir önce atölyenin iç panosunda tartışılır, sonra küçük
            bir prototip haline gelir. Prototip belli bir olgunluğa
            ulaştığında bu sitede &ldquo;Geliştiriliyor&rdquo; etiketiyle
            yayına alınır ve ilerleme yüzdesiyle birlikte takip edilebilir
            hale gelir. Sürüm hazır olduğunda durum &ldquo;Yayında&rdquo;
            olarak güncellenir ve indirme veya web erişim bağlantısı eklenir.
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[220px]">
          <Image
            src="/trog/repairing.webp"
            alt="Trog maskotu bir aleti tamir ediyor"
            fill
            className="object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>

      <div className="mt-16">
        <SpeechBubble image="/trog/electric-thumbsup.webp" alt="Elektrikli Trog maskotu">
          <p>
            Bir görevin ilerleme çubuğunu görünce heyecanlanıyorsan, doğru
            yerdesin. Aşağıdan{" "}
            <a href="/projects" className="text-vex-400 underline underline-offset-2">
              görevlere
            </a>{" "}
            göz atabilirsin.
          </p>
        </SpeechBubble>
      </div>
    </div>
  );
}
