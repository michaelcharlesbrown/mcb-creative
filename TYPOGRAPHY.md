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
| `--font-family-wordmark` | ClashDisplay | MCB Creative wordmark only — never change |

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `--weight-regular` | 400 | Body, UI, display text |
| `--weight-semibold` | 600 | (Reserved — use sparingly) |
| `--weight-bold` | 700 | All headings, wordmark |

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
| `--text-hero` | clamp(3.5rem, 12vw, 200px) | MCB Creative wordmark |

### Line Heights

| Token | Value | Usage |
|---|---|---|
| `--leading-body` | 1.5 | Body copy, UI labels |
| `--leading-heading` | 1.2 | h1–h6, hero tagline |
| `--leading-display` | 0.9 | Intro, about blurb, info page (tight display text) |
| `--leading-hero` | 0.95 | Hero wordmark |

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

### Hero wordmark (`HeroSection` → `FitText` as `<h1>`)
The homepage hero title **MCB Creative** is the sole `<h1>`. Typography is scaled by **`FitText`** to the hero frame width (same approach as the footer wordmark — Clash Display via `--font-family-wordmark`, weight from component props).

### ~~`.hero__headline`~~ (removed)
Legacy CSS-sized wordmark. Hero and footer wordmarks both use **`FitText`** now.

### `.intro`
Giant display text for the homepage intro section.
```css
font-size: var(--text-display);
font-weight: var(--weight-regular);
line-height: var(--leading-display);
```

### `.about-blurb__text`
Homepage intro copy on a light panel — mono, tracked caps (`text-transform`).
```css
font-family: var(--font-family-mono);
font-size: var(--text-display-about);
font-weight: var(--weight-regular);
line-height: var(--leading-display);
letter-spacing: var(--letter-spacing-work);
text-transform: uppercase;
text-align: left;
color: var(--color-black);
```

### `.info-page__text`
Body-style display text on the info page.
```css
font-size: var(--text-display-info);
font-weight: var(--weight-regular);
line-height: var(--leading-display);
```

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
- **Do not** change the wordmark font family (`--font-family-wordmark`). It is locked to ClashDisplay by project spec.
