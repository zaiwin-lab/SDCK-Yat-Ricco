# Yat Ricco Digital Wellness Storefront

> **Maturity:** Working public prototype · multilingual, WhatsApp-first commerce experience

A lightweight digital storefront for a Sarawak wellness retailer. It brings product discovery, basic guided assistance, consultation booking and customer hand-off into one responsive experience without requiring a custom commerce backend.

**Live demonstration:** [yatricco.netlify.app](https://yatricco.netlify.app/)

## Business problem

Small retailers that sell through social media and manual chats can struggle to present a consistent catalogue, answer repeated questions and move interested visitors into a clear purchase conversation. This project tests a simple storefront that keeps the human sales relationship while reducing discovery friction.

## Intended users

- Prospective wellness and lifestyle-product customers
- Returning customers who want a faster enquiry route
- The retailer or sales team managing consultations through WhatsApp
- Portfolio reviewers evaluating multilingual, conversion-focused product delivery

## Demonstrated capabilities

- Responsive single-page product and brand experience
- English, Bahasa Melayu, Chinese and Iban content switching
- Product catalogue with indicative “From RM” pricing
- Pre-filled WhatsApp hand-offs from products and calls to action
- Consultation-booking flow that hands the enquiry to WhatsApp
- Local, rule-based wellness helper with multilingual scripted responses
- Semantic HTML, Open Graph metadata, JSON-LD, sitemap and robots directives
- Motion design with reduced-motion support

## Strategic value

The concept shows how a local business can gain a credible digital front door without immediately adopting a full e-commerce stack. Its WhatsApp-first model meets customers in an existing channel, while the multilingual interface broadens accessibility across Sarawak audiences.

## How the assistant works

The on-page helper is a deterministic, rule-based interface running in the browser. It does **not** call a language model, diagnose a condition or generate clinical advice. Its purpose is to answer common scripted questions and direct visitors to a human conversation.

## Technology

- HTML5 and semantic structured content
- CSS design system and responsive layouts
- Vanilla JavaScript for navigation, localisation, catalogue rendering and interactions
- Netlify configuration for static delivery and headers
- No database, payment gateway, user account or server-side application

## Delivery role

**Ts. Zaiwin Kassim** provided product framing, rapid-prototype direction, delivery coordination and portfolio documentation with the **KOBIS AI Prodigy Team**. The repository records the resulting working concept; it does not claim commercial adoption, transaction volume or production certification.

## Responsible-use boundaries

- Product descriptions, availability, prices and wellness claims must be confirmed by the retailer before publication or purchase.
- The helper is not medical advice. Users with symptoms, medication questions or health concerns should consult a qualified healthcare professional.
- WhatsApp and other third-party services apply their own privacy terms; users should avoid sending unnecessary sensitive health information.
- The current flow does not process payments, authenticate users, store orders or provide a secure clinical record.
- Third-party images, fonts, trademarks and product materials require appropriate usage rights.
- A public demo proves interface availability only; it does not establish regulatory approval, endorsements or operational readiness.

## Current limitations

- Enquiries and bookings leave the site for WhatsApp rather than being stored in an application backend.
- Catalogue and translations are maintained in source files.
- Prices are indicative and no stock, fulfilment or payment integration is present.
- The wellness helper uses a fixed response set.

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Repository map

```text
index.html             Page structure and metadata
assets/css/styles.css  Visual system and responsive behaviour
assets/js/i18n.js      Translation dictionaries and catalogue data
assets/js/main.js      Navigation, catalogue, helper and booking logic
netlify.toml           Static-hosting configuration
PRODUCT.md             Product brief
DESIGN.md              Design-system notes
```

## Portfolio evidence

This repository demonstrates multilingual experience design, low-complexity commerce orchestration, responsible AI-style interface labelling, mobile-first delivery and a practical hand-off between self-service discovery and human support.
