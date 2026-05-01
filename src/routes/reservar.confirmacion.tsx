import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StepProgress } from "@/components/StepProgress";
import { Check, MapPin, Calendar, Clock, Wrench, FileText, MessageCircle, Copy, Headphones, Shield, Home } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { VEHICLE_LABELS, type VehicleType } from "@/lib/pricing";

const schema = z.object({
  dgt: fallback(z.boolean(), false).default(false),
  day: fallback(z.number(), 16).default(16),
  hour: fallback(z.string(), "14:00").default("14:00"),
  location: fallback(z.string(), "Lucena, Córdoba").default("Lucena, Córdoba"),
  total: fallback(z.string(), "180,00").default("180,00"),
  vehicle: fallback(z.enum(["turismo", "suv", "furgoneta", "deportivo"]), "turismo").default("turismo"),
  plate: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/reservar/confirmacion")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Reserva confirmada — LUPAUTO" }] }),
  component: Confirmacion,
});

function Confirmacion() {
  const { dgt, day, hour, location, total, vehicle } = Route.useSearch();
  const vehicleLabel = VEHICLE_LABELS[vehicle as VehicleType] ?? "Turismo";
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={4} />
      <main className="mx-auto max-w-3xl space-y-5 px-6 pb-16">
        <div className="flex items-start gap-4 rounded-2xl border border-success/30 bg-success/10 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white"><Check className="h-6 w-6"/></div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">¡Tu cita está confirmada!</h1>
            <p className="text-sm text-muted-foreground">Envía los datos al vendedor para continuar con la compra.</p>
          </div>
          <div className="rounded-lg border border-success/40 bg-white px-4 py-2 text-right">
            <div className="text-xs text-muted-foreground">Pago realizado</div>
            <div className="text-lg font-extrabold text-success">{total} €</div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Tu taller asignado</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-xs font-extrabold text-white">RTC<br/>SPORT</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">RTC Sport</div>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-bold text-success">Taller verificado <Check className="h-3 w-3"/></span>
              </div>
              <div className="text-sm text-brand">★★★★☆ <span className="text-muted-foreground">4,8 (127 reseñas)</span></div>
              <div className="text-sm text-muted-foreground">Especialistas en revisiones e inspecciones</div>
            </div>
          </div>
          <div className="mt-5 space-y-4 border-t border-border pt-5">
            <Row icon={<MapPin/>} t="Dirección" v={`Calle del Motor, 45\n14900 ${location}`}/>
            <Row icon={<Calendar/>} t="Fecha" v={`Jueves, ${day} de mayo de 2024`}/>
            <Row icon={<Clock/>} t="Hora" v={hour}/>
            <Row icon={<Wrench/>} t="Servicio" v={`Inspección estándar — ${vehicleLabel}`}/>
            <Row icon={<FileText/>} t="Informe DGT" v={dgt ? "Incluido ✓" : "No incluido"}/>
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-lg bg-info/10 p-4 text-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-white">i</div>
            <div>
              <div className="font-bold">Información importante</div>
              <ul className="mt-1 list-inside list-disc text-muted-foreground">
                <li>Por favor, llega 10 minutos antes de tu cita.</li>
                <li>Si necesitas cambiar o cancelar, puedes hacerlo hasta 24h antes desde este enlace.</li>
              </ul>
            </div>
          </div>
        </div>

        <button className="flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-success py-4 font-bold text-white hover:brightness-95">
          <span className="flex items-center gap-2"><MessageCircle className="h-5 w-5"/> Enviar datos al vendedor por WhatsApp</span>
          <span className="text-xs font-normal text-white/80">Recomendado para coordinar la cita con el vendedor.</span>
        </button>
        <button className="flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-brand py-4 font-bold text-ink hover:brightness-95">
          <span className="flex items-center gap-2"><Copy className="h-5 w-5"/> Copiar datos de la cita</span>
          <span className="text-xs font-normal text-ink/80">Se copiarán todos los datos: taller, dirección, fecha, hora y servicio.</span>
        </button>
        <p className="text-center text-xs text-muted-foreground">🔒 Tus datos están seguros. Solo tú decides con quién compartirlos.</p>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10"><Headphones className="h-5 w-5 text-brand"/></div>
            <div>
              <div className="font-bold">¿Necesitas ayuda?</div>
              <div className="text-xs text-muted-foreground">Contacta con nuestro equipo de atención al cliente.</div>
            </div>
          </div>
          <Link to="/contacto" className="rounded-lg border border-border px-4 py-2 text-sm font-bold hover:bg-muted">Contactar ›</Link>
        </div>

        <Link to="/" className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3 font-bold text-ink hover:brightness-95">
          <Home className="h-4 w-4"/> Volver al inicio
        </Link>

        <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
          {[["Talleres verificados","Trabajamos con talleres de confianza"],["Sin sorpresas","Precio cerrado, sin costes ocultos"],["Atención al cliente","Estamos aquí para ayudarte"],["Cancelación gratuita","hasta 24h antes de la cita"]].map(([t,d])=>(
            <div key={t} className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-muted-foreground"/><div><div className="text-sm font-bold">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div></div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
function Row({ icon, t, v }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">{icon}</div>
      <div><div className="text-sm font-bold">{t}</div><div className="whitespace-pre-line text-sm text-muted-foreground">{v}</div></div>
    </div>
  );
}
