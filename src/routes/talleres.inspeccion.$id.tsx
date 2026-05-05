import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import {
  ArrowLeft, Save, Send, Check, AlertTriangle, X, Camera, Upload, Zap,
  Settings, Car, Gauge, Calendar, Cpu, Activity, Droplet, Disc, CircleDot,
  Wind, Shield, SprayCan, Brush, LayoutGrid, Armchair, Image as ImageIcon,
  PlayCircle, Info,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { workshopInspections } from "@/lib/mock-data";
import { getWorkshopPayout, formatEur } from "@/lib/workshop-pricing";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/talleres/inspeccion/$id")({
  head: () => ({ meta: [{ title: "Informe LUPA — LUPAUTO" }] }),
  component: Report,
});

type Tone = "ok" | "warn" | "bad" | "neutral";
const toneCls: Record<Tone, string> = {
  ok: "border-success bg-success/10 text-success",
  warn: "border-brand bg-brand/10 text-ink",
  bad: "border-destructive bg-destructive/10 text-destructive",
  neutral: "border-ink bg-ink/5 text-ink",
};
const toneIcon = (t: Tone) =>
  t === "ok" ? <Check className="h-3.5 w-3.5" /> :
  t === "warn" ? <AlertTriangle className="h-3.5 w-3.5" /> :
  t === "bad" ? <X className="h-3.5 w-3.5" /> : null;

