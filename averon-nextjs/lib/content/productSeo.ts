import type { Metadata } from 'next';
import { baseUrl, pageAlternates, faqSchemaFor, generateBreadcrumbSchema } from '@/lib/seo';
import type { ProductContent } from '@/lib/content/products';

export function productMetadata(c: ProductContent): Metadata {
  return {
    title: c.meta.title,
    description: c.meta.description,
    keywords: c.meta.keywords,
    alternates: pageAlternates(c.path),
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url: `${baseUrl}${c.path}`,
      siteName: 'Averon Agency',
      locale: c.lang === 'sq' ? 'sq_AL' : 'en_AL',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description },
  };
}

/** Service + FAQPage + breadcrumb JSON-LD, all built from the visible text. */
export function productSchemas(c: ProductContent) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}${c.path}#service`,
    name: c.service.name,
    serviceType: c.service.serviceType,
    description: c.service.description,
    url: `${baseUrl}${c.path}`,
    inLanguage: c.lang,
    provider: { '@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'Averon Agency', url: baseUrl },
    areaServed: [
      { '@type': 'Country', name: 'Albania' },
      { '@type': 'Country', name: 'Kosovo' },
    ],
  };
  const home = c.lang === 'sq' ? 'Kreu' : 'Home';
  const parent = c.lang === 'sq'
    ? { name: 'Recepsionist AI', url: `${baseUrl}/sq/recepsionist-ai` }
    : { name: 'AI Automations', url: `${baseUrl}/automations` };
  const breadcrumb = generateBreadcrumbSchema([
    { name: home, url: baseUrl },
    parent,
    { name: `${c.h1}${c.h1Accent}`.trim(), url: `${baseUrl}${c.path}` },
  ]);
  return [service, faqSchemaFor(c.faq, c.path), breadcrumb];
}
