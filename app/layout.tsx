import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const SITE_DESCRIPTION =
  "MCB Creative is the independent design studio of Michael Charles Brown — brand identity, interactive web design, motion, and illustration.";

export const metadata: Metadata = {
  title: {
    default: "MCB Creative — Independent Design Studio",
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://mcbcreative.design"),
  icons: {
    icon: "/images/mcb-creative-logo.svg",
  },
  openGraph: {
    type: "website",
    siteName: "MCB Creative",
    title: "MCB Creative — Independent Design Studio",
    description: SITE_DESCRIPTION,
    url: "https://mcbcreative.design",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "MCB Creative — Independent Design Studio of Michael Charles Brown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCB Creative — Independent Design Studio",
    description: SITE_DESCRIPTION,
    images: ["/images/og.png"],
  },
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
