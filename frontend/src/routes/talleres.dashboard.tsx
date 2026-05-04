import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { 
  Calendar, Clock, History, MessageSquare, LogOut, Bell, 
  ChevronDown, Headphones, ArrowRight, Car, Zap, AlertTriangle, 
  Eye, Filter, ChevronLeft, ChevronRight, UserX, Camera, 
  MoreHorizontal, Loader2 
} from "lucide-react";
import { getWorkshopPayout, formatEur, WORKSHOP_PRICES } from "@/lib/workshop-pricing";
import { IncidentModal } from "@/components/IncidentModal";

// --- CONFIGURACIÓN DE RUTA CON PROTECCIÓN ---
export const Route = createFileRoute()({
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({ to: "/talleres/login" });
    }
  },
  head: () => ({ meta: [{ title: "Panel de Control — LUPAUTO" }] }),
  component: Dashboard,
});

// --- TIPOS ---
type Section = "inspecciones" | "completadas" | "incidencias";
type Tab = "Hoy" | "Próximas" | "Completadas";

interface Inspeccion {
  lupId: string;
  plate: string;
  vehicle: string;
  vehicleType: "Turismo" | "SUV" | "Furgoneta" | "Deportivo";
  date: string;
  time: string;
  status: "Pendiente" | "En proceso" | "Completada";
}

export function Dashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("inspecciones");
  const [tab, setTab] = useState<Tab>("Hoy");
  const [incidentOpen, setIncidentOpen] = useState(false);
  
  // ESTADOS PARA DATOS REALES (MONGODB)
  const [items, setItems] = useState<Inspeccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- LÓGICA DE CONEXIÓN A MONGODB ---
  useEffect(() => {
    const fetchInspecciones = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:9001/api/talleres/inspecciones", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error("Error al conectar con el servidor");
        const data = await res.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInspecciones();
  }, []);

  // --- FILTRADO DE UI ---
  const todayStr = new Date().toLocaleDateString('es-ES'); // Fecha dinámica
  
  const filtered = items.filter(i => {
    if (tab === "Completadas") return i.status === "Completada";
    if (tab === "Hoy") return i.date === todayStr || i.status !== "Completada"; // Simplificado para desarrollo
    return i.status !== "Completada";
  });

  const counts = {
    Hoy: items.filter(i => i.status !== "Completada").length,
    Próximas: 0, // Aquí podrías filtrar fechas futuras
    Completadas: items.filter(i => i.status === "Completada").length 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/talleres/login" });
  };

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
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted text-destructive font-bold">
            <LogOut className="h-4 w-4"/>Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">
              {section==="incidencias" ? "Incidencias" : "Dashboard del taller"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {loading ? "Sincronizando con la base de datos..." : `Tienes ${items.length} inspecciones en total.`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 bg-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[10px] font-extrabold text-white text-center">LUP<br/>AUTO</div>
              <div className="text-sm">
                <div className="font-bold uppercase tracking-tight">Taller Verificado</div>
                <div className="text-xs text-success font-bold">Conectado a MongoDB ✓</div>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-brand" />
            <p className="text-muted-foreground font-medium italic">Preparando el hacha para los informes...</p>
          </div>
        ) : error ? (
          <div className="mt-10 p-6 rounded-2xl bg-destructive/10 border border-destructive text-destructive text-center">
             <AlertTriangle className="mx-auto mb-2 h-8 w-8" />
             <p className="font-bold">{error}</p>
             <button onClick={() => window.location.reload()} className="mt-4 text-xs underline font-bold uppercase">Reintentar conexión</button>
          </div>
        ) : section === "incidencias" ? (
          <IncidenciasSection />
        ) : (
          <>
            {/* TABS & BANNER */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2 rounded-xl bg-brand/10 p-1">
                {(["Hoy","Próximas","Completadas"] as Tab[]).map(t=>(
                  <button key={t} onClick={()=>setTab(t)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${tab===t?"bg-card shadow-sm scale-105":"text-muted-foreground hover:text-ink"}`}>
                    {t} <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${tab===t?"bg-brand text-ink":"bg-muted"}`}>{counts[t]}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold bg-card shadow-sm"><Calendar className="h-4 w-4"/> {todayStr}</div>
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 md:grid-cols-[1fr_auto] md:items-center animate-in fade-in slide-in-from-top-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-ink"><Zap className="h-5 w-5"/></div>
                <div>
                  <div className="text-sm font-extrabold uppercase">Pago automático activo</div>
                  <p className="text-xs text-muted-foreground max-w-lg">Al finalizar el informe desde el panel, el sistema procesa el pago a tu cuenta de taller vinculada.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px]">
                {Object.entries(WORKSHOP_PRICES).map(([k,v])=>(
                  <span key={k} className="rounded-full border border-border bg-card px-3 py-1 font-bold shadow-sm">
                    {k}: <span className="text-brand">{v} €</span>
                  </span>
                ))}
              </div>
            </div>

            {/* LISTA DE INSPECCIONES REALES */}
            <div className="mt-5 space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-muted rounded-3xl">
                  <Car className="mx-auto h-12 w-12 text-muted mb-2" />
                  <p className="text-muted-foreground font-bold">No hay inspecciones en esta categoría</p>
                </div>
              ) : (
                filtered.map(i => {
                  const accent = i.status==="Completada"?"bg-success":i.status==="En proceso"?"bg-info":"bg-brand";
                  return (
                    <div key={i.lupId} className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5 hover:border-brand/40 transition-colors shadow-sm">
                      <div className={`h-16 w-1 rounded-full ${accent}`}/>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10"><Car className="h-6 w-6"/></div>
                      <div className="flex-1">
                        <div className="text-lg font-extrabold tracking-tight">{i.plate}</div>
                        <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{i.vehicleType} · {i.lupId}</div>
                      </div>
                      <div className="text-xs font-bold text-muted-foreground flex flex-col gap-1 items-end">
                        <div className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{i.date}</div>
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3"/>{i.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{i.status==="Completada"?"Pagado":"Por cobrar"}</div>
                        <div className={`text-lg font-black ${i.status==="Completada"?"text-success":"text-ink"}`}>{formatEur(getWorkshopPayout(i.vehicleType))} €</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {i.status === "Completada" ? (
                          <Link to="/ejemplo-informe" className="flex items-center gap-2 rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-white transition-all">Ver informe <ArrowRight className="h-4 w-4"/></Link>
                        ) : (
                          <button onClick={()=>navigate({to:`/talleres/inspeccion/${i.lupId}`})} className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-brand/20">
                            {i.status==="En proceso"?"Continuar":"Abrir"} <ArrowRight className="h-4 w-4"/>
                          </button>
                        )}
                        <button onClick={()=>setIncidentOpen(true)} className="text-[10px] font-bold uppercase text-muted-foreground hover:text-brand transition-colors">Reportar problema</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </main>
      <IncidentModal open={incidentOpen} onClose={()=>setIncidentOpen(false)}/>
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---
function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition-all ${active?"bg-brand text-ink shadow-md":"text-muted-foreground hover:bg-muted"}`}>
      <span className="h-4 w-4">{icon}</span>{label}
    </button>
  );
}

function IncidenciasSection() {
  return (
    <div className="mt-10 text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
      <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-bold">Módulo de Incidencias</h3>
      <p className="text-muted-foreground">Esta sección se conectará a la colección 'incidents' de MongoDB próximamente.</p>
    </div>
  );
}
