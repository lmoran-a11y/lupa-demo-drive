export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const text = light ? "text-white" : "text-ink";
  const sub = light ? "text-white/70" : "text-muted-foreground";
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M5 14l1.5-4.5A3 3 0 0 1 9.3 7.5h5.4a3 3 0 0 1 2.8 2L19 14v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z"/>
        </svg>
        <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-background bg-brand" />
      </div>
      {!compact && (
        <div className="leading-none">
          <div className={`text-xl font-extrabold tracking-tight ${text}`}>
            LUPA<span className="text-brand">UTO</span>
          </div>
          <div className={`mt-0.5 text-[10px] font-medium ${sub}`}>Revisiones bajo lupa</div>
        </div>
      )}
    </div>
  );
}
