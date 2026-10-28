"use client";

import React from 'react';
import Link from 'next/link';
import { MotionConfig } from 'framer-motion';
import {
  PageShell, SiteNav, PageHero, HeroEyebrow, Reveal, Eyebrow, CtaCard, SiteFooter,
  ArrowRightIcon, CheckIcon,
} from '@/components/site/SiteChrome';
import { FaqList, PageMeta } from '@/components/site/FaqList';
import type { ReceptionistContent } from '@/lib/content/receptionist';
import { pageUpdated } from '@/lib/pages';

// "AI receptionist in Albania" landing (English + Albanian versions).
export const ReceptionistLanding = ({ content: c }: { content: ReceptionistContent }) => (
  <MotionConfig reducedMotion="user">
    <PageShell lang={c.lang}>
      <SiteNav backHref={c.back.href} backLabel={c.back.label} />

      <PageHero>
        <HeroEyebrow>{c.eyebrow}</HeroEyebrow>
        <h1 className="text-[2.25rem] sm:text-6xl lg:text-7xl font-medium mb-6 sm:mb-8 leading-[1.08] tracking-tight text-white">
          {c.h1}<span className="brand-averon text-[#8FABFF]">{c.h1Accent}</span>
        </h1>
        <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">{c.subtitle}</p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold text-base sm:text-lg transition-[background-color,transform] duration-150 active:scale-[0.97] shadow-lg shadow-black/20"
        >
          {c.primaryCta}
          <ArrowRightIcon />
        </Link>
      </PageHero>

      <PageMeta updated={pageUpdated[c.path]} lang={c.lang} switchTo={{ href: c.alt.href, label: c.alt.label, hrefLang: c.lang === 'en' ? 'sq' : 'en' }} />

      {/* Definition + what it does */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-heading)]">{c.definition.title}</h2>
            {c.definition.paragraphs.map((p) => (
              <p key={p} className="speakable text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-5 last:mb-0">{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[1.5rem] bg-[var(--surface-light)] p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-5 text-[var(--text-heading)]">{c.doesTitle}</h2>
              <ul className="space-y-3">
                {c.does.map((d) => (
                  <li key={d} className="flex gap-3 text-[var(--text-heading)] text-[15px] leading-relaxed">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-[#3E6AEF]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-light)]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">{c.productsTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06} className="h-full">
                <div className="h-full flex flex-col rounded-[1.5rem] bg-white border border-[var(--hairline)] p-6 sm:p-8">
                  <Eyebrow>{p.channel}</Eyebrow>
                  <h3 className="text-[var(--text-heading)] font-bold text-2xl mb-3">{p.name}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{p.desc}</p>
                  <p className="text-[var(--text-heading)] font-semibold text-sm mb-6">{p.price}</p>
                  <Link href={p.href} className="mt-auto inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold hover:underline underline-offset-4">
                    {p.link}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI vs human */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-heading)]">{c.compare.title}</h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">{c.compare.intro}</p>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[1.5rem] border border-[var(--hairline)]">
              <table className="w-full table-fixed text-left text-[13px] leading-snug sm:text-[15px] sm:leading-normal">
                <thead className="bg-[var(--surface-light)]">
                  <tr>
                    {c.compare.head.map((h, i) => (
                      <th key={i} scope="col" className={`${i === 0 ? 'w-[28%]' : ''} px-3 sm:px-6 py-4 font-semibold text-[var(--text-heading)] align-bottom`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hairline)]">
                  {c.compare.rows.map(([label, ai, human]) => (
                    <tr key={label}>
                      <th scope="row" className="px-3 sm:px-6 py-4 font-semibold text-[var(--text-heading)] align-top">{label}</th>
                      <td className="px-3 sm:px-6 py-4 text-[var(--text-heading)] align-top">{ai}</td>
                      <td className="px-3 sm:px-6 py-4 text-[var(--text-muted)] align-top">{human}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-sm text-[var(--text-muted)]">{c.compare.note}</p>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="typography-b py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-[var(--text-heading)]">{c.forTitle}</h2>
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {c.forList.map((name) => (
              <li key={name} className="px-4 sm:px-5 py-2 bg-[var(--surface-light)] rounded-full text-[var(--text-heading)] text-sm font-medium">{name}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* FAQ — same items feed the FAQPage JSON-LD in the layout */}
      <section id="faq" className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-14">
            <span className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase mb-4 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">{c.faqTitle}</h2>
          </Reveal>
          <FaqList items={c.faq} />
          <p className="mt-8 text-center text-[var(--text-muted)]">
            {c.guide.text}{' '}
            <Link href={c.guide.href} className="text-[var(--accent)] font-semibold hover:underline underline-offset-4">{c.guide.link}</Link>
          </p>
        </div>
      </section>

      <CtaCard>
        <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-white">{c.cta.title}</h2>
        <p className="text-base sm:text-xl text-[var(--card-navy-text)] mb-10 leading-relaxed">{c.cta.text}</p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97] text-base sm:text-lg"
        >
          <span>{c.cta.button}</span>
          <ArrowRightIcon />
        </Link>
      </CtaCard>

      <SiteFooter tagline={c.footerTagline} lang={c.lang} />
    </PageShell>
  </MotionConfig>
);
