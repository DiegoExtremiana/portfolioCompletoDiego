# Portfolio de Diego Extremiana

Web personal de Diego Extremiana, desarrollador web full-stack: https://diegoextremiana.vercel.app/

## Stack

- React 18, TypeScript y Vite
- Tailwind CSS con variables CSS para el tema claro y oscuro
- Three.js (carga diferida) para el fondo animado
- Función serverless de Vercel con Nodemailer para el formulario de contacto

## Desarrollo

```bash
npm install
npm run dev
```

| Script                 | Qué hace                                              |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo en http://localhost:5173       |
| `npm run build`        | Actualiza los datos de GitHub y genera `dist/`        |
| `npm run preview`      | Sirve el build de producción                          |
| `npm run fetch:github` | Regenera `src/data/github.generated.json`             |
| `npm run typecheck`    | Comprobación de tipos                                 |

## Contenido

- `src/data/content.ts`: perfil, textos, habilidades, contacto y trayectoria.
- `src/data/projects.ts`: qué repos se muestran, su orden, títulos, descripciones y miniaturas.
- Las miniaturas están en `public/media/projects/<nombre-del-repo>.webp`.

## Datos de GitHub

Los proyectos y el stack técnico salen de los repositorios públicos de GitHub.

En el build, `scripts/fetch-github.mjs` guarda una copia en `src/data/github.generated.json`. Si la API falla, conserva la anterior y el build no se rompe. `GITHUB_TOKEN` (opcional) solo sube el límite de peticiones.

Encima de esa copia, el navegador consulta la API una vez por visita (`src/lib/github-live.ts`, estado compartido en `src/hooks/useGithubData.ts`). El desglose de lenguajes de un repo solo se vuelve a pedir si ese repo tiene un push nuevo, así que una visita normal es una sola petición (el límite anónimo es de 60 por hora). Si GitHub no responde, se sigue mostrando la copia del build.

Las habilidades de proyectos con clientes (Laravel, PrestaShop, WordPress) no están en GitHub y se mantienen a mano en `src/data/content.ts`.

## Formulario de contacto

`api/contact.ts` envía el mensaje por SMTP. Las variables están en `.env.example`. Si no están configuradas, el formulario abre el cliente de correo con un enlace `mailto:`.

## Despliegue

Vercel detecta Vite y sirve `dist/`. Las funciones de `api/` se despliegan solas.
