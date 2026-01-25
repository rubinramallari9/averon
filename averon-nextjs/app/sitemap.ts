import { MetadataRoute } from 'next'

/**
 * Enhanced Sitemap Generator for Averon Digital
 * Optimized for maximum SEO visibility
 */

const baseUrl = 'https://averon.agency'

// Get current date in ISO format for lastModified
const currentDate = new Date().toISOString()

// Portfolio/Work projects - uncomment and use when you create detail pages
// const portfolioProjects = [
//   { slug: 'luxury-watch-ecommerce', name: 'Luxury Watch E-commerce' },
//   { slug: 'real-estate-platform', name: 'Real Estate Platform' },
//   { slug: 'restaurant-website', name: 'Restaurant Website' },
//   { slug: 'jewelry-store', name: 'Jewelry Store' },
//   { slug: 'car-dealership', name: 'Car Dealership' },
//   { slug: 'construction-company', name: 'Construction Company' },
//   { slug: 'computer-store', name: 'Computer Store' },
//   { slug: 'cigars-wine-shop', name: 'Cigars & Wine Shop' },
// ]

// Services offered - uncomment and use when you create service pages
// const services = [
//   { slug: 'web-development', name: 'Web Development' },
//   { slug: 'ecommerce-development', name: 'E-commerce Development' },
//   { slug: 'seo-optimization', name: 'SEO Optimization' },
//   { slug: 'website-redesign', name: 'Website Redesign' },
//   { slug: 'brand-design', name: 'Brand Design' },
//   { slug: 'mobile-app-development', name: 'Mobile App Development' },
// ]

export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages - highest priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/our-work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Section anchors - help Google understand page structure
  const sectionPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/#services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#process`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#features`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // Future service pages - uncomment when you create these pages
  // const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
  //   url: `${baseUrl}/services/${service.slug}`,
  //   lastModified: currentDate,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.8,
  // }))

  // Future portfolio detail pages - uncomment when you create these pages
  // const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
  //   url: `${baseUrl}/our-work/${project.slug}`,
  //   lastModified: currentDate,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }))

  // Future pages - add these when you create them:
  // { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
  // { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.8 },
  // { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
  // { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
  // { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
  // { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },

  return [
    ...corePages,
    ...sectionPages,
    // ...servicePages,      // Uncomment when service pages exist
    // ...portfolioPages,    // Uncomment when portfolio detail pages exist
  ]
}

/**
 * SITEMAP BEST PRACTICES:
 *
 * 1. Priority Guidelines:
 *    - 1.0: Homepage only
 *    - 0.9: Key conversion pages (contact, main services)
 *    - 0.8: Important content pages (services, portfolio)
 *    - 0.7: Secondary content (blog posts, about)
 *    - 0.5: Standard pages
 *    - 0.3: Legal pages (privacy, terms)
 *
 * 2. Change Frequency:
 *    - 'daily': Blog, news
 *    - 'weekly': Portfolio, homepage
 *    - 'monthly': Services, about
 *    - 'yearly': Legal pages, contact info
 *
 * 3. To add blog posts dynamically:
 *
 *    async function getBlogPosts() {
 *      const posts = await fetch(`${baseUrl}/api/posts`).then(r => r.json())
 *      return posts.map((post) => ({
 *        url: `${baseUrl}/blog/${post.slug}`,
 *        lastModified: new Date(post.updatedAt),
 *        changeFrequency: 'monthly' as const,
 *        priority: 0.6,
 *      }))
 *    }
 *
 * 4. For images sitemap, create app/sitemap-images.ts
 */
