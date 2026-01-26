-- =============================================
-- FIX: PERMISOS DE ADMIN PARA ÓRDENES Y ITEMS
-- =============================================

-- 1. Políticas para la tabla 'orders'

-- Permitir a admins VER todas las órdenes
CREATE POLICY "Admins can view all orders"
ON orders FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Permitir a admins ACTUALIZAR todas las órdenes (para cambiar estado)
CREATE POLICY "Admins can update all orders"
ON orders FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Permitir a admins ELIMINAR órdenes
CREATE POLICY "Admins can delete orders"
ON orders FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- 2. Políticas para la tabla 'order_items'

-- Permitir a admins VER todos los items de órdenes
CREATE POLICY "Admins can view all order items"
ON order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Permitir a admins ELIMINAR items de órdenes (necesario al borrar orden)
CREATE POLICY "Admins can delete order items"
ON order_items FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- 3. Políticas para historial de estados (order_status_history)

-- Permitir a admins insertar historial (ya deberían tenerlo si es public insert, pero por si acaso)
CREATE POLICY "Admins can insert status history"
ON order_status_history FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Permitir ver historial
CREATE POLICY "Admins can view status history"
ON order_status_history FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
