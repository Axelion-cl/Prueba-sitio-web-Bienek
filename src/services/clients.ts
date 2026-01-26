/**
 * Clients Service
 * Handles client/user profile operations for Admin CRM
 */

import { supabase } from '@/lib/supabase';
import { Client, Lead, LeadStatus } from '@/types/crm';

// ============================================
// LEADS MANAGEMENT
// ============================================

export async function getAllLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get leads error:', error);
        return [];
    }

    return (data || []) as Lead[];
}

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<{
    success: boolean;
    error?: string;
}> {
    const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function getLeadById(leadId: string): Promise<Lead | null> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

    if (error) {
        console.error('Get lead error:', error);
        return null;
    }

    return data as Lead;
}

// ============================================
// CLIENTS MANAGEMENT (from user_profiles)
// ============================================

export async function getAllClients(): Promise<Client[]> {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get clients error:', error);
        return [];
    }

    // Map user_profiles to Client type
    return (data || []).map(profile => ({
        id: profile.id,
        name: profile.full_name,
        email: '', // We'll need to join with auth.users or store email in profile
        company: profile.company || '',
        phone: profile.phone || '',
        registration_date: profile.created_at.split('T')[0],
        status: 'active' as const,
        created_at: profile.created_at
    }));
}

export async function getClientById(clientId: string): Promise<Client | null> {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', clientId)
        .single();

    if (error) {
        console.error('Get client error:', error);
        return null;
    }

    if (!data) return null;

    return {
        id: data.id,
        name: data.full_name,
        email: '',
        company: data.company || '',
        phone: data.phone || '',
        registration_date: data.created_at.split('T')[0],
        status: 'active',
        created_at: data.created_at
    };
}

export async function updateClientProfile(clientId: string, profileData: {
    full_name?: string;
    company?: string;
    phone?: string;
}): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
        .from('user_profiles')
        .update({ ...profileData, updated_at: new Date().toISOString() })
        .eq('id', clientId);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

// ============================================
// ADMIN USERS
// ============================================

export async function getAllAdmins(): Promise<Client[]> {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('role', 'admin')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get admins error:', error);
        return [];
    }

    return (data || []).map(profile => ({
        id: profile.id,
        name: profile.full_name,
        email: '',
        company: profile.company || '',
        phone: profile.phone || '',
        registration_date: profile.created_at.split('T')[0],
        status: 'active' as const,
        created_at: profile.created_at
    }));
}
