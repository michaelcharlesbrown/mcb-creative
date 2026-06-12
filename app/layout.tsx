import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "MCB Creative",
  description: "MCB Creative",
  metadataBase: new URL("https://mcbcreative.design"),
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
          "--font-family-sans": GeistSans.style.fontFamily,
          "--font-family-mono": GeistMono.style.fontFamily,
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
