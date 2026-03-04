"use client";

import { useEffect } from "react";
import { useAccentColor } from "@/components/AccentColorContext";

export default function SetAccentColor({ color }: { color?: string | null }) {
  const { setAccentColor } = useAccentColor();

  useEffect(() => {
    setAccentColor(color ?? null);
    document.documentElement.style.setProperty("--project-accent-overlay", color ?? "transparent");
    return () => {
      setAccentColor(null);
      document.documentElement.style.removeProperty("--project-accent-overlay");
    };
  }, [color, setAccentColor]);

  return null;
}
