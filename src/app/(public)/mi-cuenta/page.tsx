'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { ShoppingCart, FileText, User } from 'lucide-react';
import { MisProductos } from '@/components/cuenta/MisProductos';
import { MisOrdenes } from '@/components/cuenta/MisOrdenes';
import { MiPerfil } from '@/components/cuenta/MiPerfil';

type TabType = 'productos' | 'ordenes' | 'perfil';

export default function MiCuentaPage() {
    const { user, isLoggedIn } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('productos');

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn || !user) {
        return null;
    }

    const tabs = [
        { id: 'productos' as TabType, label: t.miCuenta.misProductos, icon: ShoppingCart },
        { id: 'ordenes' as TabType, label: t.miCuenta.misOrdenes, icon: FileText },
        { id: 'perfil' as TabType, label: t.miCuenta.miPerfil, icon: User },
    ];

    return (
        <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-outfit text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
                        {t.miCuenta.titulo}
                    </h1>
                    <p className="text-gray-600 mt-2 pl-5">
                        {t.miCuenta.bienvenido} {user.name}.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${isActive
                                    ? 'bg-primary text-black border-primary'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="font-semibold text-xl text-gray-900 mb-2">
                        {tabs.find(t => t.id === activeTab)?.label}:
                    </h2>

                    {activeTab === 'productos' && <MisProductos />}
                    {activeTab === 'ordenes' && <MisOrdenes />}
                    {activeTab === 'perfil' && <MiPerfil />}
                </div>
            </div>
        </div>
    );
}
