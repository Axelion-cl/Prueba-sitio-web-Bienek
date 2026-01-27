'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { changePasswordWithVerification } from '@/services/auth';
import PasswordInput from '@/components/ui/PasswordInput';
import { Lock, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PasswordResetGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoggedIn, isLoading, logout } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Only block if logged in, data loaded, and flag is true
    const shouldBlock = !isLoading && isLoggedIn && user?.mustChangePassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Las nuevas contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsSubmitting(true);

        try {
            if (!user?.email) throw new Error('No user email');

            const result = await changePasswordWithVerification(
                user.email,
                currentPassword,
                newPassword
            );

            if (result.success) {
                setSuccess(true);
                // Wait a bit to show success message then reload to clear guard (auth state update handled by service but context needs refresh)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setError(result.error || 'Error al actualizar contraseña');
            }
        } catch (err) {
            setError('Ocurrió un error inesperado');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (shouldBlock && !success) {
        return (
            <div className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
                    {/* Security decorative strip */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Seguridad de Cuenta</h2>
                        <p className="text-gray-600 mt-2 text-sm">
                            Por seguridad, detectamos que estás usando una contraseña temporal. Debes cambiarla para continuar.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="guard-current-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña Actual (Temporal)
                            </label>
                            <PasswordInput
                                id="guard-current-password"
                                name="current-password"
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="guard-new-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Nueva Contraseña
                            </label>
                            <PasswordInput
                                id="guard-new-password"
                                name="new-password"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                                required
                                placeholder="Nueva contraseña segura"
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label htmlFor="guard-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Nueva Contraseña
                            </label>
                            <PasswordInput
                                id="guard-confirm-password"
                                name="confirm-password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                                required
                                placeholder="Repite la nueva contraseña"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {isSubmitting ? 'Actualizando...' : 'Establecer Nueva Contraseña'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 hover:text-gray-800 flex items-center justify-center gap-2 mx-auto transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Cerrar sesión e intentar más tarde
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">¡Contraseña Actualizada!</h2>
                    <p className="text-gray-600 mb-4">
                        Has asegurado tu cuenta correctamente. Redirigiendo...
                    </p>
                </div>
            </div>
        );
    }

    // Not blocked
    return <>{children}</>;
}
