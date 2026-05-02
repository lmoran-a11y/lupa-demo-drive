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
    { icon: Car, title: "Matrícula no coincide", desc: "La matrícula es distinta a la de la reserva" },
    { icon: Car, title: "Categoría distinta", desc: "El vehículo no coincide con el reservado" },
  ],
  limitada: [
    { icon: Camera, title: "Acceso limitado", desc: "No se permite revisar todas las zonas" },
    { icon: Camera, title: "Falta documentación", desc: "Faltan documentos para la inspección" },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-card shadow-xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-bold">Reportar incidencia</h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-muted"><X className="h-5 w-5"/></button>
        </div>
        <div className="px-6 py-5">
          <h3 className="text-2xl font-extrabold">¿Qué ha pasado?</h3>
          <p className="text-sm text-muted-foreground">Selecciona el tipo de incidencia</p>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {TYPES.map(t => {
              const Icon = t.icon;
              const active = selected === t.id;
              return (
                <button key={t.id} onClick={()=>setSelected(t.id)} className={`rounded-2xl border-2 p-4 text-center transition ${active ? `${t.border} ${t.bg}` : "border-border bg-card hover:bg-muted/50"}`}>
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${t.bg}`}>
                    <Icon className={`h-6 w-6 ${t.color}`}/>
                  </div>
                  <div className={`mt-3 text-base font-bold ${active ? t.text : ""}`}>{t.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <div className="rounded-2xl border border-border p-5">
              <div className="text-lg font-bold">{current.title}</div>
              <p className="text-sm text-muted-foreground">Selecciona el motivo</p>
              <div className="mt-4 space-y-3">
                {SUBTYPES[selected].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <button key={idx} className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-muted/50">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${current.bg}`}>
                        <Icon className={`h-5 w-5 ${current.color}`}/>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{s.title}</div>
                        <div className="text-xs text-muted-foreground">{s.desc}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground"/>
                    </button>
                  );
                })}
              </div>
              <div className={`mt-4 flex items-center gap-2 rounded-xl ${current.bg} px-4 py-3 text-sm`}>
                <Info className={`h-4 w-4 ${current.color}`}/>
                <span className="font-bold">Compensación al taller:</span>
                {selected === "vehiculo" ? (
                  <span className={`font-extrabold ${current.text}`}>Se aplicará el ajuste correspondiente</span>
                ) : (
                  <span className={`font-extrabold ${current.text}`}>{selected === "limitada" ? "100,00 €" : "25,00 €"}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <button onClick={onClose} className="rounded-lg border border-border px-5 py-2 text-sm font-bold hover:bg-muted">Cancelar</button>
          <button className="rounded-lg bg-brand px-5 py-2 text-sm font-bold text-ink hover:brightness-95">Continuar</button>
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
