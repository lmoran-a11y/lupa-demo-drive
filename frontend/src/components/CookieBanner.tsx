import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "lupauto_cookie_consent";

type Prefs = { necessary: true; analytics: boolean; thirdParty: boolean };

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ necessary: true, analytics: true, thirdParty: false });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const save = (value: Prefs | "all") => {
    const data = value === "all" ? { necessary: true, analytics: true, thirdParty: true } : value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ts: Date.now() }));
    setVisible(false);
    setShowConfig(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-white p-5 shadow-2xl ring-1 ring-ink/5">
        {!showConfig ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-ink">
              <Cookie className="h-5 w-5" />
            </div>
            <div className="flex-1 text-sm">
              <div className="font-bold text-ink">Usamos cookies</div>
              <p className="mt-1 text-muted-foreground">
                Utilizamos cookies técnicas y, con tu consentimiento, analíticas para mejorar tu
                experiencia. Consulta nuestra{" "}
                <Link to="/legal/cookies" className="font-bold text-ink underline">
                  Política de cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setShowConfig(true)}
                className="rounded-lg border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold text-ink hover:bg-muted"
              >
                Configurar
              </button>
              <button
                onClick={() => save("all")}
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-ink hover:brightness-95"
              >
                Aceptar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-base font-bold text-ink">Configura tus cookies</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Elige qué cookies quieres permitir.
                </p>
              </div>
              <button
                onClick={() => setShowConfig(false)}
                aria-label="Cerrar"
                className="rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <PrefRow
                title="Cookies técnicas (necesarias)"
                desc="Imprescindibles para el funcionamiento del sitio. Siempre activas."
                checked
                disabled
              />
              <PrefRow
                title="Cookies de análisis"
                desc="Nos ayudan a entender cómo se usa la plataforma para mejorarla."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <PrefRow
                title="Cookies de terceros"
                desc="Servicios externos como pasarelas de pago o herramientas de análisis."
                checked={prefs.thirdParty}
                onChange={(v) => setPrefs((p) => ({ ...p, thirdParty: v }))}
              />
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => save({ necessary: true, analytics: false, thirdParty: false })}
                className="rounded-lg border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold text-ink hover:bg-muted"
              >
                Solo necesarias
              </button>
              <button
                onClick={() => save(prefs)}
                className="rounded-lg border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold text-ink hover:bg-muted"
              >
                Guardar selección
              </button>
              <button
                onClick={() => save("all")}
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-ink hover:brightness-95"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-border bg-card p-3">
      <div>
        <div className="text-sm font-bold text-ink">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[#F5B800] disabled:opacity-60"
      />
    </label>
  );
}
