import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-6 md:flex-row md:justify-between md:gap-8">
        <Logo light size="footer" />
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/80">
          <Link to="/legal/aviso-legal" className="hover:text-white">Aviso legal</Link>
          <Link to="/legal/privacidad" className="hover:text-white">Privacidad</Link>
          <Link to="/legal/terminos" className="hover:text-white">Términos y condiciones</Link>
          <Link to="/contacto" className="hover:text-white">Contacto</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"><Instagram className="h-4 w-4" /></a>
          <a aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"><MessageCircle className="h-4 w-4" /></a>
          <a aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="py-4 text-center text-xs text-white/50">© 2024 Lupauto</p>
      </div>
    </footer>
  );
}
