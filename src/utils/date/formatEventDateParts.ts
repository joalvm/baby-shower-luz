import { normalizeLimaDateTime } from "./normalizeLimaDateTime";
import { capitalizeFirst } from "../text/capitalizeFirst";

export type EventDateParts = {
  day: string;
  month: string;
  time: string;
  weekday: string;
  year: string;
};

export function formatEventDateParts(value: string): EventDateParts {
  const parsed = new Date(normalizeLimaDateTime(value));
  const dateFormatter = new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    timeZone: "America/Lima",
    weekday: "long",
    year: "numeric",
  });
  const time = new Intl.DateTimeFormat("es-PE", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    timeZone: "America/Lima",
  })
    .format(parsed)
    .replace(/\s*a\.\s*m\./i, " AM")
    .replace(/\s*p\.\s*m\./i, " PM");
  const parts = dateFormatter.formatToParts(parsed);

  return {
    day: parts.find((part) => part.type === "day")?.value ?? "18",
    month: capitalizeFirst(parts.find((part) => part.type === "month")?.value ?? "julio"),
    time,
    weekday: capitalizeFirst(parts.find((part) => part.type === "weekday")?.value ?? "sábado"),
    year: parts.find((part) => part.type === "year")?.value ?? "2026",
  };
}
