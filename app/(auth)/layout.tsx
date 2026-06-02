import { Metadata } from "next";
import { logoName } from "../constants";

export const metadata: Metadata = {
  title: `Authentication - ${logoName}`,
  description: `Sign in or create an account with ${logoName} to access exclusive deals, track orders, and enjoy personalized shopping experiences.`,
  keywords: [
    "sign in",
    "sign up",
    "login",
    "register",
    "account",
    "authentication",
  ],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
