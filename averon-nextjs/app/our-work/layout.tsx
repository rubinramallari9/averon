import type { Metadata } from 'next';
import { baseUrl, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Our Work — Portfolio | Averon Agency',
  description: 'Explore websites and AI automations built by Averon Agency for Albanian and Kosovar businesses. See real projects: TimeTrader, Rasim Rama, Rubin Ramallari, Lumina Aesthetic, and more.',
  keywords: [
    'Averon Agency portfolio',
    'Averon Agency work',
    'website portfolio albania',
    'web development portfolio tirana',
    'AI automation examples albania',
    'lumina aesthetic website',
    'timetrader albania',
    'albanian web agency portfolio',
    'faqe interneti shqiperi shembull',
  ],
  alternates: {
    canonical: `${baseUrl}/our-work`,
  },
  openGraph: {
    title: 'Our Work — Averon Agency Portfolio',
    description: 'Real websites and AI automations built by Averon Agency for Albanian businesses. Fast, modern, and designed to convert.',
    url: `${baseUrl}/our-work`,
    siteName: 'Averon Agency',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | Averon Agency Portfolio',
    description: 'Websites and AI automations built by Averon Agency for Albanian and Kosovar businesses.',
    creator: '@averonagency',
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: baseUrl },
  { name: 'Our Work', url: `${baseUrl}/our-work` },
]);

export default function OurWorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
