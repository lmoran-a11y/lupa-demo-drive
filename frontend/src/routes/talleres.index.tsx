import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Shield, Car } from "lucide-react";

export const Route = createFileRoute()({
  head: () => ({ meta: [{ title: "Acceso taller — LUPAUTO" }] }),
  component: TalleresLogin,
});

function TalleresLogin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("taller@lupauto.es");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "taller@lupauto.es" && password === "1234") {
      navigate({ to: "/talleres/dashboard" });
    } else {
      setError("Credenciales incorrectas. Usa taller@lupauto.es / 1234");
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left side - black */}
      <div className="relative hidden flex-col bg-ink text-white md:flex">
        <div className="absolute left-8 top-8">
          <div className="text-3xl font-extrabold leading-none">
            LUPA<span className="text-brand">UTO</span>
          </div>
          <div className="mt-1 text-sm italic text-white/70">Revisiones bajo lupa</div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex h-56 w-56 items-center justify-center rounded-full bg-brand">
            <Car className="h-24 w-24 text-ink" strokeWidth={2.2} />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 flex items-center gap-3">
          <Shield className="h-6 w-6 text-brand" />
          <div className="text-xs font-bold leading-tight">
            Talleres verificados<br />de confianza
          </div>
        </div>
      </div>

      {/* Right side - white */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-extrabold tracking-wide">ACCESO TALLER</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Panel privado para talleres colaboradores de LUPAUTO.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-sm font-bold">Contraseña</label>
              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-10 outline-none focus:border-brand"
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
              <input type="checkbox" className="h-4 w-4 accent-[#F5B800]" />
              Recuérdame
            </label>

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-brand py-3 font-bold text-ink hover:brightness-95"
            >
              Entrar al panel
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">¿Problemas para acceder? </span>
            <Link to="/contacto" className="font-bold text-brand hover:underline">
              Contactar con soporte
            </Link>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <Link to="/admin/login" className="underline hover:text-brand">
              Acceso administradores
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
