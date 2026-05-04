import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Shield, Loader2, AlertCircle } from "lucide-react";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Acceso taller — LUPAUTO" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  // Estados para el formulario y login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Conexión con tu backend de MongoDB (Server.ts en puerto 9001)
      const response = await fetch("http://localhost:9001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      // Guardamos la sesión (token y rol)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userName", data.username || "Taller");

      // Si el login es correcto, navegamos al dashboard
      navigate({ to: "/talleres/dashboard" });
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor de Lupauto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden items-center justify-center bg-ink text-white md:flex">
        <div className="absolute left-6 top-6">
          <div className="text-2xl font-extrabold">
            LUPA<span className="text-brand">UTO</span>
          </div>
          <div className="text-xs text-white/70">Revisiones bajo lupa</div>
        </div>
        <div className="flex h-64 w-64 items-center justify-center rounded-full border-[10px] border-brand bg-ink">
          <svg viewBox="0 0 24 24" className="h-28 w-28 text-white" fill="currentColor">
            <path d="M5 14l1.5-4.5A3 3 0 0 1 9.3 7.5h5.4a3 3 0 0 1 2.8 2L19 14v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z" />
          </svg>
        </div>
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs">
          <Shield className="h-4 w-4 text-brand" />
          Talleres verificados
          <br />
          de confianza
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-extrabold tracking-wide uppercase">Acceso Taller</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Panel privado para talleres colaboradores de LUPAUTO.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-bold">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="taller@ejemplo.com"
                className="mt-1 w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="text-sm font-bold">Contraseña</label>
              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border px-4 py-3 pr-10 outline-none focus:border-brand"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-[#F5B800]" />
              Recuérdame
            </label>

            <button
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-bold text-ink hover:brightness-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Entrar al panel"
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <div className="text-muted-foreground">¿Problemas para acceder?</div>
            <Link to="/contacto" className="font-bold text-brand">
              Contactar con soporte
            </Link>
          </div>
          
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/admin/login" className="underline">
              Acceso administradores
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
