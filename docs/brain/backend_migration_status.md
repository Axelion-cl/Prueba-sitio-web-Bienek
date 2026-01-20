# Estado de Migración Backend (Agente Infraestructura)

**Fecha:** 2026-01-19
**Estado:** COMPLETADO
**Responsable:** Agente Backend (Antigravity)

## Resumen Ejecutivo
Se ha completado la generación de los archivos de infraestructura necesarios para la migración a una arquitectura híbrida (Next.js Estático en cPanel + Supabase Cloud).

## Entregables Generados

### 1. Base de Datos (`supabase/schema.sql`)
- **Ubicación:** `d:\2. Otros\Github\Prueba Sitio web Bienek\supabase\schema.sql`
- **Contenido:**
  - Tablas: `sectors`, `families`, `products`, `articles`, `leads`, `clients`, `orders`.
  - Relaciones: Tablas pivote `product_sectors`, `product_families`.
  - **Seguridad (RLS):**
    - Lectura pública para catálogos.
    - Escritura restringida a `service_role` (Backend) o Admin autenticado.
    - Acceso de cliente a sus propios datos.
  - Storage: Bucket `products-images`.

### 2. PHP Bridge (`public/api/bridge.php`)
- **Ubicación:** `d:\2. Otros\Github\Prueba Sitio web Bienek\public\api\bridge.php`
- **Funcionalidad:**
  - Actúa como proxy seguro en el servidor cPanel.
  - Endpoint `send_email`: Envío SMTP usando credenciales de Mundo Hosting.
  - Endpoint `admin_create_user`: Gestión de usuarios Supabase Auth segura (Service Role oculto en servidor).
- **Seguridad:** Requiere header `X-API-Key`.

## Próximos Pasos (Para el Agente Orquestador)
1. **Ejecución SQL:** Correr el script `supabase/schema.sql` en el SQL Editor del proyecto Supabase.
2. **Despliegue PHP:** Subir `public/api/bridge.php` a `/public_html/api/` en el hosting.
3. **Configuración de Variables:**
   - Definir `SUPABASE_URL` y `SUPABASE_KEY` en local.
   - Definir secretos SMTP y API Key en el archivo `bridge.php` (en el servidor).
4. **Integración Frontend:** Actualizar los clientes de API en el frontend para apuntar a Supabase y al Bridge.
