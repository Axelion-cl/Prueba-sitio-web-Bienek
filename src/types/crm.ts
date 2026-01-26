/**
 * CRM Types
 * Centralized type definitions for leads and clients
 * Replaces: import { Lead, Client } from '@/data/mockCRM'
 */

// Lead status states
export type LeadStatus = 'new' | 'contacted' | 'converted';

// Lead interface (matches Supabase schema)
export interface Lead {
    id: string;
    name: string;
    email: string;
    message?: string;
    phone?: string;
    company?: string;
    status: LeadStatus;
    date: string;
    converted_user_id?: string; // Set when converted to client
    created_at: string;
}

// Client status states
export type ClientStatus = 'active' | 'inactive';

// Client interface (user with profile data)
export interface Client {
    id: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    registration_date: string;
    status: ClientStatus;
    created_at: string;
}

// Lead status display helpers
export const leadStatusLabels: Record<LeadStatus, string> = {
    new: 'Nuevo',
    contacted: 'Contactado',
    converted: 'Convertido'
};

export const leadStatusColors: Record<LeadStatus, string> = {
    new: 'bg-yellow-100 text-yellow-800',
    contacted: 'bg-blue-100 text-blue-800',
    converted: 'bg-green-100 text-green-800'
};

// Client status display helpers
export const clientStatusLabels: Record<ClientStatus, string> = {
    active: 'Activo',
    inactive: 'Inactivo'
};

export const clientStatusColors: Record<ClientStatus, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800'
};
