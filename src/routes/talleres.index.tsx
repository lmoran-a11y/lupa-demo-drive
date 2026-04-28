import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, Check, Handshake, Users } from "lucide-react";

export const Route = createFileRoute("/talleres")({
  head: () => ({ meta: [{ title: "Para talleres — LUPAUTO" }] }),
  component: Talleres,
});

function Talleres() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center">
          <div className="text-3xl font-extrabold">LUPA<span className="text-brand">UTO</span></div>
          <h1 className="mt-4 text-4xl font-extrabold">TALLERES COLABORADORES</h1>
          <div className="mx-auto mt-1 h-1 w-32 bg-brand"/>
          <div className="mt-1 text-lg font-bold text-brand">CÓRDOBA</div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 bg-brand px-5 py-3 font-extrabold text-ink">
              <span className="text-xl">€</span> LO QUE COBRAS<br/><span className="text-xs font-bold">POR INSPECCIÓN</span>
            </div>
            <div className="divide-y divide-border">
              {[["TURISMO","150 €"],["SUV / 4x4","165 €"],["FURGONETA","175 €"],["DEPORTIVO / ALTA GAMA","180 €"]].map(([k,v])=>(
                <div key={k} className="flex items-center justify-between px-5 py-4">
                  <span className="font-bold">🚗 {k}</span><span className="text-2xl font-extrabold text-brand">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1 px-5 py-4 text-sm">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-brand"/>Pago por cada inspección realizada.</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-brand"/>Pago automático tras enviar el informe.</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 bg-ink px-5 py-3 font-extrabold text-white">⏱ TIEMPO ESTIMADO</div>
            <div className="px-5 py-10 text-center">
              <div className="text-4xl font-extrabold">45 – 75 MIN</div>
              <div className="mt-1 text-sm text-muted-foreground">POR VEHÍCULO</div>
            </div>
            <div className="border-t border-border px-5 py-5 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"><Check/></div>
              <div className="font-extrabold">PAGO AUTOMÁTICO</div>
              <div className="text-xs text-muted-foreground">TRAS ENVIAR EL INFORME</div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="text-center text-sm font-extrabold tracking-widest">CÓMO FUNCIONA</div>
          <div className="mx-auto mt-1 h-1 w-16 bg-brand"/>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[["1","EL CLIENTE","RESERVA"],["2","EL COCHE","LLEGA AL TALLER"],["3","REVISÁIS","EL VEHÍCULO"],["4","SUBÍS","EL INFORME"],["5","COBRÁIS",""]].map(([n,a,b])=>(
              <div key={n} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand font-extrabold text-ink">{n}</div>
                <div className="mt-3 text-xs font-extrabold">{a}</div>
                <div className="text-xs font-extrabold">{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-ink p-6 text-white md:flex-row">
          <div className="flex items-center gap-3"><Handshake className="h-7 w-7 text-brand"/><div className="font-extrabold">NOSOTROS TRAEMOS EL CLIENTE.<br/>TÚ HACES LA <span className="text-brand">INSPECCIÓN</span>.</div></div>
          <div className="flex items-center gap-3"><Users className="h-7 w-7 text-brand"/><div className="text-sm font-bold">MÁS CLIENTES<br/>PARA TU TALLER</div></div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-border bg-card p-5">
          <Star className="h-5 w-5 fill-brand text-brand"/>
          <div className="text-center"><div className="font-bold">PLAZAS LIMITADAS EN CÓRDOBA</div><div className="text-xs text-muted-foreground">Buscamos pocos talleres, pero de confianza.</div></div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/talleres/login" className="inline-block rounded-lg bg-brand px-6 py-3 font-bold text-ink">Acceso para talleres ›</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
