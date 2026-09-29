# VERDANT ATELIER — Haute Ébénisterie & Contemporary Living

A complete, modern, luxury architectural furniture website built with production-grade HTML5, CSS3, and vanilla JavaScript. Designed for high visual impact, editorial elegance, fluid responsiveness, and instant offline execution without build dependencies.

---

## 🏛️ Quick Start

**You can run the entire website immediately by double-clicking `index.html` or opening it in any web browser.**

No terminal commands, Node.js server, or build steps required. All fonts, styles, scripts, and high-resolution furniture imagery are self-contained within the `./assets/` directory.

---

## 🎨 Visual Identity & Color System

The website strictly follows the curated luxury earthy palette:

| Role | Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Primary / Canvas** | **Emerald Green** | `#0F6B4E` | Main backgrounds, hero surfaces, active navigation states, primary buttons, structural framing. |
| **Secondary Accent** | **Olive Brown** | `#7A5C3A` | Architectural borders, category badges, supporting metadata, icons, editorial quotations. |
| **Light Accent** | **Light Beige** | `#E1C699` | Primary headings on dark surfaces, card highlights, subtle hairline borders, interactive button hover fills. |

Harmonious supporting tones such as deep forest night (`#07261C`) and ivory white (`#FAF6F0`) are used strictly to maintain WCAG-compliant contrast and legibility.

---

## ✍️ Typography Architecture

The website uses strictly the two required font families via offline `@font-face`:

### 1. Display & Headings: **Panchang**
* **Font File:** `assets/fonts/Panchang-Variable.woff2`
* **Assigned To:** Main hero headlines, section titles, page headers, navigation headings, collection titles, metric counters.
* **Character:** Ultra-wide, assertive, architectural geometric display with distinct luxury editorial presence.

### 2. Body & Detail: **Sentient** *(Registered also with 'Sentinent' alias)*
* **Font Files:** `assets/fonts/Sentient-Variable.woff2` & `assets/fonts/Sentient-VariableItalic.woff2`
* **Assigned To:** Paragraphs, craftsmanship storytelling, product descriptions, FAQ accordion answers, technical specifications, contact forms, labels, and buttons.
* **Character:** Refined, high-contrast transitional serif with classical book typography proportions.

---

## 📄 Pages Included

1. **`index.html` — Home**
   * Announcement bar for private appointments.
   * Sticky blurred navigation with mobile drawer.
   * Large Panchang hero statement with metrics strip, floating craftsmanship badge, and curated living room photography.
   * Brand introduction & the "Atelier Creed".
   * Featured Collections grid (Living Sanctuary, Dining Solarium, Master Suite).
   * Four pillars of "The Atelier Distinction" with custom icons.
   * Masterpiece Spotlight (The Orix Curvilinear Sofa) with technical specifications.
   * Press accolades from Architectural Digest, Wallpaper*, and Elle Décor.
   * Private consultation invitation CTA.

2. **`about.html` — About Us**
   * Narrative origin story of the water-mill atelier in the Jura valley.
   * The 5 Chapters of Craftsmanship (Timber Seasoning, Mortise Joinery, Organic Oils, Haute Upholstery, Ebéniste Hallmark).
   * Leadership profile of Founder & Head of Spatial Architecture Matthias Vance.
   * Circular ecological covenant (10:1 replanting guarantee, non-toxic organic oils, lifetime restoration buyback).

3. **`collections.html` — Collections Archive**
   * Live category filter tabs (All, Living Sanctuary, Dining Solarium, Master Suite, Architectural Accents).
   * Real-time search bar filtering across names, woods, and descriptions.
   * Sorting dropdown (Curated, Price Low-to-High, Price High-to-Low, Alphabetical A–Z).
   * 9 curated furniture cards with aspect-ratio containers, hover zoom, tags, specifications, and lookbook wishlisting.
   * Interactive "Quick View" modal trigger and direct inquiry routing.
   * Bespoke dimensions callout for custom sizing.

