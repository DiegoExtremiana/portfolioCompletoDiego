<?php
// Configuración de correo electrónico (solo como respaldo/opcional)
// La configuración principal está en config.php

// Opciones predeterminadas si no hay configuración principal
return [
    'smtp_host' => 'smtp.gmail.com',           // Servidor SMTP de Gmail
    'smtp_username' => '', // Tu dirección de correo (debe estar en config.php)
    'smtp_password' => '',    // Contraseña de aplicación de Gmail (debe estar en config.php)
    'smtp_port' => 587,                        // Puerto SMTP
    'smtp_secure' => 'tls',                    // Tipo de encriptación
    'from_email' => '', // Correo desde el que se envía (debe estar en config.php)
    'from_name' => 'Formulario de Contacto Portfolio',   // Nombre que aparece como remitente
    'to_email' => ''  // Correo al que se envían los mensajes (debe estar en config.php)
];