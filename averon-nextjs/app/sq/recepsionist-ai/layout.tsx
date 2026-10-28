import type { Metadata } from 'next';
import { receptionistSq as c } from '@/lib/content/receptionist';
import { baseUrl, pageAlternates, faqSchemaFor, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/site/JsonLd';

export const metadata: Metadata = {
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

// The three products as an ItemList, so the page reads as "the AI
// receptionists Averon offers" with each one's own URL.
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: c.productsTitle,
  itemListElement: c.products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${baseUrl}${p.href}`,
    name: p.name,
  })),
};

const breadcrumb = generateBreadcrumbSchema([
  { name: c.lang === 'sq' ? 'Kreu' : 'Home', url: baseUrl },
  { name: c.lang === 'sq' ? 'Recepsionist AI' : 'AI Receptionist', url: `${baseUrl}${c.path}` },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[itemList, faqSchemaFor(c.faq, c.path), breadcrumb]} />
      {children}
    </>
  );
}
