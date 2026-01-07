# Copilot / AI agent instructions — ltc-site

Purpose: quick, actionable guidance so an AI coding agent becomes productive immediately.

- Project type: Next.js App Router app (app/ directory) using TypeScript (strict) and Next 15+. Keep changes compatible with the App Router.
- Key entrypoints: src/app/layout.tsx (global layout, fonts), src/app/page.tsx (home page), src/app/globals.css (global styles + theme variables).

Dev & build commands (use these exactly):

- `npm run dev` — starts Next dev server with Turbopack (localhost:3000).
- `npm run build` — builds with Turbopack.
- `npm run start` — runs the built app.

Important patterns & conventions (discoverable in repo):

- App Router first: modify files under `src/app/` — do NOT add a `pages/` directory unless intentionally migrating.
- Server components by default: avoid adding `"use client"` unless the UI requires client-only behavior (state/hooks/event handlers).
- Fonts use `next/font` in `src/app/layout.tsx` and expose CSS variables (e.g. `--font-geist-sans`). Wire these variables into CSS.
- Global theme variables live in `src/app/globals.css` (`--background`, `--foreground`) including a dark-mode media query.
- Static assets: put images in `public/` and reference them by absolute paths (example: `/homebg.png` used by `.page-background`).
- TypeScript path alias: `@/*` maps to `./src/*` (see tsconfig.json). Use it for imports when appropriate.

Tailwind / PostCSS:

- PostCSS config uses `@tailwindcss/postcss` plugin (see `postcss.config.mjs`). Global CSS imports Tailwind via `@import "tailwindcss"` in `src/app/globals.css`.
- If adding utility styles, follow the existing `globals.css` conventions and prefer classes over inline styles.

What to avoid / common pitfalls:

- Don't change Next.js major runtime choices (App Router, turbopack flags in scripts) without explicit user approval.
- Avoid emitting built artifacts or changing `noEmit` TypeScript config; development edits should be source-only.

Where to look for context/examples:

- Layout + font setup: src/app/layout.tsx
- Home page example: src/app/page.tsx
- Global styles & theme vars: src/app/globals.css
- Build/dev scripts and deps: package.json

When you make changes:

- Keep diffs minimal and focused. Update `src/app/*` for UI, `public/` for assets, and root config files (`next.config.ts`, postcss.config.mjs`, tsconfig.json`) only when necessary.
- Run `npm run dev` locally to validate UI changes; mention any manual verification steps in PR descriptions.

If unclear, ask the maintainer these quick clarifying questions:

1. Should we preserve Turbopack flags or test with webpack? (changes to scripts require approval)
2. Are there preferred CSS/Tailwind conventions beyond `globals.css`? (atomic classes vs component styles)

End of file.
