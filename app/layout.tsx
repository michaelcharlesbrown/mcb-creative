import type { Metadata } from "next";
import { IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
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
        className={`${ibmPlexMono.variable} ${bebasNeue.variable} antialiased bg-white text-black`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
