import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faApple,
  faLinux,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { platformLabels } from "@/lib/utils";

const iconMap = {
  WEB: faGlobe,
  WINDOWS: faWindows,
  MACOS: faApple,
  LINUX: faLinux,
  ANDROID: faAndroid,
  IOS: faApple,
} as const;

export default function PlatformIcon({
  platform,
  className = "h-4 w-4",
}: {
  platform: string;
  className?: string;
}) {
  const icon = iconMap[platform as keyof typeof iconMap] || faGlobe;
  return (
    <span title={platformLabels[platform] || platform}>
      <FontAwesomeIcon icon={icon} className={className} />
    </span>
  );
}
