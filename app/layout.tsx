import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-family-wordmark",
});

export const metadata: Metadata = {
  title: "MCB Creative",
  description: "MCB Creative",
  icons: {
    icon: "/images/mcb-creative-logo.svg",
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
      className={clashDisplay.variable}
    >
      <body className="antialiased bg-background text-black">
        <SmoothScrollProvider>
          <LayoutShell>{children}</LayoutShell>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
