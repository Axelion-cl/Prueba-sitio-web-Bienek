'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Pencil, Lock, Check, X } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

import { updateProfile, changePasswordWithVerification } from '@/services/auth';
import { useRouter } from 'next/navigation';

export function MiPerfil() {
    const { user, refreshUser } = useAuth(); // Assuming refreshUser exists or we just rely on page reload/auth context update
    const { t } = useLanguage();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        nombre: user?.name || '',
        email: user?.email || '',
        empresa: user?.company || '',
        telefono: user?.phone || ''
    });

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { success, error } = await updateProfile({
                full_name: formData.nombre,
                company: formData.empresa,
                phone: formData.telefono
            });

            if (success) {
                alert('Perfil actualizado correctamente');
                setIsEditing(false);
                if (refreshUser) await refreshUser();
            } else {
                alert('Error al actualizar perfil: ' + error);
            }
        } catch (err) {
            alert('Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwords.new !== passwords.confirm) {
            alert('Las nuevas contraseñas no coinciden');
            return;
        }

        if (passwords.new.length < 6) {
            alert('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        // Required: Current password for verification
        if (!passwords.current) {
            alert('Debes ingresar tu contraseña actual');
            setLoading(false);
            return;
        }

        if (!user?.email) {
            alert('Error: No se pudo identificar el usuario');
            setLoading(false);
            return;
        }

        const { success, error } = await changePasswordWithVerification(
            user.email,
            passwords.current,
            passwords.new
        );

        if (success) {
            alert('Contraseña actualizada correctamente');
            setShowPasswordForm(false);
            setPasswords({ current: '', new: '', confirm: '' });
        } else {
            alert(error || 'Error al cambiar contraseña');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{t.miCuenta.informacionPersonal}</h3>
                        <p className="text-sm text-gray-500">
                            {t.miCuenta.actualizaInfo}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.nombre}</label>
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.correoElectronico}</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.empresaLabel}</label>
                        <input
                            type="text"
                            value={formData.empresa}
                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.telefono}</label>
                        <input
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                <Check className="w-4 h-4" /> {t.miCuenta.guardarCambios}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                <X className="w-4 h-4" /> {t.miCuenta.cancelar}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Pencil className="w-4 h-4" /> {t.miCuenta.editarInfo}
                        </button>
                    )}
                </div>
            </div>

            {/* Password Section */}
            <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-lg text-gray-900">{t.miCuenta.cambiarContrasena}</h3>
                </div>

                {showPasswordForm ? (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.contrasenaActual}</label>
                            <input
                                type="password"
                                required
                                value={passwords.current}
                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Ingresa tu contraseña actual"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.nuevaContrasena}</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.confirmarContrasena}</label>
                            <input
                                type="password"
                                required
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Confirma tu nueva contraseña"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Actualizando...' : t.miCuenta.actualizarContrasena}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowPasswordForm(false);
                                    setPasswords({ current: '', new: '', confirm: '' });
                                }}
                                disabled={loading}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                {t.miCuenta.cancelar}
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="text-primary hover:underline text-sm"
                    >
                        {t.miCuenta.cambiarMiContrasena}
                    </button>
                )}
            </div>
        </div>
    );
}
