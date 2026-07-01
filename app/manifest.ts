import type { MetadataRoute } from "next";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: siteConfig.url,
    scope: siteConfig.url,
    display: "standalone",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    icons: [
      {
        src: getAbsoluteUrl("/meta/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: getAbsoluteUrl("/meta/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
