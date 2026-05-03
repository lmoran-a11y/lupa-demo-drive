import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({ meta: [{ title: "Sobre nosotros — LUPAUTO" }] }),
  component: () => (
    <div className="min-h-screen bg-background"><SiteHeader/>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-extrabold">Sobre LUPAUTO</h1>
        <p className="mt-4 text-muted-foreground">Nacimos para resolver un problema real: comprar un coche de segunda mano sin sorpresas. Trabajamos con una red de talleres verificados que inspeccionan tu futuro vehículo punto por punto.</p>
        <p className="mt-3 text-muted-foreground">Cada informe LUPA incluye fotos, vídeo y un semáforo claro para ayudarte a decidir con información real.</p>
      </main><SiteFooter/></div>
  ),
});
