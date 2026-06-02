"use client";
import { useSignIn } from "@clerk/nextjs";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { OAuthStrategy } from "@clerk/shared/types";

interface UseOAuthSignInOptions {
  redirectUrl?: string;
  redirectCallbackUrl?: string;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}

export function useOAuthSignIn(options: UseOAuthSignInOptions = {}) {
  const { signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const {
    redirectUrl = "/",
    redirectCallbackUrl = "/sso-callback",
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
        const { error } = await signIn.sso({
          strategy,
          redirectUrl,
          redirectCallbackUrl,
        });

        if (error) {
          throw new Error(error.message);
        }

        // Success callback
        onSuccess?.();
      } catch (err) {
        const error = err as Error;
        console.error("Error signing in:", error);

        // Error toast
        toast.error(
          error.message || "Error al iniciar sesión. Inténtelo de nuevo.",
        );

        // Error callback
        onError?.(error);

        setIsLoading(null);
      }
    },
    [signIn, redirectUrl, redirectCallbackUrl, onError, onSuccess],
  );

  return {
    signInWith,
    isLoading,
    isSigningIn: !!isLoading,
  };
}
