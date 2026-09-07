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
        <p className="font-display text-sm italic text-rune-300">{kicker}</p>
      )}
      <h2 className="mt-1 font-display text-3xl text-bone-100 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-bone-500 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
