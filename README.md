# Manico George – Portfolio

Eine responsive, zweisprachige One-Page-Portfolio-Website für Manico George. Die Anwendung basiert auf dem Next.js App Router, ist für Vercel vorbereitet und legt den Schwerpunkt auf gute Performance, Zugänglichkeit und eine wartbare Datenstruktur.

## Funktionen

- Deutsch und Englisch mit persistentem Sprachumschalter
- Serverseitig gerenderte Portfolio-Inhalte
- Dynamisch berechnetes Alter aus dem Geburtsdatum
- Responsive, reduzierte Textnavigation
- Datengesteuerte Projekt- und Experience-Reihen
- Textbasierte Skills ohne Karten oder Badges
- Dezente GSAP-Animationen mit `prefers-reduced-motion`-Unterstützung
- Direkte Kontaktlinks ohne Kontaktformular oder Tracking
- Next.js Metadata API, Open Graph, Twitter Cards, Canonical und `hreflang`
- Schema.org `WebSite`, `ProfilePage` und `Person`, `robots.txt` und `sitemap.xml`
- Optionaler, standardmässig deaktivierter CV-Download

## Technischer Stack

### Laufzeitpakete

- `next` – App Router, Server Rendering, Metadata API und Bildoptimierung
- `react` und `react-dom` – Benutzeroberfläche
- `gsap` – dezente Intro- und Scroll-Reveals

### Entwicklungsabhängigkeiten

- `typescript`
- `tailwindcss`
- `@tailwindcss/postcss`
- `eslint`
- `eslint-config-next`
- `@types/node`
- `@types/react`
- `@types/react-dom`

Die vollständigen Versionen stehen in `package.json` und `package-lock.json`.

## Voraussetzungen

- Node.js 20.9 oder neuer
- npm 10 oder neuer

## Lokale Installation

1. Abhängigkeiten installieren:

	 ```powershell
	 npm install
	 ```

2. Lokale Umgebungsdatei erstellen:

	 ```powershell
	 Copy-Item .env.example .env.local
	 ```

3. Entwicklungsserver starten:

	 ```powershell
	 npm run dev
	 ```

4. Im Browser `http://localhost:3000` öffnen.

## Verfügbare Befehle

```powershell
npm run dev        # Entwicklungsserver
npm run lint       # ESLint-Prüfung
npm run typecheck  # TypeScript-Prüfung ohne Ausgabe
npm run build      # Optimierter Produktions-Build
npm run start      # Produktions-Build lokal starten
npm run check      # ESLint, TypeScript und Build nacheinander
```

## Umgebungsvariable und Domain

`NEXT_PUBLIC_SITE_URL` bestimmt die Basis-URL für Canonical-, Open-Graph-, Sitemap- und Robots-Daten.

Lokal gilt ohne Konfiguration automatisch:

```text
http://localhost:3000
```

Für die veröffentlichte Website in `.env.local` und in Vercel die echte HTTPS-Domain ohne abschliessenden Slash setzen:

```dotenv
NEXT_PUBLIC_SITE_URL=https://portfolio.example.com
```

Auf Vercel dienen `VERCEL_PROJECT_PRODUCTION_URL` und bei Production-Deployments `VERCEL_URL` als sichere Fallbacks. Preview-URLs werden nicht als Canonical verwendet. Lokal fällt die Anwendung auf `http://localhost:3000` zurück.

## SEO

Die SEO-Konfiguration basiert ausschliesslich auf den Inhalten in `data/profile.ts`, `data/experience.ts`, `data/skills.ts` und `data/translations.ts`:

- Sprachabhängige Titles und Descriptions über die Next.js Metadata API
- Zentrale Keywords, Autorenangaben und Site-Daten in `lib/seo.ts`
- Canonical URLs und Sprachalternativen für `/` sowie `/?lang=en`
- Dynamisches Open-Graph-Bild unter `app/opengraph-image.tsx`
- Twitter Large Image Card ohne erfundenen Accountnamen
- JSON-LD-Graph mit `WebSite`, `ProfilePage` und `Person`
- `robots.txt` mit `noindex`/`disallow` für lokale und Vercel-Preview-Deployments
- Lokalisierte `sitemap.xml` inklusive Portrait als Bild-URL
- Web App Manifest und vorhandenes App-Router-Favicon

Für Production muss `NEXT_PUBLIC_SITE_URL` in Vercel auf die finale HTTPS-Domain gesetzt werden. Anschliessend sollten Domain und Sitemap in der Google Search Console registriert und das JSON-LD mit dem Schema Markup Validator geprüft werden.

Empfohlene spätere SEO-Verbesserung: echte Locale-Routen wie `/de` und `/en` statt Query-Parametern verwenden. Die bestehende Routing-Struktur bleibt aktuell bewusst bei `/` und `/?lang=en`.

