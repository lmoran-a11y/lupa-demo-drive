import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, AlertTriangle, Shield, Play } from "lucide-react";

export const Route = createFileRoute("/ejemplo-informe")({
  head: () => ({ meta: [{ title: "Ejemplo de informe LUPA — LUPAUTO" }] }),
  component: Ejemplo,
});

function Ejemplo() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl space-y-4 px-6 py-10">
        <div className="flex items-start justify-between rounded-2xl border border-border bg-card p-6">
          <div>
            <div className="text-2xl font-extrabold">LUPA<span className="text-brand">UTO</span></div>
            <div className="text-xs text-muted-foreground">Revisiones bajo lupa</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">INFORME LUPA – EJEMPLO</div>
            <div className="text-sm text-muted-foreground">Ejemplo demostrativo · Datos ficticios</div>
          </div>
          <div className="rounded-lg border border-border px-3 py-2 text-right text-xs">
            <div className="text-muted-foreground">ID DE INFORME</div>
            <div className="font-bold">LUP-EX-000123</div>
            <div className="text-muted-foreground">Fecha: 20/05/2025</div>
          </div>
        </div>

        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-[200px_1fr]">
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-muted">🚗</div>
          <div>
            <div className="font-bold">DATOS DEL VEHÍCULO</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
              {[["Marca / Modelo","BMW Serie 3"],["Año","2018"],["Matrícula","1234 ABC"],["Transmisión","Manual"],["Kilometraje","120.000 km"],["Color","Gris oscuro"],["Combustible","Diésel"],["Propietario","Demo Cliente"]].map(([k,v])=>(
                <div key={k}><div className="text-xs text-muted-foreground">{k}</div><div className="font-bold">{v}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-border bg-card p-6 md:grid-cols-4 text-sm">
          {[["Taller colaborador","Verificado LUPAUTO"],["Técnico inspector","Juan Pérez"],["Tiempo estimado","55-75 min"],["Tipo de inspección","Compra de vehículo"]].map(([k,v])=>(
            <div key={k} className="flex items-center gap-2"><Shield className="h-5 w-5 text-muted-foreground"/><div><div className="text-xs text-muted-foreground">{k}</div><div className="font-bold">{v}</div></div></div>
          ))}
        </div>

        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-[260px_1fr]">
          <div className="rounded-xl bg-success/10 p-6 text-center">
            <div className="text-sm font-bold">ESTADO GENERAL</div>
            <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-success text-white"><Check className="h-8 w-8"/></div>
            <div className="mt-2 text-xl font-extrabold text-success">CORRECTO</div>
            <p className="mt-1 text-xs text-muted-foreground">El vehículo se encuentra en buen estado general. Se recomienda mantenimiento preventivo.</p>
          </div>
          <div className="grid gap-3 self-center md:grid-cols-2">
            {[["Motor","Correcto","ok"],["Suspensión","Correcto","ok"],["Frenos","Correcto","ok"],["Carrocería","Correcto","ok"],["Neumáticos","Correcto","ok"],["Electricidad","A revisar","warn"]].map(([k,v,s])=>(
              <div key={k} className="flex items-center justify-between rounded-lg border border-border px-4 py-2 text-sm">
                <span className="font-medium">{k}</span>
                <span className={s==="ok"?"font-bold text-success":"font-bold text-brand"}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-bold">DETALLE DE LA INSPECCIÓN</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              ["MOTOR","Correcto","Funcionamiento correcto. Sin fugas apreciables.","ok"],
              ["FRENOS","Correcto","Discos y pastillas en buen estado. Resto de componentes correctos.","ok"],
              ["NEUMÁTICOS","Correcto","Neumáticos con buen dibujo. Desgaste uniforme.","ok"],
              ["SUSPENSIÓN","Correcto","Sin ruidos ni holguras apreciables.","ok"],
              ["CARROCERÍA","Correcto","Sin golpes estructurales. Pequeñas marcas de uso acordes a la edad.","ok"],
              ["ELECTRICIDAD","A revisar","Batería con voltaje bajo. Se recomienda revisión o sustitución próxima.","warn"],
            ].map(([t,s,d,k])=>(
              <div key={t as string} className="grid grid-cols-[1fr_120px] gap-3 rounded-lg border border-border p-3">
                <div>
                  <div className="text-sm font-bold">{t}</div>
                  <div className={`text-xs font-bold ${k==="ok"?"text-success":"text-brand"}`}>{s}</div>
                  <p className="mt-2 text-xs text-muted-foreground">{d}</p>
                </div>
                <div className="aspect-square rounded bg-muted"/>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-sm font-bold">GALERÍA DE FOTOS <span className="text-muted-foreground">(Ejemplo)</span></div>
            <div className="mt-3 grid grid-cols-5 gap-2">{[0,1,2,3,4].map(i=><div key={i} className="aspect-square rounded bg-muted"/>)}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-sm font-bold">VÍDEO RESUMEN <span className="text-muted-foreground">(Ejemplo)</span></div>
            <div className="mt-3 flex aspect-video items-center justify-center rounded bg-muted"><Play className="h-10 w-10"/></div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-info/30 bg-info/10 p-4 text-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-white">i</div>
            <div>
              <div className="font-bold">AVISO IMPORTANTE</div>
              <p className="text-muted-foreground">Este informe es una muestra con datos ficticios realizada en taller. No constituye garantía mecánica ni sustituye una garantía comercial.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 text-sm">
            <AlertTriangle className="h-5 w-5 text-brand"/>
            <div>
              <div className="font-bold">EJEMPLO ORIENTATIVO</div>
              <p className="text-muted-foreground">Este informe es una muestra visual con datos ficticios. El contenido final puede variar según el vehículo, el tipo de inspección y la información disponible durante la revisión.</p>
            </div>
          </div>
        </div>

        <Link to="/" className="block rounded-xl bg-brand py-3 text-center font-bold text-ink">Volver al inicio</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
