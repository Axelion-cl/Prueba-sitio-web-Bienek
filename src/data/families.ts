export interface Family {
    id: string;
    name: string;
}

export const families: Family[] = [
    // Higiene
    { id: "papeles", name: "Papeles Higiénicos" },
    { id: "jabones", name: "Jabones y Sanitizantes" },
    { id: "dispensadores", name: "Dispensadores" },

    // Industrial
    { id: "desengrasantes", name: "Desengrasantes Industriales" },
    { id: "epp", name: "Equipos de Protección (EPP)" },

    // Salud
    { id: "desinfectantes-hosp", name: "Desinfectantes Grado Hospitalario" },
    { id: "insumos-medicos", name: "Insumos Médicos Desechables" },

    // Cafeteria (Horeca)
    { id: "cafe", name: "Insumos de Cafetería" },
    { id: "vajilla", name: "Vajilla Desechable" },
];
