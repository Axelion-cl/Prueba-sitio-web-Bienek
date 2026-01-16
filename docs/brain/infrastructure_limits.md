# Infraestructura y Límites del Proyecto (Free Tier 2025)

Este documento detalla los límites operativos de la infraestructura actual bajo los planes gratuitos ("Hobby" / "Free Tier"). Es vital monitorear estas métricas para planificar la escalabilidad futura.

## 1. Frontend & Hosting: Vercel
**Uso:** Hosting de Next.js, Serverless Functions, CDN.

### Plan Hobby (Gratis / Personal)
*   **Ancho de Banda:** 100 GB/mes.
*   **Duración Función:** 10 - 60 segundos.
*   **Optimización Imágenes:** 1,000 imágenes fuente.
*   **Uso Comercial:** ❌ PROHIBIDO.

### Plan Pro ($20 USD / mes por usuario)
*   **Ancho de Banda:** **1 TB (1,000 GB)** incluido. ($0.15/GB adicional).
*   **Duración Función:** Hasta **300 - 800 segundos** (Ideal para procesos largos).
*   **Edge Requests:** 10 Millones incluidos.
*   **Builds:** 12 builds simultáneas (más rápido el despliegue).
*   **Optimización Imágenes:** ~2,500 - 5,000 imágenes fuente.
*   **Uso Comercial:** ✅ PERMITIDO.

---

## 2. Base de Datos & Auth: Supabase (Free Tier)
**Uso:** PostgreSQL, Autenticación, Almacenamiento de archivos.

| Recurso | Límite | Impacto / Riesgo |
| :--- | :--- | :--- |
| **Base de Datos (Storage)** | **500 MB** | Medio/Alto. Texto y números ocupan poco, pero si guardamos logs masivos o JSONs grandes, se llena. |
| **Usuarios Activos (MAU)** | **50,000 MAUs** | Bajo. Es un límite generoso para B2B. Difícil de alcanzar a corto plazo. |
| **Storage (Archivos)** | **1 GB** | Alto. Aquí se guardan las imágenes de productos y PDFs (CVs). Necesitaremos monitorear esto cerca. |
| **File Upload Size** | 50 MB por archivo | Suficiente para imágenes y PDFs. |
| **Pausa por Inactividad** | **7 Días** | Medio. Si nadie usa la DB en 7 días, se "pausa" (se apaga). El primer request después de eso tardará unos segundos en "despertarla". |

---

## 3. Email Transaccional: Resend (Free Tier)
**Uso:** Envío de credenciales, notificaciones, recuperación de contraseña.

| Recurso | Límite | Impacto / Riesgo |
| :--- | :--- | :--- |
| **Emails Mensuales** | **3,000 Correos** | Bajo/Medio. Suficiente para ~100 envíos diarios promedio. Si el negocio escala, será el primer servicio en requerir pago ($20/mes por 50k). |
| **Emails Diarios** | **100 Correos/Día** | **Alto (Botella de Cuello).** Si tienes una carga masiva de 200 clientes en un día, fallarán la mitad. |
| **Dominios** | 1 Dominio | Suficiente para `bienek.cl`. |

---

## Resumen y Recomendaciones de Escalabilidad

### 🚨 Puntos Críticos (Cuellos de Botella Inmediatos)
1.  **Límite Diario de Resend (100/día):** Si planeas cargar masivamente 500 clientes el día del lanzamiento, el envío de credenciales fallará.
    *   *Plan de Acción:* Hacer la carga en lotes de 90/día o actualizar a Resend Pro ($20/mes) solo para el mes de lanzamiento.
2.  **Vercel Uso Comercial:** Debemos revisar los términos exactos. Si Bienek es una empresa facturando, lo correcto éticamente y legalmente es migrar a Vercel Pro eventualmente.

### 💰 Costos Proyectados (Si se superan límites)
*   **Escalón 1 (Email):** Resend Pro -> **$20 USD/mes**.
*   **Escalón 2 (Hosting):** Vercel Pro -> **$20 USD/mes**.
*   **Escalón 3 (Base de Datos):** Supabase Pro -> **$25 USD/mes**.

**Costo Total Operativo (Escenario Pro): ~$65 USD/mes.**
Por ahora, en fase de desarrollo y piloto: **$0 USD.**
