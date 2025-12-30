// SEO Configuration and Schema Markup for Averon Digital
import { Metadata } from 'next';

// Base URL configuration
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://averon.al';

// Default SEO configuration
export const defaultSEO: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Averon | Web Development Agency in Albania | Next.js & React Experts',
    template: '%s | Averon Digital',
  },
  description: 'Leading web development agency in Tirana, Albania. We build modern, high-performance websites using Next.js, React & Django. Custom web solutions for Albanian businesses.',
  keywords: [
    'web development albania',
    'web design tirana',
    'next js albania',
    'react development',
    'agjensi web',
    'krijimi faqesh interneti',
    'dizajn web shqiperi',
    'django development',
    'ecommerce albania',
    'SEO albania',
  ],
  authors: [{ name: 'Averon Digital', url: baseUrl }],
  creator: 'Averon Digital',
  publisher: 'Averon Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AL',
    url: baseUrl,
    siteName: 'Averon Digital',
    title: 'Averon | Professional Web Development in Albania',
    description: 'Transform your business with cutting-edge web solutions. Next.js, React, Django development by Albania\'s top digital agency.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Averon Digital - Web Development Agency Albania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Averon | Web Development Agency Albania',
    description: 'Modern websites built with Next.js & React for Albanian businesses',
    images: [`${baseUrl}/twitter-image.jpg`],
    creator: '@averondigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Add via Google Search Console
    // yandex: 'your-yandex-verification-code', // Add if targeting Russian/CIS markets
  },
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Averon Digital',
  alternateName: 'Averon Web Agency',
  url: baseUrl,
  logo: `${baseUrl}/averon_logobg.png`,
  description: 'Professional web development agency in Albania specializing in Next.js, React, and Django development',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rruga e Kavajes',
    addressLocality: 'Tirana',
    addressRegion: 'Tirana',
    postalCode: '1001',
    addressCountry: 'AL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.3275,
    longitude: 19.8187,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+355-69-123-4567',
    contactType: 'customer service',
    email: 'averonagencyal@gmail.com',
    areaServed: 'AL',
    availableLanguage: ['Albanian', 'English'],
  },
  sameAs: [
    // Add your actual social media URLs here
    // 'https://www.facebook.com/averondigital',
    // 'https://www.instagram.com/averondigital',
    // 'https://www.linkedin.com/company/averondigital',
    // 'https://twitter.com/averondigital',
  ],
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'Albania',
  },
};

// LocalBusiness Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': baseUrl,
  name: 'Averon Digital Agency',
  image: `${baseUrl}/averon_logobg.png`,
  telephone: '+355-69-123-4567',
  email: 'averonagencyal@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rruga e Kavajes',
    addressLocality: 'Tirana',
    addressRegion: 'Tirana County',
    postalCode: '1001',
    addressCountry: 'AL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.3275,
    longitude: 19.8187,
  },
  url: baseUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '€€€',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '15',
  },
};

// Service Schema
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Development',
  provider: {
    '@type': 'Organization',
    name: 'Averon Digital',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Albania',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Website Development',
          description: 'Bespoke website development using Next.js and React',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Development',
          description: 'Full-featured online stores with payment integration',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Optimization',
          description: 'Search engine optimization for Albanian businesses',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Redesign',
          description: 'Transform outdated websites into modern digital experiences',
        },
      },
    ],
  },
};

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Averon Digital',
  url: baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// FAQ Schema
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Averon offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Averon offers custom web development, e-commerce solutions, website redesign, SEO optimization, and brand design services. We specialize in Next.js, React, and Django development.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Averon located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Averon is based in Tirana, Albania, and serves businesses throughout Albania and internationally.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project timelines vary based on complexity. A standard business website typically takes 2-4 weeks, while complex e-commerce or custom applications may take 6-12 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer support after the website is launched?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We provide lifetime support and updates for all our projects. We are committed to your long-term success.',
      },
    },
  ],
};

// Breadcrumb helper function
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

// Helper to inject schema into page
export function getSchemaScript(...schemas: object[]) {
  return schemas.map((schema) => ({
    type: 'application/ld+json' as const,
    children: JSON.stringify(schema),
  }));
}
