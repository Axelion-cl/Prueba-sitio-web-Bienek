/**
 * Admin Products Service
 * Client-side Supabase operations for product CRUD
 * Replaces: src/app/actions/products.ts
 */

import { supabase } from '@/lib/supabase';

export interface ProductInput {
    id?: string;
    name: string;
    brand: string;
    brand_logo?: string;
    description?: string;
    sku?: string;
    images?: string[];
    specs?: Record<string, string>;
    badges?: string[];
    sectorIds?: string[];
    familyIds?: string[];
}

export async function createProduct(data: ProductInput) {
    const { sectorIds, familyIds, ...productData } = data;
    const productId = data.id || `PROD-${Date.now()}`;

    const { data: product, error } = await supabase
        .from('products')
        .insert({ ...productData, id: productId })
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        return { success: false, error: error.message };
    }

    // Insert sector relations
    if (sectorIds && sectorIds.length > 0) {
        await supabase.from('product_sectors').insert(
            sectorIds.map(sid => ({ product_id: productId, sector_id: sid }))
        );
    }

    // Insert family relations
    if (familyIds && familyIds.length > 0) {
        await supabase.from('product_families').insert(
            familyIds.map(fid => ({ product_id: productId, family_id: fid }))
        );
    }

    return { success: true, data: product };
}

export async function updateProduct(id: string, data: ProductInput) {
    const { sectorIds, familyIds, ...productData } = data;

    const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);

    if (error) {
        console.error('Error updating product:', error);
        return { success: false, error: error.message };
    }

    // Update sector relations
    if (sectorIds) {
        await supabase.from('product_sectors').delete().eq('product_id', id);
        if (sectorIds.length > 0) {
            await supabase.from('product_sectors').insert(
                sectorIds.map(sid => ({ product_id: id, sector_id: sid }))
            );
        }
    }

    // Update family relations
    if (familyIds) {
        await supabase.from('product_families').delete().eq('product_id', id);
        if (familyIds.length > 0) {
            await supabase.from('product_families').insert(
                familyIds.map(fid => ({ product_id: id, family_id: fid }))
            );
        }
    }

    return { success: true };
}

export async function deleteProduct(id: string) {
    // Delete relations first
    await supabase.from('product_sectors').delete().eq('product_id', id);
    await supabase.from('product_families').delete().eq('product_id', id);

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function uploadProductImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(fileName, file, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            return { success: false, error: uploadError.message };
        }

        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error('Upload Error:', error);
        return { success: false, error: error.message };
    }
}
