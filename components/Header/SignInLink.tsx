"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInLink() {
  const pathname = usePathname();
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string;

  if (pathname === signInUrl) {
    return null;
  }

  return (
    <Link
      href={signInUrl}
      className="text-sm font-semibold hover:text-darkColor hoverEffect"
    >
      Iniciar sesión
    </Link>
  );
}
