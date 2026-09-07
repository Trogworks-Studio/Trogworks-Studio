import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <FontAwesomeIcon icon={faSkullCrossbones} className="h-10 w-10 text-ember-400" />
      <h1 className="mt-6 font-display text-3xl text-bone-100">
        Bu iz bataklikta kayboldu
      </h1>
      <p className="mt-3 text-bone-500">
        Aradigin sayfa tasinmis, silinmis ya da hic var olmamis olabilir.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-sm bg-ooze-600 px-5 py-2.5 text-sm font-medium text-bog-900 hover:bg-ooze-500"
      >
        Ana Sayfaya Don
      </Link>
    </div>
  );
}
