'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { getOrdersByClient } from '@/services/orders';
import { getClientById } from '@/services/clients';
import { OrderWithItems, getOrderStatusLabel, getOrderStatusColor, OrderStatus, orderStatusLabels } from '@/types/order';
import { Client } from '@/types/crm';
import { useAuth } from '@/context/AuthContext';
import { updateOrderStatus } from '@/services/orders';

export default function ClientOrdersView({ clientId }: { clientId: string }) {
    const router = useRouter();
    const { user } = useAuth();
    const [client, setClient] = useState<Client | null>(null);
    const [orders, setOrders] = useState<OrderWithItems[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [clientData, ordersData] = await Promise.all([
                getClientById(clientId),
                getOrdersByClient(clientId)
            ]);
            setClient(clientData);
            setOrders(ordersData);
            setIsLoading(false);
        };

        fetchData();
    }, [clientId]);

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="p-6 space-y-4">
                <div className="text-red-500">Cliente no encontrado (ID: {clientId})</div>
                <button onClick={() => router.back()} className="text-blue-500 hover:underline">Volver</button>
            </div>
        );
    }

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        if (!user) return;

        const result = await updateOrderStatus(orderId, newStatus, user.id);
        if (result.success) {
            // Refresh orders
            const updatedOrders = await getOrdersByClient(clientId);
            setOrders(updatedOrders);
        } else {
            alert('Error al actualizar estado: ' + result.error);
        }
    };

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
                {orders.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500">
                        Este cliente no tiene órdenes registradas.
                    </div>
                ) : (
                    orders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onStatusChange={handleStatusChange}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function OrderCard({ order, onStatusChange }: {
    order: OrderWithItems;
    onStatusChange: (orderId: string, status: OrderStatus) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

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
                        <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('es-CL')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Status Dropdown */}
                    <select
                        value={order.status}
                        onChange={(e) => {
                            e.stopPropagation();
                            onStatusChange(order.id, e.target.value as OrderStatus);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getOrderStatusColor(order.status)}`}
                    >
                        {Object.entries(orderStatusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <div className="text-right">
                        <p className="text-xs text-gray-500">{order.order_items?.length || 0} productos</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Detalle de Productos</h4>
                    <div className="space-y-3">
                        {order.order_items?.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-200 text-xs font-medium text-gray-500">
                                        x{item.quantity}
                                    </span>
                                    <span className="text-gray-700">{item.product_name}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {order.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                <strong>Notas:</strong> {order.notes}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
