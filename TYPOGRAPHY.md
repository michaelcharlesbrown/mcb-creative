# Typography System

## The Rule

All typographic properties — font family, size, weight, line-height, letter-spacing — are controlled exclusively by component CSS class rules in `globals.css` using tokens defined in `:root`. This is the only mechanism. To change how type looks, change a token value or a component rule. Do not add Tailwind utility classes to JSX for any typographic property. Do not use raw numbers as CSS values. There is no other correct way to control typography on this project.

---

## Design Tokens (`globals.css` → `:root`)

### Font Families
Defined as inline CSS variables on `<html>` in `app/layout.tsx`, not in `:root`.

| Variable | Font | Usage |
|---|---|---|
| `--font-family-mono` | GeistMono | Body, UI, taglines |
| `--font-family-headline` | GeistSans | Headings (h1–h6) |
| `--font-family-wordmark` | ClashDisplay | Type style guide `.sg-display` only; live hero/footer wordmarks are SVG |

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `--weight-regular` | 400 | Body, UI, display text |
| `--weight-semibold` | 600 | (Reserved — use sparingly) |
| `--weight-bold` | 700 | All headings |

### Type Scale

| Token | Value | Usage |
|---|---|---|
| `--text-body` | 12px | Body copy |
| `--text-ui` | 12px | UI labels, nav links, taglines |
| `--text-h1` | clamp(2.5rem, 5.5vw, 5rem) | h1 elements |
| `--text-h2` | clamp(1.75rem, 2.4vw, 3rem) | h2 elements |
| `--text-h3` | clamp(1.25rem, 2vw, 1.75rem) | h3 elements |
| `--text-h4` | 1rem | h4 elements |
| `--text-display` | clamp(3rem, 7.5vw, 17.5rem) | Intro section |
| `--text-display-about` | clamp(1.92rem, 5vw, 3.8rem) | About blurb |
| `--text-display-info` | clamp(1.75rem, 2.4vw, 3rem) | Info page |

### Line Heights

| Token | Value | Usage |
|---|---|---|
| `--leading-body` | 1.5 | Body copy, UI labels |
| `--leading-heading` | 1.2 | h1–h6, hero tagline |
| `--leading-display` | 0.9 | Intro, about blurb, info page (tight display text) |

### Letter-spacing tokens

| Token | Value | Usage |
|---|---|---|
| `--letter-spacing-work` | 0.06em | Tracked caps (work captions, project hero labels) |
| `--letter-spacing-triple-slash` | -0.03em | Triple-slash `///` only — wrap in `.triple-slash` (design tracking −30) |

---

## Base Rules

### `body`
```css
font-family: var(--font-family-mono);
font-size: var(--text-body);
font-weight: var(--weight-regular);
line-height: var(--leading-body);
letter-spacing: normal;
```

### `h1, h2, h3, h4, h5, h6`
```css
font-family: var(--font-family-headline);
font-weight: var(--weight-bold);
line-height: var(--leading-heading);
/* No letter-spacing — inherits normal from body */
```
Individual sizes: `h1` → `--text-h1`, `h2` → `--text-h2`, `h3` → `--text-h3`, `h4` → `--text-h4`.

---

## Component Classes

### Hero wordmark (`HeroSection`)
The homepage hero **MCB Creative** mark is the sole `<h1>`: `/images/MCBCreative-dark.svg` inside `.hero__wordmark`, **`width="100%"`** and **`height="auto"`** on the `<img>`. Wrapper uses **`max-width: --content-max-width`**, **`margin-inline: auto`**, and **`content-inset`** (same horizontal band as nav/body).

### ~~`.hero__headline`~~ (removed)
Legacy CSS-sized wordmark.

### Footer wordmark (`Footer`)
`/images/MCBCreative-light.svg` — same **`width`** / **`height`** attributes and full-width inset row as hero.

### `.intro`
Giant display text for the homepage intro section.
```css
font-size: var(--text-display);
font-weight: var(--weight-regular);
line-height: var(--leading-display);
```

### `.info-page__headline` + `.about-blurb__headline`
Shared editorial headline: Geist Sans, Info scale (`--text-info-headline`), bold, tight leading — used for the Info page hero line (`h1`) and the homepage about blurb (`h2`).
```css
font-family: var(--font-family-headline);
font-size: var(--text-info-headline);
font-weight: var(--weight-bold);
line-height: var(--leading-info-headline);
text-align: left;
color: var(--color-black);
```

### Info page (`/info`) — editorial layout
Sentence-case body (`--text-info-body`), monospace captions. Masthead matches `.info-page__headline` above. Structural classes: `.info-page`, `.info-page__main`, `.info-page__hero`, `.info-page__portrait-col`, `.info-page__intro-col`, `.info-page__prose`, `.info-page__rule`, `.info-page__cta-title`, `.info-page__cta-body`, etc.

### `.project-hero__label`
Uppercase section labels (SCOPE, TEAM) in project hero.
```css
font-size: var(--text-ui);
font-weight: var(--weight-regular);
line-height: var(--leading-body);
text-transform: uppercase;
```

### `.project-hero__body`
Descriptive copy in project hero.
```css
font-size: var(--text-ui);
font-weight: var(--weight-regular);
line-height: var(--leading-body);
```

### `.nav__links, .nav__links a`
Navigation links.
```css
font-size: var(--text-ui);
```

---

## What Not To Do

- **Do not** add `tracking-*`, `leading-*`, `font-*`, `text-*` Tailwind utilities to JSX elements that are controlled by the above component classes. Those classes are unlayered CSS and always override Tailwind utilities — the utility silently does nothing.
- **Do not** use raw numbers (`1.4`, `0.05em`) as CSS values. Every value must reference a token from `:root`.
- **Do not** define new type tokens anywhere except `:root` in `globals.css`.
- **Do not** change SVG wordmark assets for production hero/footer (`MCBCreative-dark.svg`, `MCBCreative-light.svg`) without updating both placements. **`--font-family-wordmark`** remains for the typography style guide’s Clash Display demo only.
