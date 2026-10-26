import { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt generator
 * This overrides the static robots.txt in public folder
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://averon.agency'

  return {
    rules: [
      {
        // Allow all search engines. /_next/ stays crawlable: it holds the
        // CSS/JS crawlers need to render the page the way visitors see it.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        // Specific rules for Googlebot
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // AI assistants' search and answer crawlers: explicitly welcome, so
        // ChatGPT, Claude, Perplexity, Gemini, Copilot and Apple can cite us.
        userAgent: [
          'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
          'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
          'PerplexityBot', 'Perplexity-User',
          'Google-Extended', 'Bingbot', 'Applebot', 'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        // Allow Google Image bot
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // Block aggressive SEO crawlers that waste bandwidth
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'BLEXBot'],
        disallow: '/',
      },
      {
        // Block content scrapers
        userAgent: ['SiteSnagger', 'WebCopier', 'WebStripper', 'HTTrack'],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
