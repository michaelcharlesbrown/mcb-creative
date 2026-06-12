"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HomeHero from "@/components/HomeHero";
import { useLenis } from "@/components/SmoothScrollProvider";
import { HOMEPAGE_HERO_VIDEO_SRC } from "@/lib/homepageHeroVideo";

/**
 * Stepped, scroll-triggered hero reveal (desktop).
 *
 * The hero briefly takes over scroll ("scroll-jacking") so each gesture fires
 * one self-playing, eased step rather than a scrubbed follow:
 *   phase 0 — hidden (blank brutalist hero)
 *   phase 1 — video slides up + locks into the centre, contained
 *   phase 2 — video expands to fill the container
 *   (next scroll) — release: Lenis resumes, the rest of the page scrolls on.
 *
 * Reverse works within the captured sequence. `prefers-reduced-motion` skips
 * the jacking entirely and shows the filled video with normal scrolling.
 *
 * Lifecycle note: the scroll capture lives in a plain `useEffect` with an
 * `AbortController` rather than `useGSAP`. React guarantees this cleanup runs,
 * so listeners can never duplicate under StrictMode's dev double-mount — which
 * matters here because a stray listener would mean the very first scroll jumps
 * two phases. GSAP is still driving every tween; we just own the listener
 * lifecycle explicitly.
 */

/** Frame transform per phase. */
const PHASES = [
  { yPercent: 120, scale: 0.5, autoAlpha: 0 }, // hidden, below the fold
  { yPercent: 0, scale: 0.52, autoAlpha: 1 }, // centred, contained
  { yPercent: 0, scale: 1, autoAlpha: 1 }, // filled
] as const;

/** Transition feel, indexed by destination phase. Tuned live in-browser. */
const TWEEN = [
  { duration: 0.9, ease: "power3.inOut" }, // → hidden
  { duration: 1.1, ease: "power4.out" }, // → locked centre
  { duration: 1.2, ease: "power3.inOut" }, // → filled
] as const;

/** Brutalist chrome (nav + hero type) opacity per phase — visible only on the blank hero. */
const CHROME = [1, 0, 0] as const;

const LAST = PHASES.length - 1;
const WHEEL_THRESHOLD = 6; // ignore micro-scrolls
const TOUCH_THRESHOLD = 12;
const COOLDOWN = 0.12; // seconds after a step before the next input is accepted
const RELEASE_SCROLL = 1.2; // seconds for the hand-off glide to the next section

/** Load entrance — the whole frame focuses into place as one unit (tuned in-browser). */
const ENTRANCE_FROM = { autoAlpha: 0, scale: 1.08, filter: "blur(8px)" };
const ENTRANCE_TWEEN = { duration: 1.3, ease: "expo.out", delay: 0.5 };

