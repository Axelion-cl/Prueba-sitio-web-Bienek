# Tareas: Contextualización y Planificación Sitio Web Bienek

- [/] Leer documentación del PRD <!-- id: 0 -->
    - [x] Leer Requisitos generales (Requisitos, Tech Stack, Texto y Colores) <!-- id: 1 -->
    - [x] Leer detalles de cada sección (Inicio, Soluciones, Productos, etc.) <!-- id: 2 -->
    - [x] Analizar referencias visuales (Imágenes/Figma) <!-- id: 9 -->
- [x] Crear Plan de Construcción por Fases <!-- id: 3 -->
    - [x] Definir fases lógicas de desarrollo <!-- id: 4 -->
    - [x] Priorizar funcionalidades <!-- id: 5 -->
- [x] Definir Asignación de Agentes <!-- id: 6 -->
    - [x] Estructurar roles de agentes para el proyecto <!-- id: 7 -->
    - [x] Crear prompts optimizados para Agentes (Frontend/Datos) <!-- id: 10 -->
- [x] Documentar Plan Maestro y solicitar aprobación <!-- id: 8 -->
- [x] Configurar Cerebro del Proyecto (Docs centralizados) <!-- id: 11 -->
- [x] Auditoría de Infraestructura y Límites (Vercel, Supabase, Resend) <!-- id: 91 -->
- [x] Investigación de Alternativas de Hosting Comercial <!-- id: 92 -->
- [x] Configuración de Estrategia Híbrida (Static Export + Supabase Cloud) <!-- id: 94 -->
- [x] Implementar Puente PHP para Servicios de Backend (Resend Email) <!-- id: 95 -->
- [x] Investigación de Backend en cPanel (Alternativa Supabase) <!-- id: 94 -->
- [x] Definición de Esquema SQL y RLS (Supabase) <!-- id: 103 -->

# Progreso de Construcción (Auditoría: 09/01)

### Fase 1: Cimientos y Setup (100% Completo)
- [x] Setup Next.js + Tailwind <!-- id: 13 -->
- [x] Header y Footer Componentes <!-- id: 14 -->
- [x] Configuración de Estilos Globales <!-- id: 22 -->

### Fase 2: Páginas Core (En Progreso)
- [x] Página Inicio (Home) <!-- id: 16 -->
    - [x] Hero, Value Cards, Brand Carousel, Solutions Grid
- [x] Página Empresa (Sobre Nosotros) <!-- id: 23 -->
- [x] Página Contáctenos <!-- id: 24 -->

### Fase 3: Soluciones y Catálogo (Completado)
- [x] Plantilla de Soluciones (Rutas Dinámicas `[slug]`) <!-- id: 18 -->
- [x] Datos Centralizados (`src/data`) <!-- id: 20 -->
- [x] Página Detalle de Producto (`[id]`) (En Progreso) <!-- id: 25 -->
    - [x] Ruta Dinámica `src/app/productos/[id]/page.tsx` <!-- id: 29 -->
    - [x] Componente `ProductDetail` con información visual <!-- id: 30 -->
- [x] Buscador y Filtros Avanzados (En Progreso) <!-- id: 26 -->
    - [x] **Header:** Buscador "Quick Search" con Dropdown (Sin página de resultados) <!-- id: 33 -->
    - [x] **Soluciones:** Sidebar de Filtros (Lógica Cliente) <!-- id: 32 -->

### Proyección de Metas (Fases 4-6)

#### Fase 4: Expansión de Contenido y Marketing (Completado) <!-- id: 28 -->
- [x] Blog Técnico <!-- id: 60 -->
- [x] Bolsa de Trabajo <!-- id: 61 -->
- [x] Promociones <!-- id: 62 -->

#### Fase 5: Ecosistema Cliente (Auth & B2B) - COMPLETADO <!-- id: 27 -->
- [x] **Autenticación (Mock Auth - Supabase Pospuesto)** <!-- id: 40 -->
    - [x] Contexto de Auth (`src/context/AuthContext.tsx`) <!-- id: 74 -->
    - [x] Página de Login "Acceso Clientes" <!-- id: 41 -->
    - [x] Mock de Usuarios (`src/data/mockUsers.ts`) <!-- id: 75 -->
