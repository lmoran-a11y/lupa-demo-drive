import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Legal — LUPAUTO" }] }),
  component: () => (
    <div className="min-h-screen bg-background"><SiteHeader/>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Información legal</h1>
        <div className="mt-6 space-y-6 text-sm text-muted-foreground">
          <section><h2 className="text-lg font-bold text-ink">Aviso legal</h2><p>LUPAUTO ofrece servicios de inspección pre-compra de vehículos en colaboración con talleres verificados.</p></section>
          <section><h2 className="text-lg font-bold text-ink">Términos y condiciones</h2><p>Al usar nuestra plataforma aceptas los términos descritos. Cancelación gratuita hasta 24h antes de la cita.</p></section>
          <section><h2 className="text-lg font-bold text-ink">Política de privacidad</h2><p>Tus datos están protegidos. Solo se comparten con el taller asignado para realizar la inspección.</p></section>
          <section><h2 className="text-lg font-bold text-ink">Política de cookies</h2><p>Utilizamos cookies técnicas y analíticas para mejorar la experiencia.</p></section>
        </div>
      </main><SiteFooter/></div>
  ),
});
