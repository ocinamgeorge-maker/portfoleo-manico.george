import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LANGUAGE_HEADER = "x-portfolio-language";

export function proxy(request: NextRequest) {
  const queryLanguage = request.nextUrl.searchParams.get("lang");

  if (queryLanguage !== null && queryLanguage !== "en") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.searchParams.delete("lang");
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const language = queryLanguage === "en" ? "en" : "de";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANGUAGE_HEADER, language);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Content-Language", language === "de" ? "de-CH" : "en");

  return response;
}

export const config = {
  matcher: "/",
};