## Profilbild austauschen

Der mitgelieferte JPEG-Platzhalter liegt unter:

```text
public/images/manico-george.jpg
```

Die Datei durch das echte Portrait mit demselben Namen ersetzen. Empfohlen sind ein hochwertiger 4:5-Crop und mindestens 1200 × 1500 Pixel. `next/image` übernimmt die responsive Optimierung.

## Lebenslauf aktivieren

1. Den finalen Lebenslauf hier ablegen:

	 ```text
	 public/documents/manico-george-cv.pdf
	 ```

2. In `data/profile.ts` den Schalter ändern:

	 ```ts
	 showCvButton: true,
	 ```

Solange der Schalter `false` ist, wird kein Download-Button gerendert. Es ist absichtlich keine Platzhalter-PDF enthalten.

## Sprache und Übersetzungen

Alle Texte befinden sich in `data/translations.ts`. Der Umschalter speichert `de` oder `en` unter `manico-portfolio-language` in `localStorage`. Deutsch wird unter `/`, Englisch unter `/?lang=en` ausgeliefert.

Pro URL wird nur die aktive Sprache serverseitig gerendert. `proxy.ts` setzt dazu `lang` und `Content-Language`, während der Sprachumschalter über den Next.js Router navigiert. Dadurch bleiben sichtbarer Inhalt, Canonical, Open Graph und JSON-LD synchron.

## Neue Projekte oder Stationen ergänzen

Neue Einträge werden oben oder an der passenden chronologischen Position in `data/experience.ts` ergänzt:

```ts
{
	id: "eindeutige-id",
	organization: "Swisscom",
	shortName: "Projektname",
	startDate: "2027-01-01",
	endDate: "2027-06-01",
	current: false,
	title: {
		de: "Deutscher Titel",
		en: "English title",
	},
	projectTitle: {
		de: "Kurzer Projekttitel",
		en: "Short project title",
	},
	projectSummary: {
		de: "Kurze, veröffentlichbare Projektbeschreibung.",
		en: "Short, publishable project description.",
	},
	experienceFocus: {
		de: "Rolle oder Schwerpunkt",
		en: "Role or focus",
	},
	description: [
		{
			de: "Kurze, veröffentlichbare Beschreibung.",
			en: "Short, publishable description.",
		},
	],
	workModel: {
		de: "Hybrid",
		en: "Hybrid",
	},
	technologies: ["TypeScript", "React"],
	projectTechnologies: ["TypeScript", "React"],
}
```

Für eine laufende Station `current: true` setzen und `endDate` weglassen. Keine internen Links, vertraulichen Architekturdaten, Kundendaten, Screenshots oder Quellcodes hinzufügen.

## Skills pflegen

Kategorien und Technologien werden ausschliesslich in `data/skills.ts` verwaltet. Die Darstellung erzeugt keine Prozentwerte oder subjektiven Erfahrungsstufen.

## Deployment auf Vercel

### Über ein Git-Repository

1. Projekt in ein Git-Repository übertragen und zu GitHub, GitLab oder Bitbucket pushen.
2. In Vercel **Add New Project** wählen und das Repository importieren.
3. Framework Preset **Next.js** verwenden. Build- und Output-Einstellungen müssen nicht angepasst werden.
4. Unter **Settings → Environment Variables** `NEXT_PUBLIC_SITE_URL` mit der produktiven HTTPS-Domain hinterlegen.
5. Deploy auslösen. Nach dem ersten Deployment bei einer neu zugewiesenen Domain die Variable aktualisieren und erneut deployen.

### Über die Vercel CLI

```powershell
npx vercel
npx vercel --prod
```

Auch bei diesem Weg `NEXT_PUBLIC_SITE_URL` im Vercel-Projekt setzen. Die Anwendung benötigt keine zusätzliche Serverkonfiguration, Datenbank oder API-Schlüssel.

## Projektstruktur

```text
app/                  Next.js-Routen, Layout, Styles und SEO-Endpunkte
components/layout/    Navigation und Footer
components/sections/  Inhaltliche One-Page-Bereiche
components/ui/        Wiederverwendbare UI- und Animationsbausteine
data/                 Profil, Übersetzungen, Skills und Experience-Daten
lib/                  Typen und Hilfsfunktionen
public/images/        Portrait
public/documents/     Optionaler Lebenslauf
```

## Qualitätsprüfung vor einem Deploy

```powershell
npm run check
```

Zusätzlich sollten beide Sprachen, Tastaturnavigation, Reduced Motion sowie die Ansichten bei 320, 768, 1024 und 1440 Pixel Breite manuell geprüft werden.
