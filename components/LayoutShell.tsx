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

  const isHomePage = pathname === "/";

  return (
    <AccentColorProvider>
      <CustomCursor />
      <Navigation />
      {children}
      {!isHomePage && <Footer />}
    </AccentColorProvider>
  );
}
