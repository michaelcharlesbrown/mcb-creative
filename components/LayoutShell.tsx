"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WorkPageCta from "@/components/WorkPageCta";
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

  const isHomePage = pathname === "/";

  return (
    <AccentColorProvider>
      <CustomCursor />
      <Navigation />
      {children}
      {!isHomePage && (
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset">
          <WorkPageCta />
        </div>
      )}
      {!isHomePage && <Footer />}
    </AccentColorProvider>
  );
}
