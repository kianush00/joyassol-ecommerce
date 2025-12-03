"use client";
import { useSignIn } from "@clerk/nextjs";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

type OAuthStrategy = "oauth_google" | "oauth_facebook";

interface UseOAuthSignInOptions {
  redirectUrl?: string;
  redirectUrlComplete?: string;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}

export function useOAuthSignIn(options: UseOAuthSignInOptions = {}) {
  const { signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const {
    redirectUrl = "/sso-callback",
    redirectUrlComplete = "/",
    onError,
    onSuccess,
  } = options;

  const signInWith = useCallback(
    async (strategy: OAuthStrategy) => {
      if (!signIn) {
        toast.error("Error al inicializar el login");
        return;
      }

      setIsLoading(strategy);

      try {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl,
          redirectUrlComplete,
        });

        // Success callback
        onSuccess?.();
      } catch (err) {
        const error = err as Error;
        console.error("Error signing in:", error);

        // Error toast
        toast.error(
          error.message || "Error al iniciar sesión. Inténtelo de nuevo."
        );

        // Error callback
        onError?.(error);

        setIsLoading(null);
      }
    },
    [signIn, redirectUrl, redirectUrlComplete, onError, onSuccess]
  );

  return {
    signInWith,
    isLoading,
    isSigningIn: !!isLoading,
  };
}
