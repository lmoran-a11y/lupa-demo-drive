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
import carClasico from "@/assets/car-clasico.jpg";
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
  { id: "turismo", label: "Turismos", image: carTurismo },
  { id: "deportivo", label: "Deportivos", image: carDeportivo },
  { id: "suv", label: "SUV / 4x4", image: carSuv },
  { id: "furgoneta", label: "Furgonetas", image: carFurgoneta },
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
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-14 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-[1.05] text-ink md:text-6xl">
              Revisa tu coche<br />antes de comprar
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Inspección en taller con fotos y vídeo en 24h.
            </p>
            <button
              type="button"
              onClick={() => pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="mt-6 inline-flex items-center rounded-xl bg-brand px-7 py-4 text-base font-bold text-ink shadow-sm hover:brightness-95"
            >
              Solicitar inspección
            </button>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Trust icon={<Shield className="h-5 w-5" />} title="Talleres verificados" sub="de confianza" />
              <Trust icon={<Clock className="h-5 w-5" />} title="Informe en 24h" sub="rápido y detallado" />
              <Trust icon={<Lock className="h-5 w-5" />} title="Pago seguro" sub="100% protegido" />
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={heroLupa}
              alt="Lupa con coche"
              width={600}
              height={600}
              className="w-full max-w-[460px]"
            />
          </div>
        </div>
      </section>

      {/* VEHICLE PICKER */}
      <section id="vehicle-picker" className="bg-gradient-to-b from-ink to-[oklch(0.18_0_0)] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6" ref={pickerRef}>
          <h2 className="text-center text-2xl font-bold md:text-3xl">¿Qué vehículo quieres revisar?</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-brand" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v.id)}
                className={`group relative flex aspect-[4/5] flex-col rounded-2xl border bg-gradient-to-b from-[oklch(0.32_0_0)] to-[oklch(0.24_0_0)] p-5 text-left text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] ${
                  selected === v.id ? "border-brand ring-1 ring-brand/40" : "border-white/10 hover:border-white/25"
                }`}
              >
                {selected === v.id && (
                  <div className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-ink">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <div className="flex flex-1 items-center justify-center">
                  <img
                    src={v.image}
                    alt={v.label}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold tracking-tight text-white md:text-xl">{v.label}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-ink transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* plate row — only after selecting a vehicle */}
          {selected && (
            <>
              <div className="mt-6 grid items-center gap-4 rounded-2xl bg-white p-5 text-ink md:grid-cols-[auto_1fr_auto] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Introduce la matrícula de tu vehículo</div>
                    <div className="text-xs text-muted-foreground">La usaremos para identificar tu vehículo durante la inspección.</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-3">
                  <div className="flex h-9 w-7 items-center justify-center rounded bg-info text-[10px] font-bold text-white">E</div>
                  <input value={plate} onChange={(e) => setPlate(e.target.value)} className="flex-1 text-lg font-bold tracking-wider outline-none" />
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white"><Check className="h-4 w-4" /></div>
                </div>
                <button onClick={() => navigate({ to: "/reservar", search: { vehicle: selected ?? "turismo", plate } })} className="flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-bold text-ink hover:brightness-95">
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/60"><Lock className="h-3 w-3" /> Tus datos están protegidos. No compartimos tu información.</p>
            </>
          )}
        </div>
      </section>

      {/* HOW */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Así funciona</h2>
        <div className="relative mt-12 grid gap-10 md:grid-cols-3">
          {/* dashed connectors (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden md:block">
            <div className="mx-auto grid max-w-5xl grid-cols-3">
              <div />
              <div className="border-t-2 border-dashed border-border" />
              <div className="border-t-2 border-dashed border-border" />
            </div>
          </div>
          {[
            { n: 1, t: "Elige tu vehículo", d: "Selecciona el tipo de vehículo y la ubicación." },
            { n: 2, t: "Reserva en taller", d: "Elige el taller, día y hora que mejor te venga." },
            { n: 3, t: "Recibe tu informe", d: "En 24h tendrás el informe completo con fotos y vídeo." },
          ].map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="relative mx-auto h-20 w-20">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-ink ring-8 ring-background">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-ink ring-4 ring-background">{s.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROFESSIONAL REPORT */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div className="flex flex-col justify-center">
            <div className="text-xs font-bold tracking-widest text-brand">INFORME PROFESIONAL</div>
            <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">Toma decisiones<br />con información real</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {["Revisión punto por punto", "Fotos y vídeo explicativo", "Semáforo final para tu decisión", "Información clara y detallada"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand text-brand">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <Link to="/ejemplo-informe" className="mt-8 inline-flex w-full items-center justify-center rounded-lg border-2 border-ink bg-background px-6 py-3 text-sm font-bold hover:bg-ink hover:text-white sm:w-auto">
              Ver ejemplo de informe
            </Link>
          </div>

          {/* Tablet mock */}
          <div className="rounded-2xl border border-border bg-muted/40 p-3 shadow-sm">
            <div className="rounded-xl bg-white p-5 text-ink">
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
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid items-center gap-4 rounded-2xl border border-border bg-muted/60 p-6 md:grid-cols-[auto_1fr_auto_auto]">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink/10 bg-background">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">¿Buscas un coche clásico?</h3>
              <p className="text-sm text-muted-foreground">
                Inspecciones especializadas para vehículos clásicos.<br />Para coches con historia.
              </p>
            </div>
          </div>
          <div />
          <img src={carClasico} alt="Coche clásico" loading="lazy" width={1024} height={576} className="hidden h-24 w-auto object-contain md:block" />
          <Link to="/clasico" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ink bg-background px-5 py-3 text-sm font-bold hover:bg-ink hover:text-white">
            Revisar clásico <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* WORKSHOPS CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-ink to-[oklch(0.22_0_0)] p-6 text-white md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l9-9 9 9" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold">Acceso talleres colaborativos</div>
              <div className="text-sm text-white/70">Inicia sesión para ver tus inspecciones asignadas y gestionar informes.</div>
            </div>
          </div>
          <Link to="/talleres/login" className="inline-flex items-center gap-2 rounded-lg border-2 border-brand bg-transparent px-5 py-3 font-bold text-brand hover:bg-brand hover:text-ink">
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
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card">{icon}</div>
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
