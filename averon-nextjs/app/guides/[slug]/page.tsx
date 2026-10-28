import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell, SiteNav, SiteFooter, CtaCard, ArrowRightIcon } from '@/components/site/SiteChrome';
import { JsonLd } from '@/components/site/JsonLd';
import { guides, guideBySlug } from '@/lib/content/guides';
import { baseUrl, pageAlternates, generateBreadcrumbSchema } from '@/lib/seo';
import { formatDate } from '@/lib/pages';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  const path = `/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: pageAlternates(path),
    openGraph: {
      title: g.title,
      description: g.description,
      url: `${baseUrl}${path}`,
      siteName: 'Averon Agency',
      locale: g.lang === 'sq' ? 'sq_AL' : 'en_AL',
      type: 'article',
      publishedTime: g.published,
      modifiedTime: g.updated,
    },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description },
  };
}

const text = {
  en: { back: 'All guides', quick: 'Quick answer', related: 'Related', published: 'Published', updated: 'updated', ctaTitle: 'Want to see it for your business?', ctaText: 'Tell us how customers reach you and we’ll show you what an AI assistant would handle. Free consultation, no commitment.', ctaButton: 'Book a free consultation', switchLabel: 'Shqip' },
  sq: { back: 'Të gjithë udhëzuesit', quick: 'Përgjigje e shkurtër', related: 'Lexoni edhe', published: 'Publikuar më', updated: 'përditësuar më', ctaTitle: 'Doni ta shihni për biznesin tuaj?', ctaText: 'Na tregoni si ju kontaktojnë klientët dhe do t’ju tregojmë çfarë do të bënte një asistent AI. Konsultim falas, pa detyrim.', ctaButton: 'Rezervo konsultim falas', switchLabel: 'English' },
};

export default async function GuidePage({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const t = text[g.lang];
  const path = `/guides/${g.slug}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}${path}#article`,
    headline: g.title,
    description: g.description,
    inLanguage: g.lang,
    datePublished: g.published,
    dateModified: g.updated,
    mainEntityOfPage: `${baseUrl}${path}`,
    author: { '@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'Averon Agency', url: baseUrl },
    publisher: { '@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'Averon Agency', logo: { '@type': 'ImageObject', url: `${baseUrl}/averon_icon.png` } },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable'] },
  };
  const breadcrumb = generateBreadcrumbSchema([
    { name: g.lang === 'sq' ? 'Kreu' : 'Home', url: baseUrl },
    { name: g.lang === 'sq' ? 'Udhëzues' : 'Guides', url: `${baseUrl}/guides` },
    { name: g.title, url: `${baseUrl}${path}` },
  ]);

  return (
    <PageShell lang={g.lang}>
      <JsonLd data={[article, breadcrumb]} />
      <SiteNav backHref="/guides" backLabel={t.back} />

      <article className="typography-a pt-28 sm:pt-40 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-[2rem] leading-[1.15] sm:text-5xl font-medium mb-5 text-[var(--text-heading)] tracking-tight">{g.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[var(--text-muted)] text-sm mb-10">
            <p>
              Averon Agency · {t.published} <time dateTime={g.published}>{formatDate(g.published, g.lang)}</time>
              {g.updated !== g.published && <> · {t.updated} <time dateTime={g.updated}>{formatDate(g.updated, g.lang)}</time></>}
            </p>
            {g.altSlug && (
              <a
                href={`/guides/${g.altSlug}`}
                hrefLang={g.lang === 'en' ? 'sq' : 'en'}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-3.5 py-1.5 font-medium text-[var(--text-heading)] hover:bg-[var(--surface-light)] transition-colors"
              >
                <span aria-hidden="true">🌐</span>
                {t.switchLabel}
              </a>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto typography-b">
          <div className="rounded-[1.5rem] bg-[var(--surface-light)] p-6 sm:p-8 mb-12">
            <p className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase mb-3">{t.quick}</p>
            <p className="speakable text-[var(--text-heading)] text-lg sm:text-xl leading-relaxed">{g.quickAnswer}</p>
          </div>

          {g.sections.map((s) => {
            const ListTag = s.ordered ? 'ol' : 'ul';
            return (
              <section key={s.heading} className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--text-heading)]">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed mb-4">{p}</p>
                ))}
                {s.list && (
                  <ListTag className={`${s.ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-2.5 text-[var(--text-body)] text-base sm:text-lg leading-relaxed marker:text-[var(--text-muted)]`}>
                    {s.list.map((item) => <li key={item}>{item}</li>)}
                  </ListTag>
                )}
              </section>
            );
          })}

          <nav aria-label={t.related} className="border-t border-[var(--hairline)] pt-8">
            <h2 className="text-lg font-semibold mb-4 text-[var(--text-heading)]">{t.related}</h2>
            <ul className="space-y-3">
              {g.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold hover:underline underline-offset-4">
                    {r.label}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>

      <CtaCard>
        <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-white">{t.ctaTitle}</h2>
        <p className="text-base sm:text-xl text-[var(--card-navy-text)] mb-10 leading-relaxed">{t.ctaText}</p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97] text-base sm:text-lg"
        >
          <span>{t.ctaButton}</span>
          <ArrowRightIcon />
        </Link>
      </CtaCard>

      <SiteFooter tagline={g.lang === 'sq' ? 'Udhëzues nga Averon Agency, Tiranë' : 'Guides by Averon Agency, Tirana'} lang={g.lang} />
    </PageShell>
  );
}
