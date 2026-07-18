# ZeroStack — marketing site

Marketing website for **ZeroStack by Prime Depth Labs**: a fixed-price build
programme — a production mobile app, admin panel, Node.js API, and PostgreSQL
database, delivered in 30 days for a flat ₹50,000.

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · React Three Fiber / three.js.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender statically)
npm run start      # serve the production build
```

Every route is static — the site deploys to Vercel, Netlify, or any static-ish
Node host with zero configuration.

## Where everything lives

| Path | What it is |
| --- | --- |
| `lib/site.ts` | **The single source of truth.** Brand name, price, phone/WhatsApp, timeline, FAQ, deliverables, legal date — change it here and every page follows. No copy string is duplicated outside this file. |
| `app/globals.css` | Design tokens (colours, type scale, utilities). Teal `--color-signal` is structure; amber `--color-amber` is reserved for money and day-markers. |
| `components/three/` | WebGL scenes: hero (frosted-glass prisms + floating product cards over a pastel light field — the one light-themed section), pipeline (AI → review → CI, with rejected packets falling off the line), stack (exploded strata), dust (closing CTA). All wrapped by `scene-canvas.tsx`, which defers mounting, caps pixel ratio, degrades on weak devices, and renders a single still frame under `prefers-reduced-motion`. |
| `components/terminal.tsx` | The auto-typing scope/schema/API editor on the landing page. |
| `components/sections/` | Landing page sections, one file each, in page order. |
| `app/{how-it-works,pricing,work,contact}/` | Secondary pages. |
| `app/{privacy,terms,refunds}/` | Legal pages (DPDP-aware, fixed-fee engagement terms). |

## Conventions

- The landing page is structured as a 30-day sprint: every section carries an
  amber `Day NN` marker (`SectionHeading`'s `day` prop). Keep new sections in
  that idiom.
- Amber = money and live markers only. Everything else uses signal teal.
- `useInView` (lib/hooks.ts) backs IntersectionObserver with a slow geometry
  poll because in-app webviews (WhatsApp/Instagram browsers) throttle IO —
  don't remove the backstop.
- Shader source lives in template literals; never interpolate raw JS numbers
  into GLSL (`${13/2}.0` → `6.5.0` is invalid GLSL — this bug has been made
  once already). Write literals directly.

## Before going live

- [ ] Point the production domain at the deploy and set `BRAND.domain` if it
      changes from `primedepthlabs.com`.
- [ ] Have a lawyer review `app/privacy`, `app/terms`, `app/refunds` — they are
      carefully written but generated, not counsel-reviewed.
- [ ] Confirm `hello@primedepthlabs.com` is a live inbox (it appears on legal
      and contact pages).
- [ ] Add an OG image (metadata is ready for one).
