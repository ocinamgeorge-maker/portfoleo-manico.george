import { copy } from "@/data/translations";
import type { Experience, Language } from "@/lib/types";

function formatMonthYear(date: string, language: Language): string {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  return new Intl.DateTimeFormat(language === "de" ? "de-CH" : "en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
}

export function formatExperiencePeriod(
  experience: Experience,
  language: Language,
): string {
  const start = formatMonthYear(experience.startDate, language);
  const end = experience.current
    ? copy.experience.present[language]
    : experience.endDate
      ? formatMonthYear(experience.endDate, language)
      : "";

  return end ? `${start} – ${end}` : start;
}