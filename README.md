# Soulcast Robotics: public website

The public site for [soulcastrobotics.com](https://soulcastrobotics.com), built with Next.js (App Router) and TypeScript. Right now it is a single animated "launching soon" home page.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully static)
npm start
```

Deploys as-is to Vercel (recommended) or any Node host. No environment variables or backend are needed.

## Where things live

| Path | What it is |
| --- | --- |
| `lib/site.ts` | Company name, email, WhatsApp number, address, nav links. Edit here and the whole site follows. |
| `app/page.tsx` | The home page |
| `app/globals.css` | All styles and animations (design tokens at the top) |
| `components/` | Reusable pieces: header, footer, contact form, animated backgrounds |
| `app/opengraph-image.tsx` | The social share image, generated at build time |
| `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` | SEO plumbing |

## Adding a page

1. Create `app/<route>/page.tsx` (for example `app/about/page.tsx`) and export a `metadata` object with its title and description.
2. Reuse `<SiteHeader />` and `<SiteFooter />` from `components/`.
3. Add the link to `nav` in `lib/site.ts` and the route to `routes` in `app/sitemap.ts`.

## Contact form

There is no server. Submitting the form opens WhatsApp (`wa.me/919605556054`) with the visitor's details pre-filled as a message they then send.

## Accessibility and performance

- Every animation respects `prefers-reduced-motion`.
- The particle canvas pauses when the tab is hidden and caps its particle count by screen size.
- The page is statically prerendered; fonts are self-hosted via `next/font`.
