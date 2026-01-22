/**
 * Admin Tags Service
 * Client-side Supabase operations for sectors, families, brands, badges CRUD
 * Replaces: src/app/actions/tags.ts
 */

import { supabase } from '@/lib/supabase';

// ============================================
// SECTORS CRUD
// ============================================

export interface SectorInput {
    id?: string;
    slug: string;
    title: string;
    description?: string;
    full_description?: string;
    icon?: string;
    image?: string;
    featured_families?: string[];
}

export async function createSector(data: SectorInput) {
    const sectorId = data.id || data.slug;

    const { data: sector, error } = await supabase
        .from('sectors')
        .insert({ ...data, id: sectorId })
        .select()
        .single();

    if (error) {
        console.error('Error creating sector:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data: sector };
}

export async function updateSector(id: string, data: Partial<SectorInput>) {
    const { error } = await supabase
        .from('sectors')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error('Error updating sector:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function deleteSector(id: string) {
    const { error } = await supabase
        .from('sectors')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting sector:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// ============================================
// FAMILIES CRUD
// ============================================

export interface FamilyInput {
    id?: string;
    name: string;
}

export async function createFamily(data: FamilyInput) {
    const familyId = data.id || data.name.toLowerCase().replace(/\s+/g, '-');

    const { data: family, error } = await supabase
        .from('families')
        .insert({ ...data, id: familyId })
        .select()
        .single();

    if (error) {
        console.error('Error creating family:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data: family };
}

export async function updateFamily(id: string, data: Partial<FamilyInput>) {
    const { error } = await supabase
        .from('families')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error('Error updating family:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function deleteFamily(id: string) {
    const { error } = await supabase
        .from('families')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting family:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// ============================================
// BRANDS CRUD
// ============================================

export interface BrandInput {
    id?: string;
    name: string;
    logo?: string;
}

export async function createBrand(data: BrandInput) {
    const brandId = data.id || data.name.toLowerCase().replace(/\s+/g, '-');

    const { data: brand, error } = await supabase
        .from('brands')
        .insert({ ...data, id: brandId })
        .select()
        .single();

    if (error) {
        console.error('Error creating brand:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data: brand };
}

export async function updateBrand(id: string, data: Partial<BrandInput>) {
    const { error } = await supabase
        .from('brands')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error('Error updating brand:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function deleteBrand(id: string) {
    const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting brand:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// ============================================
// BADGES CRUD
// ============================================

export interface BadgeInput {
    id?: string;
    name: string;
    color?: string;
}

export async function createBadge(data: BadgeInput) {
    const badgeId = data.id || data.name.toLowerCase().replace(/\s+/g, '-');

    const { data: badge, error } = await supabase
        .from('badges')
        .insert({ ...data, id: badgeId, last_edited: new Date().toISOString() })
        .select()
        .single();

    if (error) {
        console.error('Error creating badge:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data: badge };
}

export async function updateBadge(id: string, data: Partial<BadgeInput>) {
    const { error } = await supabase
        .from('badges')
        .update({ ...data, last_edited: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        console.error('Error updating badge:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function deleteBadge(id: string) {
    const { error } = await supabase
        .from('badges')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting badge:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
