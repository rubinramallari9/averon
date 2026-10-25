"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { apiClient } from '@/lib/api';
import {
  BLUR_ARENA_MOCKUP,
  BLUR_LUMINA_MOCKUP,
  BLUR_COMPUTERSTORE_MOCKUP,
  BLUR_CONSTRUCTION_MOCKUP,
  BLUR_JEWELRY_MOCKUP,
  BLUR_LUXURY_WATCH_MOCKUP,
  BLUR_REALESTATE_MOCKUP,
  BLUR_RAMARASIM_MOCKUP,
} from '@/lib/blurPlaceholders';

// ============================================
// INLINE SVG ICONS - Eliminates lucide-react chunk (~37KB savings)
// Only include icons actually used on initial render
// ============================================
const ArrowRightIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
));
ArrowRightIcon.displayName = 'ArrowRightIcon';

const MenuIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
));
MenuIcon.displayName = 'MenuIcon';

const XIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
));
XIcon.displayName = 'XIcon';

// Social icons - only loaded when footer is in view (below fold)
const InstagramIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
));
InstagramIcon.displayName = 'InstagramIcon';

const LinkedinIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
));
LinkedinIcon.displayName = 'LinkedinIcon';

const FacebookIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
));
FacebookIcon.displayName = 'FacebookIcon';

// ============================================
// STATIC DATA - No JSX at module level
// ============================================
const servicesData = [
  {
    iconType: 'zap',
    title: "AI Automations",
    description: "AI-powered automations that handle customer conversations, bookings, and follow-ups around the clock — so your team can focus on the work only humans can do.",
    tag: "AI",
  },
  {
    iconType: 'zap',
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies that convert visitors into customers.",
    tag: "WD",
  },
  {
    iconType: 'aieo',
    title: "SEO & AIEO",
    description: "We boost your organic Google rankings while structuring your site so ChatGPT, Perplexity, Claude, and Gemini recommend your business when customers ask AI assistants for services like yours.",
    tag: "SEO",
  },
  {
    iconType: 'terminal',
    title: "Website Redesign",
    description: "Whether you need a design refresh or a complete website overhaul, we analyze your site's pain points and opportunities to revitalize your digital presence.",
    tag: "WR",
  },
  {
    iconType: 'users',
    title: "Brand Design",
    description: "Compelling brand identities and visual experiences that resonate with your audience and stand out in the market.",
    tag: "BD",
  },
] as const;

// Client logos shown in the "Trusted By" strip
// Each logo's `heightClass` is individually calibrated (not shared) because the source
// marks aren't compositionally equivalent: lumina/timetrader are near-full-height wordmarks,
// while arena/rama-rasim are icon-over-wordmark lockups whose readable text only occupies
// ~28% / ~19% of the asset's own canvas (measured via per-row alpha content bands). Forcing
// all four to one fixed height made arena/rama-rasim's actual wordmarks read much smaller
// than lumina/timetrader despite identical bounding boxes. These values scale arena/rama-rasim
// up (~1.4x / ~1.5x the 28px/36px base) so their wordmark optical size matches the row.
const trustedLogosData = [
  {
    key: 'lumina',
    href: 'https://lumina.al',
    src: '/trusted_logos/logo-white.png',
    alt: 'Lumina Aesthetic',
    width: 1574,
    height: 597,
    heightClass: 'h-7 sm:h-9',
  },
  {
    key: 'arena',
    href: null,
    src: '/trusted_logos/arena-filxhani.png',
    alt: 'Arena Filxhani',
    width: 624,
    height: 486,
    heightClass: 'h-[39px] sm:h-[50px]',
  },
  {
    key: 'rama-rasim',
    href: 'https://ramarasim.com',
    src: '/trusted_logos/rasimramalogo.png',
    alt: 'Rasim Rama',
    width: 874,
    height: 553,
    heightClass: 'h-[42px] sm:h-[54px]',
  },
  {
    key: 'timetrader',
    href: 'https://timetrader-kappa.vercel.app/',
    src: '/trusted_logos/logo.svg',
    alt: 'TimeTrader',
    // The source SVG's viewBox was tightened from "0 0 280 48" to "25 0 231 48"
    // (its <text> glyph only spans x=31–250 of the old 280-wide canvas — ~61px
    // of built-in transparent padding, confirmed via getBBox()). These width/
    // height props must match that new viewBox ratio: Next/Image sets them as
    // explicit HTML width/height attributes, which the browser uses as the
    // image's intrinsic aspect ratio for `w-auto` sizing — if these still said
    // 280/48, the old padding would just reappear as SVG letterboxing instead.
    width: 231,
    height: 48,
    heightClass: 'h-7 sm:h-9',
  },
] as const;

// Slides for the Automations 3D coverflow carousel (bland.ai hero pattern)
const automationSlidesData = [
  {
    key: 'avox',
    industry: 'Voice AI',
    title: 'Avox',
    description: 'An AI receptionist that answers calls, books appointments, and handles FAQs in Albanian and English — never misses a customer.',
    orbBase: 'radial-gradient(circle at 35% 30%, #DCE6FF 0%, #5C84F5 35%, #15245C 85%)',
    blobA: 'radial-gradient(circle, #B9CBFF 0%, transparent 70%)',
    blobB: 'radial-gradient(circle, #15245C 0%, transparent 70%)',
  },
  {
    key: 'dm-bot',
    industry: 'Instagram',
    title: 'DM Bot',
    description: 'Auto-reply to DMs and comments instantly. Capture leads, send product catalogs, and convert followers into customers — 24/7.',
    orbBase: 'radial-gradient(circle at 35% 30%, #FFD9C2 0%, #E1306C 40%, #4A1457 85%)',
    blobA: 'radial-gradient(circle, #F77737 0%, transparent 70%)',
    blobB: 'radial-gradient(circle, #833AB4 0%, transparent 70%)',
  },
  {
    key: 'whatsapp-bot',
    industry: 'WhatsApp',
    title: 'WhatsApp Bot',
    description: "Automate customer service on Albania's most-used messaging app. Handle orders, bookings, and support without lifting a finger.",
    orbBase: 'radial-gradient(circle at 35% 30%, #D9FFE8 0%, #25D366 40%, #0B4A28 85%)',
    blobA: 'radial-gradient(circle, #B4FFD2 0%, transparent 70%)',
    blobB: 'radial-gradient(circle, #0B4A28 0%, transparent 70%)',
  },
];

