import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Calendar, Clock, History, MessageSquare, LogOut, Bell, ChevronDown, Headphones, ArrowRight, Car, Zap, AlertTriangle, Eye, Filter, ChevronLeft, ChevronRight, UserX, Camera, MoreHorizontal } from "lucide-react";
import { workshopInspections, type Inspection } from "@/lib/mock-data";
import { getWorkshopPayout, formatEur, WORKSHOP_PRICES } from "@/lib/workshop-pricing";
import { IncidentModal } from "@/components/IncidentModal";

export const Route = createFileRoute("/talleres/dashboard")({
  head: () => ({ meta: [{ title: "Inspecciones asignadas — LUPAUTO" }] }),
  component: Dashboard,
});

type Section = "inspecciones" | "completadas" | "incidencias";

type IncidentRow = {
  id: string;
  plate: string;
  vehicle: string;
  date: string;
  time: string;
  type: "ausencia" | "vehiculo" | "limitada" | "otro";
  typeLabel: string;
  subLabel: string;
  status: "Pendiente" | "En revisión" | "Resuelta";
  comp: string;
  compMulti?: { taller: string; lupa: string; cliente: string };
};

const INCIDENTS: IncidentRow[] = [
  { id: "#INC-0018", plate: "3124 KLM", vehicle: "Seat León 1.6 TDI", date: "02/05/2025", time: "10:30", type: "ausencia", typeLabel: "Ausencia o retraso", subLabel: "No se presenta", status: "Pendiente", comp: "25,00 €" },
  { id: "#INC-0017", plate: "5236 MNB", vehicle: "BMW Serie 3 320d", date: "02/05/2025", time: "09:15", type: "vehiculo", typeLabel: "Vehículo incorrecto", subLabel: "Categoría distinta", status: "En revisión", comp: "Ajuste pendiente" },
  { id: "#INC-0016", plate: "7421 GHT", vehicle: "Audi A4 2.0 TDI", date: "01/05/2025", time: "16:45", type: "limitada", typeLabel: "Inspección limitada", subLabel: "No permiten fotos / vídeo", status: "Resuelta", comp: "", compMulti: { taller: "100,00 €", lupa: "30,00 €", cliente: "50,00 €" } },
  { id: "#INC-0015", plate: "9876 JKL", vehicle: "Ford Focus 1.0 EcoBoost", date: "01/05/2025", time: "11:20", type: "otro", typeLabel: "Otro", subLabel: "Otra incidencia", status: "Pendiente", comp: "Requiere revisión" },
  { id: "#INC-0014", plate: "1357 BVC", vehicle: "Renault Clio 1.5 dCi", date: "30/04/2025", time: "18:10", type: "limitada", typeLabel: "Inspección limitada", subLabel: "No permiten prueba dinámica", status: "En revisión", comp: "", compMulti: { taller: "100,00 €", lupa: "30,00 €", cliente: "50,00 €" } },
  { id: "#INC-0013", plate: "2468 QWE", vehicle: "VW Golf 2.0 TDI", date: "30/04/2025", time: "12:05", type: "vehiculo", typeLabel: "Vehículo incorrecto", subLabel: "Categoría distinta", status: "Resuelta", comp: "Ajuste aplicado\n-40,00 €" },
  { id: "#INC-0012", plate: "3698 RTY", vehicle: "Peugeot 308 1.6 HDi", date: "29/04/2025", time: "17:50", type: "ausencia", typeLabel: "Ausencia o retraso", subLabel: "Llega tarde", status: "Resuelta", comp: "25,00 €" },
];

type Tab = "Hoy" | "Próximas" | "Completadas";

function Dashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("inspecciones");
  const [tab, setTab] = useState<Tab>("Hoy");
  const [incTab, setIncTab] = useState<"Todas" | "Pendientes" | "En revisión" | "Resueltas">("Todas");
  const [items] = useState<Inspection[]>(workshopInspections);
  const [incidentOpen, setIncidentOpen] = useState(false);

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
          <NavItem active={section==="inspecciones"} onClick={()=>setSection("inspecciones")} icon={<Calendar/>} label="Inspecciones"/>
          <NavItem active={section==="completadas"} onClick={()=>setSection("completadas")} icon={<History/>} label="Completadas"/>
          <NavItem active={section==="incidencias"} onClick={()=>setSection("incidencias")} icon={<AlertTriangle/>} label="Incidencias"/>
        </nav>
        <div className="border-t border-border p-3">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"><LogOut className="h-4 w-4"/>Cerrar sesión</Link>
        </div>
        <div className="m-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 text-center text-xs">
          <Headphones className="mx-auto h-5 w-5 text-brand"/>
          <div className="mt-2 font-bold">¿Necesitas ayuda?</div>
          <p className="text-muted-foreground">Nuestro equipo está aquí para ayudarte.</p>
          <button onClick={()=>setIncidentOpen(true)} className="mt-2 inline-block rounded-lg border border-border bg-card px-3 py-1.5 font-bold">Reportar incidencia</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-3 py-3 md:px-8 md:py-8">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 md:gap-3">
            {section==="incidencias" && (
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-brand/10"><AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-brand"/></div>
            )}
            <div>
              <h1 className="text-lg md:text-3xl font-extrabold leading-tight">{section==="incidencias" ? "Incidencias" : "Inspecciones asignadas"}</h1>
              <p className="text-[11px] md:text-sm text-muted-foreground">{section==="incidencias" ? "Consulta y gestiona las incidencias reportadas" : "Gestiona tus citas y revisiones."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative rounded-full p-1.5 md:p-2 hover:bg-muted">
              <Bell className="h-4 w-4 md:h-5 md:w-5"/>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-brand text-[9px] md:text-[10px] font-bold text-ink">2</span>
            </button>
            <div className="hidden md:flex items-center gap-3 rounded-lg border border-border px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[10px] font-extrabold text-white">RTC<br/>SPORT</div>
              <div className="text-sm">
                <div className="font-bold">RTC Sport</div>
                <div className="text-xs text-success">Taller verificado ✓</div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground"/>
            </div>
            <div className="flex md:hidden h-8 w-8 items-center justify-center rounded-full bg-ink text-[8px] font-extrabold text-white">RTC</div>
          </div>
        </div>

        {section === "incidencias" ? (
          <IncidenciasSection incTab={incTab} setIncTab={setIncTab} />
        ) : (
          <>
            <div className="mt-3 md:mt-6 flex items-center justify-between gap-2">
              <div className="flex gap-1 md:gap-2 rounded-xl bg-brand/10 p-1">
                {(["Hoy","Próximas","Completadas"] as Tab[]).map(t=>(
                  <button key={t} onClick={()=>setTab(t)} className={`flex items-center gap-1 md:gap-2 rounded-lg px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold ${tab===t?"bg-card shadow-sm":"text-muted-foreground"}`}>
                    {t} <span className={`flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full text-[9px] md:text-[10px] ${tab===t?"bg-brand text-ink":"bg-muted"}`}>{counts[t]}</span>
                  </button>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold"><Calendar className="h-4 w-4"/>Jueves, 16 de mayo</div>
            </div>

            {/* Tariff & automatic payment banner */}
            <div className="mt-3 md:mt-5 grid gap-2 md:gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-3 md:p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-brand text-ink"><Zap className="h-4 w-4 md:h-5 md:w-5"/></div>
                <div>
                  <div className="text-xs md:text-sm font-extrabold">Pago automático al enviar el informe</div>
                  <p className="text-[11px] md:text-xs text-muted-foreground">En cuanto envíes el informe, la inspección se marca como completada y el pago se transfiere automáticamente a tu taller.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2 text-[10px] md:text-xs">
                {(Object.entries(WORKSHOP_PRICES) as [keyof typeof WORKSHOP_PRICES, number][]).map(([k,v])=>(
                  <span key={k} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 md:px-3 py-0.5 md:py-1 font-bold">
                    {k === "Deportivo" ? "Deportivo / Alta gama" : k === "SUV" ? "SUV / 4x4" : k}
                    <span className="text-brand">{formatEur(v)} €</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 md:mt-5 space-y-2 md:space-y-3">
              {filtered.map(i => {
                const accent = i.status==="Completada"?"bg-success":i.status==="En proceso"?"bg-info":"bg-brand";
                return (
                  <div key={i.id} className="rounded-2xl border border-border bg-card p-3 md:p-5 md:flex md:items-center md:gap-5">
                    {/* Mobile compact layout */}
                    <div className="flex items-center gap-3 md:hidden">
                      <div className={`h-12 w-1 rounded-full ${accent}`}/>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 shrink-0"><Car className="h-5 w-5"/></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-sm font-extrabold truncate">{i.plate}</div>
                          <div className="text-sm font-extrabold whitespace-nowrap text-ink">
                            <span className={i.status==="Completada"?"text-success":""}>{formatEur(getWorkshopPayout(i.vehicleType))} €</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                          <span className="truncate">{i.vehicleType} · ID {i.id}</span>
                          <span className="whitespace-nowrap">{i.date} · {i.time}</span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[11px]">
                          <span className={`h-1.5 w-1.5 rounded-full ${accent}`}/>
                          <span className="font-bold">{i.status}</span>
                          <span className="text-muted-foreground">· {i.status==="Completada"?"Pagado":"Pago al enviar"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2 md:hidden">
                      {i.status === "Completada" ? (
                        <Link to="/ejemplo-informe" className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-ink px-2 py-1.5 text-xs font-bold">Ver informe <ArrowRight className="h-3 w-3"/></Link>
                      ) : (
                        <button onClick={()=>navigate({to:"/talleres/inspeccion/$id", params:{id:i.id}})} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand px-2 py-1.5 text-xs font-bold text-ink hover:brightness-95">
                          {i.status==="En proceso"?"Continuar":"Abrir inspección"} <ArrowRight className="h-3 w-3"/>
                        </button>
                      )}
                      <button onClick={()=>setIncidentOpen(true)} className="flex items-center justify-center gap-1 rounded-lg border border-brand px-2 py-1.5 text-xs font-bold text-ink"><MessageSquare className="h-3 w-3"/>Incidencia</button>
                    </div>

                    {/* Desktop layout (unchanged) */}
                    <div className={`hidden md:block h-16 w-1 rounded-full ${accent}`}/>
                    <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10"><Car className="h-6 w-6"/></div>
                    <div className="hidden md:block flex-1">
                      <div className="text-lg font-extrabold">{i.plate}</div>
                      <div className="text-sm text-muted-foreground">{i.vehicleType}</div>
                    </div>
                    <div className="hidden md:block text-sm">
                      <div className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{i.date}</div>
                      <div className="flex items-center gap-1"><Clock className="h-3 w-3"/>{i.time}</div>
                    </div>
                    <div className="hidden md:block text-sm">
                      <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${accent}`}/><span className="font-bold">{i.status}</span></div>
                      <div className="text-xs text-muted-foreground">ID: {i.id}</div>
                    </div>
                    <div className="hidden md:block text-right text-sm">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{i.status==="Completada"?"Pagado":"Pago al enviar"}</div>
                      <div className={`text-lg font-extrabold ${i.status==="Completada"?"text-success":"text-ink"}`}>{formatEur(getWorkshopPayout(i.vehicleType))} €</div>
                    </div>
                    <div className="hidden md:flex flex-col gap-2">
                      {i.status === "Completada" ? (
                        <Link to="/ejemplo-informe" className="flex items-center gap-2 rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold">Ver informe <ArrowRight className="h-4 w-4"/></Link>
                      ) : (
                        <button onClick={()=>navigate({to:"/talleres/inspeccion/$id", params:{id:i.id}})} className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink hover:brightness-95">
                          {i.status==="En proceso"?"Continuar inspección":"Abrir inspección"} <ArrowRight className="h-4 w-4"/>
                        </button>
                      )}
                      <button onClick={()=>setIncidentOpen(true)} className="flex items-center justify-center gap-2 rounded-lg border border-brand px-4 py-2 text-xs font-bold text-ink"><MessageSquare className="h-3 w-3"/>Reportar incidencia</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 md:mt-6 text-center text-[10px] md:text-xs text-muted-foreground">🛡 Tus inspecciones están seguras. Solo tú decides con quién compartirlas.</p>
          </>
        )}
      </main>
      <IncidentModal open={incidentOpen} onClose={()=>setIncidentOpen(false)}/>
    </div>
  );
}

function NavItem({ icon, label, active, badge, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold ${active?"bg-brand text-ink":"hover:bg-muted"}`}>
      <span className="h-4 w-4">{icon}</span>{label}
      {badge && <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-ink">{badge}</span>}
    </button>
  );
}

const TYPE_STYLES: Record<IncidentRow["type"], { bg: string; text: string; icon: any }> = {
  ausencia: { bg: "bg-destructive/10", text: "text-destructive", icon: UserX },
  vehiculo: { bg: "bg-info/10", text: "text-info", icon: Car },
  limitada: { bg: "bg-brand/15", text: "text-ink", icon: Camera },
  otro: { bg: "bg-muted", text: "text-foreground", icon: MoreHorizontal },
};

const STATUS_STYLES: Record<IncidentRow["status"], string> = {
  "Pendiente": "bg-brand/15 text-brand",
  "En revisión": "bg-info/15 text-info",
  "Resuelta": "bg-success/15 text-success",
};

function IncidenciasSection({ incTab, setIncTab }: { incTab: "Todas"|"Pendientes"|"En revisión"|"Resueltas"; setIncTab: (t: any)=>void }) {
  const counts = {
    Todas: 18,
    Pendientes: INCIDENTS.filter(i=>i.status==="Pendiente").length + 5,
    "En revisión": INCIDENTS.filter(i=>i.status==="En revisión").length + 3,
    Resueltas: INCIDENTS.filter(i=>i.status==="Resuelta").length + 3,
  } as const;
  const filtered = incTab === "Todas" ? INCIDENTS
    : incTab === "Pendientes" ? INCIDENTS.filter(i=>i.status==="Pendiente")
    : incTab === "En revisión" ? INCIDENTS.filter(i=>i.status==="En revisión")
    : INCIDENTS.filter(i=>i.status==="Resuelta");

  const tabs: { key: typeof incTab; label: string; color: string }[] = [
    { key: "Todas", label: "Todas", color: "bg-brand text-ink" },
    { key: "Pendientes", label: "Pendientes", color: "bg-brand text-ink" },
    { key: "En revisión", label: "En revisión", color: "bg-info text-white" },
    { key: "Resueltas", label: "Resueltas", color: "bg-success text-white" },
  ];

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map(t => {
            const active = incTab === t.key;
            return (
              <button key={t.key} onClick={()=>setIncTab(t.key)} className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-bold ${active ? "border-brand bg-brand/5" : "border-border bg-card hover:bg-muted/50"}`}>
                {t.label}
                <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] ${t.color}`}>{counts[t.key]}</span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold"><Calendar className="h-4 w-4"/>01/05/2025 - 31/05/2025 <ChevronDown className="h-4 w-4"/></button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold"><Filter className="h-4 w-4"/>Filtros</button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-cols-[110px_1fr_120px_1fr_120px_1fr_140px] gap-4 border-b border-border px-5 py-3 text-xs font-bold text-muted-foreground">
          <div>ID</div>
          <div>Inspección</div>
          <div>Fecha</div>
          <div>Tipo de incidencia</div>
          <div>Estado</div>
          <div>Compensación</div>
          <div>Acciones</div>
        </div>
        {filtered.map(inc => {
          const ts = TYPE_STYLES[inc.type];
          const Icon = ts.icon;
          return (
            <div key={inc.id} className="grid grid-cols-[110px_1fr_120px_1fr_120px_1fr_140px] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 hover:bg-muted/30">
              <div className="text-sm font-bold text-muted-foreground">{inc.id}</div>
              <div>
                <div className="text-sm font-extrabold">{inc.plate}</div>
                <div className="text-xs text-muted-foreground">{inc.vehicle}</div>
              </div>
              <div className="text-xs">
                <div>{inc.date}</div>
                <div className="text-muted-foreground">{inc.time}</div>
              </div>
              <div>
                <div className={`inline-flex items-center gap-2 rounded-lg ${ts.bg} px-3 py-1 text-xs font-bold ${ts.text}`}>
                  <Icon className="h-3.5 w-3.5"/>{inc.typeLabel}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{inc.subLabel}</div>
              </div>
              <div>
                <span className={`inline-block rounded-md px-3 py-1 text-xs font-bold ${STATUS_STYLES[inc.status]}`}>{inc.status}</span>
              </div>
              <div className="text-xs">
                {inc.compMulti ? (
                  <div className="space-y-0.5 font-bold">
                    <div className="text-success">Taller: {inc.compMulti.taller}</div>
                    <div className="text-foreground">LUPAUTO: {inc.compMulti.lupa}</div>
                    <div className="text-foreground">Cliente: {inc.compMulti.cliente}</div>
                  </div>
                ) : (
                  <div className={`whitespace-pre-line font-bold ${inc.comp.includes("€") && !inc.comp.includes("pendiente") && !inc.comp.includes("revisión") ? (inc.comp.includes("-") ? "text-destructive" : "text-success") : "text-muted-foreground"}`}>{inc.comp}</div>
                )}
              </div>
              <div>
                <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted"><Eye className="h-3.5 w-3.5"/>Ver detalle</button>
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-between gap-4 px-5 py-4 text-xs text-muted-foreground">
          <div>Mostrando 1 a {filtered.length} de 18 incidencias</div>
          <div className="flex items-center gap-1">
            <button className="rounded border border-border p-1.5"><ChevronLeft className="h-3.5 w-3.5"/></button>
            <button className="flex h-7 w-7 items-center justify-center rounded border-2 border-brand bg-brand/5 text-xs font-bold text-ink">1</button>
            <button className="flex h-7 w-7 items-center justify-center rounded border border-border text-xs font-bold">2</button>
            <button className="flex h-7 w-7 items-center justify-center rounded border border-border text-xs font-bold">3</button>
            <button className="rounded border border-border p-1.5"><ChevronRight className="h-3.5 w-3.5"/></button>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 font-bold">10 por página <ChevronDown className="h-3.5 w-3.5"/></button>
        </div>
      </div>
    </>
  );
}
