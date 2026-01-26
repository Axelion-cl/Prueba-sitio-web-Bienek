'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoggedIn, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        console.log('[AdminGuard] User state:', { isLoggedIn, isLoading, user, role: user?.role });

        if (!isLoggedIn) {
            router.push('/admin/login');
        }
        // Remove automatic redirect to allow showing Access Denied screen
    }, [isLoggedIn, isLoading, user, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-gray-500">Verificando acceso...</div>
            </div>
        );
    }

    // If logged in but not admin, show Access Denied with Logout
    if (isLoggedIn && user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-100">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h2>
                    <p className="text-gray-600 mb-6">
                        Estás conectado como <strong>{user?.email}</strong> ({user?.role}), pero esta área es exclusiva para administradores.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                logout();
                                // Logout redirects usually onAuthChange, but verify
                            }}
                            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Volver al Inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) return null; // Will redirect

    return <>{children}</>;
}
