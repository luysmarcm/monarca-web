import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";

const intlMiddleware = createMiddleware({
  localePrefix,
  locales,
  pathnames
});

// 🧠 memoria simple (edge)
const rateLimitMap = new Map();

export default function middleware(req) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.ip ||
    "unknown";

  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  const url = req.nextUrl.pathname;

  // =========================
  // ✅ Bots permitidos
  // =========================
  const allowedBots = [
    "googlebot",
    "bingbot",
    "vercel",
    "google-inspectiontool"
  ];

  if (allowedBots.some(bot => ua.includes(bot))) {
    return intlMiddleware(req);
  }

  // =========================
  // 🚫 Bots bloqueados (UA)
  // =========================
  const blockedPatterns = [
    "bot",
    "crawl",
    "spider",
    "scrapy",
    "curl",
    "wget",
    "python",
    "axios",
    "node-fetch",
    "postman"
  ];

  if (blockedPatterns.some(p => ua.includes(p))) {
    return new Response("Blocked (bot)", { status: 403 });
  }

  // =========================
  // ⚡ Rate limiting por IP
  // =========================
  const now = Date.now();
  const windowMs = 10 * 1000; // 10 segundos
  const maxRequests = 20; // máximo requests por ventana

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip);

  // limpiar timestamps viejos
  const recent = timestamps.filter(ts => now - ts < windowMs);
  recent.push(now);
  rateLimitMap.set(ip, recent);

  if (recent.length > maxRequests) {
    return new Response("Too many requests", { status: 429 });
  }

  // =========================
  // 🧱 Protección rutas sospechosas
  // =========================
  const suspiciousPaths = [
    "/wp-admin",
    "/xmlrpc.php",
    "/.env",
    "/config",
    "/admin"
  ];

  if (suspiciousPaths.some(p => url.includes(p))) {
    return new Response("Blocked (suspicious)", { status: 403 });
  }

  // =========================
  // ✅ continuar normal
  // =========================
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};