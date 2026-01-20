# Informe de Investigación: Estrategia de Implementación y Hosting (Actualizado)

Este documento responde a las dudas sobre la implementación del sitio web de Bienek considerando un entorno sin backend dinámico en el hosting pero con necesidades de base de datos.

## 1. Funcionamiento del Backend

### Estrategia A: "Serverless Forms"
Uso de servicios externos (Formspree, EmailJS). Ideal para simplicidad extrema pero limitado en archivos adjuntos en capas gratuitas.

### Estrategia B: "PHP Bridge" (Nativo Mundohosting)
Crear un pequeño script PHP en tu servidor que procese los formularios y envíe correos usando tus cuentas corporativas (vía SMTP o `mail()`).
*   **Ventaja:** Costo $0, sin límites externos, total privacidad.
*   **Ideal para:** Contacto y Bolsa de Trabajo.

### Estrategia C: "Híbrida" (Hosting Estático + Supabase Cloud)
Es totalmente posible combinar ambos mundos.
*   **Cómo funciona:** Subes tu sitio Next.js como "Estático" a Mundohosting. Los archivos JS que corren en el navegador del cliente se conectan directamente a la URL de tu proyecto en la nube de Supabase.
*   **Ventaja:** Mantienes la potencia de Supabase (Auth, DB, Storage) sin tener que programar una API en PHP. La experiencia de desarrollo es mucho más rápida.
*   **Seguridad:** Como no hay código de servidor en Mundohosting, la seguridad depende 100% de las **RLS (Row Level Security)** de Supabase. Esto asegura que aunque alguien vea tus llaves públicas, no pueda borrar o ver datos ajenos.
*   **Limitación:** Sigues sujeto a los límites del plan gratuito de Supabase (ej: pausa por inactividad de 7 días).

## 2. Hosting y Dominio

- **Mundohosting (Plan Actual):** Perfectamente compatible con Next.js vía **Static Export** (`output: 'export'`).
- **Dominio:** `www.bienek.cl` apunta a Mundohosting, y el sitio estático se comunica con Supabase Cloud por detrás.

## 3. Recomendación Final

Para el lanzamiento rápido que pide tu jefe:
1.  **Hosting:** Mundohosting (ya está pagado).
2.  **Tecnología:** Next.js Static Export.
3.  **Backend:** 
    - Si quieres velocidad de desarrollo y ya tienes bases en Supabase: **Estrategia C (Híbrida)**.
    - Si quieres evitar que la base de datos se "puse" por inactividad o quieres control total: **Estrategia B (PHP nativo)**.

***
*Nota sobre Resend:* Si decidimos usar Resend, la clave API debe manejarse a través de un puente PHP en el servidor para no exponerla en el código estático frontal.
