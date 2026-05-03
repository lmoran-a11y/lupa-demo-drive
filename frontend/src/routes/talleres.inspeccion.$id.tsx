import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Save, Send, Check, AlertTriangle, X, Camera, Upload, Settings, Car, Zap } from "lucide-react";
import { workshopInspections } from "@/lib/mock-data";
import { getWorkshopPayout, formatEur } from "@/lib/workshop-pricing";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Informe LUPA — LUPAUTO" }] }),
  component: Report,
});

const TRI = [
  { v: "ok", label: "OK", icon: Check, cls: "border-success bg-success/10 text-success" },
  { v: "warn", label: "Aviso", icon: AlertTriangle, cls: "border-brand bg-brand/10 text-ink" },
  { v: "bad", label: "Mal", icon: X, cls: "border-destructive bg-destructive/10 text-destructive" },
];

function Report() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const inspection = workshopInspections.find(i => i.id === id) ?? workshopInspections[0];

  const [diag, setDiag] = useState("ok");
  const [km, setKm] = useState("ok");
  const [motor, setMotor] = useState("warn");
  const [aceite, setAceite] = useState("ok");
  const [refri, setRefri] = useState("warn");
  const [estructural, setEstructural] = useState("ok");
  const [repaint, setRepaint] = useState("0");
  const [masilla, setMasilla] = useState("ok");
  const [aline, setAline] = useState("ok");
  const [interior, setInterior] = useState("ok");
  const [estado, setEstado] = useState("ok");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const payout = getWorkshopPayout(inspection.vehicleType);

  function send() {
    setConfirmOpen(false);
    alert(`✅ Informe enviado correctamente.\nLa inspección se ha marcado como completada y el pago de ${formatEur(payout)} € se transferirá automáticamente a tu taller.`);
    navigate({ to: "/talleres/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <button onClick={()=>navigate({to:"/talleres/dashboard"})} className="flex items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4"/>Volver</button>
        <div className="text-center">
          <div className="text-xl font-extrabold">INFORME <span className="text-brand">LUPA</span></div>
          <div className="text-xs text-muted-foreground">INSPECCIÓN PRE-COMPRA</div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>alert("💾 Progreso guardado")} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-bold"><Save className="h-4 w-4"/>Guardar progreso</button>
          <button onClick={()=>setConfirmOpen(true)} className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink hover:brightness-95"><Send className="h-4 w-4"/>Enviar informe</button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4 px-6 py-6">
        {/* META */}
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-3">
          <Meta t="MATRÍCULA" v={inspection.plate}/>
          <Meta t="KILOMETRAJE INDICADO" v="120.000 km"/>
          <Meta t="FECHA INSPECCIÓN" v={inspection.date}/>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* MECÁNICA */}
          <section className="rounded-2xl border border-border bg-card">
            <h2 className="rounded-t-2xl bg-ink px-5 py-3 text-sm font-extrabold text-white">⚙️ 1. MECÁNICA</h2>
            <div className="space-y-5 p-5">
              <Group label="Diagnosis electrónica">
                <Tri value={diag} set={setDiag} options={[["ok","SIN FALLOS"],["warn","FALLOS REGISTRADOS"],["bad","FALLOS ACTIVOS"]]}/>
              </Group>
              <Group label="Verificación de kilometraje">
                <Tri value={km} set={setKm} options={[["ok","COHERENTE"],["warn","NO VERIFICABLE"],["bad","MANIPULACIÓN DETECTADA"]]}/>
              </Group>
              <Group label="Estado del motor">
                <div className="grid grid-cols-4 gap-2">
                  {[["ok","EXCELENTE"],["ok","BUENO"],["warn","CORRECTO"],["bad","PROBLEMA DETECTADO"]].map(([v,l],i)=>(
                    <button key={i} onClick={()=>setMotor(v)} className={`rounded-lg border-2 px-2 py-2 text-xs font-bold ${motor===v && i===1?TRI[0].cls:"border-border"}`}>{l}</button>
                  ))}
                </div>
              </Group>
              <Group label="Fugas">
                <Row label="Aceite"><Quad v={aceite} set={setAceite}/></Row>
                <Row label="Refrigerante"><Quad v={refri} set={setRefri}/></Row>
              </Group>
              <Group label="Frenos">
                {[["Pastillas delanteras",70],["Discos delanteros",75],["Pastillas traseras",60],["Discos traseros",65]].map(([n,p]:any)=>(
                  <div key={n} className="flex items-center gap-3 text-sm">
                    <span className="w-44 text-xs">{n}</span>
                    <input defaultValue={p} className="w-12 rounded border border-border px-1 text-center text-sm"/>
                    <span className="text-xs">%</span>
                    <div className="h-2 flex-1 rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-success to-brand" style={{width:`${p}%`}}/></div>
                  </div>
                ))}
              </Group>
              <Group label="Suspensión y dirección">
                {["Amortiguadores","Silentblocks","Rótulas / Brazos","Dirección"].map(n=>(
                  <Row key={n} label={n}><Tri value="ok" set={()=>{}} options={[["ok","BIEN"],["warn","REGULAR"],["bad","MAL"]]}/></Row>
                ))}
              </Group>
            </div>
          </section>

          {/* CARROCERÍA */}
          <section className="rounded-2xl border border-border bg-card">
            <h2 className="rounded-t-2xl bg-ink px-5 py-3 text-sm font-extrabold text-white">🚗 2. CARROCERÍA E INTERIOR</h2>
            <div className="space-y-5 p-5">
              <Group label="Daños estructurales">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={()=>setEstructural("ok")} className={`rounded-lg border-2 px-3 py-2 text-sm font-bold ${estructural==="ok"?TRI[0].cls:"border-border"}`}><Check className="mr-1 inline h-4 w-4"/>NO DETECTADOS</button>
                  <button onClick={()=>setEstructural("bad")} className={`rounded-lg border-2 px-3 py-2 text-sm font-bold ${estructural==="bad"?TRI[2].cls:"border-border"}`}><X className="mr-1 inline h-4 w-4"/>DETECTADOS</button>
                </div>
              </Group>
              <Group label="Repintados">
                <div className="grid grid-cols-4 gap-2">
                  {[["0","NINGUNO"],["1","1-2 PANELES"],["2","3-4 PANELES"],["3","+4 PANELES"]].map(([v,l])=>(
                    <button key={v} onClick={()=>setRepaint(v)} className={`rounded-lg border-2 px-2 py-2 text-xs font-bold ${repaint===v?TRI[0].cls:"border-border"}`}>{l}</button>
                  ))}
                </div>
              </Group>
              <Group label="Masilla">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={()=>setMasilla("ok")} className={`rounded-lg border-2 px-3 py-2 text-sm font-bold ${masilla==="ok"?TRI[0].cls:"border-border"}`}>NO</button>
                  <button onClick={()=>setMasilla("bad")} className={`rounded-lg border-2 px-3 py-2 text-sm font-bold ${masilla==="bad"?TRI[2].cls:"border-border"}`}>SÍ</button>
                </div>
              </Group>
              <Group label="Alineación de paneles">
                <Tri value={aline} set={setAline} options={[["ok","CORRECTA"],["warn","VARIACIÓN LEVE"],["bad","DESALINEACIÓN"]]}/>
              </Group>
              <Group label="Interior">
                {["Volante","Pedales","Asiento conductor"].map(n=>(
                  <Row key={n} label={n}><Tri value="warn" set={()=>{}} options={[["ok","BAJO"],["warn","MEDIO"],["bad","ALTO"]]}/></Row>
                ))}
                <Row label="Interior general"><Tri value={interior} set={setInterior} options={[["ok","BUENO"],["warn","REGULAR"],["bad","MALO"]]}/></Row>
              </Group>
              <Group label="📷 Fotografías incluidas">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
                  {["FRONTAL","TRASERA","LAT. IZQ.","LAT. DER.","INTERIOR","MOTOR","CUADRO KM"].map(n=>(
                    <div key={n} className="text-center">
                      <div className="relative flex aspect-square items-center justify-center rounded-lg bg-muted"><Camera className="h-5 w-5 text-muted-foreground"/><div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-ink text-xs font-bold">+</div></div>
                      <div className="mt-1 text-[10px] font-bold">{n}</div>
                    </div>
                  ))}
                </div>
              </Group>
              <Group label="▶️ Vídeo resumen del inspector">
                <button className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-brand bg-brand/5 py-6 text-sm">
                  <Upload className="h-6 w-6 text-brand"/><b>Subir vídeo</b><span className="text-xs text-muted-foreground">o arrastrar aquí</span>
                </button>
              </Group>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-extrabold">ESTADO GENERAL DEL VEHÍCULO</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              ["ok","CORRECTO","El vehículo se encuentra en buen estado general.", "border-success/40 bg-success/5", "bg-success"],
              ["warn","REQUIERE REVISIÓN","Presenta puntos que deberían revisarse.","border-brand/40 bg-brand/5","bg-brand"],
              ["bad","PROBLEMA IMPORTANTE","Presenta defectos relevantes.","border-destructive/40 bg-destructive/5","bg-destructive"],
            ].map(([v,t,d,bg,dot])=>(
              <button key={v} onClick={()=>setEstado(v)} className={`rounded-2xl border-2 p-4 text-left ${estado===v?bg:"border-border"}`}>
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${dot} text-white`}>{v==="ok"?<Check className="h-5 w-5"/>:v==="warn"?<AlertTriangle className="h-5 w-5"/>:<X className="h-5 w-5"/>}</div>
                <div className="mt-2 text-center text-sm font-extrabold">{t}</div>
                <div className="text-center text-xs text-muted-foreground">{d}</div>
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-start justify-between rounded-2xl border border-border bg-card p-5 text-xs text-muted-foreground">
          <div>ℹ️ Inspección visual y electrónica realizada en taller. El informe refleja el estado del vehículo en el momento de la revisión.</div>
          <div>🛡 INSPECCIÓN REALIZADA POR<br/><b className="text-ink">Taller certificado LUPAUTO</b><br/>Nº Taller: ES-12345</div>
        </div>

        <div className="flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-ink"><Zap className="h-5 w-5"/></div>
            <div className="text-sm">
              <div className="font-extrabold">Pago automático tras enviar el informe</div>
              <div className="text-xs text-muted-foreground">Vehículo: <b>{inspection.vehicleType}</b> · Importe a recibir: <b className="text-ink">{formatEur(payout)} €</b></div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Link to="/talleres/dashboard" className="rounded-lg border border-border px-4 py-3 text-sm font-bold">Cancelar</Link>
            <button onClick={()=>setConfirmOpen(true)} className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-bold text-ink"><Send className="h-4 w-4"/>Enviar informe y cobrar {formatEur(payout)} €</button>
          </div>
        </div>
      </main>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar envío del informe</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres enviar el informe? Una vez enviado no podrá ser modificado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={send} className="bg-brand text-ink hover:brightness-95">
              Sí, enviar informe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Meta({ t, v }: { t: string; v: string }) {
  return <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><Car className="h-5 w-5"/></div><div><div className="text-xs text-muted-foreground">{t}</div><div className="text-lg font-extrabold">{v}</div></div></div>;
}
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div><div className="mb-2 flex items-center gap-2 text-xs font-extrabold tracking-wide"><Settings className="h-3 w-3"/>{label.toUpperCase()}</div><div className="space-y-2">{children}</div></div>);
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="flex items-center gap-3"><span className="w-44 text-xs font-bold">{label.toUpperCase()}</span><div className="flex-1">{children}</div></div>);
}
function Tri({ value, set, options }: { value: string; set: (v: string) => void; options: [string,string][] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map(([v,l]) => {
        const cls = v==="ok"?TRI[0].cls:v==="warn"?TRI[1].cls:TRI[2].cls;
        return <button key={l} onClick={()=>set(v)} className={`rounded-lg border-2 px-2 py-2 text-xs font-bold ${value===v?cls:"border-border"}`}>{l}</button>;
      })}
    </div>
  );
}
function Quad({ v, set }: { v: string; set: (s: string) => void }) {
  const opts = [["ok","NO"],["warn","LEVE"],["warn","MODERADA"],["bad","IMPORTANTE"]];
  return (
    <div className="grid grid-cols-4 gap-2">
      {opts.map(([s,l],i)=>(<button key={i} onClick={()=>set(s)} className={`rounded-lg border-2 px-2 py-1.5 text-xs font-bold ${v===s && i<2?(s==="ok"?TRI[0].cls:TRI[1].cls):"border-border"}`}>{l}</button>))}
    </div>
  );
}
