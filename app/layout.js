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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
