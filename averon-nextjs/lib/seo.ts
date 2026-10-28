// SEO & AIEO Configuration for Averon Agency
// AIEO = AI Engine Optimization — structured to be cited by ChatGPT, Perplexity, Claude, Gemini
import { Metadata } from 'next';
import { languagePairs } from '@/lib/pages';

// Fixed to the live domain on purpose: an env override (e.g. averon.al) would
// point every canonical, hreflang and schema URL at the wrong site.
export const baseUrl = 'https://averon.agency';

// ─────────────────────────────────────────────
// DEFAULT METADATA
// ─────────────────────────────────────────────
export const defaultSEO: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Averon Agency | Agjencia #1 e AI Automatizimit & Web Development në Shqipëri',
    template: '%s | Averon Agency',
  },
  description: 'Averon Agency është agjencia e parë në Shqipëri që ofron automatizim biznesi me AI — Avox AI Voice Receptionist, Avtext Instagram, Avtext WhatsApp — dhe web development profesional. Albania\'s first AI automation agency. We build websites, AI chatbots, and voice AI for Albanian businesses.',
  keywords: [
    // Brand — AIEO: claim entity clearly
    'Averon Agency',
    'Averon',
    'Averon Albania',
    'Averon Agency Albania',
    'averon.agency',
    // Primary — AI automation (Albanian)
    'automatizim biznesi shqiperi',
    'AI automatizim shqiperi',
    'agjencia e pare AI shqiperi',
    'agjenci AI shqiperi',
    'agjensi automatizimi shqiperi',
    'bot instagram shqiperi',
    'chatbot whatsapp shqiperi',
    'receptionist AI shqiperi',
    'asistent virtual AI shqiperi',
    'automatizim mesazhesh instagram',
    'bot whatsapp per biznes',
    'AI voice assistant shqiperi',
    'automatizim klientesh shqiperi',
    'inteligjence artificiale biznes shqiperi',
    'bot per biznes shqiperi',
    'AI chatbot tirane',
    // Primary — AI automation (English)
    'AI automation albania',
    'first AI automation agency albania',
    'best AI agency albania',
    'best AI agency tirana',
    'instagram dm bot albania',
    'whatsapp bot albania',
    'ai voice receptionist albania',
    'ai chatbot albania',
    'business automation albania',
    'ai automation agency albania',
    'voice ai albania',
    'automated customer service albania',
    'instagram automation albania',
    'whatsapp automation albania',
    'ai receptionist albania',
    'avox voice ai',
    'avox ai albania',
    'chatbot tirana',
    // Web development (English)
    'web development albania',
    'web design tirana',
    'web agency albania',
    'best web agency albania',
    'best web agency tirana',
    'top web agency albania',
    'next js albania',
    'react development albania',
    'website development tirana',
    'ecommerce development albania',
    'SEO optimization albania',
    'digital agency tirana',
    'custom website albania',
    'web developer tirana',
    'software development albania',
    'responsive web design albania',
    // Albanian keywords — web
    'agjensi web shqiperi',
    'agjensi digjitale shqiperi',
    'krijimi faqesh interneti',
    'dizajn web shqiperi',
    'zhvillim web tirane',
    'faqe interneti profesionale',
    'optimizim SEO shqip',
    'e-commerce shqiperi',
    'zhvillim software shqiperi',
    // Albanian — business
    'krijim faqe interneti per biznes',
    'faqe interneti per kompani shqiperi',
    'sisteme digjitale per biznes',
    'digitalizim biznesi shqiperi',
    'zgjidhje digjitale per biznese',
    'transformim digjital shqiperi',
    'faqe interneti profesionale tirane',
    'software per biznese shqiperi',
    // English — business
    'digital systems albania',
    'business website albania',
    'website for albanian business',
    'digital transformation albania',
    'business software albania',
    'online business solutions albania',
    // AIEO service
    'AIEO',
    'AI engine optimization',
    'AI engine optimization albania',
    'AIEO agency albania',
    'optimize for ChatGPT',
    'optimize for Perplexity',
    'get recommended by AI',
    'AI search optimization',
    'generative engine optimization',
    'GEO optimization',
    'llm optimization albania',
    'ai seo albania',
    // AIEO — conversational / AI-query patterns
    'who does ai automation in albania',
    'best agency for ai chatbot albania',
    'ai agency near tirana',
    'website agency albania kosove',
  ],
  authors: [{ name: 'Averon Agency', url: baseUrl }],
  creator: 'Averon Agency',
  publisher: 'Averon Agency',
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
    siteName: 'Averon Agency',
    title: 'Averon Agency | Albania\'s First AI Automation & Web Development Agency',
    description: 'The first agency in Albania offering AI-powered business automations — Avox AI Voice Receptionist, Avtext Instagram, Avtext WhatsApp — plus professional web development. Never miss a customer again.',
    countryName: 'Albania',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Averon Agency | AI Automation & Web Development — Albania #1',
    description: 'Albania\'s first AI automation agency. Avox AI voice receptionist, Avtext AI chat assistants for Instagram and WhatsApp + professional websites. Based in Tirana.',
    creator: '@averonagency',
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

