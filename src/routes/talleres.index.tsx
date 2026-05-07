import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ShieldCheck, Wrench, ClipboardCheck } from "lucide-react";

import workshopBg from "@/assets/talleres-workshop-bg.jpg";

export const Route = createFileRoute("/talleres/")({
  head: () => ({ meta: [{ title: "Para talleres — LUPAUTO" }] }),
  component: TalleresEntry,
});

function TalleresEntry() {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left side - hero */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-ink p-8 md:flex lg:p-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${workshopBg})`,
            filter: "saturate(1.35) contrast(1.1) brightness(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
        <Link
          to="/"
          className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-ink/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition hover:bg-ink/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">
            Talleres verificados de confianza
          </p>
        </div>
      </div>

      {/* Right side - entry / landing (NOT the login form) */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            aria-label="Volver"
            className="md:hidden mb-6 inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 text-[11px] font-bold hover:bg-muted"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
            <Wrench className="h-3.5 w-3.5" /> Para talleres
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-wide">
            ÁREA DE TALLERES
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Bienvenido al espacio para talleres colaboradores de LUPAUTO. Gestiona inspecciones, recibe pagos y reporta incidencias desde un único panel.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>Recibe inspecciones asignadas y envía informes en minutos.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>Cobros automáticos al completar cada revisión.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>Soporte directo y gestión de incidencias integrada.</span>
            </li>
          </ul>

          <Link
            to="/talleres/login"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-bold text-ink hover:brightness-95"
          >
            Acceder al panel <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">¿Aún no colaboras con LUPAUTO? </span>
            <Link to="/contacto" className="font-bold text-brand hover:underline">
              Contáctanos
            </Link>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <Link to="/admin/login" className="underline hover:text-brand">
              Acceso administradores
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
