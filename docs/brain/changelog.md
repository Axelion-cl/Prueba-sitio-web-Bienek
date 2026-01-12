# Registro de Cambios - Sesión de Desarrollo

Este documento registra los cambios implementados durante las sesiones de desarrollo con el agente de código. Sirve como contexto detallado para el agente orquestador.

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
    - **Imagen de Producto**: Aspect ratio ajustado a 4:3.
    - **Layout**: Descripción y Especificaciones movidas a la columna derecha.

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