// Our Work showcase grid — client project mockups. `orientation` drives the
// grid cell shape (portrait phone mockups vs. landscape browser mockups),
// `blur` reuses the site's existing blurDataURL placeholder constants.
const workShowcaseData = [
  { key: 'arena', label: 'Arena Restaurant', src: '/images/arena-mockup.webp', alt: 'Arena Cocktail & Restaurant website', width: 320, height: 480, orientation: 'vertical' as const, blur: BLUR_ARENA_MOCKUP },
  { key: 'lumina', label: 'Lumina Aesthetic', src: '/images/lumina-mockup.webp', alt: 'Lumina Aesthetic Salon & Clinic website', width: 600, height: 400, orientation: 'horizontal' as const, blur: BLUR_LUMINA_MOCKUP },
  { key: 'watch', label: 'Luxury Watches', src: '/images/luxury-watch-mockup.webp', alt: 'Luxury watch e-commerce app', width: 320, height: 480, orientation: 'vertical' as const, blur: BLUR_LUXURY_WATCH_MOCKUP },
  { key: 'jewelry', label: 'LUXE Jewelry', src: '/images/jewelry-mockup.webp', alt: 'LUXE — jewelry store website', width: 600, height: 400, orientation: 'horizontal' as const, blur: BLUR_JEWELRY_MOCKUP },
  { key: 'ramarasim', label: 'Rasim Rama', src: '/images/ramarasim-mockup.webp', alt: 'Rasim Rama — hydropower engineering website', width: 600, height: 400, orientation: 'horizontal' as const, blur: BLUR_RAMARASIM_MOCKUP },
  { key: 'construction', label: 'BuildPro', src: '/images/construction-mockup.webp', alt: 'BuildPro — construction services app', width: 320, height: 480, orientation: 'vertical' as const, blur: BLUR_CONSTRUCTION_MOCKUP },
  { key: 'computerstore', label: "Tech'Store", src: '/images/computerstore-mockup.webp', alt: "Tech'Store — electronics website", width: 600, height: 400, orientation: 'horizontal' as const, blur: BLUR_COMPUTERSTORE_MOCKUP },
  { key: 'realestate', label: 'Real Estate', src: '/images/realestate-mockup.webp', alt: 'Real estate listings app', width: 320, height: 480, orientation: 'vertical' as const, blur: BLUR_REALESTATE_MOCKUP },
];

type TrustedLogo = typeof trustedLogosData[number];

const TrustedLogoCard = memo(({ logo }: { logo: TrustedLogo }) => {
  const className = "group flex-shrink-0 flex items-center justify-center px-1";

  const image = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={`${logo.heightClass} w-auto object-contain invert opacity-60 group-hover:opacity-100 transition-all duration-300`}
    />
  );

  if (logo.href) {
    return (
      <a href={logo.href} target="_blank" rel="noopener noreferrer" className={className}>
        {image}
      </a>
    );
  }
  return <div className={className}>{image}</div>;
});
TrustedLogoCard.displayName = 'TrustedLogoCard';

// ============================================
// MEMOIZED COMPONENTS
// ============================================

const AveronLogo = memo(({ className = "w-40", variant = "light" }: { className?: string; variant?: "light" | "dark" }) => (
  <Image
    src={variant === "dark" ? "/averon_logo_dark.png" : "/averon_logobg.png"}
    alt="Averon Agency"
    width={560}
    height={160}
    className={className}
    priority
    quality={75}
  />
));
AveronLogo.displayName = 'AveronLogo';

// Synthflow-style radial hub ("One Agent for Every Conversation"): one
// flagship hub centered, the agents arranged as spokes in a ring — no
// connecting lines, just position within concentric circles.
const PhoneIcon = memo(() => (
  <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
));
PhoneIcon.displayName = 'PhoneIcon';

const WhatsAppIcon = memo(() => (
  <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
));
WhatsAppIcon.displayName = 'WhatsAppIcon';

const agentsHubData = [
  { key: 'avox', label: 'Voice', icon: <PhoneIcon /> },
  { key: 'dm-bot', label: 'Instagram', icon: <InstagramIcon /> },
  { key: 'whatsapp-bot', label: 'WhatsApp', icon: <WhatsAppIcon /> },
] as const;
const AGENTS_HUB_SPOKE_POS = [
  { left: '50%', top: '10%' },
  { left: '85%', top: '68%' },
  { left: '15%', top: '68%' },
];

