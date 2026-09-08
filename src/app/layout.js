import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Fontlar kendi sunucumuzdan servis edilir (Google Fonts'a canlı bağımlılık yok).
import "@fontsource/fredericka-the-great/400.css";
import "@fontsource/baloo-2/400.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

faConfig.autoAddCss = false;

export const metadata = {
  title: "Trogworks Studio — Yer Altının Yazılım Atölyesi",
  description:
    "Trogworks Studio; yazılım projeleri, oyunlar, topluluk ve seviye tabanlı görev sistemine sahip goblin temalı bir atölye.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
