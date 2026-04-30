import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StepProgress } from "@/components/StepProgress";
import { useState } from "react";
import {
  MapPin,
  Check,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Calendar as CalIcon,
  Shield,
  FileText,
  ArrowRight,
  X,
  Lock,
  Camera,
  Clock,
  Headphones,
  Hourglass,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/reservar/")({
  head: () => ({ meta: [{ title: "Reserva tu inspección — LUPAUTO" }] }),
  component: Reservar,
});

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

type EditMode = null | "location" | "datetime";

function Reservar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Lucena, Córdoba");
  const [draftLocation, setDraftLocation] = useState("Lucena, Córdoba");
  const [locationOk, setLocationOk] = useState(true);
  const [day, setDay] = useState<number>(16);
  const [hour, setHour] = useState<string>("14:00");
  const [dgt, setDgt] = useState(false);
  const [edit, setEdit] = useState<EditMode>(null);
  const [email, setEmail] = useState("");

  const total = (59.9 + (dgt ? 14.99 : 0)).toFixed(2).replace(".", ",");

  const openEdit = (m: EditMode) => {
    setDraftLocation(location);
    setEdit(m);
  };

  const confirmLocation = () => {
    if (draftLocation.trim()) {
      setLocation(draftLocation);
      setLocationOk(true);
    }
    setEdit(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={3} />

      <main className="mx-auto max-w-6xl space-y-8 px-6 pb-16">
        <div>
          <h2 className="text-2xl font-bold">3. Revisa y paga para confirmar tu reserva</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Una vez realizado el pago, te asignaremos el taller y recibirás todos los detalles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          {/* LEFT: Summary */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-base font-bold">Resumen de tu reserva</div>

            <SummaryRow
              icon={<MapPin className="h-4 w-4" />}
              title="Ubicación"
              value={location}
              onEdit={() => (edit === "location" ? setEdit(null) : openEdit("location"))}
              active={edit === "location"}
            />
            <SummaryRow
              icon={<CalIcon className="h-4 w-4" />}
              title="Fecha y hora"
              value={`Jueves, ${day} de mayo de 2024\na las ${hour}`}
              onEdit={() => (edit === "datetime" ? setEdit(null) : openEdit("datetime"))}
              active={edit === "datetime"}
            />
            <SummaryRow
              icon={<Wrench className="h-4 w-4" />}
              title="Servicio"
              value="Inspección estándar"
              onEdit={() => {}}
            />
            <SummaryRow
              icon={<FileText className="h-4 w-4" />}
              title="Informe DGT"
              value={dgt ? "Incluido (+14,99 €)" : "No incluido"}
              onEdit={() => setDgt(!dgt)}
              last
            />

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-info/30 bg-info/5 p-3 text-xs">
              <Shield className="mt-0.5 h-4 w-4 text-info" />
              <div>
                Trabajamos con talleres <span className="font-bold text-info">verificados</span>
                <br />
                de confianza en tu zona.
              </div>
            </div>
          </div>

          {/* RIGHT: Dynamic panel — payment by default, editor when editing */}
          <div className="rounded-2xl border border-border bg-card p-6">
            {edit === "location" ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-brand">
                    Editar ubicación
                  </div>
                  <button
                    onClick={() => setEdit(null)}
                    className="rounded-full p-1 hover:bg-muted"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {renderLocationEditor({ draftLocation, setDraftLocation, confirmLocation, cancel: () => setEdit(null) })}
              </div>
            ) : edit === "datetime" ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-brand">
                    Editar fecha y hora
                  </div>
                  <button
                    onClick={() => setEdit(null)}
                    className="rounded-full p-1 hover:bg-muted"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {renderDateTimeEditor({ day, setDay, hour, setHour, location, dgt, setDgt, cancel: () => setEdit(null), confirm: () => setEdit(null) })}
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="text-sm font-bold">Total a pagar</div>
                    <div className="mt-2 text-5xl font-extrabold tracking-tight">{total} €</div>
                    <div className="mt-1 text-xs text-muted-foreground">IVA incluido</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" /> Pago 100% seguro
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-success/30 bg-success/5 p-3 text-xs">
                    <Shield className="mt-0.5 h-5 w-5 text-success" />
                    <div>
                      <div className="font-bold">Sin sorpresas</div>
                      <div className="text-muted-foreground">
                        Precio cerrado,
                        <br /> sin costes ocultos
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-border" />

                <div>
                  <div className="text-base font-bold">Recibe tu informe aquí</div>
                  <div className="mt-1 text-sm text-muted-foreground">Te enviaremos el informe a este email.</div>
                  <label className="mt-4 block text-sm font-bold">Email</label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@email.com"
                      className="w-full rounded-lg border border-success px-4 py-3 pr-10 outline-none"
                    />
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-success p-1 text-white" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Solo usaremos tu email para enviarte el informe.
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate({
                      to: "/reservar/confirmacion",
                      search: { dgt, day, hour, location, total },
                    })
                  }
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg bg-brand py-4 text-lg font-bold text-ink hover:brightness-95"
                >
                  <Lock className="h-5 w-5" />
                  Reservar inspección por {total} €
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                  <Feature icon={<Check className="h-4 w-4 text-success" />} t="Confirmación" t2="inmediata" />
                  <Feature icon={<Camera className="h-4 w-4 text-muted-foreground" />} t="Informe completo" t2="con fotos y vídeo" />
                  <Feature icon={<Clock className="h-4 w-4 text-muted-foreground" />} t="Informe en 24h" t2="laborables" />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-brand/30 bg-brand/5 px-4 py-3 text-sm">
                  <Hourglass className="h-4 w-4 text-brand" />
                  <span className="font-bold text-ink">Plazas limitadas. Asegura tu cita ahora.</span>
                </div>

                <div className="mt-5 rounded-lg border border-border p-4">
                  <div className="text-xs text-muted-foreground">Paga de forma segura con</div>
                  <div className="mt-3 flex items-center gap-3">
                    <PayBadge label="VISA" />
                    <PayBadge label="MC" />
                    <PayBadge label=" Pay" />
                    <PayBadge label="G Pay" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Pago seguro con cifrado SSL
                </div>
              </>
            )}
          </div>
        </div>

        {/* CANCELLATION BANNER */}
        <div className="flex items-center justify-between rounded-2xl border border-brand/30 bg-brand/5 px-5 py-4">
          <div className="flex items-center gap-3 text-sm">
            <CalIcon className="h-5 w-5 text-brand" />
            <div>
              <b>Cancelación gratuita hasta 24h antes de la cita</b>
              <br />
              <span className="text-xs text-muted-foreground">
                Si cambias de opinión, te devolvemos el dinero.
              </span>
            </div>
          </div>
          <Link to="/contacto" className="text-sm font-bold underline">
            Saber más ›
          </Link>
        </div>

        {/* TRUST ROW */}
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-3">
          <Trust icon={<Shield className="h-5 w-5" />} t="Talleres verificados" d="Solo trabajamos con profesionales de confianza." />
          <Trust icon={<span className="text-lg font-bold">€</span>} t="Precio cerrado" d="Sin costes ocultos. Lo que ves es lo que pagas." />
          <Trust icon={<Headphones className="h-5 w-5" />} t="Atención al cliente" d="Estamos aquí para ayudarte antes, durante y después." />
        </div>
      </main>

      {edit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
          onClick={() => setEdit(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border-2 border-brand bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-widest text-brand">
                {edit === "location" ? "Editar ubicación" : "Editar fecha y hora"}
              </div>
              <button
                onClick={() => setEdit(null)}
                className="rounded-full p-1 hover:bg-muted"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {edit === "location"
              ? renderLocationEditor({ draftLocation, setDraftLocation, confirmLocation, cancel: () => setEdit(null) })
              : renderDateTimeEditor({ day, setDay, hour, setHour, location, dgt, setDgt, cancel: () => setEdit(null), confirm: () => setEdit(null) })}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

/* ---------- helpers ---------- */

function SummaryRow({
  icon,
  title,
  value,
  onEdit,
  active,
  last,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  onEdit: () => void;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`mt-4 flex items-start gap-3 ${last ? "" : "border-b border-border pb-4"}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold">{title}</div>
        <div className="whitespace-pre-line text-sm text-muted-foreground">{value}</div>
        <button
          onClick={onEdit}
          className={`mt-1 text-sm font-bold ${active ? "text-brand" : "text-success"} hover:underline`}
        >
          {active ? "Cerrar" : "Cambiar"}
        </button>
      </div>
    </div>
  );
}

function InlineEditPanel({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 mb-4 rounded-xl border-2 border-brand bg-card p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-widest text-brand">{title}</div>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-muted">
          <X className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  );
}

function renderLocationEditor({
  draftLocation,
  setDraftLocation,
  confirmLocation,
  cancel,
}: {
  draftLocation: string;
  setDraftLocation: (v: string) => void;
  confirmLocation: () => void;
  cancel: () => void;
}) {
  const city = draftLocation.split(",")[0] || "Lucena";
  return (
    <div>
      <label className="text-xs font-bold">Introduce la dirección o ciudad</label>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <input
            value={draftLocation}
            onChange={(e) => setDraftLocation(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          {draftLocation && (
            <button onClick={() => setDraftLocation("")} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={confirmLocation}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-success text-white"
        >
          <Check className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-border">
        <div className="relative flex h-32 items-center justify-center bg-[linear-gradient(135deg,#e8f0e0_0%,#f5f0e0_50%,#e0e8f0_100%)]">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#0001_1px,transparent_1px),linear-gradient(90deg,#0001_1px,transparent_1px)] [background-size:30px_30px]" />
          <div className="absolute h-24 w-24 rounded-full bg-brand/15 ring-2 ring-brand/40" />
          <div className="relative flex flex-col items-center">
            <MapPin className="h-8 w-8 fill-ink text-ink" />
            <div className="mt-1 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-ink">
              {city}
            </div>
          </div>
        </div>
      </div>

      {draftLocation && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-success/30 bg-success/10 p-2 text-xs">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
            <Check className="h-3 w-3" />
          </div>
          <div>
            <div className="font-bold text-success">UBICACIÓN: {city.toUpperCase()}</div>
            <div className="text-muted-foreground">Hemos encontrado tu ubicación correctamente.</div>
          </div>
        </div>
      )}

      <div className="mt-3 flex justify-end gap-2">
        <button onClick={cancel} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold">
          Cancelar
        </button>
        <button onClick={confirmLocation} className="rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-ink">
          Confirmar
        </button>
      </div>
    </div>
  );
}

function renderDateTimeEditor({
  day,
  setDay,
  hour,
  setHour,
  dgt,
  setDgt,
  cancel,
  confirm,
}: {
  day: number;
  setDay: (d: number) => void;
  hour: string;
  setHour: (h: string) => void;
  location: string;
  dgt: boolean;
  setDgt: (v: boolean) => void;
  cancel: () => void;
  confirm: () => void;
}) {
  const days: Array<[number, boolean]> = [
    [29, true], [30, true],
    [1, false], [2, false], [3, false], [4, false], [5, false],
    [6, false], [7, false], [8, false], [9, false], [10, false], [11, false], [12, false],
    [13, false], [14, false], [15, false], [16, false], [17, false], [18, false], [19, false],
    [20, false], [21, false], [22, false], [23, false], [24, false], [25, false], [26, false],
    [27, false], [28, false], [29, false], [30, false], [31, false],
    [1, true], [2, true],
  ];
  return (
    <div>
      <div className="text-xs font-bold">Selecciona el día</div>
      <div className="mt-2 flex items-center justify-between">
        <button className="rounded p-1 hover:bg-muted">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-xs font-bold">Mayo 2024</div>
        <button className="rounded p-1 hover:bg-muted">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-muted-foreground">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
        {days.map(([d, other], i) => (
          <button
            key={i}
            onClick={() => !other && setDay(d)}
            className={`flex h-7 items-center justify-center rounded-full ${
              day === d && !other
                ? "bg-brand font-bold text-ink"
                : other
                ? "text-muted-foreground/40"
                : "hover:bg-muted"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs font-bold">Selecciona la hora</div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {HOURS.map((h) => (
          <button
            key={h}
            onClick={() => setHour(h)}
            className={`rounded-lg border px-2 py-1.5 text-xs font-medium ${
              hour === h ? "border-brand bg-brand text-ink" : "border-border hover:bg-muted"
            }`}
          >
            {h}
          </button>
        ))}
      </div>

      <label className="mt-3 flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/5 px-2 py-2 text-xs font-bold">
        <input
          type="checkbox"
          checked={dgt}
          onChange={(e) => setDgt(e.target.checked)}
          className="h-3.5 w-3.5 accent-[#F5B800]"
        />
        Añadir informe DGT (+14,99 €)
      </label>

      <div className="mt-3 flex justify-end gap-2">
        <button onClick={cancel} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold">
          Cancelar
        </button>
        <button onClick={confirm} className="rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-ink">
          Confirmar
        </button>
      </div>
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
      {ok && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
          <Check className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}

function Feature({ icon, t, t2 }: { icon: React.ReactNode; t: string; t2: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="font-bold leading-tight">{t}</div>
        <div className="text-muted-foreground leading-tight">{t2}</div>
      </div>
    </div>
  );
}

function Trust({ icon, t, d }: { icon: React.ReactNode; t: string; d: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold">{t}</div>
        <div className="text-xs text-muted-foreground">{d}</div>
      </div>
    </div>
  );
}

function PayBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex h-8 items-center justify-center rounded border border-border bg-white px-3 text-xs font-bold text-ink">
      {label}
    </span>
  );
}
