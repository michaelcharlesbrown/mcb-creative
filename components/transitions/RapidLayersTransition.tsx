"use client";

import gsap from "gsap";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import styles from "./RapidLayersTransition.module.css";

export interface RapidLayersTransitionHandle {
  play: () => Promise<void>;
  reveal: () => Promise<void>;
}

const ALL_IMAGES = Array.from({ length: 6 }, (_, i) =>
  `/images/transitions/${String(i + 1).padStart(2, "0")}.jpg`
);

function getRandomLayers() {
  return [...ALL_IMAGES].sort(() => Math.random() - 0.5).slice(0, 6);
}

export const RapidLayersTransition = forwardRef<
  RapidLayersTransitionHandle,
  { onComplete?: () => void }
>(function RapidLayersTransition({ onComplete }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useImperativeHandle(ref, () => ({
    play: () => {
      return new Promise<void>((resolve) => {
        const container = containerRef.current;
        if (!container) {
          resolve();
          return;
        }

        const wrapEls = container.querySelectorAll<HTMLElement>(`.${styles.layerWrap}`);
        const imgEls = container.querySelectorAll<HTMLElement>(`.${styles.layerImg}`);

        container.style.visibility = "visible";

        if (prefersReducedMotion) {
          gsap.set(wrapEls, { yPercent: 0 });
          gsap.set(imgEls, { yPercent: 0 });
          container.style.pointerEvents = "none";
          container.style.visibility = "hidden";
          onComplete?.();
          resolve();
          return;
        }

        container.style.pointerEvents = "auto";
        gsap.set(wrapEls, { yPercent: 101 });
        gsap.set(imgEls, { yPercent: -101 });

        const randomImages = getRandomLayers();
        imgEls.forEach((el, i) => {
          el.style.backgroundImage = `url(${randomImages[i]})`;
        });

        const ctx = gsap.context(() => {
          const duration = 1;
          const panelDelay = 0.15;
          const tl = gsap.timeline({
            onComplete: () => {
              container.style.pointerEvents = "none";
              resolve();
            },
          });

          for (let i = 0; i < wrapEls.length; i++) {
            tl.to(
              [wrapEls[i], imgEls[i]],
              {
                yPercent: 0,
                duration,
                ease: "power2.inOut",
              },
              panelDelay * i
            );
          }
        }, container);

        return () => ctx.revert();
      });
    },
    reveal: () => {
      return new Promise<void>((resolve) => {
        const container = containerRef.current;
        if (!container) {
          resolve();
          return;
        }

        const wrapEls = container.querySelectorAll<HTMLElement>(`.${styles.layerWrap}`);
        const imgEls = container.querySelectorAll<HTMLElement>(`.${styles.layerImg}`);

        if (prefersReducedMotion) {
          container.style.visibility = "hidden";
          onComplete?.();
          resolve();
          return;
        }

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              container.style.pointerEvents = "none";
              container.style.visibility = "hidden";
              onComplete?.();
              resolve();
            },
          });

          tl.to(
            [...wrapEls, ...imgEls],
            {
              yPercent: -101,
              duration: 0.6,
              ease: "power2.inOut",
            }
          );
        }, container);

        return () => ctx.revert();
      });
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wrapEls = container.querySelectorAll<HTMLElement>(`.${styles.layerWrap}`);
    const imgEls = container.querySelectorAll<HTMLElement>(`.${styles.layerImg}`);

    const ctx = gsap.context(() => {
      gsap.set(wrapEls, { yPercent: 101 });
      gsap.set(imgEls, { yPercent: -101 });
    }, container);

    return () => {
      gsap.killTweensOf(container.querySelectorAll("*"));
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.overlay}
      style={{ pointerEvents: "none", visibility: "hidden" }}
      aria-hidden
    >
      {ALL_IMAGES.map((url, i) => (
        <div key={i} className={styles.layerWrap}>
          <div
            className={styles.layerImg}
            style={{
              backgroundImage: `url(${url})`,
            }}
          />
        </div>
      ))}
    </div>
  );
});
