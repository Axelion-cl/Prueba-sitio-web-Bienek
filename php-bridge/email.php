<?php
/**
 * Bienek Contact Form Email Bridge
 *
 * Este script recibe datos del formulario de contacto y envía un correo
 * con formato HTML profesional al equipo de marketing.
 *
 * Uso: Subir a cPanel y configurar PHP_BRIDGE_URL en .env.local
 */

// Cargar configuración de secretos (bloqueado por .htaccess para acceso HTTP directo)
require_once __DIR__ . '/config.php';

// Errores: nunca mostrar en producción
error_reporting(E_ALL);
ini_set('display_errors', 0);

// ── CORS ─────────────────────────────────────────────────────────────────────
// Solo se permite el origen del dominio oficial de Bienek.
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
} else {
    // Origen no permitido: rechazar preflight y peticiones reales
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(403);
        exit();
    }
    header("Access-Control-Allow-Origin: https://bienek.cl");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Vary: Origin");
header('Content-Type: application/json; charset=utf-8');
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");

// Responder al preflight CORS y salir
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo POST permitido
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// ── DESTINOS DE CORREO ───────────────────────────────────────────────────────
$CONTACT_EMAIL = 'contacto.web@bienek.cl';
$CAREERS_EMAIL = 'postulaciones.web@bienek.cl';

$VALID_TYPES = ['contact', 'application', 'order'];
$type = isset($_POST['type']) && in_array($_POST['type'], $VALID_TYPES, true)
    ? $_POST['type']
    : 'contact';
$DESTINATION_EMAIL = ($type === 'application') ? $CAREERS_EMAIL : $CONTACT_EMAIL;

// ── FUNCIONES DE SEGURIDAD ───────────────────────────────────────────────────

/**
 * Elimina cualquier carácter de control (\r, \n, \t, nulos) de un valor
 * antes de usarlo en headers de correo o subject. Previene header injection.
 */
function sanitizeHeaderValue($value)
{
    return trim(preg_replace('/[\r\n\t\0]/', '', $value));
}

/**
 * Validación estricta de email con rechazo explícito de caracteres de control.
 */
function isValidEmail($email)
{
    // Rechazar si contiene saltos de línea u otros caracteres de control
    if (preg_match('/[\r\n\t\0]/', $email)) {
        return false;
    }

    // Formato básico
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    // Debe tener @ y dominio con TLD
    if (!preg_match('/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/', $email)) {
        return false;
    }

    list($localPart, $domain) = explode('@', $email, 2);

    if (strpos($domain, '.') === false) {
        return false;
    }

    $parts = explode('.', $domain);
    $tld = end($parts);
    if (strlen($tld) < 2) {
        return false;
    }

    return true;
}

/**
 * Verifica el token de Cloudflare Turnstile.
 */
function verifyTurnstile($token, $secretKey)
{
    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $data = [
        'secret'   => $secretKey,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'],
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $result = curl_exec($ch);

    if (curl_errno($ch)) {
        curl_close($ch);
        return false;
    }
    curl_close($ch);

    if ($result === false) {
        return false;
    }

    $json = json_decode($result, true);
    return isset($json['success']) && $json['success'] === true;
}

// ── VERIFICACIÓN TURNSTILE ───────────────────────────────────────────────────
$token = isset($_POST['cf-turnstile-response']) ? $_POST['cf-turnstile-response'] : null;

if (!$token || !verifyTurnstile($token, TURNSTILE_SECRET_KEY)) {
    http_response_code(403);
    echo json_encode(['error' => 'Verificación CAPTCHA fallida. Recarga la página e inténtalo de nuevo.']);
    exit();
}

// ── DATOS DEL FORMULARIO ─────────────────────────────────────────────────────
$name        = isset($_POST['name'])    ? htmlspecialchars(trim($_POST['name']),    ENT_QUOTES, 'UTF-8') : '';
$raw_email   = isset($_POST['email'])   ? trim($_POST['email'])                                          : '';
$phone       = isset($_POST['phone'])   ? htmlspecialchars(trim($_POST['phone']),   ENT_QUOTES, 'UTF-8') : '';
$message     = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';
$rut         = isset($_POST['rut'])     ? htmlspecialchars(trim($_POST['rut']),     ENT_QUOTES, 'UTF-8') : '';

$field3_value = isset($_POST['d3']) ? htmlspecialchars(trim($_POST['d3']), ENT_QUOTES, 'UTF-8') : '';
if (empty($field3_value) && isset($_POST['company'])) {
    $field3_value = htmlspecialchars(trim($_POST['company']), ENT_QUOTES, 'UTF-8');
}

$field3_label = ($type === 'application') ? 'Área de Interés' : 'Empresa';

// Campos requeridos
if (!$name || !$raw_email) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos (Nombre o Email)']);
    exit();
}

// Validación de email
if (!isValidEmail($raw_email)) {
    http_response_code(400);
    echo json_encode(['error' => 'El formato del correo no es válido. Debe ser ej: nombre@dominio.cl']);
    exit();
}

$email = $raw_email;

// ── ADJUNTO: VALIDACIÓN EN SERVIDOR ─────────────────────────────────────────
$hasAttachment   = false;
$attachmentName  = '';
$attachmentContent = '';
$attachmentType  = '';

