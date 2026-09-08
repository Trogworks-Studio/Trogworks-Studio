import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Trogworks Studio ile iletişime geç.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
          <Image
            src="/trog/wave.webp"
            alt="El sallayan Trog maskotu"
            fill
            className="object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.5)]"
          />
        </div>
        <SectionHeading
          kicker="Duman işareti gönder"
          title="İletişim"
          description="Bir proje önerin, iş birliği teklifiniz ya da sadece merhaba demek istiyorsanız - formu doldurun, size dönelim."
        />
      </div>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
