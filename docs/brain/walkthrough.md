# Walkthrough: Backend Migration Setup

## Cambios Realizados

### 1. Base de Datos Supabase (`supabase/schema.sql`)
Se ha generado un script SQL completo que define la estructura de datos para reemplazar los mocks locales.
- **Tablas:** `sectors`, `families`, `products`, `articles`, `leads`, `clients`, `orders`.
- **Seguridad (RLS):**
    - **Público:** Catálogo de productos y blog.
    - **Privado (Admin/Service Role):** Gestión de usuarios, leads y escrituras en general.
    - **Cliente:** Acceso a sus propios datos (perfil, órdenes).
- **Storage:** Configuración del bucket `products-images`.

### 2. PHP Bridge (`public/api/bridge.php`)
Se ha creado el "puente" para ejecutar lógica de servidor en el hosting cPanel.
- **Ubicación:** `/public/api/bridge.php` (se desplegará en la raíz del dominio).
- **Funciones:**
    - `send_email`: Envío de correos transaccionales usando la función `mail()` de PHP (compatible con cPanel).
    - `admin_create_user`: Proxy seguro para crear usuarios en Supabase Auth sin exponer la Service Key.
- **Seguridad:** Protegido mediante `X-API-Key`.

## Verificación

### Cómo probar el Script SQL
1. Ir al Dashboard de Supabase -> SQL Editor.
2. Copiar el contenido de `supabase/schema.sql`.
3. Ejecutar ("Run").
4. Verificar que las tablas aparecen en el "Table Editor".

### Cómo probar el PHP Bridge
1. Subir el archivo `public/api/bridge.php` a la carpeta `public_html/api/` en Mundo Hosting.
2. Hacer un request POST con Postman/Curl:
```bash
curl -X POST https://tu-dominio.com/api/bridge.php \
  -H "Content-Type: application/json" \
  -H "X-API-Key: CAMBIAR_ESTO_POR_UN_SECRET_SEGURO_EN_PRODUCCION" \
  -d '{
    "action": "send_email",
    "to": "prueba@bienek.cl",
    "subject": "Test Bridge",
    "html": "<h1>Hola desde el Bridge</h1>"
  }'
```
3. Verificar la recepción del correo.
