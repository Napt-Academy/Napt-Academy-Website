import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingAllowed } from "@/lib/seo";

export const dynamic = "force-dynamic";

const CRAWLERS = ["*", "Googlebot", "Bingbot", "GPTBot", "ChatGPT-User", "ClaudeBot", "Claude-Web"] as const;

const PRIVATE_PATHS = ["/admin", "/api"];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: CRAWLERS.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: PRIVATE_PATHS,
    })),
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
