/** Shared homepage load sequence — top-down, one beat after another. */
export const HOMEPAGE_INTRO_EASE = [0.25, 0.1, 0.25, 1] as const;

export const homepageIntro = {
  title:    { delay: 0,    duration: 0.75, y: 48 },
  tagline:  { delay: 0.6,  duration: 0.65, y: 28 },
  video:    { delay: 1.2,  duration: 0.85, y: 40 },
  featured: { delay: 2.05, duration: 0.75, y: 36 },
} as const;
