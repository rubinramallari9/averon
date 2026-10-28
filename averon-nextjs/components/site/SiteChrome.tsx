"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Shared chrome for the sub-pages (/automations, /avox, /our-work,
// /privacy-policy), matching the homepage redesign: white translucent nav
// with a hairline edge, inset gradient-mesh hero card, navy footer.

export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// Primary CTA — same blue pill as the homepage section CTAs. Presses down
// on :active so feedback lands on pointer-down, not on release.
export const primaryPill =
  "inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97] shadow-lg shadow-[#3E6AEF]/30";

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

export const SiteNav = ({ backHref, backLabel }: { backHref: string; backLabel: string }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-[var(--hairline)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16 sm:h-20">
        <Link href="/" aria-label="Averon Agency home">
          <Image
            src="/averon_logo_dark.png"
            alt="Averon Agency"
            width={560}
            height={160}
            className="w-32 sm:w-36 lg:w-40"
            priority
            quality={75}
          />
        </Link>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[var(--card-navy)] hover:bg-[#0E2A5C] text-white rounded-full text-sm font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97]"
        >
          <ArrowLeftIcon />
          <span>{backLabel}</span>
        </Link>
      </div>
    </div>
  </nav>
);

/* ------------------------------------------------------------------ */
/* Hero — inset gradient-mesh card, same as the homepage hero          */
/* ------------------------------------------------------------------ */

export const PageHero = ({ children, tall = false }: { children: React.ReactNode; tall?: boolean }) => (
  <section className="typography-a pt-20 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--page-bg)]">
    <div className="max-w-7xl mx-auto">
      <div
        className={`relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden hero-mesh px-5 sm:px-10 lg:px-16 ${
          tall ? 'pt-20 sm:pt-28 pb-20 sm:pb-28' : 'pt-16 sm:pt-24 pb-16 sm:pb-24'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full blur-[100px] sm:blur-[140px] animate-ambient-pulse-1" style={{ backgroundColor: '#3E6AEF' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[340px] h-[340px] rounded-full blur-[100px] sm:blur-[140px] animate-ambient-pulse-2" style={{ backgroundColor: '#6B8EFF' }} />
        </div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  </section>
);

export const HeroEyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 sm:mb-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs sm:text-sm font-semibold tracking-wider uppercase">
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/* Section header + scroll reveal                                      */
/* ------------------------------------------------------------------ */

export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    transition={{ duration: 0.6, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase mb-4 block">{children}</span>
);

/* ------------------------------------------------------------------ */
/* Closing CTA — navy card, like the homepage's navy service card      */
/* ------------------------------------------------------------------ */

export const CtaCard = ({ children }: { children: React.ReactNode }) => (
  <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
    <Reveal className="max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[var(--card-navy)] px-6 sm:px-12 py-14 sm:py-20 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full bg-[#3E6AEF]/30 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">{children}</div>
      </div>
    </Reveal>
  </section>
);

/* ------------------------------------------------------------------ */
/* Footer — same navy rounded-top card as the homepage                 */
/* ------------------------------------------------------------------ */

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const socialLinks = [
  { href: 'https://www.instagram.com/averonagency/', label: 'Instagram', icon: <InstagramIcon /> },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <LinkedinIcon /> },
  { href: 'https://facebook.com', label: 'Facebook', icon: <FacebookIcon /> },
];

const quickLinks = {
  en: [
    { href: '/#services', label: 'Services' },
    { href: '/automations', label: 'Automations' },
    { href: '/ai-receptionist-albania', label: 'AI Receptionist' },
    { href: '/our-work', label: 'Our Work' },
    { href: '/guides', label: 'Guides' },
    { href: '/about', label: 'About' },
    { href: '/sq/recepsionist-ai', label: 'Shqip' },
  ],
  sq: [
    { href: '/sq/recepsionist-ai', label: 'Recepsionist AI' },
    { href: '/sq/avox', label: 'Avox' },
    { href: '/sq/avtext-instagram', label: 'Avtext Instagram' },
    { href: '/sq/avtext-whatsapp', label: 'Avtext WhatsApp' },
    { href: '/guides/sa-kushton-recepsionist-ai', label: 'Sa kushton?' },
    { href: '/about', label: 'Rreth nesh (English)' },
  ],
};

const footerText = {
  en: { links: 'Quick Links', partners: 'Partners', rights: 'All rights reserved.', privacy: 'Privacy Policy' },
  sq: { links: 'Lidhje', partners: 'Partnerë', rights: 'Të gjitha të drejtat e rezervuara.', privacy: 'Politika e privatësisë' },
};

const partnerLinks = [
  { href: 'https://ramarasim.com', label: 'Rama Rasim' },
  { href: 'https://timetrader-kappa.vercel.app/', label: 'Time Trader' },
  { href: 'https://lumina.al', label: 'Lumina' },
  { href: 'https://arenarestaurant.al', label: 'Arena Restaurant' },
];

// `tagline` keeps each page's own footer copy (e.g. Avox's product line).
export const SiteFooter = ({ tagline, lang = 'en' }: { tagline: React.ReactNode; lang?: 'en' | 'sq' }) => (
  <footer className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="relative bg-[var(--card-navy)] rounded-t-[2rem] sm:rounded-t-[2.5rem] pt-10 sm:pt-12 pb-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3E6AEF]/50 to-transparent" />

        <div className="relative z-10 px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block">
                {/* The PNG is a 1024² square with the wordmark centered; crop to the wordmark */}
                <Image src="/averon_logobg.png" alt="Averon Agency" width={1024} height={1024} className="w-48 h-12 object-cover -ml-6 mb-4" quality={75} />
              </Link>
              <div className="text-[var(--card-navy-text)] text-sm leading-relaxed mb-6 max-w-md">{tagline}</div>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-10 h-10 text-white bg-white/5 hover:bg-[#3E6AEF]/50 rounded-lg transition-colors border border-white/10"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-base mb-4">{footerText[lang].links}</h3>
              <ul className="space-y-3">
                {quickLinks[lang].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[var(--card-navy-text)] hover:text-white text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-base mb-4">{footerText[lang].partners}</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {partnerLinks.map((p) => (
                  <li key={p.label}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-[var(--card-navy-text)] hover:text-white transition-colors">{p.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm text-white/50">© {new Date().getFullYear()} Averon Agency. {footerText[lang].rights}</p>
              <div className="flex gap-6 text-xs sm:text-sm">
                <Link href="/privacy-policy" className="text-white/50 hover:text-white transition-colors">{footerText[lang].privacy}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/* Page shell                                                          */
/* ------------------------------------------------------------------ */

// `lang` marks an Albanian page's content as Albanian (the <html> tag is "en").
export const PageShell = ({ children, lang }: { children: React.ReactNode; lang?: 'en' | 'sq' }) => (
  <div lang={lang} className="min-h-screen text-[var(--text-body)] relative w-full bg-[var(--page-bg)]">{children}</div>
);
