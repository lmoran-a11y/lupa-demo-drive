import logoSrc from "@/assets/lupauto-logo.png";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center">
      <img
        src={logoSrc}
        alt="Lupauto - Revisiones bajo lupa"
        className={`${compact ? "h-9" : "h-11"} w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}
