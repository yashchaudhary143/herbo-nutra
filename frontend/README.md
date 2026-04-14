# Herbo Nutra Frontend

Next.js storefront and admin UI for the Herbo Nutra Extract website.

## Commands
- `npm run dev` starts local development.
- `npm run lint` runs ESLint.
- `npm test` runs the Vitest suite.
- `npm run build` creates the production build.

## Runtime Notes
- Public catalog pages fetch active categories, products, and forms from the backend API.
- `/products` accepts `form` and `search` query params and seeds the live catalog filters from the URL.
- The site header receives category links from the server layout, so new admin-created categories appear in navigation without code changes.

## Production Notes
- The Docker image uses Next standalone output and starts with `node server.js`.
- Turnstile must be configured in production with `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Admin and inquiry flows depend on the backend cookie auth and `/api/*` rewrites configured in `next.config.ts`.
