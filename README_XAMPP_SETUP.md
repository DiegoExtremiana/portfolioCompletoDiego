# Configuración para XAMPP

Para que la funcionalidad de contacto funcione correctamente con XAMPP, sigue estos pasos:

## 1. Colocar el archivo PHP en la carpeta htdocs de XAMPP

Copia el archivo `sendEmail_for_htdocs.php` a la carpeta `htdocs` de XAMPP y renómbralo a `sendEmail.php`:

```
C:\xampp\htdocs\sendEmail.php
```

También copia la carpeta de configuración desde el proyecto:

```
C:\xampp\htdocs\config\emailConfig.php
```

## 2. Instalar PHPMailer en XAMPP

En la carpeta raíz de XAMPP (C:\xampp\htdocs), ejecuta:

```
composer require phpmailer/phpmailer
```

Si no tienes Composer instalado globalmente, puedes descargar los archivos de PHPMailer manualmente.

## 3. Actualizar el archivo de proxy

El archivo `src/setupProxy.js` ya está configurado correctamente:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/contact',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
      pathRewrite: {
        '^/api/contact': '/sendEmail.php',
      },
    })
  );
};
```

## 4. Verificar la configuración de XAMPP

Asegúrate de que:

1. XAMPP esté instalado y los servicios de Apache estén corriendo
2. El puerto 80 (o el puerto configurado) esté disponible
3. Tengas PHPMailer instalado en tu servidor

## 5. Configurar las credenciales de correo

Edita el archivo `C:\xampp\htdocs\config\emailConfig.php` con tus credenciales de correo, o edita directamente el archivo `sendEmail.php` en htdocs para actualizar las credenciales.

## 6. Iniciar la aplicación

Inicia la aplicación React con `npm start` y el formulario de contacto debería funcionar correctamente.

## Nota importante

Debido a que React normalmente se ejecuta en el puerto 3000 y XAMPP en el puerto 80, es necesario el proxy para permitir la comunicación entre ambos servidores.

El archivo `sendEmail_for_htdocs.php` está optimizado para funcionar en la carpeta htdocs y buscará Composer en varias ubicaciones posibles.
