import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Facebook, MessageCircle, Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo light />
          <div className="mt-5 flex gap-3">
            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Instagram className="h-4 w-4" /></a>
            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><Facebook className="h-4 w-4" /></a>
            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">Empresa</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/como-funciona" className="hover:text-white">Cómo funciona</Link></li>
            <li><Link to="/sobre-nosotros" className="hover:text-white">Sobre nosotros</Link></li>
            <li><Link to="/talleres" className="hover:text-white">Para talleres</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">Legal</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/legal" className="hover:text-white">Aviso legal</Link></li>
            <li><Link to="/legal" className="hover:text-white">Términos y condiciones</Link></li>
            <li><Link to="/legal" className="hover:text-white">Política de privacidad</Link></li>
            <li><Link to="/legal" className="hover:text-white">Política de cookies</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">Ayuda</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/contacto" className="hover:text-white">Preguntas frecuentes</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Soporte</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Atención al cliente</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/60 md:flex-row">
          <div className="rounded-lg border border-brand/40 px-4 py-2 text-white">
            <span className="text-white/70">¿Necesitas ayuda? </span>
            <span className="font-bold text-brand">+34 613 456 789</span>
            <span className="ml-3 inline-flex items-center gap-1 text-white/70"><Clock className="h-3 w-3" /> L-V de 9:00 a 20:00</span>
          </div>
          <p>© 2024 Lupauto. Tu seguridad es nuestra prioridad.</p>
        </div>
      </div>
    </footer>
  );
}
