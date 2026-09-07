import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/lib/fontawesome";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
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
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Bataklikta Dogan Yazilimlar`,
    description:
      "Yazilim araclari, oyunlar ve gelisme duyurularinin yayinlandigi atolye.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
    description:
      "Yazilim araclari, oyunlar ve gelisme duyurularinin yayinlandigi bagimsiz yazilim atolyesi.",
    sameAs: ["https://github.com", "https://discord.com", "https://x.com"],
  };

  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
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