- [x] **Experiencia Logged-In** <!-- id: 44 -->
    - [x] Header Personalizado (Nombre + Carrito + Salir) <!-- id: 45 -->
    - [x] Mi Cuenta (Dashboard con Tabs) <!-- id: 47 -->
        - [x] Mis Productos (Carrito) <!-- id: 48 -->
        - [x] Mis Ordenes (Historial) <!-- id: 49 -->
        - [x] Mi Perfil (Datos y Password) <!-- id: 50 -->
- [x] **Carrito (CartContext + Contador Header)** <!-- id: 81 -->

#### Fase 6: Internacionalización (i18n) - Selector de Idioma (Faltan algúnos detalles.) <!-- id: 76 -->
- [x] Implementar cambio de idioma Español/Inglés funcional <!-- id: 77 -->
    - [x] Selector en header (barra negra) conectado a LanguageContext <!-- id: 78 -->
    - [ ] Todo el texto del sitio (Header, Footer, Home, Auth, Dashboard, ProductCards) cambia dinámicamente <!-- id: 79 -->
    - [x] Persistir preferencia de idioma (localStorage) <!-- id: 80 -->

#### Fase 7: Administración (CRM Interno) <!-- id: 34 -->
- [x] **Seguridad Admin** (Implementado con AdminGuard y layout dedicado) <!-- id: 35 -->
    - [x] Login Admin y Middleware de Protección <!-- id: 89 -->
- [/] **Gestión de Catálogo** <!-- id: 63 -->
    - [x] CRUD Productos (Listado, Búsqueda, Edición) <!-- id: 36 -->
    - [x] Carga Masiva de Productos (Wizard de Importación) <!-- id: 82 -->
    - [x] Gestión de Etiquetas (Muli-Select, CRUD independiente) <!-- id: 37 -->
        - [x] Soporte para Distintivos (Badges: Oferta, Nuevo, etc.) <!-- id: 83 -->
        - [x] Configuración "Familias Destacadas" por Sector (Hover Home) <!-- id: 93 -->
- [x] **Gestión de Clientes (CRM)** <!-- id: 38 -->
    - [x] Listado de Clientes <!-- id: 52 -->
        - [x] Lista de potenciales clientes (personas que han llenado formulario de "Contactanos") <!-- id: 84 -->
            - [ ] Convertir a Cliente Actual <!-- id: 85 -->
                - [ ] Botón para Generar Credenciales (Email del cliente + Contraseña temporal) <!-- id: 54 -->
                - [ ] Integración Email mediante PHP Bridge (SMTP Mundo Hosting) para envío de plantilla corporativa <!-- id: 90 -->
        - [x] Lista de clientes actuales (personas que el admin a registrado desde la lista de potenciales clientes o manualmente) <!-- id: 86 -->
            - [x] Gestión de Usuarios (Editar/Eliminar) <!-- id: 55 -->
            - [x] Botón para resetear contraseña (genera una nueva contraseña temporal y la envía al correo del cliente). <!-- id: 87 -->
            - [x] Botón para acceder a lista de Ordenes de Cliente por fecha de creación <!-- id: 57 -->
                - [x] Al hacer clic en una orden, te lleva a una pagina que muestra una lista de los productos asociados a esa orden.  <!-- id: 88 -->
<br>

#### Fase 8: Autonomía y Persistencia Real (De Mocks a DB) <!-- id: 96 -->
- [ ] Sincronización de CRUD de Productos con Supabase (vía Cliente Directo) <!-- id: 97 -->
- [ ] Implementación de Storage para imágenes de productos (SOLO IMÁGENES) <!-- id: 101 -->
- [ ] Activación de Importador Masivo con persistencia real <!-- id: 98 -->
- [ ] Conexión de "Familias Destacadas" y Sectores a la DB <!-- id: 99 -->
- [ ] Sincronización de CRM (Leads/Clientes) con almacenamiento real <!-- id: 100 -->
- [ ] Sincronización de CRM (Leads/Clientes) con almacenamiento real <!-- id: 100 -->
- [x] **Desplegar Puente PHP en Hostinger** (Nueva Estrategia) <!-- id: 104 -->
    - [x] Crear "Custom PHP/HTML website" en Hostinger <!-- id: 105 -->
    - [x] Crear carpeta `api-bienek` en `public_html` <!-- id: 106 -->
    - [x] Subir `php-bridge/email.php` <!-- id: 107 -->
    - [x] Actualizar `.env.local` con `PHP_BRIDGE_URL` (`https://axelion.cl/api-bienek/email.php`) <!-- id: 108 -->
