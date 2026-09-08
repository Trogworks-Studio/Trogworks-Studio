import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleInfo, faSatelliteDish } from "@fortawesome/free-solid-svg-icons";
import Newsletter from "./Newsletter";
import CommunityWidget from "./CommunityWidget";

export default function Footer() {
  return (
    <footer className="game-footer">
      <div className="game-footer__signal">
        <FontAwesomeIcon icon={faSatelliteDish} />
        <span>İletişim sinyali açık</span>
        <span className="game-footer__signal-line" />
        <Link href="/contact">Haber gönder <FontAwesomeIcon icon={faArrowRight} /></Link>
      </div>
      <div className="game-footer__grid">
        <div>
          <p className="game-footer__eyebrow">Trogworks Studio</p>
          <h2>Haritanın dışındaki<br /><em>işleri</em> yapıyoruz.</h2>
          <p className="game-footer__muted">Bağımsız oyunlar, araçlar ve deneyler. Her kayıt gerçek bir üretim izidir.</p>
        </div>
        <CommunityWidget />
        <Newsletter />
      </div>
      <div className="game-footer__base">
        <span><FontAwesomeIcon icon={faCircleInfo} /> © {new Date().getFullYear()} Trogworks</span>
        <span>Bir sonraki kayıt yükleniyor...</span>
      </div>
    </footer>
  );
}
