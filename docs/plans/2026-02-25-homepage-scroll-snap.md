# Homepage Scroll Snap Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add section-level scroll snap to the homepage on both mobile and desktop, with per-card snap stops on mobile and a staggered grid entrance on desktop, plus a persistent fixed "Featured Work" label during the mobile card zone.

**Architecture:** Two separate client components (`HomeMobileLayout`, `HomeDesktopLayout`) are rendered side-by-side with Tailwind responsive visibility (`md:hidden` / `hidden md:block`). Mobile uses a custom `h-screen overflow-y-scroll snap-y snap-mandatory` container with one snap section per project card. Desktop adds `scroll-snap-type: y proximity` to `document.documentElement` on mount and wraps each page section in a `snap-start` container. The global `Footer` is suppressed on the homepage so each layout can own its footer snap section. `HeroSection` gains a `disableScrollTrigger` prop to skip the GSAP pin/scrub animation on mobile (where it conflicts with CSS snap).

**Tech Stack:** Next.js 15 App Router, React, Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, Intersection Observer API

---

### Codebase Reference

Key files and their roles:
- `app/page.tsx` — server component, fetches + merges project data, renders both layouts
- `components/HeroSection.tsx` — GSAP intro + ScrollTrigger scroll-driven reveal; uses `gsap.context`, `pin: true`
- `components/AboutBlurb.tsx` — IntersectionObserver word-animation, default root (viewport)
- `components/Footer.tsx` — Framer Motion entrance, `min-h-screen`; currently rendered globally by LayoutShell
- `components/LayoutShell.tsx` — renders `<Navigation /> + children + <Footer />`; needs to suppress Footer on homepage
- `components/ProjectCard.tsx` — card component used in the desktop grid
- `components/ProjectsScroll.tsx` — reference for snap scroll + slip animation pattern
- `app/globals.css` — `--nav-height: 92px`, `--content-inset: clamp(1.5rem, 2.7vw, 52px)`
- `data/projects.ts` — static project fallback data

---

### Task 1: Suppress global Footer on homepage

**Files:**
- Modify: `components/LayoutShell.tsx`

**What:** The Footer is rendered globally by LayoutShell for all pages. Both `HomeMobileLayout` and `HomeDesktopLayout` will own their own Footer snap section, so the global Footer must not render on the homepage.

**Step 1: Edit LayoutShell**

In `components/LayoutShell.tsx`, add a check on `pathname`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  const isHomePage = pathname === "/";

  return (
    <>
      <CustomCursor />
      <TransitionWrapper>
        <Navigation />
        {children}
      </TransitionWrapper>
      {!isHomePage && <Footer />}
    </>
  );
}
```

**Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: exit 0

**Step 3: Commit**

```bash
git add components/LayoutShell.tsx
git commit -m "feat(layout): suppress global footer on homepage to enable per-layout snap sections"
```

---

### Task 2: Add `disableScrollTrigger` prop to HeroSection

**Files:**
- Modify: `components/HeroSection.tsx`

**What:** On mobile, the `HomeMobileLayout` renders `HeroSection` inside a custom scroll container with CSS snap. GSAP's `pin: true` ScrollTrigger creates extra scroll space and conflicts with snap-mandatory. Add a `disableScrollTrigger` prop that skips the ScrollTrigger setup while keeping the intro timeline (the initial panel-reveal animation on page load).

**Step 1: Add prop and conditional**

In `components/HeroSection.tsx`, update the component signature and the `useEffect`:

```tsx
interface HeroSectionProps {
  disableScrollTrigger?: boolean;
}

