<?php
// Script de prueba para verificar la funcionalidad del formulario de contacto
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Carga la configuración de correo desde el archivo de configuración
$configFile = __DIR__ . '/src/config/emailConfig.php';
if (file_exists($configFile)) {
    $emailConfig = require_once $configFile;
} else {
    // Configuración por defecto si no se encuentra el archivo
    $emailConfig = [
        'smtp_host' => 'smtp.gmail.com',
        'smtp_username' => 'dextremiana1998@gmail.com',
        'smtp_password' => 'TU_CONTRASENA_APP', // Reemplaza con tu contraseña de aplicación real
        'smtp_port' => 587,
        'smtp_secure' => 'tls',
        'from_email' => 'dextremiana1998@gmail.com',
        'from_name' => 'Formulario de Contacto Portfolio - Prueba',
        'to_email' => 'dextremiana1998@gmail.com'
    ];
}

// Datos de prueba para simular el envío desde el formulario de contacto
$testData = [
    'name' => 'Prueba de Usuario',
    'email' => 'prueba@ejemplo.com',
    'message' => 'Este es un mensaje de prueba para verificar que el sistema de envío de correos está funcionando correctamente.'
];

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
    $mail->addReplyTo($testData['email'], $testData['name']); // Para que el destinatario pueda responder

    // Contenido del correo
    $mail->isHTML(false); // Formato de texto plano
    $mail->Subject = 'Nuevo mensaje de contacto desde el portfolio - Prueba';
    $mail->Body = "Nombre: " . $testData['name'] . "\n" .
        "Email: " . $testData['email'] . "\n\n" .
        "Mensaje: " . $testData['message'];

    // Enviar el correo
    $mail->send();
    echo "¡Prueba exitosa! El correo de prueba se envió correctamente.\n";
    echo "Verifica tu bandeja de entrada en dextremiana1998@gmail.com\n";
    echo "Datos de prueba usados:\n";
    echo "- Nombre: " . $testData['name'] . "\n";
    echo "- Email: " . $testData['email'] . "\n";
    echo "- Mensaje: " . $testData['message'] . "\n";
} catch (Exception $e) {
    echo "Error al enviar el mensaje de prueba: " . $mail->ErrorInfo . "\n";
    echo "Asegúrate de haber reemplazado 'TU_CONTRASENA_APP' con tu contraseña de aplicación real de Gmail.\n";
}
