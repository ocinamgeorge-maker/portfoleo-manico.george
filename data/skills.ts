import type { SkillCategory } from "@/lib/types";

export const skillCategories = [
  {
    id: "frontend",
    title: { de: "Frontend", en: "Frontend" },
    description: {
      de: "Technologien, mit denen ich Benutzeroberflächen und moderne Webanwendungen entwickle.",
      en: "Technologies I use to build user interfaces and modern web applications.",
    },
    technologies: [
      "Vue.js",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    id: "backend",
    title: { de: "Backend", en: "Backend" },
    description: {
      de: "Tools und Technologien für Backend-Logik, APIs und serverseitige Anwendungen.",
      en: "Tools and technologies for backend logic, APIs and server-side applications.",
    },
    technologies: ["Java", "Spring Boot", "REST APIs"],
  },
  {
    id: "data",
    title: { de: "Daten", en: "Data" },
    description: {
      de: "Technologien, mit denen ich relationale Daten speichere, strukturiere und abfrage.",
      en: "Technologies I use to store, structure and query relational data.",
    },
    technologies: ["SQL", "MariaDB", "MySQL"],
  },
  {
    id: "development",
    title: { de: "Development", en: "Development" },
    description: {
      de: "Werkzeuge, die ich für Versionskontrolle, Zusammenarbeit und Entwicklungsprozesse verwende.",
      en: "Tools I use for version control, collaboration and development workflows.",
    },
    technologies: ["Git", "GitLab", "Docker", "SDX", "i18n"],
  },
] satisfies SkillCategory[];