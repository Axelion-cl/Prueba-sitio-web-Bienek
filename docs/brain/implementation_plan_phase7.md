# Admin Panel Implementation Plan (Phase 7)

## Goal
Establish a secure and separate environment for the internal CRM. Implement "Role-Based Access Control" (RBAC) to restrict access to administrators only.

## User Review Required
> [!IMPORTANT]
> **Admin URL Structure:**
> - Login: `/admin/login`
> - Dashboard: `/admin/dashboard`
> - Products: `/admin/products`

## Proposed Changes

### Core Security
#### [NEW] [AdminGuard.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/components/admin/AdminGuard.tsx)
- Client component that checks:
    1. `isLoggedIn`
    2. `user.role === 'admin'`

### Admin Structure (Route Groups)

#### [NEW] [src/app/admin/layout.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/app/admin/layout.tsx)
- Root layout for `/admin`.

#### [NEW] [src/app/admin/(dashboard)/products/page.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/app/admin/(dashboard)/products/page.tsx)
- **Product List**: Table with Search, Filter, and Pagination.
- **Actions**: Edit (Modal/Page), Delete (Confirm).

#### [NEW] [src/app/admin/(dashboard)/products/new/page.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/app/admin/(dashboard)/products/new/page.tsx)
- **Create Product**: Form for Name, Brand, SKU, Price, etc.

#### [NEW] [src/components/admin/products/ProductForm.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/components/admin/products/ProductForm.tsx)
- Reusable form for Create/Edit.

### Components
#### [NEW] [AdminSidebar.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/components/admin/AdminSidebar.tsx)
- Navigation menu: "Dashboard", "Productos", "Clientes", "Cotizaciones".

## Future Features (CRM)
- **Convertidor de Leads**:
    - Generador de Credenciales (Nested).

### Tag Management Extensions
#### [NEW] [FeaturedFamiliesSelector.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/components/admin/tags/FeaturedFamiliesSelector.tsx)
- **Contexto**: En la gestión de Sectores (`/admin/tags?tab=sectores`).
- **Funcionalidad**:
    - Al editar un Sector, mostrar un selector "Familias Destacadas" (Máx 4).
    - Permite buscar y seleccionar etiquetas de tipo "Familia".
    - **Visual**: Muestra las 4 seleccionadas con opción de eliminar/reordenar.
- **Frontend Impact**:
    - El componente `SolutionsGrid` (Home) debe leer esta info.
    - Hover en tarjeta de Sector -> Muestra las 4 familias.
    - Clic en familia -> Navega a `/soluciones/[sector-slug]?family=[family-slug]`.

## Verification Plan
1. Access `/admin/dashboard` as guest -> Redirect to `/admin/login`.
2. Login as `admin@bienek.cl`.
3. Go to `/admin/products`. Verify list.
4. Click "Nuevo Producto". Verify Form.