- [x] **Implementar Formulario "Trabaja con Nosotros"** <!-- id: 109 -->
    - [x] Actualizar Schema DB: Tabla `applications` (o similar) y RLS <!-- id: 110 -->
    - [x] Actualizar `php-bridge/email.php` para soportar diferentes tipos de email (Contacto vs Postulación) <!-- id: 111 -->
    - [x] Crear Server Action `submitApplication` <!-- id: 112 -->
    - [x] Conectar Formulario de UI con Server Action <!-- id: 113 -->
- [x] **Migración a Arquitectura Estática (Mundo Hosting/cPanel)** <!-- id: 114 -->
    - [x] Configurar `next.config.mjs` con `output: 'export'` <!-- id: 115 -->
    - [x] Refactorizar `ContactForm` (Eliminar Server Action -> Client Fetch) <!-- id: 116 -->
    - [x] Refactorizar `JobApplicationForm` (Eliminar Server Action -> Client Fetch) <!-- id: 117 -->
    - [x] Configurar `loader` de imágenes para exportación estática (`unoptimized: true`) <!-- id: 118 -->
    - [x] Implementar Protección Spam (Cloudflare Turnstile) <!-- id: 119 -->
- [ ] Documentación de Autonomía para el Cliente (Manual de Uso Admin) <!-- id: 102 -->

---

## Refinamientos y Mejoras (Enero 2026)

### Mejoras Visuales y UX
- [x] **Rediseño de Value Cards (Home)** <!-- id: 120 -->
    - [x] Reemplazo de iconos por imágenes fotográficas de fondo
    - [x] Implementación de overlay con gradiente para legibilidad
    - [x] Efecto hover con zoom
    - [x] Ajuste de altura (reducción de 120px)
- [x] **Profesionalización de Formularios** <!-- id: 121 -->
    - [x] Actualización de placeholders en ContactForm
    - [x] Eliminación de negrita en botones de envío
    - [x] Unificación de subtítulo en página Contacto

### Funcionalidades de Cliente
- [x] **Gestión de Pedidos desde Mi Cuenta** <!-- id: 122 -->
    - [x] Botón "Contactar Vendedor" (Genera Excel automático con productos de interés)
    - [x] Botón "Adjuntar Listado de Compra" (Upload de archivos PDF/Excel/Word)
    - [x] Integración con php-bridge para envío de cotizaciones
    - [x] Instalación de librería `xlsx` para generación de archivos

### Mejoras de Arquitectura
- [x] **Separación de Sesiones Admin/Usuario** <!-- id: 123 -->
    - [x] Refactorización de `AuthContext` con `storageKey` configurable
    - [x] Implementación de sesiones independientes (localStorage)
    - [x] Actualización de Admin Layout con AuthProvider aislado

### Correcciones de Textos y Copy
- [x] **Actualización de Textos (Trabajo/Contacto)** <!-- id: 124 -->
    - [x] Cambio "unirte" → "unirse" en Bolsa de Trabajo
    - [x] Cambio "distribución industrial" → "distribución B2B"
    - [x] Eliminación de "Beneficios de salud complementarios"
    - [x] Cambio "Mis Productos" → "Mis Productos de interés"

### Backend y Seguridad
- [x] **Debugging de Email Bridge** <!-- id: 125 -->
    - [x] Corrección de .htaccess bloqueante en Hostinger
    - [x] Implementación de tipo "order" en email.php
    - [x] Bypass de Turnstile para acciones autenticadas
    - [x] Hardcoding de destinatario de correos (marketing@bienek.cl)
- [ ] **Seguridad de Usuario** <!-- id: 126 -->
    - [ ] Refactorizar cambio de contraseña con validación de contraseña actual y estado controlado <!-- id: 127 -->
- [ ] **Seguridad de Usuario** <!-- id: 126 -->
    - [ ] Refactorizar cambio de contraseña con validación de contraseña actual y estado controlado <!-- id: 127 -->
