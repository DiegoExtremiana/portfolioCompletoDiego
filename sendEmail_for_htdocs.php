<?php
// Verificar si Composer está disponible en diferentes ubicaciones posibles
$composerAutoloadPaths = [
    __DIR__ . '/vendor/autoload.php',           // En la misma carpeta
    __DIR__ . '/../vendor/autoload.php',        // En la carpeta padre (caso común en XAMPP)
    __DIR__ . '/../../../vendor/autoload.php',  // En caso de subcarpeta en htdocs
    'C:/xampp/htdocs/vendor/autoload.php'       // Ruta absoluta común en XAMPP
];

$autoloadLoaded = false;
foreach ($composerAutoloadPaths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $autoloadLoaded = true;
        break;
    }
}

if (!$autoloadLoaded) {
    // Si no se puede encontrar Composer, mostrar error
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo encontrar PHPMailer. Asegúrate de instalar Composer y ejecutar "composer install" en el directorio raíz de XAMPP.']);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Carga la configuración de correo
$emailConfig = [
    'smtp_host' => 'smtp.gmail.com',           // Servidor SMTP de Gmail
    'smtp_username' => 'dextremiana1998@gmail.com', // Tu dirección de correo
    'smtp_password' => 'TU_CONTRASENA_APP',    // Contraseña de aplicación de Gmail
    'smtp_port' => 587,                        // Puerto SMTP
    'smtp_secure' => 'tls',                    // Tipo de encriptación
    'from_email' => 'dextremiana1998@gmail.com', // Correo desde el que se envía
    'from_name' => 'Formulario de Contacto',   // Nombre que aparece como remitente
    'to_email' => 'dextremiana1998@gmail.com'  // Correo al que se envían los mensajes
];

// Cargar configuración desde archivo si existe
$configFile = __DIR__ . '/config/emailConfig.php';
if (file_exists($configFile)) {
    $emailConfig = require_once $configFile;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = isset($data['name']) ? trim($data['name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $message = isset($data['message']) ? trim($data['message']) : '';

    // Validar que todos los campos estén presentes
    if (empty($name) || empty($email) || empty($message)) {
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
        $mail->Subject = 'Nuevo mensaje de contacto desde el portfolio';
        $mail->Body = "Nombre: " . $name . "\n" .
            "Email: " . $email . "\n\n" .
            "Mensaje: " . $message;

        // Enviar el correo
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al enviar el mensaje: ' . $mail->ErrorInfo]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
