# StoryCast — Accessible Audio & Video Storytelling Microsite

StoryCast is a three-page accessible microsite built for audio and video storytelling. Every design and development decision was made with accessibility at its core — from semantic HTML structure to WCAG 2.1 AA compliant contrast ratios, keyboard navigation, captions, and full transcripts.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Pages](#pages)
- [Design System](#design-system)
- [Running Locally](#running-locally)
- [Accessibility Checklist](#accessibility-checklist)
- [Research & Planning](#research--planning)
- [Tools Used](#tools-used)

---

## Project Overview

**Project name:** StoryCast
**Type:** 3-page accessible microsite
**Story featured:** Echoes of the Valley — a documentary about the acoustic communities of the High Ridge range
**Author:** [Your Name]
**Course:** [Your Course Name]
**Submitted:** 2024

StoryCast was designed and built without any CSS or JavaScript frameworks. All styling is written in Sass using a BEM naming convention and compiled to plain CSS. All interactivity is written in vanilla JavaScript.

---

## Folder Structure

```
storycast-microsite/
│
├── index.html                    Home page
├── about.html                    About / Accessibility page
├── README.md                     This file
│
├── story/
│   └── story-1.html              Story detail page — Echoes of the Valley
│
├── sass/
│   ├── _colors.scss              Color tokens (brand, surface, text, semantic)
│   ├── _typography.scss          Type scale, font weights, line heights, mixins
│   ├── _spacing.scss             Spacing scale, breakpoints, shadows, transitions
│   └── main.scss                 All component styles — imports the three partials above
│
├── css/
│   └── main.css                  Compiled output from Sass — what the browser reads
│
├── assets/
│   ├── js/
│   │   └── main.js               Vanilla JS — mobile nav, forms, transcript scroll
│   │
│   ├── media/
│   │   ├── echoes-of-the-valley.mp4    Main documentary video
│   │   ├── echoes-narration.mp3        Audio narration version
│   │   ├── hero-studio.jpg             Hero section image
│   │   ├── echoes-thumb.jpg            Featured story thumbnail
│   │   ├── solidarity-thumb.jpg        Streets of Solidarity thumbnail
│   │   ├── weavers-thumb.jpg           The Weaver's Silence thumbnail
│   │   ├── coastal-thumb.jpg           Coastal Rhythms thumbnail
│   │   ├── archive-thumb.jpg           Listening to the Past thumbnail
│   │   ├── market-thumb.jpg            Morning at the Market thumbnail
│   │   ├── audio-category.jpg          Browse — Audio Stories card
│   │   ├── video-category.jpg          Browse — Video Stories card
│   │   ├── community-category.jpg      Browse — Community Stories card
│   │   └── about-hero.jpg              About page hero image
│   │
│   ├── captions/
│   │   └── echoes-of-the-valley.vtt    WebVTT captions for the main video
│   │
│   └── transcripts/
│       └── echoes-of-the-valley-transcript.txt   Full text transcript
│
└── assets/planning/
    ├── sitemap.png               Information architecture sitemap (draw.io export)
    ├── mockup-home.png           High-fidelity mockup — Home page
    ├── mockup-story.png          High-fidelity mockup — Story detail page
    └── mockup-about.png          High-fidelity mockup — About page
```

---

## Pages

### Home page — `index.html`
The entry point for StoryCast. Introduces the platform with a hero section, featured story cards, a browse-by-format section with category images, an accessibility highlights section, a story grid, and a newsletter signup.

**Key semantic elements used:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<ul>`, `<form>`

### Story detail — `story/story-1.html`
A dedicated page for the featured story *Echoes of the Valley*. Contains an HTML5 `<video>` element with a `<track>` for WebVTT captions, a scrollable transcript panel, story pagination (previous / next), and a related stories grid.

**Key semantic elements used:** `<article>`, `<figure>`, `<figcaption>`, `<video>`, `<track>`, `<aside>`, `<nav aria-label="Story pagination">`, `<time>`

### About / Access — `about.html`
Explains the StoryCast mission, accessibility commitments, and WCAG 2.1 AA compliance. Includes a bento-grid layout of standards and commitments, an accessibility feedback form, and sidebar contact information.

**Key semantic elements used:** `<article>`, `<section>`, `<aside>`, `<form>`, `<label>`, `<input>`, `<textarea>`

---

## Design System

### Colors (defined in `sass/_colors.scss`)

| Token | Value | Usage |
|---|---|---|
| `$color-secondary` | `#006e2d` | Brand green — nav active, buttons, badges |
| `$color-secondary-dark` | `#004d1f` | Hover states on green elements |
| `$color-secondary-light` | `#e8f5ee` | Light green tints, badge backgrounds |
| `$color-surface` | `#f9f9ff` | Page background |
| `$color-on-surface` | `#141b2b` | Primary text — headings |
| `$color-on-surface-variant` | `#444748` | Secondary text — body copy |
| `$color-outline-variant` | `#c4c7c8` | Subtle card borders |
| `$color-focus` | `#2563eb` | Keyboard focus ring color |

### Typography (defined in `sass/_typography.scss`)

Font family: **Public Sans** (Google Fonts)
Scale: 12px → 14px → 16px → 18px → 24px → 30px → 32px → 48px
All sizes use rem units. Base: 16px.

### Spacing (defined in `sass/_spacing.scss`)

Scale: 4px / 8px / 16px / 24px / 32px / 48px
Container max-width: 1200px
Breakpoints: 480px / 768px / 1024px / 1280px

### BEM Naming Convention

All CSS classes follow Block__Element--Modifier:

```
.nav                  Block
.nav__logo            Element
.nav__link--active    Modifier

.card                 Block
.card__thumb          Element
.card__title          Element
.card--featured       Modifier
```

### Container Query

The `.related-card` component uses a CSS container query so cards reflow when their container is narrow — hiding the description and reducing the title size to keep content readable at small widths:

```css
.related-card {
  container-type: inline-size;
  container-name: related-card;
}

@container related-card (max-width: 300px) {
  .card__desc  { display: none; }
  .card__title { font-size: 16px; }
}
```

---

## Running Locally

### Requirements
- A code editor (VS Code recommended)
- The Live Server extension for VS Code
- Node.js and the Sass npm package (only needed if you want to recompile Sass)

### Option 1 — Live Server (simplest, no setup)

1. Open the `storycast-microsite` folder in VS Code
2. Right-click `index.html` in the file explorer
3. Click **Open with Live Server**
4. The site opens at `http://127.0.0.1:5501/index.html`
5. Navigate between pages using the top navigation

### Option 2 — Any local server

```bash
# Python (if installed)
cd storycast-microsite
python3 -m http.server 8000
# Open http://localhost:8000
```

### Recompiling Sass (optional)

The compiled `css/main.css` is already included and ready to use. If you edit the Sass files and want to recompile:

```bash
npm install -g sass
sass sass/main.scss css/main.css --watch
```

### No build step needed for normal use

Open `index.html` via Live Server and the site runs completely from static files. All fonts and icons load from Google Fonts CDN — an internet connection is required for those to appear.

---

## Accessibility Checklist

The following WCAG 2.1 AA requirements have been implemented and verified:

### Perceivable

| Criterion | Requirement | Implementation | Status |
|---|---|---|---|
| 1.1.1 | Non-text content has text alternatives | All `<img>` tags have descriptive `alt` attributes. Decorative icons use `aria-hidden="true"` | Met |
| 1.2.2 | Captions for video | `<track kind="captions">` with WebVTT file on the story video | Met |
| 1.2.3 | Audio description or transcript | Full text transcript provided inline and as downloadable `.txt` | Met |
| 1.3.1 | Info and relationships | Semantic HTML5 throughout — `<header>`, `<main>`, `<nav>`, `<article>`, `<aside>`, `<footer>`, `<section>` with `aria-labelledby` | Met |
| 1.3.2 | Meaningful sequence | DOM order matches visual order on all pages | Met |
| 1.4.3 | Contrast (minimum) | Primary text `#141b2b` on white `#ffffff` = 17.1:1. Green `#006e2d` on white = 7.2:1. Both exceed 4.5:1 AA requirement | Met |
| 1.4.4 | Resize text | All sizes in rem. Page tested at 200% zoom with no content loss | Met |
| 1.4.10 | Reflow | Layout reflows at 320px viewport without horizontal scrolling | Met |

### Operable

| Criterion | Requirement | Implementation | Status |
|---|---|---|---|
| 2.1.1 | Keyboard accessible | All interactive elements reachable and operable by keyboard alone | Met |
| 2.1.2 | No keyboard trap | Tab order moves freely through all elements. Escape closes mobile menu | Met |
| 2.4.1 | Bypass blocks | Skip link (`<a class="skip-link" href="#main-content">`) is first element in DOM, visible on focus | Met |
| 2.4.2 | Page titled | Each page has a unique, descriptive `<title>` | Met |
| 2.4.3 | Focus order | Tab order follows logical reading order. No focus jumps | Met |
| 2.4.6 | Headings and labels | One `<h1>` per page. Heading hierarchy h1 → h2 → h3 throughout | Met |
| 2.4.7 | Focus visible | `:focus-visible` ring — 2px white offset + 4px blue outline on all interactive elements | Met |

### Understandable

| Criterion | Requirement | Implementation | Status |
|---|---|---|---|
| 3.1.1 | Language of page | `<html lang="en">` on all three pages | Met |
| 3.2.1 | On focus | No context changes triggered on focus alone | Met |
| 3.3.1 | Error identification | Newsletter and feedback forms use `aria-invalid`, `aria-live` error messages, and `role="alert"` | Met |
| 3.3.2 | Labels or instructions | All form inputs have associated `<label>` elements using `for` / `id` pairing | Met |

### Robust

| Criterion | Requirement | Implementation | Status |
|---|---|---|---|
| 4.1.1 | Parsing | Valid HTML5 throughout. No duplicate IDs | Met |
| 4.1.2 | Name, role, value | ARIA attributes used where semantic HTML alone is insufficient — `aria-expanded`, `aria-current`, `aria-labelledby`, `aria-describedby`, `aria-live`, `aria-required` | Met |
| 4.1.3 | Status messages | Form success and error messages delivered via `role="alert"` and `aria-live="polite"` | Met |

---

## Research & Planning

### Information Architecture

The sitemap and page hierarchy were planned before any code was written. The sitemap diagram is saved at `assets/planning/sitemap.png`.

Three pages with clear user intent:

- **Home** (`index.html`) — discovery and browsing
- **Story detail** (`story/story-1.html`) — focused consumption with media and transcript
- **About / Access** (`about.html`) — mission, accessibility statement, feedback

### High-Fidelity Mockups

Mockups were created in Figma before development began. They established the green and white color palette, card layouts, typography hierarchy, and responsive breakpoints.

**Figma file:** [Add your Figma share link here]

Screenshots saved at:
- `assets/planning/mockup-home.png`
- `assets/planning/mockup-story.png`
- `assets/planning/mockup-about.png`

### Design Decisions

**Color choice — green `#006e2d`:** Chosen to communicate growth, community, and nature — themes central to the Echoes of the Valley story. The green passes WCAG AA contrast on white at 7.2:1.

**Font choice — Public Sans:** A clean, neutral humanist sans-serif designed for legibility at all sizes. Its open counters and generous x-height make it highly readable for body copy and well-suited to accessible interfaces.

**Layout approach:** CSS Grid for macro layout (hero, story cards, footer columns) and Flexbox for micro layout (nav, badges, card internals). A container query on the related story cards allows component-level responsiveness independent of viewport size.

---

## Tools Used

| Tool | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| Sass / SCSS | Styling with partials, tokens, BEM |
| Vanilla JavaScript | Interactivity — no frameworks |
| CSS Grid + Flexbox | Responsive layout |
| CSS Container Queries | Component-level responsiveness |
| Public Sans (Google Fonts) | Typography |
| Material Symbols (Google) | Icons |
| draw.io | Sitemap diagram |
| Figma | High-fidelity mockups |
| VS Code + Live Server | Local development |
| Pexels / Unsplash | Free stock images and video |
| Pixabay Music | Royalty-free audio |

---

*Built for inclusion. StoryCast 2024.*