4. **`contact.html` — Contact & Concierge**
   * Flagship showroom addresses and viewing hours (Mayfair London & Tribeca New York).
   * Direct contact channels, telephone lines, and trade program specifications.
   * Full client-side validated Commission Dossier form (Name, Email, Telephone, Client Role, Material Preference, Project Scope).
   * Animated loading state ("Transmitting Dossier...") and generated reference confirmation modal (`VA-XXXXXX`).

5. **`faqs.html` — Knowledge & Care**
   * Accessible expand/collapse accordion components with smooth SVG indicator rotation.
   * Live search bar that dynamically filters questions as you type.
   * Category filter pills (All, Bespoke & Orders, Materials & Care, Logistics & White Glove, Trade & Architects).
   * 10 deeply detailed questions covering joinery, oak vs. smoked wood, COM upholstery, radiant floor heating, white-glove uncrating, and 25-year structural guarantee.

6. **`privacy.html` — Privacy Policy**
   * Client Discretion Protocol, confidential residential floorplan handling, minimal cookie deployment, and GDPR/CCPA rights.

7. **`terms.html` — Terms of Commission**
   * Bespoke handcraft nature, deposit schedules, 25-year structural joinery guarantee, and spatial architectural delivery access requirements.

8. **`404.html` — Custom 404 Page**
   * "Spatial Plan Void — 404 Coordinates Unfound" with quick navigation to return to the gallery or browse collections.

---

## ⚡ Interactive Components & JavaScript Features

All implemented in lightweight, zero-dependency vanilla JS (`assets/js/main.js`):

* **Sticky Blur Header:** Adds backdrop blur and subtle shadow on scroll.
* **Mobile Drawer:** Smooth slide-out menu with backdrop overlay, scroll lock, and ESC key support.
* **Curated Lookbook Wishlist:** Click heart buttons on pieces to save them; count badge updates in header and persists across browser refreshes via `localStorage`.
* **Quick View Modal:** Opens detailed dimensional specs sheet and direct commission link without leaving the page.
* **Client-Side Form Validation:** Real-time feedback with clear error messaging and animated confirmation screen.
* **Live Collection Filtering & Sorting:** Instant client-side filtering by category, search keywords, and price/name sort.
* **FAQ Accordion & Live Keyword Search:** Smooth expansion and instant filter as the user types.
* **Demo Cookie Consent Banner:** Elegant floating banner with "Accept All" and "Essential Only" options, preserving preference in `localStorage`.
* **Toast Notification Engine:** Non-intrusive floating toasts for saving items, subscribing to newsletter, and saving preferences.

---

## 🖼️ Replacing Images

All images are neatly organized in `assets/images/` with standardized dimensions and semantic filenames:
* `hero-living.jpg` — Hero section main atmosphere
* `sofa-emerald.jpg` — Orix Curvilinear Sofa
* `chair-lounge.jpg` — Solis Bouclé Armchair
* `dining-table.jpg` — Kanso Dining Table
* `chair-sculptural.jpg` — Kyoto Dining Chair
* `bedroom-suite.jpg` — Monolith Platform Bed
* `bedroom-zen.jpg` — Sylvan Console Nightstand
* `credenza-wood.jpg` — Nara Fluted Credenza
* `lighting-brass.jpg` — Astra Brass Pendant
* `sofa-curved.jpg` — Cirque Organic Lounge
* `craft-joinery.jpg` — Artisan chiseling mortise & tenon
* `craft-studio.jpg` — Atelier woodworking studio
* `founder-portrait.jpg` — Studio founder portrait
* `showroom-gallery.jpg` — Mayfair showroom interior

To replace any photograph with your own high-resolution files, simply drop your image into `assets/images/` using the matching filename. All containers use CSS `aspect-ratio` and `object-fit: cover`, so your layout will never distort or break.

---

## 💻 Browser Support & Standards
* Fully responsive across Mobile (<640px), Tablet (641px–1024px), Laptop (1025px–1440px), and Ultra-Wide Desktop (1440px+).
* Zero horizontal overflow on mobile viewports.
* Semantic HTML5 (`<main>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<aside>`, `<nav>`).
* WCAG 2.1 AA accessible focus rings, ARIA roles, and color contrasts.
