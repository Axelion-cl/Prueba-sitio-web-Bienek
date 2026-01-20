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
- [ ] Implementación de Puente PHP para Email (Última prioridad) <!-- id: 95 -->
- [ ] Documentación de Autonomía para el Cliente (Manual de Uso Admin) <!-- id: 102 -->
