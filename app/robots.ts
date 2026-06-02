import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joyassol.cl";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/employee/",
          "/signin",
          "/signup",
          "/sso-callback",
          "/account/",
          "/checkout/",
          "/cart",
          "/orders/",
          "/user/",
          "/studio/",
          "/dashboard/",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
