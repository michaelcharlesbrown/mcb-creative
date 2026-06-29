"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import PageFooter from "@/components/PageFooter";
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

  // Homepage already embeds Footer inside HomeMobileLayout/HomeDesktopLayout
  const isHomepage = pathname === "/";

  return (
    <AccentColorProvider>
      <CustomCursor />
      <Navigation />
      {children}
      {!isHomepage && <Footer />}
    </AccentColorProvider>
  );
}
