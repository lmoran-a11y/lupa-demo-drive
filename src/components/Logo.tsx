import logoSrc from "@/assets/lupauto-logo.png";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center">
      <img
        src={logoSrc}
        alt="Lupauto - Revisiones bajo lupa"
        className={`${compact ? "h-14" : "h-16"} w-auto object-contain py-0 my-0 mx-0 px-0 text-xs border-0 ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}
