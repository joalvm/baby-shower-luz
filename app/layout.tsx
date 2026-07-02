import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getAbsoluteUrl, siteConfig } from "@/config/site";
import "@fontsource/sacramento/400.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Aurora y Luis" }],
  creator: "Alejandro Vilchez",
  publisher: "Alejandro Vilchez",
  alternates: {
    canonical: siteConfig.url,
  },
  category: "event",
  manifest: getAbsoluteUrl("/manifest.webmanifest"),
  icons: {
    icon: [
      { url: getAbsoluteUrl("/meta/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: getAbsoluteUrl("/meta/icon-192.png"), sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: getAbsoluteUrl("/meta/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/meta/og-invitation.jpg"),
        width: 1200,
        height: 848,
        type: "image/jpeg",
        alt: "My Baby Shower de Amber Eileen. Sábado 18 de julio de 2026, 7:30 PM.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [getAbsoluteUrl("/meta/og-invitation.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