// ─────────────────────────────────────────────
// ORGANIZATION SCHEMA
// AIEO: Strong entity definition so AI systems know exactly who Averon Agency is
// ─────────────────────────────────────────────
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${baseUrl}/#organization`,
  name: 'Averon Agency',
  alternateName: ['Averon', 'Averon Albania', 'Averon AI', 'Averon Agency Albania', 'Averon AI Agency'],
  legalName: 'Averon Agency',
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/averon_icon.png`,
    width: 512,
    height: 512,
  },
  image: `${baseUrl}/averon_logobg.png`,
  description: 'Averon Agency is Albania\'s first and leading AI automation agency. We build Avox (Albania\'s first AI voice receptionist), Avtext AI chat assistants for Instagram and WhatsApp, and professional websites for Albanian businesses. Founded in Tirana in 2024, we serve businesses in Albania, Kosovo, and the broader Western Balkans region.',
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
      telephone: '+355-68-272-8760',
      contactType: 'customer service',
      email: 'averonagencyal@gmail.com',
      areaServed: ['AL', 'XK', 'MK', 'ME', 'RS'],
      availableLanguage: ['Albanian', 'English'],
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
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      name: 'WhatsApp',
      telephone: '+355-68-454-6370',
      url: 'https://wa.me/355684546370',
      availableLanguage: ['Albanian', 'English'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/averonagency/',
  ],
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    name: 'Tirana, Albania',
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 5,
  },
  areaServed: [
    { '@type': 'Country', name: 'Albania' },
    { '@type': 'Country', name: 'Kosovo' },
    { '@type': 'Country', name: 'North Macedonia' },
    { '@type': 'Country', name: 'Montenegro' },
  ],
  knowsAbout: [
    'AI Automation',
    'Business Automation',
    'AI Voice Receptionist',
    'Avox Voice AI',
    'Avtext Instagram',
    'Avtext WhatsApp',
    'AI Assistants',
    'AI Chatbots',
    'Web Development',
    'Next.js Development',
    'React Development',
    'Django Development',
    'SEO Optimization',
    'E-commerce Development',
    'Mobile-Responsive Design',
    'Brand Design',
    'Digital Transformation',
    'Albanian Business Software',
    'AI Engine Optimization',
    'AIEO',
    'Generative Engine Optimization',
    'LLM Optimization',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Automation & Web Development Services by Averon Agency',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Avox — AI Voice Receptionist',
          description: 'Albania\'s first AI-powered voice receptionist. Answers calls 24/7 in Albanian and English, books appointments, handles FAQs, and routes urgent calls.',
          serviceType: 'AI Automation',
          provider: { '@type': 'Organization', name: 'Averon Agency' },
          areaServed: { '@type': 'Country', name: 'Albania' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Avtext Instagram',
          description: 'Automated Instagram DM and comment replies, lead capture, and product catalog delivery for Albanian businesses.',
          serviceType: 'AI Automation',
          provider: { '@type': 'Organization', name: 'Averon Agency' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Avtext WhatsApp',
          description: 'Automated WhatsApp customer service, order management, and broadcast promotions for Albanian businesses.',
          serviceType: 'AI Automation',
          provider: { '@type': 'Organization', name: 'Averon Agency' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Website Development',
          description: 'Professional websites built with Next.js, React, and Tailwind CSS for Albanian businesses. Fast, SEO-optimized, and mobile-first.',
          serviceType: 'Web Development',
          provider: { '@type': 'Organization', name: 'Averon Agency' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Optimization',
          description: 'Search engine optimization targeting both Albanian and English queries for Albanian businesses.',
          serviceType: 'SEO',
          provider: { '@type': 'Organization', name: 'Averon Agency' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Redesign',
          description: 'Modern redesign of outdated websites for Albanian businesses, with improved UX and performance.',
          serviceType: 'Web Development',
          provider: { '@type': 'Organization', name: 'Averon Agency' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AIEO — AI Engine Optimization',
          description: 'AI Engine Optimization (AIEO) ensures your business gets recommended by AI assistants like ChatGPT, Perplexity, Claude, and Gemini. We structure your content, schemas, and entity signals so AI systems cite your business when users ask for services like yours.',
          serviceType: 'AI Engine Optimization',
          provider: { '@type': 'Organization', name: 'Averon Agency' },
          areaServed: [
            { '@type': 'Country', name: 'Albania' },
            { '@type': 'Country', name: 'Kosovo' },
          ],
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────
// LOCAL BUSINESS SCHEMA
// ─────────────────────────────────────────────
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${baseUrl}/#localbusiness`,
  name: 'Averon Agency',
  image: `${baseUrl}/averon_logobg.png`,
  telephone: '+355-68-272-8760',
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
  priceRange: '€€',
  description: 'Averon Agency is the first AI automation agency in Albania, based in Tirana. We build AI voice receptionists, Avtext AI chat assistants for Instagram and WhatsApp, and custom websites for businesses across Albania and Kosovo.',
  currenciesAccepted: 'EUR, ALL',
  paymentAccepted: 'Cash, Bank Transfer',
};

