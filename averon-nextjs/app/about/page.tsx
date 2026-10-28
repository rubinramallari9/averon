"use client";

import React from 'react';
import Link from 'next/link';
import { MotionConfig } from 'framer-motion';
import {
  PageShell, SiteNav, PageHero, HeroEyebrow, Reveal, Eyebrow, CtaCard, SiteFooter, ArrowRightIcon,
} from '@/components/site/SiteChrome';
import { PageMeta } from '@/components/site/FaqList';
import { pageUpdated } from '@/lib/pages';

// Facts about the company in one place, written so AI assistants can quote
// them: who, where, since when, what we build, for whom. Keep it to facts
// that are true and checkable (no rankings or "best" claims).
const facts = [
  { label: 'Founded', value: '2024, in Tirana' },
  { label: 'Office', value: 'Rruga e Kavajës, Tirana 1001, Albania' },
  { label: 'Clients in', value: 'Albania, Kosovo, North Macedonia, Montenegro' },
  { label: 'Languages', value: 'Albanian and English' },
  { label: 'Hours', value: 'Monday–Friday, 09:00–18:00' },
  { label: 'Phone', value: '+355 68 272 8760', href: 'tel:+355682728760' },
  { label: 'WhatsApp', value: '+355 68 454 6370', href: 'https://wa.me/355684546370' },
  { label: 'Email', value: 'averonagencyal@gmail.com', href: 'mailto:averonagencyal@gmail.com' },
];

const products = [
  { name: 'Avox', desc: 'AI voice receptionist that answers business phone calls 24/7, books appointments and transfers urgent calls.', href: '/avox' },
  { name: 'Avtext Instagram', desc: 'AI assistant that answers Instagram DMs, story replies and comment keywords.', href: '/avtext-instagram' },
  { name: 'Avtext WhatsApp', desc: 'AI assistant that answers customers, takes orders and bookings on WhatsApp.', href: '/avtext-whatsapp' },
  { name: 'Websites', desc: 'Custom websites, e-commerce, redesigns and SEO, built with Next.js and React.', href: '/our-work' },
];

const clients = [
  { name: 'Arena Restaurant', what: 'restaurant & cocktail bar website with menu and reservations', href: 'https://arenarestaurant.al' },
  { name: 'Lumina Aesthetic', what: 'aesthetic clinic website', href: 'https://lumina.al' },
  { name: 'TimeTrader', what: 'luxury watch marketplace for Albania and the Balkans', href: 'https://timetrader-kappa.vercel.app/' },
  { name: 'Rasim Rama', what: 'personal portfolio website', href: 'https://ramarasim.com' },
];

const AboutPage = () => (
  <MotionConfig reducedMotion="user">
    <PageShell>
      <SiteNav backHref="/" backLabel="Back to Home" />

      <PageHero>
        <HeroEyebrow>About Averon Agency</HeroEyebrow>
        <h1 className="text-[2.5rem] sm:text-6xl lg:text-7xl font-medium mb-6 sm:mb-8 leading-[1.05] tracking-tight text-white">
          AI and websites, <span className="brand-averon text-[#8FABFF]">built in Tirana</span>
        </h1>
        <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
          We help businesses in Albania and Kosovo answer every customer and look professional online.
        </p>
      </PageHero>

      <PageMeta updated={pageUpdated['/about']} />

      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-heading)]">An AI automation agency and web studio</h2>
            <p className="speakable text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-5">
              Averon Agency is an AI automation agency and web development studio in Tirana, Albania, founded in 2024. We build AI assistants and receptionists that answer customers in Albanian and English, 24/7, on the phone, Instagram and WhatsApp, and we build websites for businesses in Albania and Kosovo.
            </p>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              Our products are made for how businesses here actually work: customers who call and message at any hour, mostly in Albanian, often on WhatsApp and Instagram rather than email. Every project starts with a free consultation, and we keep looking after what we build after it goes live.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="rounded-[1.5rem] bg-[var(--surface-light)] p-6 sm:p-8 divide-y divide-[var(--hairline)]">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 first:pt-0 last:pb-0">
                  <dt className="text-[var(--text-muted)] text-sm">{f.label}</dt>
                  <dd className="text-[var(--text-heading)] text-sm sm:text-[15px] font-medium break-words">
                    {f.href ? <a href={f.href} className="hover:text-[var(--accent)]">{f.value}</a> : f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-light)]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">What we build</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05} className="h-full">
                <Link href={p.href} className="group h-full flex flex-col rounded-[1.5rem] bg-white border border-[var(--hairline)] p-6 sm:p-8 hover:shadow-[0_24px_48px_-24px_rgba(14,23,38,0.25)] transition-shadow">
                  <h3 className="text-[var(--text-heading)] font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">{p.name}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{p.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[var(--text-heading)]">Some of our work</h2>
            <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {clients.map((c) => (
                <li key={c.name} className="py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-[var(--text-heading)] font-semibold hover:text-[var(--accent)]">{c.name}</a>
                  <span className="text-[var(--text-muted)] text-sm">{c.what}</span>
                </li>
              ))}
            </ul>
            <Link href="/our-work" className="mt-6 inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold hover:underline underline-offset-4">
              See all our work
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaCard>
        <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-white">Let&apos;s talk</h2>
        <p className="text-base sm:text-xl text-[var(--card-navy-text)] mb-10 leading-relaxed">
          Tell us about your business. The first consultation is free and there&apos;s no commitment.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97] text-base sm:text-lg"
        >
          <span>Contact us</span>
          <ArrowRightIcon />
        </Link>
      </CtaCard>

      <SiteFooter tagline="Averon Agency — AI automation agency and web development studio in Tirana, Albania" />
    </PageShell>
  </MotionConfig>
);

export default AboutPage;
