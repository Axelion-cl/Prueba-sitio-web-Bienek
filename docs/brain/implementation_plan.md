# Plan de Iteración: Detalle de Producto y Navegación Inteligente

Objetivo: Finalizar la página de producto y dotar al sitio de capacidades de búsqueda rápida y filtrado.

## 1. Página de Detalle de Producto (En Progreso)
*Ya especificado anteriormente. Continuar con la implementación de `src/app/productos/[id]/page.tsx`.*

## 2. Barra de Búsqueda Rápida (Header)
**Requerimiento de Usuario:** "Barra que despliega un menú dropdown, NO una página de resultados."

### Implementación (`SearchBar.tsx`):
- **Tipo:** Client Component (`"use client"`).
- **Lógica:**
    - Al escribir, buscar coincidencias en `mockProducts` (o `solutions`) en tiempo real.
    - Mostrar un **Dropdown Flotante** absoluto debajo del input.
    - Listar resultados (Máx 5-10).
    - **Clic:** Navegar directamente a `/productos/[id]` o `/soluciones/[slug]`.
    - **Enter:** (Opcional) Si hay una coincidencia exacta, ir a ella. Si no, no hacer nada o abrir el dropdown.

## 3. Filtros Laterales (Página Soluciones)
**Requerimiento:** Filtrar la grilla de productos actual sin recargar la página.

### Implementación:
- **Componente:** `SidebarFilters.tsx` (Client Component).
- **Estado:** Usar URL params (`?marca=X&cat=Y`) o Estado Local (Context/State). *Recomendación: Estado Local por ahora para simplicidad con Mocks*.
- **Integración:**
    - El `SolutionsLayout` debe envolver la Grilla.
    - El `SolutionsLayout` debe envolver la Grilla.
    - Pasar la lista de productos filtrados al `ProductGrid`.

- **Modelo Relacional Flexible:**
    - `Products` (Many-to-Many with Tags)
    - `Tags` (Types: Sector, Family, Attribute)
    - `Leads` (Contact Form submissions)
    - `Users` (Role: 'client' | 'admin')
    - `Orders` (Relation User -> Products)

## 4. Fase 4: Expansión de Contenido (Marketing)
**Objetivo:** Generación de tráfico y credibilidad técnica.
- **Blog Técnico:**
    - Layout: Grilla de 4 columnas.
    - Componentes: `ArticleCard` (Imagen, Título, Extracto, CTA).
    - Navegación: Buscador local + Filtros por categoría via tags.
- **Bolsa de Trabajo:** Formulario de postulación con carga de CV.
- **Promociones:** Landing de ofertas.

## 5. Fase 5: Autenticación y Cliente (B2B Workflow)
**Objetivo:** Gestión de acceso controlado y experiencia personalizada.
- **Login/Registro:**
    - Modelo "Asistido": El usuario se registra via "Contáctenos" -> Admin lo valida -> Admin genera credenciales.
    - Login tradicional con email/password (y recuperación).
- **Header Dinámico:**
    - Estado Logged-In: Muestra "Hola, [Cliente]" + Icono Carrito.
- **Mi Cuenta:**
    - **Mis Productos:** Catálogo personalizado o Favoritos.
    - **Mis Ordenes:** Historial de pedidos.
    - **Perfil:** Actualización de datos y password.

## 6. Fase 6: Internacionalización (i18n)
**Objetivo:** Implementar soporte bilingüe (Español/Inglés).
- **Selector de Idioma:** Header Bar (Negra).
- **Tecnología:** `next-intl` o Contexto propio (decisión Frontend).
- **Persistencia:** LocalStorage.

## 7. Fase 7: Administración (CRM Interno)
**Objetivo:** Control total del negocio y gestión de clientes.
- **Gestión de Leads:**
    - Listar envíos del formulario "Contáctenos".
    - **Acción Clave:** "Convertir Lead a Usuario" -> Genera usuario en Supabase Auth y envía credenciales.
- **Gestión de Etiquetas:** CRUD completo y asignación masiva.
- **Gestión de Productos:** Formulario y Carga CSV.
- **Gestión de Ordenes:** Visualización de pedidos de clientes.
