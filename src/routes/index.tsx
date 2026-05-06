import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Shield, Clock, Lock, Check, ArrowRight, Search, Play, Car } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import carTurismo from "@/assets/cat-turismo.png";
import carDeportivo from "@/assets/cat-deportivo.png";
import carSuv from "@/assets/cat-suv.png";
import carFurgoneta from "@/assets/cat-furgoneta.png";
import heroLupa from "@/assets/hero-lupa.png";
import carClasico from "@/assets/car-clasico.png";
import reportEngine from "@/assets/report-engine.jpg";
import reportFront from "@/assets/report-front.jpg";
import reportWheel from "@/assets/report-wheel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUPAUTO — Revisiones bajo lupa" },
      { name: "description", content: "Inspección pre-compra de coches en taller con fotos y vídeo en 24h." },
    ],
  }),
  component: Home,
});

const VEHICLES = [
  { id: "turismo", label: "Turismos", image: carTurismo, sub: "Menos de 250 CV" },
  { id: "deportivo", label: "Deportivos", image: carDeportivo, sub: "250 CV o más" },
  { id: "suv", label: "SUV / 4x4", image: carSuv, sub: "Todoterrenos y crossovers" },
  { id: "furgoneta", label: "Furgonetas", image: carFurgoneta, sub: "Comerciales y carga" },
];

