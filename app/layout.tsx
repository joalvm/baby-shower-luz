import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/sacramento/400.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baby Shower de Amber Eileen",
  description: "Invitación digital en acuarela — un bosque encantado para celebrar su llegada.",
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
