"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

  // Footer renders once here for every page (single source of truth). The home
  // layouts must NOT embed their own Footer — doing so previously produced
  // duplicate, stacked footers on the homepage.
  return (
    <AccentColorProvider>
      <CustomCursor />
      <Navigation />
      {children}
      <Footer />
    </AccentColorProvider>
  );
}
