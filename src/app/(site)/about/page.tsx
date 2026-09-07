import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faHammer,
  faScroll,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Atolye",
  description: "Trogworks Studio'nun hikayesi ve calisma prensipleri.",
};

const values = [
  {
    icon: faSeedling,
    title: "Kucuk basla, gercek yayinla",
    text: "Her proje, kullanilabilir bir surumle baslar. Once calisan bir sey cikarir, sonra buyuturuz.",
  },
  {
    icon: faScroll,
    title: "Sureci acik tutariz",
    text: "Gelisme notlari, kararlar ve aksamalar blog uzerinden aninda paylasilir. Sasirtmaca yok.",
  },
  {
    icon: faHammer,
    title: "Elle yapilmis kalite",
    text: "Otomasyonu severiz ama son dokunusu her zaman insan gozuyle yaparız.",
  },
  {
    icon: faUsers,
    title: "Toplulukla birlikte",
    text: "Kullanicilarimizin geri bildirimi yol haritamizi dogrudan sekillendirir.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <SectionHeading
        kicker="Bataklikta bir atolye"
        title="Trogworks Studio kimdir?"
        description="Trogworks Studio, yazilim araclari ve oyunlar uzerine calisan bagimsiz bir atolyedir. Adimizi, isimizi sessizce ve inatla yapan bataklik trollerinden aldik: gorunmez ama her zaman calisiyoruz."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {values.map((value) => (
          <div
            key={value.title}
            className="border border-bog-500/50 bg-bog-800/40 p-6"
          >
            <FontAwesomeIcon icon={value.icon} className="h-6 w-6 text-ooze-400" />
            <h3 className="mt-4 font-display text-lg text-bone-100">
              {value.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-bone-500">
              {value.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-bog-500/40 pt-10">
        <h2 className="font-display text-2xl text-bone-100">Nasil calisiyoruz</h2>
        <p className="mt-4 leading-relaxed text-bone-400">
          Her yeni fikir once atolyenin ic panosunda tartisilir, sonra kucuk
          bir prototip haline gelir. Prototip belli bir olgunluga ulastiginda
          bu sitede "Gelistiriliyor" etiketiyle yayina alinir ve ilerleme
          yuzdesiyle birlikte takip edilebilir hale gelir. Surum hazir
          oldugunda durum "Yayinda" olarak guncellenir ve indirme veya
          web erisim baglantisi eklenir.
        </p>
      </div>
    </div>
  );
}
