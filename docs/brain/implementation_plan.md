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

## 4. Requerimientos Futuros (Data Model & Admin)
**Nota para Backend/Arquitectura:**
- **Modelo Relacional Flexible:** La base de datos debe soportar un sistema de etiquetado robusto (Many-to-Many).
    - `Products` <-> `Product_Tags` <-> `Tags` (Type: 'Sector', 'Familia', 'Atributo').
- **Admin Panel:** Debe permitir crear/editar/eliminar estas etiquetas dinámicamente y asignarlas a productos sin tocar código.
- **Frontend Mock Current:** El `mockProducts.ts` debe reflejar esto usando arrays de strings para `sectors` (Pages), `family` (Filtros), etc.
