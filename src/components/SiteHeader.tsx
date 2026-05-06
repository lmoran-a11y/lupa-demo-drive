import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Calendar } from "lucide-react";

export function SiteHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleSolicitar = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollToPicker = () => {
      const el = document.getElementById("vehicle-picker");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (pathname === "/") {
      scrollToPicker();
    } else {
      navigate({ to: "/" }).then(() => {
        // wait for the home page to render
        setTimeout(scrollToPicker, 100);
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-12 md:h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center"><span className="inline-flex items-center rounded-lg md:rounded-xl bg-white px-2.5 py-1 md:px-4 md:py-1.5"><span className="[&_img]:h-7 md:[&_img]:h-12"><Logo size="header" /></span></span></Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link to="/como-funciona" className="hover:text-brand">Cómo funciona</Link>
          <Link to="/talleres" className="hover:text-brand">Para talleres</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/consultar-cita" className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted md:inline-flex">
            <Calendar className="h-4 w-4" /> Consultar cita
          </Link>
          <button
            type="button"
            onClick={handleSolicitar}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink hover:brightness-95"
          >
            Solicitar inspección
          </button>
        </div>
      </div>
    </header>
  );
}
