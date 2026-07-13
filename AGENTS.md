# Agent Instructions — chapinismos.org

## Project

Astro 7 static site (SSG) for a Guatemalan slang dictionary. Deployed to Vercel.

- **Package manager**: pnpm only
- **Node**: >=22.0.0
- **Language**: Astro components + TypeScript/JavaScript
- **CSS**: Tailwind CSS 4 via Vite plugin
- **Content validation**: Zod (see `src/content.config.ts`)

## Commands

```bash
pnpm install          # install deps
pnpm run dev          # dev server at localhost:4321
pnpm run build        # production build (validates all word content via Zod)
pnpm run preview      # preview build output
pnpm run format       # Prettier (auto-sorts Tailwind classes)
pnpm run format:check # check formatting without writing
pnpm run lint         # ESLint
pnpm run lint:fix     # ESLint with autofix
```

Recommended pre-commit order: `format` -> `lint` -> `build`

## Architecture

- `src/pages/[lang]/` — all routes live under a language prefix (`/es/`, `/en/`)
- `src/pages/index.astro` — SSR page that detects `Accept-Language` and redirects to `/es/` or `/en/`
- `src/content/words-es/` and `src/content/words-en/` — word data as Markdown with Zod-validated frontmatter
- `src/utils/i18n.ts` — manual translation map (`translations.es` / `translations.en`), not a framework
- `src/content.config.ts` — Zod schema defining required fields and allowed categories
- `src/components/schemas/` — JSON-LD structured data components
- `src/pages/api/contribute.ts` — SSR-only API endpoint (uses Resend to email contributions)

### i18n routing

- Astro i18n routing with `prefixDefaultLocale: true` — URLs always start with `/es/` or `/en/`
- `src/pages/index.astro` has `prerender = false` (SSR) for server-side language detection
- All other pages are prerendered (`prerender = true`)

## Adding a word

1. Create a Markdown file in `src/content/words-es/` (e.g. `chilero.md`)
2. Create a matching file with the **exact same filename** in `src/content/words-en/`
3. Frontmatter fields: `word`, `publishedDate`, `meaning`, `examples`, `category` (required)
4. `category` must be one of: `sustantivo`, `verbo`, `adjetivo`, `adverbio`, `expresión`, `interjección`, `modismo` (Spanish) or `noun`, `verb`, `adjective`, `adverb`, `expression`, `interjection`, `idiom` (English)
5. Filenames: lowercase, no accents, kebab-case (`ponerse-las-pilas.md`)

Invalid content will fail the build — `pnpm run build` is your validation step.

## Formatting

Prettier config (`.prettierrc`):
- Double quotes, semicolons, 2-space indent, trailing commas (es5), 100-char print width
- Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss` (auto-sorts Tailwind classes)

ESLint: flat config (`eslint.config.js`) with `eslint-plugin-astro`. Ignores `dist/`, `.astro/`, `*.config.*`.

## Deployment

Vercel with `@astrojs/vercel` adapter. `vercel.json` configures security headers, aggressive caching for `/_astro/*`, and locale-based redirects from `/`. The root `/` redirect is SSR (handled by `src/pages/index.astro`).

## Environment variables

Required for the contribute API (`src/pages/api/contribute.ts`):
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTRIBUTIONS_TO_EMAIL`

`.env` is gitignored. Build works without them but the contribute endpoint will return 500.

## Gotchas

- `trailingSlash: "always"` in `astro.config.mjs` — URLs must have trailing slashes
- `remark-modified-time.mjs` is a custom remark plugin that injects `lastModified` into word pages
- `pnpm-workspace.yaml` sets `minimumReleaseAge: 1440` (24h) — pnpm will reject packages published less than 24h ago
- `tsconfig.json` has `@/*` path alias mapping to `src/*`
