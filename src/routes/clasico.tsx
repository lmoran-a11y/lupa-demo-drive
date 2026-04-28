import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, Check } from "lucide-react";

export const Route = createFileRoute("/clasico")({
  head: () => ({ meta: [{ title: "Inspección de vehículos clásicos — LUPAUTO" }] }),
  component: Clasico,
});

function Clasico() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-ink"><Star className="h-3 w-3 fill-brand text-brand"/>SERVICIO ESPECIALIZADO</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight">Inspección de<br/><span className="text-brand">Vehículos Clásicos</span></h1>
            <p className="mt-4 text-muted-foreground">Revisión experta para coches clásicos e históricos.<br/>Evaluamos su estado con el máximo cuidado y atención al detalle.</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-4xl font-extrabold">190€</div>
                <div className="text-xs text-muted-foreground">IVA incluido</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {["Revisión completa en taller","Informe digital con fotos y vídeo","Informe disponible al finalizar la revisión"].map(x=>(
                    <li key={x} className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-ink"><Check className="h-3 w-3"/></span>{x}</li>
                  ))}
                </ul>
                <Link to="/reservar" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-ink py-3 font-bold text-white">📅 Reservar revisión</Link>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm font-bold"><Star className="h-4 w-4 fill-brand text-brand"/>¿Qué revisamos?</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {["Estado mecánico general","Sistema de frenos","Suspensión y dirección","Carrocería y chasis","Sistema eléctrico","Neumáticos y llantas","Fugas y niveles","Prueba en carretera (si aplica)"].map(x=>(
                    <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-ink"/>{x}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 text-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink">i</div>
              <div>
                <div className="font-bold">Servicio especializado en vehículos clásicos e históricos</div>
                <p className="text-muted-foreground">Nuestros técnicos tienen experiencia en vehículos clásicos. Tratamos tu vehículo con el cuidado y el respeto que merece.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Ejemplo de Vehículo Clásico</h3>
              <Link to="/" className="text-2xl text-muted-foreground">×</Link>
            </div>
            <div className="mt-4 aspect-[4/3] rounded-xl bg-[linear-gradient(135deg,#2d3a2a,#4a5d3f)]" />
            <div className="mt-3 grid grid-cols-5 gap-2">
              {[0,1,2,3,4].map(i => <div key={i} className={`aspect-square rounded-lg ${i===0?"ring-2 ring-brand":""} bg-muted`} />)}
            </div>
            <div className="mt-5 text-sm font-bold">DETALLES DEL VEHÍCULO</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              {[["Marca / Modelo","MG B Roadster"],["Matrícula","H-1965-BBF"],["Año","1965"],["Combustible","Gasolina"],["Kilometraje","48.750 km"],["Transmisión","Manual"]].map(([k,v])=>(
                <div key={k}><div className="text-xs text-muted-foreground">{k}</div><div className="font-bold">{v}</div></div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
