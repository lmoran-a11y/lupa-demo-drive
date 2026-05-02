export type VehicleType = "turismo" | "suv" | "furgoneta" | "deportivo" | "clasico";

export const VEHICLE_PRICES: Record<VehicleType, number> = {
  turismo: 180,
  suv: 200,
  furgoneta: 210,
  deportivo: 220,
  clasico: 190,
};

export const VEHICLE_LABELS: Record<VehicleType, string> = {
  turismo: "Turismo",
  suv: "SUV / 4x4",
  furgoneta: "Furgoneta",
  deportivo: "Deportivo",
  clasico: "Clásico",
};

export function getBasePrice(v: VehicleType | string | undefined): number {
  if (v && v in VEHICLE_PRICES) return VEHICLE_PRICES[v as VehicleType];
  return VEHICLE_PRICES.turismo;
}

export function formatEur(n: number): string {
  return n.toFixed(2).replace(".", ",");
}
