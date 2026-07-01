import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-07-01T00:00:00-05:00"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
