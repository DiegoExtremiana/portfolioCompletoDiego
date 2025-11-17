# Configuración del Formulario de Contacto

Para que el formulario de contacto funcione correctamente y envíe correos electrónicos a `dextremiana1998@gmail.com`, sigue estos pasos:

## Configuración de Gmail

Para enviar correos electrónicos a través de Gmail, necesitas configurar tu cuenta:

1. **Habilita la verificación en dos pasos** en tu cuenta de Google
2. **Genera una contraseña de aplicación**:
   - Ve a https://myaccount.google.com/
   - Navega a "Seguridad" > "Verificación en dos pasos" > "Contraseñas de aplicación"
   - Selecciona "Correo" y "Windows Computer" (o el dispositivo que estés usando)
   - Copia la contraseña generada

## Configuración del archivo de correo

Edita el archivo `src/config/emailConfig.php` y actualiza las credenciales:

```php
return [
    'smtp_host' => 'smtp.gmail.com',           // Servidor SMTP de Gmail
    'smtp_username' => 'dextremiana1998@gmail.com', // Tu dirección de correo
    'smtp_password' => 'TU_CONTRASENA_APP',    // Contraseña de aplicación de Gmail (NO tu contraseña normal)
    'smtp_port' => 587,                        // Puerto SMTP
    'smtp_secure' => 'tls',                    // Tipo de encriptación
    'from_email' => 'dextremiana1998@gmail.com', // Correo desde el que se envía
    'from_name' => 'Formulario de Contacto',   // Nombre que aparece como remitente
    'to_email' => 'dextremiana1998@gmail.com'  // Correo al que se envían los mensajes
];
```

## Importante

- No subas este archivo de configuración a un repositorio público, ya que contiene credenciales sensibles
- Usa una contraseña de aplicación, no tu contraseña normal de Gmail
- Si usas otro proveedor de correo diferente a Gmail, ajusta la configuración SMTP en consecuencia

## Alternativa

Si no deseas usar Gmail, puedes configurar otro proveedor de correo que soporte SMTP. Solo necesitas cambiar los valores de configuración:
- `smtp_host`: Servidor SMTP de tu proveedor
- `smtp_port`: Puerto SMTP (587 para TLS, 465 para SSL)
- `smtp_secure`: Método de encriptación ('tls' o 'ssl')
