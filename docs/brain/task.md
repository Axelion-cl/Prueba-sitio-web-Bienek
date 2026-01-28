# Tareas del Proyecto Sitio Web Bienek

## 🎯 Objetivo Actual
Consolidar la plataforma para lanzamiento. El sistema backend (Supabase) ya está conectado y operativo para Productos, Clientes y Configuración. Faltan detalles finales de funcionalidad avanzada (Importador) y documentación.

---

## 🚀 Prioridades Inmediatas (Sprint Actual)

### 1. Funcionalidad Faltante
- [ ] **Importador Masivo Real** (`/admin/products/import`)
    - [ ] Reemplazar lógica simulada (`setTimeout`) con lectura real de Excel (`xlsx`).
    - [ ] Implementar carga de imágenes batch (ZIP) a Supabase Storage.
    - [ ] Conectar a `createProduct` service.

### 2. Documentación y Entrega
- [ ] **Documentación de Autonomía**
    - [ ] Crear manual de usuario para el administrador (PDF o página `/admin/docs`).
    - [ ] Explicar flujo de "Convertir Lead a Cliente".
    - [ ] Explicar gestión de productos y etiquetas.
- [ ] **Limpieza de Código**
    - [ ] Eliminar archivos mock obsoletos (`src/data/mockProducts.ts`, etc) una vez confirmado que nada los usa.
    - [ ] Revisar `console.log` residuales.

### 3. Despliegue Final
- [ ] **Generación de Build de Producción**
    - [ ] Ejecutar `npm run build` para validar integridad.
    - [ ] Verificar configuración de imágenes `unoptimized: true`.
- [ ] **Subida a Hostinger**
    - [ ] Sincronizar carpeta `out/` con `public_html`.

---

## ✅ Logros Recientes (Completado)

### Infraestructura y Backend (Ene 2026)
- [x] **Conexión a Supabase Real**: Migración exitosa de Mocks a DB (PostgreSQL).
- [x] **Sistema de Autenticación Híbrido**: 
    - [x] Roles Admin/Cliente implementados (`user_profiles`).
    - [x] Recuperación de acceso Admin (Script de reparación y verficación MCP).
- [x] **Storage**: Carga de imágenes de productos conectada a Supabase Storage.

### Módulo de Administración (CRM & CMS)
- [x] **Gestión de Productos**: CRUD completo (Crear, Editar, Borrar, Imagen, Relaciones).
- [x] **Gestión de Etiquetas**: Dashboard unificado para Sectores, Familias, Marcas y Distintivos.
- [x] **CRM Clientes**:
    - [x] Tabla de Leads (Formulario Contacto).
    - [x] Conversión Lead -> Cliente (Generación de credenciales).
    - [x] Tabla de Clientes con estado y fecha de registro.

### Frontend Público
- [x] **Catálogo Dinámico**: Home, Soluciones y Búsqueda conectados a datos reales.
- [x] **Formularios**: Contacto y Postulación con protección Anti-Spam (Turnstile) y PHP Bridge.
- [x] **Página de Construcción**: Desarrollo de landing premium temporal para fase de prelanzamiento.
- [x] **Diseño UI/UX**: Mejoras en tarjetas, carruseles y consistencia visual.

---

## 📦 Historial de Fases (Resumen)

| Fase | Estado | Descripción |
|------|--------|-------------|
| **1. Cimientos** | ✅ Completo | Setup Next.js, Tailwind, Estructura base. |
| **2. Páginas Core** | ✅ Completo | Home, Empresa, Contacto. |
| **3. Catálogo** | ✅ Completo | Listados, Filtros, Detalle de Producto. |
| **4. Contenido** | ✅ Completo | Blog Técnico, Bolsa de Trabajo. |
| **5. Clientes** | ✅ Completo | Area privada, Mis Pedidos, Perfil. |
| **6. i18n** | ⚠️ Parcial | Estructura lista, faltan traducciones de contenido dinámico DB. |
| **7. Admin** | ✅ Completo | Panel de control seguro y funcional. |
| **8. Persistencia** | ✅ Completo | Integración Supabase + PHP Bridge. |

---

## 📝 Notas Técnicas
- **Modo Híbrido**: El frontend es estático (`output: 'export'`). No usar Server Actions.
- **PHP Bridge**: Los emails salen por `axelion.cl/api-bienek/email.php`.
- **Base de Datos**: Gestionada via Supabase. Tablas clave: `products`, `user_profiles`, `leads`.
