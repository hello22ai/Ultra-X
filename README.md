# Ultra X Player

Premium Indian IPTV streaming-box marketing site — built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**. The UI is a gold/silver, motion-rich landing page (Space Grotesk display type, aurora background, cursor glow, scroll reveals, animated mockups).

## Tech stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript** (strict)
- **Tailwind CSS 3** + custom CSS in `app/globals.css`
- `@iconify/react` for icons

## Project structure

```
app/
  layout.tsx        Root layout — fonts (Inter via next/font) + SEO metadata
  page.tsx          Renders <UltraX />
  globals.css       Tailwind layers + design tokens, keyframes, .uxp scope
components/
  UltraX.tsx        The landing page (client component): nav, hero, features,
                    app mockup, content grid, product tabs, compare, specs,
                    setup, stats, reviews, pricing, FAQ, contact, footer —
                    plus all state, interactivity & scroll/cursor effects.
lib/
  data.tsx          Content data (features, products, compare rows, specs,
                    steps, testimonials, FAQs, TV-showcase image sets).
  ui.tsx            Presentational primitives & style tokens (Svg/Pa icons,
                    Arrow, Check, PriceCard, SPACE font, section/kicker styles).
public/
  logo.png          Transparent Ultra X wordmark
  tiles/            Imagery used in the mockups
    cats/           Content-category card images (1–8)
    sets/           Per-tab TV-showcase images (foryou / sports / movies / kids)
    posters/        Misc poster thumbnails
    *.jpg, live.mp4 Section imagery / sample clip
```

Path alias: `@/*` → project root (e.g. `import { products } from "@/lib/data"`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Notes

- All mockup imagery lives in `public/tiles/`. To swap any image, drop a file
  with the same name/path — no code change needed.
- The design originated from a Claude Design `.dc.html` and was ported to a
  React component with the gold/silver theme preserved.
