import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface CustomSessionClaims {
  user_role?: string | null;
}

const isProtectedRoute = createRouteMatcher([
  "/account(.*)",
  "/wishlist(.*)",
  "/checkout(.*)",
  "/cart(.*)",
  "/orders(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const redirectToSignInPage = (req: NextRequest) => {
  const signInUrl = new URL(
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string,
    req.url
  );
  signInUrl.searchParams.set("redirect_url", req.url);
  return NextResponse.redirect(signInUrl);
};

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims } = await auth();

  // Normal routes protected
  if (isProtectedRoute(req) && !isAuthenticated) {
    return redirectToSignInPage(req);
  }

  // Role-protected admin routes
  if (isAdminRoute(req)) {
    if (!isAuthenticated) {
      return redirectToSignInPage(req);
    }

    if ((sessionClaims as CustomSessionClaims).user_role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
