# The Innovators Landing Page

Next.js rebuild of The Innovators landing experience. The app is built with React, TypeScript, Tailwind-compatible project setup, shadcn-style primitives in `components/ui`, and a componentized landing page under `components/landing`.

## Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

Run quality checks:

```bash
npm run typecheck
npm run lint
npm run test
```

Deploy to the client Vercel project:

```bash
vercel deploy --prod --yes --scope innovatorsinstitute
```

## Folder Structure

- `app/page.tsx`: Small landing-page route entry that renders the dashboard component.
- `app/world`: World Innovation Landscape inner page with a closeable country intelligence map, global rankings, organizations, summits, playlists, and an AI agent panel.
- `app/usa`: U.S. Innovation Landscape inner page with a launch overlay map, a dedicated full-map view, institutions, state rankings, policy/ecosystem sections, industries, playlists, and an AI Discover Agent.
- `app/admin`: Typography admin UI. It is protected by `proxy.ts` and only works when admin credentials are configured.
- `app/styles`: Global stylesheet splits that are shared by routes, including admin typography controls.
- `components/landing`: Landing-page data, media cards, icons, rails, and the main dashboard composition.
- `components/ui`: Shared UI primitives following shadcn-style component conventions.
- `public/assets`: Local billboard and journey icon assets used by the landing page.
- `tests`: Basic smoke tests for repository structure and client-facing route safeguards.

## Client Routes

- `/`: Main visual platform landing page.
- `/world`: Global innovation encyclopedia page.
- `/usa`: U.S. innovation landscape page.
- `/usa/map`: Full-screen interactive U.S. innovation map.
- `/USA`: Redirects to `/usa` for the Canva/client naming convention.
- `/admin`: Protected local typography settings panel.

## Admin Route

`/admin` is a browser-local typography control panel for reviewing and tuning global font families, font sizes, weights, and styles by page area. It stores settings in `localStorage` so designers can test typography without changing source code.

The route is not public by default. Set both environment variables below to enable Basic Auth:

```bash
ADMIN_USERNAME=your-user
ADMIN_PASSWORD=your-password
```

If either value is missing, `/admin` returns a disabled response. Do not commit real credentials.

## Notes

- Dependency versions are pinned in `package.json` for reproducible installs.
- TypeScript strict mode is enabled.
- Keep visual changes scoped: this page has been tuned against client-provided Canva and Loom references, so layout ratios and content density are intentional.