function Home() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [plate, setPlate] = useState("1234ABC");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setSelected(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [selected]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="bg-white md:bg-transparent">
        <div className="mx-auto max-w-7xl px-5 pt-5 pb-6 md:px-6 md:pt-10 md:pb-10">
          {/* MOBILE HERO */}
          <div className="md:hidden flex flex-col items-center text-center">
            <h1 className="text-[28px] font-extrabold leading-[1.05] tracking-tight text-ink">
              Revisa tu coche<br />antes de comprar
            </h1>
            <div className="relative my-4 flex w-full justify-center">
              <div className="pointer-events-none absolute inset-x-10 top-4 h-32 rounded-full bg-brand/25 blur-3xl" />
              <img
                src={heroLupa}
                alt="Lupa con coche"
                width={600}
                height={600}
                className="relative w-full max-w-[220px]"
              />
            </div>
            <button
              type="button"
              onClick={() => pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="inline-flex w-full max-w-[320px] items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-base font-bold text-ink shadow-[0_8px_24px_-6px_rgba(255,204,0,0.5)] hover:brightness-95"
            >
              Solicitar inspección
            </button>
            <div className="mt-4 flex items-center justify-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Shield className="h-3.5 w-3.5 text-ink" /> Talleres verificados</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5 text-ink" /> Informe 24h</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Lock className="h-3.5 w-3.5 text-ink" /> Pago seguro</span>
            </div>
          </div>

          {/* DESKTOP HERO */}
          <div className="hidden md:grid items-center gap-8 md:grid-cols-2">
            <div className="text-left">
              <h1 className="text-[64px] font-extrabold leading-[1.02] tracking-tight text-ink">
                Revisa tu coche<br />antes de comprar
              </h1>
              <p className="mt-3 max-w-none text-base text-muted-foreground">
                Inspección en taller con fotos y vídeo en 24h.
              </p>
              <button
                type="button"
                onClick={() => pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-ink shadow-[0_8px_24px_-6px_rgba(255,204,0,0.5)] hover:brightness-95"
              >
                Solicitar inspección
              </button>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <Trust icon={<Shield className="h-5 w-5" />} title="Talleres verificados" sub="de confianza" />
                <Trust icon={<Clock className="h-5 w-5" />} title="Informe en 24h" sub="rápido y detallado" />
                <Trust icon={<Lock className="h-5 w-5" />} title="Pago seguro" sub="100% protegido" />
              </div>
            </div>
            <div className="flex justify-end">
              <img
                src={heroLupa}
                alt="Lupa con coche"
                width={600}
                height={600}
                className="w-full max-w-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE PICKER */}
      <section id="vehicle-picker" className="bg-gradient-to-b from-ink to-[oklch(0.18_0_0)] py-7 text-white md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6" ref={pickerRef}>
          <h2 className="text-center text-xl font-bold md:text-[28px]">¿Qué vehículo quieres revisar?</h2>
          <div className="mx-auto mt-2 h-[3px] w-12 rounded bg-brand" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:mt-8 md:gap-5 md:grid-cols-4">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v.id)}
                className={`group relative flex h-[88px] sm:h-auto sm:aspect-[4/4.2] flex-row sm:flex-col items-center rounded-2xl border bg-[#111111] p-3 sm:p-5 text-left text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] ${
                  selected === v.id ? "border-brand ring-1 ring-brand/40" : "border-white/10 hover:border-white/25"
                }`}
              >
                {selected === v.id && (
                  <div className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-brand text-ink">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                )}
                <div className="flex h-full sm:h-auto sm:flex-1 w-[40%] sm:w-full items-center justify-center overflow-hidden sm:p-2">
                  {(() => {
                    const baseScale =
                      v.id === "deportivo" ? 1.15 :
                      v.id === "suv" ? 1.15 :
                      v.id === "furgoneta" ? 1.10 : 1;
                    const hoverScale = baseScale + 0.1;
                    const tx = v.id === "furgoneta" ? "-6%" : v.id === "deportivo" ? "-4%" : v.id === "turismo" ? "-4%" : "0%";
                    return (
                      <img
                        src={v.image}
                        alt={v.label}
                        loading="lazy"
                        style={{ "--base": baseScale, "--hover": hoverScale, "--tx": tx } as React.CSSProperties}
                        className="h-full sm:h-[92%] w-full object-contain transition-transform duration-300 [transform:translateX(var(--tx))_scale(var(--base))] group-hover:[transform:translateX(var(--tx))_scale(var(--hover))]"
                      />
                    );
                  })()}
                </div>
                <div className="flex flex-1 sm:flex-none sm:w-full items-center justify-between sm:mt-2 pl-2 sm:pl-0">
                  <div className="leading-tight">
                    <div className="text-sm font-bold tracking-tight text-white sm:text-base md:text-xl">{v.label}</div>
                    <div className="text-[11px] text-white/50 sm:hidden">{v.sub}</div>
                    <div className="hidden sm:block text-[11px] md:text-xs text-white/50 mt-0.5">{v.sub}</div>
                  </div>
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-brand text-ink transition-transform group-hover:translate-x-0.5 ml-2">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* plate row — only after selecting a vehicle */}
          {selected && (
            <>
              <div className="mt-4 md:mt-6 grid items-center gap-2.5 md:gap-4 rounded-xl md:rounded-2xl bg-white p-3 md:p-5 text-ink md:grid-cols-[auto_1fr_auto] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2.5 md:gap-3">
                  <div className="flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-lg border border-border shrink-0">
                    <Search className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <div className="text-[13px] md:text-sm font-bold leading-tight">Introduce la matrícula del vehículo</div>
                    <div className="text-[11px] md:text-xs text-muted-foreground leading-snug mt-0.5">{selected === "deportivo" ? "Para vehículos con potencia homologada de 250 CV o más." : selected === "turismo" ? "Para vehículos con potencia homologada inferior a 250 CV." : "La usaremos para identificar tu vehículo durante la inspección."}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neutral-900 px-2.5 md:px-3 py-2 md:py-3">
                  <div className="flex h-7 w-5 md:h-9 md:w-7 items-center justify-center rounded bg-info text-[9px] md:text-[10px] font-bold text-white">E</div>
                  <input value={plate} onChange={(e) => setPlate(e.target.value)} className="flex-1 text-base md:text-lg font-bold tracking-wider outline-none min-w-0" />
                  <div className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-success text-white"><Check className="h-3 w-3 md:h-4 md:w-4" /></div>
                </div>
                <button onClick={() => navigate({ to: "/reservar", search: { vehicle: selected ?? "turismo", plate } })} className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-bold text-ink hover:brightness-95">
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 md:mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] md:text-xs text-white/60"><Lock className="h-3 w-3" /> Tus datos están protegidos. No compartimos tu información.</p>
            </>
          )}
        </div>
      </section>

      {/* HOW */}
      <section className="mx-auto max-w-7xl px-6 py-7 md:py-12">
        <h2 className="text-center text-xl md:text-[28px] font-bold">Así funciona</h2>
        <div className="mx-auto mt-2 h-[3px] w-12 rounded bg-brand" />
        <div className="relative mt-5 grid gap-5 md:mt-10 md:gap-10 md:grid-cols-3">
          {/* dashed connectors (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden md:block">
            <div className="mx-auto grid max-w-5xl grid-cols-3">
              <div />
              <div className="border-t-2 border-dashed border-border" />
              <div className="border-t-2 border-dashed border-border" />
            </div>
          </div>
          {[
            { n: 1, t: "Elige tu vehículo", d: "Selecciona el tipo de vehículo y la ubicación.", mt: "Elige tu vehículo", md: "Selecciona la categoría." },
            { n: 2, t: "Reserva en taller", d: "Elige el taller, día y hora que mejor te venga.", mt: "Reserva en la web", md: "Escoge localización, fecha y hora.\nEl vendedor lo llevará al taller asignado." },
            { n: 3, t: "Recibe tu informe", d: "En 24h tendrás el informe completo con fotos y vídeo.", mt: "Recibe tu informe", md: "Fotos, vídeo y valoración final." },
          ].map((s) => (
            <div key={s.n} className="relative flex md:block items-center gap-4 md:text-center text-left">
              <div className="relative h-14 w-14 md:mx-auto md:h-20 md:w-20 shrink-0">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-ink ring-4 md:ring-8 ring-background">
                  <Search className="h-5 w-5 md:h-7 md:w-7 text-white" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 flex h-5 w-5 md:h-7 md:w-7 items-center justify-center rounded-full bg-brand text-[11px] md:text-sm font-bold text-ink ring-2 md:ring-4 ring-background">{s.n}</span>
              </div>
              <div className="flex-1 md:mt-5">
                <h3 className="text-base md:text-lg font-bold"><span className="md:hidden">{s.mt}</span><span className="hidden md:inline">{s.t}</span></h3>
                <p className="mt-0.5 md:mt-2 text-xs md:text-sm text-muted-foreground"><span className="md:hidden">{s.md}</span><span className="hidden md:inline">{s.d}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROFESSIONAL REPORT */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-8 md:pb-16">
        <div className="grid gap-5 md:gap-10 rounded-2xl md:rounded-3xl border border-border bg-card p-5 md:p-12 shadow-sm md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="text-[11px] md:text-xs font-bold tracking-widest text-brand">INFORME PROFESIONAL</div>
            <h3 className="mt-2 md:mt-3 text-xl md:text-4xl font-bold leading-tight">Toma decisiones<br />con información real</h3>
            <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-sm">
              {["Revisión punto por punto", "Fotos y vídeo explicativo", "Semáforo final para tu decisión"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border-2 border-brand text-brand shrink-0">
                    <Check className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[13px] md:text-sm">{x}</span>
                </li>
              ))}
              <li className="hidden md:flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand text-brand">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                Información clara y detallada
              </li>
            </ul>
            <Link to="/ejemplo-informe" className="mt-5 md:mt-8 inline-flex w-full items-center justify-center rounded-lg border-2 border-ink bg-background px-5 md:px-6 py-2.5 md:py-3 text-sm font-bold hover:bg-ink hover:text-white sm:w-auto">
              Ver ejemplo de informe
            </Link>
          </div>

          {/* Tablet mock */}
          <div className="rounded-xl md:rounded-2xl border border-border bg-muted/40 p-2 md:p-3 shadow-sm md:scale-100 origin-top max-w-sm mx-auto md:max-w-none w-full">
            <div className="rounded-lg md:rounded-xl bg-white p-3 md:p-5 text-ink">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-ink">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="currentColor"><path d="M5 14l1.5-4.5A3 3 0 0 1 9.3 7.5h5.4a3 3 0 0 1 2.8 2L19 14v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z"/></svg>
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-extrabold">LUPA<span className="text-brand">UTO</span></div>
                    <div className="text-[8px] text-muted-foreground">Revisiones bajo lupa</div>
                  </div>
                </div>
                <div className="text-right text-[10px] font-bold text-muted-foreground">
                  INFORME DE INSPECCIÓN<br /><span className="font-normal">FECHA: 24/05/2024</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground">ESTADO GENERAL</div>
                  <div className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-success py-2 text-sm font-bold text-white">
                    <Check className="h-4 w-4" /> BUEN ESTADO
                  </div>
                  <div className="mt-3 space-y-1.5 text-[11px]">
                    {[["Motor","Buen estado","ok"],["Frenos","A revisar","warn"],["Neumáticos","Buen estado","ok"],["Suspensión","Buen estado","ok"],["Carrocería","Defecto leve","warn"]].map(([k,v,s]) => (
                      <div key={k} className="flex items-center justify-between border-b border-border/50 py-1">
                        <span className="flex items-center gap-2">
                          <span className={`flex h-3 w-3 items-center justify-center rounded-full ${s==="ok"?"bg-success":"bg-brand"} text-white`}>
                            <Check className="h-2 w-2" strokeWidth={4} />
                          </span>
                          {k}
                        </span>
                        <span className={`font-semibold ${s==="ok"?"text-success":"text-brand"}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex w-32 flex-col gap-2">
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <img src={reportEngine} alt="Motor" loading="lazy" width={768} height={512} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                        <Play className="h-3 w-3 fill-ink text-ink" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <img src={reportFront} alt="Frontal" loading="lazy" width={512} height={512} className="aspect-square w-full rounded-md object-cover" />
                    <img src={reportWheel} alt="Rueda" loading="lazy" width={512} height={512} className="aspect-square w-full rounded-md object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSIC */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-6 md:pb-16">
        {/* Mobile layout */}
        <div className="md:hidden relative overflow-hidden rounded-2xl border border-border bg-muted/60 p-4">
          <div className="relative z-10 flex items-center gap-3">
            <img
              src={carClasico}
              alt="Coche clásico"
              loading="lazy"
              width={1024}
              height={576}
              className="h-20 w-28 shrink-0 object-contain"
              style={{ filter: "drop-shadow(0 8px 10px rgba(0, 0, 0, 0.15))" }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-tight">¿Buscas un coche clásico?</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">
                Inspecciones especializadas para vehículos clásicos.
              </p>
              <Link
                to="/clasico"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-ink bg-background px-3 py-1.5 text-xs font-bold hover:bg-ink hover:text-white"
              >
                Revisar clásico <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop layout (unchanged) */}
        <div className="hidden md:grid items-center gap-4 rounded-2xl border border-border bg-muted/60 px-6 py-3 md:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink/10 bg-background shrink-0">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">¿Buscas un coche clásico?</h3>
              <p className="text-sm text-muted-foreground">
                Inspecciones especializadas para vehículos clásicos.
              </p>
            </div>
          </div>
          <img src={carClasico} alt="Coche clásico" loading="lazy" width={1024} height={576} className="mx-auto h-36 w-auto max-w-full object-contain" style={{ filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))" }} />
          <Link to="/clasico" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ink bg-background px-5 py-3 text-sm font-bold hover:bg-ink hover:text-white">
            Revisar clásico <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* WORKSHOPS CTA */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-8 md:pb-16">
        <div className="flex flex-col items-stretch md:items-center justify-between gap-3 md:gap-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-ink to-[oklch(0.22_0_0)] p-4 md:p-6 text-white md:flex-row">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-lg bg-white/10 shrink-0">
              <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l9-9 9 9" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" />
              </svg>
            </div>
            <div>
              <div className="text-sm md:text-lg font-bold">Acceso talleres colaborativos</div>
              <div className="text-xs md:text-sm text-white/70 hidden md:block">Inicia sesión para ver tus inspecciones asignadas y gestionar informes.</div>
              <div className="text-[11px] text-white/70 md:hidden">Para profesionales con inspecciones asignadas.</div>
            </div>
          </div>
          <Link to="/talleres/login" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand bg-transparent px-4 md:px-5 py-2 md:py-3 text-sm font-bold text-brand hover:bg-brand hover:text-ink">
            <Lock className="h-4 w-4" /> Acceso para talleres
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Trust({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-ink">{icon}</div>
      <div className="leading-tight">
        <div className="text-[13px] font-bold">{title}</div>
        <div className="text-[12px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
