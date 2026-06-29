"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroCorners from "@/components/HeroCorners";
import {
  HOMEPAGE_HERO_HOLD_MS,
  type HeroSet,
} from "@/lib/homepageHeroSlideshow";

interface HomepageHeroProps {
  sets: HeroSet[];
}

/**
 * Homepage hero — non-interactive, auto-rotating image slideshow.
 *
 * Single locked viewport (no scroll). Each set is two images shown side by
 * side on desktop, stacked on mobile, at their natural aspect ratio — tops
 * aligned, bottoms ragged (the mixed ratios are the point). Sets hard-cut on
 * a timer with no fade; all sets stay mounted and preloaded so the swap is
 * instant. The four viewport corners are pinned above the image layer via the
 * site's difference-blend invert: TL/TR are the global <Navigation>; the two
 * bottom anchors live here.
 */
export default function HomepageHero({ sets }: HomepageHeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (sets.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % sets.length);
    }, HOMEPAGE_HERO_HOLD_MS);

    return () => window.clearInterval(id);
  }, [sets.length]);

  return (
    <section className="home-hero" aria-label="Selected work">
      {sets.map((set, i) => (
        <div
          key={i}
          className="home-hero__set"
          data-active={i === active}
          aria-hidden={i !== active}
        >
          <div className="home-hero__row">
            <Image
              className="home-hero__img"
              src={set.left.src}
              alt={set.left.alt}
              width={set.left.width}
              height={set.left.height}
              sizes="(max-width: 767px) 100vw, 50vw"
              priority
            />
            <Image
              className="home-hero__img"
              src={set.right.src}
              alt={set.right.alt}
              width={set.right.width}
              height={set.right.height}
              sizes="(max-width: 767px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      ))}

      <HeroCorners />
    </section>
  );
}
