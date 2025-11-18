<?php
// Script de prueba para verificar la funcionalidad de envío de email
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Carga la configuración de correo
$emailConfig = [
    'smtp_host' => 'smtp.gmail.com',           // Servidor SMTP de Gmail
    'smtp_username' => 'dextremiana1998@gmail.com', // Tu dirección de correo
    'smtp_password' => 'TU_CONTRASENA_APP',    // Contraseña de aplicación de Gmail - Reemplaza con tu contraseña de aplicación real
    'smtp_port' => 587,                        // Puerto SMTP
    'smtp_secure' => 'tls',                    // Tipo de encriptación
    'from_email' => 'dextremiana1998@gmail.com', // Correo desde el que se envía
    'from_name' => 'Formulario de Contacto Portfolio - Prueba',   // Nombre que aparece como remitente
    'to_email' => 'dextremiana1998@gmail.com'  // Correo al que se envían los mensajes
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

    // Contenido del correo
    $mail->isHTML(false); // Formato de texto plano
    $mail->Subject = 'Prueba de envío de email desde el portfolio';
    $mail->Body = "¡Este es un mensaje de prueba!\n\n" .
        "Si recibes este mensaje, significa que la configuración de email está funcionando correctamente.\n\n" .
        "Recuerda reemplazar 'TU_CONTRASENA_APP' en el archivo de configuración con tu contraseña de aplicación real de Gmail.";

    // Enviar el correo
    $mail->send();
    echo "¡Prueba exitosa! El correo se envió correctamente.\n";
    echo "Verifica tu bandeja de entrada en dextremiana1998@gmail.com\n";
} catch (Exception $e) {
    echo "Error al enviar el mensaje: " . $mail->ErrorInfo . "\n";
    echo "Asegúrate de haber reemplazado 'TU_CONTRASENA_APP' con tu contraseña de aplicación real de Gmail.\n";
}
