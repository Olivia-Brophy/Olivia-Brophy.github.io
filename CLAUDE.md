# Portfolio site – rules for Claude

Personal portfolio for Olivia Brophy (junior full-stack developer), hosted on GitHub Pages from `main` (repo `Olivia-Brophy.github.io`).

## Tech
- Plain semantic HTML and CSS. No framework, no build step.
- Minimal JavaScript only if strictly needed (currently only `script.js`: the screenshot carousel).
- English content.
- Files: `index.html` (single page), `styles.css` (tokens + all styles), `script.js` (screenshot carousel), `assets/` (favicon, `media/`).

## Quality
- WCAG 2.2 AA: proper landmarks, logical heading order (one h1 → h2 per section → h3), skip link, visible `:focus-visible` states, AA contrast, meaningful alt text.
- Fast: no unnecessary dependencies, optimized images (WebP/AVIF, explicit width/height, `loading="lazy"` below the fold). Target 100 in Lighthouse for Performance and Accessibility.
- Responsive and comfortable on mobile.
- Respect `prefers-reduced-motion`.

## Design: Nordic and warm
Friendly and personal without being cute. Modern, calm, minimal.
- Typography: Instrument Sans (Google Fonts, `display=swap`) for everything. Hierarchy comes from weight and size only. Line length about 65ch (`--measure`).
- Colours only through the CSS custom properties in `styles.css`:
  - `--bg` warm sand, `--text` warm near-black.
  - `--accent` dark terracotta for links, buttons and focus. It must meet AA against `--bg` and `--surface`.
  - `--accent-soft` lighter terracotta for decorative surfaces and details only, never text.
  - Dark mode via `prefers-color-scheme`: warm dark tones (not pure black), with the accent adjusted to keep AA.
  - Check contrast ratios whenever a colour changes.
- Shapes: soft rounded corners (`--radius`, `--radius-sm`), subtle borders instead of heavy shadows. No gradients.
- Layout: generous whitespace and a clear rhythm (`--space-*` scale). Single column on mobile. Projects may use two columns from 900px.
- Motion: subtle hover and focus transitions (`--transition`), a short intro entrance on load, CSS scroll-driven reveals and a reading progress bar (`--duration-enter`, `--ease-out`). All motion sits inside `prefers-reduced-motion: no-preference`, and scroll effects are `@supports`-guarded so unsupported browsers just show the content.
- Header is sticky with a translucent blurred background.

## Content conventions
- Unfilled text is written as plain `[bracketed]` text, no highlight (the yellow boxes were hard to read). Unfilled media uses `div.ph`, which renders a "TO FILL" box.
- Project fields, in order: Problem, My role, Technical decision, Result, Tech stack, Media, Link.
- Project order: Kanalvælger, Refugee Camp Management (Netlight + UNHCR), Chirp, X9 Traffic Reports, Interactive Map of Denmark, Markerless Pose Estimation.
- Project media: a `.gallery` stack (best screenshot first; `*-sm.webp` 960px for the first three, full 1920px `*.webp` in the `<dialog>` carousel). Each stack keeps its front image's natural ratio via an inline `aspect-ratio`. No screenshot-count label. Source screenshots live in `../PROJECTS/<repo>/SCREENSHOTS`.

## Rules
- Don't add features, sections or libraries that weren't asked for.
- Briefly explain each file you create or change.
