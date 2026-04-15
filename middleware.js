import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";

const intlMiddleware = createMiddleware({
  localePrefix,
  locales,
  pathnames
});

export default function middleware(req) {
  const ua = req.headers.get('user-agent') || '';

  const allowedBots = ['googlebot', 'bingbot'];
  const isAllowed = allowedBots.some(b => ua.toLowerCase().includes(b));

  const blockedBots = [
    'bot',
    'crawl',
    'spider',
    'curl',
    'wget',
    'python',
    'axios'
  ];

  const isBlocked = blockedBots.some(b => ua.toLowerCase().includes(b));

  // 🚫 Bloquear bots
  if (isBlocked && !isAllowed) {
    return new Response('Blocked', { status: 403 });
  }

  // ✅ continuar con next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};