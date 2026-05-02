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
        <div className="relative">
          <img
            src={clasicoEjemplo}
            alt="Inspección de vehículos clásicos LUPAUTO"
            className="w-full h-auto rounded-2xl border border-border shadow-sm"
          />
          <Link
            to="/reservar"
            aria-label="Reservar revisión"
            className="absolute rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
            style={{
              left: "3.4%",
              top: "57.4%",
              width: "22.7%",
              height: "6.5%",
            }}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
