import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Iletisim",
  description: "Trogworks Studio ile iletisime gec.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <SectionHeading
        kicker="Duman isareti gonder"
        title="Iletisim"
        description="Bir proje onerin, is birligi teklifiniz ya da sadece merhaba demek istiyorsaniz - formu doldurun, size donelim."
      />
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
