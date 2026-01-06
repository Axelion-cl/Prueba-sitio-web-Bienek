import { sectors } from "./sectors";

export interface Product {
    id: string;
    name: string;
    brand: string;
    brandLogo: string;
    image: string;
    sectorIds: string[]; // Products can belong to multiple sectors
    price: number;
    sku: string;
}

const brands = [
    { name: "3M", logo: "/assets/images/logos/3M.png" },
    { name: "Elite", logo: "/assets/images/logos/Elite.png" },
    { name: "Tork", logo: "/assets/images/logos/Tork-Logo.png" },
    { name: "Wypall", logo: "/assets/images/logos/Wypall.png" },
    { name: "Lysoform", logo: "/assets/images/logos/Lysoform.png" },
    { name: "Virginia", logo: "/assets/images/logos/Virginia.png" },
    { name: "Taski", logo: "/assets/images/logos/newTASKI-RGB-01-2.png" },
];

const productTypes = [
    "Detergente Industrial", "Desinfectante Concentrado", "Papel Higiénico Jumbo",
    "Toalla de Manos Interfoliada", "Jabón Líquido", "Cera Autobrillo",
    "Limpiador Multiuso", "Paños de Microfibra", "Mopa Húmeda",
    "Carro de Limpieza", "Guantes de Nitrilo", "Mascarilla Desechable"
];

// Generate deterministic mock products
export const products: Product[] = Array.from({ length: 120 }).map((_, i) => {
    const brand = brands[i % brands.length];
    const type = productTypes[i % productTypes.length];
    const sectorIndex = i % sectors.length;

    // Assign to a primary sector and occasionally a secondary one
    const sectorIds = [sectors[sectorIndex].id];
    if (i % 3 === 0) {
        sectorIds.push(sectors[(sectorIndex + 1) % sectors.length].id);
    }

    return {
        id: `PROD-${1000 + i}`,
        name: `${type} ${brand.name} ${100 + i}`, // e.g., "Detergente Industrial 3M 100"
        brand: brand.name,
        brandLogo: brand.logo,
        image: "/assets/images/solutions/limpieza-general.png", // Placeholder image
        sectorIds: sectorIds,
        price: 5000 + (i * 150),
        sku: `SKU-${50000 + i}`
    };
});

export function getProductsBySector(sectorId: string): Product[] {
    return products.filter(p => p.sectorIds.includes(sectorId));
}