export default function HeroSection({ disableScrollTrigger = false }: HeroSectionProps) {
  // ... existing refs ...

  useEffect(() => {
    // ... existing null checks and reducedMotion check ...

    const ctx = gsap.context(() => {
      // ── Initial states (unchanged) ───────────────────────────────
      gsap.set(gray,     { yPercent: -100 });
      gsap.set(overlay,  { yPercent: -100 });
      gsap.set(video,    { yPercent: 100 });
      gsap.set(headline, { opacity: 0, y: 40 });
      gsap.set(tagline,  { opacity: 0, y: 30 });

      // ── Intro timeline (unchanged) ───────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          // Only attach ScrollTrigger on desktop
          if (disableScrollTrigger) return;

          gsap.to([gray, overlay], {
            yPercent: -100,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: 0.8,
            },
          });
        },
      });

      tl
        .to(gray,    { yPercent: -25, duration: 1.0 }, 0)
        .to(video,   { yPercent: 0, duration: 1.2, ease: "power3.out" }, 0)
        .to(overlay, { yPercent: -25, duration: 1.0 }, 0.18)
        .to(headline, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
        .to(tagline,  { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.45");

    }, hero);

    return () => ctx.revert();
  }, [disableScrollTrigger]);

  // JSX unchanged
}
```

The only change: move the `gsap.to([gray, overlay], { scrollTrigger: ... })` call inside an `if (!disableScrollTrigger) return;` guard within the `onComplete` callback.

**Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: exit 0

**Step 3: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat(hero): add disableScrollTrigger prop to skip GSAP pin in snap-scroll contexts"
```

---

### Task 3: Create `HomeMobileLayout` component

**Files:**
- Create: `components/HomeMobileLayout.tsx`

**What:** The full mobile homepage experience. A `h-screen overflow-y-scroll snap-y snap-mandatory` container with these snap sections in order: Hero → About → [6 project card sections] → Footer. Each project card is `h-screen snap-start` with a full-bleed thumbnail image, and title + subheadline that slip in from below when the card is active (same animation as `ProjectsScroll`). A fixed "Featured Work" label appears when any card section is active and disappears at the footer.

**Step 1: Create the file**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import { useNavigateWithTransition } from "@/components/transitions/useNavigateWithTransition";

export interface MobileProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  thumbnail: string;
  thumbnailAlt?: string;
}

interface HomeMobileLayoutProps {
  projects: MobileProject[];
}

