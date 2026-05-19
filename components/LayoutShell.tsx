"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WorkPageMarquees from "@/components/WorkPageMarquees";
import CustomCursor from "@/components/CustomCursor";
import LogoVideoReveal from "@/components/LogoVideoReveal";
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
  const isProjectsPage = pathname === "/projects" || pathname?.startsWith("/projects/");
  const showLogoVideo = !isHomePage && !isProjectsPage;
  const showSiteChrome = !isHomePage;

  return (
    <AccentColorProvider>
      <CustomCursor />
      {showSiteChrome && <Navigation />}
      {children}
      {!isHomePage && showLogoVideo && <LogoVideoReveal />}
      {/* Holding homepage at `/` has no chrome; full homepage used Home*Layout for marquee + footer. */}
      {!isHomePage && <WorkPageMarquees />}
      {!isHomePage && <Footer />}
    </AccentColorProvider>
  );
}
