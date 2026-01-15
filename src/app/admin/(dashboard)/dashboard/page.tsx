'use client';

import { useAuth } from '@/context/AuthContext';
import { Users, Package, FileText, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
    const { user } = useAuth();

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
                    title="Clientes Totales"
                    value="45"
                    change="+12%"
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Productos"
                    value="120"
                    change="+3"
                    icon={Package}
                    color="green"
                />
                <StatCard
                    title="Cotizaciones"
                    value="8"
                    change="Pendientes"
                    icon={FileText}
                    color="yellow"
                />
                <StatCard
                    title="Ventas del Mes"
                    value="$4.2M"
                    change="+8.5%"
                    icon={TrendingUp}
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
                <p className="text-xs text-green-600 font-medium mt-1">{change}</p>
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
