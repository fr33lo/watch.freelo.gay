# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js (TypeScript)
- Styling: Tailwind CSS (with custom theme extensions)
- Testing: Vitest + Testing Library (jsdom)
- Lint/format: ESLint (TypeScript rules) + Prettier + lint-staged/Husky
- Env validation: @t3-oss/env-nextjs with Zod
- Node: engines >= 18.17.1

Setup and environment
- Install dependencies (uses npm with package-lock.json):
  ```bash path=null start=null
  npm install
  ```
- Create a local .env from the example:
  ```bash path=null start=null
  # PowerShell
  Copy-Item .env.example .env
  # bash
  cp .env.example .env
  ```
- Required environment variables (validated in src/env.mjs):
  - NEXT_PUBLIC_APP_URL (url)
  - NEXT_PUBLIC_TMDB_TOKEN (string)
  - NEXT_PUBLIC_SITE_NAME (string)
  - Optional: NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, NEXT_PUBLIC_TWITTER, NEXT_PUBLIC_FACEBOOK, NEXT_PUBLIC_INSTAGRAM, NEXT_PUBLIC_YOUTUBE, NEXT_PUBLIC_IMAGE_DOMAIN, NEXT_PUBLIC_DEFAULT_PROVIDER, NEXT_PUBLIC_PROVIDERS, MAL_CLIENT_ID, MAL_CLIENT_SECRET
- You can bypass strict env validation when necessary (e.g., during container builds):
  ```bash path=null start=null
  $env:SKIP_ENV_VALIDATION = "1"   # pwsh
  # or in bash: export SKIP_ENV_VALIDATION=1
  ```

Common commands
- Start dev server:
  ```bash path=null start=null
  npm run dev
  ```
- Build and run production:
  ```bash path=null start=null
  npm run build
  npm run start
  ```
- Lint, fix, and format:
  ```bash path=null start=null
  npm run lint
  npm run lint:fix
  npm run format
  npm run format:check
  ```
  - Lint a specific file (same mechanism used by lint-staged):
    ```bash path=null start=null
    npx next lint --file path/to/file.tsx
    ```
- Type-check:
  ```bash path=null start=null
  npm run typecheck
  ```

Testing
- Run the full test suite:
  ```bash path=null start=null
  npm run test
  ```
- Watch mode during development:
  ```bash path=null start=null
  npm run test:watch
  ```
- Watch a single test file (Vitest):
  ```bash path=null start=null
  npm run test:watch -- src/path/to/file.test.tsx
  ```
- Run a single test file (Vitest):
  ```bash path=null start=null
  npm run test -- src/path/to/file.test.tsx
  ```
- Run tests matching a name/pattern:
  ```bash path=null start=null
  npm run test -- -t "pattern"
  ```
Notes
- Tests execute in a jsdom environment and load src/test/setup.ts, which augments expect with jest-dom matchers, stubs React’s cache for tests, and sets minimal NEXT_PUBLIC_* defaults.

Architecture and structure
- Next.js configuration (next.config.mjs)
  - React Strict Mode enabled.
  - i18n configured with locales: ["en"].
  - Images configured from env.NEXT_PUBLIC_IMAGE_DOMAIN (defaults to image.tmdb.org) with sized/deviceSizes tuned for the app.
  - ESLint is ignored during build to unblock local builds; keep enforcement in the dedicated lint step.
- TypeScript configuration (tsconfig.json)
  - ES2020 target, Node-style module resolution, strict mode, noEmit.
  - Path alias "@/*" -> "./src/*" for app code.
- Styling (tailwind.config.ts, postcss.config.cjs)
  - Content globs cover pages, components, app, and src directories.
  - Custom theme includes container sizing, color tokens (including a terminal color set), animations, and font families.
- Linting/formatting
  - ESLint extends next/core-web-vitals and TypeScript rules (recommended + stylistic type-checked); several stylistic rules adjusted.
  - Prettier integrated; lint-staged runs Next lint with --fix and Prettier on staged files; Husky is prepared via "prepare" script.
- Environment management (src/env.mjs)
  - Validates both server and client env vars via Zod; client vars must be prefixed with NEXT_PUBLIC_.
  - SKIP_ENV_VALIDATION can bypass checks during dev/build if needed.
- Testing (vitest.config.ts)
  - jsdom environment; setup file at src/test/setup.ts; includes test files under src/**/*.test.{ts,tsx}.

Deployment notes (from README.md)
- Vercel: “Deploy with Vercel” button available; requires NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_TMDB_TOKEN, NEXT_PUBLIC_SITE_NAME.
- Cloudflare Pages: supported via @cloudflare/next-on-pages; see linked README in repository for configuration details.

Conventions for future changes
- Use the "@/*" import alias for code under src/.
- When adding new tests, place them under src/** and follow the *.test.ts/tsx pattern to be picked up by Vitest.
