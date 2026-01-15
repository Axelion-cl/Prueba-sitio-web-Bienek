'use client';

import { useAuth } from '@/context/AuthContext';
import { Users, Package, FileText, UserPlus } from 'lucide-react';
import { mockLeads, mockClients, mockOrders } from '@/data/mockCRM';
import { products } from '@/data/mockProducts';

export default function AdminDashboardPage() {
    const { user } = useAuth();

    // Calculate metrics
    const leadsCount = mockLeads.length;
    const clientsCount = mockClients.length;
    const activeOrdersCount = mockOrders.filter(o => o.status === 'pending' || o.status === 'processing').length;
    const productsCount = products.length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard General</h1>
                <div className="text-sm text-gray-500">
                    Bienvenido, <span className="font-semibold text-gray-900">{user?.name}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Leads"
                    value={leadsCount.toString()}
                    change="Potenciales"
                    icon={UserPlus}
                    color="blue"
                />
                <StatCard
                    title="Clientes Actuales"
                    value={clientsCount.toString()}
                    change="Registrados"
                    icon={Users}
                    color="green"
                />
                <StatCard
                    title="Órdenes Activas"
                    value={activeOrdersCount.toString()}
                    change="En proceso"
                    icon={FileText}
                    color="yellow"
                />
                <StatCard
                    title="Productos Agregados"
                    value={productsCount.toString()}
                    change="En catálogo"
                    icon={Package}
                    color="purple"
                />
            </div>

            {/* Recent Activity Section (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-lg text-gray-800 mb-4">Actividad Reciente</h2>
                <div className="space-y-4">
                    <ActivityItem
                        text="Juan Pérez solicitó una cotización"
                        time="Hace 2 horas"
                        type="quote"
                    />
                    <ActivityItem
                        text="Nuevo cliente registrado: Empresa XYZ"
                        time="Hace 5 horas"
                        type="user"
                    />
                    <ActivityItem
                        text="Stock bajo: Detergente Industrial 20L"
                        time="Ayer"
                        type="alert"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
    const colorClasses: any = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                <p className="text-xs text-gray-600 font-medium mt-1">{change}</p>
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}

function ActivityItem({ text, time, type }: any) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-gray-700 text-sm">{text}</p>
            </div>
            <span className="text-xs text-gray-400">{time}</span>
        </div>
    );
}
