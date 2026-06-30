/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy — restricts where resources may load from.
// Notes:
//  - 'unsafe-inline' for style/script: the UI uses inline styles throughout and
//    Next.js injects inline hydration scripts. This site renders NO user input
//    (fully static, no dangerouslySetInnerHTML / no server data), so the XSS
//    surface is effectively zero. Upgrade path = nonce-based CSP via middleware.
//  - 'unsafe-eval' (dev only): the Next.js dev server / Turbopack and React
//    Server Components rely on eval() for HMR and callstack reconstruction.
//    It is omitted from production builds to keep the policy strict.
//  - Google Fonts is the only third-party origin (styles + font files).
const ContentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  // Force HTTPS for 2 years (incl. subdomains); eligible for browser preload list.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Clickjacking protection (legacy + modern via CSP frame-ancestors).
  { key: "X-Frame-Options", value: "DENY" },
  // Stop MIME-type sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak full URLs to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deny powerful browser features this site never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()" },
  // Cross-origin isolation hardening.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig = {
  reactStrictMode: true,
  // Remove the "X-Powered-By: Next.js" fingerprint header.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
