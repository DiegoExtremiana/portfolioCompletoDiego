<?php
// Script para probar la solicitud preflight OPTIONS
echo "Probando solicitud preflight OPTIONS...\n\n";

// Usar cURL para simular una solicitud OPTIONS como la que haría el navegador
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost/portfolio/sendEmail.php');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'OPTIONS'); // Especificar método OPTIONS
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Origin: http://localhost:3000',
    'Access-Control-Request-Method: POST',
    'Access-Control-Request-Headers: Content-Type, Authorization',
    'Content-Type: application/json'
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
    if (strpos($header, 'Access-Control-Allow-Origin: *') !== false) {
        echo "\n✓ ¡Éxito! La solicitud preflight OPTIONS está funcionando correctamente.\n";
        echo "El encabezado Access-Control-Allow-Origin está presente.\n";
    } else {
        echo "\n✗ Error: El encabezado Access-Control-Allow-Origin no está presente en la respuesta preflight.\n";
    }
} else {
    echo "\n✗ Error: La solicitud preflight OPTIONS falló con código de estado: " . $httpCode . "\n";
}

echo "\nPrueba de preflight completada.\n";
