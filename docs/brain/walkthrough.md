# Walkthrough: Flujo de Recuperación y Seguridad de Contraseñas

## Cambios Realizados

### 1. Componentes UX y Seguridad
- **`PasswordInput` Reutilizable:** Se creó un componente unificado para inputs de contraseña que incluye el botón "ojito" para mostrar/ocultar caracteres.
    - Implementado en: Login Usuario, Login Admin, Mi Perfil, Modal Borrar Cliente, Guard de Reset.
- **Atributos de Autocompletado:** Se añadieron atributos `name`, `id` y `autoComplete` correctos para mejorar la integración con gestores de contraseñas de navegadores.

### 2. Flujo de Recuperación ("Olvidé mi contraseña")
Se implementó el flujo estándar de Supabase para reset de passwords vía email.
- **Página de Solicitud (`/recuperar-password`):** Formulario para ingresar email y detonar el envío del correo de recuperación.
- **Página de Actualización (`/actualizar-password`):** Landing page segura donde aterriza el usuario tras hacer clic en el email. Detecta el evento `PASSWORD_RECOVERY` de Supabase y permite establecer una nueva clave.
- **Servicio `auth.ts`:** Nueva función `requestPasswordReset` que maneja `supabase.auth.resetPasswordForEmail` con redirección correcta.

### 3. Seguridad Reforzada
- **`PasswordResetGuard`:** Componente que intercepta la navegación. Si un usuario tiene el flag `must_change_password` (ej. credencial temporal), lo obliga a cambiar su clave antes de continuar.
- **Validación en "Mi Perfil":** Refactorización para exigir la contraseña actual antes de permitir cambios, preveniendo accesos no autorizados en sesiones activas.

## Verificación

### Cómo probar el Flujo de Recuperación
1. Ir a `/login` y hacer clic en "¿Olvidaste tu contraseña?".
2. Ingresar un email registrado (ej. `mi.email@ejemplo.com`) y enviar.
3. Verificar la recepción del correo (en producción requiere SMTP de Mundo Hosting; en desarrollo local revisar logs de Supabase).
4. El link del correo redirigirá a `/actualizar-password`.
5. Ingresar la nueva contraseña y confirmar.
6. Verificar redirección exitosa al perfil/home ya logueado.

### Cómo probar Cambio Forzado (Admin)
1. Como Admin, ir a gestión de clientes y usar "Restablecer Contraseña" para un usuario.
2. Loguearse con ese usuario y la contraseña temporal.
3. Verificar que el sistema impide navegar y muestra el modal de "Cambio de Contraseña Obligatorio".
4. Cambiar la contraseña y verificar acceso normal.
