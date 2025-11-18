# Advertencia de Seguridad Importante

## Uso de Contraseñas de Aplicación

Es crucial entender que para que el sistema de envío de correos funcione de forma segura, **necesitas usar una contraseña de aplicación de Gmail** y no tu contraseña principal de Gmail.

### ¿Por qué necesitas una contraseña de aplicación?

1. **Seguridad**: Las contraseñas de aplicación son más seguras porque:
   - Son específicas para una aplicación o servicio particular
   - Puedes revocarlas sin afectar tu cuenta principal
   - No comprometen tu contraseña principal de Gmail

2. **Autenticación moderna**: Gmail requiere autenticación de dos factores para usar contraseñas de aplicación, lo que añade una capa adicional de seguridad

3. **Mejor control**: Puedes gestionar qué aplicaciones tienen acceso a tu cuenta de Gmail

### ¿Por qué no debes usar tu contraseña principal?

- Revelar tu contraseña principal en archivos de configuración es un riesgo de seguridad significativo
- Si alguien accede a esos archivos, tendría acceso directo a tu cuenta de Gmail
- Tu contraseña principal protege todos tus servicios de Google, no solo el correo

### Cómo generar una contraseña de aplicación

1. Asegúrate de tener la verificación en dos pasos activada en tu cuenta de Google
2. Ve a [Contraseñas de aplicación](https://myaccount.google.com/apppasswords)
3. Selecciona "Correo" y tu dispositivo
4. Genera una nueva contraseña de aplicación (será una cadena de 16 caracteres)
5. Usa esa contraseña en lugar de tu contraseña principal

### Ejemplo de contraseña de aplicación

Una contraseña de aplicación típica se ve así:
`abcd efgh ijkl mnop` (sin comillas, sin espacios en la configuración final)

**NUNCA** uses tu contraseña principal de Gmail en archivos de configuración o compartas tu contraseña con nadie.

### Actualización del archivo de configuración

Cuando tengas tu contraseña de aplicación, actualiza el archivo `src/config/emailConfig.php` de esta manera:

```php
'smtp_password' => 'abcd efgh ijkl mnop',    // Tu contraseña de aplicación real (sin espacios)
```

Recuerda remover los espacios cuando ingreses la contraseña en el archivo PHP.
