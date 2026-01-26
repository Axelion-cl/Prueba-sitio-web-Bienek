'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn as authSignIn, signOut as authSignOut, getCurrentUser } from '@/services/auth';
import { UserRole } from '@/types/user';

// User type without password for security
export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    mustChangePassword?: boolean;
    company?: string;
    phone?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_STORAGE_KEY = 'bienek_auth_user';

export function AuthProvider({ children, storageKey = DEFAULT_STORAGE_KEY }: { children: ReactNode; storageKey?: string }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkSession = async () => {
        try {
            // first check localStorage for cached user (faster UX)
            // But skip this if we are explicitly refreshing (called from refreshUser) which we can infer or pass arg
            // For now, let's just do full verify in refreshUser, and careful check in mount

            // ... (keeping existing logic for mounting: check local then verify) ...
        } catch (error) {
            console.error('Session check error:', error);
        }
    };

    // Extracted logic to update state from a user object
    const updateUserState = (userData: AuthUser) => {
        setUser(userData);
        localStorage.setItem(storageKey, JSON.stringify(userData));
    };

    // Check for existing session on mount
    useEffect(() => {
        const initSession = async () => {
            try {
                // First check localStorage for cached user (faster UX)
                const stored = localStorage.getItem(storageKey);
                if (stored) {
                    try {
                        const cachedUser = JSON.parse(stored);
                        setUser(cachedUser);
                    } catch {
                        localStorage.removeItem(storageKey);
                    }
                }

                // Then verify with Supabase (source of truth)
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    const authUser: AuthUser = {
                        id: currentUser.id,
                        email: currentUser.email,
                        name: currentUser.name,
                        role: currentUser.role,
                        mustChangePassword: currentUser.mustChangePassword,
                        company: currentUser?.company,
                        phone: currentUser?.phone
                    };
                    updateUserState(authUser);
                } else {
                    // No valid session
                    setUser(null);
                    localStorage.removeItem(storageKey);
                }
            } catch (error) {
                console.error('Session check error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initSession();
    }, [storageKey]);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        const result = await authSignIn(email, password);

        if (!result.success || !result.user) {
            return { success: false, error: result.error || 'Error de autenticación' };
        }

        const authUser: AuthUser = {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role,
            mustChangePassword: result.user.mustChangePassword,
            company: result.user.company,
            phone: result.user.phone
        };

        updateUserState(authUser);

        return { success: true };
    };

    const logout = async () => {
        await authSignOut();
        setUser(null);
        localStorage.removeItem(storageKey);
    };

    const refreshUser = async () => {
        const currentUser = await getCurrentUser();
        if (currentUser) {
            const authUser: AuthUser = {
                id: currentUser.id,
                email: currentUser.email,
                name: currentUser.name,
                role: currentUser.role,
                mustChangePassword: currentUser.mustChangePassword,
                company: currentUser?.company,
                phone: currentUser?.phone
            };
            updateUserState(authUser);
        } else {
            // If session invalid, logout
            setUser(null);
            localStorage.removeItem(storageKey);
        }
    };

    // Show loading state
    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
