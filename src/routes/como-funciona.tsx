import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight, ShieldCheck, BadgeCheck, FileText, Lock } from "lucide-react";

const steps = [
  {
    n: "1",
    title: "Reserva online",
    desc: "Elige el tipo de vehículo, introduce la matrícula y selecciona ubicación, fecha y hora.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="10" width="34" height="30" rx="3" />
        <path d="M7 18h34" />
        <path d="M16 6v8M32 6v8" />
        <path d="M18 28l4 4 8-8" stroke="#F5B400" />
      </svg>
    ),
  },
  {
    n: "2",
    title: "Te asignamos un taller verificado",
    desc: "Una vez completes la reserva, te enviaremos el taller, la dirección y los datos de la cita.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6l14 5v11c0 9-6 15-14 20-8-5-14-11-14-20V11l14-5z" />
        <path d="M17 24l5 5 9-10" stroke="#F5B400" />
      </svg>
    ),
  },
  {
    n: "3",
    title: "El vehículo se revisa en taller",
    desc: "Inspección mecánica, diagnosis, elevador, prueba dinámica y evidencias en foto y vídeo.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 24l3-7c.5-1.2 1.7-2 3-2h16c1.3 0 2.5.8 3 2l3 7" />
        <path d="M8 24h32v8c0 1.1-.9 2-2 2h-2a2 2 0 01-2-2v-2H14v2a2 2 0 01-2 2h-2c-1.1 0-2-.9-2-2v-8z" />
        <circle cx="15" cy="30" r="1.5" fill="currentColor" />
        <circle cx="33" cy="30" r="1.5" fill="currentColor" />
        <path d="M6 40h36" stroke="#F5B400" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    n: "4",
    title: "Recibe tu Informe LUPA",
    desc: "Obtén un informe claro y visual para decidir con más seguridad antes de comprar.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6h16l10 10v22a4 4 0 01-4 4H12a4 4 0 01-4-4V10a4 4 0 014-4z" />
        <path d="M28 6v10h10" />
        <circle cx="32" cy="34" r="6" fill="#F5B400" stroke="#F5B400" />
        <path d="M29 34l2 2 4-4" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
];

export const Route = createFileRoute("/como-funciona")({
  head: () => ({ meta: [{ title: "Cómo funciona — LUPAUTO" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto max-w-4xl px-6 py-20">
          {/* Top label */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-800">
            <span>Reserva online</span>
            <span className="h-2 w-2 rounded-full bg-[#F5B400]" />
            <span>Taller verificado</span>
            <span className="h-2 w-2 rounded-full bg-[#F5B400]" />
            <span>Informe claro</span>
          </div>

          {/* Title + subtitle */}
          <h1 className="mt-6 text-center text-5xl font-extrabold tracking-tight text-neutral-900 md:text-6xl">
            Cómo funciona LUPAUTO
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-500">
            Un proceso claro, rápido y profesional para comprar con más seguridad.
          </p>

          {/* Steps */}
          <ol className="relative mt-14 space-y-6 pl-16 md:pl-20">
            {/* dotted vertical connector behind numbers */}
            <div
              className="pointer-events-none absolute top-8 bottom-8 w-0 border-l-2 border-dotted border-neutral-300"
              style={{ left: "27px" }}
              aria-hidden
            />

            {steps.map(({ n, title, desc, icon }) => (
              <li key={n} className="relative">
                {/* number circle - absolutely positioned to the left */}
                <div className="absolute -left-16 top-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5B400] text-xl font-extrabold text-neutral-900 shadow-[0_0_0_6px_white] md:-left-20">
                  {n}
                </div>

                {/* card */}
                <div className="flex items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-extrabold text-neutral-900 md:text-xl">{title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500 md:text-[15px]">{desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* CTA block */}
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 md:p-8">
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r bg-[#F5B400]" />
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white">
                  <ShieldCheck className="h-7 w-7 text-neutral-900" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-lg font-extrabold leading-tight text-neutral-900 md:text-xl">
                    Compra con confianza.<br />Decide con seguridad.
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Talleres verificados y proceso estandarizado para comprar con más seguridad.
                  </p>
                </div>
              </div>
              <Link
                to="/"
                hash="vehicle-picker"
                onClick={(e) => {
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    document
                      .getElementById("vehicle-picker")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="ml-auto inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F5B400] px-10 py-4 text-base font-bold text-neutral-900 transition-colors hover:bg-[#e0a600] md:w-auto"
              >
                Solicitar inspección
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-neutral-700" />
                Talleres verificados
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-neutral-700" />
                Informes imparciales
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-neutral-700" />
                Datos 100% seguros
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  ),
});
