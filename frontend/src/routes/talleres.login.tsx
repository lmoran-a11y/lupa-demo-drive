import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Shield, Loader2, AlertCircle } from "lucide-react";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Acceso Talleres — LUPAUTO" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  // Estados para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:9001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      // Guardamos la sesión en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.username || "Taller");

      // Navegamos al dashboard real
      navigate({ to: "/talleres/dashboard" });
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2 bg-background">
      {/* Lado Izquierdo - Branding */}
      <div className="relative hidden items-center justify-center bg-ink text-white md:flex">
        <div className="absolute left-6 top-6">
          <div className="text-2xl font-extrabold tracking-tighter">
            LUPA<span className="text-brand">UTO</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-48 w-48 items-center justify-center rounded-full border-[8px] border-brand bg-ink shadow-2xl">
            <Shield className="h-20 w-20 text-brand" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold uppercase tracking-widest">Panel de Colaboradores</h2>
            <p className="text-sm text-white/50 mt-2 italic">Sistema de Gestión de Inspecciones</p>
          </div>
        </div>
      </div>

      {/* Lado Derecho - Formulario */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <header className="mb-8">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Acceso</h1>
            <div className="h-1.5 w-12 bg-brand mt-1" />
          </header>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm font-bold text-destructive animate-in fade-in zoom-in duration-200">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-muted-foreground ml-1">Email del Taller</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="taller@ejemplo.com"
                className="w-full rounded-xl border border-border bg-card px-4 py-3.5 outline-none focus:border-brand transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-muted-foreground ml-1">Contraseña</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3.5 pr-10 outline-none focus:border-brand transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand transition-colors"
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand py-4 font-black uppercase italic text-ink hover:brightness-90 transition-all disabled:opacity-50 shadow-lg shadow-brand/20 mt-4"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Entrar al sistema <Shield className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground font-medium">
              ¿No tienes acceso? <Link to="/contacto" className="font-black text-brand uppercase hover:underline">Contacta aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}