import { Check } from "lucide-react";

export function StepProgress({ current }: { current: 1 | 2 | 3 | 4 }) {
  const steps = [
    { n: 1, label: "Vehículo" },
    { n: 2, label: "Pago" },
    { n: 3, label: "Confirmación" },
  ];
  return (
    <div className="flex items-center justify-center gap-1.5 md:gap-2 px-3 py-3 overflow-x-auto">
      {steps.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <div key={s.n} className="flex shrink-0 items-center gap-1.5 md:gap-2">
            <div
              className={`flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full text-xs md:text-sm font-bold ${
                done ? "bg-ink text-white" : active ? "bg-brand text-ink" : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-3.5 w-3.5 md:h-4 md:w-4" /> : s.n}
            </div>
            <span className={`text-xs md:text-sm font-medium ${active || done ? "text-ink" : "text-muted-foreground"}`}>{s.label}</span>
            {i < steps.length - 1 && <div className="mx-1 md:mx-2 h-px w-5 md:w-16 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}
