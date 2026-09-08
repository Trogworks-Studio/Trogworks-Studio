import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const discordInvite = "https://discord.gg/M9exXDmgqS";

export default function CommunityWidget() {
  return (
    <section className="community-widget" aria-labelledby="community-widget-title">
      <div className="community-widget__heading">
        <div>
          <p className="game-footer__eyebrow">Topluluk kanalı</p>
          <h2 id="community-widget-title">Bataklık karargâhı</h2>
        </div>
        <FontAwesomeIcon icon={faDiscord} className="community-widget__icon" />
      </div>
      <iframe
        title="Trogworks Studio Discord topluluk sunucusu"
        src="https://discord.com/widget?id=825121524443906088&theme=dark"
        width="350"
        height="500"
        allowTransparency
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="community-widget__frame"
      />
      <a
        href={discordInvite}
        target="_blank"
        rel="noreferrer noopener"
        className="community-widget__invite"
      >
        Discord sunucusuna katıl
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </section>
  );
}
