# C&J Software Consulting — sitio web

Next.js 16 · Tailwind CSS 4 · Español / Inglés (`/es`, `/en`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Textos (ES / EN) | `src/i18n/es.ts`, `src/i18n/en.ts` |
| Email, teléfono, dominio, LinkedIn | `src/content/site.ts` |
| Tecnologías de la franja | `src/content/site.ts` (`stack`) |
| Proyectos y video del hero | `src/content/projects.ts` |
| Logo, favicon, imagen OG | `public/brand/`, `src/app/icon.png`, `src/app/apple-icon.png` |
| Pósters y videos de proyectos | `public/projects/` |
| Artículos del blog (ES / EN) | `src/content/blog.ts` (portadas en `public/blog/`) |

### Proyectos
Cada proyecto necesita un póster 16:9 (`.jpg`, ~1600×900) y un video `.mp4`.
El video se reproduce en silencio y en bucle mientras está visible, y al pulsar
"Ver vista previa" se abre completo con controles. Recomendado: 10–60 s, 720p–1080p,
H.264, sin audio o con subtítulos, `-movflags +faststart`.

Los videos actuales son **placeholders** generados con ffmpeg a partir de los mockups.

### Blog
Rutas `/es/blog` (portada, filtro por categoría con `?categoria=`) y `/es/blog/<slug>`.
Para publicar, agrega un objeto a `posts` en `src/content/blog.ts` con su portada 3:2 o 16:9.

### Animaciones
Scroll suave con [Lenis](https://github.com/darkroomengineering/lenis) (`src/components/SmoothScroll.tsx`) y aparición
`fadeInUp` de 1,25 s (`.reveal` en `globals.css`), igual que la referencia. Se desactivan con "reducir movimiento".

### SEO
- **Antes de publicar**, define `NEXT_PUBLIC_SITE_URL` (p. ej. `https://tudominio.pe`). Con él se generan canonical,
  hreflang, sitemap y datos estructurados con el dominio correcto, y `robots.txt` permite indexar.
  Sin él (localhost o previews) `robots.txt` bloquea la indexación a propósito.
- Opcional: `GOOGLE_SITE_VERIFICATION` con el código de Google Search Console.
- Incluye: títulos y descripciones por página, canonical + hreflang (es-PE / en / x-default), `sitemap.xml`,
  `robots.txt`, manifest, imágenes Open Graph generadas por página (`opengraph-image.tsx`) y JSON-LD
  (Organization/ProfessionalService, WebSite, FAQPage, Blog, BlogPosting, BreadcrumbList).
- Perfiles sociales: completa `linkedin` e `instagram` en `src/content/site.ts` (vacíos no se muestran).

### Páginas legales
- `/es/privacidad`: política de privacidad (Ley 29733 y D.S. 016-2024-JUS). Texto en `src/content/privacy.ts`.
- `/es/libro-de-reclamaciones`: Libro de Reclamaciones virtual (Ley 29571, D.S. 011-2011-PCM y modif.). Textos en
  `src/content/complaints.ts`; al enviar muestra la constancia imprimible y (con `RESEND_API_KEY`) envía copia al consumidor y a `CONTACT_TO`.
- **Completa antes de publicar** `site.legal` en `src/content/site.ts`: razón social, RUC, domicilio fiscal y código del banco de datos (ANPD).
- El número de hoja se basa en fecha y hora de Lima. Para numeración estrictamente correlativa y conservar las hojas 2 años (art. 12),
  conecta una base de datos; hoy quedan en el correo y en los logs del servidor.

### Formulario de contacto
`POST /api/contact`. Para recibir correos, define en `.env.local`:

```
RESEND_API_KEY=re_xxx
CONTACT_TO=tu@correo.com
CONTACT_FROM="C&J Web <web@tudominio.com>"
```

Sin `RESEND_API_KEY` las solicitudes (contacto y newsletter del blog) solo se registran en la consola del servidor.
