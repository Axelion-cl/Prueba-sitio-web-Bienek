/**
 * Orders Service
 * Handles all order operations with Supabase
 */

import { supabase } from '@/lib/supabase';
import { Order, OrderWithItems, OrderItem, OrderStatus } from '@/types/order';

// ============================================
// CLIENT: CREATE ORDER (from cart)
// ============================================

export async function createOrder(
    userId: string,
    items: { productId: string; productName: string; quantity: number }[]
): Promise<{ success: boolean; orderId?: string; error?: string }> {
    try {
        // Generate order number using the database function
        const { data: orderNumberResult, error: funcError } = await supabase
            .rpc('generate_order_number');

        if (funcError) {
            console.error('Generate order number error:', funcError);
            // Fallback: generate client-side
            const fallbackNumber = `ORD-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
            return createOrderWithNumber(fallbackNumber, userId, items);
        }

        return createOrderWithNumber(orderNumberResult, userId, items);
    } catch (error) {
        console.error('Create order error:', error);
        return { success: false, error: 'Error al crear la orden' };
    }
}

async function createOrderWithNumber(
    orderId: string,
    userId: string,
    items: { productId: string; productName: string; quantity: number }[]
): Promise<{ success: boolean; orderId?: string; error?: string }> {
    // Create order
    const { error: orderError } = await supabase
        .from('orders')
        .insert({
            id: orderId,
            user_id: userId,
            status: 'solicitud'
        });

    if (orderError) {
        console.error('Insert order error:', orderError);
        return { success: false, error: 'Error al crear la orden' };
    }

    // Create order items
    const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.productId,
        product_name: item.productName,
        quantity: item.quantity
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

    if (itemsError) {
        console.error('Insert order items error:', itemsError);
        // Order was created but items failed - log but don't fail completely
    }

    return { success: true, orderId };
}

// ============================================
// CLIENT: GET MY ORDERS (excludes 'solicitud')
// ============================================

export async function getMyOrders(userId: string): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                id,
                product_id,
                product_name,
                quantity
            )
        `)
        .eq('user_id', userId)
        .in('status', ['activa', 'finalizada', 'no_finalizada'])
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get orders error:', error);
        return [];
    }

    return (data || []) as OrderWithItems[];
}

// ============================================
// ADMIN: GET ALL ORDERS
// ============================================

export async function getAllOrders(): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                id,
                product_id,
                product_name,
                quantity
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get all orders error:', error);
        return [];
    }

    return (data || []) as OrderWithItems[];
}

// ============================================
// ADMIN: GET ORDERS BY CLIENT
// ============================================

export async function getOrdersByClient(clientId: string): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                id,
                product_id,
                product_name,
                quantity
            )
        `)
        .eq('user_id', clientId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get client orders error:', error);
        return [];
    }

    return (data || []) as OrderWithItems[];
}

// ============================================
// ADMIN: UPDATE ORDER STATUS
// ============================================

export async function updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    changedBy: string,
    notes?: string
): Promise<{ success: boolean; error?: string }> {
    try {
        // Get current status for audit
        const { data: currentOrder } = await supabase
            .from('orders')
            .select('status')
            .eq('id', orderId)
            .single();

        const oldStatus = currentOrder?.status;

        // Update order
        const updateData: Partial<Order> = {
            status: newStatus,
            updated_at: new Date().toISOString()
        };

        if (newStatus === 'finalizada' || newStatus === 'no_finalizada') {
            updateData.completed_at = new Date().toISOString();
        }

        if (notes) {
            updateData.notes = notes;
        }

        const { error: updateError } = await supabase
            .from('orders')
            .update(updateData)
            .eq('id', orderId);

        if (updateError) {
            return { success: false, error: updateError.message };
        }

        // Log status change in history
        await supabase.from('order_status_history').insert({
            order_id: orderId,
            old_status: oldStatus,
            new_status: newStatus,
            changed_by: changedBy,
            notes
        });

        return { success: true };
    } catch (error) {
        console.error('Update order status error:', error);
        return { success: false, error: 'Error al actualizar estado' };
    }
}

// ============================================
// ADMIN: GET ORDER DETAILS
// ============================================

export async function getOrderById(orderId: string): Promise<OrderWithItems | null> {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                id,
                product_id,
                product_name,
                quantity
            )
        `)
        .eq('id', orderId)
        .single();

    if (error) {
        console.error('Get order error:', error);
        return null;
    }

    return data as OrderWithItems;
}

// ============================================
// ADMIN: DELETE ORDER
// ============================================

export async function deleteOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Delete order items first (if no CASCADE)
        const { error: itemsError } = await supabase
            .from('order_items')
            .delete()
            .eq('order_id', orderId);

        if (itemsError) {
            console.error('Delete order items error:', itemsError);
            // Continue trying to delete order anyway, maybe it was empty
        }

        // Delete order
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', orderId);

        if (error) {
            console.error('Delete order error:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Delete order exception:', error);
        return { success: false, error: 'Error al eliminar la orden' };
    }
}
