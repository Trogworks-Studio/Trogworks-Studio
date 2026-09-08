export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-sm font-bold text-goblin-bright">{eyebrow}</span>
      )}
      <h2 className="mt-1 font-display text-3xl text-parchment sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-text">{description}</p>
      )}
    </div>
  );
}
