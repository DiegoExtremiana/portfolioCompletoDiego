<?php
// Script para depurar problemas de CORS
echo "Debugging CORS headers...\n\n";

// Verificar el método de solicitud
echo "Método de solicitud: " . $_SERVER['REQUEST_METHOD'] . "\n";
echo "Origen de la solicitud: " . ($_SERVER['HTTP_ORIGIN'] ?? 'No especificado') . "\n";
echo "Cabeceras de solicitud:\n";

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    echo "Access-Control-Request-Headers: " . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'] . "\n";
}

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    echo "Access-Control-Request-Method: " . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] . "\n";
}

// Configurar cabeceras CORS para todas las solicitudes
header('Content-Type: application/json');

// Asegurarse de que solo se establece una vez el encabezado de origen
header('Access-Control-Allow-Origin: *'); // Permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');
header('Access-Control-Allow-Credentials: true');

// Manejar solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo "\nSolicitud OPTIONS manejada.\n";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "\nSolicitud POST recibida.\n";
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data) {
        echo "Datos recibidos:\n";
        foreach ($data as $key => $value) {
            echo "  $key: $value\n";
        }
    } else {
        echo "No se recibieron datos JSON válidos.\n";
    }

    echo json_encode(['success' => true, 'message' => 'Debug completado']);
} else {
    echo json_encode(['method' => $_SERVER['REQUEST_METHOD'], 'message' => 'Solicitud recibida']);
}
