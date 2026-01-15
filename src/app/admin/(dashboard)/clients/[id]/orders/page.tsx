'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { mockOrders, mockClients, Order } from '@/data/mockCRM';

export default function ClientOrdersPage() {
    const router = useRouter();
    const params = useParams();
    const clientId = params?.id as string;

    const client = mockClients.find(c => c.id === clientId);
    const clientOrders = mockOrders
        .filter(o => o.clientId === clientId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!clientId) return <div className="p-6">Cargando...</div>;

    if (!client) {
        return (
            <div className="p-6 space-y-4">
                <div className="text-red-500">Cliente no encontrado (ID: {clientId})</div>
                <button onClick={() => router.back()} className="text-blue-500 hover:underline">Volver</button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Órdenes de {client.name}</h1>
                    <p className="text-gray-500">Historial de compras y estado.</p>
                </div>
            </div>

            <div className="space-y-4">
                {clientOrders.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500">
                        Este cliente no tiene órdenes registradas.
                    </div>
                ) : (
                    clientOrders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))
                )}
            </div>
        </div>
    );
}

function OrderCard({ order }: { order: Order }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    const statusLabels = {
        pending: 'Pendiente',
        processing: 'En Proceso',
        completed: 'Completado',
        cancelled: 'Cancelado'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all">
            <div
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <Package className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Orden #{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                    </span>
                    <div className="text-right">
                        <p className="font-bold text-gray-900">${order.total.toLocaleString('es-CL')}</p>
                        <p className="text-xs text-gray-500">{order.items.length} productos</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Detalle de Productos</h4>
                    <div className="space-y-3">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-200 text-xs font-medium text-gray-500">
                                        x{item.quantity}
                                    </span>
                                    <span className="text-gray-700">{item.productName}</span>
                                </div>
                                <span className="font-medium text-gray-900">
                                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                        <div className="text-right">
                            <span className="text-gray-500 text-sm mr-4">Total Orden:</span>
                            <span className="text-lg font-bold text-gray-900">${order.total.toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
