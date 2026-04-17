import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";

const intlMiddleware = createMiddleware({
  localePrefix,
  locales,
  pathnames
});

const rateLimitMap = new Map();

export default function middleware(req) {
  const url = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams.toString();
  
  // 1. Bloqueo inmediato de Query Params (Frena el 1.2M de ISR Writes)
  // Si tu landing no usa filtros o búsquedas, esto es vital.
  if (searchParams.length > 0) {
    return new Response("Query parameters not allowed", { status: 403 });
  }

  // 2. Omitir archivos internos de Next.js
  if (url.startsWith('/_next') || url.includes('/favicon.ico')) {
    return intlMiddleware(req);
  }

  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || "unknown";

  // 3. Bloqueo de Bots por User-Agent (Antes de cualquier otra lógica)
  const blockedPatterns = ["bot", "crawl", "spider", "scrapy", "curl", "wget", "python", "axios", "node-fetch", "postman", "headless"];
  if (blockedPatterns.some(p => ua.includes(p))) {
    // Excepción para bots buenos
    const allowedBots = ["googlebot", "bingbot", "vercel", "google-inspectiontool"];
    if (!allowedBots.some(bot => ua.includes(bot))) {
      return new Response("Blocked (bot)", { status: 403 });
    }
  }

  // 4. Rate limiting más estricto (Reducido a 10 requests por 10s)
  const now = Date.now();
  const windowMs = 10 * 1000;
  const maxRequests = 10; 

  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);
  const timestamps = rateLimitMap.get(ip);
  const recent = timestamps.filter(ts => now - ts < windowMs);
  recent.push(now);
  rateLimitMap.set(ip, recent);

  if (recent.length > maxRequests) {
    return new Response("Too many requests", { status: 429 });
  }

  // 5. Hotlinking y rutas sospechosas
  const destination = req.headers.get("sec-fetch-site");
  const resourceType = req.headers.get("sec-fetch-dest");
  if (destination === "cross-site" && (resourceType === "image" || resourceType === "video")) {
    return new Response("No hotlinking", { status: 403 });
  }

  const suspiciousPaths = ["/wp-admin", "/xmlrpc.php", "/.env", "/config", "/admin", "/login"];
  if (suspiciousPaths.some(p => url.includes(p))) {
    return new Response("Blocked", { status: 403 });
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};