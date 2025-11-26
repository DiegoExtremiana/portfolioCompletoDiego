# Portfolio Personal

Este es mi portfolio personal desarrollado con React y PHP. Incluye una sección de contacto que permite a los visitantes enviar mensajes directamente a mi correo electrónico.

## Características

- Interfaz moderna desarrollada con React
- Formulario de contacto funcional
- Envío de emails a través de SMTP con PHPMailer
- Diseño responsive
- Soporte para modo claro/oscuro

## Configuración del Formulario de Contacto

Para que el formulario de contacto funcione correctamente y los mensajes se envíen a tu correo electrónico, debes configurar las variables de entorno de correo.

### Pasos para configurar:

1. **Habilitar la verificación en dos pasos**
   - Ve a tu [Cuenta de Google](https://myaccount.google.com/)
   - Navega a "Seguridad" 
   - Activa la "Verificación en dos pasos"

2. **Crear una contraseña de aplicación**
   - En la página de "Seguridad" de tu cuenta de Google
   - Busca la sección "Contraseñas de aplicación"
   - Selecciona "Correo" como aplicación y "Otro" como dispositivo
   - Dale un nombre (por ejemplo: "PortfolioContact")
   - Haz clic en "Generar"
   - Copia la contraseña generada

3. **Actualizar la configuración**
   - Abre el archivo `src/config/emailConfig.php`
   - Reemplaza `TU_CONTRASENA_APP` con la contraseña de aplicación que acabas de generar:

   ```php
   'smtp_password' => 'la_contraseña_de_aplicación_que_acabas_de_generar',
   ```

## Dependencias

El proyecto utiliza PHPMailer para el envío de correos electrónicos:

```json
{
    "require": {
        "phpmailer/phpmailer": "^7.0"
    }
}
```

## Estructura del Proyecto

- `src/components/Contact.js` - Componente React del formulario de contacto
- `sendEmail.php` - Archivo PHP que maneja el envío de correos
- `src/config/emailConfig.php` - Configuración de credenciales de email
- `src/setupProxy.js` - Configuración del proxy para las solicitudes API

## Ejecución del Proyecto

1. Asegúrate de tener instalados Node.js, npm y XAMPP
2. Instala las dependencias de PHP con `composer install`
3. Inicia Apache y MySQL en XAMPP
4. Ejecuta `npm install` y luego `npm start` para iniciar la aplicación React
5. El formulario de contacto enviará los mensajes al correo configurado en las variables de entorno

## Pruebas

Se incluye un script de prueba `test_email.php` que puedes ejecutar para verificar que la configuración de email funcione correctamente:

```bash
php test_email.php
```

## Importante

- No compartas tu contraseña de aplicación con nadie
- Si alguna vez sospechas que la contraseña ha sido comprometida, genera una nueva
- Esta contraseña es específica para esta aplicación y no afecta el acceso a otros servicios
