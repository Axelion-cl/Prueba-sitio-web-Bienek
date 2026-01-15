export interface Badge {
    id: string;
    name: string;
    color: string; // e.g., 'bg-red-500' or hex
}

export const badges: Badge[] = [
    { id: "promocion", name: "En Promoción", color: "bg-red-500" },
    { id: "mas-vendido", name: "Más Vendidos", color: "bg-yellow-500" },
    { id: "nuevo", name: "Nuevo", color: "bg-blue-500" },
    { id: "eco", name: "Ecológico", color: "bg-green-500" },
];
