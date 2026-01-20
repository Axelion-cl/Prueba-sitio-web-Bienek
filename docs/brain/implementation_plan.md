# Plan de Implementación Híbrido: Supabase + PHP Bridge

## Goal Description
Migrar la persistencia de datos del sitio web Bienek de archivos JSON/TS estáticos a **Supabase (PostgreSQL)**, manteniendo el hosting en **Mundo Hosting (cPanel)**. Implementar un **PHP Bridge** para funciones seguras que requieren entorno servidor (envío de correos SMTP y gestión de usuarios Admin).

## User Review Required
> [!IMPORTANT]
> **PHP Version:** Se asume PHP 7.4 o superior en el servidor cPanel.
> **Supabase Keys:** Necesitaremos `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` (para el PHP Bridge) y `SUPABASE_ANON_KEY` (para el Frontend).
> **SMTP Credentials:** Se requieren host, puerto, usuario y contraseña de la cuenta de correo corporativa.

## Proposed Changes

### 1. Base de Datos (Supabase)
Se generará un archivo `supabase/schema.sql` para ejecutar en el SQL Editor de Supabase.

#### Tablas Principales
- `sectors`: Catálogo de sectores.
- `families`: Catálogo de familias de productos.
- `subcategories`: (Opcional) Si se requiere más granularidad.
- `products`: Catálogo principal.
- `articles`: Blog y noticias.
- `leads`: Contactos desde formularios web.
- `clients`: Perfiles extendidos de empresas.
- `orders`: Historial de pedidos (simplificado).

#### Tablas de Relación (Many-to-Many)
- `product_sectors`
- `product_families`
- `product_related`

#### Seguridad (RLS)
- **Lectura Pública:** `products`, `sectors`, `families`, `articles`.
- **Escritura Admin:** Todas las tablas anteriores (requiere rol de `server_role` o check de email admin en `auth.users`).
- **Privado:** `leads` (Insert public, Select Admin), `orders` (Select Own/Admin).

### 2. PHP Bridge (`public/api/bridge.php`)
Script PHP único que actúa como router API seguro.

#### Funcionalidades
- **Autenticación:** Verifica un header `X-API-Key` (compartido secrets/env) para ejecutar acciones privilegiadas.
- **Acciones:**
    1.  `send_email`: Envío SMTP autenticado.
    2.  `admin_create_user`: Proxy hacia Supabase Auth Admin API (usando Service Role Key en lado servidor) para crear usuarios sin enviar invitación inmediata o para gestionar passwords.

### 3. Storage
- Bucket `products-images`.
- Policy: Public Read, Admin Insert/Delete.

## Verification Plan

### Automated Tests
No aplicable (entorno PHP remoto). Se realizarán pruebas manuales.

### Manual Verification
1. **Schema Check:**
   - Ejecutar script SQL en Supabase.
   - Verificar creación de tablas y políticas en el Dashboard.
2. **PHP Bridge Test:**
   - Subir `bridge.php` a una carpeta de prueba o usar un servidor PHP local emulado.
   - Hacer request POST con Postman/Curl simulando envío de email.
   - `curl -X POST -H "X-API-Key: SECRET" -d '{"action":"send_email", ...}' http://localhost/api/bridge.php`
3. **Integration Check:**
   - (Futuro) Conectar el frontend a estas nuevas tablas (fuera del alcance de esta tarea específica, que es solo Infraestructura).
