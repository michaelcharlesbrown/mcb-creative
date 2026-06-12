# Typography System

## The Rule

All typographic properties — font family, size, weight, line-height, letter-spacing — are controlled exclusively by component CSS class rules in `globals.css` using tokens defined in `:root`. This is the only mechanism. To change how type looks, change a token value or a component rule. Do not add Tailwind utility classes to JSX for any typographic property. Do not use raw numbers as CSS values. There is no other correct way to control typography on this project.

---

## Two Faces Only

| Variable | Font | Usage |
|---|---|---|
| `--font-family-sans` | Geist Sans | Body copy, descriptions, all headlines, eyebrows, display text |
| `--font-family-mono` | Geist Mono | Labels, metadata, scope/team, nav labels, captions, card titles |

Set on `<html>` in `app/layout.tsx`. Live hero/footer wordmarks use SVG assets, not a webfont.

---

## Font Weights

| Token | Value | Usage |
|---|---|---|
| `--weight-regular` | 400 | Body, UI, descriptions |
| `--weight-medium` | 500 | Work page CTA headline + button |
| `--weight-semibold` | 600 | `.label` (mono caps) |
| `--weight-bold` | 700 | Headlines, monogram |

---

## Type Scale

### Base

| Token | Value | Usage |
|---|---|---|
| `--text-body` | 12px | Global body default |
| `--text-ui` | 12px | Same as body; labels inherit via `.label` |
| `--text-h1` | 32px | Global `h1` default |
| `--text-h2` | clamp(1.75rem, 2.4vw, 3rem) | Global `h2` |
| `--text-h3` | clamp(1.25rem, 2vw, 1.75rem) | Global `h3` |
| `--text-h4` | 1rem | Global `h4` |

### Component display (distinct sizes only)

| Token | Usage |
|---|---|
| `--text-monogram` | Homepage `M/C/B` hero |
| `--text-project-headline` | Project page H1 tagline |
| `--text-work-cta` | Work page CTA headline |
| `--text-work-cta-button` | Work page CTA pill |
| `--text-footer-cta` | Footer + section-intro display |
| `--text-footer-cta-body` | Footer body, section-intro tagline, legacy hero tagline |
| `--text-footer-cta-mobile` | Footer headline @ mobile |
| `--text-footer-cta-body-mobile` | Footer body @ mobile |
| `--text-info-headline` | Info testimonials headline |
| `--text-info-body` | Info page prose + testimonial body |
| `--text-info-caption` | Info portrait captions (reserved) |
| `--text-testimonial-mark` | Info page opening quote mark |

---

## Line Heights & Letter-spacing

| Token | Value | Usage |
|---|---|---|
| `--leading-body` | 1.5 | Body, labels, descriptions |
| `--leading-heading` | 1.2 | `h2.text-media__heading` |
| `--leading-display` | 0.9 | Global heading default |
| `--leading-monogram` | 0.8 | Homepage monogram |
| `--leading-project-headline` | 1.05 | Project page H1 |
| `--leading-info-headline` | 1.1 | Info testimonials headline |
| `--leading-info-body` | 1.3 | Info page prose |
| `--leading-footer-cta` | 1.2 | Footer + section-intro display |
| `--leading-footer-cta-body` | 1.3 | Footer body, section-intro tagline |
| `--letter-spacing-work` | 0.06em | `.label` tracked caps |
| `--letter-spacing-triple-slash` | -0.03em | `.triple-slash` only |
| `--letter-spacing-monogram` | -0.02em | Homepage monogram |

---

## Base Rules

### `body`
Geist Sans, `--text-body`, regular weight, `--leading-body`.

### `h1–h6`
Geist Sans, regular weight by default. Individual sizes via `--text-h1` … `--text-h4`. Component classes override weight/size where needed.

---

## Component Classes

### `.label` + `.label-meta`
Mono caps for metadata: nav brand, work cards, captions, project nav. `.label-meta` drops to regular weight for secondary text in the same line.

### Homepage monogram hero (`.home-hero*`)
- `.home-hero__monogram` — Geist Sans bold, `--text-monogram`
- `.home-hero__studio`, `.home-hero__services` — `.label` (mono)

### Project page intro (`.project-intro*`, `.project-info*`)
- `.project-intro__eyebrow` — inherits body (12px sans)
- `.project-intro__headline` — Geist Sans bold uppercase, `--text-project-headline`
- `.project-info__meta-col` — scope + team in column 1 (12px sans)
- `.project-info__copy-col` — description paragraphs in column 3 (12px sans)
- `.project-info__body` — inherits body; margin reset only

### Info page (`.info-page*`)
- Prose + testimonial body: `--text-info-body`
- Testimonials headline: `--text-info-headline`
- Captions: `.label` (mono)
- Hero `h1`: global `h1` token (32px) — no separate info-headline class on the hero line

### Footer / section intro
- `.footer__cta-headline`, `.section-intro__display` — `--text-footer-cta`
- `.footer__cta-body`, `.section-intro__body` — `--text-footer-cta-body`

### Work page CTA
- `.work-page__cta-headline` — Geist Sans medium, `--text-work-cta`
- `.work-page__cta-button` — `--text-work-cta-button`

### Legacy homepage hero (`.hero*`)
SVG wordmark via `<img>`. `.hero__tagline` uses `--text-footer-cta-body`.

---

## What Not To Do

- **Do not** add `tracking-*`, `leading-*`, `font-*`, `text-*` Tailwind utilities to JSX for typography controlled by component classes.
- **Do not** use raw numbers as CSS values. Every value must reference a token from `:root`.
- **Do not** define new type tokens anywhere except `:root` in `globals.css`.
- **Do not** introduce a third font family without updating this document and `layout.tsx`.