export default function HomeMobileLayout({ projects }: HomeMobileLayoutProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const { navigateWithTransition } = useNavigateWithTransition();

  // Track which card section is most visible
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let highestRatio = 0;
        let nextIdx: number | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            const idx = entry.target.getAttribute("data-card-index");
            nextIdx = idx !== null ? Number(idx) : null;
          }
        });
        // Only update if we found an intersecting card
        if (nextIdx !== null) setActiveCardIndex(nextIdx);
      },
      { root: scrollContainerRef.current, threshold: [0.5, 0.8] }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [projects.length]);

  // Track whether ANY card is active (to show/hide "Featured Work" label)
  // We also need to clear activeCardIndex when footer is reached.
  // Use a second observer on a "footer sentinel" div.
  const footerSentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sentinel = footerSentinelRef.current;
    if (!sentinel || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveCardIndex(null);
      },
      { root: scrollContainerRef.current, threshold: 0.3 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const isInCardZone = activeCardIndex !== null;

  return (
    <>
      {/* Fixed "Featured Work" label — visible during card zone only */}
      <div
        className={`fixed z-40 pointer-events-none transition-all duration-700 ease-out md:hidden ${
          isInCardZone ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ top: "calc(var(--nav-height, 92px) + 1.5rem)", left: 0, right: 0 }}
      >
        <p
          className="content-inset text-black font-bold uppercase"
          style={{ fontSize: "16px", fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          Featured Work
        </p>
      </div>

      {/* Snap scroll container */}
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide md:hidden"
      >
        {/* Section 1: Hero */}
        <section className="h-screen snap-start flex-shrink-0">
          <HeroSection disableScrollTrigger />
        </section>

        {/* Section 2: About */}
        <section className="h-screen snap-start flex-shrink-0 flex items-center bg-background">
          <AboutBlurb />
        </section>

        {/* Sections 3–N: One per project card */}
        {projects.map((project, i) => (
          <section
            key={project.slug}
            ref={(el) => { cardRefs.current[i] = el; }}
            data-card-index={i}
            className="h-screen snap-start flex-shrink-0 relative bg-background overflow-hidden"
          >
            <a
              href={`/projects/${project.slug}`}
              className="block h-full flex flex-col"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition(`/projects/${project.slug}`, project.accentColor);
              }}
            >
              {/* Spacer: clears fixed nav + "Featured Work" label */}
              <div style={{ height: "calc(var(--nav-height, 92px) + 3.5rem)" }} className="flex-shrink-0" />

              {/* Thumbnail — fills remaining space above text */}
              <div className="flex-1 relative mx-[var(--content-inset)] rounded-[4px] overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt ?? project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i < 2}
                />
              </div>

              {/* Title + subheadline — slip in from below when card is active */}
              <div
                className={`flex-shrink-0 px-[var(--content-inset)] pt-4 pb-8 transition-all duration-700 ease-out ${
                  activeCardIndex === i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: activeCardIndex === i ? "450ms" : "0ms" }}
              >
                <h2
                  className="text-black font-bold uppercase"
                  style={{ fontSize: "16px", fontFamily: "var(--font-ibm-plex-mono)", letterSpacing: "-0.04em" }}
                >
                  {project.title}
                </h2>
                {project.subheadline && (
                  <p
                    className="text-black mt-1"
                    style={{ fontSize: "12px", fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {project.subheadline}
                  </p>
                )}
              </div>
            </a>
          </section>
        ))}

        {/* Footer sentinel — used to detect when footer enters view */}
        <div ref={footerSentinelRef} />

        {/* Footer snap section */}
        <section className="snap-start flex-shrink-0">
          <Footer />
        </section>
      </div>
    </>
  );
}
```

**Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: exit 0

**Step 3: Commit**

```bash
git add components/HomeMobileLayout.tsx
git commit -m "feat(mobile): add HomeMobileLayout with per-card snap scroll and Featured Work label"
```

---

### Task 4: Create `HomeDesktopLayout` component

**Files:**
- Create: `components/HomeDesktopLayout.tsx`

**What:** The desktop homepage experience. On mount, adds `scroll-snap-type: y proximity` to `document.documentElement` so the window-level scroll has gentle snap. Each section is wrapped in a `snap-start` div. The Featured Work grid section uses Intersection Observer to trigger a staggered entrance animation (each card slides up with an increasing delay) when the grid scrolls into view.

The `AboutBlurb` section gets `min-h-screen` so it occupies the full viewport as a snap section. The grid section and footer also get proper snap-start wrappers.

**Step 1: Create the file**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export interface DesktopProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  thumbnail: string;
  thumbnailAlt?: string;
}

interface HomeDesktopLayoutProps {
  projects: DesktopProject[];
}

export default function HomeDesktopLayout({ projects }: HomeDesktopLayoutProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridInView, setGridInView] = useState(false);

  // Add scroll-snap-type to html on mount; remove on unmount
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y proximity";
    return () => {
      html.style.scrollSnapType = "";
    };
  }, []);

  // Stagger animation: fire once when grid section enters viewport
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden md:block">
      {/* Hero — already h-screen; GSAP ScrollTrigger pin provides snap-like feel */}
      <div style={{ scrollSnapAlign: "start" }}>
        <HeroSection />
      </div>

      {/* About — min-h-screen snap section */}
      <div
        className="min-h-screen flex items-center bg-background"
        style={{ scrollSnapAlign: "start" }}
      >
        <AboutBlurb />
      </div>

      {/* Featured Work Grid — snap section */}
      <div
        className="min-h-screen bg-background"
        style={{ scrollSnapAlign: "start" }}
      >
        <main className="max-w-[var(--content-max-width)] mx-auto">
          <section className="content-inset pt-[max(var(--nav-height),4rem)] pb-16 md:pt-[max(var(--nav-height),6rem)] md:pb-24">
            <h2 className="text-left font-bold mb-8 md:mb-12" style={{ fontSize: "20px" }}>
              Featured Work
            </h2>
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[8px] gap-y-16 md:gap-y-20"
            >
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  className={`transition-all duration-700 ease-out ${
                    gridInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: gridInView ? `${i * 100}ms` : "0ms" }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer — snap section */}
      <div style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </div>
    </div>
  );
}
```

**Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: exit 0

**Step 3: Commit**

```bash
git add components/HomeDesktopLayout.tsx
git commit -m "feat(desktop): add HomeDesktopLayout with html-level snap and staggered grid entrance"
```

---

### Task 5: Update `app/page.tsx` to use both layouts

**Files:**
- Modify: `app/page.tsx`

**What:** Replace the current layout JSX with `<HomeMobileLayout>` and `<HomeDesktopLayout>`, both receiving the same `mergedProjects` array. The outer div keeps `bg-background` but drops `min-h-screen` since both layouts now own their own scroll heights.

**Step 1: Rewrite the return statement in `app/page.tsx`**

```tsx
import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import HomeMobileLayout from "@/components/HomeMobileLayout";
import HomeDesktopLayout from "@/components/HomeDesktopLayout";

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
};

