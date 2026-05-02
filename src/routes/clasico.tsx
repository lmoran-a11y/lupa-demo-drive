import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import clasicoEjemplo from "@/assets/clasico-ejemplo.png";

export const Route = createFileRoute("/clasico")({
  head: () => ({ meta: [{ title: "Inspección de vehículos clásicos — LUPAUTO" }] }),
  component: Clasico,
});

function Clasico() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link to="/reservar" aria-label="Reservar revisión de vehículo clásico" className="block">
          <img
            src={clasicoEjemplo}
            alt="Inspección de vehículos clásicos LUPAUTO"
            className="w-full h-auto rounded-2xl border border-border shadow-sm transition hover:brightness-95"
          />
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
