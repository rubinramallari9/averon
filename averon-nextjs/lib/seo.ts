// SEO Configuration and Schema Markup for Averon Digital
import { Metadata } from 'next';

// Base URL configuration
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://averon.agency';

// Default SEO configuration
export const defaultSEO: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Averon | Agjencia #1 e AI Automatizimit & Web Development në Shqipëri',
    template: '%s | Averon Digital',
  },
  description: 'Averon është agjencia e parë në Shqipëri që ofron automatizim biznesi me AI — Instagram DM Bot, Avox AI Voice Receptionist, WhatsApp Bot — dhe ndërtim faqesh interneti profesionale. First AI automation agency in Albania. Web development, AI chatbots, and voice AI for Albanian businesses.',
  keywords: [
    // AI automation - Albanian (primary new focus)
    'automatizim biznesi shqiperi',
    'AI automatizim shqiperi',
    'bot instagram shqiperi',
    'chatbot whatsapp shqiperi',
    'receptionist AI shqiperi',
    'asistent virtual AI shqiperi',
    'automatizim mesazhesh instagram',
    'bot whatsapp per biznes',
    'AI voice assistant shqiperi',
    'automatizim klientesh shqiperi',
    'agjensi automatizimi shqiperi',
    'agjenci AI shqiperi',
    'inteligjence artificiale biznes shqiperi',
    'bot per biznes shqiperi',
    'AI chatbot tirane',
    // AI automation - English
    'AI automation albania',
    'instagram dm bot albania',
    'whatsapp bot albania',
    'ai voice receptionist albania',
    'ai chatbot albania',
    'business automation albania',
    'ai automation agency albania',
    'first ai agency albania',
    'voice ai albania',
    'automated customer service albania',
    'instagram automation albania',
    'whatsapp automation albania',
    'ai receptionist albania',
    'avox voice ai',
    'chatbot tirana',
    // Web development - English
    'web development albania',
    'web design tirana',
    'web agency albania',
    'next js albania',
    'react development albania',
    'website development tirana',
    'ecommerce development albania',
    'SEO optimization albania',
    'digital agency tirana',
    'custom website albania',
    'web developer tirana',
    'software development albania',
    'responsive web design',
    'modern website design',
    // Albanian keywords - web
    'agjensi web',
    'agjensi digjitale',
    'krijimi faqesh interneti',
    'dizajn web shqiperi',
    'zhvillim web tirane',
    'faqe interneti profesionale',
    'optimizim SEO shqip',
    'e-commerce shqiperi',
    'zhvillim software',
    // Albanian keywords - business-focused
    'krijim faqe interneti per biznes',
    'faqe interneti per kompani shqiperi',
    'sisteme digjitale per biznes',
    'digitalizim biznesi shqiperi',
    'zgjidhje digjitale per biznese',
    'transformim digjital shqiperi',
    'faqe interneti profesionale tirane',
    'software per biznese shqiperi',
    // English - business-focused
    'digital systems albania',
    'business website albania',
    'website for albanian business',
    'digital transformation albania',
    'business software albania',
    'online business solutions albania',
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
    alternateLocale: ['sq_AL'],
    url: baseUrl,
    siteName: 'Averon Digital',
    title: 'Averon | Albania\'s First AI Automation & Web Development Agency',
    description: 'The first agency in Albania offering AI-powered business automations — Instagram DM Bot, Avox AI Voice Receptionist, WhatsApp Bot — plus professional web development. Never miss a customer again.',
    countryName: 'Albania',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Averon | AI Automation & Web Development — Albania #1',
    description: 'Albania\'s first AI automation agency. Instagram bots, AI voice receptionist (Avox), WhatsApp bots + professional websites.',
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
    google: 'QN9a17gsvN_DBDSB7hniWRUx68iG5bx5DivlIzXkptE',
  },
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${baseUrl}/#organization`,
  name: 'Averon Digital',
  alternateName: ['Averon', 'Averon Albania', 'Averon AI', 'Averon Agency Albania'],
  legalName: 'Averon Digital Agency',
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/averon_logobg.png`,
    width: 400,
    height: 100,
  },
  image: `${baseUrl}/averon_logobg.png`,
  description: 'Albania\'s first AI automation agency. We build Instagram DM bots, WhatsApp bots, and Avox — an AI voice receptionist that speaks Albanian and English. We also build professional websites for Albanian businesses.',
  slogan: 'Albania\'s first AI automation agency — websites and automations that never sleep',
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
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+355-69-123-4567',
      contactType: 'customer service',
      email: 'averonagencyal@gmail.com',
      areaServed: ['AL', 'XK', 'MK', 'ME', 'RS'],
      availableLanguage: ['Albanian', 'English'],
      contactOption: 'TollFree',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'averonagencyal@gmail.com',
      availableLanguage: ['Albanian', 'English'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/averonagency/',
  ],
  foundingDate: '2024',
  foundingLocation: 'Tirana, Albania',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 5,
  },
  areaServed: [
    { '@type': 'Country', name: 'Albania' },
    { '@type': 'Country', name: 'Kosovo' },
    { '@type': 'Country', name: 'North Macedonia' },
  ],
  knowsAbout: [
    'AI Automation',
    'Business Automation',
    'Instagram DM Bot',
    'WhatsApp Bot',
    'AI Voice Receptionist',
    'Avox Voice AI',
    'Web Development',
    'Next.js',
    'React',
    'Django',
    'SEO Optimization',
    'E-commerce Development',
    'Mobile-Responsive Design',
    'Brand Design',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Automation & Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Avox — AI Voice Receptionist',
          description: 'AI-powered voice receptionist that answers calls 24/7 in Albanian and English, books appointments, and handles FAQs. First of its kind in Albania.',
          serviceType: 'AI Automation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Instagram DM Bot',
          description: 'Automated Instagram DM and comment replies, lead capture, and product catalog delivery for Albanian businesses.',
          serviceType: 'AI Automation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'WhatsApp Bot',
          description: 'Automated WhatsApp customer service, order management, and broadcast promotions for Albanian businesses.',
          serviceType: 'AI Automation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Website Development',
          serviceType: 'Web Development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Optimization',
          serviceType: 'SEO',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Redesign',
          serviceType: 'Redesign',
        },
      },
    ],
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

// Service Schema — expanded for AI automations
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Automation and Web Development',
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
    name: 'AI Automation & Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Avox AI Voice Receptionist',
          description: 'AI-powered voice receptionist answering calls 24/7 in Albanian and English. Books appointments, handles FAQs, and routes urgent calls.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Instagram DM Bot',
          description: 'Automated Instagram DM replies, lead capture, and product catalog delivery for Albanian businesses.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'WhatsApp Bot',
          description: 'Automated WhatsApp customer service and order management for Albanian businesses.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Website Development',
          description: 'Bespoke website development using Next.js and React for Albanian businesses.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Optimization',
          description: 'Search engine optimization for Albanian businesses.',
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

// FAQ Schema — expanded with AI automation questions
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Avox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avox is Averon\'s AI voice receptionist — Albania\'s first AI-powered phone assistant that answers calls 24/7 in Albanian and English, books appointments, handles FAQs, and routes urgent calls to you automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Averon offer AI automation services in Albania?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Averon is the first agency in Albania to offer AI-powered business automations, including an Instagram DM Bot, WhatsApp Bot, and Avox — an AI voice receptionist that speaks Albanian and English. These automations handle customer interactions 24/7 so businesses never miss a lead.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI automation services does Averon offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Averon offers three core AI automations: (1) Avox — an AI voice receptionist answering calls 24/7 in Albanian and English; (2) Instagram DM Bot — auto-replies to DMs and comments, captures leads, and sends product catalogs; (3) WhatsApp Bot — handles customer service, orders, and promotions on WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'A mund të automatizoj biznesin tim me AI në Shqipëri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Po! Averon është agjencia e parë në Shqipëri që ofron automatizim biznesi me inteligjencë artificiale. Ofrojmë Avox (receptionist AI që i përgjigjet telefonatave 24/7 në shqip dhe anglisht), Instagram DM Bot, dhe WhatsApp Bot — të gjitha të projektuara posaçërisht për bizneset shqiptare.',
      },
    },
    {
      '@type': 'Question',
      name: 'Çfarë është Avox dhe si ndihmon biznesin tim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avox është receptionist virtual me AI i ndërtuar nga Averon — i pari në Shqipëri. Ai i përgjigjet telefonatave 24/7 në shqip dhe anglisht, rezervon takime automatikisht, u jep përgjigje pyetjeve të zakonshme dhe i dërgon thirrjet urgjente tek ju. Biznesi juaj nuk humb asnjë klient, as natën.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does Averon offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Averon offers AI business automations (Instagram DM Bot, WhatsApp Bot, Avox AI Voice Receptionist) and web services (custom web development, e-commerce, website redesign, SEO optimization, and brand design). We are Albania\'s first AI automation agency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Averon located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Averon is based in Tirana, Albania, and serves businesses throughout Albania, Kosovo, and the region.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sa kushton krijimi i një faqe interneti për biznesin tim në Shqipëri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Çmimi i një faqe interneti profesionale varion në bazë të kompleksitetit. Averon ofron paketa të personalizuara për biznese të çdo madhësie në Shqipëri. Na kontaktoni për një ofertë falas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Si mund ta gjejnë klientët biznesin tim online në Shqipëri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Averon ndërton faqe interneti me SEO të optimizuar për tregun shqiptar dhe ofron automatizime AI që i mbajnë klientët të angazhuar 24/7 — duke siguruar që biznesi juaj të shfaqet dhe të përgjigjet gjithmonë.',
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
