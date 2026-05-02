import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState } from "react";
import { Search } from "lucide-react";
import { inspections } from "@/lib/mock-data";

export const Route = createFileRoute("/consultar-cita")({
  head: () => ({ meta: [{ title: "Consultar cita — LUPAUTO" }] }),
  component: ConsultarCita,
});

function ConsultarCita() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<typeof inspections[number] | null | "none">(null);

  function search() {
    const found = inspections.find(i => i.id.toLowerCase() === code.trim().toLowerCase());
    setResult(found ?? "none");
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Consultar cita</h1>
        <p className="mt-1 text-sm text-muted-foreground">Introduce el código de tu reserva (ej. LUP-000129).</p>
        <div className="mt-6 flex gap-2">
          <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="LUP-000129" className="flex-1 rounded-lg border border-border px-4 py-3 outline-none" />
          <button onClick={search} className="flex items-center gap-2 rounded-lg bg-brand px-5 py-3 font-bold text-ink hover:brightness-95"><Search className="h-4 w-4"/>Buscar</button>
        </div>

        {result && result !== "none" && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <div className="text-xs text-muted-foreground">ID de cita</div>
            <div className="text-xl font-bold">{result.id}</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-muted-foreground">Cliente</div><div className="font-bold">{result.client}</div></div>
              <div><div className="text-muted-foreground">Vehículo</div><div className="font-bold">{result.vehicle}</div></div>
              <div><div className="text-muted-foreground">Matrícula</div><div className="font-bold">{result.plate}</div></div>
              <div><div className="text-muted-foreground">Taller</div><div className="font-bold">{result.workshop}</div></div>
              <div><div className="text-muted-foreground">Fecha y hora</div><div className="font-bold">{result.date} · {result.time}</div></div>
              <div><div className="text-muted-foreground">Estado</div><div className="font-bold">{result.status}</div></div>
            </div>
          </div>
        )}

        {result === "none" && (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted"><Search className="h-8 w-8 text-muted-foreground"/></div>
            <h3 className="text-xl font-bold">CITA NO ENCONTRADA</h3>
            <p className="text-sm text-muted-foreground">No hemos encontrado la cita que estás buscando.<br/>Revisa el enlace o contacta con nuestro equipo de soporte.</p>
            <div className="flex gap-3">
              <Link to="/" className="rounded-lg bg-brand px-5 py-2.5 font-bold text-ink">Ir al inicio</Link>
              <Link to="/contacto" className="rounded-lg border border-border px-5 py-2.5 font-bold">Reportar incidencia</Link>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
