"use client";

import { useState, useEffect } from "react";

const CURSOR_SIZE = 14;
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const CURSOR_SCALE_HOVER = 2.5;
const INTERACTIVE_SELECTORS =
  'a, button, input, select, textarea, [role="button"], [href], [onclick]';

function isInteractiveElement(element: Element | null): boolean {
  if (!element || element === document.body) return false;
  const el = element as HTMLElement;
  if (el.matches?.(INTERACTIVE_SELECTORS)) return true;
  if (getComputedStyle(el).cursor === "pointer") return true;
  return isInteractiveElement(el.parentElement);
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisabled(true);
      return;
    }

    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
      setIsHovering(isInteractiveElement(elementUnder));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [isVisible]);

  if (disabled) return null;

  const size = isHovering ? CURSOR_SIZE * CURSOR_SCALE_HOVER : CURSOR_SIZE;

  return (
    <div
      className="custom-cursor"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition:
          "width 0.2s ease-out, height 0.2s ease-out, opacity 0.15s ease-out",
      }}
    />
  );
}
