<?php
// Este archivo se puede incluir al principio de sendEmail.php si hay problemas persistentes de CORS
// Asegura que los encabezados CORS se apliquen antes de cualquier otra lógica

// Función para manejar solicitudes CORS
function handleCORS()
{
    // Para todas las solicitudes, establecer encabezados CORS
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');

    // Si es una solicitud OPTIONS (preflight), responder inmediatamente
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // Establecer encabezados CORS para la solicitud preflight
        header('Access-Control-Max-Age: 86400'); // Cachear la respuesta preflight por 24 horas
        http_response_code(200);
        exit();
    }
}

// Llamar a la función para manejar CORS
handleCORS();
