"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useOAuthSignIn } from "@/hooks/useOAuthSignIn";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Facebook, Mail, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";
  const { signInWith, isLoading, isSigningIn } = useOAuthSignIn({
    redirectUrlComplete: redirectUrl,
  });

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-lightBg px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-center">
            Elija su método de inicio de sesión preferido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full hover:bg-lightBg hoverEffect"
            onClick={() => signInWith("oauth_google")}
            disabled={isSigningIn}
            aria-label="Continuar con Google"
          >
            {isLoading === "oauth_google" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            Continuar con Google
          </Button>

          {/* Facebook Sign In */}
          <Button
            variant="outline"
            className="w-full hover:bg-lightBg hoverEffect"
            onClick={() => signInWith("oauth_facebook")}
            disabled={isSigningIn}
            aria-label="Continuar con Facebook"
          >
            {isLoading === "oauth_facebook" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Facebook className="mr-2 h-4 w-4" />
            )}
            Continuar con Facebook
          </Button>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">O</span>
            </div>
          </div>

          {/* Email Sign In */}
          <SignInButton mode="modal" forceRedirectUrl={redirectUrl}>
            <Button
              variant="outline"
              className="w-full hover:bg-lightBg hoverEffect cursor-pointer"
              disabled={isSigningIn}
              aria-label="Iniciar sesión con correo electrónico"
            >
              <Mail className="mr-2 h-4 w-4" />
              Iniciar sesión con correo electrónico
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            ¿No tiene cuenta?{" "}
            <SignUpButton mode="modal" forceRedirectUrl={redirectUrl}>
              <button className="underline hover:text-darkBlue hoverEffect cursor-pointer font-semibold decoration-1 underline-offset-2">
                Registrarse
              </button>
            </SignUpButton>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
