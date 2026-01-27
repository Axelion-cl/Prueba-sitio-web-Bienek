'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { requestPasswordReset } from '@/services/auth';

export default function RecoverPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await requestPasswordReset(email);
            if (result.success) {
                setSubmitted(true);
            } else {
                setError(result.error || 'Error al enviar solicitud');
            }
        } catch (err) {
            setError('Ocurrió un error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-in fade-in duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Correo Enviado!</h2>
                    <p className="text-gray-600 mb-8">
                        Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un correo con instrucciones para restablecer tu contraseña.
                    </p>
                    <div className="space-y-4">
                        <Link
                            href="/login"
                            className="block w-full bg-primary hover:bg-primary/90 text-black font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                            Volver al Inicio de Sesión
                        </Link>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-sm text-gray-500 hover:text-gray-900"
                        >
                            Intentar con otro correo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full">

                <Link href="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver al login
                </Link>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h1>
                        <p className="text-gray-600 text-sm">
                            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu acceso.
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
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="username"
                                    placeholder="tu@email.com"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Enviar Instrucciones
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
