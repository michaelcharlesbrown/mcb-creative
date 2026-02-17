"use client";

import { useEffect, useRef, useState } from "react";

const WORDS =
  "Michael Charles Brown is an independent graphic designer based in Los Angeles and San Francisco, focused on brand identity design, motion and creative development.".split(
    " "
  );

export default function AboutBlurb() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [fontSize, setFontSize] = useState(100);

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

  useEffect(() => {
    const calculateFontSize = () => {
      const section = sectionRef.current;
      const text = textRef.current;
      if (!section || !text) return;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const availableHeight = viewportHeight * 0.7; // Use 70% of viewport height
      const availableWidth = viewportWidth * 0.9; // Use 90% of viewport width

      // Start small and increment until text doesn't fit
      let testSize = 20;
      let lastGoodSize = 20;

      while (testSize < 500) {
        text.style.fontSize = `${testSize}px`;
        text.style.lineHeight = '0.9';

        const textHeight = text.scrollHeight;
        
        if (textHeight > availableHeight) {
          // Text is too tall, use last size that worked
          break;
        }
        
        lastGoodSize = testSize;
        testSize += 5; // Increment by 5px
      }

      setFontSize(lastGoodSize);
    };

    // Run after component mounts and DOM is ready
    setTimeout(calculateFontSize, 100);
    window.addEventListener("resize", calculateFontSize);
    return () => window.removeEventListener("resize", calculateFontSize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-blurb ${isInView ? "about-blurb--in-view" : ""}`}
      aria-label="About"
    >
      <div className="about-blurb__inner">
        <p 
          ref={textRef}
          className="intro about-blurb__text"
          style={{ fontSize: `${fontSize}px` }}
        >
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
