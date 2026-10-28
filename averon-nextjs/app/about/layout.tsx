import type { Metadata } from 'next';
import { baseUrl, pageAlternates, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/site/JsonLd';

export const metadata: Metadata = {
  title: 'About Averon Agency — AI Automation & Web Studio in Tirana',
  description: 'Averon Agency is an AI automation agency and web development studio in Tirana, Albania, founded in 2024. We build AI assistants and receptionists (Avox, Avtext) and websites for businesses in Albania and Kosovo.',
  alternates: pageAlternates('/about'),
  openGraph: {
    title: 'About Averon Agency',
    description: 'AI automation agency and web development studio in Tirana, Albania, founded in 2024.',
    url: `${baseUrl}/about`,
    siteName: 'Averon Agency',
    type: 'website',
  },
};

// AboutPage pointing at the Organization defined once in the root layout.
const aboutPage = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${baseUrl}/about#webpage`,
  url: `${baseUrl}/about`,
  name: 'About Averon Agency',
  inLanguage: 'en',
  about: { '@id': `${baseUrl}/#organization` },
  mainEntity: { '@id': `${baseUrl}/#organization` },
};

const breadcrumb = generateBreadcrumbSchema([
  { name: 'Home', url: baseUrl },
  { name: 'About', url: `${baseUrl}/about` },
]);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[aboutPage, breadcrumb]} />
      {children}
    </>
  );
}
