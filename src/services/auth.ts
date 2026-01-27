/**
 * Auth Service
 * Handles all authentication operations with Supabase Auth
 */

import { supabase } from '@/lib/supabase';
import { UserProfile, UserRole } from '@/types/user';

// ============================================
// LOGIN / LOGOUT
// ============================================

export async function signIn(email: string, password: string): Promise<{
    success: boolean;
    user?: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
        mustChangePassword: boolean;
        company?: string;
        phone?: string;
    };
    error?: string;
}> {
    try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            console.error('[Auth] Sign in error:', authError);
            return { success: false, error: authError.message };
        }

        if (!authData.user) {
            return { success: false, error: 'No se pudo obtener información del usuario' };
        }

        console.log('[Auth] User authenticated, ID:', authData.user.id);

        // Get user profile
        const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        console.log('[Auth] Profile fetch result:', { profile, profileError });

        if (profileError || !profile) {
            console.warn('[Auth] No profile found, creating default client profile');
            // If no profile exists, create a basic one
            const newProfile = {
                id: authData.user.id,
                full_name: authData.user.email?.split('@')[0] || 'Usuario',
                role: 'client' as UserRole,
                must_change_password: false
            };

            await supabase.from('user_profiles').insert(newProfile);

            return {
                success: true,
                user: {
                    id: authData.user.id,
                    email: authData.user.email || '',
                    name: newProfile.full_name,
                    role: newProfile.role,
                    mustChangePassword: false,
                    company: '',
                    phone: ''
                }
            };
        }

        console.log('[Auth] Profile loaded, role:', profile.role);

        return {
            success: true,
            user: {
                id: authData.user.id,
                email: authData.user.email || '',
                name: profile.full_name,
                role: profile.role as UserRole,
                mustChangePassword: profile.must_change_password || false,
                company: profile.company || '',
                phone: profile.phone || ''
            }
        };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: 'Error de conexión' };
    }
}

export async function signOut(): Promise<void> {
    await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<{
    id: string;
    email: string;
    name: string;
    role: UserRole;
    mustChangePassword: boolean;
    company?: string;
    phone?: string;
} | null> {
    // Check local session first to avoid unnecessary calls if no session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const user = session.user;

    const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) return null;

    return {
        id: user.id,
        email: user.email || '',
        name: profile.full_name,
        role: profile.role as UserRole,
        mustChangePassword: profile.must_change_password || false,
        company: profile.company || '',
        phone: profile.phone || ''
    };
}

// ============================================
// PASSWORD MANAGEMENT
// ============================================

export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Determine URL based on environment or window
        const siteUrl = typeof window !== 'undefined'
            ? window.location.origin
            : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${siteUrl}/actualizar-password`,
        });

        if (error) throw error;

        return { success: true };
    } catch (error: any) {
        console.error('Password reset request error:', error);
        return { success: false, error: error.message };
    }
}

export async function changePasswordWithVerification(
    email: string,
    currentPassword: string,
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    try {
        // 1. Verify current password by signing in (re-authentication)
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password: currentPassword
        });

        if (signInError) {
            console.warn('Current password verification failed:', signInError);
            return { success: false, error: 'La contraseña actual es incorrecta' };
        }

        // 2. Update password
        const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (updateError) {
            return { success: false, error: updateError.message };
        }

        // 3. Clear must_change_password flag
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase
                .from('user_profiles')
                .update({ must_change_password: false, updated_at: new Date().toISOString() })
                .eq('id', user.id);
        }

        return { success: true };
    } catch (error) {
        console.error('Change password error:', error);
        return { success: false, error: 'Error al cambiar contraseña' };
    }
}

// ============================================
// PROFILE MANAGEMENT
// ============================================

export async function updateProfile(data: {
    full_name?: string;
    company?: string;
    phone?: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { success: false, error: 'Usuario no autenticado' };
        }

        const { error } = await supabase
            .from('user_profiles')
            .update({ ...data, updated_at: new Date().toISOString() })
            .eq('id', user.id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: 'Error al actualizar perfil' };
    }
}

export async function getUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return profile as UserProfile | null;
}

// ============================================
// ADMIN: LEAD TO CLIENT CONVERSION
// ============================================

function generateTemporaryPassword(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

export async function convertLeadToClient(leadId: string, leadEmail: string, leadName: string, leadCompany?: string, leadPhone?: string): Promise<{
    success: boolean;
    tempPassword?: string;
    userId?: string;
    error?: string;
}> {
    try {
        const tempPassword = generateTemporaryPassword();

        // Note: Creating users requires service_role key or admin API
        // In a static export context, this needs to be done via a PHP bridge or Edge Function
        // For now, we'll prepare the data structure for the backend to handle

        // This would typically be called from a server action or API route
        // For static export, we'll need to call a PHP endpoint

        return {
            success: false,
            error: 'Esta función requiere configuración del backend. Use el panel de Supabase para crear usuarios manualmente.'
        };

    } catch (error) {
        console.error('Convert lead error:', error);
        return { success: false, error: 'Error al convertir lead' };
    }
}

// ============================================
// ADMIN: RESET CLIENT PASSWORD
// ============================================

export async function sendPasswordResetEmail(email: string): Promise<{
    success: boolean;
    error?: string;
}> {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Reset password error:', error);
        return { success: false, error: 'Error al enviar correo de recuperación' };
    }
}
