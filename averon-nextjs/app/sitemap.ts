import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generator for Next.js App Router
 * Automatically generates sitemap.xml at /sitemap.xml
 * Google will crawl this automatically
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://averon.agency'
  const currentDate = new Date()

  return [
    // Homepage - Highest Priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Our Work Page - High Priority
    {
      url: `${baseUrl}/our-work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Future pages - Uncomment as you create them:

    // Service Pages
    // {
    //   url: `${baseUrl}/services`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/web-development`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/seo`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/website-redesign`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },

    // Blog
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: currentDate,
    //   changeFrequency: 'daily',
    //   priority: 0.7,
    // },

    // FAQ
    // {
    //   url: `${baseUrl}/faq`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },

    // About
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },

    // Contact
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: currentDate,
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
  ]
}

/**
 * How to add dynamic content (e.g., blog posts):
 *
 * 1. Fetch your dynamic data:
 *    const posts = await fetch('your-api').then(res => res.json())
 *
 * 2. Map to sitemap format:
 *    const postUrls = posts.map((post) => ({
 *      url: `${baseUrl}/blog/${post.slug}`,
 *      lastModified: new Date(post.updatedAt),
 *      changeFrequency: 'monthly' as const,
 *      priority: 0.6,
 *    }))
 *
 * 3. Add to return array:
 *    return [...staticUrls, ...postUrls]
 */