export default function HomeHeroReveal() {
  const lenis = useLenis();
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  const phaseRef = useRef(0);
  const lockRef = useRef(false); // animating or cooling down
  const capturedRef = useRef(false); // hero currently owns scroll

  // Load entrance: the nav and the hero type focus into place together, as one
  // frame — single timeline, single ease, no stagger. Pairs with the scroll
  // exit, where the same frame recedes out toward the viewer.
  useGSAP(
    () => {
      const fg = fgRef.current;
      const nav = document.querySelector<HTMLElement>(".nav__inner");
      const frame = [fg, nav].filter(Boolean) as Element[];
      if (!frame.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(frame, { autoAlpha: 1 });
        return;
      }
      gsap.set(frame, ENTRANCE_FROM);
      gsap.to(frame, { autoAlpha: 1, scale: 1, filter: "blur(0px)", ...ENTRANCE_TWEEN });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(frame, PHASES[LAST]);
      phaseRef.current = LAST;
      return;
    }

    gsap.set(frame, PHASES[0]);
    phaseRef.current = 0;
    lockRef.current = false;
    capturedRef.current = false;

    // Wait for Lenis before capturing — we need it to halt smooth scroll.
    if (!lenis) return;

    const controller = new AbortController();
    const { signal } = controller;

    // Fade the nav's inner content, not <nav> itself: Framer Motion holds the
    // <nav> opacity via a persisted WAAPI animation that GSAP can't override.
    const nav = document.querySelector<HTMLElement>(".nav__inner");
    const chrome = [fgRef.current, nav].filter(Boolean) as Element[];

    const goToPhase = (n: number) => {
      lockRef.current = true;
      phaseRef.current = n;
      gsap.to(frame, {
        ...PHASES[n],
        ...TWEEN[n],
        overwrite: true,
        onComplete: () => {
          gsap.delayedCall(COOLDOWN, () => {
            lockRef.current = false;
          });
        },
      });
      // Fade the brutalist chrome out as the video takes the frame (back in on reverse).
      gsap.to(chrome, {
        autoAlpha: CHROME[n],
        duration: TWEEN[n].duration,
        ease: TWEEN[n].ease,
        overwrite: true,
      });
    };

    const release = () => {
      capturedRef.current = false;
      lenis.start();
      const heroHeight = rootRef.current?.offsetHeight ?? window.innerHeight;
      lenis.scrollTo(heroHeight, { duration: RELEASE_SCROLL });
      // Bring the nav back for the rest of the page (the hero type scrolls away on its own).
      if (nav) gsap.to(nav, { autoAlpha: 1, duration: 0.4, overwrite: true });
    };

    const step = (dir: number) => {
      const target = phaseRef.current + dir;
      if (dir > 0) {
        if (target <= LAST) goToPhase(target);
        else release();
      } else if (target >= 0) {
        goToPhase(target);
      }
    };

    const atTop = () =>
      (window.scrollY || document.documentElement.scrollTop || 0) <= 2;

    // Re-arm the sequence when the user scrolls back up into the top of the hero,
    // so the reveal runs in reverse: filled → centred → blank.
    const recapture = () => {
      capturedRef.current = true;
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
    };

    // Take control: the hero owns the opening scrolls.
    capturedRef.current = true;
    lenis.stop();

    const onWheel = (e: WheelEvent) => {
      if (capturedRef.current) {
        e.preventDefault();
        if (lockRef.current || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
        step(e.deltaY > 0 ? 1 : -1);
        return;
      }
      // Released — grab control again when scrolling up at the very top.
      if (e.deltaY < 0 && atTop()) {
        recapture();
        e.preventDefault();
        if (!lockRef.current && Math.abs(e.deltaY) >= WHEEL_THRESHOLD) step(-1);
      }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY; // +ve = swipe up = advance
      if (capturedRef.current) {
        e.preventDefault();
        if (lockRef.current || Math.abs(dy) < TOUCH_THRESHOLD) return;
        touchY = e.touches[0].clientY;
        step(dy > 0 ? 1 : -1);
        return;
      }
      if (dy < 0 && atTop()) {
        recapture();
        e.preventDefault();
        if (!lockRef.current && Math.abs(dy) >= TOUCH_THRESHOLD) {
          touchY = e.touches[0].clientY;
          step(-1);
        }
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const down = ["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key);
      const up = ["ArrowUp", "PageUp"].includes(e.key);
      if (!down && !up) return;
      if (capturedRef.current) {
        e.preventDefault();
        if (lockRef.current) return;
        step(down ? 1 : -1);
        return;
      }
      if (up && atTop()) {
        recapture();
        e.preventDefault();
        if (!lockRef.current) step(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, signal });
    window.addEventListener("touchstart", onTouchStart, { passive: true, signal });
    window.addEventListener("touchmove", onTouchMove, { passive: false, signal });
    window.addEventListener("keydown", onKey, { signal });

    return () => {
      controller.abort(); // removes every listener atomically
      gsap.killTweensOf([frame, ...chrome]);
      if (nav) gsap.set(nav, { autoAlpha: 1 });
      lenis.start();
    };
  }, [lenis]);

  return (
    <section className="home-reveal" ref={rootRef}>
      <div className="home-reveal__video" aria-hidden>
        <div className="home-reveal__frame" ref={frameRef}>
          <video
            className="home-reveal__media"
            src={HOMEPAGE_HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>

      <div className="home-reveal__fg" ref={fgRef}>
        <HomeHero />
      </div>
    </section>
  );
}
