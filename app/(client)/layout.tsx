import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { logoName } from "../constants";
import Header from "@/components/Header/Header";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";

export const metadata: Metadata = {
  title: `${logoName} Ecommerce app for shoppers`,
  description: "An Ecommerce app for selling jewerly products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
      <Header />
      {children}
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#ffffff",
          },
        }}
      />
      <SanityLive />
    </ClerkProvider>
  );
}
