import { sectors } from "./sectors";
import { brands } from "./brands";
import { families } from "./families";
import { badges as badgeData } from "./badges";

export interface Product {
    id: string;
    name: string;
    brand: string;
    brandIds: string[]; // New: Multi-brand support
    brandLogo: string;
    images: string[];
    description: string;
    specs: Record<string, string>;
    relatedProducts: string[];
    sectorIds: string[];
    familyIds: string[]; // New: Multi-family support
    price: number;
    sku: string;
    badges: string[];
}

const productTypes = [
    "Detergente Industrial", "Desinfectante Concentrado", "Papel Higiénico Jumbo",
    "Toalla de Manos Interfoliada", "Jabón Líquido", "Cera Autobrillo",
    "Limpiador Multiuso", "Paños de Microfibra", "Mopa Húmeda",
    "Carro de Limpieza", "Guantes de Nitrilo", "Mascarilla Desechable"
];

const descriptions = [
    "Producto de alto rendimiento diseñado para entornos exigentes. Su fórmula avanzada garantiza una limpieza profunda y duradera, cumpliendo con los estándares más altos de higiene industrial.",
    "Solución especializada para el mantenimiento profesional. Ofrece una excelente relación costo-beneficio y es ideal para uso frecuente en oficinas, hospitales y centros educativos.",
    "Insumo esencial para la higiene diaria. Fabricado con materiales de primera calidad que aseguran resistencia y absorción superior, reduciendo el consumo y los residuos."
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

    // Assign random familyIds (1 or 2)
    const randomFamilyIndex = i % families.length;
    const familyIds = [families[randomFamilyIndex].id];
    if (i % 4 === 0) {
        familyIds.push(families[(randomFamilyIndex + 1) % families.length].id);
    }

    // Deterministic random-like values
    const hasDiscount = i % 5 === 0;
    const isBestSeller = i % 7 === 0;
    const isNew = i % 11 === 0;

    const currentBadges = [];
    if (hasDiscount) currentBadges.push(badgeData.find(b => b.id === 'promocion')?.name || 'En Promoción');
    if (isBestSeller) currentBadges.push(badgeData.find(b => b.id === 'mas-vendido')?.name || 'Más Vendidos');
    if (isNew) currentBadges.push(badgeData.find(b => b.id === 'nuevo')?.name || 'Nuevo');

    return {
        id: `PROD-${1000 + i}`,
        name: `${type} ${brand.name} ${100 + i}`, // e.g., "Detergente Industrial 3M 100"
        brand: brand.name,
        brandIds: [brand.name],
        brandLogo: brand.logo,
        images: [
            "/assets/images/solutions/limpieza-general.png", // Main image
            "/assets/images/solutions/industria.png",
            "/assets/images/solutions/salud.png",
            "/assets/images/solutions/oficinas.png"
        ],
        description: descriptions[i % descriptions.length],
        specs: {
            "Formato": "Envase 5L",
            "Presentación": "Caja 4 unidades",
            "Dilución": "1:20",
            "Certificación": "ISO 9001",
            "Origen": "Chile"
        },
        relatedProducts: [], // Populated below to avoid circular dependency issues during creation
        sectorIds: sectorIds,
        familyIds: familyIds,
        price: 5000 + (i * 150),
        sku: `SKU-${50000 + i}`,
        badges: currentBadges
    };
});

// Populate related products (referencing other IDs)
products.forEach((product, i) => {
    // Link to next 4 products as "related"
    product.relatedProducts = [
        products[(i + 1) % products.length].id,
        products[(i + 2) % products.length].id,
        products[(i + 3) % products.length].id,
        products[(i + 4) % products.length].id,
        products[(i + 5) % products.length].id,
        products[(i + 6) % products.length].id,
        products[(i + 7) % products.length].id,
        products[(i + 8) % products.length].id,
    ];
});

export function getProductsBySector(sectorId: string): Product[] {
    return products.filter(p => p.sectorIds.includes(sectorId));
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getRelatedProducts(ids: string[]): Product[] {
    return products.filter(p => ids.includes(p.id));
}
