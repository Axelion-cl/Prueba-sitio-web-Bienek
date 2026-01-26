/**
 * User Types
 * Centralized type definitions for users and authentication
 * Replaces: import { MockUser, UserRole } from '@/data/mockUsers'
 */

export type UserRole = 'client' | 'admin';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    company?: string;
    phone?: string;
    mustChangePassword?: boolean;
}

// Profile data that can be updated by the user
export interface UserProfile {
    id: string;
    full_name: string;
    company?: string;
    phone?: string;
    role: UserRole;
    must_change_password: boolean;
    created_at: string;
    updated_at: string;
}

// Auth context user (subset without sensitive data)
export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}
