# Yat Ricco Company — Design System

## Scene
Sarawak herbal apothecary at first light: sage leaves drying, clay vessels on a
clean shelf, warm morning air over the river. Calm, grounded, caring, credible.
Warmth comes from the clay + sage brand colors and the typography, never from a
muddy cream background.

## Color strategy — Committed
Primary terracotta/clay carries the warmth; sage is the living, wellness
secondary; surfaces stay clean and bright so the brand colors glow. Two
full-saturation "drench" moments anchor the long scroll: a deep forest-green
"How it works" band and a clay "Start your wellness" band.

### Tokens (OKLCH)
- `--bg`            oklch(0.988 0.004 110)  near-white, faint warm cast
- `--surface`      oklch(1 0 0)            pure white cards/sheets
- `--surface-sage` oklch(0.965 0.012 150)  faint sage wash sections
- `--ink`          oklch(0.27 0.018 160)   deep forest charcoal (body + heads)
- `--ink-soft`     oklch(0.44 0.016 160)   secondary text (>= 4.5:1 on light)
- `--clay`         oklch(0.585 0.115 40)   primary terracotta
- `--clay-deep`    oklch(0.49 0.115 38)    pressed/hover, on-light text
- `--sage`         oklch(0.66 0.055 152)   secondary sage
- `--sage-deep`    oklch(0.45 0.05 155)    forest accents
- `--forest`       oklch(0.30 0.03 158)    dark drench band + footer
- `--sand`         oklch(0.93 0.022 78)    warm hairlines / chips
- `--gold`         oklch(0.78 0.085 80)    small highlight only

## Type
- Display: **Bricolage Grotesque** (600–800) — characterful, modern, friendly-credible.
- Body: **Hanken Grotesk** (400–600) — clean humanist sans, high legibility.
- Contrast axis = display character vs neutral body. Two families, no mono.
- Headings use `clamp()`, `text-wrap: balance`, letter-spacing >= -0.03em.

## Motion
- One orchestrated hero load (staggered rise + image settle).
- Scroll reveals enhance already-visible content (no visibility gating).
- Ease-out-expo curves. Full `prefers-reduced-motion` fallbacks.

## Components
Sticky nav + language switcher, hero, trust strip, product grid (light commerce),
wellness concept triad, 5-step experience loop (forest drench), why-us,
founder story (split + image), booking modal + form, contact, footer.
Floating WhatsApp button + lightweight helper chat assistant.

## Bans honored
No glassmorphism-as-default, no gradient text, no per-section uppercase eyebrows,
no numbered section scaffolding, no side-stripe borders, no cream body bg.
