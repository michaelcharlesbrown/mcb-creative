"use client";

import { useEffect, useRef, useState } from "react";

/* \u00a0 keeps "San Francisco///Los Angeles" as one word-span so it animates as a unit */
const LINES = [
  "Senior visual designer and creative director focused on brand identity, web design, and motion.".split(" "),
  "San\u00a0Francisco///Los\u00a0Angeles".split(" "),
];

export default function AboutBlurb() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mainText = LINES[0].join(" ");
  const locationText = LINES[1].join(" ");

  return (
    <section
      ref={sectionRef}
      className={`about-blurb ${isInView ? "about-blurb--in-view" : ""}`}
      aria-label="About"
    >
      <div className="w-full max-w-[var(--content-max-width)] mx-auto content-inset">
        <div className="w-full grid grid-cols-12 gap-x-4 md:gap-x-[clamp(1rem,2vw,2rem)]">
          <p className="info-page__text col-span-12 md:col-span-7 md:col-start-5 uppercase font-normal text-left max-w-[calc(100%-35px)]" style={{ color: "var(--color-white)" }}>
            {mainText}
            <br /><br />
            <span style={{ fontSize: "0.75em" }}>{locationText}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