if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    // Límite de tamaño: 5 MB
    if ($_FILES['attachment']['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'El archivo no debe superar los 5MB.']);
        exit();
    }

    // Validar tipo real con magic bytes (independiente del MIME declarado por el cliente)
    $finfo      = finfo_open(FILEINFO_MIME_TYPE);
    $actualMime = finfo_file($finfo, $_FILES['attachment']['tmp_name']);
    finfo_close($finfo);

    $allowedMimes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',         // Los .docx son archivos ZIP internamente
        'application/octet-stream', // Algunos sistemas reportan DOC así
    ];

    if (!in_array($actualMime, $allowedMimes, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Solo se permiten archivos PDF o Word (DOC, DOCX).']);
        exit();
    }

    // Validar extensión del nombre de archivo
    $allowedExtensions = ['pdf', 'doc', 'docx'];
    $fileExtension     = strtolower(pathinfo($_FILES['attachment']['name'], PATHINFO_EXTENSION));
    if (!in_array($fileExtension, $allowedExtensions, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Solo se permiten archivos PDF o Word (DOC, DOCX).']);
        exit();
    }

    $hasAttachment     = true;
    $attachmentName    = basename($_FILES['attachment']['name']);
    $attachmentType    = $actualMime; // Usar el MIME real, no el del cliente
    $attachmentContent = file_get_contents($_FILES['attachment']['tmp_name']);
}

// ── CONSTRUIR CORREO HTML ────────────────────────────────────────────────────
$date = date('d/m/Y H:i');

switch ($type) {
    case 'application':
        $title = '🚀 Nueva Postulación';
        break;
    case 'order':
        $title = '📦 Nueva Solicitud de Pedido';
        break;
    default:
        $title = '📬 Nueva Consulta de Contacto';
        break;
}

ob_start();
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #1a365d;
            background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%);
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            color: #ffffff;
        }

        .header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 14px;
            color: #ffffff;
        }

        .content {
            padding: 30px;
        }

        .field {
            margin-bottom: 20px;
        }

        .field-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .field-value {
            font-size: 16px;
            color: #333;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #ecec00;
        }

        .message-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ecec00;
            margin-top: 10px;
        }

        .message-box p {
            margin: 0;
            line-height: 1.6;
            color: #333;
            white-space: pre-wrap;
        }

        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }

        .highlight {
            display: inline-block;
            background: #ecec00;
            color: #1a365d;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 600;
        }

        .attachment-notice {
            background: #e8f5e9;
            border: 1px solid #c8e6c9;
            border-radius: 8px;
            padding: 12px;
            margin-top: 20px;
            text-align: center;
            color: #2e7d32;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1><?php echo $title; ?></h1>
            <p>Recibido el <?php echo $date; ?></p>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">Nombre Completo</div>
                <div class="field-value"><?php echo $name; ?></div>
            </div>
            <div class="field">
                <div class="field-label">Correo Electrónico</div>
                <div class="field-value"><a href="mailto:<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>"
                        style="color: #1a365d;"><?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?></a></div>
            </div>
            <div class="field">
                <div class="field-label"><?php echo $field3_label; ?></div>
                <div class="field-value"><?php echo $field3_value; ?></div>
            </div>
            <div class="field">
                <div class="field-label">Teléfono</div>
                <div class="field-value"><a href="tel:<?php echo $phone; ?>"
                        style="color: #1a365d;"><?php echo $phone; ?></a></div>
            </div>
            <div class="field">
                <div class="field-label">RUT Facturación</div>
                <div class="field-value"><?php echo $rut; ?></div>
            </div>
            <div class="field">
                <div class="field-label">Mensaje / Presentación</div>
                <div class="message-box">
                    <p><?php echo $message; ?></p>
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
<?php
$htmlBody = ob_get_clean();

// Insertar aviso de adjunto en el HTML
if ($hasAttachment) {
    $attachmentNotice = '<div class="attachment-notice">📎 <strong>Archivo adjunto:</strong> ' . htmlspecialchars($attachmentName, ENT_QUOTES, 'UTF-8') . '</div>';
    $htmlBody = str_replace('{{ATTACHMENT_NOTICE}}', $attachmentNotice, $htmlBody);
} else {
    $htmlBody = str_replace('{{ATTACHMENT_NOTICE}}', '', $htmlBody);
}

// ── CONSTRUIR HEADERS Y SUBJECT (SANITIZADOS) ────────────────────────────────
// sanitizeHeaderValue() elimina \r \n \t \0 para prevenir header injection
$safe_name   = sanitizeHeaderValue($name);
$safe_field3 = sanitizeHeaderValue($field3_value);
$safe_email  = sanitizeHeaderValue($email);

if ($type === 'application') {
    $subject = "Nueva Postulación: {$safe_name} - {$safe_field3}";
} elseif ($type === 'order') {
    $subject = "Nueva Solicitud de Cotización: {$safe_name}";
    if ($hasAttachment) {
        $subject .= " (Adjunto: " . sanitizeHeaderValue($attachmentName) . ")";
    }
} else {
    $subject = "Nueva consulta de: {$safe_name} - {$safe_field3}";
}

$boundary = md5(uniqid('', true));

$headers  = "From: Bienek Web <no-reply@bienek.cl>\r\n";
$headers .= "Reply-To: {$safe_email}\r\n";  // Sanitizado: sin \r\n posibles
$headers .= "MIME-Version: 1.0\r\n";

if ($hasAttachment) {
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";

    $body .= "--{$boundary}\r\n";
    $safeAttachmentName = htmlspecialchars($attachmentName, ENT_QUOTES, 'UTF-8');
    $body .= "Content-Type: {$attachmentType}; name=\"{$safeAttachmentName}\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$safeAttachmentName}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($attachmentContent)) . "\r\n";
    $body .= "--{$boundary}--";
} else {
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body = $htmlBody;
}

// ── ENVÍO ─────────────────────────────────────────────────────────────────────
$success = mail($DESTINATION_EMAIL, $subject, $body, $headers);

if ($success) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email enviado correctamente.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al enviar el correo. Contacta a soporte.']);
}
