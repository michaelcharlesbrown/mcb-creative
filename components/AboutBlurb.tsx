"use client";

import { useEffect, useRef, useState } from "react";

/* Non-breaking spaces (\u00a0) keep "Web Design." and "San Francisco /// Los Angeles" on one line each */
const LINES = [
  "Senior visual designer and creative director focused on brand identity, motion and web\u00a0design.".split(" "),
  "San\u00a0Francisco\u00a0///\u00a0Los\u00a0Angeles".split(" "),
];

const INFO_SECTION_FONT_SIZE = 60;

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

  return (
    <section
      ref={sectionRef}
      className={`about-blurb ${isInView ? "about-blurb--in-view" : ""}`}
      aria-label="About"
    >
      <div className="about-blurb__inner">
        <p
          className="about-blurb__text"
          style={{ '--about-blurb-font-size': `${INFO_SECTION_FONT_SIZE}px` } as React.CSSProperties}
        >
          {LINES.map((lineWords, lineIndex) => (
            <span key={lineIndex} className={lineIndex === 1 ? "about-blurb__location" : undefined}>
              {lineWords.map((word, i) => {
                const wordIndex = LINES.slice(0, lineIndex).flat().length + i;
                return (
                  <span
                    key={i}
                    className="about-blurb__word"
                    style={{ animationDelay: `${wordIndex * 0.05}s` }}
                  >
                    {word}{" "}
                  </span>
                );
              })}
              {lineIndex < LINES.length - 1 && (
                lineIndex === LINES.length - 2 ? <><br /><br /></> : <br />
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
