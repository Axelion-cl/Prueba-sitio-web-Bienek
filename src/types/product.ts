/**
 * Product Types
 * Centralized type definitions for products across the application
 * Replaces: import { Product } from '@/data/mockProducts'
 */

export interface Product {
    id: string;
    name: string;
    brand: string;
    brandIds: string[];
    brandLogo: string;
    images: string[];
    description: string;
    specs: Record<string, string>;
    relatedProducts: string[];
    sectorIds: string[];
    familyIds: string[];
    sku: string;
    badges: string[];
}

// Cart item type for CartContext
export interface CartItem {
    product: Product;
    quantity: number;
}
