import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";
import { logoName } from "./constants";
import { esMX } from "@clerk/localizations";

export const metadata: Metadata = {
  title: `${logoName} Ecommerce app for shoppers`,
  description: "An Ecommerce app for selling jewerly products",
};

const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es">
        <body className={`${raleway.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
