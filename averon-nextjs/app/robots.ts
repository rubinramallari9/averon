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
        // Allow all search engines
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        // Specific rules for Googlebot
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
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
