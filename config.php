<?php
// Archivo de configuración de correo - Lee variables de entorno
// Este archivo puede ser subido a GIT ya que no contiene credenciales reales

// Cargar variables de entorno si existe el archivo .env
$dotenvPath = __DIR__ . '/.env';
if (file_exists($dotenvPath)) {
    $lines = file($dotenvPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            if (!isset($_ENV[$key])) {
                $_ENV[$key] = $value;
                putenv("$key=$value");
            }
        }
    }
}

return [
    'smtp_host' => $_ENV['SMTP_HOST'] ?? getenv('SMTP_HOST') ?: 'smtp.gmail.com',           // Servidor SMTP de Gmail
    'smtp_username' => $_ENV['SMTP_USERNAME'] ?? getenv('SMTP_USERNAME') ?: '', // Tu dirección de correo
    'smtp_password' => $_ENV['SMTP_PASSWORD'] ?? getenv('SMTP_PASSWORD') ?: '',    // Contraseña de aplicación de Gmail
    'smtp_port' => $_ENV['SMTP_PORT'] ?? getenv('SMTP_PORT') ?: 587,                        // Puerto SMTP
    'smtp_secure' => $_ENV['SMTP_SECURE'] ?? getenv('SMTP_SECURE') ?: 'tls',                    // Tipo de encriptación
    'from_email' => $_ENV['FROM_EMAIL'] ?? getenv('FROM_EMAIL') ?: '', // Correo desde el que se envía
    'from_name' => $_ENV['FROM_NAME'] ?? getenv('FROM_NAME') ?: 'Formulario de Contacto Portfolio',   // Nombre que aparece como remitente
    'to_email' => $_ENV['TO_EMAIL'] ?? getenv('TO_EMAIL') ?: '' // Correo al que se envían los mensajes
];