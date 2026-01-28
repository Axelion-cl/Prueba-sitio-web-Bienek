# Registro de Cambios - Sesión de Desarrollo

Este documento registra los cambios implementados durante las sesiones de desarrollo con el agente de código. Sirve como contexto detallado para el agente orquestador.

---

## Sesión: 2026-01-28 - Página de Construcción

### UI/UX
- **Nueva Página**: Creada `src/app/construccion/page.tsx` con un diseño premium "Bajo Construcción".
- **Diseño**: Integración de colores de marca (#ECEC00), logo oficial, y estética moderna con glassmorphism.
- **Funcionalidad**: Incluye accesos directos de contacto (Email y Teléfono) y mensaje de próximo lanzamiento.

---

## Sesión: 2026-01-23 - Debugging Formulario de Contacto (Hostinger)

### Corrección de Envío de Correos
- **Problema**: Error "Failed to fetch" (CORS) y 403 Forbidden en `email.php`.
- **Diagnóstico**:
    - El formulario no enviaba destinatario (seguridad), `email.php` lo requería.
    - Archivo `.htaccess` en Hostinger tenía `Deny from all`.
- **Solución**:
    - **`php-bridge/email.php`**: Reescrito para usar destinatario hardcodeado (`marketing@bienek.cl`) y cabeceras CORS permisivas.
    - **`php-bridge/.htaccess`**: Reemplazado para permitir acceso a `.php` (`Allow from all`) pero ocultar índices (`Options -Indexes`).
    - **Documentación**: Actualizado `ORCHESTRATOR_AGENT_CONTEXT.md` reflejando hosting en **Hostinger**.

---

## Sesión: 2026-01-22 - Migración Completa a Arquitectura Estática

### Refactor de Server Actions → Client Services
- **Problema**: `npm run build` fallaba con error "Server Actions are not supported with static export".
- **Solución**: Migración completa del Panel de Admin a servicios client-side.
- **Archivos Eliminados**:
    - `src/app/actions/products.ts`
    - `src/app/actions/tags.ts`
    - `src/app/actions/clients.ts`
    - `src/app/actions/contact.ts`
    - `src/app/actions/careers.ts`
- **Archivos Creados**:
    - `src/services/admin/products.ts` - CRUD productos + upload imágenes
    - `src/services/admin/tags.ts` - CRUD sectores/familias/marcas/badges
    - `src/services/admin/clients.ts` - CRUD leads/clientes
- **Componentes Actualizados**:
    - `ProductForm.tsx`, `products/page.tsx`, `tags/page.tsx`, `clients/page.tsx`
- **Resultado**: Build exitoso con 166 páginas estáticas generadas.

### Protección Anti-Spam (Cloudflare Turnstile)
- **Widget**: Creado `src/components/ui/TurnstileWidget.tsx` usando `@marsidev/react-turnstile`.
- **Formularios Protegidos**:
    - `ContactForm.tsx` - Añadido estado `turnstileToken` y validación pre-submit.
    - `JobApplicationForm.tsx` - Ídem.
- **Backend PHP**: Actualizado `php-bridge/email.php` con función `verifyTurnstile()`.
- **Configuración**: Keys agregadas a `.env.local` (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`).

### Favicon
- **Nuevo**: Copiado logo de Bienek como `src/app/icon.png` para favicon moderno.

---

## Sesión: 2026-01-19/20 - Estrategia Mundo Hosting + PHP Bridge

### Auditoría de Infraestructura
- **Análisis**: Documentados límites de Vercel Free (100GB bandwidth, 1000 imágenes, 10s compute).
- **Decisión**: Migrar frontend a **Mundo Hosting (cPanel)** como sitio estático.
- **Arquitectura Híbrida**:
    - **Frontend**: Next.js Static Export (`output: 'export'`) en cPanel.
    - **Backend**: Supabase Cloud (DB + Auth + Storage).
    - **Email**: PHP Bridge en mismo cPanel (SMTP nativo).

### PHP Bridge para Emails
- **Archivo**: `php-bridge/email.php` creado con soporte para:
    - Formulario de Contacto (`type: 'contact'`).
    - Formulario de Postulación (`type: 'application'`).
    - Adjuntos (Excel, CSV, PDF) via MIME multipart.
- **Email Template**: HTML profesional con gradientes, tipografía y diseño responsive.
- **Despliegue**: Subido a `axelion.cl/api-bienek/email.php`.
- **Config**: Variable `NEXT_PUBLIC_PHP_BRIDGE_URL` en `.env.local`.

### Configuración Static Export
- **next.config.mjs**: Añadido `output: 'export'` e `images: { unoptimized: true }`.
- **Refactor Forms**:
    - `ContactForm.tsx`: Eliminada dependencia de Server Action, usa `fetch()` directo al PHP Bridge.
    - `JobApplicationForm.tsx`: Ídem.

---

## Sesión: 2026-01-17/18 - Dashboard Real Data + Promociones DB

### Dashboard con Datos Reales (`/admin/dashboard`)
- **Migración**: Reemplazado `mockCRM` con queries directos a Supabase.
- **Métricas Reales**: Conteo de Leads, Clientes, Órdenes, Productos desde DB.

### Promociones desde Supabase
- **Query**: Productos con badge "promoción" o "oferta" se muestran automáticamente en `/promociones`.
- **Verificación**: CRUD de badges sincronizado correctamente con página pública.

### Barra de Búsqueda Conectada a DB
- **Servicio**: `src/services/products.ts` → función `searchProducts()` con `.ilike()`.
- **Componente**: `SearchBar.tsx` usa debounce + Supabase en tiempo real.

---

## Sesión: 2026-01-16 (Mañana) - UI/UX Admin Dashboard Improvements

### Gestión de Etiquetas (`/admin/tags`)
- **Badge Color Picker**: Reemplazado el input manual de texto por un **Selector Visual de Colores** (9 presets).
- **Mejora de Tabla**: Reemplazada la columna técnica "Color" por **"Última Edición"** (fecha automática).
- **Eliminación Segura**: Implementado **Modal de Confirmación Personalizado** para borrar etiquetas, reemplazando `window.confirm`.

### Gestión de Clientes / CRM (`/admin/clients`)
- **Conversión de Leads**:
    - **Fix UI**: Reemplazado `window.confirm` por **Modal de Confirmación Personalizado**.
    - **Flujo**: Verificada la promoción correcta de Lead -> Cliente y la generación de contraseña temporal.

### Familias Destacadas (`/admin/tags` & Home)
- **Admin UI**: Nuevo botón de acción "Lista" en Sectores que abre un **Modal Dedicado** para gestionar familias destacadas.
- **Home Page**:
    - **Grid Dinámico**: Las tarjetas de solución ahora muestran las familias configuradas en el admin.
    - **Navegación Inteligente**: Al hacer clic en una familia, redirige a la página de soluciones con el filtro activo (`?family=id`).
    - **Fix Técnico**: Solucionado error de hidratación (Link anidado) refactorizando `SolutionsGrid` a Client Component.

---

## Sesión: 2026-01-15 (Tarde) - Dashboard, Layout & CRM UI

### Dashboard & Layout
- **Segregación de Layouts**: Implementación de Route Groups `(public)` vs `admin`.
    - **Resultado**: El Panel de Administración ya no hereda Header/Footer públicos.
- **Dashboard Metrics (`/admin/dashboard`)**:
    - **Reactividad**: Métricas reales conectadas a `mockCRM` y `mockProducts`.
    - **KPIs**: Leads, Clientes Actuales, Órdenes Activas, Productos.
    - **Limpieza**: Eliminación de tarjeta "Ventas del Mes".

### Refinamientos CRM (`/admin/clients`)
- **Acciones Manuales**: Botón **"Nuevo Lead"** con formulario modal.
- **Seguridad UI**:
    - **Eliminación**: Modal con confirmación de contraseña de admin.
    - **Contraseñas**: Copiado al portapapeles en generación de credenciales.
- **Fix Técnico**: Uso correcto de `useParams` para detalle de órdenes.

---

## Sesión: 2026-01-14/15 (Admin Panel & CRM)

### Infraestructura Admin (`/admin`)
- **Seguridad**: Implementado `AdminGuard` para protección de rutas y layout dedicado con Sidebar oscuro.
- **Autenticación**: Login funcional simulado (`admin@bienek.cl`) con redirección inteligente.

### Gestión de Productos
- **CRUD Completo**: Listado con búsqueda, Creación y Edición de productos.
- **Carga Masiva (`/admin/products/import`)**: 
    - Wizard de 3 pasos (Subir, Validar, Finalizar).
    - Soporte híbrido: Excel para datos + ZIP para imágenes.
- **Formulario Inteligente**: Implementado componente `MultiSelect` para asignación múltiple de Sectores, Familias y Marcas.

### Gestión de Etiquetas (`/admin/tags`)
- **Refactor de Datos**: Desacoplamiento total de Sectores y Familias (ahora etiquetas independientes).
- **CRUD**: Panel unificado con pestañas para Crear/Editar/Eliminar Sectores, Familias y Marcas.
- **Nuevo**: Agregada pestaña "Distintivos" para gestionar etiquetas como "Más Vendidos", "Oferta", etc.
- **Persistencia**: Estado local mockeado funcional para demos rápidas.

### Internacionalización (i18n)
- **Motor**: Implementado `LanguageContext` global.
- **Cobertura**: Traducción completa de Header, Footer, Login, Mi Cuenta y Home.
- **Persistencia**: Preferencia de usuario guardada en `localStorage`.

### Gestión de Clientes (CRM) (`/admin/clients`)
- **Pipeline de Conversión**:
    - Pestaña **"Potenciales"** (Leads) con datos de contacto.
    - Acción **"Convertir"** que transfiere Lead a Cliente y simula envío de credenciales.
- **Gestión de Clientes Actuales**:
    - Listado con estado (Activo/Inactivo).
    - Acciones Rápidas: Reset Password, Editar, Eliminar.
- **Historial de Órdenes (`/admin/clients/[id]/orders`)**:
    - Vista detallada de compras por cliente.
    - Desglose de productos por orden (Acordeón).
    - Solucionado bug de parámetros en Next.js 15 (`useParams`).

---

## Sesión: 2026-01-12 (Página de Producto)

### Página Detalle de Producto (`/productos/[id]`)
- **Ruta Dinámica**: `src/app/productos/[id]/page.tsx` con ISR.
- **Componentes Nuevos**:
    - `ProductGallery`: Galería interactiva.
    - `ProductInfo`: Info crítica (Marca, Título, SKU, Badges) y botón de acción (Agregar).
    - `RelatedProducts`: Grilla de productos relacionados.
- **Datos Mock**: Actualizado `mockProducts.ts` con arrays de imágenes, descripciones largas, especificaciones, badges y **más productos relacionados (8 items)** para probar carousel.
- **UI/UX Refinado**: 
    - **Espaciado (Padding)**: Reducido drásticamente el espacio entre la sección principal y los productos relacionados (aprox -75px) y el padding interno de la sección de relacionados (aprox -55px).
    - **Header de Info**: Brand reubicado entre Título y SKU, con tamaño aumentado (Logo ajustado a `h-10 w-28` y texto "MARCA" en `text-2xl`). SKU movido al final de este bloque.
    - **Carrusel Relacionados**: Implementado con **Embla Carousel**. Flechas separadas 10px adicionales y configuradas para avanzar de **2 en 2**. Título actualizado a "Puede que también te interese:".
    - **Tarjetas de Producto**: Se aseguró que las tarjetas usan el mismo estilo que en Soluciones (Botones "Agregar" Amarillo y "Mas Info" Verde). 
    - **Corrección de Visibilidad**: Eliminada restricción de altura fija (`h-[420px]`).
- **Buscador y Filtros**:
    - **Header**: Se mantuvo la funcionalidad de "Quick Search" con dropdown.
    - **Página Soluciones**: Implementado `SolutionsLayout` con barra de búsqueda **local** ySidebar de filtros.
    - **Filtros**: Sidebar izquierdo con **checkboxes** para filtrar por Marca (soporte multi-selección).
    - **Integración**: Eliminación del botón "Filtros" móvil; sidebar siempre presente en el flujo (stacked en mobile).
    - **Layout**: Descripción y Especificaciones movidas a la columna derecha.
    - **Cleanup**: Eliminado botón "Filtros" redundante junto a la barra de búsqueda en Soluciones. UI simplificada a solo Barra de Búsqueda + Sidebar.
## Sesión: 2026-01-13 (Refinamientos UI y Blog Técnico)

### Refinamiento UI Soluciones
- **Layout General**:
    - **Header Fix**: Ajustado de `w-full lg:w-1/3` a container flexible con `whitespace-nowrap` para evitar saltos de línea en el lema "Líderes en Distribución...".
    - **Sidebar**: Reducido el ancho de la barra lateral (`w-40`) y el gap (`gap-6`) para maximizar el espacio de la grilla principal.
    - **Product Grid**: Ajustado gap a (`gap-3`) y configurada como totalmente responsiva (2 -> 5 columnas).
- **Componentes**:
    - **Filtros Sidebar**: Reemplazado diseño estático por **Acordeón Animado** en la sección de marcas (transitions de `max-h` y `opacity`).
    - **ProductCard**: Eliminado padding interno de imagen (`object-cover` + edge-to-edge) para maximizar impacto visual.
    - **SectorHero**: Ajustado padding de la "Caja Negra" del título (`px-4/8`) y limitado su ancho (`max-w-4xl`) para evitar márgenes antiestéticos en pantallas grandes.

### Módulo Blog Técnico (`/blog`)
- **Estructura**: Implementada página base con diseño enfocado en contenido.
- **Componentes**:
    - **Header**: Adaptado el estilo visual de "Marcas Destacadas" (Fuente Sans 55px + Barra Amarilla).
    - **Toolbar**: Buscador en tiempo real y Filtros por categoría (Tags) integrados.
    - **ArticleCard**: Card limpia con imagen 4:3, Título Outfit y Botón CTA verde.
    - **Datos**: Mock data centralizada en `src/data/articles.ts` con integración de imagen placeholder abstracta generada.
    
### Módulo Bolsa de Trabajo (`/trabaja-con-nosotros`)
- **Página**: Layout de dos columnas (Información + Formulario).
- **Formulario**: `JobApplicationForm` con validación completa y feedback de éxito simulado.
- **Componentes**: 
    - `FileUpload`: Zona de Drop con validación de tipo (PDF/Word) y tamaño (5MB).
    - **Ajuste Visual**: El subtítulo informativo se simplificó a negro y peso normal (`font-normal text-black`) a petición del usuario.

### Módulo Promociones (`/promociones`)
- **Arquitectura**: Landing modular gestionada por bloques dinámicos (preparada para CMS).
- **Datos**: `src/data/promo-layout.ts` define un array `promoBlocks` con tipos "grid" y "banner".
- **Componentes**:
    - `PromoBanner`: Feature section estilo Apple (imagen + texto + CTA con orientación).
    - `PromoGrid`: Wrapper que renderiza `ProductCard` según un array de IDs.
- **Página**: Itera sobre `promoBlocks` y renderiza dinámicamente, sin orden hardcodeado.

## Sesión: 2026-01-09

### Página Empresa (`/empresa`)
- **Creada**: `src/app/empresa/page.tsx`
- **Diseño**: Z-pattern con bloques alternados (imagen-texto)
- **Secciones**: Trayectoria, Visión, Misión
- **Estilos**: Títulos `font-normal`, márgenes `px-8 lg:px-24`, imágenes `w-5/12`
- **Assets**: `/assets/images/empresa/trayectoria.png`, `vision.png`

### Página Contáctenos (`/contacto`)  
- **Creada**: `src/app/contacto/page.tsx`
- **Componente**: `src/components/contacto/ContactForm.tsx` (formulario con estado)
- **Layout**: Grid 12 columnas (7 form + 5 info), mapa full-width debajo
- **Mapa**: Google Maps iframe real (Juan Sebastián Elcano 1910, Hualpén)
- **Info Cards**: Dirección, Teléfono, Email, Horarios

### Componente PageTitle
- **Creado**: `src/components/ui/PageTitle.tsx`
- **Propósito**: Estilo unificado para títulos de página
- **Estilo**: Fuente Outfit 55px, barra amarilla 176px x 5px

### Header Actualizado
- **CTA Button**: Enlaza a `/contacto`, texto "CONTACTENOS"
- **Smart Sticky**: Se oculta al bajar, reaparece al subir (scroll direction detection)
- **Navegación**: Enlace "Empresa" actualizado a `/empresa`
- **Archivo**: `src/components/layout/Header.tsx`

### Footer Actualizado
- **Navegación**: Enlace "Empresa" actualizado a `/empresa`
- **Archivo**: `src/components/layout/Footer.tsx`

---

## Convenciones Establecidas
- **Títulos de página**: Usar `<PageTitle>` component
- **Márgenes de contenido**: `px-8 lg:px-24` para páginas internas
- **Imágenes generadas**: Consultar usuario antes de usar generate_image
- **Enlaces**: Verificar siempre que los enlaces `href` apunten a rutas reales y no `#`.