export default async function Home() {
  const sanityProjects = await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);

  const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  const mergedProjects = sanityProjects.length > 0
    ? sanityProjects.slice(0, 6).map((sanity) => {
        const staticProject = staticBySlug[sanity.slug];
        return {
          slug: sanity.slug,
          title: sanity.title ?? staticProject?.title ?? "",
          accentColor: sanity.accentColor ?? staticProject?.accentColor ?? "",
          subheadline: sanity.subheadline ?? staticProject?.tagline,
          scope: sanity.scope ?? staticProject?.services ?? [],
          thumbnail: sanity.thumbnail ?? staticProject?.thumbnail ?? "",
          thumbnailAlt: sanity.thumbnailAlt,
        };
      })
    : projects.slice(0, 6).map((project) => ({
        slug: project.slug,
        title: project.title,
        accentColor: project.accentColor,
        subheadline: project.tagline,
        scope: project.services,
        thumbnail: project.thumbnail,
        thumbnailAlt: undefined,
      }));

  return (
    <div className="home bg-background text-black">
      <HomeMobileLayout projects={mergedProjects} />
      <HomeDesktopLayout projects={mergedProjects} />
    </div>
  );
}
```

**Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: exit 0

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(homepage): wire HomeMobileLayout and HomeDesktopLayout into page"
```

---

### Task 6: Visual verification

**What:** Verify the implementation in the browser — both mobile and desktop viewports.

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Desktop checks (viewport ≥ 768px)**

Open `http://localhost:3002` (or whichever port is active).

- [ ] Hero loads with GSAP intro animation (panel swoosh + headline reveal)
- [ ] Scrolling through hero: panels peel away revealing video (ScrollTrigger still works)
- [ ] After scrolling past hero: About section gently snaps into view
- [ ] About section: word animation fires on snap
- [ ] Scrolling past About: Featured Work grid snaps into view
- [ ] Grid cards: stagger in with `translate-y-8 → 0` and `opacity-0 → 1`, 100ms between each
- [ ] Scrolling past grid: Footer snaps into view
- [ ] No double Footer visible anywhere

**Step 3: Mobile checks (viewport < 768px, use browser DevTools device emulation)**

- [ ] Hero loads with GSAP intro animation (no scroll-driven pin)
- [ ] Swipe/scroll down: About section snaps into place
- [ ] Swipe again: first project card snaps in
- [ ] "Featured Work" label appears at `top: ~108px`, slips up into place
- [ ] Title + subheadline animate in below the thumbnail with 450ms delay
- [ ] Swiping through cards: "Featured Work" label stays fixed, each card's text slips in
- [ ] After last card: Footer snaps in, "Featured Work" label disappears
- [ ] Tapping a card navigates to the project page with accent color transition

**Step 4: Commit any fixes discovered during verification**

```bash
git add -A
git commit -m "fix(homepage): visual verification adjustments"
```
