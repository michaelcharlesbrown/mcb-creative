"use client";

import { useEffect } from "react";

/**
 * Info page chrome visibility. The typography and the four corners (incl. the
 * global nav) are shown only at the very top of the page. The moment the user
 * scrolls, a root class fades them all out so the archive reads clean; scrolling
 * back to the top fades them in again. A small hysteresis band (24px on, 8px off)
 * keeps it from flickering at the threshold.
 */
export default function InfoChromeFade() {
  useEffect(() => {
    const root = document.documentElement;
    let active = false;

    const update = () => {
      const y = window.scrollY;
      if (!active && y > 24) {
        active = true;
        root.classList.add("info-scrolled");
      } else if (active && y < 8) {
        active = false;
        root.classList.remove("info-scrolled");
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      root.classList.remove("info-scrolled");
    };
  }, []);

  return null;
}
