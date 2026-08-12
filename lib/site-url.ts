const LOCAL_SITE_URL = "http://localhost:3000";
const PLACEHOLDER_HOSTS = new Set(["example.com", "www.example.com"]);

function parseSiteUrl(value: string | undefined): URL | null {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    url.hash = "";
    url.search = "";
    return url;
  } catch {
    return null;
  }
}

function isLocalOrPlaceholder(url: URL): boolean {
  return (
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    PLACEHOLDER_HOSTS.has(url.hostname)
  );
}

export function getSiteUrl(): URL {
  const configuredUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const vercelProductionUrl = parseSiteUrl(
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  );
  const vercelDeploymentUrl =
    process.env.VERCEL_ENV === "production"
      ? parseSiteUrl(process.env.VERCEL_URL)
      : null;

  if (configuredUrl && !isLocalOrPlaceholder(configuredUrl)) {
    return configuredUrl;
  }

  if (vercelProductionUrl) {
    return vercelProductionUrl;
  }

  if (vercelDeploymentUrl) {
    return vercelDeploymentUrl;
  }

  return configuredUrl ?? new URL(LOCAL_SITE_URL);
}

export function isIndexableDeployment(): boolean {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }

  const configuredUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  return (
    process.env.NODE_ENV === "production" &&
    configuredUrl !== null &&
    !isLocalOrPlaceholder(configuredUrl)
  );
}
