import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Calendar, Clock, History, CreditCard, MessageSquare, Settings, LogOut, Bell, ChevronDown, Headphones, ArrowRight, Car, Zap } from "lucide-react";
import { workshopInspections, type Inspection } from "@/lib/mock-data";
import { getWorkshopPayout, formatEur, WORKSHOP_PRICES } from "@/lib/workshop-pricing";

export const Route = createFileRoute("/talleres/dashboard")({
  head: () => ({ meta: [{ title: "Inspecciones asignadas — LUPAUTO" }] }),
  component: Dashboard,
});

type Tab = "Hoy" | "Próximas" | "Completadas";

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Hoy");
  const [items] = useState<Inspection[]>(workshopInspections);

  const filtered = items.filter(i => {
    if (tab === "Completadas") return i.status === "Completada";
    if (tab === "Hoy") return i.date === "16/05/2024";
    return i.date !== "16/05/2024" && i.status !== "Completada";
  });

  const counts = { Hoy: items.filter(i=>i.date==="16/05/2024").length, Próximas: items.filter(i=>i.date!=="16/05/2024" && i.status!=="Completada").length, Completadas: items.filter(i=>i.status==="Completada").length };

  return (
    <div className="flex min-h-screen bg-background">
      {/* SIDEBAR */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="p-5"><Logo /></div>
        <nav className="flex-1 space-y-1 px-3">
          <NavItem active icon={<Calendar/>} label="Inspecciones"/>
          <NavItem icon={<History/>} label="Historial"/>
          <NavItem icon={<CreditCard/>} label="Pagos"/>
          <NavItem icon={<MessageSquare/>} label="Soporte" badge={2}/>
          <NavItem icon={<Settings/>} label="Configuración"/>
        </nav>
        <div className="border-t border-border p-3">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"><LogOut className="h-4 w-4"/>Cerrar sesión</Link>
        </div>
        <div className="m-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 text-center text-xs">
          <Headphones className="mx-auto h-5 w-5 text-brand"/>
          <div className="mt-2 font-bold">¿Necesitas ayuda?</div>
          <p className="text-muted-foreground">Nuestro equipo está aquí para ayudarte.</p>
          <Link to="/contacto" className="mt-2 inline-block rounded-lg border border-border bg-card px-3 py-1.5 font-bold">Contactar soporte</Link>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-8 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Inspecciones asignadas</h1>
            <p className="text-sm text-muted-foreground">Gestiona tus citas y revisiones.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 hover:bg-muted">
              <Bell className="h-5 w-5"/>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-ink">2</span>
            </button>
            <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[10px] font-extrabold text-white">RTC<br/>SPORT</div>
              <div className="text-sm">
                <div className="font-bold">RTC Sport</div>
                <div className="text-xs text-success">Taller verificado ✓</div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground"/>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2 rounded-xl bg-brand/10 p-1">
            {(["Hoy","Próximas","Completadas"] as Tab[]).map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${tab===t?"bg-card shadow-sm":"text-muted-foreground"}`}>
                {t} <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${tab===t?"bg-brand text-ink":"bg-muted"}`}>{counts[t]}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold"><Calendar className="h-4 w-4"/>Jueves, 16 de mayo</div>
        </div>

        {/* Tariff & automatic payment banner */}
        <div className="mt-5 grid gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-ink"><Zap className="h-5 w-5"/></div>
            <div>
              <div className="text-sm font-extrabold">Pago automático al enviar el informe</div>
              <p className="text-xs text-muted-foreground">En cuanto envíes el informe, la inspección se marca como completada y el pago se transfiere automáticamente a tu taller.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {(Object.entries(WORKSHOP_PRICES) as [keyof typeof WORKSHOP_PRICES, number][]).map(([k,v])=>(
              <span key={k} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 font-bold">
                {k === "Deportivo" ? "Deportivo / Alta gama" : k === "SUV" ? "SUV / 4x4" : k}
                <span className="text-brand">{formatEur(v)} €</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filtered.map(i => {
            const accent = i.status==="Completada"?"bg-success":i.status==="En proceso"?"bg-info":"bg-brand";
            return (
              <div key={i.id} className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5">
                <div className={`h-16 w-1 rounded-full ${accent}`}/>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10"><Car className="h-6 w-6"/></div>
                <div className="flex-1">
                  <div className="text-lg font-extrabold">{i.plate}</div>
                  <div className="text-sm text-muted-foreground">{i.vehicleType}</div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{i.date}</div>
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3"/>{i.time}</div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${accent}`}/><span className="font-bold">{i.status}</span></div>
                  <div className="text-xs text-muted-foreground">ID: {i.id}</div>
                </div>
                <div className="flex flex-col gap-2">
                  {i.status === "Completada" ? (
                    <Link to="/ejemplo-informe" className="flex items-center gap-2 rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold">Ver informe <ArrowRight className="h-4 w-4"/></Link>
                  ) : (
                    <button onClick={()=>navigate({to:"/talleres/inspeccion/$id", params:{id:i.id}})} className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink hover:brightness-95">
                      {i.status==="En proceso"?"Continuar inspección":"Abrir inspección"} <ArrowRight className="h-4 w-4"/>
                    </button>
                  )}
                  <Link to="/contacto" className="flex items-center justify-center gap-2 rounded-lg border border-brand px-4 py-2 text-xs font-bold text-ink"><MessageSquare className="h-3 w-3"/>Contactar soporte</Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">🛡 Tus inspecciones están seguras. Solo tú decides con quién compartirlas.</p>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, badge }: any) {
  return (
    <button className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold ${active?"bg-brand text-ink":"hover:bg-muted"}`}>
      <span className="h-4 w-4">{icon}</span>{label}
      {badge && <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-ink">{badge}</span>}
    </button>
  );
}
