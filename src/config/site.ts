export const siteConfig = {
  name: "My Baby Shower de Amber Eileen",
  shortName: "My Baby Shower",
  title: "My Baby Shower | Amber Eileen",
  description:
    "Los hijos son herencia del Señor. Salmo 127:3. Sábado 18 de julio de 2026, 7:30 PM.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://joalvm.github.io/baby-shower-luz/",
  locale: "es_PE",
  themeColor: "#ead1dc",
  backgroundColor: "#fff7fa",
  keywords: [
    "Baby Shower Amber Eileen",
    "invitación baby shower",
    "baby shower Piura",
    "Amber Eileen",
    "invitación digital",
  ],
};

export function getAbsoluteUrl(path = "/") {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
