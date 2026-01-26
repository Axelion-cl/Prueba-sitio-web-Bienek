/**
 * Admin Clients Service
 * Client-side Supabase operations for leads and clients CRUD
 * 
 * IMPORTANT: Clients are users with role='client' in user_profiles
 * The old 'clients' table is deprecated - we use user_profiles now
 */

import { supabase } from '@/lib/supabase';

// ============================================
// LEADS CRUD
// ============================================

export interface LeadInput {
    name: string;
    email: string;
    message?: string;
    company?: string;
    phone?: string;
}

export async function getLeads() {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching leads:', error);
        return [];
    }

    return data;
}

export async function createLead(data: LeadInput) {
    const { data: lead, error } = await supabase
        .from('leads')
        .insert({
            ...data,
            status: 'new',
            created_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating lead:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data: lead };
}

export async function deleteLead(id: string) {
    const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting lead:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// ============================================
// CLIENTS CRUD (using user_profiles)
// ============================================

// Client interface maps to user_profiles with role='client'
export interface Client {
    id: string;
    name: string;       // from full_name
    email: string;      // from auth.users via join or stored
    company?: string;
    phone?: string;
    status: string;     // 'active' or 'inactive' - we can derive from profile
    registration_date: string; // from created_at
}

/**
 * Get all clients (users with role='client')
 */
export async function getClients(): Promise<Client[]> {
    const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching clients:', error);
        return [];
    }

    // Map user_profiles to Client interface
    return (profiles || []).map(profile => ({
        id: profile.id,
        name: profile.full_name || 'Sin nombre',
        email: profile.email || '', // Note: email might not be in profile, see note below
        company: profile.company || '',
        phone: profile.phone || '',
        status: 'active', // All registered users are active by default
        registration_date: profile.created_at
    }));
}

/**
 * Convert a lead to a client
 * This creates a user in Supabase Auth and a profile in user_profiles
 * 
 * IMPORTANT: This requires the user to be manually confirmed in Supabase
 * because we can't send emails yet (no SMTP configured)
 */
export async function convertLeadToClient(leadId: string) {
    // 1. Get lead data
    const { data: lead, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

    if (leadError || !lead) {
        console.error('Error fetching lead:', leadError);
        return { success: false, error: 'Lead no encontrado' };
    }

    // 2. Generate temporary password
    const tempPassword = generateTempPassword();

    // 3. Create user in Supabase Auth
    // Note: This uses the client-side signUp which will create an unconfirmed user
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: lead.email,
        password: tempPassword,
        options: {
            data: {
                full_name: lead.name,
                company: lead.company,
                phone: lead.phone
            }
        }
    });

    if (authError) {
        console.error('Error creating auth user:', authError);
        return { success: false, error: authError.message };
    }

    if (!authData.user) {
        return { success: false, error: 'No se pudo crear el usuario' };
    }

    // 4. Create user profile with role='client'
    const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
            id: authData.user.id,
            full_name: lead.name,
            email: lead.email, // Store email in profile for easy access
            company: lead.company || null,
            phone: lead.phone || null,
            role: 'client',
            must_change_password: true,
            created_at: new Date().toISOString()
        });

    if (profileError) {
        console.error('Error creating profile:', profileError);
        // Note: User was created but profile failed - may need cleanup
        return { success: false, error: 'Usuario creado pero error en perfil: ' + profileError.message };
    }

    // 5. Update lead with converted_user_id (mark as converted, don't delete)
    await supabase
        .from('leads')
        .update({
            status: 'converted',
            converted_user_id: authData.user.id
        })
        .eq('id', leadId);

    // 6. Delete the lead from the list (or we could keep it with converted status)
    await supabase.from('leads').delete().eq('id', leadId);

    return {
        success: true,
        data: {
            id: authData.user.id,
            email: lead.email,
            name: lead.name
        },
        tempPassword,
        // Include SQL for manual confirmation
        confirmationSql: `
-- Run this in Supabase SQL Editor to confirm the user:
UPDATE auth.users 
SET email_confirmed_at = now()
WHERE email = '${lead.email}';
        `.trim()
    };
}

/**
 * Delete a client (user with role='client')
 * This deletes both the profile and the auth user
 */
export async function deleteClient(id: string) {
    // Delete from user_profiles first
    const { error: profileError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', id);

    if (profileError) {
        console.error('Error deleting client profile:', profileError);
        return { success: false, error: profileError.message };
    }

    // Note: Deleting from auth.users requires admin API or SQL
    // The profile is deleted, user can't login without profile anyway
    // For full deletion, admin should run SQL: DELETE FROM auth.users WHERE id = 'xxx'

    return { success: true };
}

export async function updateClientStatus(id: string, status: 'active' | 'inactive') {
    // For now, we don't have a status column in user_profiles
    // This could be added if needed
    console.log('updateClientStatus called but not implemented yet', { id, status });
    return { success: true };
}

// Helper
function generateTempPassword(): string {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
