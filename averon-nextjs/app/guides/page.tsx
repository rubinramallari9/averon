import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, SiteNav, SiteFooter, ArrowRightIcon } from '@/components/site/SiteChrome';
import { JsonLd } from '@/components/site/JsonLd';
import { guides } from '@/lib/content/guides';
import { baseUrl, pageAlternates, generateBreadcrumbSchema } from '@/lib/seo';
import { formatDate } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Guides — AI Assistants & Receptionists for Albanian Businesses',
  description: 'Plain answers about AI receptionists and AI assistants for businesses in Albania: what they cost, how they compare with a human receptionist, and how to automate WhatsApp and Instagram.',
  alternates: pageAlternates('/guides'),
  openGraph: {
    title: 'Guides — AI Assistants & Receptionists for Albanian Businesses',
    description: 'What AI receptionists cost in Albania, AI vs human receptionists, and how to automate WhatsApp and Instagram.',
    url: `${baseUrl}/guides`,
    siteName: 'Averon Agency',
    type: 'website',
  },
};

const breadcrumb = generateBreadcrumbSchema([
  { name: 'Home', url: baseUrl },
  { name: 'Guides', url: `${baseUrl}/guides` },
]);

const collection = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Guides by Averon Agency',
  url: `${baseUrl}/guides`,
  hasPart: guides.map((g) => ({ '@type': 'Article', headline: g.title, url: `${baseUrl}/guides/${g.slug}`, inLanguage: g.lang })),
};

export default function GuidesPage() {
  return (
    <PageShell>
      <JsonLd data={[collection, breadcrumb]} />
      <SiteNav backHref="/" backLabel="Back to Home" />

      <section className="typography-a pt-28 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-medium mb-5 text-[var(--text-heading)] tracking-tight">
            <span className="brand-averon text-[var(--accent)]">Guides</span>
          </h1>
          <p className="typography-b text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-12">
            Plain answers about AI assistants and receptionists for businesses in Albania and Kosovo. Udhëzues në shqip dhe anglisht.
          </p>

          <ul className="typography-b divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {guides.map((g) => (
              <li key={g.slug} lang={g.lang} className="py-6">
                <Link href={`/guides/${g.slug}`} className="group block">
                  <p className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)] mb-2">
                    {g.lang === 'sq' ? 'Shqip' : 'English'} · <time dateTime={g.updated}>{formatDate(g.updated, g.lang)}</time>
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-heading)] group-hover:text-[var(--accent)] transition-colors mb-2">{g.title}</h2>
                  <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-3">{g.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-[var(--accent)] text-sm font-semibold">
                    {g.lang === 'sq' ? 'Lexo' : 'Read'}
                    <ArrowRightIcon className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter tagline="Guides by Averon Agency, Tirana" />
    </PageShell>
  );
}
