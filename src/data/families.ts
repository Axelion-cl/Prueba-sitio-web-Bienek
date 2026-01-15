export interface Family {
    id: string;
    name: string;
    sectorId: string;
}

export const families: Family[] = [
    // Higiene
    { id: "papeles", name: "Papeles Higiénicos", sectorId: "higiene" },
    { id: "jabones", name: "Jabones y Sanitizantes", sectorId: "higiene" },
    { id: "dispensadores", name: "Dispensadores", sectorId: "higiene" },

    // Industrial
    { id: "desengrasantes", name: "Desengrasantes Industriales", sectorId: "industrial" },
    { id: "epp", name: "Equipos de Protección (EPP)", sectorId: "industrial" },

    // Salud
    { id: "desinfectantes-hosp", name: "Desinfectantes Grado Hospitalario", sectorId: "salud" },
    { id: "insumos-medicos", name: "Insumos Médicos Desechables", sectorId: "salud" },

    // Cafeteria (Horeca)
    { id: "cafe", name: "Insumos de Cafetería", sectorId: "horeca" },
    { id: "vajilla", name: "Vajilla Desechable", sectorId: "horeca" },
];

export function getFamiliesBySector(sectorId: string): Family[] {
    return families.filter(f => f.sectorId === sectorId);
}
