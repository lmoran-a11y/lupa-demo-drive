import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StepProgress } from "@/components/StepProgress";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { getBasePrice, formatEur, VEHICLE_LABELS, type VehicleType } from "@/lib/pricing";
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
  Search,
  Car,
  Euro,
} from "lucide-react";

const reservarSearchSchema = z.object({
  vehicle: fallback(z.enum(["turismo", "suv", "furgoneta", "deportivo", "clasico"]), "turismo").default("turismo"),
  plate: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/reservar/")({
  validateSearch: zodValidator(reservarSearchSchema),
  head: () => ({ meta: [{ title: "Reserva tu inspección — LUPAUTO" }] }),
  component: Reservar,
});

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

type EditMode = null | "location" | "datetime";

function Reservar() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { vehicle, plate } = Route.useSearch();
  const [location, setLocation] = useState("Lucena, Córdoba");
  const [draftLocation, setDraftLocation] = useState("Lucena, Córdoba");
  const [locationOk, setLocationOk] = useState(true);
  const [day, setDay] = useState<number>(16);
  const [hour, setHour] = useState<string>("14:00");
  const [dgt, setDgt] = useState(false);
  const [edit, setEdit] = useState<EditMode>(null);
  const [email, setEmail] = useState("");
  const [brandModel, setBrandModel] = useState("");
  const [confirmVehicle, setConfirmVehicle] = useState(false);
  const [showConditions, setShowConditions] = useState(false);

  const basePrice = getBasePrice(vehicle as VehicleType);
  const totalNum = basePrice + (dgt ? 14.99 : 0);
  const total = formatEur(totalNum);
  const vehicleLabel = VEHICLE_LABELS[vehicle as VehicleType] ?? "Turismo";

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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SiteHeader />
      <StepProgress current={3} />

      <main className="mx-auto max-w-6xl space-y-3 md:space-y-4 px-3 md:px-6 py-4 md:py-6 pb-28 md:pb-6">
        <div>
          <h2 className="text-lg md:text-2xl font-bold leading-tight">3. Revisa y paga para confirmar tu reserva</h2>
          <p className="mt-1 text-xs md:text-sm text-muted-foreground">
            Una vez realizado el pago, te asignaremos el taller y recibirás todos los detalles.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-[1fr_1.4fr]">
          {/* LEFT: Summary */}
          <div className="rounded-2xl border border-border bg-card p-3.5 md:p-4">
            <div className="text-base font-bold">Resumen de tu reserva</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {vehicleLabel} · {plate || "—"}
            </div>

            <SummaryRow
              icon={<MapPin className="h-4 w-4" />}
              title="Ubicación"
              value={location}
              onEdit={() => (edit === "location" ? setEdit(null) : openEdit("location"))}
              active={edit === "location"}
              mobileEditor={renderLocationEditor({ draftLocation, setDraftLocation, confirmLocation, cancel: () => setEdit(null) })}
            />
            <SummaryRow
              icon={<CalIcon className="h-4 w-4" />}
              title="Fecha y hora"
              value={`Jueves, ${day} de mayo de 2024\na las ${hour}`}
              onEdit={() => (edit === "datetime" ? setEdit(null) : openEdit("datetime"))}
              active={edit === "datetime"}
              mobileEditor={renderDateTimeEditor({ day, setDay, hour, setHour, location, dgt, setDgt, cancel: () => setEdit(null), confirm: () => setEdit(null) })}
            />

            <BrandModelPicker value={brandModel} onChange={setBrandModel} />
            <div className={`mt-3 rounded-xl border-2 border-brand p-3 transition-colors ${dgt ? "bg-brand/5" : "bg-card"}`}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <div className="relative">
                    <FileText className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                    <span className="absolute -bottom-0.5 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-success text-[8px] font-bold text-success-foreground">✓</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-base">Informe DGT</div>
                      <span className="rounded-full border border-muted-foreground/30 bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Opcional</span>
                    </div>
                    <div className="whitespace-nowrap text-xs font-semibold text-muted-foreground">+14,99 €</div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Incluye el informe oficial de la Dirección General de Tráfico.
                  </p>
                </div>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-success">✓</span> Titularidad y datos técnicos</li>
                <li className="flex items-center gap-2"><span className="text-success">✓</span> Cargas, embargos y reservas de dominio</li>
                <li className="flex items-center gap-2"><span className="text-success">✓</span> Historial de ITV y kilometraje oficial</li>
              </ul>
              <button
                type="button"
                onClick={() => setDgt(!dgt)}
                className="mt-3 flex w-full items-center gap-3 border-t border-brand pt-3 text-left"
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${dgt ? "border-brand bg-brand text-brand-foreground" : "border-muted-foreground/40 bg-background"}`}>
                  {dgt && <span className="text-xs font-bold leading-none">✓</span>}
                </span>
                <span className="text-sm font-semibold">Añadir a mi reserva</span>
              </button>
            </div>

            <div className="mt-3 flex items-start gap-3 rounded-lg border border-info/30 bg-info/5 p-3 text-xs">
              <Shield className="mt-0.5 h-4 w-4 text-info" />
              <div>
                Trabajamos con talleres <span className="font-bold text-info">verificados</span>
                <br />
                de confianza en tu zona.
              </div>
            </div>
          </div>

          {/* RIGHT: Dynamic panel — payment by default, editor when editing */}
          <div className="rounded-2xl border border-border bg-card p-3.5 md:p-4">
            {!isMobile && edit === "location" ? (
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
            ) : !isMobile && edit === "datetime" ? (
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
              <div id="checkout-final" className="scroll-mt-24">
                <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="font-bold text-base">Total a pagar</div>
                    <div className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">{total} €</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">IVA incluido</div>
                    <div className="mt-2 hidden md:inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" /> Pago 100% seguro
                    </div>
                  </div>
                  <div className="hidden md:flex items-start gap-2 rounded-lg border border-success/30 bg-success/5 p-2 text-xs">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div>
                      <div className="font-bold">Sin sorpresas</div>
                      <div className="text-muted-foreground">
                        Precio cerrado, sin costes ocultos
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-3 border-border" />

                <div>
                  <div className="font-bold text-base">Email para tu informe</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">​</div>
                  <div className="relative mt-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@email.com"
                      className="h-10 w-full rounded-lg border border-success px-3 pr-10 text-sm outline-none"
                    />
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-success p-1 text-white" />
                  </div>

                  <label className="mt-3 flex items-start gap-3 text-sm leading-snug text-foreground">
                    <input
                      type="checkbox"
                      checked={confirmVehicle}
                      onChange={(e) => setConfirmVehicle(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                    />
                    <span className="font-bold">
                      Confirmo que los datos del vehículo indicados en la reserva son correctos para la inspección.
                    </span>
                  </label>

                  <div className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      Si el vehículo no coincide con la reserva, podrán aplicarse ajustes según las condiciones.{" "}
                      <button type="button" onClick={() => setShowConditions(true)} className="font-semibold text-brand underline-offset-2 hover:underline">Ver condiciones</button>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate({
                      to: "/reservar/confirmacion",
                      search: { dgt, day, hour, location, total, vehicle: vehicle as VehicleType, plate },
                    })
                  }
                  disabled={!confirmVehicle}
                  className="mt-4 flex h-11 md:h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm md:text-base font-semibold text-ink hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Lock className="h-4 w-4" />
                  Confirmar reserva
                </button>

                {/* Payment methods — discreet, secondary */}
                <div className="mt-3 flex items-center justify-center gap-2.5 opacity-70">
                  <PayBadge label="VISA" />
                  <PayBadge label="MC" />
                  <PayBadge label=" Pay" />
                  <PayBadge label="G Pay" />
                </div>

                {/* Desktop-only extras */}
                <div className="hidden md:grid mt-3 grid-cols-3 gap-3 text-xs">
                  <Feature icon={<Check className="h-4 w-4 text-success" />} t="Confirmación" t2="inmediata" />
                  <Feature icon={<Camera className="h-4 w-4 text-muted-foreground" />} t="Informe completo" t2="con fotos y vídeo" />
                  <Feature icon={<Clock className="h-4 w-4 text-muted-foreground" />} t="Informe en menos de 24h" t2="" />
                </div>
                <div className="hidden md:flex mt-3 items-center justify-center gap-2 rounded-lg border border-brand/30 bg-brand/5 px-4 py-2 text-sm">
                  <Hourglass className="h-4 w-4 text-brand" />
                  <span className="font-bold text-ink">Plazas limitadas. Asegura tu cita ahora.</span>
                </div>
                <div className="hidden md:flex mt-2 items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Pago seguro con cifrado SSL
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CANCELLATION BANNER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-2xl border border-brand/30 bg-brand/5 px-4 md:px-5 py-3">
          <div className="flex items-start md:items-center gap-3 text-sm">
            <CalIcon className="mt-0.5 md:mt-0 h-5 w-5 shrink-0 text-brand" />
            <div>
              <b className="text-sm">Cancelación gratuita hasta 24h antes de la cita</b>
              <br />
              <span className="text-xs text-muted-foreground">
                Si cambias de opinión, te devolvemos el dinero.
              </span>
            </div>
          </div>
          <Link to="/contacto" className="self-end md:self-auto text-sm font-bold underline">
            Saber más ›
          </Link>
        </div>

        {/* TRUST ROW */}
        <div className="grid gap-3 md:gap-4 rounded-2xl border border-border bg-card px-4 md:px-5 py-3 md:grid-cols-3">
          <Trust icon={<Shield className="h-5 w-5" />} t="Talleres verificados" d="Solo trabajamos con profesionales de confianza." />
          <Trust icon={<span className="text-lg font-bold">€</span>} t="Precio cerrado" d="Sin costes ocultos. Lo que ves es lo que pagas." />
          <Trust icon={<Headphones className="h-5 w-5" />} t="Atención al cliente" d="Estamos aquí para ayudarte antes, durante y después." />
        </div>
      </main>


      <SiteFooter />

      {/* Mobile sticky support bar — scrolls to final checkout area */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex items-center gap-3 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total</span>
            <span className="text-base font-extrabold tracking-tight text-ink">{total} €</span>
          </div>
          <button
            onClick={() => {
              document.getElementById("checkout-final")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="ml-auto flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink/10 bg-ink text-sm font-semibold text-white hover:bg-ink/90"
          >
            Continuar
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showConditions && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowConditions(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl bg-background p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold">Condiciones de reserva</h2>
              <button
                onClick={() => setShowConditions(false)}
                className="rounded-full p-1 hover:bg-muted"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Car className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <div className="font-bold">Veracidad de los datos del vehículo</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    El cliente es responsable de introducir correctamente la matrícula y seleccionar la categoría adecuada del vehículo. Estos datos serán la base para la reserva y la tarifa aplicada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Euro className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <div className="font-bold">Ajuste de precio</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Si el vehículo presentado pertenece a una categoría distinta de la reservada, LUPAUTO podrá recalcular el precio del servicio conforme a la tarifa de categorías vigente.
                  </p>
                  <p className="mt-2 text-sm font-bold text-foreground">
                    En ese caso, se aplicará el cobro o la devolución de la diferencia en el método de pago autorizado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Shield className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <div className="font-bold">Cómo se gestiona el ajuste</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Una vez verificada la incidencia comunicada por el taller, se gestionará el cobro o la devolución de la diferencia a través del método de pago facilitado en la reserva.
                    <br />
                    La comunicación correspondiente se enviará al email indicado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <div className="font-bold">Más información</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Consulta todos los detalles en nuestras{" "}
                    <Link to="/legal/terminos" className="font-semibold text-brand hover:underline">Condiciones Generales de Reserva</Link>{" "}
                    y en la{" "}
                    <Link to="/legal/privacidad" className="font-semibold text-brand hover:underline">Política de Privacidad</Link>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowConditions(false)}
                className="rounded-lg border border-border px-5 py-2 text-sm font-semibold hover:bg-muted"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
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
  mobileEditor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  onEdit: () => void;
  active?: boolean;
  last?: boolean;
  mobileEditor?: React.ReactNode;
}) {
  return (
    <div className={`mt-3 md:mt-4 ${last ? "" : "border-b border-border pb-3 md:pb-4"}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40">
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-bold text-base">{title}</div>
          <div className="whitespace-pre-line text-sm text-muted-foreground">{value}</div>
          <button
            onClick={onEdit}
            className={`mt-1 font-bold text-base ${active ? "text-brand" : "text-success"} hover:underline`}
          >
            {active ? "Cerrar" : "Cambiar"}
          </button>
        </div>
      </div>
      {active && mobileEditor && (
        <div className="md:hidden mt-3 rounded-xl border-2 border-brand bg-card p-3 shadow-sm">
          {mobileEditor}
        </div>
      )}
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
        <iframe
          key={draftLocation}
          title={`Mapa de ${city}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(draftLocation || city)}&z=13&output=embed`}
          className="h-48 md:h-64 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(draftLocation || city)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
      >
        <MapPin className="h-3 w-3" /> Abrir en Google Maps
      </a>

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
        <div className="font-bold text-base">{t}</div>
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

