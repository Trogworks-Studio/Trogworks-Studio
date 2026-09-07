export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {kicker && (
        <p className="rune-divider justify-start font-display text-xs uppercase tracking-[0.3em] text-hex-300 before:hidden after:hidden">
          {kicker}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl text-parchment-100 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-parchment-500 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
