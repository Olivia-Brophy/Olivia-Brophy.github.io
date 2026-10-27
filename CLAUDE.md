# Portfolio site – rules for Claude

Personal portfolio for Olivia Brophy (junior full-stack developer), hosted on GitHub Pages from `main` (repo `Olivia-Brophy.github.io`).

## Tech
- Plain semantic HTML and CSS. No framework, no build step.
- Minimal JavaScript only if strictly needed (currently only `script.js`: screenshot carousel, active menu link, fade-in on scroll).
- English content.
- Files: `index.html` (single page), `styles.css` (tokens + all styles), `script.js` (carousel, menu highlight, fade-in), `assets/` (favicon, `media/`).

## Quality
- WCAG 2.2 AA: proper landmarks, logical heading order (one h1 → h2 per section → h3), skip link, visible `:focus-visible` states, AA contrast, meaningful alt text.
- Fast: no unnecessary dependencies, optimized images (WebP/AVIF, explicit width/height, `loading="lazy"` below the fold). Target 100 in Lighthouse for Performance and Accessibility.
- Responsive and comfortable on mobile.
- Respect `prefers-reduced-motion`.

## Design: modern, upbeat and lively
Confident and playful without being cute. Uses the full width of the screen.
- Typography: Instrument Sans (Google Fonts, `display=swap`, weights 400–700) for everything. Big, bold, tightly tracked headings; hierarchy from weight and size. Paragraphs capped at about 65ch (`--measure`).
- Colours only through the CSS custom properties in `styles.css`:
  - `--bg` warm white, `--surface` white cards, `--surface-alt` mint tint (lightbox and hover backgrounds), `--text` ink.
  - `--accent` green for links, buttons and focus (AA on all surfaces); `--on-accent` for text on it.
  - `--pop-coral`, `--pop-sun`, `--pop-mint` are decorative pops (progress bar, the coral line above each experience entry). Text on them uses `--on-pop`.
- No pill labels or chips around text (degree, tech stack, status): keep those as plain text. No logo mark, no section numbers, no boxes around the experience entries.
  - Dark mode via `prefers-color-scheme`: deep green-ink background, lighter green accent.
  - Check contrast ratios whenever a colour changes.
- Shapes: generous radii (`--radius`, pill buttons), subtle borders, flat colour shapes. No gradients.
- Layout: full-width container (`--page-max` 90rem, fluid `--gutter`), neutral sections split by a hairline aligned with the content, with a green `.band-accent` for Contact. Projects are wide cards with media always on the left from 960px (not sticky); fields in a single column. Single column on mobile.
- The photo sits on a soft coral offset disc (`--pop-coral-soft`) that glides slowly on hover (`--duration-soft`, `--ease-soft`).
- Motion: hover lifts, hero entrance, fade-in on scroll (IntersectionObserver in `script.js`, `.reveal`/`.is-visible`), progress bar. All motion sits inside `prefers-reduced-motion: no-preference`; scroll effects are `@supports`-guarded.
- Header is sticky with a translucent blurred background; the menu highlights the section in view.

## Content conventions
- Unfilled text is written as plain `[bracketed]` text, no highlight (the yellow boxes were hard to read). Unfilled media uses `div.ph`, which renders a "TO FILL" box.
- Project fields, in order: Problem, My role, Technical decision, Result, Tech stack, Media, Link.
- Project order: Kanalvælger, Refugee Camp Management (Netlight + UNHCR), Chirp, X9 Traffic Reports, Interactive Map of Denmark, Markerless Pose Estimation.
- Project media: a `.gallery` stack (best screenshot first; `*-sm.webp` 960px for the first three, full 1920px `*.webp` in the `<dialog>` carousel). Each stack keeps its front image's natural ratio via an inline `aspect-ratio`. No screenshot-count label. Source screenshots live in `../PROJECTS/<repo>/SCREENSHOTS`.

## Rules
- Don't add features, sections or libraries that weren't asked for.
- Briefly explain each file you create or change.