const VEHICLE_DB: Record<string, string[]> = {
  "Alfa Romeo": ["Giulia", "Giulietta", "Stelvio", "Tonale", "MiTo", "147", "159"],
  "Aston Martin": ["DB11", "DBX", "Vantage"],
  Audi: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"],
  Bentley: ["Bentayga", "Continental", "Flying Spur"],
  BMW: ["Serie 1", "Serie 2", "Serie 3", "Serie 4", "Serie 5", "Serie 6", "Serie 7", "Serie 8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX"],
  BYD: ["Atto 3", "Dolphin", "Han", "Seal", "Tang"],
  Chevrolet: ["Aveo", "Captiva", "Cruze", "Spark"],
  Chrysler: ["300C", "Voyager", "PT Cruiser"],
  Citroën: ["C1", "C2", "C3", "C3 Aircross", "C4", "C4 Cactus", "C4 Picasso", "C5", "C5 Aircross", "C5 X", "Berlingo", "DS3", "DS4", "DS5", "Xsara", "Xsara Picasso"],
  Cupra: ["Ateca", "Born", "Formentor", "León", "Tavascan"],
  Dacia: ["Dokker", "Duster", "Jogger", "Lodgy", "Logan", "Sandero", "Spring"],
  Daewoo: ["Lanos", "Matiz", "Nubira"],
  DS: ["DS3", "DS4", "DS5", "DS7 Crossback", "DS9"],
  Ferrari: ["296", "812", "F8", "Portofino", "Roma", "SF90"],
  Fiat: ["500", "500L", "500X", "600", "Bravo", "Doblò", "Panda", "Punto", "Stilo", "Tipo"],
  Ford: ["B-Max", "C-Max", "EcoSport", "Edge", "Fiesta", "Focus", "Galaxy", "Ka", "Kuga", "Mondeo", "Mustang", "Puma", "Ranger", "S-Max", "Tourneo", "Transit"],
  Genesis: ["G70", "G80", "GV60", "GV70", "GV80"],
  Honda: ["Accord", "Civic", "CR-V", "HR-V", "Jazz", "e"],
  Hyundai: ["Bayon", "i10", "i20", "i30", "i40", "Ioniq", "Ioniq 5", "Ioniq 6", "Kona", "Santa Fe", "Tucson"],
  Infiniti: ["Q30", "Q50", "Q60", "QX30", "QX50", "QX70"],
  Isuzu: ["D-Max"],
  Jaguar: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF", "XJ"],
  Jeep: ["Avenger", "Cherokee", "Compass", "Grand Cherokee", "Renegade", "Wrangler"],
  Kia: ["Carens", "Ceed", "EV6", "EV9", "Niro", "Picanto", "ProCeed", "Rio", "Sorento", "Soul", "Sportage", "Stonic", "Stinger", "XCeed"],
  Lamborghini: ["Aventador", "Huracán", "Urus"],
  Lancia: ["Delta", "Musa", "Y", "Ypsilon"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  Lexus: ["CT", "ES", "IS", "LC", "LS", "NX", "RX", "UX"],
  Lotus: ["Elise", "Emira", "Eletre", "Evora", "Exige"],
  Maserati: ["Ghibli", "Grecale", "GranTurismo", "Levante", "MC20", "Quattroporte"],
  Mazda: ["2", "3", "5", "6", "CX-3", "CX-30", "CX-5", "CX-60", "MX-5", "MX-30"],
  Mercedes: ["Clase A", "Clase B", "Clase C", "Clase E", "Clase S", "CLA", "CLS", "EQA", "EQB", "EQC", "EQE", "EQS", "GLA", "GLB", "GLC", "GLE", "GLS", "SL", "SLK", "Vito", "Viano", "Citan"],
  MG: ["MG3", "MG4", "MG5", "HS", "ZS", "Marvel R", "Cyberster"],
  Mini: ["Cabrio", "Clubman", "Cooper", "Countryman", "One", "Paceman"],
  Mitsubishi: ["ASX", "Eclipse Cross", "L200", "Lancer", "Outlander", "Space Star"],
  Nissan: ["350Z", "370Z", "Ariya", "GT-R", "Juke", "Leaf", "Micra", "Murano", "Navara", "Note", "Pulsar", "Qashqai", "X-Trail"],
  Opel: ["Adam", "Agila", "Astra", "Combo", "Corsa", "Crossland", "Frontera", "Grandland", "Insignia", "Karl", "Meriva", "Mokka", "Mokka-e", "Tigra", "Vectra", "Zafira"],
  Peugeot: ["106", "107", "108", "206", "207", "208", "2008", "306", "307", "308", "3008", "406", "407", "408", "508", "5008", "Partner", "Rifter", "RCZ", "e-208", "e-2008"],
  Polestar: ["1", "2", "3", "4"],
  Porsche: ["718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  Renault: ["Arkana", "Austral", "Captur", "Clio", "Espace", "Kadjar", "Kangoo", "Koleos", "Laguna", "Mégane", "Mégane E-Tech", "Modus", "Scénic", "Talisman", "Trafic", "Twingo", "Zoe"],
  "Rolls-Royce": ["Cullinan", "Ghost", "Phantom", "Spectre", "Wraith"],
  Saab: ["9-3", "9-5"],
  Seat: ["Alhambra", "Altea", "Arona", "Ateca", "Córdoba", "Exeo", "Ibiza", "León", "Mii", "Tarraco", "Toledo"],
  Skoda: ["Citigo", "Enyaq", "Fabia", "Karoq", "Kamiq", "Kodiaq", "Octavia", "Rapid", "Roomster", "Scala", "Superb", "Yeti"],
  Smart: ["ForFour", "ForTwo", "#1", "#3"],
  SsangYong: ["Korando", "Rexton", "Tivoli", "XLV"],
  Subaru: ["Forester", "Impreza", "Legacy", "Outback", "XV"],
  Suzuki: ["Across", "Baleno", "Celerio", "Ignis", "Jimny", "S-Cross", "Swace", "Swift", "SX4", "Vitara"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"],
  Toyota: ["Auris", "Aygo", "Aygo X", "C-HR", "Camry", "Corolla", "GR86", "GR Yaris", "Highlander", "Hilux", "Land Cruiser", "Mirai", "Prius", "Proace", "RAV4", "Supra", "Verso", "Yaris", "Yaris Cross", "bZ4X"],
  Volkswagen: ["Amarok", "Arteon", "Beetle", "Caddy", "Crafter", "Eos", "Golf", "Golf Plus", "ID.3", "ID.4", "ID.5", "ID.7", "ID. Buzz", "Jetta", "Multivan", "Passat", "Polo", "Scirocco", "Sharan", "T-Cross", "T-Roc", "Tiguan", "Touareg", "Touran", "Transporter", "Up!"],
  Volvo: ["C30", "C40", "EX30", "EX90", "S40", "S60", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "XC40", "XC60", "XC70", "XC90"],
};

function BrandModelPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"brand" | "model">("brand");
  const [brand, setBrand] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const brands = Object.keys(VEHICLE_DB);
  const list =
    step === "brand"
      ? brands.filter((b) => b.toLowerCase().includes(query.toLowerCase()))
      : (brand ? VEHICLE_DB[brand] : []).filter((m) => m.toLowerCase().includes(query.toLowerCase()));

  const reset = () => {
    setStep("brand");
    setBrand(null);
    setQuery("");
  };

  return (
    <div className="mt-3 md:mt-4 border-b border-border pb-3 md:pb-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40">
          <Car className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-base">Marca y modelo <span className="text-xs font-normal text-muted-foreground">(opcional)</span></div>
          {value ? (
            <div className="text-sm text-muted-foreground">{value}</div>
          ) : (
            <div className="text-sm text-muted-foreground">Sin especificar</div>
          )}
          <button
            onClick={() => {
              if (open) {
                setOpen(false);
              } else {
                reset();
                setOpen(true);
              }
            }}
            className={`mt-1 font-bold text-base ${open ? "text-brand" : "text-success"} hover:underline`}
          >
            {open ? "Cerrar" : value ? "Cambiar" : "Añadir"}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 rounded-xl border-2 border-brand bg-card p-4 shadow-md">
          <div className="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-brand">
            <span>{step === "brand" ? "Selecciona marca" : `Modelos de ${brand}`}</span>
            {step === "model" && (
              <button onClick={reset} className="text-xs font-bold text-muted-foreground hover:text-foreground">
                ← Cambiar marca
              </button>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={step === "brand" ? "Buscar marca…" : "Buscar modelo…"}
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-brand"
            />
          </div>

          <ul className="mt-3 max-h-56 overflow-y-auto rounded-lg border border-border">
            {list.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">Sin resultados</li>
            ) : (
              list.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      if (step === "brand") {
                        setBrand(item);
                        setStep("model");
                        setQuery("");
                      } else {
                        onChange(`${brand} ${item}`);
                        setOpen(false);
                        reset();
                      }
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <span>{item}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
