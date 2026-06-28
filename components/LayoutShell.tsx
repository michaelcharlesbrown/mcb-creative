"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import PageFooter from "@/components/PageFooter";
import CustomCursor from "@/components/CustomCursor";
import { AccentColorProvider } from "@/components/AccentColorContext";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  // Locked single-viewport pages render their own fixed corner lockup
  // (HeroCorners), so the in-flow PageFooter is suppressed for them.
  const isLockedViewport = pathname === "/" || pathname === "/info";

  return (
    <AccentColorProvider>
      <CustomCursor />
      <Navigation />
      {children}
      {!isLockedViewport && <PageFooter />}
    </AccentColorProvider>
  );
}
