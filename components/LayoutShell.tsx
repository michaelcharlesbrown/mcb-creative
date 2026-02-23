"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor />
      <TransitionWrapper>
        <Navigation />
        {children}
      </TransitionWrapper>
      <Footer />
    </>
  );
}
