export const languages = ["de", "en"] as const;

export type Language = (typeof languages)[number];

export type LocalizedText = Record<Language, string>;

export type NavigationItem = {
  href: `#${string}`;
  label: LocalizedText;
};

export type SkillCategory = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
};

export type Experience = {
  id: string;
  organization: string;
  shortName: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  title: LocalizedText;
  projectTitle: LocalizedText;
  projectSummary: LocalizedText;
  experienceFocus: LocalizedText;
  description: LocalizedText[];
  workModel: LocalizedText;
  technologies: string[];
  projectTechnologies: string[];
};

export function isLanguage(value: string | null): value is Language {
  return languages.includes(value as Language);
}