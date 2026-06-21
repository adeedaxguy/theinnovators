import "./globals.css";

export const metadata = {
  title: "The Innovators - Virtual & Visual Innovation Ecosystem",
  description:
    "A React and Next.js rebuild of The INNOVATORS, the virtual and visual innovation ecosystem.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
