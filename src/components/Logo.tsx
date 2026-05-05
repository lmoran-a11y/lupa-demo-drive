import logoSrc from "@/assets/lupauto-logo.png";

export function Logo({ light = false, compact = false, size = "default" }: { light?: boolean; compact?: boolean; size?: "default" | "xl" }) {
  const heightCls = size === "xl" ? "h-24 md:h-28" : compact ? "h-14" : "h-16";
  return (
    <div className="flex items-center">
      <img
        src={logoSrc}
        alt="Lupauto - Revisiones bajo lupa"
        className={`${heightCls} w-auto object-contain py-0 my-0 mx-0 px-0 text-xs border-0 ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}
