import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import informeEjemplo from "@/assets/informe-ejemplo.png";

export const Route = createFileRoute("/ejemplo-informe")({
  head: () => ({ meta: [{ title: "Ejemplo de informe LUPA — LUPAUTO" }] }),
  component: Ejemplo,
});

function Ejemplo() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <a href={informeEjemplo} target="_blank" rel="noopener noreferrer" aria-label="Abrir informe LUPA en tamaño completo">
          <img
            src={informeEjemplo}
            alt="Ejemplo de informe LUPA"
            className="w-full h-auto rounded-2xl border border-border shadow-sm cursor-zoom-in transition-transform hover:scale-[1.01]"
          />
        </a>
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
