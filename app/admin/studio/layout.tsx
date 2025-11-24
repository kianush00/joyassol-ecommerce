import { logoName } from "@/app/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${logoName} Ecommerce app for shoppers`,
  description: "An Ecommerce app for selling jewerly products",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
