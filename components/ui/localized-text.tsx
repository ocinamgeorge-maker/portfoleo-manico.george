import type { LocalizedText as LocalizedTextValue } from "@/lib/types";
import { cn } from "@/lib/utils";

type LocalizedTextProps = {
  text: LocalizedTextValue;
  className?: string;
};

export function LocalizedText({ text, className }: LocalizedTextProps) {
  return (
    <>
      <span className={cn("localized-text localized-text-de", className)} lang="de">
        {text.de}
      </span>
      <span className={cn("localized-text localized-text-en", className)} lang="en">
        {text.en}
      </span>
    </>
  );
}