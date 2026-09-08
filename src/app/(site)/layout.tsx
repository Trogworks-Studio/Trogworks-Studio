import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="world-shell">
      <Navbar />
      <main id="top" className="relative min-h-[70vh] overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
}
