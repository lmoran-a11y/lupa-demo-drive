import { Check } from "lucide-react";

export function StepProgress({ current }: { current: 1 | 2 | 3 | 4 }) {
  const steps = [
    { n: 1, label: "Vehículo" },
    { n: 3, label: "Pago" },
    { n: 4, label: "Confirmación" },
  ];
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {steps.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <div key={s.n} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                done ? "bg-ink text-white" : active ? "bg-brand text-ink" : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : s.n}
            </div>
            <span className={`text-sm font-medium ${active || done ? "text-ink" : "text-muted-foreground"}`}>{s.label}</span>
            {i < steps.length - 1 && <div className="mx-2 h-px w-10 bg-border md:w-16" />}
          </div>
        );
      })}
    </div>
  );
}
