import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import clasicoEjemplo from "@/assets/clasico-ejemplo.png";
import mg1 from "@/assets/clasico-fotos/mg-1.jpg";
import mg2 from "@/assets/clasico-fotos/mg-2.jpg";
import mg3 from "@/assets/clasico-fotos/mg-3.jpg";
import mg4 from "@/assets/clasico-fotos/mg-4.jpg";
import mg5 from "@/assets/clasico-fotos/mg-5.jpg";
import mg6 from "@/assets/clasico-fotos/mg-6.jpg";

const fotos = [mg1, mg2, mg3, mg4, mg5, mg6];

export const Route = createFileRoute("/clasico")({
  head: () => ({ meta: [{ title: "Inspección de vehículos clásicos — LUPAUTO" }] }),
  component: Clasico,
});

function Clasico() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + fotos.length) % fotos.length);
  const next = () => setIdx((i) => (i + 1) % fotos.length);

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

          {/* Botón Reservar revisión */}
          <Link
            to="/reservar"
            search={{ vehicle: "clasico", plate: "" }}
            aria-label="Reservar revisión"
            className="absolute rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
            style={{ left: "3.4%", top: "55%", width: "22.7%", height: "6.5%" }}
          />

          {/* Tapamos toda la zona de foto+miniaturas del PNG con fondo blanco */}
          <div
            className="absolute bg-white"
            style={{ left: "62%", top: "2%", width: "37%", height: "51%" }}
          />

          {/* Foto principal */}
          <div
            className="absolute overflow-hidden rounded-md bg-black"
            style={{ left: "66.5%", top: "2.75%", width: "29.2%", height: "37.95%" }}
          >
            <img
              src={fotos[idx]}
              alt={`Foto ${idx + 1} del MG B Roadster`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Flecha izquierda (fuera de la foto) */}
          <button
            type="button"
            onClick={prev}
            aria-label="Foto anterior"
            className="absolute flex items-center justify-center rounded-full bg-white shadow border border-border hover:bg-muted"
            style={{ left: "63.5%", top: "19.6%", width: "2.6%", aspectRatio: "1 / 1" }}
          >
            <ChevronLeft className="h-4 w-4 text-black" />
          </button>

          {/* Flecha derecha (fuera de la foto) */}
          <button
            type="button"
            onClick={next}
            aria-label="Foto siguiente"
            className="absolute flex items-center justify-center rounded-full bg-white shadow border border-border hover:bg-muted"
            style={{ left: "96.1%", top: "19.6%", width: "2.6%", aspectRatio: "1 / 1" }}
          >
            <ChevronRight className="h-4 w-4 text-black" />
          </button>

          {/* Miniaturas clicables (6) */}
          <div
            className="absolute flex gap-[1%]"
            style={{ left: "66.5%", top: "42%", width: "29.2%", height: "9%" }}
          >
            {fotos.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Ver foto ${i + 1}`}
                className={`flex-1 overflow-hidden rounded-md border-2 transition ${
                  i === idx ? "border-brand" : "border-transparent opacity-90 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
