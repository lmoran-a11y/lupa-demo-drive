import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react"; // Añadimos hooks
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { StepProgress } from "../components/StepProgress";
import { z } from "zod";
import { VEHICLE_LABELS, type VehicleType } from "../lib/pricing";

// --- HELPERS PARA MONGODB ---
const generateLupID = () => `LUP-${Math.floor(1000 + Math.random() * 9000)}`;

// 1. Definimos el esquema de validación (Zod)
const schema = z.object({
  dgt: z.boolean().catch(false),
  day: z.number().catch(16),
  hour: z.string().catch("14:00"),
  location: z.string().catch("Lucena, Córdoba"),
  total: z.string().catch("180,00"),
  vehicle: z.enum(["turismo", "suv", "furgoneta", "deportivo"]).catch("turismo"),
  plate: z.string().catch(""),
});

// 2. Ahora la ruta ya encuentra el nombre "schema"
export const Route = createFileRoute()({
  validateSearch: (search) => schema.parse(search), // Aquí es donde lo usa
  head: () => ({ meta: [{ title: "Reserva confirmada — LUPAUTO" }] }),
  component: Confirmacion,
});


function Confirmacion() {
  const { dgt, day, hour, location, total, vehicle, plate } = Route.useSearch();
  const [lupId, setLupId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(true);

  useEffect(() => {
    const saveReserva = async () => {
      const newId = generateLupID();
      setLupId(newId);

      try {
        // Guardamos en tu servidor de Node (9001) -> MongoDB
        const res = await fetch("http://localhost:9001/api/reservas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lupId: newId,
            vehicle,
            plate,
            location,
            date: `2024-05-${day}`,
            hour,
            total,
            dgt,
            status: "pagado"
          }),
        });

        if (res.ok) {
          console.log("Reserva vinculada en MongoDB");
          // Aquí tu backend de Node debería disparar el email al cliente automáticamente
        }
      } catch (err) {
        console.error("Error al guardar en MongoDB:", err);
      } finally {
        setIsSaving(false);
      }
    };

    saveReserva();
  }, []); // Solo se ejecuta una vez al montar

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StepProgress current={4} />
      <main className="mx-auto max-w-3xl space-y-5 px-6 pb-16">
        
        {/* ID DE SEGUIMIENTO - LA PIEZA CLAVE */}
        <div className="rounded-2xl border-2 border-dashed border-brand bg-brand/5 p-6 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">ID de tu inspección</div>
          <div className="mt-1 text-4xl font-black text-ink">
            {isSaving ? "GENERANDO..." : lupId}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Guarda este código. Lo necesitarás para consultar tu informe <br/> 
            <b>sin necesidad de cuenta ni contraseña.</b>
          </p>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-success/30 bg-success/10 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white">✓</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">¡Tu cita está confirmada!</h1>
            <p className="text-sm text-muted-foreground">Te hemos enviado los detalles y el ID a tu email.</p>
          </div>
          <div className="rounded-lg border border-success/40 bg-white px-4 py-2 text-right">
            <div className="text-xs text-muted-foreground">Pago realizado</div>
            <div className="text-lg font-extrabold text-success">{total} €</div>
          </div>
        </div>

        {/* ... Resto del componente de UI (Taller, Botones WhatsApp, etc) igual ... */}
        
      </main>
      <SiteFooter />
    </div>
  );
}