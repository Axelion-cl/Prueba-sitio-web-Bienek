# Inventario de Funcionalidades y Matriz de Compatibilidad cPanel

Este documento detalla todas las lógicas actuales del sitio y cómo se ven afectadas al pasar de un hosting moderno (Vercel) a uno tradicional (Mundo Hosting cPanel) usando **Static Export**.

## 1. Tabla de Funcionalidades Core

| Funcionalidad | Lógica Técnica | Impacto en cPanel | ¿Requiere Cambios? |
| :--- | :--- | :--- | :--- |
| **Cambio de Idioma (i18n)** | `LanguageContext` + `localStorage`. Lógica 100% cliente. | **Ninguno.** Funciona perfecto. | No. |
| **Autenticación (Mock/Supa)** | `AuthContext`. Llamadas directas via API de Supabase Cloud. | **Ninguno.** Solo requiere conexión a internet del usuario. | No. |
| **Buscador (Quick Search)** | Filtrado en tiempo real de data JSON en el cliente. | **Ninguno.** Sigue siendo instantáneo. | No. |
| **Filtros Soluciones** | Hook `useSolutionsFilters`. Lógica de filtrado client-side. | **Ninguno.** Funciona igual. | No. |
| **Páginas Dinámicas (`[id]`)** | Next.js Dynamic Routes (Productos/Sectores). | **Alto.** En cPanel deben ser archivos estáticos generados en el build. | Sí (configurar `export`). |
| **Admin Panel (CRUD)** | Interfaz React. Estado local + llamadas API futuras. | **Ninguno.** La interfaz corre en el navegador. | No. |
| **Envío de Correos** | Hoy: Mock. Futuro: PHP Bridge. | **Vercel usa Serverless; cPanel requiere PHP.** | Sí (crear script PHP). |

---

## 2. Limitaciones Críticas en Mundo Hosting (cPanel)

Al no tener un servidor de **Node.js** corriendo (solo archivos estáticos), perdemos tres capacidades nativas de Next.js:

### ⚠️ A. ISR (Incremental Static Regeneration)
- **Qué es:** La capacidad de actualizar un producto en la base de datos y que la página cambie sola sin volver a subir el sitio.
- **En cPanel:** No existe. Si cambias un precio, debes hacer `npm run build` y volver a subir el sitio (o usar carga de datos puramente desde el cliente via `useEffect`).

### ⚠️ B. Next.js Image Optimization (`<Image />`)
- **Qué es:** El servidor de Next.js (Vercel) procesa y comprime las imágenes automáticamente.
- **En cPanel:** Aparecerá un error porque no hay servidor de imágenes.
- **Solución:** Debemos desactivar la optimización nativa (`unoptimized: true`) o usar un servicio externo como Cloudinary o Supabase Storage para las fotos de productos.

### ⚠️ C. Server Actions y API Routes (`/api/...`)
- **Qué es:** Código de backend "mágico" que corre en Next.js.
- **En cPanel:** No funcionan. Cualquier lógica de backend (como guardar una postulación de trabajo) debe ir directo a Supabase o a un archivo `.php` que creemos manualmente en el hosting.

---

## 3. Conclusión: ¿Afecta la experiencia del usuario?

**Para el usuario final:** **No.** El sitio se verá igual de rápido y fluido si se configura bien el export estático.

**Para el Administrador:** **Sí.**
- La gestión de productos en el Admin Panel será un poco más compleja de implementar porque no podremos usar "Server Actions" de Next.js 15.
- La subida de imágenes requerirá un paso adicional de compresión manual o integración directa con Supabase Storage.

**Veredicto:** Es viable usar Mundo Hosting, pero el desarrollo del Admin Panel será un poco más "tradicional" (manual) que si estuviéramos en Vercel.
