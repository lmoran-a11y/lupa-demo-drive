import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Shield, Clock, Lock, Check, ArrowRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import carTurismo from "@/assets/car-turismo.jpg";
import carDeportivo from "@/assets/car-deportivo.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carFurgoneta from "@/assets/car-furgoneta.jpg";

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
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-12 md:pt-16">
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
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-4 text-base font-bold text-ink shadow-sm hover:brightness-95"
            >
              Solicitar inspección
            </button>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <Trust icon={<Shield className="h-5 w-5" />} title="Talleres verificados" sub="de confianza" />
              <Trust icon={<Clock className="h-5 w-5" />} title="Informe en 24h" sub="rápido y detallado" />
              <Trust icon={<Lock className="h-5 w-5" />} title="Pago seguro" sub="100% protegido" />
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="flex h-72 w-72 items-center justify-center rounded-full border-[10px] border-brand bg-ink md:h-96 md:w-96">
                <svg viewBox="0 0 24 24" className="h-32 w-32 text-white md:h-44 md:w-44" fill="currentColor">
                  <path d="M5 14l1.5-4.5A3 3 0 0 1 9.3 7.5h5.4a3 3 0 0 1 2.8 2L19 14v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z"/>
                </svg>
              </div>
              <div className="absolute -bottom-6 -right-10 h-20 w-3 rotate-45 rounded-full bg-ink md:-right-14 md:h-28" />
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE PICKER */}
      <section className="bg-ink py-12 text-white">
        <div className="mx-auto max-w-7xl px-6" ref={pickerRef}>
          <h2 className="text-center text-2xl font-bold md:text-3xl">¿Qué vehículo quieres revisar?</h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand" />
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v.id)}
                className={`group relative overflow-hidden rounded-2xl border bg-ink p-6 text-left text-white transition ${
                  selected === v.id ? "border-brand" : "border-white/10 hover:border-white/30"
                }`}
              >
                {selected === v.id && (
                  <div className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-ink">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <div className="flex h-28 items-center justify-center overflow-hidden">
                  <img src={v.image} alt={v.label} loading="lazy" width={768} height={512} className="h-full w-full object-contain" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-white">{v.label}</span>
                  <ArrowRight className="h-5 w-5 text-brand" />
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
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand" />
        <div className="relative mt-10 grid gap-8 md:grid-cols-3">
          {[
            { n: 1, t: "Elige tu vehículo", d: "Selecciona el tipo de vehículo y la ubicación." },
            { n: 2, t: "Reserva en taller", d: "Elige el taller, día y hora que mejor te venga." },
            { n: 3, t: "Recibe tu informe", d: "En 24h tendrás el informe completo con fotos y vídeo." },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div className="relative mx-auto h-20 w-20">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-ink">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-ink">{s.n}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROFESSIONAL REPORT */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <div className="text-xs font-bold tracking-widest text-brand">INFORME PROFESIONAL</div>
            <h3 className="mt-3 text-3xl font-bold">Toma decisiones<br />con información real</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {["Revisión punto por punto", "Fotos y vídeo explicativo", "Semáforo final para tu decisión", "Información clara y detallada"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/20 text-brand"><Check className="h-3.5 w-3.5" /></span>
                  {x}
                </li>
              ))}
            </ul>
            <Link to="/ejemplo-informe" className="mt-6 inline-block rounded-lg border-2 border-ink px-6 py-3 text-sm font-bold hover:bg-ink hover:text-white">
              Ver ejemplo de informe
            </Link>
          </div>
          <div className="rounded-2xl bg-ink p-4">
            <div className="rounded-xl bg-white p-5 text-ink">
              <div className="flex items-center justify-between text-xs">
                <div className="font-extrabold">LUPA<span className="text-brand">UTO</span></div>
                <div className="text-muted-foreground">INFORME DE INSPECCIÓN<br />FECHA: 24/05/2024</div>
              </div>
              <div className="mt-4 text-xs font-bold text-muted-foreground">ESTADO GENERAL</div>
              <div className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-success py-2 text-sm font-bold text-white">
                <Check className="h-4 w-4" /> BUEN ESTADO
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                {[["Motor","Buen estado","ok"],["Frenos","A revisar","warn"],["Neumáticos","Buen estado","ok"],["Suspensión","Buen estado","ok"],["Carrocería","Defecto leve","warn"]].map(([k,v,s]) => (
                  <div key={k} className="flex items-center justify-between border-b border-border/50 py-1">
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${s==="ok"?"bg-success":"bg-brand"}`}/> {k}
                    </span>
                    <span className={s==="ok"?"text-success":"text-brand"}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSIC */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Link to="/clasico" className="flex items-center justify-between gap-6 rounded-2xl border border-border bg-muted p-6 hover:bg-accent">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background"><Search className="h-6 w-6"/></div>
            <div>
              <h3 className="text-lg font-bold">¿Buscas un coche clásico?</h3>
              <p className="text-sm text-muted-foreground">Inspecciones especializadas para vehículos clásicos.<br/>Para coches con historia.</p>
            </div>
          </div>
          <div className="rounded-lg border-2 border-ink px-5 py-3 text-sm font-bold">Revisar clásico →</div>
        </Link>
      </section>

      {/* WORKSHOPS CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-ink p-6 text-white md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10"><Shield className="h-5 w-5 text-brand" /></div>
            <div>
              <div className="text-lg font-bold">Acceso talleres colaborativos</div>
              <div className="text-sm text-white/70">Inicia sesión para ver tus inspecciones asignadas y gestionar informes.</div>
            </div>
          </div>
          <Link to="/talleres/login" className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 font-bold text-ink hover:brightness-95">
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
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card">{icon}</div>
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
