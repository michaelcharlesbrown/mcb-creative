# Page-entry spacing — uniform desktop halfway + snug title

**Date:** 2026-07-10  
**Status:** Awaiting approval  
**Scope:** Desktop page-entry composition; mobile inherits tighter rhythm from existing token step-down

## Goal

On every page entry, first content (grid, cover, or body) starts halfway down the viewport. Page title / intro copy sits snug just above that content — not floating in a large gap under the nav.

## Rule

| Layer | Token | Role |
|-------|--------|------|
| Composition | `--hero-split` (`50dvh` desktop / `auto` mobile) | Header fills the upper half; content begins at the split |
| Rhythm | `--flow-text` (24px → 16px mobile) | Snug gap from title block → first content |

## Mechanism

Single shared rule on `.project-intro__header` in `globals.css`:

- `min-height: var(--hero-split)` — 50dvh desktop; auto on mobile (existing `:root` override)
- `justify-content: flex-end` — copy sits at the bottom of that zone
- `padding-bottom: var(--flow-text)` — snug title→content (replaces `--flow-section`)
- `box-sizing: border-box` — padding included in the 50dvh so content starts at the split
- Desktop: drop reliance on `--page-top` for this header (composition owns vertical placement)
- Mobile: when `--hero-split` is `auto`, keep `--page-top` as top air below the fixed nav so content doesn’t collide with nav

## Pages in scope

| Route | Copy | Content at split |
|-------|------|------------------|
| `/projects` | Selected Work | Work grid |
| `/projects/[slug]` | Eyebrow + headline | Cover image |
| `/info` | Eyebrow + headline | Body columns |
| `/` hero | Already uses `.hero__upper` + `--hero-split` | Reel — no change |

## Explicit exclusions

- Homepage **Featured Projects** block (`body.home .project-intro__header`) — mid-page after the reel, not a page entry. Keep rhythm-only spacing (`--flow-section`), do not apply 50dvh.
- No new packages. No component markup changes unless a page lacks `.project-intro__header` (none expected).
- No typography changes.

## Mobile

Same CSS rules. No separate mobile layout. Existing max-width 767px rhythm step-down tightens vertical gaps. `--hero-split: auto` releases the halfway pin.

## Success criteria

1. Desktop Work / Info / project: first media or body top edge ≈ 50dvh from viewport top.
2. Title sits immediately above with `--flow-text` gap (visibly snug, not section-scale).
3. Mobile: readable nav clearance, tighter gaps, no forced half-viewport empty zone.
4. Homepage hero and Featured Projects unchanged in intent.
5. All values remain spacing-system tokens — no off-scale literals in components.

## Out of scope

- Rewriting SPACING.md (referenced in comments; file may not exist yet)
- Changing card/grid internal gaps
- Animation / scroll behavior
