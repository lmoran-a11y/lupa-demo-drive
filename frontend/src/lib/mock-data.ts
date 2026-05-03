export type InspectionStatus = "Pendiente" | "Asignada" | "En revisión" | "En proceso" | "Informe enviado" | "Completada";

export interface Inspection {
  id: string;
  client: string;
  email?: string;
  phone?: string;
  vehicle: string;
  plate: string;
  vehicleType: "Turismo" | "SUV" | "Deportivo" | "Furgoneta";
  workshop: string;
  date: string;
  time: string;
  location: string;
  status: InspectionStatus;
}

export const inspections: Inspection[] = [
  { id: "LUP-000129", client: "Carlos Martínez", email: "carlos@email.com", phone: "600 123 456", vehicle: "Seat León FR", plate: "9101 GHI", vehicleType: "Deportivo", workshop: "RTC Sport", date: "16/05/2024", time: "14:00", location: "Córdoba, Córdoba", status: "En revisión" },
  { id: "LUP-000128", client: "Laura Sánchez", email: "laura@email.com", phone: "611 234 567", vehicle: "BMW Serie 3", plate: "5678 DEF", vehicleType: "SUV", workshop: "MotorPlus", date: "16/05/2024", time: "12:30", location: "Sevilla", status: "Asignada" },
  { id: "LUP-000127", client: "Javier López", email: "javier@email.com", phone: "622 345 678", vehicle: "Audi A4", plate: "1234 ABC", vehicleType: "Turismo", workshop: "AutoCheck", date: "16/05/2024", time: "10:00", location: "Madrid", status: "Pendiente" },
  { id: "LUP-000126", client: "Miguel Ángel", email: "miguel@email.com", phone: "633 456 789", vehicle: "VW Golf", plate: "3344 MNO", vehicleType: "Furgoneta", workshop: "RTC Sport", date: "15/05/2024", time: "18:00", location: "Málaga", status: "Informe enviado" },
  { id: "LUP-000125", client: "Ana Belén", email: "ana@email.com", phone: "644 567 890", vehicle: "Ford Focus", plate: "7788 PQR", vehicleType: "Turismo", workshop: "MotorPlus", date: "15/05/2024", time: "16:30", location: "Valencia", status: "Asignada" },
];

export const workshopInspections: Inspection[] = [
  { id: "LUP-000127", client: "Javier López", vehicle: "Audi A4", plate: "1234 ABC", vehicleType: "Turismo", workshop: "RTC Sport", date: "16/05/2024", time: "14:00", location: "Córdoba", status: "Pendiente" },
  { id: "LUP-000128", client: "Laura Sánchez", vehicle: "BMW X3", plate: "5678 DEF", vehicleType: "SUV", workshop: "RTC Sport", date: "16/05/2024", time: "16:00", location: "Córdoba", status: "Pendiente" },
  { id: "LUP-000129", client: "Carlos Martínez", vehicle: "Seat León", plate: "9101 GHI", vehicleType: "Deportivo", workshop: "RTC Sport", date: "16/05/2024", time: "18:30", location: "Córdoba", status: "En proceso" },
  { id: "LUP-000130", client: "María Ruiz", vehicle: "Renault Clio", plate: "1122 JKL", vehicleType: "Turismo", workshop: "RTC Sport", date: "17/05/2024", time: "10:00", location: "Córdoba", status: "Pendiente" },
  { id: "LUP-000126", client: "Miguel Ángel", vehicle: "VW Caddy", plate: "3344 MNO", vehicleType: "Furgoneta", workshop: "RTC Sport", date: "15/05/2024", time: "12:00", location: "Córdoba", status: "Completada" },
];

export const vehicleTypes = [
  { id: "turismo", label: "Turismos" },
  { id: "deportivo", label: "Deportivos" },
  { id: "suv", label: "SUV / 4x4" },
  { id: "furgoneta", label: "Furgonetas" },
] as const;