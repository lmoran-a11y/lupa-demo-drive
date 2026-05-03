import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { LayoutGrid, Calendar, Wrench, Users, FileText, AlertTriangle, Settings, LogOut, Eye, ChevronDown } from "lucide-react";
import { inspections } from "@/lib/mock-data";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Panel admin — LUPAUTO" }] }),
  component: Admin,
});

function statusBadge(s: string) {
  const map: Record<string, string> = {
    "En revisión": "bg-purple-100 text-purple-700",
    "Asignada": "bg-blue-100 text-blue-700",
    "Pendiente": "bg-brand/20 text-ink",
    "Informe enviado": "bg-success/15 text-success",
    "Completada": "bg-success/15 text-success",
  };
  return map[s] ?? "bg-muted";
}

function Admin() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<typeof inspections[number] | null>(inspections[0]);
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 flex-col bg-ink text-white md:flex">
        <div className="p-5"><Logo light/></div>
        <nav className="flex-1 space-y-1 px-3">
          {[
            ["Resumen", LayoutGrid, true],
            ["Citas", Calendar, false],
            ["Talleres", Wrench, false],
            ["Clientes", Users, false],
            ["Informes", FileText, false],
            ["Incidencias", AlertTriangle, false],
            ["Ajustes", Settings, false],
          ].map(([l, Icon, active]: any) => (
            <button key={l} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${active?"bg-brand text-ink font-bold":"text-white/80 hover:bg-white/10"}`}>
              <Icon className="h-4 w-4"/>{l}
            </button>
          ))}
        </nav>
        <Link to="/" className="m-3 flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/10"><LogOut className="h-4 w-4"/>Cerrar sesión</Link>
      </aside>

      <main className="flex-1 px-8 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">RESUMEN GENERAL</h1>
            <p className="text-sm text-muted-foreground">Panel de control de LUPAUTO</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-bold"><Calendar className="h-4 w-4"/>16 de mayo de 2024</div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          <Stat label="Pendientes" v="8" icon={<Calendar className="h-5 w-5 text-brand"/>}/>
          <Stat label="Asignadas" v="12" icon={<Wrench className="h-5 w-5 text-info"/>}/>
          <Stat label="En revisión" v="5" icon={<Wrench className="h-5 w-5 text-purple-500"/>}/>
          <Stat label="Informes enviados" v="23" icon={<FileText className="h-5 w-5 text-success"/>}/>
          <Stat label="Incidencias" v="2" icon={<AlertTriangle className="h-5 w-5 text-destructive"/>}/>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">CITAS RECIENTES</h2>
              <button className="text-sm font-bold text-brand">Ver todas las citas ›</button>
            </div>
            <table className="mt-4 w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border text-left">
                  <th className="py-2">ID CITA</th><th>CLIENTE</th><th>VEHÍCULO</th><th>TALLER</th><th>FECHA/HORA</th><th>ESTADO</th><th></th>
                </tr>
              </thead>
              <tbody>
                {inspections.map(i => (
                  <tr key={i.id} className={`border-b border-border ${selected?.id===i.id?"bg-brand/5":""}`}>
                    <td className="py-3 font-bold">{i.id}</td>
                    <td>{i.client}</td>
                    <td>{i.vehicle}</td>
                    <td>{i.workshop}</td>
                    <td>{i.date} {i.time}</td>
                    <td><span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${statusBadge(i.status)}`}>● {i.status}</span></td>
                    <td><button onClick={()=>setSelected(i)} className="rounded p-1 hover:bg-muted"><Eye className="h-4 w-4"/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">DETALLE DE CITA <span className="ml-2 rounded-full bg-brand/15 px-2 py-0.5 text-xs">{selected.id}</span></h3>
                <button className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-bold">Acciones <ChevronDown className="h-3 w-3"/></button>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <Det k="Cliente" v={selected.client}/>
                <Det k="Email" v={selected.email ?? "-"}/>
                <Det k="Teléfono" v={selected.phone ?? "-"}/>
                <Det k="Vehículo" v={selected.vehicle}/>
                <Det k="Matrícula" v={selected.plate}/>
                <Det k="Ubicación" v={selected.location}/>
                <Det k="Fecha y hora" v={`${selected.date} a las ${selected.time}`}/>
                <Det k="Taller asignado" v={selected.workshop}/>
                <Det k="Estado" v={selected.status} highlight/>
              </div>
              <div className="mt-5 space-y-2 border-t border-border pt-4">
                <div className="text-xs font-bold">ACCIONES RÁPIDAS</div>
                <ActBtn>Asignar / Cambiar taller</ActBtn>
                <ActBtn>Cambiar estado</ActBtn>
                <ActBtn danger>Marcar incidencia</ActBtn>
                <button onClick={()=>navigate({to:"/ejemplo-informe"})} className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-bold hover:bg-muted"><FileText className="h-4 w-4"/>Ver informe</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
function Stat({ label, v, icon }: any) {
  return <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">{icon}</div><div><div className="text-xs text-muted-foreground">{label}</div><div className="text-2xl font-extrabold">{v}</div></div></div></div>;
}
function Det({ k, v, highlight }: any) {
  return <div className="flex justify-between border-b border-border/60 py-1.5"><span className="text-muted-foreground">{k}</span><span className={highlight?"rounded-full bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700":"font-medium"}>{highlight?`● ${v}`:v}</span></div>;
}
function ActBtn({ children, danger }: any) {
  return <button className={`flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-bold hover:bg-muted ${danger?"text-destructive":""}`}>{children}</button>;
}
