import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight, CalendarCheck, ShieldCheck, Wrench, FileCheck, BadgeCheck, FileText, Lock } from "lucide-react";

const steps = [
  {
    n: "1",
    title: "Reserva online",
    desc: "Elige el tipo de vehículo, introduce la matrícula y selecciona ubicación, fecha y hora.",
    Icon: CalendarCheck,
  },
  {
    n: "2",
    title: "Te asignamos un taller verificado",
    desc: "Una vez completes la reserva, te enviaremos el taller, la dirección y los datos de la cita.",
    Icon: ShieldCheck,
  },
  {
    n: "3",
    title: "El vehículo se revisa en taller",
    desc: "Inspección mecánica, diagnosis, elevador, prueba dinámica y evidencias en foto y vídeo.",
    Icon: Wrench,
  },
  {
    n: "4",
    title: "Recibe tu Informe LUPA",
    desc: "Obtén un informe claro y visual para decidir con más seguridad antes de comprar.",
    Icon: FileCheck,
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
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
            <span>Reserva online</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span>Taller verificado</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
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
          <ol className="relative mt-14 space-y-5">
            {/* vertical connector */}
            <div className="pointer-events-none absolute left-[19px] top-6 bottom-6 w-px bg-neutral-200" aria-hidden />

            {steps.map(({ n, title, desc, Icon }) => (
              <li key={n} className="relative flex items-stretch gap-5">
                {/* number */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-neutral-900 ring-4 ring-white">
                  {n}
                </div>

                {/* card */}
                <div className="flex flex-1 items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                    <Icon className="h-6 w-6 text-neutral-900" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-bold text-neutral-900">{title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* CTA block */}
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 md:p-8">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="hidden h-px w-1 self-stretch bg-brand md:block" />
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white">
                  <ShieldCheck className="h-6 w-6 text-neutral-900" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-lg font-bold leading-tight text-neutral-900">
                    Compra con confianza.<br />Decide con seguridad.
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Talleres verificados y proceso estandarizado para comprar con más seguridad.
                  </p>
                </div>
              </div>
              <Link
                to="/reservar"
                className="ml-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-base font-bold text-neutral-900 transition-colors hover:bg-brand/90 md:w-auto"
              >
                Solicitar inspección
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
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
