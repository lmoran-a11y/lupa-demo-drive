import { useState } from "react";
import { X, UserX, Car, Camera, MoreHorizontal, Clock, ChevronRight, Info, ClipboardList, Scale, Mail, Shield } from "lucide-react";

type IncidentType = "ausencia" | "vehiculo" | "limitada" | "otro";

const TYPES: { id: IncidentType; title: string; desc: string; icon: any; color: string; bg: string; border: string; text: string }[] = [
  { id: "ausencia", title: "Ausencia o retraso", desc: "El cliente no se presenta o llega tarde", icon: UserX, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive", text: "text-destructive" },
  { id: "vehiculo", title: "Vehículo incorrecto", desc: "El vehículo o la matrícula no coinciden con la reserva", icon: Car, color: "text-info", bg: "bg-info/10", border: "border-info", text: "text-info" },
  { id: "limitada", title: "Inspección limitada", desc: "No permiten realizar todas las verificaciones necesarias", icon: Camera, color: "text-brand", bg: "bg-brand/15", border: "border-brand", text: "text-ink" },
  { id: "otro", title: "Otro", desc: "Otra incidencia o situación no contemplada", icon: MoreHorizontal, color: "text-muted-foreground", bg: "bg-muted", border: "border-border", text: "text-foreground" },
];

const SUBTYPES: Record<IncidentType, { icon: any; title: string; desc: string }[]> = {
  ausencia: [
    { icon: UserX, title: "No se presenta", desc: "El cliente no se ha presentado en la cita" },
    { icon: Clock, title: "Llega tarde", desc: "El cliente llega fuera del margen de cortesía" },
  ],
  vehiculo: [
    { icon: Car, title: "Categoría distinta", desc: "El vehículo no coincide con el reservado" },
  ],
  limitada: [
    { icon: Camera, title: "Acceso limitado", desc: "El vendedor no permite prueba dinámica/fotos y video" },
  ],
  otro: [
    { icon: MoreHorizontal, title: "Otra situación", desc: "Describe la incidencia en el siguiente paso" },
  ],
};

export function IncidentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<IncidentType>("ausencia");
  if (!open) return null;
  const current = TYPES.find(t => t.id === selected)!;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 md:p-4" onClick={onClose}>
      <div className="max-h-[95vh] md:max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-card shadow-xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-3 py-2 md:px-6 md:py-4">
          <h2 className="text-sm md:text-lg font-bold">Reportar incidencia</h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-muted"><X className="h-4 w-4 md:h-5 md:w-5"/></button>
        </div>
        <div className="px-3 py-3 md:px-6 md:py-5">
          <h3 className="text-base md:text-2xl font-extrabold">¿Qué ha pasado?</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Selecciona el tipo de incidencia</p>

          <div className="mt-2 md:mt-4 grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-4">
            {TYPES.map(t => {
              const Icon = t.icon;
              const active = selected === t.id;
              return (
                <button key={t.id} onClick={()=>setSelected(t.id)} className={`rounded-xl md:rounded-2xl border-2 p-2 md:p-4 text-center transition ${active ? `${t.border} ${t.bg}` : "border-border bg-card hover:bg-muted/50"}`}>
                  <div className={`mx-auto flex h-8 w-8 md:h-14 md:w-14 items-center justify-center rounded-full ${t.bg}`}>
                    <Icon className={`h-4 w-4 md:h-6 md:w-6 ${t.color}`}/>
                  </div>
                  <div className={`mt-1.5 md:mt-3 text-xs md:text-base font-bold leading-tight ${active ? t.text : ""}`}>{t.title}</div>
                  <p className="mt-0.5 md:mt-1 text-[10px] md:text-xs text-muted-foreground leading-tight hidden md:block">{t.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-3 md:mt-5">
            <div className="rounded-xl md:rounded-2xl border border-border p-3 md:p-5">
              <div className="text-sm md:text-lg font-bold">{current.title}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Selecciona el motivo</p>
              <div className="mt-2 md:mt-4 space-y-2 md:space-y-3">
                {SUBTYPES[selected].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <button key={idx} className="flex w-full items-center gap-2 md:gap-3 rounded-lg md:rounded-xl border border-border p-2 md:p-3 text-left hover:bg-muted/50">
                      <div className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full ${current.bg} shrink-0`}>
                        <Icon className={`h-4 w-4 md:h-5 md:w-5 ${current.color}`}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm md:text-base font-bold leading-tight">{s.title}</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground leading-tight">{s.desc}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0"/>
                    </button>
                  );
                })}
              </div>
              {selected !== "otro" && (
                <div className={`mt-3 md:mt-4 flex flex-wrap items-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl ${current.bg} px-2.5 py-2 md:px-4 md:py-3 text-xs md:text-sm`}>
                  <Info className={`h-3.5 w-3.5 md:h-4 md:w-4 ${current.color}`}/>
                  <span className="font-bold">Compensación al taller:</span>
                  {selected === "vehiculo" ? (
                    <span className={`font-extrabold ${current.text}`}>Se aplicará el ajuste correspondiente</span>
                  ) : (
                    <span className={`font-extrabold ${current.text}`}>{selected === "limitada" ? "100,00 €" : "25,00 €"}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 md:gap-3 border-t border-border px-3 py-2 md:px-6 md:py-4">
          <button onClick={onClose} className="rounded-lg border border-border px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-bold hover:bg-muted">Cancelar</button>
          <button className="rounded-lg bg-brand px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-bold text-ink hover:brightness-95">Continuar</button>
        </div>
      </div>
    </div>
  );
}

function Step({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"><Icon className="h-5 w-5"/></div>
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
function Arrow() {
  return <div className="ml-5 text-muted-foreground">↓</div>;
}
