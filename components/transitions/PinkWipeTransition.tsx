"use client";

import gsap from "gsap";
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";

export interface PinkWipeHandle {
  playCover: () => Promise<void>;
  playReveal: () => Promise<void>;
  setAccentColor: (color: string) => void;
}

const DEFAULT_ACCENT = "#ff2d78";
const DURATION = 0.32;
const STAGGER = 0.08;

export const PinkWipeTransition = forwardRef<PinkWipeHandle>(
  function PinkWipeTransition(_, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const accentRef = useRef<HTMLDivElement>(null);
    const [accentColor, setAccentColorState] = useState(DEFAULT_ACCENT);

    useImperativeHandle(ref, () => ({
      setAccentColor: (color: string) => {
        setAccentColorState(color);
      },
      playCover: () => {
        return new Promise<void>((resolve) => {
          const container = containerRef.current;
          if (!container) { resolve(); return; }

          const panels = Array.from(container.children) as HTMLElement[];
          container.style.visibility = "visible";
          container.style.pointerEvents = "auto";

          gsap.fromTo(
            panels,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: DURATION,
              ease: "power3.inOut",
              stagger: STAGGER,
              onComplete: resolve,
            }
          );
        });
      },
      playReveal: () => {
        return new Promise<void>((resolve) => {
          const container = containerRef.current;
          if (!container) { resolve(); return; }

          const panels = Array.from(container.children) as HTMLElement[];

          gsap.to(panels, {
            yPercent: -100,
            duration: DURATION,
            ease: "power3.inOut",
            stagger: STAGGER,
            onComplete: () => {
              container.style.visibility = "hidden";
              container.style.pointerEvents = "none";
              gsap.set(panels, { yPercent: 100 });
              resolve();
            },
          });
        });
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      gsap.set(Array.from(container.children), { yPercent: 100 });
    }, []);

    return (
      <div
        ref={containerRef}
        style={{ visibility: "hidden", pointerEvents: "none" }}
        className="fixed inset-0 z-[9999]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="absolute inset-0 bg-white" />
        <div
          ref={accentRef}
          className="absolute inset-0"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    );
  }
);
