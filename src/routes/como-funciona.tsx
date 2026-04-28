import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({ meta: [{ title: "Cómo funciona — LUPAUTO" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">Cómo funciona LUPAUTO</h1>
        <ol className="mt-8 space-y-6">
          {[["1","Reserva online","Elige vehículo, ubicación, fecha y hora."],["2","Llevamos tu coche al taller","Te asignamos un taller verificado cerca de ti."],["3","Inspección punto por punto","Revisión mecánica, carrocería e interior con fotos y vídeo."],["4","Recibe el informe en 24h","Toma decisiones con información real y completa."]].map(([n,t,d])=>(
            <li key={n} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-ink">{n}</div>
              <div><div className="text-lg font-bold">{t}</div><div className="text-sm text-muted-foreground">{d}</div></div>
            </li>
          ))}
        </ol>
        <Link to="/reservar" className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 font-bold text-ink">Solicitar inspección</Link>
      </main>
      <SiteFooter />
    </div>
  ),
});
