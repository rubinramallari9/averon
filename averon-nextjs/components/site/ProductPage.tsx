"use client";

import React from 'react';
import Link from 'next/link';
import { MotionConfig } from 'framer-motion';
import {
  PageShell, SiteNav, PageHero, HeroEyebrow, Reveal, Eyebrow, CtaCard, SiteFooter,
  ArrowRightIcon, CheckIcon,
} from '@/components/site/SiteChrome';
import { MockPanel, AvoxCallMock } from '@/components/site/Mocks';
import { FaqList, PageMeta } from '@/components/site/FaqList';
import type { ProductContent } from '@/lib/content/products';
import { pageUpdated } from '@/lib/pages';

// Only Avox has a visual; the Avtext pages are text-only (no chat mockups).
const AvoxVisual = () => (
  <MockPanel>
    <AvoxCallMock title="Avox" subtitle="by Averon Agency" />
  </MockPanel>
);

// One product page (Avtext Instagram / WhatsApp, Albanian Avox), driven
// entirely by a ProductContent object so the English and Albanian versions
// stay structurally identical.
export const ProductPage = ({ content: c }: { content: ProductContent }) => (
  <MotionConfig reducedMotion="user">
    <PageShell lang={c.lang}>
      <SiteNav backHref={c.back.href} backLabel={c.back.label} />

      <PageHero>
        <HeroEyebrow>{c.eyebrow}</HeroEyebrow>
        <h1 className="text-[2.75rem] sm:text-7xl lg:text-8xl font-medium mb-6 sm:mb-8 leading-[1.05] tracking-tight text-white">
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

      {/* What is it */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className={c.visual === 'avox' ? 'max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center' : 'max-w-3xl mx-auto'}>
          <Reveal>
            <Eyebrow>{c.whatIs.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-heading)]">{c.whatIs.title}</h2>
            {c.whatIs.paragraphs.map((p) => (
              <p key={p} className="speakable text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-5 last:mb-0">{p}</p>
            ))}
          </Reveal>
          {c.visual === 'avox' && (
            <Reveal delay={0.1}>
              <AvoxVisual />
            </Reveal>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-light)]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">{c.featuresTitle}</h2>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05} className="h-full">
                <li className="h-full rounded-[1.5rem] bg-white border border-[var(--hairline)] p-6 sm:p-8">
                  <span className="mb-5 w-10 h-10 rounded-full bg-[#3E6AEF]/10 text-[var(--accent)] flex items-center justify-center">
                    <CheckIcon />
                  </span>
                  <h3 className="text-[var(--text-heading)] font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{f.desc}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">{c.stepsTitle}</h2>
          </Reveal>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="h-full">
                <li className="h-full rounded-[1.5rem] border border-[var(--hairline)] p-6 sm:p-8">
                  <span className="block text-[var(--accent)] text-sm font-semibold tracking-wider mb-3">0{i + 1}</span>
                  <h3 className="text-[var(--text-heading)] font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries + pricing */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-[var(--text-heading)]">{c.industriesTitle}</h2>
            <ul className="flex flex-wrap gap-2 sm:gap-3">
              {c.industries.map((name) => (
                <li key={name} className="px-4 py-2 bg-[var(--surface-light)] rounded-full text-[var(--text-heading)] text-sm font-medium">{name}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[1.5rem] bg-[var(--surface-light)] p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--text-heading)]">{c.pricing.title}</h2>
              <p className="speakable text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">{c.pricing.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — the same items feed the FAQPage JSON-LD in the layout */}
      <section id="faq" className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-14">
            <span className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase mb-4 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">{c.faqTitle}</h2>
          </Reveal>
          <FaqList items={c.faq} />
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
