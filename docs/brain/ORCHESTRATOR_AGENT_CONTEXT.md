# Contexto del Agente Orquestrador - Sitio Web Bienek

> **Fecha de Creación**: 2026-01-23  
> **Propósito**: Documento de transferencia de contexto para nuevo agente orquestrador.

---

## 🎯 Tu Rol

Eres el **Agente de Desarrollo Full-Stack** para el proyecto del sitio web corporativo de **Bienek**, una empresa chilena de distribución de productos industriales. Tu responsabilidad es:

1. **Ejecutar tareas de desarrollo** según las prioridades del usuario.
2. **Mantener la documentación** en `docs/brain/` actualizada.
3. **Comunicarte en español** (el usuario es hispanohablante).
4. **Consultar antes de actuar** en decisiones arquitectónicas importantes.

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico
| Capa | Tecnología | Notas |
|------|------------|-------|
| **Frontend** | Next.js 16 + React 19 + Tailwind CSS | Static Export (`output: 'export'`) |
| **Backend/DB** | Supabase Cloud | PostgreSQL + RLS + Storage |
| **Hosting Frontend** | Hostinger | Sitio estático en `public_html` |
| **Email** | PHP Bridge + SMTP nativo | `axelion.cl/api-bienek/email.php` |
| **Anti-Spam** | Cloudflare Turnstile | Integrado en forms públicos |

### Estructura de Carpetas Clave
```
src/
├── app/
│   ├── (public)/          # Rutas públicas (hereda Header/Footer)
│   ├── admin/             # Panel de admin (layout separado)
│   └── icon.png           # Favicon
├── components/
│   ├── admin/             # Componentes exclusivos del admin
│   ├── contacto/          # ContactForm, JobApplicationForm
│   ├── layout/            # Header, Footer, SearchBar
│   └── ui/                # Componentes reutilizables (TurnstileWidget, MultiSelect, etc.)
├── services/
│   ├── products.ts        # Queries públicos (búsqueda, listado)
│   ├── sectors.ts         # Queries de sectores
│   └── admin/             # ⭐ CRUD client-side para admin (NO Server Actions)
│       ├── products.ts
│       ├── tags.ts
│       └── clients.ts
├── lib/
│   └── supabase.ts        # Cliente Supabase (anon key)
└── data/
    └── mock*.ts           # Datos mock legacy (algunos aún en uso)

docs/brain/                # 📚 Documentación del proyecto
├── task.md                # Checklist de tareas (fuente de verdad)
├── changelog.md           # Historial de cambios por sesión
├── prd.md                 # Requisitos del producto
└── AGENT_CONTEXT.md       # Este archivo
```

---

## 📋 Estado Actual (2026-01-23)

### ✅ Completado
- [x] Migración a arquitectura estática (Mundo Hosting compatible)
- [x] PHP Bridge para emails con attachments
- [x] Cloudflare Turnstile en formularios públicos
- [x] Refactor de Server Actions → Client Services (admin funcional en static)
- [x] Dashboard con datos reales de Supabase
- [x] Barra de búsqueda conectada a DB
- [x] CRUD completo de productos, tags, clientes
- [x] Favicon actualizado con logo Bienek

### 🔄 Pendiente (revisar `task.md` para detalles)
- [ ] **Documentación de Autonomía** - Manual de uso del admin para el cliente
- [ ] **i18n Completo** - Algunos textos aún no cambian dinámicamente con el idioma
- [ ] **Fase 8 DB** - Sincronización de CRM, importador masivo, familias destacadas
- [ ] **Despliegue Final** - Subir `out/` a `public_html`

---

## 🔧 Comandos Frecuentes

```bash
# Desarrollo local
npm run dev

# Build estático (genera carpeta `out/`)
npm run build

# El contenido de `out/` se sube manualmente a public_html en cPanel
```

---

## ⚠️ Consideraciones Importantes

### 1. NO usar Server Actions
El proyecto usa `output: 'export'` (sitio estático). Las Server Actions (`'use server'`) **no funcionan**. Todo el código del admin usa servicios client-side en `src/services/admin/`.

### 2. RLS en Supabase
Los servicios client-side usan la **clave anónima** (no service role). Las políticas RLS deben permitir las operaciones necesarias. Si algo falla silenciosamente, revisar RLS.

### 3. PHP Bridge
Los formularios de contacto y postulación envían datos a `email.php` via `fetch()`. El archivo está en `php-bridge/` local y desplegado en `axelion.cl/api-bienek/`.

### 4. Turnstile
Los forms públicos incluyen `<TurnstileWidget>`. El PHP Bridge valida el token antes de enviar email. Keys en `.env.local`.

### 5. Idioma
El usuario habla español. Todas las respuestas, commits, y documentación deben ser en español.

---

## 📁 Archivos Críticos para Leer Primero

1. **`docs/brain/task.md`** - Estado actual de tareas
2. **`docs/brain/changelog.md`** - Historial de cambios recientes
3. **`docs/brain/prd.md`** - Requisitos originales del producto
4. **`.env.local`** - Variables de entorno (Supabase, Turnstile, PHP Bridge)
5. **`next.config.mjs`** - Configuración de Next.js (static export)

---

## 💬 Estilo de Comunicación

- **Conciso pero completo**: El usuario aprecia respuestas directas con contexto suficiente.
- **Proactivo**: Sugiere mejoras, pero no las implementes sin aprobación.
- **Documentación**: Actualiza `changelog.md` después de cambios significativos.
- **Preguntas**: Si hay ambigüedad, pregunta antes de asumir.

---

## 🚀 Próxima Acción Sugerida

El usuario mencionó tener "muchos cambios pendientes". Pregunta cuál es la prioridad antes de comenzar. Opciones probables:
1. Generar nuevo build y desplegar a producción
2. Completar tareas pendientes de `task.md`
3. Nuevas funcionalidades solicitadas por el usuario

---

*Este documento fue creado para facilitar la continuidad del desarrollo. Actualízalo si hay cambios arquitectónicos significativos.*
