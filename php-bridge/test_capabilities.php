<?php
/**
 * Script de diagnóstico — DESHABILITADO en producción.
 *
 * Para usar: cambiar $ENABLED = false a $ENABLED = true temporalmente,
 * ejecutar las pruebas, y volver a false inmediatamente.
 * El acceso HTTP está bloqueado por .htaccess.
 */
$ENABLED = false;
if (!$ENABLED) {
    http_response_code(403);
    exit('Acceso denegado.');
}

ini_set('display_errors', 0);
error_reporting(0);

echo "<h1>Servidor de Diagnóstico de Bienek</h1>";
echo "<p>Versión PHP: " . phpversion() . "</p>";

// 1. Check curl
if (function_exists('curl_init')) {
    echo "<p style='color:green'>✅ CURL está habilitado.</p>";
} else {
    echo "<p style='color:red'>❌ CURL NO está habilitado (necesario para Turnstile).</p>";
}

// 2. Check Mail
echo "<h2>Prueba de Correo</h2>";
echo "<p>Intentando enviar correo de prueba a postulaciones.web@bienek.cl...</p>";

$to = "postulaciones.web@bienek.cl"; // Replace if needed
$subject = "Prueba de Diagnóstico - " . date("H:i:s");
$message = "Si recibes esto, la función mail() de PHP funciona correctamente.";
$headers = "From: no-reply@bienek.cl\r\n" .
    "Reply-To: no-reply@bienek.cl\r\n" .
    "X-Mailer: PHP/" . phpversion();

$success = mail($to, $subject, $message, $headers);

if ($success) {
    echo "<p style='color:green'>✅ La función mail() devolvió TRUE. El correo debería llegar en breve.</p>";
} else {
    echo "<p style='color:red'>❌ La función mail() devolvió FALSE. Contactar a soporte de hosting.</p>";
}

echo "<h2>Verificación de Permisos</h2>";
echo "<p>Script ejecutándose como usuario: " . get_current_user() . "</p>";
?>