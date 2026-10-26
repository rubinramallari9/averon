"use client";

import React from 'react';
import Link from 'next/link';
import { MotionConfig } from 'framer-motion';
import InstagramChatDemo from '@/components/InstagramChatDemo';
import {
  PageShell, SiteNav, PageHero, HeroEyebrow, Reveal, CtaCard, SiteFooter,
  ArrowRightIcon, CheckIcon, primaryPill,
} from '@/components/site/SiteChrome';
import { MockPanel, MockStats, AvoxCallMock, PhoneGlyph } from '@/components/site/Mocks';
import { automationFaqs } from './faq';

type Feature = { title: string; desc: string };

// One product block: label + headline + copy + checklist + industries + CTA
// on one side, a live-looking mock on the other. `reverse` flips the sides
// on desktop so the page alternates; on mobile the copy always comes first.
const ProductSection = ({
  id,
  icon,
  iconClass,
  label,
  title,
  accent,
  description,
  features,
  tags,
  cta,
  visual,
  reverse = false,
}: {
  id: string;
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  title: string;
  accent: string;
  description: string;
  features: Feature[];
  tags: string[];
  cta: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) => (
  <section id={id} className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
      <Reveal className={reverse ? 'lg:order-2' : ''}>
        <div className="inline-flex items-center gap-3 mb-6">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${iconClass}`}>{icon}</div>
          <span className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase">{label}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-[var(--text-heading)]">
          {title}<span className="text-[var(--accent)]">{accent}</span>
        </h2>

        <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8">{description}</p>

        <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)] mb-8">
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-4 py-4">
              <span className="mt-0.5 w-6 h-6 rounded-full bg-[#3E6AEF]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <CheckIcon className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="text-[var(--text-heading)] !font-semibold text-[15px] mb-0.5">{feature.title}</p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-[var(--surface-light)] rounded-full text-[var(--text-heading)]/80 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        <Link href="/#contact" className={primaryPill}>
          {cta}
          <ArrowRightIcon />
        </Link>
      </Reveal>

      {/* Sticks beside the longer copy column on desktop so the mock stays in view */}
      <Reveal className={`lg:sticky lg:top-28 ${reverse ? 'lg:order-1' : ''}`} delay={0.1}>
        {visual}
      </Reveal>
    </div>
  </section>
);

const InstagramGlyph = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppGlyph = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramMock = () => (
  <MockPanel
    footer={
      <MockStats
        stats={[
          { label: "Avg. Response", value: "< 2s" },
          { label: "DMs Handled", value: "24/7" },
          { label: "Conversion", value: "+68%" },
        ]}
      />
    }
  >
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--hairline)]">
      <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
        <div className="w-full h-full rounded-full bg-white p-[2px]">
          <div className="w-full h-full rounded-full bg-[var(--surface-light)]" />
        </div>
      </div>
      <div>
        <p className="text-[var(--text-heading)] text-sm !font-semibold">your_business</p>
        <p className="text-[var(--text-muted)] text-xs">Instagram DM</p>
      </div>
    </div>
    <InstagramChatDemo />
  </MockPanel>
);

// WhatsApp's own light theme: beige wallpaper, green outgoing bubbles.
const WhatsAppMock = () => (
  <MockPanel
    footer={
      <MockStats
        stats={[
          { label: "Open Rate", value: "98%" },
          { label: "Response", value: "< 1s" },
          { label: "Orders Auto", value: "82%" },
        ]}
      />
    }
  >
    <div className="flex items-center gap-3 px-4 py-3 bg-[#F0F2F5] border-b border-[var(--hairline)]">
      <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
        <WhatsAppGlyph className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[var(--text-heading)] text-sm !font-semibold">Business WhatsApp</p>
        <p className="text-[#008069] text-xs flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
          Online
        </p>
      </div>
    </div>
    <div className="p-4 space-y-3 bg-[#EFEAE2]">
      <div className="flex justify-end">
        <div className="bg-[#D9FDD3] rounded-xl rounded-tr-sm px-3 py-2 max-w-[75%] shadow-sm">
          <p className="text-[#111B21] text-sm">Keni burgers ne menyu?</p>
          <p className="text-[#667781] text-xs mt-1 text-right">18:42 ✓✓</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
          <p className="text-[#111B21] text-sm">Po, kemi 6 lloje burgerash! 🍔</p>
          <p className="text-[#008069] text-sm !font-medium mt-1">📋 Shiko menunë tonë</p>
          <p className="text-[#111B21] text-sm mt-1">Doni të porosisni tani?</p>
          <p className="text-[#667781] text-xs mt-1">18:42 🤖</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-[#D9FDD3] rounded-xl rounded-tr-sm px-3 py-2 max-w-[60%] shadow-sm">
          <p className="text-[#111B21] text-sm">Po! 1x Cheeseburger</p>
          <p className="text-[#667781] text-xs mt-1 text-right">18:43 ✓✓</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
          <p className="text-[#111B21] text-sm">✅ Porosia u konfirmua!</p>
          <p className="text-[#008069] text-sm">Dërgesa në ~30 min</p>
          <p className="text-[#667781] text-xs mt-1">18:43 🤖</p>
        </div>
      </div>
    </div>
  </MockPanel>
);

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
          visual={<InstagramMock />}
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
          reverse
          visual={<WhatsAppMock />}
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
