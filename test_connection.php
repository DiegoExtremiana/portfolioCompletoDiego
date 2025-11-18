<?php
// Script para probar la conexión directa al endpoint
echo "Probando conexión directa al endpoint sendEmail.php...\n\n";

// Datos de prueba
$testData = array(
    'name' => 'Prueba de Conexion',
    'email' => 'prueba@conexion.com',
    'subject' => 'Prueba de Conexion Directa',
    'message' => 'Este es un mensaje de prueba para verificar la conexion directa al endpoint.'
);

// Convertir los datos a JSON
$jsonData = json_encode($testData);

echo "Datos a enviar:\n";
echo "Nombre: " . $testData['name'] . "\n";
echo "Email: " . $testData['email'] . "\n";
echo "Asunto: " . $testData['subject'] . "\n";
echo "Mensaje: " . $testData['message'] . "\n\n";

// Verificar que todos los campos requeridos estén presentes
if (empty($testData['name']) || empty($testData['email']) || empty($testData['subject']) || empty($testData['message'])) {
    echo "ERROR: Faltan campos requeridos en los datos de prueba.\n";
    exit(1);
}

// Validar formato de email
if (!filter_var($testData['email'], FILTER_VALIDATE_EMAIL)) {
    echo "ERROR: Formato de email inválido en los datos de prueba.\n";
    exit(1);
}

echo "✓ Todos los campos están presentes y el email tiene formato válido.\n";

// Intentar enviar los datos al endpoint
echo "\nIntentando enviar datos al endpoint...\n";

// Usar cURL para simular la solicitud que haría el frontend
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost/portfolio/sendEmail.php');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Origin: http://localhost:3000'
));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true); // Incluir encabezados en la respuesta

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $headerSize);
$body = substr($response, $headerSize);

curl_close($ch);

echo "Código de estado HTTP: " . $httpCode . "\n";
echo "Encabezados recibidos:\n" . $header . "\n";
echo "Cuerpo de la respuesta: " . $body . "\n";

if ($httpCode == 200) {
    echo "\n✓ Conexión exitosa al endpoint sendEmail.php\n";
} else {
    echo "\n✗ Error en la conexión al endpoint sendEmail.php\n";
}

echo "\nPrueba completada.\n";
