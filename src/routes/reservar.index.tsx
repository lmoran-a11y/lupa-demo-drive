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
            {edit === "location" && (
              <InlineEditPanel title="Editar ubicación" onClose={() => setEdit(null)}>
                {renderLocationEditor({ draftLocation, setDraftLocation, confirmLocation, cancel: () => setEdit(null) })}
              </InlineEditPanel>
            )}
            <SummaryRow
              icon={<CalIcon className="h-4 w-4" />}
              title="Fecha y hora"
              value={`Jueves, ${day} de mayo de 2024\na las ${hour}`}
              onEdit={() => (edit === "datetime" ? setEdit(null) : openEdit("datetime"))}
              active={edit === "datetime"}
            />
            {edit === "datetime" && (
              <InlineEditPanel title="Editar fecha y hora" onClose={() => setEdit(null)}>
                {renderDateTimeEditor({ day, setDay, hour, setHour, location, dgt, setDgt, cancel: () => setEdit(null), confirm: () => setEdit(null) })}
              </InlineEditPanel>
            )}
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

          {/* RIGHT: Payment */}
          <div className="rounded-2xl border border-border bg-card p-6">
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

function EditPanel({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-brand bg-card p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-bold uppercase tracking-widest text-brand">{title}</div>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-muted">
          <X className="h-5 w-5" />
        </button>
      </div>
      {children}
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
