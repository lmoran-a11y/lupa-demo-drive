import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Acceso admin — LUPAUTO" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center bg-ink text-white md:flex">
        <div className="text-3xl font-extrabold">LUPA<span className="text-brand">UTO</span></div>
        <div className="text-xs text-white/70">Revisiones bajo lupa</div>
        <div className="mt-10 flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-brand"><Shield className="h-14 w-14 text-brand"/></div>
        <div className="mt-8 text-center">
          <div className="text-brand font-bold">Panel interno LUPAUTO</div>
          <div className="text-xs text-white/60">Acceso restringido</div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-extrabold tracking-wide">ACCESO ADMIN</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ingresa para acceder al panel interno de LUPAUTO.</p>
          <form onSubmit={(e)=>{e.preventDefault(); navigate({to:"/admin/dashboard"})}} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-bold">Email</label>
              <input defaultValue="admin@lupauto.es" className="mt-1 w-full rounded-lg border border-border px-4 py-3 outline-none"/>
            </div>
            <div>
              <label className="text-sm font-bold">Contraseña</label>
              <div className="relative mt-1">
                <input type={show?"text":"password"} defaultValue="contraseña123" className="w-full rounded-lg border border-border px-4 py-3 pr-10 outline-none"/>
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{show?<EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button>
              </div>
            </div>
            <button className="w-full rounded-lg bg-ink py-3 font-bold text-white hover:brightness-110">Acceder</button>
          </form>
          <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground">‹ Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
