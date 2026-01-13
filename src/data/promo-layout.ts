import { Product, products } from "./mockProducts";

// Block Types
export type PromoBlockType = 'grid' | 'banner';

// Grid Block Config
export interface GridBlockConfig {
    title: string;
    productIds: string[]; // IDs of products to show
}

// Banner Block Config
export interface BannerBlockConfig {
    title: string;
    description: string;
    image: string;
    backgroundColor: string;
    buttonText: string;
    buttonLink: string;
    orientation: 'left' | 'right'; // Image position
}

// Union Type for Block
export interface PromoBlock {
    type: PromoBlockType;
    config: GridBlockConfig | BannerBlockConfig;
}

// Helper to check block type
export function isGridBlock(block: PromoBlock): block is PromoBlock & { config: GridBlockConfig } {
    return block.type === 'grid';
}

export function isBannerBlock(block: PromoBlock): block is PromoBlock & { config: BannerBlockConfig } {
    return block.type === 'banner';
}

// Helper to get products by IDs
export function getProductsByIds(ids: string[]): Product[] {
    return ids.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
}

// ============================================
// PROMO BLOCKS CONFIGURATION (CMS-Ready)
// ============================================
export const promoBlocks: PromoBlock[] = [
    // Block 1: Grid de Ofertas (Products with "En Promoción" badge)
    {
        type: 'grid',
        config: {
            title: 'En Oferta',
            productIds: ['PROD-1000', 'PROD-1005', 'PROD-1010', 'PROD-1015', 'PROD-1020', 'PROD-1025', 'PROD-1030', 'PROD-1035']
        } as GridBlockConfig
    },

    // Block 2: Banner Destacado
    {
        type: 'banner',
        config: {
            title: 'Nueva Línea Profesional',
            description: 'Descubre nuestra exclusiva colección de productos certificados para el sector hospitalario. Mayor eficacia, mayor seguridad.',
            image: '/assets/images/blog-placeholder.png',
            backgroundColor: '#1a365d',
            buttonText: 'Conocer Más',
            buttonLink: '/soluciones/salud',
            orientation: 'right'
        } as BannerBlockConfig
    },

    // Block 3: Grid de Más Vendidos (Products with "Más Vendidos" badge)
    {
        type: 'grid',
        config: {
            title: 'Más Vendidos',
            productIds: ['PROD-1007', 'PROD-1014', 'PROD-1021', 'PROD-1028', 'PROD-1035', 'PROD-1042', 'PROD-1049', 'PROD-1056']
        } as GridBlockConfig
    }
];
