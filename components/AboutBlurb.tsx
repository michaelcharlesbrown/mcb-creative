"use client";

import { useEffect, useRef, useState } from "react";

const WORDS =
  "Michael Charles Brown is an independent graphic designer based in Los Angeles and San Francisco, focused on brand identity design, motion and creative development.".split(
    " "
  );

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
        <p className="about-blurb__text">
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="about-blurb__word"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
