"use client";

import React from 'react';
import Link from 'next/link';
import { MotionConfig } from 'framer-motion';
import {
  PageShell, SiteNav, PageHero, HeroEyebrow, Reveal, CtaCard, SiteFooter, ArrowRightIcon,
} from '@/components/site/SiteChrome';
import { MockPanel, MockStats, AvoxCallMock, PhoneGlyph } from '@/components/site/Mocks';
import {
  ProductSection, InstagramGlyph, WhatsAppGlyph,
} from '@/components/site/Products';
import { PageMeta } from '@/components/site/FaqList';
import { pageUpdated } from '@/lib/pages';
import { automationFaqs } from './faq';

const AutomationsPage = () => {
  return (
    <MotionConfig reducedMotion="user">
      <PageShell>
        <SiteNav backHref="/" backLabel="Back to Home" />

        <PageHero>
          <HeroEyebrow>AI Assistants / Receptionists for Businesses in Albania</HeroEyebrow>
          <h1 className="text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-medium mb-6 sm:mb-8 leading-[1.05] tracking-tight text-white">
            Business <span className="brand-averon text-[#8FABFF]">Automations</span>
          </h1>
          <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            Stop losing customers to missed messages and unanswered calls. Our AI assistants and receptionists answer phone calls, Instagram DMs and WhatsApp messages in Albanian and English, around the clock.
          </p>
        </PageHero>

        <PageMeta updated={pageUpdated['/automations']} switchTo={{ href: '/sq/recepsionist-ai', label: 'Shqip', hrefLang: 'sq' }} />

        {/* 01 — AVOX */}
        <ProductSection
          id="avox"
          icon={<PhoneGlyph className="w-5 h-5" />}
          iconClass="bg-[var(--accent)]"
          label="Voice AI"
          title="Meet "
          accent="Avox"
          description="Your business phone never goes unanswered again. Avox speaks Albanian and English naturally, books appointments, answers FAQs, and seamlessly transfers urgent calls to you — built from the ground up by Averon."
          features={[
            { title: "24/7 Call Answering", desc: "Never miss a call again — Avox picks up instantly, day or night, weekends and holidays." },
            { title: "Appointment Booking", desc: "Checks your calendar and books appointments directly, sending confirmations by SMS or WhatsApp." },
            { title: "Albanian & English", desc: "Speaks naturally in both languages, adapting to whichever the caller prefers." },
            { title: "FAQ Handling", desc: "Answers common questions: hours, location, services, prices — without involving you." },
            { title: "Smart Call Routing", desc: "Detects urgent situations and transfers the call to the right person immediately." },
          ]}
          tags={["Dental Clinics", "Beauty Salons", "Law Offices", "Restaurants", "Private Doctors", "Auto Services"]}
          cta="Get Avox"
          more={{ href: '/avox', label: 'All about Avox' }}
          reverse
          visual={
            <MockPanel
              footer={
                <MockStats
                  stats={[
                    { label: "Availability", value: "24/7" },
                    { label: "Languages", value: "AL/EN" },
                    { label: "Missed Calls", value: "0%" },
                  ]}
                />
              }
            >
              <AvoxCallMock title="Avox by Averon" />
            </MockPanel>
          }
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="h-px bg-[var(--hairline)]" /></div>

        {/* 02 — AVTEXT INSTAGRAM */}
        <ProductSection
          id="instagram-dm-bot"
          icon={<InstagramGlyph />}
          iconClass="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
          label="Instagram Automation"
          title="Avtext "
          accent="Instagram"
          description="Every comment, every story reply, every DM — answered instantly. Avtext Instagram turns your followers into customers by engaging them the moment they reach out, even at 3am."
          features={[
            { title: "Instant DM & Comment Replies", desc: "Responds to every incoming message in seconds, keeping followers engaged and feeling heard." },
            { title: "Lead Capture Sequences", desc: "Collects phone numbers, emails, and preferences through natural conversation flows." },
            { title: "Product Catalog Delivery", desc: "Sends your menu, price list, or product catalog automatically when triggered by keywords." },
            { title: "Story & Post Triggers", desc: "When someone comments a keyword on your post ('PRICE', 'INFO'), the bot DMs them instantly." },
            { title: "Appointment & Booking Links", desc: "Directs interested followers to your booking page or collects details for you to follow up." },
          ]}
          tags={["E-commerce", "Restaurants", "Salons & Spas", "Clothing Stores", "Real Estate", "Clinics"]}
          cta="Get Avtext Instagram"
          more={{ href: '/avtext-instagram', label: 'All about Avtext Instagram' }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="h-px bg-[var(--hairline)]" /></div>

        {/* 03 — AVTEXT WHATSAPP */}
        <ProductSection
          id="whatsapp-bot"
          icon={<WhatsAppGlyph />}
          iconClass="bg-[#25D366]"
          label="WhatsApp Automation"
          title="Avtext "
          accent="WhatsApp"
          description="WhatsApp is where Albanian customers live. Avtext WhatsApp handles customer service, orders, bookings, and promotions directly inside the app your customers already use every day."
          features={[
            { title: "Instant Customer Replies", desc: "Responds to every message in under 2 seconds — price inquiries, availability, directions, and more." },
            { title: "Order & Booking Management", desc: "Collects order details, confirms bookings, and sends reminders automatically — no staff required." },
            { title: "Broadcast Promotions", desc: "Send targeted promotions and updates to your entire customer list with a single click." },
            { title: "Catalog Sharing", desc: "Automatically sends your full product or service catalog when customers ask for it." },
            { title: "Human Handoff", desc: "When a conversation needs a human touch, the bot seamlessly transfers it to your team." },
          ]}
          tags={["Delivery Services", "Restaurants", "Online Shops", "Travel Agencies", "Pharmacies", "Repair Services"]}
          cta="Get Avtext WhatsApp"
          more={{ href: '/avtext-whatsapp', label: 'All about Avtext WhatsApp' }}
          reverse
        />

        {/* FAQ — the same text feeds the FAQPage JSON-LD in layout.tsx */}
        <section id="faq" className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-10 sm:mb-14">
              <span className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase mb-4 block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">
                AI Assistants / Receptionists in Albania, <span className="text-[var(--accent)]">Answered</span>
              </h2>
            </Reveal>
            <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {automationFaqs.map(({ question, answer }) => (
                <details key={question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-base sm:text-lg font-semibold text-[var(--text-heading)] [&::-webkit-details-marker]:hidden">
                    <h3>{question}</h3>
                    <svg className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="mt-3 pr-10 text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaCard>
          <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-white">
            Ready to <span className="text-[#8FABFF]">Automate?</span>
          </h2>
          <p className="text-base sm:text-xl text-[var(--card-navy-text)] mb-10 leading-relaxed">
            Tell us about your business and we&apos;ll build the right automation for you. Free consultation, no commitment.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97] text-base sm:text-lg"
          >
            <span>Start for Free</span>
            <ArrowRightIcon />
          </Link>
        </CtaCard>

        <SiteFooter tagline="Transforming businesses through innovative digital solutions & AI automations" />
      </PageShell>
    </MotionConfig>
  );
};

export default AutomationsPage;
