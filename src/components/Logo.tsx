import logoSrc from "@/assets/lupauto-logo.png";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <img
      src={logoSrc}
      alt="LUPAUTO - Revisiones bajo lupa"
      className={`${compact ? "h-16" : "h-28"} w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
    />
  );
}
