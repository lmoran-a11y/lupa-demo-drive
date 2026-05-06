import logoSrc from "@/assets/lupauto-logo.png";

export function Logo({
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
      ? "h-7 md:h-12"
      : size === "footer"
      ? "h-14 md:h-16"
      : compact
      ? "h-14"
      : "h-16";
  return (
    <div className="flex items-center">
      <img
        src={logoSrc}
        alt="Lupauto - Revisiones bajo lupa"
        className={`${heightCls} w-auto object-contain`}
      />
    </div>
  );
}
