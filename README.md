# Piquant Catering

Luxury catering website. Built with Next.js 16 (App Router), TypeScript, React 19, and CSS Modules. Deployed on Vercel.

## Quick start

```
npm install
npm install --prefix web
cp web/.env.example web/.env.local  # then fill in NEXT_PUBLIC_FORMSPREE_ENDPOINT
npm run dev
```

The site runs on http://localhost:3000.

## Common scripts

| Script              | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start Next.js in dev mode (proxies into `web/`). |
| `npm run build`     | Production build (`next build`).                 |
| `npm run start`     | Run the production build locally.                |
| `npm run lint`      | ESLint over `web/`.                              |
| `npm run test`      | Run the Vitest test suite once.                  |
| `npm run format`    | Format the repo with Prettier.                   |

You can run any of these directly inside `web/` too.

## Project layout

```
web/
├── src/
│   ├── app/             # Routes (App Router). Each folder = a route.
│   ├── components/      # Reusable UI: Navbar, Footer, Modal, FormModal, …
│   ├── data/            # Page content: menuItems, reviews, eventTypes, …
│   ├── hooks/           # useFormspree, useInViewAnimation
│   ├── lib/             # structuredData (JSON-LD builders)
│   ├── styles/          # Page-level CSS (one per route)
│   └── types/           # Shared TS types
├── public/assets/       # Images, the menu PDF, favicon
├── vitest.config.mts    # Test configuration
└── next.config.ts       # Next.js configuration
```

## Environment variables

| Name                              | Where it's used                          |
| --------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT`  | Every contact / inquiry form submits here. |
| `NEXT_PUBLIC_SITE_URL`            | Used in metadata, sitemap, JSON-LD.        |

Set these in Vercel's project settings for the production deploy.

## Deployment

Vercel auto-detects the framework. The root `vercel.json` runs `cd web && npm install && npm run build` and serves the resulting `web/.next` directory. Set the env vars in the Vercel dashboard before the first build.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs Prettier, ESLint, Vitest, and a full Next.js build on every PR.
