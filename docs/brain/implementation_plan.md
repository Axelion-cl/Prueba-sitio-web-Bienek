# Plan de Construcción Sitio Web Bienek

Este documento detalla la estrategia de construcción modular y progresiva del sitio web, junto con una recomendación para la asignación de agentes especializados.

## Estrategia de Agentes (Roles Recomendados)

Para optimizar el desarrollo, sugiero dividir el trabajo en roles especializados que pueden ser asumidos por distintos agentes (o instrucciones específicas al mismo agente):

1.  **Agente Arquitecto (Lead)**:
    *   **Responsabilidad**: Visión global, configuración del repositorio, integración de tecnologías (Next.js + Supabase), manejo del estado global, y revisión de coherencia.
    *   **Tarea Principal**: Setup inicial, definiciones de tipos globales, configuración de Auth y Base de Datos.

2.  **Agente Frontend (UI/UX)**:
    *   **Responsabilidad**: "Pixel Perfect", animaciones, diseño responsive y estética.
    *   **Tarea Principal**: Crear componentes reutilizables (Botones, Tarjetas, Heros), implementar Tailwind según el Design System (Colores, Fuentes), y maquetar las páginas.

3.  **Agente de Datos (Backend Focus)**:
    *   **Responsabilidad**: Esquema de base de datos, Server Actions, API routes, lógica de filtrado y búsqueda.
    *   **Tarea Principal**: Conectar la grilla de productos con Supabase, lógica del carrito de preferencias y autenticación.

## Fases de Construcción (Roadmap)

Se propone construir el sitio en 5 fases secuenciales para asegurar estabilidad antes de avanzar.

### Fase 1: Cimientos y Sistema de Diseño
*Objetivo: Tener la estructura base y los elementos visuales listos.*
- [x] **Setup del Proyecto**: Inicializar Next.js, TypeScript, Tailwind CSS.
- [x] **Configuración de Estilos**: Definir colores (Amarillo #ECEC00, etc.) y tipografía (Outfit) en `globals.css` / Config.
- [x] **Componentes Globales**: Implementar `Header` (con variantes de sesión), `Footer` y `Layout` principal.
- [ ] **Infraestructura DB**: Configuración inicial del proyecto en Supabase (Tablas básicas).

### Fase 2: Identidad y Páginas Estáticas Core
*Objetivo: Tener la "cara visible" del sitio funcionando.*
- [/] **Página de Inicio (Home)**: Hero Section, Carrusel de Marcas, Cards de Valor.
- [ ] **Página Empresa (Sobre Nosotros)**: Estructura de bloques alternados.
- [ ] **Página Contáctenos**: Formulario visual (sin backend complejo aún) y mapa.
- [ ] **Verificación**: Asegurar responsive en Desktop y Mobile para estas páginas.

### Fase 3: Catálogo y Soluciones (El Core del Negocio)
*Objetivo: Que los productos sean navegables y buscables.*
- [/] **Componentes de Producto**: `ProductCard` (Grid y List view).
- [/] **Página de Soluciones (Template Sectorial)**: Crear la plantilla dinámica para los 12 sectores.
    - **Estrategia Técnica:** Usar Ruta Dinámica `app/soluciones/[slug]/page.tsx`.
    - **SEO - CRÍTICO:** Implementar `generateStaticParams` para generar las 12 páginas estáticas (SSG) en build time. Esto crea 12 URLs físicas independientes (ej: `/soluciones/salud`, `/soluciones/educacion`) con sus propios metadatos (`generateMetadata`), fundamental para Google.
- [ ] **Buscador y Filtros**: Implementar la lógica de búsqueda en tiempo real y filtros laterales.
- [ ] **Página de Detalle de Producto**: Hero de producto, descripción y carrusel de sugerencias.

### Fase 4: Funcionalidad de Usuario (Cliente)
*Objetivo: Convertir visitantes en leads calificados.*
- [ ] **Sistema de Autenticación**: Login y Registro con Supabase Auth.
- [ ] **Mi Cuenta**: Panel de usuario con pestañas (Perfil, Mis Ordenes, Mis Productos).
- [ ] **Lógica de "Carrito de Preferencias"**: Permitir agregar/eliminar productos y enviar cotización.

### Fase 5: Contenido y Expansión
*Objetivo: Agregar valor agregado y SEO.*
- [ ] **Blog Técnico**: Listado de artículos y página de lectura.
- [ ] **Bolsa de Trabajo**: Formulario de postulación y carga de archivos.
- [ ] **Promociones**: Página de ofertas con filtros específicos.

## Próximos Pasos Inmediatos (Fase 1)
1.  Inicializar repositorio y proyecto Next.js.
2.  Configurar Tailwind con la paleta de colores Bienek.
3.  Crear el componente `Header` responsive.
