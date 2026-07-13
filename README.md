# Portfolio · Diego Extremiana

Portfolio personal — moderno, accesible y de alto rendimiento. React + TypeScript + Vite, con fondo WebGL sincronizado al scroll, proyectos y tecnologías cargados **automáticamente** desde la API de GitHub, y formulario de contacto vía función serverless.

🔗 **En producción:** https://diegoextremiana.vercel.app/

## Stack

- **Vite 5** + **React 18** + **TypeScript** (estricto)
- **Tailwind CSS 3** con sistema de tokens (claro/oscuro) vía CSS variables
- **WebGL** (shader propio, sin dependencias) para el fondo animado
- Tipografías **self-hosted** (`@fontsource-variable`) — cero peticiones externas
- **Vercel Serverless Function** + **Nodemailer** para el contacto

## Características

- **Proyectos automáticos** — todos los repos públicos (sin forks ni archivados) se
  obtienen de GitHub en tiempo de build. Demos derivadas de GitHub Pages, imagen
  representativa, tecnologías y fecha incluidas.
- **Tecnologías automáticas** — los porcentajes de lenguajes se calculan analizando
  todos los repositorios; nada se mantiene a mano.
- **Fondo sincronizado al scroll** — evoluciona hacia delante y hacia atrás con la
  navegación. Respeta `prefers-reduced-motion` y cae a un gradiente CSS si no hay WebGL.
- **Diseño responsive** con modo claro/oscuro y animaciones sutiles al hacer scroll.
- **SEO + accesibilidad** — Open Graph, Twitter Cards, JSON-LD, sitemap, skip-link,
  foco visible y contraste AA.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script                | Acción                                                        |
| --------------------- | ------------------------------------------------------------- |
| `npm run dev`         | Servidor de desarrollo (Vite)                                 |
| `npm run build`       | Refresca datos de GitHub y compila a `dist/`                  |
| `npm run preview`     | Sirve el build de producción                                  |
| `npm run fetch:github`| Regenera el snapshot `src/data/github.generated.json`         |
| `npm run typecheck`   | Comprobación de tipos (`tsc --noEmit`)                        |

## Datos de GitHub

El script `scripts/fetch-github.mjs` genera un snapshot estático en build (así el sitio
carga al instante y sin límites de rate). Es **tolerante a fallos**: si la API no
responde, conserva el snapshot anterior y el build no falla. Un `GITHUB_TOKEN` (opcional)
solo sube el límite de peticiones. Para ver cambios nuevos en tus repos, vuelve a
desplegar en Vercel.

## Formulario de contacto

La función `api/contact.ts` envía el mensaje por SMTP. Configura estas variables en
**Vercel → Settings → Environment Variables** (ver `.env.example`):

```
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO
```

Si **no** están configuradas, el formulario cae con elegancia a un enlace `mailto:`, así
que nunca queda roto. Recomendado: Gmail con una
[contraseña de aplicación](https://myaccount.google.com/apppasswords).

## Despliegue (Vercel)

Framework **Vite** (autodetectado), sin configuración extra: `npm run build` → `dist/`.
Las funciones de `api/` se despliegan automáticamente como serverless.
```bash
vercel        # preview
vercel --prod # producción
```
