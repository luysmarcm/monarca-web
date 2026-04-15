import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";

const intlMiddleware = createMiddleware({
  localePrefix,
  locales,
  pathnames
});

// 🧠 Memoria efímera en el Edge
const rateLimitMap = new Map();

export default function middleware(req) {
  const url = req.nextUrl.pathname;
  
  // 1. Omitir archivos internos de Next.js inmediatamente para ahorrar recursos
  if (url.startsWith('/_next') || url.includes('/favicon.ico')) {
    return intlMiddleware(req);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || "unknown";
  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  const resourceType = req.headers.get("sec-fetch-dest");
  const destination = req.headers.get("sec-fetch-site");

  // =========================
  // 🛡️ Protección contra Hotlinking (Evita que usen tus archivos en otras webs)
  // =========================
  if (destination === "cross-site" && (resourceType === "image" || resourceType === "video")) {
    return new Response("No hotlinking allowed", { status: 403 });
  }

  // =========================
  // ✅ Bots permitidos (SEO y Vercel)
  // =========================
  const allowedBots = ["googlebot", "bingbot", "vercel", "google-inspectiontool"];
  if (allowedBots.some(bot => ua.includes(bot))) {
    return intlMiddleware(req);
  }

  // =========================
  // 🚫 Bots bloqueados (Filtro por User-Agent)
  // =========================
  const blockedPatterns = ["bot", "crawl", "spider", "scrapy", "curl", "wget", "python", "axios", "node-fetch", "postman"];
  if (blockedPatterns.some(p => ua.includes(p))) {
    return new Response("Blocked (bot)", { status: 403 });
  }

  // =========================
  // ⚡ Rate limiting por IP (Ventana de 10s)
  // =========================
  const now = Date.now();
  const windowMs = 10 * 1000;
  const maxRequests = 20;

  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);
  const timestamps = rateLimitMap.get(ip);
  const recent = timestamps.filter(ts => now - ts < windowMs);
  recent.push(now);
  rateLimitMap.set(ip, recent);

  if (recent.length > maxRequests) {
    return new Response("Too many requests", { status: 429 });
  }

  // =========================
  // 🧱 Rutas de ataque comunes
  // =========================
  const suspiciousPaths = ["/wp-admin", "/xmlrpc.php", "/.env", "/config", "/admin"];
  if (suspiciousPaths.some(p => url.includes(p))) {
    return new Response("Blocked (suspicious)", { status: 403 });
  }

  return intlMiddleware(req);
}

export const config = {
  // El matcher ahora captura TODO excepto archivos de sistema de Next.js
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};