"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNavigateWithTransition() {
  const router = useRouter();

  const navigateWithTransition = useCallback(
    (href: string, _accentColor?: string) => {
      // _accentColor kept for call-site compatibility, unused in new system
      if (typeof document === "undefined" || !document.startViewTransition) {
        router.push(href);
        return;
      }
      document.startViewTransition(() => {
        router.push(href);
      });
    },
    [router]
  );

  return { navigateWithTransition };
}
