import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import clasicoEjemplo from "@/assets/clasico-ejemplo.png";

export const Route = createFileRoute("/clasico")({
  head: () => ({ meta: [{ title: "Inspección de vehículos clásicos — LUPAUTO" }] }),
  component: Clasico,
});

function Clasico() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <img
          src={clasicoEjemplo}
          alt="Inspección de vehículos clásicos LUPAUTO"
          className="w-full h-auto rounded-2xl border border-border shadow-sm"
        />
        <Link
          to="/"
          className="mt-6 block rounded-xl bg-brand py-3 text-center font-bold text-ink"
        >
          Volver al inicio
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
