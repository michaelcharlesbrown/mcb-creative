# TYPOGRAPHY RULE — READ THIS FIRST

All typographic properties — font family, size, weight, line-height, letter-spacing — are controlled exclusively by component CSS class rules in `globals.css` using tokens defined in `:root`. This is the only mechanism. To change how type looks, change a token value or a component rule in `globals.css`. Do not add Tailwind utility classes (`tracking-*`, `leading-*`, `font-*`, `text-*`) to JSX for any typographic property. Do not use raw numbers as CSS values. There is no other correct way to control typography on this project. See `TYPOGRAPHY.md` for the complete token reference and component class inventory.

---

# MCB Creative Portfolio — Claude Code Project Brief

**Site:** mcb-creative.vercel.app
**Owner:** Michael Charles Brown, Creative Director  
**Repo:** mcb-creative (Next.js + Sanity, deployed on Vercel)  
**Motion lab (separate):** mcb-motion-lab  

---

## Mission

This portfolio exists to demonstrate top-agency-level competency in designing, building, and coding a professional website. The site itself is the proof of skill — not just a container for work samples.

Every decision should be made to that standard. This means:

- **No shortcuts.** No inline styles, no `!important` overrides, no hardcoded values that belong in a design system, no patching symptoms instead of fixing root causes.
- **No quick fixes that create future debt.** If a proper solution takes longer, take longer. The code will be seen and judged.
- **Abstraction over repetition.** If a pattern appears more than twice, it should be a component or a utility.
- **Clean, readable, maintainable code.** A senior developer at a top creative agency should look at this codebase and respect it.
- **Design system thinking.** Colors, spacing, typography, and animation values belong in tokens/variables, not scattered inline throughout components.

The benchmark question for every implementation decision: *"Would a senior developer at a studio like Metalab, Fantasy, or Instrument be comfortable with this code?"* If the answer is no, do it differently.

---

## Tech Stack

| Layer | Tech | Notes |
|---|---|---|
| Framework | Next.js App Router (16.1.5) | NOT Pages Router. This distinction is critical. |
| UI | React 19.2.3 | |
| Styling | Tailwind CSS 4 | |
| CMS | Sanity | Dynamic project pages via slug |
| Animation | Framer Motion | Installed. Component-level only. |
| Animation | GSAP + ScrollTrigger | For scroll-driven, timeline, orchestrated effects |
| Animation | @gsap/react | NOT installed. Raw GSAP currently used in HeroSection.tsx via useEffect. |
| Scroll | Lenis | NOT installed. Candidate for future installation. |
| Carousel | Embla | Used on project nav rail / homepage work grid |
| Language | TypeScript | Strict mode |
| Hosting | Vercel | Free tier. Automatic deploys from GitHub. |

---

## Development Environment

**This project always runs on port 3002.** Do not change this.

Port assignments across all active projects:
- 3000 — separate project (do not touch)
- 3001 — separate project (do not touch)
- 3002 — mcb-creative (this project)

The port is set in package.json scripts: `"dev": "next dev -p 3002"`.

Never suggest running on localhost:3000. Never change the port. When referencing the local dev server, always use localhost:3002.

---

## Project Structure

```
/mcb-creative
├── /app
│   ├── layout.tsx              # Global layout — do not add animation wrappers here
│   ├── template.tsx            # Page transition wrapper (if used)
│   ├── page.tsx                # Homepage
│   ├── globals.css
│   ├── /projects
│   │   └── page.tsx
│   ├── /info
│   │   └── page.tsx
│   └── /projects/[slug]
│       └── page.tsx            # Dynamic project template (Sanity powered)
├── /components
│   ├── Navigation.tsx
│   ├── LayoutShell.tsx         # Shell wrapper — be careful editing this
│   ├── Footer.tsx
│   ├── BodyClass.tsx           # Client utility — adds/removes a class on document.body
│   ├── ProjectCard.tsx         # Work grid cards
│   ├── ProjectNavRail.tsx      # Carousel nav (Embla)
│   └── ...content blocks...
├── /sanity
│   └── ...schemas...
└── /public
    ├── /images/projects/
    └── /video/
```

---

## Animation Approaches

### Page transitions
- **`next-view-transitions` package** — simple, reliable fade or slide between pages. This is the approved approach for any page-to-page animation. Install: `npm install next-view-transitions`
- Simple CSS opacity/transform on `template.tsx` with `animation` property

### Scroll-driven animation
- **GSAP ScrollTrigger** — fully reliable for scroll-scrubbed effects, pinning, parallax, timeline orchestration. Use `useGSAP` from `@gsap/react` for cleanup.
- Works great for: section reveals, parallax layers, pinned sections, curtain effects

### Component-level animation
- **Framer Motion** — reliable for hover states, mount/unmount within a single page, stagger reveals on load, micro-interactions. Do NOT use for route-level AnimatePresence.
- CSS transitions — always reliable for hover, focus states

### Smooth scroll
- **Lenis** — not currently installed. Install with `npm install lenis` and wrap at the root level when ready.

### Text animation
- GSAP SplitText or a lightweight alternative for word/character stagger on scroll
- Works well combined with ScrollTrigger's `onEnter` callback

### Image effects
- CSS `transform: scale()` on hover with `transition` — simple, zero-dependency
- GSAP for more complex distortion or parallax on scroll

### Custom cursor
- Simple React component tracking `mousemove` with `useState` — fully reliable

---

## Design System

**Aesthetic:** Clean, minimal, black and white. Work does the talking. No decorative clutter.

**Colors:**
- Background: `#FFFFFF` (white)
- Text: `#000000` (black)
- Accents: minimal — check globals.css for current values

