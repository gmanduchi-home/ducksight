# The Duck Sight Studio

Sito vetrina di **Giulia Repetto** — videomaker, visual storyteller, voice creator.
Dominio: [theducksight.studio](https://theducksight.studio)

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** — palette ancorata al logo (teal, beak, cream)
- **next-intl** — i18n IT 🇮🇹 + EN 🇬🇧 (default IT, rotte `/` e `/en`)
- **Sanity v3** — CMS headless con Studio embedded a `/studio`
- **Framer Motion** — micro-interazioni e lightbox
- Mobile-first, SEO-optimized (JSON-LD, sitemap, robots, hreflang)

## Sviluppo locale

```bash
npm install
npm run dev          # → http://localhost:3000
```

### Variabili d'ambiente

Copia `.env.local.example` in `.env.local` e compila:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=0x8hdqov
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

> Senza Sanity configurato il sito mostra i dati di fallback in `src/data/`.

## Struttura

```
src/
├── app/
│   ├── layout.tsx                  # Root: html, body, Google Fonts
│   ├── [locale]/                   # Sito i18n IT/EN
│   │   ├── layout.tsx              # Header, Footer, Provider, JSON-LD
│   │   └── page.tsx                # Home: Hero → Portfolio → Visioni → Servizi → Aree → About → Contatti
│   ├── studio/[[...tool]]/         # Sanity Studio embedded
│   ├── sitemap.ts, robots.ts
│   └── icon.png, apple-icon.png    # Favicon dal logo
├── components/                     # Hero, ProjectCard, Lightbox, VideoSection, …
├── config/site.ts                  # Brand, email, telefono, social, aree servite
├── data/                           # Fallback statico: projects.ts, videos.ts
├── i18n/                           # routing, request, navigation (next-intl)
├── sanity/                         # client, schemas, queries, fetch (con fallback)
└── middleware.ts                   # i18n routing (esclude /studio, /api)
messages/                           # it.json, en.json
public/                             # logo, foto progetti, ritratto About
tools/optimize-images.mjs           # script resize foto in-place
```

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm run dev` | Dev server con Turbopack (porta 3000) |
| `npm run build` | Build di produzione (webpack) |
| `npm start` | Avvia build prod (Node, porta 3000) |
| `npm run lint` | ESLint |
| `node tools/optimize-images.mjs` | Resize foto in `public/projects/` a max 1600px, WebP q82 |

## Sanity CMS

- Pannello admin: `/studio` (in dev: http://localhost:3000/studio)
- Login con account Sanity (gestione su https://www.sanity.io/manage)
- **Importante**: aggiungere `http://localhost:3000` e `https://theducksight.studio` come **CORS origins** sul progetto Sanity
- Tipi documento: `siteSettings` (singleton), `project`, `video`, `service`
- Tutti i campi testuali sono bilingue (oggetto `{ it, en }`)
- Quando Sanity è popolato, sostituisce i fallback statici di `src/data/`

### Studio in produzione

Lo Studio è servito da `/studio` sullo stesso dominio del sito.
In alternativa si può deployare separatamente su `<nome>.sanity.studio` (gratis):

```bash
npm exec sanity deploy
```

## Deploy su Vercel + dominio Aruba

1. **Repo Git** (GitHub/GitLab) — push del codice
2. **Vercel** → Add New Project → seleziona repo
3. **Environment variables** → copia i 3 valori `NEXT_PUBLIC_SANITY_*`
4. **Dominio custom** su Vercel → `theducksight.studio`
5. **DNS Aruba** (admin.aruba.it → Domini → DNS):
   - Record `A` su `@` → `76.76.21.21`
   - Record `CNAME` su `www` → `cname.vercel-dns.com`
6. SSL Let's Encrypt automatico, propagazione DNS 10 min – 1 h

## Personalizzazione

- **Palette**: `tailwind.config.ts` → `theme.extend.colors`
- **Brand & contatti**: `src/config/site.ts` (telefono, email, social, aree)
- **Testi statici**: `messages/it.json` e `messages/en.json`
- **Logo**: `public/logo.png` + favicon ottimizzato in `src/app/icon.png`

## SEO

- JSON-LD `ProfessionalService` con `areaServed` (5 città)
- Sitemap auto-generato (`/sitemap.xml`)
- `hreflang` alternate IT/EN
- Keyword: videomaker, creazione video, video editing + province Cesena, Rimini, Pesaro, Ravenna, Bologna
