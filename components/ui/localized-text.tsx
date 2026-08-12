import type {
  Language,
  LocalizedText as LocalizedTextValue,
} from "@/lib/types";
import { cn } from "@/lib/utils";

type LocalizedTextProps = {
  text: LocalizedTextValue;
  language: Language;
  className?: string;
};

export function LocalizedText({
  text,
  language,
  className,
}: LocalizedTextProps) {
  return (
    <span
      className={cn("localized-text", className)}
      lang={language === "de" ? "de-CH" : "en"}
    >
      {text[language]}
    </span>
  );
}
