import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "fa"],
  defaultLocale: "en",
});

export default function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
