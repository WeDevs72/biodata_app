import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block admin panel and raw API routes from indexing
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.biodataearth.com/sitemap.xml",
  };
}
