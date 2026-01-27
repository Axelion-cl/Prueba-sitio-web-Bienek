'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PasswordInput from '@/components/ui/PasswordInput';
import { Lock, Save, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function UpdatePasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(true); // Verification loading
    const [isSaving, setIsSaving] = useState(false);  // Saving loading
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check if user is authenticated (link worked)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                setUserEmail(session.user.email || '');
                setIsLoading(false);
            } else {
                // Wait a bit for auth state change (Magic Link processing)
                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                    if (session?.user) {
                        setUserEmail(session.user.email || '');
                        setIsLoading(false);
                    }
                });

                // Fallback timeout
                setTimeout(() => {
                    if (!userEmail) setIsLoading(false);
                }, 4000); // Give it enough time to process secure link

                return () => subscription.unsubscribe();
            }
        };

        checkSession();
    }, [userEmail]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            // Optional: Redirect after delay
            setTimeout(() => {
                router.push('/login');
            }, 3000);

        } catch (err: any) {
            setError(err.message || 'Error al actualizar contraseña');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Verificando enlace de seguridad...</p>
                </div>
            </div>
        );
    }

    if (!userEmail) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Enlace Inválido o Expirado</h2>
                    <p className="text-gray-600 mb-8">
                        No pudimos verificar tu solicitud. Es posible que el enlace haya expirado o ya haya sido utilizado.
                    </p>
                    <Link
                        href="/recuperar-password"
                        className="block w-full bg-black text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Solicitar nuevo enlace
                    </Link>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Contraseña Actualizada!</h2>
                    <p className="text-gray-600 mb-8">
                        Tu contraseña ha sido restablecida correctamente. Ahora puedes iniciar sesión con tus nuevas credenciales.
                    </p>
                    <Link
                        href="/login"
                        className="block w-full bg-primary hover:bg-primary/90 text-black font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Nueva Contraseña</h1>
                        <p className="text-gray-600 text-sm">
                            Estableciendo contraseña para: <span className="font-semibold text-gray-900">{userEmail}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                                Nueva Contraseña
                            </label>
                            <PasswordInput
                                id="new-password"
                                name="new-password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                required
                                minLength={6}
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Contraseña
                            </label>
                            <PasswordInput
                                id="confirm-password"
                                name="confirm-password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                required
                                placeholder="Repite la contraseña"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Actualizar Contraseña
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
