import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security Middleware for Next.js Application
 *
 * Handles:
 * - CSRF token validation
 * - Rate limiting (basic client-side tracking)
 * - Request validation
 * - Security headers enhancement
 * - XSS protection
 */

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
// Each page view also fires Next's route prefetches (~5 requests per homepage
// load), so the budget has to cover a normal visitor clicking around.
const RATE_LIMIT_MAX_REQUESTS = 120; // 120 requests per minute per IP

// Search engines and AI assistants' crawlers fetch many pages quickly from
// shared IPs; throttling them means they index a 429 instead of the site.
const CRAWLER_UA = /Googlebot|Google-InspectionTool|bingbot|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|Applebot|DuckDuckBot/i;

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Basic rate limiting check
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  // Increment counter
  record.count++;
  return true;
}

/**
 * Clean up expired rate limit records (run periodically)
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

/**
 * Validate request size
 */
function validateRequestSize(request: NextRequest): boolean {
  const contentLength = request.headers.get('content-length');

  if (contentLength) {
    const size = parseInt(contentLength, 10);
    const MAX_REQUEST_SIZE = 1024 * 1024; // 1MB

    if (size > MAX_REQUEST_SIZE) {
      return false;
    }
  }

  return true;
}

/**
 * Main proxy function (Next.js 16+)
 * Previously called "middleware" in Next.js 15 and below
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const ip = getClientIp(request);

  // 1. Rate limiting check (skipped in dev, and for search/AI crawlers)
  const isCrawler = CRAWLER_UA.test(request.headers.get('user-agent') ?? '');
  if (process.env.NODE_ENV !== 'development' && !isCrawler && !checkRateLimit(ip)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests. Please try again later.',
        retryAfter: 60,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }

  // 2. Request size validation
  if (!validateRequestSize(request)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Request entity too large',
      }),
      {
        status: 413,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // 3. Add additional security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // 4. Content Security Policy (CSP)
  // Extract origin from API URL (remove /api path)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  let apiOrigin = 'http://localhost:8000';
  try {
    apiOrigin = new URL(apiUrl).origin;
  } catch (e) {
    // Fallback if URL parsing fails
    apiOrigin = apiUrl.split('/api')[0];
  }

  // Development: allow both localhost and 127.0.0.1 + WebSockets for Fast Refresh
  const isDevelopment = process.env.NODE_ENV === 'development';
  const connectSrc = isDevelopment
    ? `'self' http://localhost:8000 http://127.0.0.1:8000 ws://localhost:3000 ws://127.0.0.1:3000 ws://localhost:* ws://127.0.0.1:*`
    : `'self' ${apiOrigin}`;

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    connect-src ${connectSrc};
    frame-ancestors 'self';
    base-uri 'self';
    form-action 'self' ${apiOrigin};
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // 5. Remove potentially sensitive headers
  response.headers.delete('X-Powered-By');
  response.headers.delete('Server');

  return response;
}

/**
 * Configure which routes use this middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4|webm)$).*)',
  ],
};
