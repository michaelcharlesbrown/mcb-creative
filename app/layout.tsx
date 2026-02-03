import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TransitionProvider } from "@/components/TransitionContext";
import TransitionOverlay from "@/components/TransitionOverlay";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MCB Creative",
  description: "MCB Creative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} ${clashDisplay.variable} antialiased bg-white text-black`}
      >
        <TransitionProvider>
          <Navigation />
          {children}
          <Footer />
          <TransitionOverlay />
        </TransitionProvider>
      </body>
    </html>
  );
}
