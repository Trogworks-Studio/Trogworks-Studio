import Image from "next/image";

export default function SpeechBubble({
  image,
  alt,
  children,
  align = "left",
}: {
  image: string;
  alt: string;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex items-end gap-4 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
        <Image src={image} alt={alt} fill className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]" />
      </div>
      <div className="speech-bubble flex-1 px-5 py-4 text-sm text-parchment-300">
        {children}
      </div>
    </div>
  );
}
