# Yat Ricco Company — Website

**Health & Wellness Made Simple.** A conversion-focused, multilingual brand and
light-commerce website for Yat Ricco Company, a trusted wellness retailer in
Samarahan, Sarawak, Malaysia.

🔗 Live (Netlify): https://yatricco.netlify.app/

## Highlights
- **Single-page, fully responsive** marketing + light-commerce site (no build step).
- **4 languages** with instant switching + memory: English, Bahasa Melayu, 中文, Iban.
- **WhatsApp-first commerce** — every product, form, and CTA routes to a pre-filled
  WhatsApp message to **+60 12-220 1411**.
- **AI-style wellness assistant** — an on-device, rule-based helper chat (no backend,
  no keys) that answers common questions in all 4 languages and hands off to WhatsApp.
- **Booking system** — a free-consultation modal that confirms via WhatsApp.
- **Product catalogue** — curated BE wellness product cards with "From RM" pricing.
- **Polished motion** — orchestrated hero load + scroll reveals, full
  `prefers-reduced-motion` support.
- **SEO ready** — semantic HTML, JSON-LD `Store` schema, Open Graph, sitemap, robots.

## Tech
Plain HTML, CSS, and vanilla JS. Fonts: Bricolage Grotesque + Hanken Grotesk
(Google Fonts). Imagery: Unsplash. Zero dependencies, zero build.

## Structure
```
index.html            # page markup
assets/css/styles.css # design system + page styles
assets/js/i18n.js     # translation dictionaries + product catalogue
assets/js/main.js     # nav, language, products, chat, booking, forms
assets/img/favicon.svg
netlify.toml           # publish + security/cache headers
PRODUCT.md / DESIGN.md # brief + design system notes
```

## Local preview
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Editing content
- **Products & translations:** `assets/js/i18n.js` (`PRODUCTS`, `I18N`).
- **Contact details:** search for `60122201411` / `nettihanie@gmail.com`.

## Deploy
Push this repo to Netlify (or drag-and-drop the folder). No build command needed;
publish directory is the repo root.

---
Built for Yat Ricco Company · Netti binti Sahari.
