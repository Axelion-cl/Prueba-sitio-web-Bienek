
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

// Re-export type used in components
export type { Product };

/**
 * Fetch all products from Supabase
 * Replaces: import { products } from '@/data/mockProducts'
 */
export async function getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            product_sectors ( sector_id ),
            product_families ( family_id )
        `);

    if (error) {
        console.error('Error fetching all products:', error);
        return [];
    }

    return data.map(mapSupabaseToProduct);
}

/**
 * Fetch a single product by ID
 * Replaces: getProductById(id)
 */
export async function getProductById(id: string): Promise<Product | undefined> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            product_sectors ( sector_id ),
            product_families ( family_id )
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching product ${id}:`, error);
        return undefined;
    }

    // Explicitly fetch related products ids locally for now or better, via a stored procedure later
    // For now, we'll return an empty array for related OR fetch random ones like the mock did
    // The mock logic was: next 8 products. 
    // We can simulate "related" by same sector or random.

    const product = mapSupabaseToProduct(data);

    // Fetch real related based on same sector (simple similarity)
    if (product.sectorIds.length > 0) {
        const { data: relatedData } = await supabase
            .from('product_sectors')
            .select('product_id')
            .eq('sector_id', product.sectorIds[0])
            .neq('product_id', product.id)
            .limit(8);

        if (relatedData) {
            product.relatedProducts = relatedData.map(r => r.product_id);
        }
    }

    return product;
}

/**
 * Fetch products by Sector Slug or ID
 * Replaces: getProductsBySector(sectorId)
 */
export async function getProductsBySector(sectorId: string): Promise<Product[]> {
    // 1. Get product IDs for this sector
    const { data: relations, error: relError } = await supabase
        .from('product_sectors')
        .select('product_id')
        .eq('sector_id', sectorId);

    if (relError || !relations || relations.length === 0) return [];

    const productIds = relations.map(r => r.product_id);

    // 2. Fetch full product details
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            product_sectors ( sector_id ),
            product_families ( family_id )
        `)
        .in('id', productIds);

    if (error) {
        console.error(`Error fetching products for sector ${sectorId}:`, error);
        return [];
    }

    return data.map(mapSupabaseToProduct);
}

/**
 * Fetch related products by IDs
 * Replaces: getRelatedProducts(ids)
 */
export async function getRelatedProducts(ids: string[]): Promise<Product[]> {
    if (ids.length === 0) return [];

    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            product_sectors ( sector_id ),
            product_families ( family_id )
        `)
        .in('id', ids);

    if (error) {
        console.error('Error fetching related products:', error);
        return [];
    }

    return data.map(mapSupabaseToProduct);
}

/**
 * Search products by name (for SearchBar)
 * Returns lightweight product data for quick display
 */
export async function searchProducts(query: string, limit: number = 10): Promise<{
    id: string;
    name: string;
    brand: string;
    brandLogo: string;
    image: string;
    sectorId: string | null;
}[]> {
    if (!query || query.trim().length < 2) return [];

    const { data, error } = await supabase
        .from('products')
        .select(`
            id,
            name,
            brand,
            brand_logo,
            images,
            product_sectors ( sector_id )
        `)
        .ilike('name', `%${query}%`)
        .limit(limit);

    if (error) {
        console.error('Error searching products:', error);
        return [];
    }

    return data.map(row => ({
        id: row.id,
        name: row.name,
        brand: row.brand || '',
        brandLogo: row.brand_logo || '',
        image: row.images?.[0] || '/assets/images/solutions/limpieza-general.png',
        sectorId: row.product_sectors?.[0]?.sector_id || null
    }));
}


// --- Helper: Map DB Row to Frontend Type ---
function mapSupabaseToProduct(row: any): Product {
    return {
        id: row.id,
        name: row.name,
        brand: row.brand || '', // DB might be null, TS needs string
        brandIds: row.brand ? [row.brand] : [], // Backwards compat
        brandLogo: row.brand_logo || '',
        images: row.images || [],
        description: row.description || '',
        specs: row.specs || {},

        sku: row.sku || '',
        badges: row.badges || [],

        // Flatten nested joins
        sectorIds: row.product_sectors?.map((ps: any) => ps.sector_id) || [],
        familyIds: row.product_families?.map((pf: any) => pf.family_id) || [],

        // Default empty, filled by specific queries if needed
        relatedProducts: []
    };
}
