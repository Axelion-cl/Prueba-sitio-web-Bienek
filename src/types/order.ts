/**
 * Order Types
 * Centralized type definitions for orders and order items
 * Replaces: import { MockOrder } from '@/data/mockOrders'
 * Replaces: import { Order } from '@/data/mockCRM'
 */

// Order status states - Business flow
export type OrderStatus =
    | 'solicitud'      // Initial: pending vendor review (not visible to client)
    | 'activa'         // Vendor accepted, order in progress
    | 'finalizada'     // Completed successfully
    | 'no_finalizada'; // Cancelled or not completed

// Main Order interface (matches Supabase schema)
export interface Order {
    id: string; // e.g., "ORD-2026-001"
    user_id: string;
    status: OrderStatus;
    created_at: string;
    updated_at: string;
    completed_at?: string;
    notes?: string;
}

// Order item (products in an order)
export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    product_name: string;
    quantity: number;
}

// Order with items (joined query result)
export interface OrderWithItems extends Order {
    order_items: OrderItem[];
}

// Status change history (audit trail)
export interface OrderStatusHistory {
    id: string;
    order_id: string;
    old_status: OrderStatus | null;
    new_status: OrderStatus;
    changed_by: string;
    changed_at: string;
    notes?: string;
}

// Helper functions for order status display
export const orderStatusLabels: Record<OrderStatus, string> = {
    solicitud: 'Solicitud de orden',
    activa: 'Orden activa',
    finalizada: 'Orden finalizada',
    no_finalizada: 'Orden no finalizada'
};

export const orderStatusColors: Record<OrderStatus, string> = {
    solicitud: 'bg-gray-100 text-gray-800',
    activa: 'bg-blue-100 text-blue-800',
    finalizada: 'bg-green-100 text-green-800',
    no_finalizada: 'bg-red-100 text-red-800'
};

export function getOrderStatusLabel(status: OrderStatus): string {
    return orderStatusLabels[status] || status;
}

export function getOrderStatusColor(status: OrderStatus): string {
    return orderStatusColors[status] || 'bg-gray-100 text-gray-800';
}
