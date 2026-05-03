import type { Inspection } from "./mock-data";

export type WorkshopVehicleType = "Turismo" | "SUV" | "Furgoneta" | "Deportivo";

export const WORKSHOP_PRICES: Record<WorkshopVehicleType, number> = {
  Turismo: 150,
  SUV: 165,
  Furgoneta: 175,
  Deportivo: 180,
};

export function getWorkshopPayout(vehicleType: Inspection["vehicleType"]): number {
  return WORKSHOP_PRICES[vehicleType as WorkshopVehicleType] ?? WORKSHOP_PRICES.Turismo;
}

export function formatEur(n: number): string {
  return n.toFixed(2).replace(".", ",");
}