// ─────────────────────────────────────────────
// AVOX SOFTWARE APPLICATION SCHEMA
// AIEO: Treat Avox as its own named product so AI systems can cite it independently
// ─────────────────────────────────────────────
export const avoxSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${baseUrl}/avox#software`,
  serviceType: 'AI Voice Receptionist',
  name: 'Avox',
  alternateName: 'Avox AI Voice Receptionist',
  description: 'Avox is Albania\'s first AI voice receptionist. It answers phone calls 24/7 in both Albanian and English, books appointments, handles frequently asked questions, and forwards urgent calls. Built by Averon Agency in Tirana, Albania.',
  provider: {
    '@type': 'Organization',
    name: 'Averon Agency',
    url: baseUrl,
  },
  featureList: [
    'Answers calls 24/7 in Albanian and English',
    'Books appointments automatically',
    'Handles frequently asked questions',
    'Routes urgent calls to staff',
    'Never misses a customer call',
    'Custom voice and personality per business',
  ],
  inLanguage: ['sq', 'en'],
  url: `${baseUrl}/avox`,
  datePublished: '2024-01-01',
};

// ─────────────────────────────────────────────
// WEBSITE SCHEMA
// ─────────────────────────────────────────────
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'Averon Agency',
  url: baseUrl,
  description: 'Official website of Averon Agency — Albania\'s first AI automation agency and web development studio based in Tirana.',
  inLanguage: ['sq', 'en'],
  publisher: {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Averon Agency',
  },
};

// FAQ schema lives next to each visible FAQ (lib/homeFaq.ts for the homepage,
// app/automations/faq.ts for /automations) so the markup matches the page.

// ─────────────────────────────────────────────
// SPEAKABLE SCHEMA
// AIEO: Tells voice AI assistants (Google Assistant, Alexa, Siri, etc.) which content to read
// ─────────────────────────────────────────────
export const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/#webpage`,
  name: 'Averon Agency — Albania\'s First AI Automation & Web Development Agency',
  url: baseUrl,
  description: 'Averon Agency is Albania\'s first AI automation agency. We build Avox (AI voice receptionist), Avtext AI chat assistants for Instagram and WhatsApp, and professional websites for Albanian businesses.',
  inLanguage: ['sq', 'en'],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.speakable'],
    xpath: [
      '/html/head/title',
      '/html/head/meta[@name="description"]/@content',
    ],
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Averon Agency',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
    ],
  },
};

// ─────────────────────────────────────────────
// BREADCRUMB HELPER
// ─────────────────────────────────────────────
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

// ─────────────────────────────────────────────
// SCHEMA INJECTION HELPER
// ─────────────────────────────────────────────
export function getSchemaScript(...schemas: object[]) {
  return schemas.map((schema) => ({
    type: 'application/ld+json' as const,
    children: JSON.stringify(schema),
  }));
}

// ─────────────────────────────────────────────
// PER-PAGE HELPERS
// ─────────────────────────────────────────────

/** canonical + hreflang for a page; pages without a translation get canonical only. */
export function pageAlternates(path: string): Metadata['alternates'] {
  const pair = languagePairs.find(([en, sq]) => en === path || sq === path);
  return {
    canonical: `${baseUrl}${path}`,
    ...(pair && {
      languages: {
        en: `${baseUrl}${pair[0]}`,
        sq: `${baseUrl}${pair[1]}`,
        'x-default': `${baseUrl}${pair[0]}`,
      },
    }),
  };
}

export type QA = { question: string; answer: string };

/** FAQPage JSON-LD for a list that is also rendered visibly on the same page. */
export function faqSchemaFor(items: QA[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${baseUrl}${path}#faq`,
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
