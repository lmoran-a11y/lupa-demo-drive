import logoSrc from "@/assets/lupauto-logo.png";

export function Logo({
  light = false,
  compact = false,
  size = "default",
}: {
  light?: boolean;
  compact?: boolean;
  size?: "default" | "xl" | "header" | "footer";
}) {
  const heightCls =
    size === "xl"
      ? "h-24 md:h-28"
      : size === "header"
      ? "h-14 scale-150 origin-left"
      : size === "footer"
      ? "h-16 md:h-20"
      : compact
      ? "h-14"
      : "h-16";
  return (
    <div className="flex items-center">
      <img
        src={logoSrc}
        alt="Lupauto - Revisiones bajo lupa"
        className={`${heightCls} w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}
