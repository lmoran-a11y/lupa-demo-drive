import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight, ShieldCheck, BadgeCheck, FileText, Lock, CheckCircle2, Info, Mail, Clock } from "lucide-react";
import liftIcon from "@/assets/lift-icon.png";

type Step = {
  n: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  bullets?: string[];
  bulletsIntro?: string;
  notice?: { type: "info" | "mail"; text: string };
};

const steps: Step[] = [
  {
    n: "1",
    title: "Acuerda la cita\ncon el vendedor",
    desc: "Habla con el vendedor y confirma qué día y a qué hora puede llevar el vehículo al taller.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="28" r="7" />
        <path d="M8 50c0-7 5.5-12 12-12s12 5 12 12" />
        <circle cx="46" cy="32" r="7" />
        <path d="M34 54c0-7 5.5-12 12-12s12 5 12 12" />
        <path d="M30 10h18a4 4 0 014 4v8a4 4 0 01-4 4h-3l-4 4v-4h-11a4 4 0 01-4-4v-8a4 4 0 014-4z" />
        <path d="M35 18l3 3 6-6" stroke="#F5B400" strokeWidth="2.6" />
      </svg>
    ),
    notice: {
      type: "info",
      text: "El vendedor deberá llevar el vehículo al taller en la fecha y hora acordadas.",
    },
  },
  {
    n: "2",
    title: "Reserva y recibe los\ndatos de la cita",
    desc: "Selecciona el tipo de vehículo, introduce la matrícula y completa la reserva.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="16" width="48" height="34" rx="3" />
        <path d="M8 18l24 18 24-18" />
        <circle cx="44" cy="38" r="7" fill="#F5B400" stroke="#F5B400" />
        <path d="M44 45c-2 4-5 7-5 7s-5-5-5-9a5 5 0 0110 0" fill="#F5B400" stroke="#F5B400" />
        <circle cx="44" cy="36" r="2" fill="#fff" stroke="#fff" />
      </svg>
    ),
    bulletsIntro: "Te enviaremos por correo:",
    bullets: ["Ubicación del taller", "Fecha y hora de la cita", "Datos de la cita y contacto"],
    notice: {
      type: "mail",
      text: "Revisa tu correo (y spam) tras completar la reserva y pásale esta información al vendedor.",
    },
  },
  {
    n: "3",
    title: "El vendedor lleva\nel coche al taller",
    desc: "El vendedor lleva el vehículo al taller en la fecha y hora acordadas.",
    icon: <img src={liftIcon} alt="Coche en elevador" className="h-20 w-20 object-contain" />,
    bulletsIntro: "Realizamos una inspección completa:",
    bullets: ["Revisión en elevador", "Diagnóstico electrónico", "Prueba dinámica", "Fotos y vídeo de todo el proceso"],
  },
  {
    n: "4",
    title: "Recibe tu\nInforme LUPA",
    desc: "En menos de 24h recibirás un informe claro y visual con todo lo revisado para que tomes tu decisión con más seguridad.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 6h22l12 12v36a4 4 0 01-4 4H16a4 4 0 01-4-4V10a4 4 0 014-4z" />
        <path d="M38 6v12h12" />
        <path d="M20 28h16M20 34h12" />
        <circle cx="40" cy="44" r="8" fill="#F5B400" stroke="#F5B400" />
        <path d="M37 44l2 2 4-4" stroke="#fff" strokeWidth="2.4" />
        <path d="M46 50l5 5" />
      </svg>
    ),
    bullets: ["Informe en 24h", "Claro y visual", "Para decidir con confianza"],
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
