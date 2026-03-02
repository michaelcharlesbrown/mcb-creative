"use client";

import { useEffect } from "react";

/**
 * Adds a class to <body> while this component is mounted, removes it on unmount.
 * Use to apply page-scoped body styles without inline <style> tags.
 */
export default function BodyClass({ className }: { className: string }) {
  useEffect(() => {
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  return null;
}
