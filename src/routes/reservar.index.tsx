import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StepProgress } from "@/components/StepProgress";
import { useState } from "react";
import { MapPin, Check, Wrench, ChevronLeft, ChevronRight, Calendar as CalIcon, Shield, FileText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/reservar")({
  head: () => ({ meta: [{ title: "Reserva tu inspección — LUPAUTO" }] }),
  component: Reservar,
});

const HOURS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
const VEHICLE_TYPES = ["Turismo","Deportivo","SUV / 4x4","Furgoneta"];

function Reservar() {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState("Turismo");
  const [location, setLocation] = useState("Lucena, Córdoba");
  const [locationOk, setLocationOk] = useState(true);
  const [day, setDay] = useState<number | null>(16);
  const [hour, setHour] = useState<string | null>("14:00");
  const [dgt, setDgt] = useState(false);

  const total = (59.9 + (dgt ? 14.99 : 0)).toFixed(2).replace(".", ",");

  const ready = vehicle && locationOk && day && hour;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={ready ? 3 : (locationOk ? 2 : 1)} />

      <main className="mx-auto max-w-6xl space-y-10 px-6 pb-16">
        {/* SECTION 1 */}
        <section>
          <h2 className="text-2xl font-bold">1. ¿Dónde está el vehículo?</h2>
          <p className="mt-1 text-sm text-muted-foreground">Indica la ubicación exacta para asignar el taller más cercano.</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <label className="text-sm font-bold">Introduce la dirección o ciudad</label>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <input value={location} onChange={(e) => { setLocation(e.target.value); setLocationOk(false); }} className="flex-1 outline-none" />
                </div>
                <button onClick={() => setLocationOk(true)} className="flex h-11 w-11 items-center justify-center rounded-full bg-success text-white"><Check className="h-5 w-5" /></button>
              </div>
              <div className="mt-3">
                <label className="text-sm font-bold">Tipo de vehículo</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {VEHICLE_TYPES.map((v) => (
                    <button key={v} onClick={() => setVehicle(v)} className={`rounded-lg border px-3 py-2 text-sm font-medium ${vehicle===v?"border-brand bg-brand/10":"border-border hover:bg-muted"}`}>{v}</button>
                  ))}
                </div>
              </div>
              {locationOk && (
                <div className="mt-4 flex items-start gap-3 rounded-lg border border-success/30 bg-success/10 p-4 text-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white"><Check className="h-4 w-4" /></div>
                  <div>
                    <div className="font-bold">UBICACIÓN: {location.split(",")[0].toUpperCase()}</div>
                    <div className="text-muted-foreground">Hemos encontrado tu ubicación correctamente.</div>
                  </div>
                </div>
              )}
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
              <div className="relative flex h-full min-h-[260px] items-center justify-center bg-[linear-gradient(135deg,#e8f0e0_0%,#f5f0e0_50%,#e0e8f0_100%)]">
                <MapPin className="h-12 w-12 fill-ink text-ink" />
                <div className="absolute bottom-3 right-3 rounded bg-white/90 px-2 py-1 text-xs font-bold text-ink">Lucena</div>
              </div>
            </div>
          </div>
        </section>

        {locationOk && (
          <>
            {/* SECTION 2 */}
            <section>
              <h2 className="text-2xl font-bold">2. Elige el día y la hora disponibles</h2>
              <p className="mt-1 text-sm text-muted-foreground">Los horarios mostrados pertenecen al taller que se te asignará.</p>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_1fr]">
                {/* CALENDAR */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-sm font-bold">Selecciona el día</div>
                  <div className="mt-3 flex items-center justify-between">
                    <button className="rounded p-1 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
                    <div className="text-sm font-bold">Mayo 2024</div>
                    <button className="rounded p-1 hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground">
                    {["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"].map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
                    {[29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((d, i) => {
                      const isOther = i < 2 || i > 32;
                      return (
                        <button
                          key={i}
                          onClick={() => !isOther && setDay(d)}
                          className={`flex h-8 items-center justify-center rounded-full ${
                            day===d && !isOther ? "bg-brand font-bold text-ink" : isOther ? "text-muted-foreground/40" : "hover:bg-muted"
                          }`}
                        >{d}</button>
                      );
                    })}
                  </div>
                </div>
                {/* HOURS */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-sm font-bold">Selecciona la hora</div>
                  <div className="mt-1 text-xs text-muted-foreground">Horarios disponibles para el taller asignado</div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {HOURS.map((h) => (
                      <button key={h} onClick={() => setHour(h)} className={`rounded-lg border px-2 py-2 text-sm font-medium ${hour===h?"border-brand bg-brand text-ink":"border-border hover:bg-muted"}`}>
                        {h} {hour===h && "✓"}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><Shield className="h-3 w-3"/> La reserva incluye hasta 24h en taller para la inspección.</p>
                </div>
                {/* SELECTION */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-sm font-bold">Tu selección</div>
                  <div className="mt-3 space-y-3 text-sm">
                    <Row label="Ubicación" value={location} ok />
                    <Row label="Fecha" value={day ? `${day} de mayo` : "—"} ok={!!day} />
                    <Row label="Hora" value={hour ?? "—"} ok={!!hour} />
                  </div>
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-brand/10 p-3 text-xs">
                    <CalIcon className="mt-0.5 h-4 w-4 text-brand" />
                    <div><b>Horarios limitados</b><br/>Asegura ahora tu cita para garantizar disponibilidad.</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4">
                <Wrench className="mt-0.5 h-5 w-5 text-brand" />
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-bold">
                    <input type="checkbox" checked={dgt} onChange={(e)=>setDgt(e.target.checked)} className="h-4 w-4 accent-[#F5B800]" />
                    Añadir informe DGT (+14,99 €)
                    <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-ink">Recomendado</span>
                  </label>
                  <p className="ml-6 text-xs text-muted-foreground">Incluye datos oficiales: titularidad, cargas e historial.</p>
                </div>
              </div>
            </section>

            {/* SECTION 3 */}
            <section>
              <h2 className="text-2xl font-bold">3. Revisa y paga para confirmar tu reserva</h2>
              <p className="mt-1 text-sm text-muted-foreground">Una vez realizado el pago, te asignaremos el taller y recibirás todos los detalles.</p>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_1fr]">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-sm font-bold">Resumen de tu reserva</div>
                  <Summary icon={<MapPin className="h-4 w-4"/>} t="Ubicación del vehículo" v={location}/>
                  <Summary icon={<CalIcon className="h-4 w-4"/>} t="Fecha y hora" v={`Jueves, ${day} de mayo de 2024 a las ${hour}`}/>
                  <Summary icon={<Wrench className="h-4 w-4"/>} t="Servicio" v="Inspección estándar"/>
                  <Summary icon={<FileText className="h-4 w-4"/>} t="Informe DGT" v={dgt?"Incluido":"No incluido"}/>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 text-center">
                  <div className="text-sm font-bold">Total a pagar</div>
                  <div className="mt-2 text-4xl font-extrabold">{total} €</div>
                  <div className="text-xs text-muted-foreground">IVA incluido</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">🔒 Pago 100% seguro</div>
                  <button onClick={() => navigate({ to: "/reservar/confirmacion", search: { dgt, day: day ?? 16, hour: hour ?? "14:00", location, total } })} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-bold text-ink hover:brightness-95">
                    Pagar y confirmar reserva <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs">
                    <span className="rounded border border-border px-2 py-1 font-bold text-info">VISA</span>
                    <span className="rounded border border-border px-2 py-1 text-xs">●●</span>
                    <span className="rounded border border-border px-2 py-1 text-xs"> Pay</span>
                    <span className="rounded border border-border px-2 py-1 text-xs">G Pay</span>
                  </div>
                </div>
                <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
                  <Trust t="Talleres verificados" d="Trabajamos con talleres de confianza" />
                  <Trust t="Sin sorpresas" d="Precio cerrado, sin costes ocultos" />
                  <Trust t="Atención al cliente" d="Estamos aquí para ayudarte" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-brand/30 bg-brand/5 px-5 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-brand" />
                  <div><b>Cancelación gratuita hasta 24h antes de la cita</b><br/><span className="text-xs text-muted-foreground">Si cambias de opinión, te devolvemos el dinero.</span></div>
                </div>
                <Link to="/contacto" className="text-sm font-bold underline">Saber más ›</Link>
              </div>
            </section>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-start justify-between border-b border-border pb-2">
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`font-medium ${ok ? "text-success" : ""}`}>{value}</div>
      </div>
      {ok && <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white"><Check className="h-3 w-3"/></div>}
    </div>
  );
}
function Summary({ icon, t, v }: any) {
  return (
    <div className="mt-3 flex items-start gap-3 border-b border-border pb-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{icon}</div>
      <div className="flex-1">
        <div className="text-xs font-bold">{t}</div>
        <div className="text-sm text-muted-foreground">{v}</div>
      </div>
      <button className="text-xs font-bold text-success">Editar</button>
    </div>
  );
}
function Trust({ t, d }: { t: string; d: string }) {
  return (
    <div className="flex items-start gap-3">
      <Shield className="mt-0.5 h-5 w-5 text-muted-foreground" />
      <div><div className="text-sm font-bold">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
    </div>
  );
}