const RadialAgentsHub = memo(() => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div className="absolute inset-[4%] rounded-full border border-[var(--hairline)]" aria-hidden="true" />
      <div className="absolute inset-[22%] rounded-full border border-[var(--hairline)]" aria-hidden="true" />

      {agentsHubData.map((agent, i) => (
        <div
          key={agent.key}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={AGENTS_HUB_SPOKE_POS[i]}
        >
          <div
            role="img"
            aria-label={agent.label}
            className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-white text-[#3E6AEF] shadow-md"
          >
            {agent.icon}
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-white shadow-md">
          <Image
            src="/averon_a_mark.png"
            alt="Averon AI"
            width={252}
            height={255}
            className="h-10 w-auto sm:h-12"
          />
        </div>
      </div>
    </div>
  </div>
));
RadialAgentsHub.displayName = 'RadialAgentsHub';

// ============================================
// LAZY LOADED COMPONENTS
// ============================================
const ServiceModal = dynamic(() => import('@/components/ServiceModal'), {
  loading: () => null,
  ssr: false,
});

// ============================================
// FADE-IN SCROLL REVEAL - animates only transform/opacity via a
// native IntersectionObserver + CSS transition (no animation library).
// Respects prefers-reduced-motion, runs once per element.
// ============================================
const FadeIn = memo(({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frame = requestAnimationFrame(() => {
        setReducedMotion(true);
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // A fast scroll/fling can carry the element past the viewport
        // between two observer callbacks, so isIntersecting never fires
        // true and the content is stuck at opacity 0 forever. Treat
        // "already scrolled past entirely" the same as "was seen
        // intersecting" so it still reveals.
        const passedAbove = entry.boundingClientRect.bottom < 0;
        if (entry.isIntersecting || passedAbove) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '200px 0px -5% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : `translateY(${y}px)`,
        transition: reducedMotion
          ? 'none'
          : `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
});
FadeIn.displayName = 'FadeIn';

// ============================================
// SERVICE CARD - sticky-stack card with a spring-eased entrance
// Native `position: sticky` handles the "next card covers the previous
// one" stacking (matches Retell's mechanism exactly, scroll-linked,
// no transition needed there). On top of that, each card's own content
// rises/settles into place with a damped spring as it scrolls into
// view, so the motion reads as clearly animated instead of an instant,
// 1:1-with-scroll swap.
// ============================================
const ServiceCard = memo(({ service, index }: { service: { iconType: string; title: string; description: string; tag: string }; index: number }) => {
  // Entrance animation uses the same IntersectionObserver + CSS transition
  // pattern as FadeIn — a one-shot, non-scroll-linked transition. (Earlier
  // in this file's history the real bug turned out to be an unrelated
  // `overflow-x-hidden` on the page's root wrapper div making it an
  // unintended, never-scrolling "scroll container" that every sticky
  // descendant on the page was silently anchored to instead of the
  // viewport — fixed where that wrapper is defined, not here.)
  const innerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const passedAbove = entry.boundingClientRect.bottom < 0;
        if (entry.isIntersecting || passedAbove) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '200px 0px -5% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Retell-style 3-tone cycle: light surface, navy, brand blue
  const variant = index % 3;
  const bgClass =
    variant === 0 ? 'bg-[var(--surface-light)]' : variant === 1 ? 'bg-[var(--card-navy)]' : 'bg-[var(--card-blue)]';
  const labelColorClass = variant === 0 ? 'text-[var(--text-muted)]' : variant === 1 ? 'text-white/60' : 'text-white/70';
  const titleColorClass = variant === 0 ? 'text-[var(--text-heading)]' : 'text-white';
  const bodyColorClass =
    variant === 0 ? 'text-[var(--text-muted)]' : variant === 1 ? 'text-[var(--card-navy-text)]' : 'text-[var(--card-blue-text)]';
  const numberColorClass = variant === 0 ? 'text-black/[0.04]' : 'text-white/[0.06]';
  const quoteMarkColorClass = variant === 0 ? 'text-[var(--accent)]/40' : 'text-white/35';
  const ctaClass =
    variant === 0
      ? 'bg-[var(--text-heading)] text-white hover:bg-[var(--text-heading)]/85'
      : 'bg-white text-[var(--text-heading)] hover:bg-white/85';

  return (
    // The outer div owns the sticky positioning (every card shares the
    // identical `top`, flush against the next with zero gap, incrementing
    // z-index). The inner div owns the one-shot entrance transition.
    <div className="sticky" style={{ top: '96px', zIndex: index + 1 }}>
      <div
        ref={innerRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(56px) scale(0.95)',
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'opacity, transform',
        }}
        className={`relative min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] flex items-center rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden px-6 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 shadow-2xl shadow-black/10 ${bgClass}`}
      >
        {/* Giant watermark tag anchors the right side of the card — the
            same compositional role retell's testimonial cards give a
            customer photo, without faking imagery Averon doesn't have.
            A short content-tied abbreviation (WD/SEO/WR/BD/AI) reads as
            more deliberate than a plain index number. */}
        <div
          className={`absolute right-2 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 text-[90px] sm:text-[150px] lg:text-[190px] font-bold select-none pointer-events-none leading-none tracking-tight ${numberColorClass}`}
          style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
          aria-hidden="true"
        >
          {service.tag}
        </div>

        <div className="relative w-full max-w-xl text-center lg:text-left">
          <span
            className={`${quoteMarkColorClass} block text-6xl sm:text-7xl leading-none mb-2 sm:mb-3 select-none font-bold`}
            style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <span className={`${labelColorClass} text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 block`}>
            Service 0{index + 1}
          </span>
          <h3
            className={`${titleColorClass} text-3xl sm:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 leading-[1.05] tracking-tight`}
            style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
          >
            {service.title}
          </h3>
          <p
            className={`${bodyColorClass} text-lg sm:text-xl lg:text-2xl leading-snug mb-6 sm:mb-8`}
            style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif', fontWeight: 400 }}
          >
            {service.description}
          </p>
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-colors duration-200 ${ctaClass}`}
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
});
ServiceCard.displayName = 'ServiceCard';

// ============================================
// AUTOMATIONS CAROUSEL - 3D "page-flip" coverflow
// Matches bland.ai's hero card-stack interaction: one active card
// centered and flat, prev/next cards peeking at the sides rotated in
// 3D via perspective + rotateY, with circular arrow nav. bland.ai's
// own cards use a WebGL canvas for the colorful orb animation — that's
// out of scope here, so each card gets a CSS gradient orb instead,
// matching the color feel (and bland's own `brightness(0.9) saturate(1.8)`
// filter) without the shader.
// ============================================
type AutomationSlide = {
  key: string;
  industry: string;
  title: string;
  description: string;
  orbBase: string;
  blobA: string;
  blobB: string;
};

const AutomationsCarousel = memo(({ slides }: { slides: AutomationSlide[] }) => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const go = useCallback((dir: 1 | -1) => {
    setCurrent((c) => (c + dir + total) % total);
  }, [total]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative mx-auto h-[460px] w-full max-w-[1000px]" style={{ perspective: '1400px' }}>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous automation"
          className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#151515] transition-colors hover:bg-[#F6F6F1] sm:left-2 lg:left-6"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next automation"
          className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#151515] transition-colors hover:bg-[#F6F6F1] sm:right-2 lg:right-6"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {slides.map((slide, index) => {
          let offset = (index - current + total) % total;
          if (offset > total / 2) offset -= total;
          const isActive = offset === 0;
          const hidden = Math.abs(offset) > 1;

          return (
            <button
              key={slide.key}
              type="button"
              onClick={() => !isActive && setCurrent(index)}
              aria-label={`Show ${slide.title}`}
              aria-hidden={hidden}
              tabIndex={hidden ? -1 : 0}
              style={{
                transform: `translate(-50%, 0) translateX(${offset * 165}px) rotateY(${offset * -26}deg) scale(${isActive ? 1 : 0.86})`,
                transformOrigin: offset < 0 ? 'right center' : offset > 0 ? 'left center' : 'center center',
                zIndex: isActive ? 3 : 2 - Math.abs(offset),
                opacity: hidden ? 0 : isActive ? 1 : 0.55,
                pointerEvents: hidden ? 'none' : 'auto',
                transformStyle: 'preserve-3d',
              }}
              className="absolute left-1/2 top-0 w-[300px] sm:w-[360px] transition-all duration-500 ease-out cursor-pointer"
            >
              <div
                className={`flex h-[420px] flex-col items-center justify-between rounded-md border bg-[#F6F6F1] p-8 text-left transition-shadow duration-500 ${
                  isActive ? 'border-black/10 shadow-xl shadow-black/5' : 'border-black/5 shadow-sm'
                }`}
              >
                <div className="flex flex-1 items-center justify-center">
                  <div className="relative flex h-[180px] w-[180px] items-center justify-center">
                    {/* outer rim light */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.5) inset, 0 10px 34px -10px rgba(0,0,0,0.35)' }}
                    />
                    {/* clipped liquid sphere: base shading + two drifting color blobs + a moving sheen */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-full"
                      style={{ background: slide.orbBase, filter: 'brightness(0.95) saturate(1.5)' }}
                    >
                      <div className="animate-orb-drift-a absolute inset-[-20%]" style={{ background: slide.blobA }} />
                      <div className="animate-orb-drift-b absolute inset-[-20%]" style={{ background: slide.blobB }} />
                      <div
                        className="animate-orb-sheen absolute inset-[10%] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.65) 0%, transparent 70%)' }}
                      />
                    </div>
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow">
                      <svg className="ml-0.5 h-4 w-4 text-[#151515]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#151515]/60">
                    {slide.industry}
                  </span>
                  <span className="block text-2xl font-semibold tracking-tight text-[#151515]">
                    {slide.title}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});
AutomationsCarousel.displayName = 'AutomationsCarousel';

// ============================================
// PROCESS SECTION — scroll-drawn flowchart
// One connected flowchart of all three stages. It draws itself as the page
// scrolls: each edge draws from top to bottom where the reader is looking,
// and nodes, chips and cards settle in as the line reaches them.
// ============================================
type ProcessHighlight = { label: string; value: string };
type ProcessStep = {
  number: string;
  title: string;
  description: string;
  accent: string;
  highlights: ProcessHighlight[];
  branches: string[];
  icon: React.ReactNode;
};

const processStepsData: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business, goals, and target audience to craft the perfect strategy.',
    accent: '#3E6AEF',
    highlights: [
      { label: 'Strategy call booked', value: '30 min' },
      { label: 'Goals & audience mapped', value: '100%' },
    ],
    branches: ['Goals', 'Audience', 'Competitors'],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design & Build',
    description: 'Our team creates stunning designs and develops robust solutions using the latest technologies.',
    accent: '#2F55D0',
    highlights: [
      { label: 'Design reviewed with you', value: 'Always' },
      { label: 'Built & QA tested', value: 'Every release' },
    ],
    branches: ['UI Design', 'Development', 'Testing'],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Launch & Grow',
    description: 'We launch your project and continue optimizing for maximum performance and growth.',
    accent: '#15245C',
    highlights: [
      { label: 'Live & monitored', value: '24/7' },
      { label: 'Ongoing optimization', value: 'Monthly' },
    ],
    branches: ['Launch', 'Monitor', 'Optimize'],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25a14.98 14.98 0 00-6.16 12.12m12.12 0a14.98 14.98 0 01-12.12 0m12.12 0v4.8m-12.12-4.8a6 6 0 005.84 7.38m-5.84-7.38H4.5" />
      </svg>
    ),
  },
];

const PROCESS_PANEL_WIDTH = 560;
const PROCESS_PANEL_HEIGHT = 1240;
// Node centers in the diagram's own coordinate space — a zigzag so the
// flow reads as one deliberate path rather than a straight stack.
const PROCESS_NODE_POS = [
  { x: 180, y: 170 },
  { x: 380, y: 546 },
  { x: 180, y: 922 },
];
const PROCESS_NODE_R = 40;
const PROCESS_PILL_DY = 78;
const PROCESS_JUNCTION_DY = 112;
const PROCESS_CHIP_DY = 152;
const PROCESS_CHIP_OFFSETS = [-110, 0, 110];
const PROCESS_CARD_TOP_DY = 202;
const PROCESS_CARD_H = 76;

function processStageLayout(nx: number, ny: number) {
  return {
    node: { x: nx, y: ny },
    pill: { x: nx, y: ny + PROCESS_PILL_DY },
    junction: { x: nx, y: ny + PROCESS_JUNCTION_DY },
    chips: PROCESS_CHIP_OFFSETS.map((off) => ({ x: nx + off, y: ny + PROCESS_CHIP_DY })),
    cardTop: { x: nx, y: ny + PROCESS_CARD_TOP_DY },
    cardBottom: { x: nx, y: ny + PROCESS_CARD_TOP_DY + PROCESS_CARD_H },
  };
}

const CheckIcon = memo(() => (
  <svg className="h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';

// Every connector and element in drawing order, with the vertical range
// (in diagram coordinates) it occupies. The scroll animation uses these
// ranges to draw each edge exactly where the reader is looking.
type ProcessPathSpec = { d: string; y0: number; y1: number; main: boolean };
type ProcessElSpec = { key: string; y: number };

const PROCESS_LAYOUTS = PROCESS_NODE_POS.map((pos) => processStageLayout(pos.x, pos.y));

const PROCESS_PATHS: ProcessPathSpec[] = PROCESS_LAYOUTS.flatMap((l, i) => {
  const paths: ProcessPathSpec[] = [
    { d: `M${l.node.x},${l.node.y + PROCESS_NODE_R} L${l.junction.x},${l.junction.y - 2}`, y0: l.node.y + PROCESS_NODE_R, y1: l.junction.y, main: true },
    ...l.chips.map((chip) => ({
      d: `M${l.junction.x},${l.junction.y} Q${l.junction.x},${chip.y - 22} ${chip.x},${chip.y - 19}`,
      y0: l.junction.y,
      y1: chip.y - 19,
      main: false,
    })),
    { d: `M${l.junction.x},${l.junction.y} L${l.cardTop.x},${l.cardTop.y - 2}`, y0: l.junction.y, y1: l.cardTop.y, main: true },
  ];
  const next = PROCESS_LAYOUTS[i + 1];
  if (next) {
    paths.push({
      d: `M${l.cardBottom.x},${l.cardBottom.y} C${l.cardBottom.x},${l.cardBottom.y + 70} ${next.node.x},${next.node.y - 90} ${next.node.x},${next.node.y - PROCESS_NODE_R - 2}`,
      y0: l.cardBottom.y,
      y1: next.node.y - PROCESS_NODE_R,
      main: true,
    });
  }
  return paths;
});

const PROCESS_ELS: ProcessElSpec[] = PROCESS_LAYOUTS.flatMap((l, i) => [
  { key: `node-${i}`, y: l.node.y - PROCESS_NODE_R },
  { key: `pill-${i}`, y: l.pill.y - 18 },
  ...l.chips.map((chip, ci) => ({ key: `chip-${i}-${ci}`, y: chip.y - 16 })),
  { key: `card-${i}`, y: l.cardTop.y },
]);

// How far below an element's top the "pen" must travel before it's fully in.
const PROCESS_EL_REVEAL = 56;
// Where the pen sits in the viewport — a little below centre, where the eye rests while scrolling.
const PROCESS_PEN_VIEWPORT = 0.68;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// The flowchart draws itself as you scroll. Progress is tied 1:1 to scroll
// position (no timers, no easing toward a target), so it tracks the scrollbar
// directly, reverses when you scroll back up, and is never "mid-animation"
// out of sync with the page. Styles are written straight to the DOM inside one
// rAF per frame — React never re-renders while scrolling. With reduced motion
// on, it renders fully drawn and static.
const ProcessFlowchart = memo(({ onPen }: { onPen?: (pen: number) => void }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const penHeadRef = useRef<SVGGElement>(null);
  const onPenRef = useRef(onPen);
  useEffect(() => { onPenRef.current = onPen; }, [onPen]);
  const elRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [scale, setScale] = useState(1);

  // Fit the fixed-size 560px diagram to narrow screens by scaling it as one unit,
  // so chips, cards and SVG edges always stay pixel-aligned with each other.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / PROCESS_PANEL_WIDTH));
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const render = () => {
      raf = 0;
      const rect = inner.getBoundingClientRect();
      const s = rect.width / PROCESS_PANEL_WIDTH || 1;
      // the pen's position in diagram coordinates. The step text always follows
      // it; the drawing only does when motion is allowed.
      const scrollPen = (window.innerHeight * PROCESS_PEN_VIEWPORT - rect.top) / s;
      const pen = reduced ? Infinity : scrollPen;
      onPenRef.current?.(scrollPen);
      let head: { x: number; y: number } | null = null;

      PROCESS_PATHS.forEach((spec, i) => {
        const el = pathRefs.current[i];
        if (!el) return;
        const f = clamp01((pen - spec.y0) / Math.max(1, spec.y1 - spec.y0));
        el.style.strokeDashoffset = String(1 - f);
        // arrowhead only once the edge has actually arrived
        el.setAttribute('marker-end', f > 0.97 ? 'url(#process-arrow)' : 'none');
        // the main-flow edge currently being drawn carries the pen head at its tip
        if (spec.main && f > 0 && f < 1) {
          const pt = el.getPointAtLength(f * el.getTotalLength());
          head = { x: pt.x, y: pt.y };
        }
      });

      const headEl = penHeadRef.current;
      const tip = head as { x: number; y: number } | null; // assigned inside the forEach above
      if (headEl) {
        headEl.style.opacity = tip ? '1' : '0';
        if (tip) headEl.setAttribute('transform', `translate(${tip.x} ${tip.y})`);
      }

      PROCESS_ELS.forEach((spec) => {
        const el = elRefs.current[spec.key];
        if (!el) return;
        const t = clamp01((pen - spec.y) / PROCESS_EL_REVEAL);
        // ease-out so elements settle rather than stop dead
        const e = 1 - (1 - t) * (1 - t);
        el.style.opacity = String(e);
        el.style.transform = `translate(-50%, ${(1 - e) * 14}px) scale(${0.94 + 0.06 * e})`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const toPct = (x: number, y: number) => ({
    left: `${(x / PROCESS_PANEL_WIDTH) * 100}%`,
    top: `${(y / PROCESS_PANEL_HEIGHT) * 100}%`,
  });
  // hidden until the scroll handler's first pass reveals what's already in view
  const hiddenStyle = { opacity: 0, transform: 'translate(-50%, 14px) scale(0.94)', transformOrigin: 'top center', willChange: 'transform, opacity' } as const;

  return (
    <div ref={wrapRef} className="mx-auto w-full" style={{ maxWidth: PROCESS_PANEL_WIDTH, height: PROCESS_PANEL_HEIGHT * scale }}>
      <div
        ref={innerRef}
        className="relative origin-top-left"
        style={{ width: PROCESS_PANEL_WIDTH, height: PROCESS_PANEL_HEIGHT, transform: `scale(${scale})` }}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${PROCESS_PANEL_WIDTH} ${PROCESS_PANEL_HEIGHT}`} aria-hidden="true">
          <defs>
            <marker id="process-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill="#9FB7E3" />
            </marker>
          </defs>
          {/* the whole route, faint and dotted, so you can see where the line is heading */}
          {PROCESS_PATHS.map((spec, i) => (
            <path key={`track-${i}`} d={spec.d} fill="none" stroke="#B9CDEF" strokeOpacity={0.55} strokeWidth={spec.main ? 2 : 1.5} strokeDasharray="1 7" strokeLinecap="round" />
          ))}
          {PROCESS_PATHS.map((spec, i) => (
            <path
              key={i}
              ref={(el) => { pathRefs.current[i] = el; }}
              d={spec.d}
              pathLength={1}
              fill="none"
              stroke={spec.main ? '#B9CDEF' : '#C3D4F0'}
              strokeWidth={spec.main ? 3 : 2}
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          ))}
          {/* the pen head: marks where the line is being drawn right now */}
          <g ref={penHeadRef} style={{ opacity: 0, transition: 'opacity 150ms ease-out' }}>
            <circle r={9} fill="#3E6AEF" fillOpacity={0.15} />
            <circle r={4} fill="#3E6AEF" />
          </g>
        </svg>

        {processStepsData.map((step, index) => {
          const l = PROCESS_LAYOUTS[index];
          return (
            <React.Fragment key={step.number}>
              {/* the node badge is centred on its point, so offset by half its height (40px) */}
              <div
                ref={(el) => { elRefs.current[`node-${index}`] = el; }}
                className="absolute"
                style={{ ...toPct(l.node.x, l.node.y - PROCESS_NODE_R), ...hiddenStyle }}
              >
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <div className="absolute h-20 w-20 rounded-full" style={{ border: `1px solid ${step.accent}25` }} aria-hidden="true" />
                  <div className="absolute h-14 w-14 rounded-full" style={{ border: `1px solid ${step.accent}40` }} aria-hidden="true" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md" style={{ color: step.accent }}>
                    {step.icon}
                  </div>
                </div>
              </div>

              <div
                ref={(el) => { elRefs.current[`pill-${index}`] = el; }}
                className="absolute whitespace-nowrap rounded-full border bg-white px-5 py-2.5 text-base font-semibold shadow-sm"
                style={{ ...toPct(l.pill.x, l.pill.y - 22), borderColor: `${step.accent}30`, color: step.accent, ...hiddenStyle }}
              >
                {step.title}
              </div>

              {step.branches.map((branch, ci) => (
                <div
                  key={branch}
                  ref={(el) => { elRefs.current[`chip-${index}-${ci}`] = el; }}
                  className="absolute whitespace-nowrap rounded-md border bg-white px-3 py-1.5 text-sm font-medium shadow-sm"
                  style={{ ...toPct(l.chips[ci].x, l.chips[ci].y - 16), borderColor: `${step.accent}20`, color: '#151515', ...hiddenStyle }}
                >
                  {branch}
                </div>
              ))}

              <div
                ref={(el) => { elRefs.current[`card-${index}`] = el; }}
                className="absolute flex w-[280px] items-center gap-3.5 rounded-md border border-black/5 bg-white p-4 shadow-sm"
                style={{ ...toPct(l.cardTop.x, l.cardTop.y), ...hiddenStyle }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: `${step.accent}12`, color: step.accent }}
                >
                  {step.highlights[0].value}
                </div>
                <div className="flex flex-col gap-1">
                  {step.highlights.map((h) => (
                    <div key={h.label} className="flex items-center gap-1.5 text-xs font-medium leading-tight text-[#151515]/70">
                      <CheckIcon />
                      {h.label}
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});
ProcessFlowchart.displayName = 'ProcessFlowchart';

// Panel's vertical padding at sm+ (py-16). The desktop step text is lined up
// against the flowchart inside the same padded box.
const PROCESS_PANEL_PAD = 64;

// Phones get the flowchart alone. From `lg` up, each stage's text sits in a
// column beside the flowchart, level with its stage's node, and highlights
// while it's in the middle of the viewport.
// How emphasised step `i`'s text is for a given pen position: it rises as the
// pen nears that stage's node and falls as the pen nears the next stage's node,
// so exactly one step is in focus at a time, crossfading as you scroll.
const PROCESS_TEXT_FADE = 90;
function processStepEmphasis(i: number, pen: number) {
  const start = PROCESS_LAYOUTS[i].node.y - PROCESS_NODE_R - PROCESS_TEXT_FADE;
  const rise = i === 0 ? 1 : clamp01((pen - start) / PROCESS_TEXT_FADE);
  const next = PROCESS_LAYOUTS[i + 1];
  const fall = next ? clamp01((pen - (next.node.y - PROCESS_NODE_R - PROCESS_TEXT_FADE)) / PROCESS_TEXT_FADE) : 0;
  return rise * (1 - fall);
}

// Phones get the flowchart alone. From `lg` up, each stage's text sits in a
// column beside the flowchart, level with its stage's node. Its emphasis is
// driven by the same pen as the drawing, so text and chart never disagree.
const ProcessScrollSection = memo(() => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handlePen = useCallback((pen: number) => {
    processStepsData.forEach((_, i) => {
      const w = processStepEmphasis(i, pen);
      const step = stepRefs.current[i];
      if (step) step.style.opacity = String(0.35 + 0.65 * w);
      const badge = badgeRefs.current[i];
      if (badge) badge.style.opacity = String(w);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
      <div className="relative hidden lg:block">
        {processStepsData.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => { stepRefs.current[index] = el; }}
            className="absolute inset-x-0 flex flex-col gap-3"
            style={{
              top: `calc(${PROCESS_PANEL_PAD}px + ${(PROCESS_LAYOUTS[index].node.y - PROCESS_NODE_R) / PROCESS_PANEL_HEIGHT} * (100% - ${PROCESS_PANEL_PAD * 2}px))`,
              opacity: index === 0 ? 1 : 0.35,
            }}
          >
            {/* muted badge underneath, accent badge on top fading in with emphasis */}
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-light)] text-sm font-semibold text-[var(--text-muted)]">
              {index + 1}
              <span
                ref={(el) => { badgeRefs.current[index] = el; }}
                className="absolute inset-0 flex items-center justify-center rounded-full text-white"
                style={{ backgroundColor: step.accent, opacity: index === 0 ? 1 : 0 }}
                aria-hidden="true"
              >
                {index + 1}
              </span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-heading)]">{step.title}</h3>
            <p className="text-[var(--text-muted)] text-base leading-relaxed max-w-md">{step.description}</p>
            <ul className="flex flex-col gap-1.5">
              {step.highlights.map((h) => (
                <li key={h.label} className="flex items-center gap-2 text-sm text-[var(--text-heading)]">
                  <CheckIcon />
                  <span className="font-medium">{h.label}</span>
                  <span className="text-[var(--text-muted)]">· {h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[2rem] px-4 py-12 sm:px-8 sm:py-16">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 15% 0%, #EAF2FC 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 100% 100%, #DCE9FB 0%, transparent 55%), #E4EEFB',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: 'radial-gradient(circle, #9DB9E8 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          aria-hidden="true"
        />
        <div className="relative">
          <ProcessFlowchart onPen={handlePen} />
        </div>
      </div>
    </div>
  );
});
ProcessScrollSection.displayName = 'ProcessScrollSection';

// ============================================
// MAIN COMPONENT
// ============================================
const AveronWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceCard, setActiveServiceCard] = useState<number | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    email: '',
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Disable scrolling when service card is active
  useEffect(() => {
    if (activeServiceCard !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeServiceCard]);

  // Memoized handlers
  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await apiClient.submitContact(contactForm);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We\'ll get back to you soon.',
      });
      setContactForm({ email: '', name: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [contactForm]);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="min-h-screen text-[var(--text-body)] relative w-full bg-[var(--page-bg)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-[var(--hairline)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
            >
              <AveronLogo variant="dark" className="w-32 sm:w-36 lg:w-40" />
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] transition-colors">
                Services
              </a>
              <Link href="/automations" className="text-sm font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] transition-colors">
                Automations
              </Link>
              <a href="#work" className="text-sm font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] transition-colors">
                Our Work
              </a>
              <a
                href="#process-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('process-section');
                }}
                className="text-sm font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] transition-colors"
              >
                Process
              </a>
              <a href="#agents" className="text-sm font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] transition-colors">
                Agents
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="hidden sm:inline-flex items-center px-5 py-2.5 bg-[var(--card-navy)] hover:bg-[#0E2A5C] text-white rounded-full text-sm font-semibold transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors text-[var(--text-heading)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2 border-t border-[var(--hairline)] mt-2">
              <a
                href="#services"
                className="block px-4 py-2 text-base font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] hover:bg-black/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Services
              </a>
              <Link
                href="/automations"
                className="block px-4 py-2 text-base font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] hover:bg-black/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Automations
              </Link>
              <Link
                href="/our-work"
                className="block px-4 py-2 text-base font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] hover:bg-black/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Our Work
              </Link>
              <a
                href="#process-section"
                className="block px-4 py-2 text-base font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] hover:bg-black/5 rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  scrollToSection('process-section');
                }}
              >
                Process
              </a>
              <a
                href="#agents"
                className="block px-4 py-2 text-base font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] hover:bg-black/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Agents
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-base font-medium text-[var(--text-heading)]/80 hover:text-[var(--accent)] hover:bg-black/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="typography-a pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative bg-[var(--page-bg)]">
        <div className="max-w-7xl mx-auto">
          {/* Inset gradient-mesh hero card */}
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden hero-mesh px-4 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-16 sm:pb-24">
            {/* Ambient Glow Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] sm:blur-[150px] animate-ambient-pulse-1"
                style={{ backgroundColor: '#3E6AEF' }}
              />
              <div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] sm:blur-[150px] animate-ambient-pulse-2"
                style={{ backgroundColor: '#6B8EFF' }}
              />
            </div>

            {/* Main Content - No framer-motion, uses CSS animations */}
            <div className="max-w-5xl mx-auto relative z-10 text-center animate-fade-in-up">
              <h1 className="text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-medium mb-4 sm:mb-8 leading-[1.1] sm:leading-tight tracking-tight px-2 sm:px-0">
                <span className="text-white block sm:inline">Control Your</span>
                <br className="hidden sm:block" />
                <span className="text-white block sm:inline">Development With </span>
                <span className="brand-averon text-[#8FABFF] block sm:inline">Averon</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-sm sm:max-w-none sm:w-auto px-2 sm:px-0">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group w-full sm:w-auto px-8 sm:px-8 py-4 sm:py-4 bg-white hover:bg-white/90 active:bg-white/80 text-[var(--card-navy)] rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-black/20 text-base sm:text-lg"
                >
                  <span>Contact</span>
                </button>
                <button
                  onClick={() => scrollToSection('work')}
                  className="group w-full sm:w-auto px-8 sm:px-8 py-4 sm:py-4 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm text-white rounded-full font-semibold transition-all border-2 border-white/30 flex items-center justify-center space-x-2 text-base sm:text-lg"
                >
                  <span>Our Work</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By — sits directly below the hero, static logo row like retellai.com */}
      <section className="typography-a bg-[var(--page-bg)] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center flex-wrap gap-x-10 sm:gap-x-14 gap-y-6">
          {trustedLogosData.map((logo) => (
            <TrustedLogoCard key={logo.key} logo={logo} />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="typography-b relative">
        <FadeIn className="text-center pt-16 sm:pt-24 pb-8 sm:pb-12 px-4">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <h2>Our Services</h2>
          </div>
          <div className="text-sm sm:text-lg lg:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            <p>Comprehensive digital solutions tailored to accelerate your business growth</p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Automations Section */}
      <section id="automations" className="typography-b relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 sm:mb-16">
            <span className="text-[#3E6AEF] text-sm font-semibold tracking-wider uppercase mb-4 block">AI-Powered</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-[var(--text-heading)]">Business </span>
              <span className="text-[#3E6AEF]">Automations</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Let AI handle your customer interactions 24/7 — so you can focus on what matters most
            </p>
          </FadeIn>

          <FadeIn>
            <AutomationsCarousel slides={automationSlidesData} />
          </FadeIn>

          <div className="text-center mt-10 sm:mt-14">
            <Link
              href="/automations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#3E6AEF] hover:bg-[#2F55D0] text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-[#3E6AEF]/50 text-base sm:text-lg"
            >
              <span>Explore All Automations</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Work Section — always-visible showcase grid (replaces the old
          hover-gated "iOS15 App Store" scatter layout, which hid every
          mockup behind a hover/temporary-reveal gesture and clipped the
          edge phones half off-screen by design). */}
      <section id="work" className="typography-b relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12 sm:mb-16">
            <span className="text-[#3E6AEF] text-sm font-semibold tracking-wider uppercase mb-4 block">Our Work</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-[var(--text-heading)]">Real Projects, </span>
              <span className="text-[#3E6AEF]">Real Results</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              A selection of websites and apps we&apos;ve designed and built for clients across industries.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 [grid-auto-flow:dense]">
            {workShowcaseData.map((item, index) => (
              <FadeIn
                key={item.key}
                delay={index * 0.06}
                className={item.orientation === 'horizontal' ? 'col-span-2' : 'col-span-1'}
              >
                <div
                  className={`group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--hairline)] bg-[var(--surface-light)] p-4 sm:p-6 flex items-center justify-center ${
                    item.orientation === 'horizontal' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={item.blur}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 bottom-4 sm:left-5 sm:bottom-5 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {item.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-14">
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#3E6AEF] hover:bg-[#2F55D0] text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-[#3E6AEF]/50 text-base sm:text-lg"
            >
              <span>View Our Work</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section — scroll-drawn flowchart */}
      <section id="process-section" className="typography-a py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl lg:max-w-6xl mx-auto w-full">
          <FadeIn className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 px-2">Our Process</h2>
            <p className="text-sm sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto px-4 leading-relaxed">
              A proven methodology that delivers exceptional results every time
            </p>
          </FadeIn>

          <ProcessScrollSection />
        </div>
      </section>

      {/* Agents Section — synthflow.ai "One Agent for Every Conversation" pattern */}
      <section id="agents" className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto w-full text-center">
          <FadeIn>
            <span className="text-[#3E6AEF] text-sm font-semibold tracking-wider uppercase mb-4 block">AI-Powered Automation</span>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
              One Agent for Every Conversation
            </h2>
            <p className="text-sm sm:text-xl text-[var(--text-muted)] mb-10 sm:mb-14 leading-relaxed max-w-2xl mx-auto">
              Design, deploy, and manage AI agents across every channel — voice, Instagram, and WhatsApp — all from one platform. Averon&apos;s agents bring consistency and real-time intelligence to every customer interaction.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <RadialAgentsHub />
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="typography-a min-h-screen flex items-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#3E6AEF]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#6B8EFF]/20 rounded-full blur-3xl" />
        </div>

        <FadeIn className="max-w-4xl mx-auto text-center w-full relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Ready to Elevate Your Digital Presence?
          </h2>
          <p className="text-sm sm:text-xl text-[var(--text-muted)] mb-8 sm:mb-12 leading-relaxed px-2">
            Schedule a free discovery call with our team. We&apos;ll discuss your goals and create a tailored strategy to help you succeed online.
          </p>

          <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 sm:gap-4 max-w-2xl mx-auto px-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-[var(--page-bg-alt)] border border-[var(--hairline)] focus:outline-none focus:ring-2 focus:ring-[#3E6AEF] focus:border-[#3E6AEF] text-[var(--text-heading)] placeholder-[var(--text-muted)] text-sm sm:text-base disabled:opacity-50"
            />
            <input
              type="text"
              placeholder="Your name"
              value={contactForm.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-[var(--page-bg-alt)] border border-[var(--hairline)] focus:outline-none focus:ring-2 focus:ring-[#3E6AEF] focus:border-[#3E6AEF] text-[var(--text-heading)] placeholder-[var(--text-muted)] text-sm sm:text-base disabled:opacity-50"
            />
            <textarea
              placeholder="Tell us about your project and preferences..."
              rows={6}
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-[var(--page-bg-alt)] border border-[var(--hairline)] focus:outline-none focus:ring-2 focus:ring-[#3E6AEF] focus:border-[#3E6AEF] text-[var(--text-heading)] placeholder-[var(--text-muted)] text-sm sm:text-base resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="group px-8 py-4 bg-[#3E6AEF] text-white rounded-lg font-semibold hover:bg-[#2F55D0] active:bg-[#2F55D0] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-[#3E6AEF]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
            >
              <span>{isSubmitting ? 'Sending...' : 'Get Started'}</span>
              {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform"><ArrowRightIcon /></span>}
            </button>

            {submitStatus.type && (
              <div
                className={`p-3 sm:p-4 rounded-lg text-center font-semibold text-sm sm:text-base ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-[var(--text-muted)] px-4">
            Join the list of businesses that trust Averon Agency with their online presence
          </p>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 relative z-10 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-[var(--card-navy)] rounded-t-[2rem] sm:rounded-t-[2.5rem] pt-10 sm:pt-12 pb-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3E6AEF]/50 to-transparent"></div>

            <div className="relative z-10 px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
                <div className="lg:col-span-2">
                  <AveronLogo className="w-36 sm:w-40 mb-4" />
                  <p className="text-[var(--card-navy-text)] text-sm leading-relaxed mb-6 max-w-md">
                    Empowering businesses with cutting-edge digital solutions. From web development to brand identity, we transform your vision into reality.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.instagram.com/averonagency/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-[#3E6AEF]/50 rounded-lg transition-all hover:scale-105 border border-white/10"
                      aria-label="Instagram"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-[#3E6AEF]/50 rounded-lg transition-all hover:scale-105 border border-white/10"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-[#3E6AEF]/50 rounded-lg transition-all hover:scale-105 border border-white/10"
                      aria-label="Facebook"
                    >
                      <FacebookIcon />
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    <li><a href="#services" className="text-[var(--card-navy-text)] hover:text-white text-sm transition-colors">Services</a></li>
                    <li><Link href="/automations" className="text-[var(--card-navy-text)] hover:text-white text-sm transition-colors">Automations</Link></li>
                    <li><a href="#work" className="text-[var(--card-navy-text)] hover:text-white text-sm transition-colors">Our Work</a></li>
                    <li><a href="#process-section" className="text-[var(--card-navy-text)] hover:text-white text-sm transition-colors">Process</a></li>
                    <li><a href="#agents" className="text-[var(--card-navy-text)] hover:text-white text-sm transition-colors">Agents</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-4">Get in Touch</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#contact" className="text-[var(--card-navy-text)] hover:text-white transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        Contact Us
                      </a>
                    </li>
                    <li className="text-[var(--card-navy-text)]"><span className="block">Available for projects</span></li>
                    <li>
                      <a href="#contact" className="inline-block mt-2 px-4 py-2 bg-[#3E6AEF]/20 hover:bg-[#3E6AEF]/30 text-[#8FABFF] rounded-lg text-sm font-medium transition-colors border border-[#3E6AEF]/30">
                        Start Project
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-4">Partners</h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <li>
                      <a href="https://ramarasim.com" target="_blank" rel="noopener noreferrer" className="text-[var(--card-navy-text)] hover:text-white transition-colors">
                        Rama Rasim
                      </a>
                    </li>
                    <li>
                      <a href="https://timetrader-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--card-navy-text)] hover:text-white transition-colors">
                        Time Trader
                      </a>
                    </li>
                    <li>
                      <a href="https://lumina.al" target="_blank" rel="noopener noreferrer" className="text-[var(--card-navy-text)] hover:text-white transition-colors">
                        Lumina
                      </a>
                    </li>
                    <li>
                      <a href="https://arenarestaurant.al" target="_blank" rel="noopener noreferrer" className="text-[var(--card-navy-text)] hover:text-white transition-colors">
                        Arena Restaurant
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs sm:text-sm text-white/50">
                    © {new Date().getFullYear()} Averon Agency. All rights reserved.
                  </p>
                  <div className="flex gap-6 text-xs sm:text-sm">
                    <a href="/privacy-policy" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lazy-loaded Service Modal */}
      {activeServiceCard !== null && (
        <ServiceModal
          service={servicesData[activeServiceCard]}
          onClose={() => setActiveServiceCard(null)}
        />
      )}
    </div>
  );
};

export default AveronWebsite;
