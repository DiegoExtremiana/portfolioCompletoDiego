# Configuración del Formulario de Contacto

Este documento explica cómo configurar el formulario de contacto para que los mensajes se envíen a tu correo electrónico `dextremiana1998@gmail.com`.

## Requisitos Previos

1. Tener instalado XAMPP con Apache y PHP
2. Tener instaladas las dependencias de PHP con `composer install`
3. Tener Node.js y npm instalados (para el frontend)

## Pasos para Configurar el Formulario de Contacto

### 1. Configurar la Contraseña de Aplicación de Gmail

Para que el formulario de contacto funcione, necesitas crear una contraseña de aplicación en tu cuenta de Gmail:

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

### 2. Actualizar la Configuración

1. Abre el archivo `src/config/emailConfig.php`
2. Reemplaza `TU_CONTRASENA_APP` con la contraseña de aplicación que generaste:

```php
'smtp_password' => 'la_contraseña_de_aplicación_que_acabas_de_generar',
```

### 3. Verificar la Configuración

Puedes probar la configuración ejecutando el script de prueba:

```bash
php test_email.php
```

O para una prueba más completa:

```bash
php test_contact_form.php
```

## Configuración del Backend

El formulario de contacto utiliza:
- `sendEmail.php` - Archivo PHP que maneja el envío de correos
- `src/config/emailConfig.php` - Configuración de credenciales de email
- `src/setupProxy.js` - Configuración del proxy para las solicitudes API

La configuración actual ya está preparada para enviar correos a `dextremiana1998@gmail.com`.

## Configuración del Frontend

El componente `src/components/Contact.js` está configurado para enviar los datos del formulario a través de una solicitud POST a `/api/contact`, que es redirigida por el proxy a `sendEmail.php`.

## Prueba del Sistema

Después de configurar la contraseña de aplicación:
1. Asegúrate de que XAMPP esté corriendo con Apache
2. Ejecuta la aplicación frontend (normalmente con `npm start`)
3. Completa el formulario de contacto en la página
4. Verifica que recibes el email en tu bandeja de entrada

## Solución de Problemas

Si no recibes los correos:
1. Verifica que hayas reemplazado `TU_CONTRASENA_APP` con la contraseña real
2. Comprueba que la contraseña de aplicación es correcta
3. Asegúrate de que tu cuenta de Gmail permite aplicaciones menos seguras (aunque con contraseña de aplicación esto normalmente no es necesario)
4. Verifica que no haya errores en la consola del navegador o en la terminal

## Seguridad

- No compartas tu contraseña de aplicación con nadie
- Si alguna vez sospechas que la contraseña ha sido comprometida, genera una nueva
- Esta contraseña es específica para esta aplicación y no afecta el acceso a otros servicios
