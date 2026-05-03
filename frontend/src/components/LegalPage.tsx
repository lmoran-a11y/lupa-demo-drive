import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Link } from "@tanstack/react-router";

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalSection[];
}

interface LegalPageProps {
  title: string;
  intro?: string;
  sections: LegalSection[];
  updatedAt?: string;
}

const RELATED = [
  { to: "/legal/aviso-legal", label: "Aviso legal" },
  { to: "/legal/terminos", label: "Términos y condiciones" },
  { to: "/legal/privacidad", label: "Política de privacidad" },
  { to: "/legal/cookies", label: "Política de cookies" },
] as const;

function renderSection(s: LegalSection, idx: number, depth = 0) {
  const HeadingTag = (depth === 0 ? "h2" : "h3") as "h2" | "h3";
  const headingClass =
    depth === 0
      ? "mt-8 text-xl font-bold text-ink"
      : "mt-5 text-base font-bold text-ink";
  return (
    <section key={idx}>
      <HeadingTag className={headingClass}>{s.title}</HeadingTag>
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
      {s.bullets && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          {s.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {s.subsections?.map((sub, i) => renderSection(sub, i, depth + 1))}
    </section>
  );
}

export function LegalPage({ title, intro, sections, updatedAt }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="text-xs font-bold uppercase tracking-widest text-brand">
          Información legal
        </div>
        <h1 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">{title}</h1>
        {updatedAt && (
          <p className="mt-2 text-xs text-muted-foreground">Última actualización: {updatedAt}</p>
        )}
        {intro && (
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{intro}</p>
        )}

        <div className="mt-2">{sections.map((s, i) => renderSection(s, i))}</div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-brand">
            Otros documentos
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {RELATED.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-ink hover:bg-muted"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
