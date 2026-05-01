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
      <svg viewBox="0 0 48 48" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 48 48" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 48 48" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Car silhouette (side view) on top of the lift arms */}
        {/* roof + hood line */}
        <path d="M15 18l2.4-3.2c.5-.7 1.3-1.1 2.2-1.1h8.8c.9 0 1.7.4 2.2 1.1L33 18" />
        {/* body */}
        <path d="M11.5 22c0-1 .6-1.9 1.5-2.3l1.6-.7c.4-.2.7-.5.9-.9l.3-.6c.4-.8 1.2-1.3 2.1-1.3h12.2c.9 0 1.7.5 2.1 1.3l.3.6c.2.4.5.7.9.9l1.6.7c.9.4 1.5 1.3 1.5 2.3v2.5c0 .6-.4 1-1 1H12.5c-.6 0-1-.4-1-1V22z" />
        {/* windows divider */}
        <path d="M22.5 14v3.2M25.5 14v3.2" />
        {/* wheels */}
        <circle cx="16.5" cy="26.5" r="2.2" />
        <circle cx="31.5" cy="26.5" r="2.2" />
        {/* Lift arms holding the car */}
        <path d="M8 25h6.5M33.5 25h6.5" />
        {/* Lift columns */}
        <path d="M7 14v22M41 14v22" />
        {/* Yellow ground */}
        <path d="M5 36h38" stroke="#F5B400" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    n: "4",
    title: "Recibe tu Informe LUPA",
    desc: "Obtén un informe claro y visual para decidir con más seguridad antes de comprar.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
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
        <section className="mx-auto max-w-[984px] px-6 py-10 pb-8">
          {/* Top label */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px] font-bold uppercase tracking-[-0.01em] text-neutral-700">
            <span>Reserva online</span>
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span>Taller verificado</span>
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span>Informe claro</span>
          </div>

          {/* Title + subtitle */}
          <h1 className="mt-5 text-center text-[46px] font-black leading-none text-neutral-950 md:text-[66px]">
            Cómo funciona LUPAUTO
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[20px] leading-relaxed text-neutral-600">
            Un proceso claro, rápido y profesional para comprar con más seguridad.
          </p>

          {/* Steps */}
          <ol className="relative mt-9 space-y-5 pl-[96px] md:pl-[126px]">
            {/* dotted vertical connector behind numbers */}
            <div
              className="pointer-events-none absolute top-[52px] bottom-[76px] w-0 border-l-[2px] border-neutral-200"
              style={{ left: "30px" }}
              aria-hidden
            />
            <span className="pointer-events-none absolute top-[137px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary" style={{ left: "31px" }} aria-hidden />
            <span className="pointer-events-none absolute top-[303px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary" style={{ left: "31px" }} aria-hidden />
            <span className="pointer-events-none absolute top-[469px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary" style={{ left: "31px" }} aria-hidden />

            {steps.map(({ n, title, desc, icon }) => (
              <li key={n} className="relative">
                {/* number circle - absolutely positioned to the left */}
                <div className="absolute -left-[96px] top-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[28px] font-black leading-none text-neutral-950 shadow-[0_0_0_9px_white] md:-left-[126px]">
                  {n}
                </div>

                {/* card */}
                <div className="flex min-h-[146px] items-center gap-12 rounded-[14px] border border-neutral-200 bg-white px-10 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <div className="flex h-[102px] w-[108px] shrink-0 items-center justify-center rounded-[18px] border border-neutral-200 bg-white text-neutral-950 shadow-[0_7px_22px_rgba(0,0,0,0.06)]">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[24px] font-black leading-tight text-neutral-950">{title}</div>
                    <p className="mt-2 max-w-[560px] text-[19px] leading-[1.45] text-neutral-600">{desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* CTA block */}
          <div className="relative mt-6 overflow-hidden rounded-[18px] border border-neutral-200 bg-white px-10 py-10 shadow-[0_2px_10px_rgba(0,0,0,0.025)] md:px-16">
            <div className="absolute left-10 top-12 bottom-12 w-[3px] rounded-full bg-primary" />
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div className="flex items-center gap-8 pl-10">
                <div className="flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                  <ShieldCheck className="h-12 w-12 text-neutral-950" strokeWidth={1.9} />
                </div>
                <div>
                  <div className="text-[24px] font-black leading-[1.12] text-neutral-950">
                    Compra con confianza.<br />Decide con seguridad.
                  </div>
                  <p className="mt-4 max-w-[405px] text-[16px] leading-relaxed text-neutral-600">
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
                className="ml-auto inline-flex w-full min-w-[420px] items-center justify-center gap-14 rounded-[16px] bg-primary px-10 py-5 text-[20px] font-black text-neutral-950 transition-colors hover:bg-primary/90 md:w-auto"
              >
                Solicitar inspección
                <ArrowRight className="h-7 w-7" strokeWidth={2.5} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-[12px] text-neutral-600">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-neutral-700" />
                Talleres verificados
              </div>
              <span className="h-5 w-px bg-neutral-300" />
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-neutral-700" />
                Informes imparciales
              </div>
              <span className="h-5 w-px bg-neutral-300" />
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
