"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useTransitionController } from "./TransitionContext";

export function useNavigateWithTransition() {
  const router = useRouter();
  const { playCover, playReveal, setAccentColor } = useTransitionController();

  const navigateWithTransition = useCallback(
    async (href: string, accentColor?: string) => {
      if (accentColor) setAccentColor(accentColor);
      document.body.style.pointerEvents = "none";
      try {
        await playCover();
        router.push(href);
        playReveal().finally(() => {
          document.body.style.pointerEvents = "";
        });
      } catch {
        document.body.style.pointerEvents = "";
      }
    },
    [router, playCover, playReveal, setAccentColor]
  );

  return { navigateWithTransition };
}
