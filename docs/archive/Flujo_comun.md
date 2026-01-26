# Flujo Principal de Usuario – Desde Lead hasta Gestión de Órdenes

## 1. Captación de Lead → Conversión a Cliente

1. El usuario completa y envía el **formulario de contacto** público.
2. El sistema crea automáticamente un registro como **Lead** en:
   - Panel Admin → **Potenciales Clientes**
3. El vendedor revisa el lead y decide convertirlo en cliente:
   - Acción: Botón **“Generar credenciales”**
   - Se genera una **contraseña temporal** (ideal: un solo uso o con caducidad)
   - Se envía correo automático al lead con:
     - Usuario = email ingresado en el formulario
     - Contraseña temporal
     - Instrucción: “Inicia sesión y cambia tu contraseña inmediatamente”
4. Tras generar credenciales, el registro se mueve automáticamente a:
   - Panel Admin → **Clientes Actuales**
5. El cliente inicia sesión por primera vez (con credenciales temporales).
6. El sistema **obliga** al usuario a cambiar la contraseña:
   - Sección: **Perfil → Cambiar contraseña**
   - Validaciones: longitud mínima, mayúsculas, números, etc. (según reglas definidas)
7. Cliente ya tiene acceso normal como usuario autenticado.

## 2. Ciclo de Interés → Creación de Orden (Lado Cliente)

1. Cliente autenticado navega el catálogo.
2. Agrega productos a su **carrito** / lista de interés.
3. Va a **“Mis productos de interés”** → botón **“Contactar vendedor”** / **“Solicitar orden”**.
4. El sistema crea una **Orden** con estado inicial:
   - **Solicitud de orden**
5. La orden aparece inmediatamente en:
   - Panel Admin → **Gestión de clientes** → [Cliente] → **Ver historial de órdenes**
   - Cada orden muestra:
     - Número / ID de orden
     - Fecha de creación
     - Estado actual (dropdown editable solo por vendedor)
     - Botón **“Ver productos”** → lista detallada de ítems solicitados

## 3. Gestión de Órdenes por el Vendedor (Panel Admin)

| Estado inicial         | Acción del vendedor                          | Nuevo estado              | Visibilidad para el cliente                          | Descripción                                      |
|------------------------|----------------------------------------------|---------------------------|------------------------------------------------------|--------------------------------------------------|
| Solicitud de orden     | Acepta / empieza a trabajar                  | Orden activa              | Aparece en “Mis órdenes”                             | Vendedor confirma que trabajará la solicitud     |
| Orden activa           | Cotiza, prepara, envía, coordina, etc.       | —                         | Visible como “Activa” en “Mis órdenes”               | Orden en proceso                                 |
| Orden activa           | Finaliza con éxito                           | Orden finalizada          | Visible como “Finalizada”                            | Orden completada exitosamente                    |
| Orden activa           | No se concreta (cancelada, rechazado, etc.)  | Orden no finalizada       | Visible como “No finalizada”                         | Orden no concretada                              |

**Reglas clave:**
- Solo el **vendedor** puede cambiar el estado de la orden (dropdown con las 4 opciones).
- El cliente **nunca** puede modificar el estado.
- Recomendado: registrar auditoría (quién cambió el estado + fecha/hora).

## 4. Vista del Cliente – Sección “Mis órdenes”

El cliente ve:

- **Activa** → órdenes en proceso
- **Finalizada** → órdenes completadas con éxito
- **No finalizada** → órdenes canceladas / no concretadas

**Recomendaciones de visibilidad:**

- **No mostrar** órdenes en estado “Solicitud de orden” al cliente (solo visibles para vendedores).
- Ordenar por defecto: más reciente primero.
- Permitir filtro por estado.
- Mostrar al menos: número de orden, fecha, estado, cantidad de productos, botón “Ver detalle”.


Pd: Es importante destacar que este flujo no describe cuando los clientes se registran manualmente por parte del vendedor. Además, cabe considerar que hay páginas/elementos mencionados en este flujo que no existen actualmente que se deben crear. Ej: Todo lo relacionado con "Historial de Ordenes" del cliente en la página "Gestion de Clientes" del admin panel.