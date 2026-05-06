import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight, ShieldCheck, BadgeCheck, FileText, Lock, CheckCircle2, Info, Mail, Clock } from "lucide-react";
import liftIcon from "@/assets/lift-icon.png";
import acuerdaCitaIcon from "@/assets/step-acuerda-cita.png";
import reservaCitaIcon from "@/assets/step-reserva-cita.png";

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
    icon: <img src={acuerdaCitaIcon} alt="Acuerda la cita" className="h-16 w-16 object-contain" />,
    notice: {
      type: "info",
      text: "El vendedor deberá llevar el vehículo al taller en la fecha y hora acordadas.",
    },
  },
  {
    n: "2",
    title: "Reserva y recibe los\ndatos de la cita",
    desc: "Selecciona el tipo de vehículo, introduce la matrícula y completa la reserva.",
    icon: <img src={reservaCitaIcon} alt="Reserva y recibe los datos" className="h-16 w-16 object-contain" />,
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
    icon: <img src={liftIcon} alt="Coche en elevador" className="h-16 w-16 object-contain" />,
    bulletsIntro: "Realizamos una inspección completa:",
    bullets: ["Revisión en elevador", "Diagnóstico electrónico", "Prueba dinámica", "Fotos y vídeo de todo el proceso"],
  },
  {
    n: "4",
    title: "Recibe tu\nInforme LUPA",
    desc: "En menos de 24h recibirás un informe claro y visual con todo lo revisado para que tomes tu decisión con más seguridad.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
        <section className="mx-auto max-w-[1320px] px-6 py-16">
          {/* Top label */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wide text-neutral-700">
            <span>Reserva online</span>
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Taller verificado</span>
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Informe claro</span>
          </div>

          {/* Title + subtitle */}
          <h1 className="mt-4 text-center text-4xl font-black leading-tight text-neutral-950 md:text-5xl">
            Cómo funciona LUPAUTO
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base font-normal leading-relaxed text-neutral-600 md:text-lg">
            Un proceso claro, rápido y profesional para comprar con más seguridad.
          </p>

          {/* Steps - 4 column grid with arrows */}
          <div className="relative mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ n, title, desc, icon, bullets, bulletsIntro, notice }, idx) => (
              <div key={n} className="relative">
                {/* arrow between cards (desktop only) */}
                {idx < steps.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-primary lg:block">
                    <ArrowRight className="h-5 w-5" strokeWidth={3} />
                  </div>
                )}

                {/* number circle floating above card */}
                <div className="absolute left-1/2 -top-4 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-base font-black leading-none text-neutral-950 shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
                  {n}
                </div>

                {/* card */}
                <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 pt-8 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-center pb-3 text-neutral-950">{icon}</div>
                  <h3 className="mt-1 whitespace-pre-line text-xl font-black leading-tight text-neutral-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{desc}</p>

                  {bulletsIntro && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">{bulletsIntro}</p>
                  )}
                  {bullets && (
                    <ul className="mt-2 space-y-1.5">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-neutral-700">
                          <CheckCircle2 className="mt-[2px] h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.2} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {notice && (
                    <div className="mt-auto pt-4">
                      <div className="flex items-start gap-2 rounded-lg bg-[#FFF7E0] px-3 py-2 text-xs leading-snug text-neutral-700">
                        {notice.type === "info" ? (
                          <Info className="mt-[1px] h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.4} />
                        ) : (
                          <Mail className="mt-[1px] h-3.5 w-3.5 shrink-0 text-neutral-700" strokeWidth={2.2} />
                        )}
                        <span>{notice.text}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: <ShieldCheck className="h-4 w-4 text-neutral-800" strokeWidth={2} />, title: "Talleres verificados", sub: "y de confianza" },
                { icon: <FileText className="h-4 w-4 text-neutral-800" strokeWidth={2} />, title: "Informes imparciales", sub: "y detallados" },
                { icon: <Lock className="h-4 w-4 text-neutral-800" strokeWidth={2} />, title: "Datos 100% seguros", sub: "y protegidos" },
                { icon: <Clock className="h-4 w-4 text-neutral-800" strokeWidth={2} />, title: "Informes en 24h", sub: "" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    {t.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold leading-tight text-neutral-900">{t.title}</div>
                    {t.sub && <div className="text-xs leading-tight text-neutral-600">{t.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA block */}
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white px-6 py-6 shadow-[0_2px_10px_rgba(0,0,0,0.025)] md:px-10">
            <div className="absolute left-6 top-6 bottom-6 w-[3px] rounded-full bg-primary" />
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-5 pl-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
                  <ShieldCheck className="h-7 w-7 text-neutral-950" strokeWidth={1.9} />
                </div>
                <div>
                  <div className="text-2xl font-black leading-tight text-neutral-950 md:text-3xl">
                    Compra con confianza.<br />Decide con seguridad.
                  </div>
                  <p className="mt-2 max-w-[405px] text-sm leading-relaxed text-neutral-600">
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
                className="ml-auto inline-flex w-full items-center justify-center gap-6 rounded-xl bg-primary px-6 py-3.5 text-base font-black text-neutral-950 transition-colors hover:bg-primary/90 md:w-auto"
              >
                Solicitar inspección
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-3.5 w-3.5 text-neutral-700" />
                Talleres verificados
              </div>
              <span className="h-4 w-px bg-neutral-300" />
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-neutral-700" />
                Informes imparciales
              </div>
              <span className="h-4 w-px bg-neutral-300" />
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-neutral-700" />
                Datos 100% seguros
              </div>
            </div>
          </div>
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
