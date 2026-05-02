import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import clasicoEjemplo from "@/assets/clasico-ejemplo.png";

export const Route = createFileRoute("/clasico")({
  head: () => ({ meta: [{ title: "Inspección de vehículos clásicos — LUPAUTO" }] }),
  component: Clasico,
});

function Clasico() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-6 pt-4 pb-10">
        <Link
          to="/"
          aria-label="Volver al inicio"
          className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
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
              top: "55%",
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
