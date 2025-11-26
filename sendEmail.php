<?php
// Deshabilitar la visualización de errores para evitar que se muestren en la respuesta JSON
ini_set('display_errors', 0);

// Manejar solicitud OPTIONS (preflight) primero, antes de cualquier otra lógica
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Configurar cabeceras CORS para solicitudes preflight
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');
    header('Access-Control-Allow-Credentials: true');
    http_response_code(200);
    exit();
}

// Configurar cabeceras CORS para todas las demás solicitudes
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');
header('Access-Control-Allow-Credentials: true');

// Cargar la librería PHPMailer
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No se encontró el archivo de autoload. Asegúrate de instalar las dependencias con Composer.']);
    exit;
}

require_once $autoloadPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Cargar configuración de correo desde archivo externo
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No se encontró el archivo de configuración.']);
    exit;
}

$emailConfig = require_once $configPath;

// Cargar configuración desde archivo de configuración alternativo si existe (para compatibilidad)
$altConfigFile = __DIR__ . '/src/config/emailConfig.php';
if (file_exists($altConfigFile)) {
    try {
        $altConfig = require_once $altConfigFile;
        // Combinar la configuración del archivo con la principal, manteniendo los valores principales
        $emailConfig = array_merge($altConfig, $emailConfig);
    } catch (Exception $e) {
        // Si hay un error al cargar el archivo de configuración alternativo, devolver error en formato JSON
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error al cargar la configuración del archivo alternativo: ' . $e->getMessage()]);
        exit;
    }
}

// Configurar Content-Type para todas las solicitudes
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = isset($data['name']) ? trim($data['name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $subject = isset($data['subject']) ? trim($data['subject']) : '';
    $message = isset($data['message']) ? trim($data['message']) : '';

    // Validar que todos los campos estén presentes
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Todos los campos son obligatorios']);
        exit;
    }

    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Formato de email inválido']);
        exit;
    }

    // Crear una nueva instancia de PHPMailer
    $mail = new PHPMailer(true);

    // Validar que las credenciales necesarias estén presentes
    if (empty($emailConfig['smtp_username']) || empty($emailConfig['smtp_password']) || empty($emailConfig['from_email']) || empty($emailConfig['to_email'])) {
        http_response_code(500);
        echo json_encode(['error' => 'Faltan credenciales de correo. Verifique que las variables de entorno estén correctamente configuradas.']);
        exit;
    }

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = $emailConfig['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = $emailConfig['smtp_username'];
        $mail->Password = $emailConfig['smtp_password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $emailConfig['smtp_port'];

        // Configuración del remitente y destinatario
        $mail->setFrom($emailConfig['from_email'], $emailConfig['from_name']);
        $mail->addAddress($emailConfig['to_email']); // Correo del destinatario
        $mail->addReplyTo($email, $name); // Para que el destinatario pueda responder

        // Contenido del correo
        $mail->isHTML(false); // Formato de texto plano
        $mail->Subject = "PORTAFOLIO";
        $mail->Body = "Nombre: " . $name . "\n" .
            "Email: " . $email . "\n" .
            "Asunto: " . $subject . "\n\n" .
            "Mensaje: " . $message;

        // Enviar el correo
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al enviar el mensaje']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}