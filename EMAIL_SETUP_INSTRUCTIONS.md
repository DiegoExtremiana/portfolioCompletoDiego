# Configuración de Email para el Formulario de Contacto

Para que el formulario de contacto funcione correctamente y los mensajes se envíen a tu correo electrónico `dextremiana1998@gmail.com`, debes configurar una contraseña de aplicación de Gmail.

## Pasos para configurar:

### 1. Habilitar la verificación en dos pasos
- Ve a tu [Cuenta de Google](https://myaccount.google.com/)
- Navega a "Seguridad" 
- Activa la "Verificación en dos pasos"

### 2. Crear una contraseña de aplicación
- En la página de "Seguridad" de tu cuenta de Google
- Busca la sección "Contraseñas de aplicación"
- Selecciona "Correo" como aplicación y "Otro" como dispositivo
- Dale un nombre (por ejemplo: "PortfolioContact")
- Haz clic en "Generar"
- Copia la contraseña generada

### 3. Actualizar la configuración
- Abre el archivo `src/config/emailConfig.php`
- Reemplaza `TU_CONTRASENA_APP` con la contraseña de aplicación que acabas de generar:

```php
'smtp_password' => 'la_contraseña_de_aplicación_que_acabas_de_generar',
```

## Importante
- No compartas tu contraseña de aplicación con nadie
- Si alguna vez sospechas que la contraseña ha sido comprometida, genera una nueva
- Esta contraseña es específica para esta aplicación y no afecta el acceso a otros servicios

## Prueba del sistema
Después de configurar la contraseña de aplicación:
1. Asegúrate de que XAMPP esté corriendo con Apache y MySQL
2. Ejecuta la aplicación (normalmente con `npm start`)
3. Completa el formulario de contacto en la página
4. Verifica que recibes el email en tu bandeja de entrada
