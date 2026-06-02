import React from "react";
import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";
import { logoName } from "./constants";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import { SanityLive } from "@/sanity/lib/live";
import { Toaster } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joyassol.cl";

const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: `${logoName} | Joyas Artesanales`,
    template: `%s | ${logoName}`,
  },

  description:
    "Descubre joyas artesanales únicas hechas a mano en Temuco, Chile. Collares, anillos, aretes y pulseras de alta calidad con diseños exclusivos. Envíos a todo Chile.",

  keywords: [
    "joyas artesanales",
    "joyas caseras",
    "joyería artesanal Chile",
    "joyas Temuco",
    "collares artesanales",
    "anillos artesanales",
    "aretes artesanales",
    "pulseras artesanales",
    "joyas hechas a mano",
    "joyería online Chile",
    "joyas únicas",
    "accesorios artesanales",
  ],

  authors: [{ name: logoName, url: baseUrl }],
  creator: logoName,
  publisher: logoName,

  // base canonical URL
  metadataBase: new URL(baseUrl),

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: baseUrl,
    siteName: logoName,
    title: `${logoName} | Joyas Artesanales Únicas`,
    description:
      "Joyas artesanales hechas a mano con diseños exclusivos. Envíos a todo Chile desde Temuco.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${logoName} - Joyas Artesanales`,
        type: "image/png",
      },
    ],
  },

  // Twitter/X Cards
  twitter: {
    card: "summary_large_image",
    title: `${logoName} | Joyas Artesanales`,
    description:
      "Joyas artesanales hechas a mano con diseños exclusivos. Envíos a todo Chile.",
    images: ["/og-image.png"],
  },

  // Robots: index everything except private routes
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png", // 180x180px
    shortcut: "/favicon-32x32.png",
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",
  category: "shopping",

  // Search engines verification (optional)
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE"
  // },

  alternates: {
    canonical: baseUrl,
    languages: {
      "es-CL": baseUrl,
    },
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es">
        <body className={`${raleway.variable} antialiased`}>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#1f2937",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              },
              className: "sonner-toast",
            }}
          />
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
