import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  pageMetadata,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/images/mcb-creative-logo.svg",
  },
  // Homepage canonical/OG block. Routes that declare their own replace this
  // wholesale rather than merging into it — see `pageMetadata`.
  ...pageMetadata({ path: "/" }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={
        {
          "--font-family-mono": GeistMono.style.fontFamily,
          "--font-family-headline": GeistSans.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body className="antialiased bg-background text-black">
        <SmoothScrollProvider>
          <LayoutShell>{children}</LayoutShell>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
