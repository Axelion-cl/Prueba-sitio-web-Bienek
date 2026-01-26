<?php
/**
 * Bienek Contact Form Email Bridge
 * 
 * Este script recibe datos del formulario de contacto y envía un correo
 * con formato HTML profesional al equipo de marketing.
 * 
 * Uso: Subir a cPanel y configurar PHP_BRIDGE_URL en .env.local
 */

// Configuración de Errores (para debug, desactivar en producción si se desea)
error_reporting(E_ALL);
ini_set('display_errors', 0); // No mostrar errores en el output para no romper JSON

// Configuración del Correo de Destino
// ¡IMPORTANTE! Cambiar este correo por el real de la empresa
$DESTINATION_EMAIL = 'marketing@bienek.cl';

// CORS headers para permitir solicitudes desde el sitio web (localhost y dominio real)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header('Content-Type: application/json; charset=utf-8');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Configuration
$TURNSTILE_SECRET_KEY = '0x4AAAAAACOOO6Bko1rAU6ph-HgkTwMAUhU'; // Replace with actual secret key

// Verify Turnstile Token
function verifyTurnstile($token, $secretKey)
{
    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $data = [
        'secret' => $secretKey,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE)
        return false;

    $json = json_decode($result, true);
    return isset($json['success']) && $json['success'] === true;
}

// Strict email validation
function isValidEmail($email)
{
    // Basic format check
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    // Email must have @ and domain with TLD
    if (!preg_match('/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/', $email)) {
        return false;
    }

    // Additional checks
    list($localPart, $domain) = explode('@', $email);

    // Domain must have at least one dot
    if (strpos($domain, '.') === false) {
        return false;
    }

    // TLD must be at least 2 characters
    $parts = explode('.', $domain);
    $tld = end($parts);
    if (strlen($tld) < 2) {
        return false;
    }

    return true;
}

// Check token
// Check token (Skip for 'order' type as it is an internal authenticated action)
$type = isset($_POST['type']) ? $_POST['type'] : 'contact';
$token = isset($_POST['cf-turnstile-response']) ? $_POST['cf-turnstile-response'] : null;

if ($type !== 'order') {
    if (!$token || !verifyTurnstile($token, $TURNSTILE_SECRET_KEY)) {
        http_response_code(403);
        echo json_encode(['error' => 'Turnstile validation failed. Please refresh and try again.']);
        exit();
    }
}

// Get form data
$type = isset($_POST['type']) ? $_POST['type'] : 'contact'; // 'contact' or 'application'

// Sanitización básica
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8') : '';
$raw_email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8') : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8') : '';

// Campo dinámico (Empresa o Área)
$field3_value = isset($_POST['d3']) ? htmlspecialchars($_POST['d3'], ENT_QUOTES, 'UTF-8') : ''; // d3 is generic
// Fallback para 'company' antiguo
if (empty($field3_value) && isset($_POST['company'])) {
    $field3_value = htmlspecialchars($_POST['company'], ENT_QUOTES, 'UTF-8');
}

// Etiquetas
$field3_label = ($type === 'application') ? 'Área de Interés' : 'Empresa';

// Validate required fields
if (!$name || !$raw_email) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos (Nombre o Email)']);
    exit();
}

// Validate email strict format
if (!isValidEmail($raw_email)) {
    http_response_code(400);
    echo json_encode(['error' => 'El formato del correo no es válido. Debe ser ej: nombre@dominio.cl']);
    exit();
}

$email = $raw_email;

// Build HTML email
$date = date('d/m/Y H:i');
$title = match ($type) {
    'application' => '🚀 Nueva Postulación',
    'order' => '📦 Nueva Solicitud de Pedido',
    default => '📬 Nueva Consulta de Contacto'
};

$htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background-color: #1a365d; background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); color: #ffffff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; color: #ffffff; }
        .header p { margin: 10px 0 0; opacity: 0.9; font-size: 14px; color: #ffffff; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .field-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .field-value { font-size: 16px; color: #333; padding: 12px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #ecec00; }
        .message-box { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #ecec00; margin-top: 10px; }
        .message-box p { margin: 0; line-height: 1.6; color: #333; white-space: pre-wrap; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .highlight { display: inline-block; background: #ecec00; color: #1a365d; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
        .attachment-notice { background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 8px; padding: 12px; margin-top: 20px; text-align: center; color: #2e7d32; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{$title}</h1>
            <p>Recibido el {$date}</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">Nombre Completo</div>
                <div class="field-value">{$name}</div>
            </div>
            <div class="field">
                <div class="field-label">Correo Electrónico</div>
                <div class="field-value"><a href="mailto:{$email}" style="color: #1a365d;">{$email}</a></div>
            </div>
            <div class="field">
                <div class="field-label">{$field3_label}</div>
                <div class="field-value">{$field3_value}</div>
            </div>
            <div class="field">
                <div class="field-label">Teléfono</div>
                <div class="field-value"><a href="tel:{$phone}" style="color: #1a365d;">{$phone}</a></div>
            </div>
            <div class="field">
                <div class="field-label">Mensaje / Presentación</div>
                <div class="message-box">
                    <p>{$message}</p>
                </div>
            </div>
            {{ATTACHMENT_NOTICE}}
        </div>
        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de <strong>bienek.cl</strong></p>
        </div>
    </div>
</body>
</html>
HTML;

// Check for attachment
$hasAttachment = false;
$attachmentName = '';
$attachmentContent = '';
$attachmentType = '';

if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    $hasAttachment = true;
    $attachmentName = $_FILES['attachment']['name'];
    $attachmentType = $_FILES['attachment']['type'];
    $attachmentContent = file_get_contents($_FILES['attachment']['tmp_name']);

    // Add attachment notice to HTML
    $attachmentNotice = '<div class="attachment-notice">📎 <strong>Archivo adjunto:</strong> ' . htmlspecialchars($attachmentName) . '</div>';
    $htmlBody = str_replace('{{ATTACHMENT_NOTICE}}', $attachmentNotice, $htmlBody);
} else {
    $htmlBody = str_replace('{{ATTACHMENT_NOTICE}}', '', $htmlBody);
}

// Build email with MIME for attachment support
$boundary = md5(time());
if ($type === 'application') {
    $subject = "Nueva Postulación: {$name} - {$field3_value}";
} else {
    $subject = "Nueva consulta de: {$name} - {$field3_value}";
}

$headers = "From: Bienek Web <noreply@axelion.cl>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";

if ($hasAttachment) {
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";

    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$attachmentType}; name=\"{$attachmentName}\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$attachmentName}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($attachmentContent)) . "\r\n";
    $body .= "--{$boundary}--";
} else {
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body = $htmlBody;
}

// Order handling logic
if ($type === 'order') {
    $subject = "Nueva Solicitud de Cotización: {$name}";
    if ($hasAttachment) {
        $subject .= " (Adjunto: {$attachmentName})";
    }
}


// Send email to HARDCODED destination
$success = mail($DESTINATION_EMAIL, $subject, $body, $headers);

if ($success) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Server mail() returned false.']);
}
?>