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
        <img
          src={clasicoEjemplo}
          alt="Inspección de vehículos clásicos LUPAUTO"
          className="w-full h-auto rounded-2xl border border-border shadow-sm"
        />
        <Link
          to="/reservar"
          className="mt-6 block rounded-xl bg-brand py-4 text-center text-lg font-extrabold text-ink hover:brightness-95"
        >
          Reservar revisión
        </Link>
        <Link
          to="/"
          className="mt-3 block rounded-xl border border-border py-3 text-center font-bold"
        >
          Volver al inicio
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
