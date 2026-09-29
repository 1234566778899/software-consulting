@AGENTS.md

# C&J Software Consulting — sitio web

Sitio de la consultora de software C&J (Carlos y Juan Carlos, ingenieros de Sistemas de Información de la UPC).
Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS 4 + TypeScript. Bilingüe: `/es` (principal) y `/en`.
Repo: https://github.com/1234566778899/software-consulting (público).

## Comandos

```bash
npm run dev      # http://localhost:3000
npm run lint     # eslint (debe quedar sin errores)
npm run build    # compila y valida tipos; hazlo antes de dar algo por terminado
npx next typegen # regenera PageProps/LayoutProps al crear rutas nuevas (si tsc se queja de la ruta)
```

- `npm run build` reescribe `.next/` y deja inservible un `next dev` que esté corriendo: reinícialo después.
- No hay tests; verifica en el navegador (escritorio y 390 px de ancho, sin scroll horizontal).

## Dirección de diseño (decisiones del usuario)

- Referencia visual: **staffdigital.pe** (estructura, portafolio en mosaico, sellos circulares, contacto partido, blog, página Nosotros).
- Enfoque: que se note que cuidamos el **diseño UX/UI**. Tono profesional y cercano (tuteo). Nada de copy tipo "hermoso".
- Color primario **vino `#7B1E2E`** (`wine`); fondo claro cálido `#F5F4F0` (`canvas`); resaltado rosado suave (`marker`).
- Tipografías: Outfit (sans) + DM Serif Display (títulos serif). Tokens en `src/app/globals.css` (`@theme`).
- **Sin emojis en la UI.** Íconos siempre como SVG de línea.
- Menú con solo 5 entradas: Proyectos, Servicios, Nosotros, Blog, Contacto.

## Estructura

```
src/
  proxy.ts                     # redirige / → /es|/en según Accept-Language (en Next 16 es proxy, no middleware)
  i18n/{es,en,index}.ts        # diccionarios; en.ts está tipado con el tipo de es.ts. localHref() arma enlaces con idioma
  content/                     # contenido editable sin tocar componentes
    site.ts                    # nombre, correo, teléfono, WhatsApp, redes, stack, datos legales (site.legal)
    projects.ts                # proyectos del mosaico (hoy placeholders) + video del "Mira cómo se siente"
    blog.ts                    # artículos ES/EN (secciones, lista, portada en public/blog)
    team.ts                    # fundadores (retrato ilustrado en public/team, bio corta, LinkedIn)
    privacy.ts, complaints.ts  # textos legales
  lib/seo.ts                   # canonical/hreflang, ogBase/twitterBase, JSON-LD de la organización
  lib/og.tsx                   # imágenes Open Graph generadas (ImageResponse)
  components/                  # Header, Footer, ContactSection, VideoDialog, Reveal, SmoothScroll, blog/*…
  app/[lang]/                  # page (inicio), nosotros, blog, blog/[slug], privacidad, libro-de-reclamaciones
  app/api/                     # contact, newsletter, reclamaciones (envío por Resend si hay RESEND_API_KEY)
  app/{sitemap,robots,manifest}.ts
```

## Convenciones

- **Todo texto visible va en los diccionarios** (`src/i18n`) o en `src/content/*` con claves `es`/`en`. Nunca hardcodear solo en español.
- Rutas nuevas: dentro de `src/app/[lang]/`, con `generateMetadata` que use `localeAlternates(lang, "/ruta")`,
  `openGraph: { ...ogBase(lang), … }` y `twitter: { ...twitterBase, … }` (Next hace merge superficial; sin esto se pierden
  siteName y la tarjeta grande). Agrégala a `src/app/sitemap.ts`.
- Enlaces internos con `localHref(lang, "/#seccion" | "/ruta")`. Los anclas del inicio: `#proyectos #enfoque #servicios #proceso #preguntas #contacto`.
- Imágenes: `next/image`. Para la imagen LCP usa `fetchPriority="high"` + `loading="eager"` (en Next 16 `priority` está deprecado).
- JSON-LD con el componente `JsonLd` (escapa `<`).
- Animaciones: aparición con `<Reveal>` (fadeInUp 1,25 s, sin escalonados) y `.rise` solo para lo que está sobre el pliegue
  (anima transform, no opacidad, para no retrasar el LCP). Scroll suave con Lenis (`SmoothScroll`). Respetar `prefers-reduced-motion`.
- `useSyncExternalStore` en vez de `setState` dentro de `useEffect` para valores solo de navegador (regla de lint del proyecto).

## Trampas conocidas

- El menú a pantalla completa vive **fuera** de `<header>`: el `backdrop-filter` del header atrapa hijos `position: fixed`.
- Con el menú abierto Lenis está detenido; `SmoothScroll` usa `force: true` y espera a que cierre antes de desplazar.
- El desfase del header lo da `scroll-padding-top` en `html`; no sumar otro offset en `lenis.scrollTo`.
- En `lib/og.tsx` las rutas de archivos deben ser estáticas por carpeta (`join(process.cwd(), "public", "blog", file)`),
  si no el build rastrea todo el proyecto.
- Páginas estáticas no deben calcular "hoy" en el servidor (quedaría la fecha del build); hazlo en el cliente.

## SEO y despliegue

- Variables: `NEXT_PUBLIC_SITE_URL` (dominio final, obligatorio en producción; sin ella `robots.txt` bloquea la indexación a propósito),
  `GOOGLE_SITE_VERIFICATION` (opcional), `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (correos del contacto, newsletter y Libro).
- Dominio: `cjsoftware.online` (Namecheap, comprado el 29/09/2026), apuntado a Vercel. `www` redirige al dominio raíz.

## Legal (Perú)

- `/libro-de-reclamaciones`: campos del art. 5 y Anexo I del D.S. 011-2011-PCM; respuesta en 15 días hábiles (art. 24.1, Ley 29571);
  aviso visible en el footer de todas las páginas. `/privacidad`: Ley 29733 y D.S. 016-2024-JUS.
- **Pendiente del usuario:** completar `site.legal` (razón social, RUC, domicilio fiscal, código del banco de datos ante la ANPD).
- El número de hoja usa fecha/hora de Lima; para numeración correlativa y conservación de 2 años falta una base de datos.

## Contenido placeholder

- Proyectos del mosaico (Hábitat, Órbita, Sazón, Capital, Atlas IA) y sus videos son mockups generados con ChatGPT + ffmpeg.
  El usuario pidió mantenerlos así por ahora.
- Imágenes del sitio se generan con ChatGPT en modo **Work**. No generar fotos realistas de personas reales presentadas como fotos.
