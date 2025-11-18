# Cómo generar una contraseña de aplicación de Gmail

Sigue estos pasos para generar una contraseña de aplicación para tu cuenta de Gmail:

## Paso 1: Habilitar la verificación en dos pasos

1. Ve a [tu Cuenta de Google](https://myaccount.google.com/)
2. En el panel lateral izquierdo, haz clic en "Seguridad"
3. En la sección "Iniciar sesión en Google", haz clic en "Verificación en dos pasos"
4. Si aún no está activada, introdúcela siguiendo las instrucciones
5. Sigue los pasos para configurar tu método de verificación secundario (teléfono, etc.)

## Paso 2: Generar la contraseña de aplicación

1. Una vez que tengas la verificación en dos pasos activada, permanece en la página de "Seguridad"
2. Busca la sección titulada "Contraseñas de aplicación" o haz scroll hacia abajo hasta encontrarla
3. Haz clic en "Contraseñas de aplicación" (puede estar bajo "Acceso a menos seguras apps")
4. Se te pedirá que vuelvas a introducir tu contraseña de Gmail para confirmar tu identidad
5. Después de autenticarte, verás una pantalla con tus aplicaciones actuales (si las hay)
6. En la parte inferior de la página, en el menú desplegable "Seleccionar la app", selecciona "Correo"
7. En el menú desplegable "Seleccionar el dispositivo", selecciona "Otro (Personalizado)"
8. En el campo de texto que aparece, introduce un nombre para identificar este uso, por ejemplo: "PortfolioContact"
9. Haz clic en "Generar"
10. Te aparecerá una contraseña de 16 caracteres (por ejemplo: abcd efgh ijkl mnop)

## Paso 3: Usar la contraseña de aplicación

1. Copia esta contraseña de 16 caracteres (sin espacios)
2. Abre el archivo `src/config/emailConfig.php`
3. Reemplaza `TU_CONTRASENA_APP` con la contraseña que acabas de generar:

```php
'smtp_password' => 'abcd efgh ijkl mnop',  // Reemplaza con tu contraseña real (sin espacios)
```

**Importante:** La contraseña se mostrará sin espacios en tu configuración, así que si tu contraseña de aplicación es "abcd efgh ijkl mnop", en el archivo PHP se escribirá como `'smtp_password' => 'abcdefghijklnop',`

## Paso 4: Prueba la configuración

Después de actualizar la contraseña:

1. Asegúrate de que XAMPP esté corriendo con Apache
2. Puedes probar la configuración ejecutando: `php test_email.php`
3. Si todo está configurado correctamente, recibirás un correo de prueba en tu bandeja de entrada

## Importante sobre seguridad

- Guarda esta contraseña de forma segura
- No compartas esta contraseña con nadie
- Si sospechas que ha sido comprometida, revócala y genera una nueva
- Esta contraseña solo permite acceso a servicios de Google desde aplicaciones que no admiten verificación en dos pasos
