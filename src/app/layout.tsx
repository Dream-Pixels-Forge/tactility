import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tactility.io"),
  title: {
    default: "TACTILITY — The Biological Interface",
    template: "%s | TACTILITY",
  },
  description:
    "Tactility engineers the seamless interface between the human nervous system and the digital world. Cybernetic ecosystem: Kinetic Carry, Cybernetic Locomotion, Neural Peripherals.",
  keywords: [
    "cybernetic",
    "human augmentation",
    "neural interface",
    "wearable technology",
    "haptic feedback",
    "biohacking",
    "futuristic",
    "kinetic carry",
    "locomotion",
    "neural peripherals",
  ],
  authors: [{ name: "TACTILITY" }],
  creator: "TACTILITY",
  publisher: "TACTILITY",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tactility.io",
    siteName: "TACTILITY",
    title: "TACTILITY — The Biological Interface",
    description:
      "The human body is an unfinished prototype. Tactility engineers the next phase of human locomotion and awareness.",
    images: [
      {
        url: "/images/hero-1.png",
        width: 1200,
        height: 630,
        alt: "TACTILITY — The Biological Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TACTILITY — The Biological Interface",
    description:
      "The human body is an unfinished prototype. Tactility engineers the next phase of human locomotion and awareness.",
    creator: "@tactility",
    images: ["/images/hero-1.png"],
  },
  alternates: {
    canonical: "https://tactility.io",
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
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        {/* Fallback heading font via CSS — Blender Pro / Neue Machina */}
        <style>{`
          @font-face {
            font-family: 'Blender Pro';
            src: local('Arial Black');
            font-weight: 700;
            font-style: normal;
          }
          @font-face {
            font-family: 'Neue Machina';
            src: local('Arial Black');
            font-weight: 700;
            font-style: normal;
          }
        `}</style>
      </head>
      <body className="bg-bg-primary text-text-primary overflow-x-hidden min-h-screen">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-cyan focus:text-bg-primary focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Skip to main content
        </a>
        {/* Persistent background grid */}
        <div className="bg-grid-fade" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
