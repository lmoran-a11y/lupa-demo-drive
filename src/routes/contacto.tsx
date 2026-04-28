import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Phone, Mail, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contacto")({
  head: () => ({ meta: [{ title: "Contacto — LUPAUTO" }] }),
  component: Contacto,
});

function Contacto() {
  const [tab, setTab] = useState<"cliente"|"taller">("cliente");
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <button onClick={()=>history.back()} className="text-sm text-brand">‹ Volver al inicio</button>
        <h1 className="mt-3 text-3xl font-extrabold">¿NECESITAS AYUDA?</h1>
        <p className="text-sm text-muted-foreground">Estamos aquí para ayudarte.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={()=>setTab("cliente")} className={`rounded-xl px-4 py-3 text-sm font-bold ${tab==="cliente"?"bg-ink text-white":"bg-muted"}`}>👤 Soy cliente</button>
          <button onClick={()=>setTab("taller")} className={`rounded-xl px-4 py-3 text-sm font-bold ${tab==="taller"?"bg-ink text-white":"bg-muted"}`}>🔧 Soy taller colaborador</button>
        </div>

        <form className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-2">
          <Field label="Nombre completo" placeholder="Tu nombre"/>
          <Field label="Email o teléfono" placeholder="tu@email.com / 600 000 000"/>
          <Field label="Número de cita (opcional)" placeholder="Ej: LUP-000123"/>
          <div>
            <label className="text-sm font-bold">Asunto</label>
            <select className="mt-1 w-full rounded-lg border border-border px-4 py-3 outline-none">
              <option>Selecciona un asunto</option><option>Cambiar mi cita</option><option>Cancelar reserva</option><option>Otro</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-bold">Mensaje</label>
            <textarea rows={4} placeholder="Cuéntanos cómo podemos ayudarte…" className="mt-1 w-full rounded-lg border border-border px-4 py-3 outline-none"/>
          </div>
          <button type="button" onClick={(e)=>{e.preventDefault(); alert("¡Consulta enviada!");}} className="md:col-span-2 flex items-center justify-center gap-2 rounded-lg bg-brand py-3 font-bold text-ink">
            <ArrowRight className="h-4 w-4"/>Enviar consulta
          </button>
          <p className="md:col-span-2 flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3"/>Te responderemos lo antes posible.</p>
        </form>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Card icon={<Phone/>} t="Teléfono" v="+34 613 456 789"/>
          <Card icon={<Mail/>} t="Email" v="hola@lupauto.es"/>
          <Card icon={<MessageCircle/>} t="WhatsApp" v="Chatea con nosotros"/>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (<div><label className="text-sm font-bold">{label}</label><input placeholder={placeholder} className="mt-1 w-full rounded-lg border border-border px-4 py-3 outline-none"/></div>);
}
function Card({ icon, t, v }: any) {
  return (<div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-ink">{icon}</div><div><div className="text-xs text-muted-foreground">{t}</div><div className="font-bold">{v}</div></div></div>);
}
