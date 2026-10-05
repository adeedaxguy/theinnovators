import "./globals.css";
import "./styles/typography-admin.css";
import "./styles/experience-hub.css";
import "./styles/brand-fonts.css";
import "./styles/landing-readable.css";
import "./styles/tv-frame.css";
import "./styles/analysis-dialog.css";
import FontSettingsProvider from "./FontSettingsProvider";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "The Innovators - Virtual & Visual Innovation Ecosystem",
  description:
    "A React and Next.js rebuild of The INNOVATORS, the virtual and visual innovation ecosystem.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="preload" href="/assets/fonts/now/Now-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Roboto-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <FontSettingsProvider>{children}</FontSettingsProvider>
      </body>
    </html>
  );
}
