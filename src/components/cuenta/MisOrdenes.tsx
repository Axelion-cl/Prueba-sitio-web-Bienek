'use client';

import { useState, useEffect } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { getMyOrders } from '@/services/orders';
import { OrderWithItems, getOrderStatusLabel, getOrderStatusColor } from '@/types/order';

export function MisOrdenes() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [orders, setOrders] = useState<OrderWithItems[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;

            setIsLoading(true);
            const data = await getMyOrders(user.id);
            setOrders(data);
            setIsLoading(false);
        };

        fetchOrders();
    }, [user]);

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">{t.miCuenta.noTienesPedidos}</h3>
                <p className="text-gray-500">{t.miCuenta.tusPedidosApareceran}</p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-gray-600 mb-6">
                {t.miCuenta.revisaOrdenes}
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-gray-100 rounded-lg border-l-4 border-primary overflow-hidden"
                    >
                        {/* Order Header */}
                        <div
                            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center"
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        >
                            <div>
                                <p className="font-medium text-gray-900">
                                    {t.miCuenta.orden} {order.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {t.miCuenta.fecha} {new Date(order.created_at).toLocaleDateString('es-CL')}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`text-xs px-3 py-1 rounded-full ${getOrderStatusColor(order.status)}`}>
                                    {getOrderStatusLabel(order.status)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {order.order_items?.length || 0} productos
                                </span>
                                {expandedOrder === order.id ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </div>
                        </div>

                        {/* Order Items (Expanded) */}
                        {expandedOrder === order.id && order.order_items && (
                            <div className="border-t border-gray-200 bg-white p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Productos</h4>
                                <div className="space-y-2">
                                    {order.order_items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-700">{item.product_name}</span>
                                            <span className="text-gray-500">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
