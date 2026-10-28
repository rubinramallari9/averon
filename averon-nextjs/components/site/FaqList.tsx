import React from 'react';
import type { QA } from '@/lib/seo';
import { formatDate } from '@/lib/pages';

// Visible FAQ list, same look as the /automations and homepage FAQs. Pair it
// with faqSchemaFor() on the same items so the JSON-LD matches what's shown.
export const FaqList = ({ items }: { items: QA[] }) => (
  <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
    {items.map(({ question, answer }) => (
      <details key={question} className="group py-5">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-base sm:text-lg font-semibold text-[var(--text-heading)] [&::-webkit-details-marker]:hidden">
          <h3>{question}</h3>
          <svg className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </summary>
        <p className="mt-3 pr-10 text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">{answer}</p>
      </details>
    ))}
  </div>
);

/** Small "Last updated" line + optional language switch, shown under a hero. */
export const PageMeta = ({
  updated,
  lang = 'en',
  switchTo,
}: {
  /** ISO date, e.g. pageUpdated['/avox'] */
  updated: string;
  lang?: 'en' | 'sq';
  switchTo?: { href: string; label: string; hrefLang: 'en' | 'sq' };
}) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
    <p>
      {lang === 'sq' ? 'Përditësuar më' : 'Last updated'} <time dateTime={updated}>{formatDate(updated, lang)}</time>
    </p>
    {switchTo && (
      <a
        href={switchTo.href}
        hrefLang={switchTo.hrefLang}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-3.5 py-1.5 font-medium text-[var(--text-heading)] hover:bg-[var(--surface-light)] transition-colors"
      >
        <span aria-hidden="true">🌐</span>
        {switchTo.label}
      </a>
    )}
  </div>
);
