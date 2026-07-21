import "./globals.css";
import "./styles/typography-admin.css";
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
      </head>
      <body>
        <FontSettingsProvider>{children}</FontSettingsProvider>
      </body>
    </html>
  );
}
