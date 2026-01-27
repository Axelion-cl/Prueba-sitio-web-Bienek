'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, AlertCircle, ShieldCheck } from 'lucide-react';
import PasswordInput from '@/components/ui/PasswordInput';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                router.push('/admin/dashboard');
            } else {
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Ocurrió un error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-primary p-6 text-center">
                    <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="text-2xl font-bold text-black">Bienek Intranet</h1>
                    <p className="text-black/70">Acceso Administrativo</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="admin-email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="admin@bienek.cl"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                                <PasswordInput
                                    id="admin-password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="******"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Verificando...' : 'Ingresar al Panel'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