**Typography:** Check globals.css for current font stack. Large headlines, comfortable body text, generous whitespace.

**Spacing:** 16–24px page padding. 16px gaps between content blocks.

**Responsive breakpoints:** Mobile < 768px / Tablet 768–1024px / Desktop > 1024px

---

## Content & CMS

All project content lives in Sanity. Projects are fetched by slug for dynamic routes.

**Sanity schema includes:** title, slug, client, role, year, description, heroImage, gallery (array), categories.

**Image handling:** Always use `next/image` with the Sanity image URL builder. Never serve raw full-res images. Sanity's CDN handles optimization.

**Video:** Self-hosted in `/public/video/` or served from existing DreamHost URLs. MP4 H.264, target 2–5MB per file.

---

## Debugging Protocol

When something isn't working, follow this sequence. Do not skip steps. Do not generate a "plausible solution" before completing step 1.

1. **State what you know for certain.** What is actually happening vs. what should be happening? Be specific. "The transition isn't firing" is not specific. "startViewTransition is called (confirmed via console.log), but no CSS animation plays and navigation is instant" is specific.

2. **Identify what you don't know.** What information would change your diagnosis? What can't be determined without running the code?

3. **Check for known failure patterns first.** If the symptom matches something that has failed before, stop and say so. Do not attempt the same approach again.

4. **Form one hypothesis.** One. State it clearly: "I think X is causing Y because Z." Do not propose multiple possible causes as a way of hedging.

5. **Design a test for that hypothesis.** What's the smallest possible change that would confirm or disprove it? Make only that change.

6. **Report the result.** Did it confirm the hypothesis? If yes, proceed. If no, return to step 1 with new information.

**If two consecutive hypotheses are both wrong, stop.** Do not continue guessing. Report what has been ruled out and ask for direction. The path forward may require information only the human has (a screenshot, a console error, a browser behavior).

This protocol exists because the pattern of "generate plausible solution → it doesn't work → apologize → generate next plausible solution" has consumed weeks of development time on this project. That pattern ends here.

---

## Installed Skills (Reference)

The following community skills should be installed in `.claude/skills/`. They provide additional context that Claude Code loads automatically:

- **next-best-practices** (Vercel) — Next.js App Router patterns, caching, Server Components
- **react-best-practices** (Vercel) — 40+ React performance rules prioritized by impact  
- **sanity-best-practices** (Sanity) — GROQ query patterns, content modeling, Studio workflows
- **systematic-debugging** (obra) — Structured debugging methodology

To install: `npx skills add vercel-labs/next-skills --skill next-best-practices` etc.

These skills supplement CLAUDE.md — they don't replace it. CLAUDE.md's project-specific context takes precedence over any generic advice from community skills.

---

## Browser Inspection — MANDATORY

**Always verify visual changes directly in the browser at localhost:3002. Never guess.**

Before and after every CSS or layout change:
1. Use the preview tools to take a screenshot or snapshot at localhost:3002.
2. Confirm the change is visible and correct in the rendered output.
3. If the preview is not showing the expected result, investigate — do not declare the task complete based on code analysis alone.

This is non-negotiable. Code that looks correct but renders incorrectly is broken. The browser is the source of truth.

---

## Workflow Rules

1. **Before touching any animation code**, state which "approved approaches" category it falls into. If it doesn't fit any category, flag it and discuss before proceeding.

2. **Never install a new package without stating** what it does, what it replaces, and whether it's compatible with Next.js App Router + React 19.

3. **When editing `LayoutShell.tsx` or `layout.tsx`**, proceed with extra caution. These affect every page. Make one change at a time.

4. **Always use `useGSAP` from `@gsap/react`** for GSAP animations inside React components. Never use raw `useEffect` for GSAP — it causes cleanup issues.

5. **Mobile first.** Every component must be tested at 375px width. If it's not responsive, it's not done.

6. **No inline styles** for anything that should be a design system value (colors, spacing, font sizes). Use Tailwind classes or CSS variables.

7. **If something isn't working after two attempts**, stop, report what you tried and what the result was, and ask for direction. Do not keep iterating on a broken approach.

8. **Claude Code worktree issue** (previously encountered): Always confirm the working directory matches `/Users/mcb/Documents/Projects/mcb-creative` before making changes. If Claude Code creates a branch like `claude/determined-chaum`, changes go into a worktree invisible to the dev server. Check the bottom of the Claude Code window for the active path.

9. **Typography is managed globally in `globals.css`.** Never set font sizes, weights, line heights, or letter spacing inline or in component styles. If type needs to change, it changes in `globals.css` only.

10. **All design system values — colors, spacing, typography, animation tokens — live in `globals.css`.** Never hardcode these values in components. Never use `!important` to override them.

---

## Current State (as of late Feb 2026)

- Simplified homepage layout with project carousel/work grid
- Sanity CMS connected and pulling project content
- Dynamic project pages working via `/projects/[slug]`
- Navigation functioning with standard Next.js `<Link>`
- Framer Motion and GSAP installed
- No smooth scroll library currently active — Lenis is next to install
- No active page transition system (previous attempts removed)
- No active scroll animation system beyond any existing GSAP work
- Responsive work is ongoing — mobile needs attention

**Priority right now:** Ship a clean, fast, polished site. Simple text animations, hover states, and one reliable page transition. Get it live and performing well. Ambitious effects later.

---

## Git & Deployment

- Repo on GitHub, auto-deploys to Vercel on push to `main`
- Work in feature branches, merge when confirmed working
- DreamHost still active for Broken Ear Records WordPress site and some legacy video URLs — do not cancel
- Domain pointed to Vercel

