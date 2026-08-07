import type { Experience } from "@/lib/types";

export const experiences = [
  {
    id: "halo-team",
    organization: "Swisscom",
    shortName: "Halo Team",
    startDate: "2026-08-01",
    current: true,
    title: {
      de: "Fullstack AI Developer – Swisscom Halo Team",
      en: "Fullstack AI Developer – Swisscom Halo Team",
    },
    projectTitle: {
      de: "Fullstack & AI Development",
      en: "Fullstack & AI Development",
    },
    projectSummary: {
      de: "Aktuell arbeite ich im Swisscom Halo Team mit Fokus auf Fullstack-Entwicklung und künstliche Intelligenz. Dabei erweitere ich meine technischen Kenntnisse und sammle praktische Erfahrung mit modernen Softwarelösungen.",
      en: "I am currently working in the Swisscom Halo team with a focus on full-stack development and artificial intelligence. I am expanding my technical knowledge and gaining practical experience with modern software solutions.",
    },
    experienceFocus: {
      de: "Fullstack & AI Development",
      en: "Fullstack & AI Development",
    },
    description: [
      {
        de: "Seit August 2026 arbeite ich im Swisscom Halo Team mit Fokus auf Fullstack-Entwicklung und künstliche Intelligenz. In diesem Umfeld entwickle ich meine Kenntnisse in modernen Webtechnologien weiter und sammle praktische Erfahrung in AI-bezogenen Projekten.",
        en: "Since August 2026, I have been working in the Swisscom Halo Team with a focus on fullstack development and artificial intelligence. In this environment, I continue to develop my knowledge of modern web technologies and gain practical experience in AI-related projects.",
      },
    ],
    workModel: { de: "Hybrid", en: "Hybrid" },
    technologies: ["Fullstack", "AI"],
    projectTechnologies: ["Fullstack Development", "Artificial Intelligence"],
  },
  {
    id: "nexcc",
    organization: "Swisscom",
    shortName: "NEXCC",
    startDate: "2026-01-01",
    endDate: "2026-08-01",
    title: {
      de: "NEXCC – Fullstack-Entwicklung eines internen Tools",
      en: "NEXCC – Fullstack Development of an Internal Tool",
    },
    projectTitle: { de: "NEXCC", en: "NEXCC" },
    projectSummary: {
      de: "Im NEXCC-Team arbeitete ich an der Weiterentwicklung einer firmeninternen Anwendung und war sowohl im Frontend als auch im Backend tätig. Dabei arbeitete ich mit Vue.js, Java, Spring Boot, REST APIs und Datenbanken.",
      en: "In the NEXCC team, I contributed to the continued development of an internal application and worked across both frontend and backend development. I worked with Vue.js, Java, Spring Boot, REST APIs and databases.",
    },
    experienceFocus: {
      de: "Frontend & Backend Development",
      en: "Frontend & Backend Development",
    },
    description: [
      {
        de: "Im Rahmen dieses Projekts arbeitete ich in einem Team an der Weiterentwicklung eines firmeninternen Tools. Dabei war ich sowohl in der Frontend- als auch in der Backend-Entwicklung tätig.",
        en: "As part of this project, I worked in a team on the continued development of an internal company tool. I contributed to both frontend and backend development.",
      },
      {
        de: "Für das Frontend verwendete ich Vue.js und die Swisscom SDX Library. Das Backend wurde mit Java und Spring Boot umgesetzt. Dabei sammelte ich praktische Erfahrung in der Entwicklung und Integration moderner Webanwendungen.",
        en: "The frontend was built using Vue.js and the Swisscom SDX Library, while the backend was implemented with Java and Spring Boot. Through this work, I gained practical experience in developing and integrating modern web applications.",
      },
    ],
    workModel: { de: "Hybrid", en: "Hybrid" },
    technologies: [
      "Vue.js",
      "Java",
      "Spring Boot",
      "SDX",
      "REST APIs",
      "SQL",
      "Git",
    ],
    projectTechnologies: [
      "Vue.js",
      "Java",
      "Spring Boot",
      "SQL",
      "REST APIs",
      "Git",
      "SDX",
      "i18n",
    ],
  },
  {
    id: "team-minion",
    organization: "Swisscom",
    shortName: "Team Minion",
    startDate: "2025-08-01",
    endDate: "2026-01-01",
    title: {
      de: "Team Minion – Swisscom Onboarding-Projekt",
      en: "Team Minion – Swisscom Onboarding Project",
    },
    projectTitle: { de: "Team Minion", en: "Team Minion" },
    projectSummary: {
      de: "Mein Onboarding-Projekt zu Beginn meiner Ausbildung bei Swisscom. Dabei lernte ich wichtige Grundlagen der Software- und Webentwicklung kennen und entwickelte erste eigene Anwendungen.",
      en: "My onboarding project at the beginning of my apprenticeship at Swisscom. During this placement, I learned important software and web development fundamentals and built my first applications.",
    },
    experienceFocus: {
      de: "Software Development Onboarding",
      en: "Software Development Onboarding",
    },
    description: [
      {
        de: "Dieses Onboarding-Projekt absolvierte ich zu Beginn meiner Ausbildung bei Swisscom. Dabei lernte ich wichtige Grundlagen der Informatik und der Webentwicklung kennen.",
        en: "I completed this onboarding project at the beginning of my apprenticeship at Swisscom. During this period, I learned important fundamentals of computer science and web development.",
      },
      {
        de: "Ich sammelte erste praktische Erfahrungen mit HTML, CSS, JavaScript, React, Git und der Swisscom Design Library SDX. Das Projekt half mir dabei, ein solides technisches Grundverständnis aufzubauen und erste eigene Anwendungen zu entwickeln.",
        en: "I gained my first practical experience with HTML, CSS, JavaScript, React, Git and the Swisscom SDX Design Library. The project helped me build a solid technical foundation and develop my first applications.",
      },
    ],
    workModel: { de: "Vor Ort", en: "On-site" },
    technologies: ["HTML", "CSS", "JavaScript", "React", "Git", "SDX"],
    projectTechnologies: ["HTML", "CSS", "JavaScript", "React", "Git", "SDX"],
  },
] satisfies Experience[];