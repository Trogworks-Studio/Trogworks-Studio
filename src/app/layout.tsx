import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/lib/fontawesome";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["500", "600", "700", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Trogworks Studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Bataklikta Dogan Yazilimlar`,
    template: `%s — ${siteName}`,
  },
  description:
    "Trogworks Studio; yazilim araclari, oyunlar ve teknik guncellemeler yayinlayan bagimsiz bir yazilim atolyesidir.",
  keywords: [
    "Trogworks Studio",
    "yazilim atolyesi",
    "indie oyun stüdyosu",
    "yazilim projeleri",
    "oyun gelistirme",
  ],
  authors: [{ name: siteName }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName,
    title: `${siteName} — Bataklikta Dogan Yazilimlar`,
    description:
      "Yazilim araclari, oyunlar ve gelisme duyurularinin yayinlandigi atolye.",
    url: siteUrl,
    images: [{ url: "/trog/logo.webp", width: 1200, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Bataklikta Dogan Yazilimlar`,
    description:
      "Yazilim araclari, oyunlar ve gelisme duyurularinin yayinlandigi atolye.",
    images: ["/trog/logo.webp"],
  },
  icons: {
    icon: "/trog/logo.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/trog/logo.webp`,
    description:
      "Yazilim araclari, oyunlar ve gelisme duyurularinin yayinlandigi bagimsiz yazilim atolyesi.",
    sameAs: ["https://github.com", "https://discord.com", "https://x.com"],
  };

  return (
    <html lang="tr" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="min-h-screen font-body antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
