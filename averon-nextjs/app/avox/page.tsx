"use client";

import React from 'react';
import Link from 'next/link';
import { MotionConfig } from 'framer-motion';
import {
  PageShell, SiteNav, PageHero, HeroEyebrow, Reveal, Eyebrow, CtaCard, SiteFooter, ArrowRightIcon,
} from '@/components/site/SiteChrome';
import { MockPanel, AvoxCallMock } from '@/components/site/Mocks';
import { PageMeta } from '@/components/site/FaqList';
import { pageUpdated } from '@/lib/pages';

const AvoxPage = () => {
  return (
    <MotionConfig reducedMotion="user">
    <PageShell>

      {/* Structured Data for Avox as a named service (no prices: priced per business) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Avox',
            alternateName: ['Avox AI', 'Avox Voice AI', 'Avox AI Receptionist'],
            description: 'Avox is Albania\'s first AI voice receptionist, built by Averon Agency. It answers calls 24/7 in Albanian and English, books appointments automatically, handles FAQs, and routes urgent calls — so businesses never miss a customer.',
            image: 'https://averon.agency/averon_logobg.png',
            brand: {
              '@type': 'Brand',
              name: 'Averon Agency',
            },
            provider: {
              '@type': 'Organization',
              name: 'Averon Agency',
              url: 'https://averon.agency',
            },
            url: 'https://averon.agency/avox',
            serviceType: 'AI Voice Receptionist',
          }),
        }}
      />

      <SiteNav backHref="/automations" backLabel="All Automations" />

      {/* Hero */}
      <PageHero tall>
        <HeroEyebrow>
          <span className="w-2 h-2 bg-[#8FABFF] rounded-full motion-safe:animate-pulse" />
          By Averon Agency · Albania&apos;s First
        </HeroEyebrow>

        {/* Main heading — "Avox" is the H1 Google needs to see */}
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-medium mb-6 leading-none tracking-tight">
          <span className="brand-averon text-white">Avox</span>
        </h1>

        <p className="text-xl sm:text-3xl !font-semibold text-white mb-5 tracking-tight">
          Albania&apos;s First AI Voice Receptionist
        </p>

        <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
          Avox answers every call, books every appointment, and handles every FAQ — in Albanian and English — 24 hours a day, 7 days a week. Your business never sleeps.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-sm sm:max-w-none mx-auto">
          <Link
            href="/#contact"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold text-base sm:text-lg transition-[background-color,transform] duration-150 active:scale-[0.97] shadow-lg shadow-black/20"
          >
            Get Avox for Your Business
          </Link>
          <Link
            href="/automations"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold text-base sm:text-lg transition-[background-color,transform] duration-150 active:scale-[0.97] border-2 border-white/30"
          >
            See All Automations
          </Link>
        </div>
      </PageHero>

      <PageMeta updated={pageUpdated['/avox']} switchTo={{ href: '/sq/avox', label: 'Shqip', hrefLang: 'sq' }} />

      {/* What is Avox */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <Reveal>
            <Eyebrow>What is Avox?</Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-heading)]">
              The AI that <span className="text-[var(--accent)]">picks up</span> when you can&apos;t
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-5">
              Avox is an AI voice assistant created by Averon Agency — designed from the ground up for Albanian businesses. It speaks naturally in Albanian and English, understands your services, and handles calls exactly the way a trained receptionist would.
            </p>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8">
              Whether you run a dental clinic, a beauty salon, a restaurant, or a law office — Avox represents your business professionally on every call, every hour of the day.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: "0%", label: "Missed calls" },
                { value: "24/7", label: "Always available" },
                { value: "< 2s", label: "Answer time" },
                { value: "2", label: "Languages: AL + EN" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-[var(--surface-light)] p-5 sm:p-6">
                  <p className="text-[var(--text-heading)] text-3xl sm:text-4xl !font-semibold tracking-tight mb-1">{stat.value}</p>
                  <p className="text-[var(--text-muted)] text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Mock call UI */}
          <Reveal delay={0.1}>
            <MockPanel>
              <AvoxCallMock title="Avox" subtitle="by Averon Agency" />
            </MockPanel>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-heading)]">
              Everything Avox <span className="text-[var(--accent)]">handles for you</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Avox isn&apos;t just an answering machine — it&apos;s a full receptionist powered by AI
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "24/7 Call Answering",
                desc: "Avox picks up every call instantly — nights, weekends, holidays. No more missed customers.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                ),
                title: "Appointment Booking",
                desc: "Checks your real-time calendar and books appointments directly, sending confirmations automatically.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                ),
                title: "Albanian & English",
                desc: "Switches languages naturally mid-call, adapting to whatever the customer speaks.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                ),
                title: "FAQ Handling",
                desc: "Knows your business hours, location, pricing, and services — answers instantly without involving you.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                ),
                title: "Smart Call Routing",
                desc: "Detects urgent calls and transfers them to you or the right team member immediately.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                ),
                title: "Built for Albania",
                desc: "First of its kind in Albania — designed specifically for the Albanian market and business culture.",
              },
            ].map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.06}>
                <div className="h-full rounded-[1.5rem] bg-[var(--surface-light)] p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[var(--hairline)] flex items-center justify-center text-[var(--accent)] mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-[var(--text-heading)] font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-heading)]">
            Perfect for <span className="text-[var(--accent)]">every business</span>
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Any Albanian business that receives phone calls can benefit from Avox
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              "Dental Clinics", "Beauty Salons", "Restaurants", "Law Offices",
              "Private Doctors", "Auto Services", "Real Estate", "Pharmacies",
              "Hotels", "Gyms & Fitness", "Accountants", "Veterinarians",
            ].map((industry) => (
              <span
                key={industry}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--surface-light)] rounded-full text-[var(--text-heading)] text-sm font-medium"
              >
                {industry}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <CtaCard>
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
          Get <span className="text-[#8FABFF]">Avox</span> today
        </h2>
        <p className="text-base sm:text-lg text-[var(--card-navy-text)] mb-10 max-w-xl mx-auto leading-relaxed">
          Join the first businesses in Albania powered by Avox. Free consultation — no commitment.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold text-base sm:text-lg transition-[background-color,transform] duration-150 active:scale-[0.97]"
        >
          Start with Avox
          <ArrowRightIcon />
        </Link>
        <p className="text-white/50 text-sm mt-6">Built by Averon Agency · Albania&apos;s First AI Voice Receptionist</p>
      </CtaCard>

      <SiteFooter
        tagline={
          <>
            <p>Avox — Albania&apos;s First AI Voice Receptionist</p>
            <p className="text-white/50">Built by Averon Agency</p>
          </>
        }
      />
    </PageShell>
    </MotionConfig>
  );
};

export default AvoxPage;
