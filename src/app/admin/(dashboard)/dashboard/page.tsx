import { supabase } from '@/lib/supabase';
import { Users, Package, FileText, UserPlus } from 'lucide-react';

export default async function AdminDashboardPage() {
    // Fetch counts from Supabase
    // Note: These queries run server-side without user session, so RLS must allow anonymous reading
    // We use separate queries to avoid issues with RLS policies

    let leadsCount = 0;
    let clientsCount = 0;
    let ordersCount = 0;
    let productsCount = 0;

    try {
        const [leads, clients, orders, products] = await Promise.all([
            supabase.from('leads').select('id', { count: 'exact', head: true }),
            supabase.from('user_profiles').select('id', { count: 'exact', head: true }).eq('role', 'client'),
            supabase.from('orders').select('id', { count: 'exact', head: true }).in('status', ['solicitud', 'activa']),
            supabase.from('products').select('id', { count: 'exact', head: true })
        ]);

        leadsCount = leads.count ?? 0;
        clientsCount = clients.count ?? 0;
        ordersCount = orders.count ?? 0;
        productsCount = products.count ?? 0;
    } catch (error) {
        console.error('Dashboard data fetch error:', error);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard General</h1>
                <div className="text-sm text-gray-500">
                    Bienvenido al panel de administración
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
                    value={ordersCount.toString()}
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
                        text="Panel de administración listo"
                        time="Ahora"
                        type="info"
                    />
                    <ActivityItem
                        text="Sistema de gestión de productos activo"
                        time="Ahora"
                        type="success"
                    />
                    <ActivityItem
                        text="Base de datos Supabase conectada"
                        time="Ahora"
                        type="success"
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