function Report() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const inspection = workshopInspections.find(i => i.id === id) ?? workshopInspections[0];
  const payout = getWorkshopPayout(inspection.vehicleType);

  // ---- state ----
  const [diag, setDiag] = useState("ok");
  const [km, setKm] = useState("ok");
  const [motor, setMotor] = useState("bueno");
  const [aceite, setAceite] = useState("no");
  const [refri, setRefri] = useState("no");
  const [frenos, setFrenos] = useState({ pd: 70, dd: 75, pt: 60, dt: 65 });
  const [tyres, setTyres] = useState({ fl: 70, fr: 70, rl: 50, rr: 50 });
  const [susp, setSusp] = useState({ amort: "ok", silent: "ok", rot: "ok", dir: "ok" });
  const [escape, setEscape] = useState("ok");

  const [estructural, setEstructural] = useState("ok");
  const [repaint, setRepaint] = useState("ninguno");
  const [masilla, setMasilla] = useState("ok");
  const [aline, setAline] = useState("ok");
  const [interiorRows, setInteriorRows] = useState({ volante: "warn", pedales: "warn", asiento: "warn" });
  const [interiorGen, setInteriorGen] = useState("ok");
  const [estado, setEstado] = useState("ok");
  const [kmLlegada, setKmLlegada] = useState(120000);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function send() {
    setConfirmOpen(false);
    alert(`✅ Informe enviado correctamente.\nLa inspección se ha marcado como completada y el pago de ${formatEur(payout)} € se transferirá automáticamente a tu taller.`);
    navigate({ to: "/talleres/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* sticky action bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <button onClick={() => navigate({ to: "/talleres/dashboard" })} className="flex items-center gap-2 text-sm font-bold">
          <ArrowLeft className="h-4 w-4" />Volver
        </button>
        <div className="text-xs text-muted-foreground">Editando informe · <b className="text-ink">{inspection.id}</b></div>
        <div className="flex gap-2">
          <button onClick={() => alert("💾 Progreso guardado")} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-bold">
            <Save className="h-4 w-4" />Guardar progreso
          </button>
          <button onClick={() => setConfirmOpen(true)} className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink hover:brightness-95">
            <Send className="h-4 w-4" />Enviar informe
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4 px-6 py-6">
        {/* TITLE HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              INFORME <span className="text-brand">LUPA</span>
            </h1>
            <div className="mt-1 text-sm font-bold tracking-wider text-muted-foreground">INSPECCIÓN PRE-COMPRA</div>
          </div>
          <Logo size="xl" />
        </div>

        {/* INFO BAR */}
        <div className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-3">
          <Meta icon={<LicensePlateIcon />} t="MATRÍCULA" v={inspection.plate} />
          <KmMeta value={kmLlegada} onChange={setKmLlegada} />
          <Meta icon={<Calendar className="h-5 w-5" />} t="FECHA INSPECCIÓN" v={inspection.date} />
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* MECÁNICA */}
          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <SectionHeader icon={<Settings className="h-4 w-4" />} title="1. MECÁNICA" />
            <div className="space-y-5 p-5">
              <Field icon={<Cpu className="h-4 w-4" />} label="DIAGNOSIS ELECTRÓNICA">
                <Pills cols={3}
                  value={diag} onChange={setDiag}
                  options={[
                    { v: "ok", label: "SIN FALLOS", tone: "ok" },
                    { v: "warn", label: "FALLOS REGISTRADOS", tone: "warn" },
                    { v: "bad", label: "FALLOS ACTIVOS", tone: "bad" },
                  ]} />
              </Field>

              <Field icon={<Gauge className="h-4 w-4" />} label="VERIFICACIÓN DE KILOMETRAJE">
                <Pills cols={3}
                  value={km} onChange={setKm}
                  options={[
                    { v: "ok", label: "COHERENTE", sub: "con datos electrónicos", tone: "ok" },
                    { v: "warn", label: "NO VERIFICABLE", sub: "con los datos disponibles", tone: "warn" },
                    { v: "bad", label: "MANIPULACIÓN DETECTADA", sub: "(discrepancia entre módulos)", tone: "bad" },
                  ]} />
              </Field>

              <Field icon={<Activity className="h-4 w-4" />} label="ESTADO DEL MOTOR">
                <Pills cols={4}
                  value={motor} onChange={setMotor}
                  options={[
                    { v: "excelente", label: "EXCELENTE", tone: "ok" },
                    { v: "bueno", label: "BUENO", tone: "ok" },
                    { v: "correcto", label: "CORRECTO", tone: "warn" },
                    { v: "problema", label: "PROBLEMA DETECTADO", tone: "bad" },
                  ]} />
              </Field>

              <Field icon={<Droplet className="h-4 w-4" />} label="FUGAS">
                <LeakRow label="ACEITE" value={aceite} onChange={setAceite} />
                <LeakRow label="REFRIGERANTE" value={refri} onChange={setRefri} />
              </Field>

              <Field icon={<Disc className="h-4 w-4" />} label="FRENOS">
                <BrakeRow label="PASTILLAS DELANTERAS" value={frenos.pd} onChange={(n) => setFrenos({ ...frenos, pd: n })} />
                <BrakeRow label="DISCOS DELANTEROS" value={frenos.dd} onChange={(n) => setFrenos({ ...frenos, dd: n })} />
                <div className="h-2" />
                <BrakeRow label="PASTILLAS TRASERAS" value={frenos.pt} onChange={(n) => setFrenos({ ...frenos, pt: n })} />
                <BrakeRow label="DISCOS TRASEROS" value={frenos.dt} onChange={(n) => setFrenos({ ...frenos, dt: n })} />
              </Field>

              <Field icon={<CircleDot className="h-4 w-4" />} label="NEUMÁTICOS">
                <TyreDiagram tyres={tyres} setTyres={setTyres} />
              </Field>

              <Field icon={<Settings className="h-4 w-4" />} label="SUSPENSIÓN Y DIRECCIÓN">
                <SuspRow label="AMORTIGUADORES" value={susp.amort} onChange={(v) => setSusp({ ...susp, amort: v })} />
                <SuspRow label="SILENTBLOCKS" value={susp.silent} onChange={(v) => setSusp({ ...susp, silent: v })} />
                <SuspRow label="RÓTULAS / BRAZOS" value={susp.rot} onChange={(v) => setSusp({ ...susp, rot: v })} />
                <SuspRow label="DIRECCIÓN" value={susp.dir} onChange={(v) => setSusp({ ...susp, dir: v })} />
              </Field>

              <Field icon={<Wind className="h-4 w-4" />} label="ESCAPE">
                <Pills cols={3}
                  value={escape} onChange={setEscape}
                  options={[
                    { v: "ok", label: "SIN FUGAS", tone: "ok" },
                    { v: "warn", label: "FUGA LEVE", tone: "warn" },
                    { v: "bad", label: "FUGA IMPORTANTE", tone: "bad" },
                  ]} />
              </Field>
            </div>
          </section>

          {/* CARROCERÍA E INTERIOR */}
          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <SectionHeader icon={<Car className="h-4 w-4" />} title="2. CARROCERÍA E INTERIOR" />
            <div className="space-y-5 p-5">
              <Field icon={<Shield className="h-4 w-4" />} label="DAÑOS ESTRUCTURALES" inline>
                <Pills cols={2}
                  value={estructural} onChange={setEstructural}
                  options={[
                    { v: "ok", label: "NO DETECTADOS", tone: "ok" },
                    { v: "bad", label: "DETECTADOS", tone: "bad" },
                  ]} />
              </Field>

              <Field icon={<SprayCan className="h-4 w-4" />} label="REPINTADOS" inline>
                <Pills cols={4}
                  value={repaint} onChange={setRepaint}
                  options={[
                    { v: "ninguno", label: "NINGUNO", tone: "ok" },
                    { v: "1-2", label: "1 - 2 PANELES", tone: "warn" },
                    { v: "3-4", label: "3 - 4 PANELES", tone: "warn" },
                    { v: "+4", label: "+ 4 PANELES", tone: "bad" },
                  ]} />
              </Field>

              <Field icon={<Brush className="h-4 w-4" />} label="MASILLA" inline>
                <Pills cols={2}
                  value={masilla} onChange={setMasilla}
                  options={[
                    { v: "ok", label: "NO", tone: "ok" },
                    { v: "bad", label: "SÍ", tone: "bad" },
                  ]} />
              </Field>

              <Field icon={<LayoutGrid className="h-4 w-4" />} label="ALINEACIÓN DE PANELES" inline>
                <Pills cols={3}
                  value={aline} onChange={setAline}
                  options={[
                    { v: "ok", label: "CORRECTA", tone: "ok" },
                    { v: "warn", label: "VARIACIÓN LEVE", tone: "warn" },
                    { v: "bad", label: "DESALINEACIÓN", tone: "bad" },
                  ]} />
              </Field>

              <Field icon={<Armchair className="h-4 w-4" />} label="INTERIOR">
                <InteriorRow label="VOLANTE" value={interiorRows.volante} onChange={(v) => setInteriorRows({ ...interiorRows, volante: v })} />
                <InteriorRow label="PEDALES" value={interiorRows.pedales} onChange={(v) => setInteriorRows({ ...interiorRows, pedales: v })} />
                <InteriorRow label="ASIENTO CONDUCTOR" value={interiorRows.asiento} onChange={(v) => setInteriorRows({ ...interiorRows, asiento: v })} />
                <div className="flex items-center gap-3 pt-1">
                  <span className="w-44 text-xs font-bold">INTERIOR GENERAL</span>
                  <div className="flex-1">
                    <Pills cols={3}
                      value={interiorGen} onChange={setInteriorGen}
                      options={[
                        { v: "ok", label: "BUENO", tone: "ok" },
                        { v: "warn", label: "REGULAR", tone: "warn" },
                        { v: "bad", label: "MALO", tone: "bad" },
                      ]} />
                  </div>
                </div>
              </Field>

              <Field icon={<ImageIcon className="h-4 w-4" />} label="FOTOGRAFÍAS INCLUIDAS">
                <div className="grid grid-cols-4 gap-2">
                  {["FRONTAL", "TRASERA", "LATERAL IZQ.", "LATERAL DER.", "INTERIOR", "MOTOR", "KM LLEGADA", "KM FINAL"].map((n) => (
                    <PhotoSlot key={n} label={n} />
                  ))}
                </div>
              </Field>

              <Field icon={<PlayCircle className="h-4 w-4" />} label="VÍDEO RESUMEN DEL INSPECTOR">
                <div className="rounded-lg border border-border p-3">
                  <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-ink/80 to-ink">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
                    <button className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105">
                      <PlayCircle className="h-12 w-12 text-ink" fill="currentColor" stroke="white" />
                    </button>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Vídeo explicativo de la inspección realizada por el técnico.
                  </p>
                  <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-brand bg-brand/5 px-4 py-2.5 text-xs font-bold">
                    <Upload className="h-4 w-4 text-brand" />Subir vídeo
                  </button>
                </div>
              </Field>
            </div>
          </section>
        </div>

        {/* ESTADO GENERAL */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-extrabold tracking-wide">ESTADO GENERAL DEL VEHÍCULO</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {([
              ["ok", "CORRECTO", "El vehículo se encuentra en buen estado general.", "border-success/40 bg-success/5", "bg-success", <Check className="h-5 w-5" />],
              ["warn", "REQUIERE REVISIÓN", "Presenta puntos que deberían revisarse.", "border-brand/50 bg-brand/5", "bg-brand", <AlertTriangle className="h-5 w-5" />],
              ["bad", "PROBLEMA IMPORTANTE", "Presenta defectos relevantes.", "border-destructive/40 bg-destructive/5", "bg-destructive", <X className="h-5 w-5" />],
            ] as const).map(([v, t, d, bg, dot, ic]) => (
              <button key={v} onClick={() => setEstado(v)} className={`rounded-xl border-2 p-4 text-left transition ${estado === v ? bg : "border-border"}`}>
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${dot} text-white`}>{ic}</div>
                <div className="mt-2 text-center text-sm font-extrabold">{t}</div>
                <div className="mt-1 text-center text-xs text-muted-foreground">{d}</div>
              </button>
            ))}
          </div>
        </section>

        {/* FOOTER INFO */}
        <div className="grid gap-3 rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
            <div>
              <div className="font-extrabold text-ink">ALCANCE DE LA INSPECCIÓN</div>
              Inspección visual y electrónica realizada en taller. El informe refleja el estado del vehículo en el momento de la revisión.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
            <div>
              <div className="font-extrabold text-ink">INSPECCIÓN REALIZADA POR</div>
              Taller certificado LUPAUTO<br />Nº Taller: ES-12345
            </div>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="flex flex-col items-stretch justify-between gap-3 rounded-xl border border-brand/30 bg-brand/5 p-4 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-ink"><Zap className="h-5 w-5" /></div>
            <div className="text-sm">
              <div className="font-extrabold">Pago automático tras enviar el informe</div>
              <div className="text-xs text-muted-foreground">Vehículo: <b>{inspection.vehicleType}</b> · Importe a recibir: <b className="text-ink">{formatEur(payout)} €</b></div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Link to="/talleres/dashboard" className="rounded-lg border border-border px-4 py-3 text-sm font-bold">Cancelar</Link>
            <button onClick={() => setConfirmOpen(true)} className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-bold text-ink"><Send className="h-4 w-4" />Enviar informe y cobrar {formatEur(payout)} €</button>
          </div>
        </div>
      </main>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar envío del informe</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres enviar el informe? Una vez enviado no podrá ser modificado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={send} className="bg-brand text-ink hover:brightness-95">
              Sí, enviar informe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 bg-ink px-5 py-3 text-sm font-extrabold tracking-wide text-white">
      <span className="text-brand">{icon}</span>{title}
    </div>
  );
}

function Meta({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-ink">{icon}</div>
      <div>
        <div className="text-[11px] font-bold tracking-wide text-muted-foreground">{t}</div>
        <div className="text-lg font-extrabold">{v}</div>
      </div>
    </div>
  );
}

function LicensePlateIcon() {
  return (
    <div className="flex h-5 w-7 items-center justify-center rounded border-2 border-ink text-[8px] font-extrabold">A</div>
  );
}

function Field({ icon, label, children, inline = false }: { icon: React.ReactNode; label: string; children: React.ReactNode; inline?: boolean }) {
  return (
    <div className={inline ? "flex items-center gap-3" : ""}>
      <div className={`flex items-center gap-2 text-[11px] font-extrabold tracking-wide text-ink ${inline ? "w-44 shrink-0" : "mb-2"}`}>
        <span className="text-ink/70">{icon}</span>{label}
      </div>
      <div className={`space-y-2 ${inline ? "flex-1" : ""}`}>{children}</div>
    </div>
  );
}

type PillOpt = { v: string; label: string; sub?: string; tone: Tone };
function Pills({ value, onChange, options, cols }: { value: string; onChange: (v: string) => void; options: PillOpt[]; cols: number }) {
  const grid = cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4";
  return (
    <div className={`grid items-stretch gap-2 ${grid}`}>
      {options.map((o) => {
        const active = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange(o.v)}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg border-2 px-4 py-2 text-center transition ${active ? toneCls[o.tone] : "border-border bg-white text-ink hover:bg-muted/50"}`}>
            <div className="flex w-full items-center justify-center gap-1.5">
              {active && (
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white ${o.tone === "ok" ? "bg-success" : o.tone === "warn" ? "bg-brand" : "bg-destructive"}`}>
                  {toneIcon(o.tone)}
                </span>
              )}
              <span className="whitespace-normal break-words text-[11px] font-extrabold leading-tight">{o.label}</span>
            </div>
            {o.sub && <span className="whitespace-normal break-words text-[9px] font-medium text-muted-foreground">{o.sub}</span>}
          </button>
        );
      })}
    </div>
  );
}

function LeakRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const opts: { v: string; label: string; tone: Tone }[] = [
    { v: "no", label: "NO", tone: "ok" },
    { v: "leve", label: "LEVE", tone: "warn" },
    { v: "moderada", label: "MODERADA", tone: "warn" },
    { v: "importante", label: "IMPORTANTE", tone: "bad" },
  ];
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-[11px] font-bold text-muted-foreground">{label}</span>
      <div className="grid flex-1 grid-cols-4 gap-2">
        {opts.map((o) => {
          const active = value === o.v;
          return (
            <button key={o.v} onClick={() => onChange(o.v)}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-2 py-1.5 text-[11px] font-extrabold transition ${active ? toneCls[o.tone] : "border-border bg-white"}`}>
              {active && (
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-white ${o.tone === "ok" ? "bg-success" : o.tone === "warn" ? "bg-brand" : "bg-destructive"}`}>
                  {toneIcon(o.tone)}
                </span>
              )}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function fillColor(v: number) {
  if (v < 30) return "hsl(var(--destructive))";
  if (v < 60) return "hsl(var(--brand, 45 100% 50%))";
  return "hsl(var(--success))";
}

function DraggableBar({ value, onChange, height = 8 }: { value: number; onChange: (n: number) => void; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, Math.round(((clientX - r.left) / r.width) * 100)));
    onChange(pct);
  }, [onChange]);

  return (
    <div
      ref={ref}
      role="slider"
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}
      tabIndex={0}
      onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture(e.pointerId); setFromEvent(e.clientX); }}
      onPointerMove={(e) => { if (dragging.current) setFromEvent(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onChange(Math.max(0, value - 5));
        if (e.key === "ArrowRight") onChange(Math.min(100, value + 5));
      }}
      className="relative w-full cursor-pointer touch-none select-none overflow-hidden rounded-full bg-muted"
      style={{ height }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(to right, hsl(var(--destructive)) 0%, hsl(var(--destructive)) 30%, #F5B800 30%, #F5B800 60%, hsl(var(--success)) 60%, hsl(var(--success)) 100%)",
          clipPath: `inset(0 ${100 - value}% 0 0)`,
        }}
      />
    </div>
  );
}

function BrakeRow({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-44 text-[11px] font-bold text-muted-foreground">{label}</span>
      <div className="flex-1"><DraggableBar value={value} onChange={onChange} /></div>
      <input
        type="number" value={value} min={0} max={100}
        onChange={(e) => onChange(Math.max(0, Math.min(100, Number(e.target.value))))}
        className="w-14 rounded border border-border px-1 py-0.5 text-center text-xs font-bold"
      />
      <span className="w-4 text-xs font-bold">%</span>
    </div>
  );
}

function TyreCorner({ label, value, onChange, align }: { label: string; value: number; onChange: (n: number) => void; align: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="text-[10px] font-bold text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <div className="flex-1"><DraggableBar value={value} onChange={onChange} height={6} /></div>
        <input type="number" value={value} min={0} max={100}
          onChange={(e) => onChange(Math.max(0, Math.min(100, Number(e.target.value))))}
          className="w-10 rounded border border-border px-1 text-center text-[10px] font-bold" />
        <span className="text-[10px] font-bold">%</span>
      </div>
    </div>
  );
}

function KmMeta({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const formatted = value.toLocaleString("es-ES");
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-ink">
        <Gauge className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold tracking-wide text-muted-foreground">KILÓMETROS LLEGADA AL TALLER</div>
        <div className="flex items-baseline gap-1">
          <input
            type="text"
            inputMode="numeric"
            value={formatted}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              onChange(digits ? parseInt(digits, 10) : 0);
            }}
            className="w-28 rounded border border-border bg-white px-2 py-0.5 text-lg font-extrabold focus:border-brand focus:outline-none"
          />
          <span className="text-lg font-extrabold">km</span>
        </div>
      </div>
    </div>
  );
}

function TyreDiagram({ tyres, setTyres }: { tyres: any; setTyres: (t: any) => void }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <TyreCorner label="DEL. IZQUIERDO" value={tyres.fl} onChange={(n) => setTyres({ ...tyres, fl: n })} align="left" />
      <div className="row-span-2 flex h-40 w-24 items-center justify-center">
        <CarTopView />
      </div>
      <TyreCorner label="DEL. DERECHO" value={tyres.fr} onChange={(n) => setTyres({ ...tyres, fr: n })} align="right" />
      <TyreCorner label="TRAS. IZQUIERDO" value={tyres.rl} onChange={(n) => setTyres({ ...tyres, rl: n })} align="left" />
      <TyreCorner label="TRAS. DERECHO" value={tyres.rr} onChange={(n) => setTyres({ ...tyres, rr: n })} align="right" />
    </div>
  );
}

function CarTopView() {
  return (
    <svg viewBox="0 0 80 140" className="h-full w-full text-ink">
      {/* car body silhouette (top-down) */}
      <path
        d="M40 4 C24 4 18 14 17 28 L15 50 C14 58 14 78 15 90 L17 116 C18 128 24 136 40 136 C56 136 62 128 63 116 L65 90 C66 78 66 58 65 50 L63 28 C62 14 56 4 40 4 Z"
        fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5"
      />
      {/* windshield */}
      <path d="M22 30 L58 30 L54 48 L26 48 Z" fill="currentColor" fillOpacity="0.15" />
      {/* rear window */}
      <path d="M26 92 L54 92 L58 110 L22 110 Z" fill="currentColor" fillOpacity="0.15" />
      {/* roof line */}
      <line x1="40" y1="50" x2="40" y2="90" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
      {/* 4 wheels at corners */}
      <rect x="2" y="22" width="12" height="22" rx="3" fill="currentColor" />
      <rect x="66" y="22" width="12" height="22" rx="3" fill="currentColor" />
      <rect x="2" y="96" width="12" height="22" rx="3" fill="currentColor" />
      <rect x="66" y="96" width="12" height="22" rx="3" fill="currentColor" />
    </svg>
  );
}

function QrPlaceholder() {
  // deterministic pseudo-random pattern
  const cells = Array.from({ length: 21 * 21 }, (_, i) => {
    const x = i % 21, y = Math.floor(i / 21);
    const corner = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    if (corner) {
      const cx = x < 7 ? x : x - 14;
      const cy = y < 7 ? y : y - 14;
      const inner = cx >= 2 && cx <= 4 && cy >= 2 && cy <= 4;
      const ring = cx === 0 || cx === 6 || cy === 0 || cy === 6;
      return ring || inner;
    }
    return ((x * 31 + y * 17 + x * y) % 3) === 0;
  });
  return (
    <div className="grid h-full w-full grid-cols-[repeat(21,1fr)] grid-rows-[repeat(21,1fr)] gap-0">
      {cells.map((on, i) => (
        <div key={i} className={on ? "bg-ink" : "bg-white"} />
      ))}
    </div>
  );
}

function SuspRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const opts: { v: string; label: string; tone: Tone }[] = [
    { v: "ok", label: "BIEN", tone: "ok" },
    { v: "warn", label: "REGULAR", tone: "warn" },
    { v: "bad", label: "MAL", tone: "bad" },
  ];
  return (
    <div className="flex items-center gap-3">
      <span className="w-44 text-[11px] font-bold text-muted-foreground">{label}</span>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {opts.map((o) => {
          const active = value === o.v;
          return (
            <button key={o.v} onClick={() => onChange(o.v)}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-2 py-1.5 text-[11px] font-extrabold ${active ? toneCls[o.tone] : "border-border bg-white"}`}>
              {active && (
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-white ${o.tone === "ok" ? "bg-success" : o.tone === "warn" ? "bg-brand" : "bg-destructive"}`}>
                  {toneIcon(o.tone)}
                </span>
              )}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InteriorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const opts: { v: string; label: string; tone: Tone }[] = [
    { v: "ok", label: "BAJO", tone: "ok" },
    { v: "warn", label: "MEDIO", tone: "warn" },
    { v: "bad", label: "ALTO", tone: "bad" },
  ];
  return (
    <div className="flex items-center gap-3">
      <span className="w-44 text-[11px] font-bold text-muted-foreground">{label}</span>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {opts.map((o) => {
          const active = value === o.v;
          return (
            <button key={o.v} onClick={() => onChange(o.v)}
              className={`flex items-center justify-center gap-1 rounded-lg border-2 px-2 py-1.5 text-[11px] font-extrabold ${active ? toneCls[o.tone] : "border-border bg-white"}`}>
              {active && (
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-white ${o.tone === "ok" ? "bg-success" : o.tone === "warn" ? "bg-brand" : "bg-destructive"}`}>
                  {toneIcon(o.tone)}
                </span>
              )}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PhotoSlot({ label }: { label: string }) {
  return (
    <button className="group text-center">
      <div className="relative flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 group-hover:border-brand">
        <Camera className="h-5 w-5 text-muted-foreground" />
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-ink">+</div>
      </div>
      <div className="mt-1 text-[10px] font-extrabold tracking-wide">{label}</div>
    </button>
  );
}
