export interface Badge {
    id: string;
    name: string;
    color: string; // e.g., 'bg-red-500' or hex
    lastEdited?: string;
}

export const badges: Badge[] = [
    { id: "promocion", name: "En Promoción", color: "bg-red-500", lastEdited: "2026-01-15" },
    { id: "mas-vendido", name: "Más Vendidos", color: "bg-yellow-500", lastEdited: "2026-01-10" },
    { id: "nuevo", name: "Nuevo", color: "bg-blue-500", lastEdited: "2026-01-16" },
    { id: "eco", name: "Ecológico", color: "bg-green-500", lastEdited: "2025-12-20" },
];
