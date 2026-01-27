"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, Zap, Users, ChartNoAxesCombined, CheckCircle, Menu, X, Terminal, Instagram, Linkedin, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollArrow from '@/components/ScrollArrow';
import { apiClient } from '@/lib/api';
import {
  BLUR_CAR_MOCKUP,
  BLUR_CIGARS_WINE_MOCKUP,
  BLUR_COMPUTERSTORE_MOCKUP,
  BLUR_CONSTRUCTION_MOCKUP,
  BLUR_JEWELRY_MOCKUP,
  BLUR_LUXURY_WATCH_MOCKUP,
  BLUR_REALESTATE_MOCKUP,
  BLUR_RESTAURANT_MOCKUP,
} from '@/lib/blurPlaceholders';

// ============================================
// STATIC DATA - Moved outside component to prevent recreation
// ============================================
const services = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies that convert visitors into customers."
  },
  {
    icon: <ChartNoAxesCombined className="w-8 h-8" />,
    title: "SEO",
    description: "We offer a comprehensive range of services designed to boost your website's ranking and attract organic, non-paid Google search traffic."
  },
  {
    icon: <Terminal className="w-8 h-8" />,
    title: "Website Redesign",
    description: "Whether you need a design refresh or a complete website overhaul, we analyze your site's pain points and opportunities to revitalize your digital presence."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Brand Design",
    description: "Compelling brand identities and visual experiences that resonate with your audience and stand out in the market."
  }
] as const;

const features = [
  "Lifetime support & updates",
  "Dedicated project manager",
  "Mobile-first responsive design",
  "SEO optimization included",
  "Analytics & tracking setup",
  "Fast turnaround times"
] as const;

// Tech stack data using devicon CDN (reliable, fast, cached by Next.js)
const techStack = [
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C#', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
] as const;

// ============================================
// MEMOIZED COMPONENTS
// ============================================

// Memoized Logo Component - prevents recreation on parent re-renders
const AveronLogo = memo(({ className = "w-40" }: { className?: string }) => (
  <Image
    src="/averon_logobg.png"
    alt="Averon Digital"
    width={560}
    height={160}
    className={className}
    priority
    quality={75} // Reduced from 100 - visually identical, smaller file
  />
));
AveronLogo.displayName = 'AveronLogo';

// Memoized Tech Icon Component
const TechIcon = memo(({ name, src }: { name: string; src: string }) => (
  <div className="group flex flex-col items-center justify-center p-3 sm:p-6 bg-black/40 rounded-lg sm:rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105 active:scale-95">
    <Image
      src={src}
      alt={name}
      width={64}
      height={64}
      className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-3 object-contain"
      loading="lazy"
    />
    <span className="text-xs sm:text-sm font-semibold text-purple-200">{name}</span>
  </div>
));
TechIcon.displayName = 'TechIcon';

// ============================================
// LAZY LOADED COMPONENTS - Only load when needed
// ============================================

// Service Modal - Only ~20% of users click service cards
const ServiceModal = dynamic(() => import('@/components/ServiceModal'), {
  loading: () => null,
  ssr: false,
});

// ============================================
// MAIN COMPONENT
// ============================================
const AveronWebsite = () => {
  // Essential state only - removed unused scrollY, activeSection, isScrolled
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

  // Refs for scroll optimization
  const rafRef = useRef<number | null>(null);

  // Optimized scroll handler - removed unused state updates
  const handleScrollOptimized = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Desktop path animation
    const path = document.getElementById('processPath') as unknown as SVGPathElement;
    const processSection = document.getElementById('process-section');

    if (path && processSection) {
      const length = path.getTotalLength();
      const sectionTop = processSection.offsetTop;
      const sectionHeight = processSection.offsetHeight;

      let progress = (currentScrollY - sectionTop + window.innerHeight * 0.5) / sectionHeight;
      progress = Math.min(Math.max(progress, 0), 1);

      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const draw = length * easedProgress;
      path.style.strokeDashoffset = `${length - draw}`;
    }

    // Mobile path animation
    const mobilePath = document.getElementById('mobileProcessPath') as unknown as SVGPathElement;

    if (mobilePath && processSection) {
      const mobileLength = mobilePath.getTotalLength();
      const sectionTop = processSection.offsetTop;
      const sectionHeight = processSection.offsetHeight;

      let progress = (currentScrollY - sectionTop + window.innerHeight * 0.3) / sectionHeight;
      progress = Math.min(Math.max(progress, 0), 1);

      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const draw = mobileLength * easedProgress;
      mobilePath.style.strokeDashoffset = `${mobileLength - draw}`;
    }

    rafRef.current = null;
  }, []);

  // Single scroll listener with RAF throttling
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(handleScrollOptimized);
      }
    };

    // Initialize path dasharray on mount
    const path = document.getElementById('processPath') as unknown as SVGPathElement;
    const mobilePath = document.getElementById('mobileProcessPath') as unknown as SVGPathElement;

    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    }

    if (mobilePath) {
      const mobileLength = mobilePath.getTotalLength();
      mobilePath.style.strokeDasharray = `${mobileLength}`;
      mobilePath.style.strokeDashoffset = `${mobileLength}`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScrollOptimized(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScrollOptimized]);

  // Memoized click handlers
  const handleWorkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        const logoHoverArea = document.querySelector('.logo-hover-area') as HTMLElement;
        const workGrid = document.getElementById('work-grid');

        if (logoHoverArea && workGrid) {
          workGrid.classList.add('show-images');
          logoHoverArea.classList.add('active');

          setTimeout(() => {
            workGrid.classList.remove('show-images');
            logoHoverArea.classList.remove('active');
          }, 3000);
        }
      }, 800);
    }
  }, []);

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
    <div className="min-h-screen text-white overflow-x-hidden relative w-full" style={{
      background: 'radial-gradient(ellipse at center top, #2d1b4e, #261841, #201538, #1a122f, #140f26, #0f0b1e, #0a0816, #05050e, #000000), linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 0%, transparent 30%)',
      backgroundBlendMode: 'normal, lighten'
    }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-6">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-black/70 border border-purple-500/20 rounded-2xl px-4 sm:px-6 lg:px-8 shadow-xl">
          <div className="flex justify-between items-center h-16">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
            >
              <AveronLogo className="w-32 sm:w-36 lg:w-44" />
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Services
              </a>
              <a href="#work" onClick={handleWorkClick} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Our Work
              </a>
              <a
                href="#process-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('process-section');
                }}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Process
              </a>
              <a href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Features
              </a>
              <a href="#contact" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2 border-t border-purple-500/20 mt-2">
              <a
                href="#services"
                className="block px-4 py-2 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Services
              </a>
              <Link
                href="/our-work"
                className="block px-4 py-2 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Our Work
              </Link>
              <a
                href="#process-section"
                className="block px-4 py-2 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  scrollToSection('process-section');
                }}
              >
                Process
              </a>
              <a
                href="#features"
                className="block px-4 py-2 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Features
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="typography-a min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-32 pb-8 sm:pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Ambient Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] sm:blur-[150px] animate-ambient-pulse-1"
            style={{ backgroundColor: '#6366f1', willChange: 'transform, opacity' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] sm:blur-[150px] animate-ambient-pulse-2"
            style={{ backgroundColor: '#8b5cf6', willChange: 'transform, opacity' }}
          />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-emerald-600/20" />
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-32 left-[15%] hidden lg:block z-10 animate-float-slow">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
              <Terminal className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                <path d="M2 18 L8 12 L14 15 L20 8 L28 2" stroke="#10b981" strokeWidth="2" fill="none"/>
              </svg>
              <span className="font-accent text-emerald-400 font-bold text-lg">+342%</span>
            </div>
          </div>
        </div>

        <div className="absolute top-40 right-[12%] hidden lg:block z-10 animate-float-medium">
          <div className="bg-purple-500/20 backdrop-blur-md rounded-xl p-3 border border-purple-400/30">
            <div className="text-emerald-400 font-mono text-xs">{"</>"}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-8 leading-[1.1] sm:leading-tight tracking-tight px-2 sm:px-0">
              <span className="text-white block sm:inline">Control Your</span>
              <br className="hidden sm:block" />
              <span className="text-white block sm:inline">Development With </span>
              <span className="brand-averon text-emerald-400 block sm:inline">Averon</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-16 w-full max-w-sm sm:max-w-none sm:w-auto px-2 sm:px-0">
              <button
                onClick={() => scrollToSection('contact')}
                className="group w-full sm:w-auto px-8 sm:px-8 py-4 sm:py-4 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 text-gray-900 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/50 text-base sm:text-lg"
              >
                <span>Contact</span>
              </button>
              <button
                onClick={() => scrollToSection('work')}
                className="group w-full sm:w-auto px-8 sm:px-8 py-4 sm:py-4 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm text-white rounded-full font-semibold transition-all border-2 border-white/30 flex items-center justify-center space-x-2 text-base sm:text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                </svg>
                <span>Our Work</span>
              </button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative max-w-6xl mx-auto shadow-2xl shadow-purple-900/50 px-2 sm:px-0"
          >
            <div className="bg-gradient-to-b from-purple-400/30 to-purple-500/30 backdrop-blur-xl rounded-t-xl sm:rounded-t-2xl border border-white/20 p-2 sm:p-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/10 px-3 sm:px-4 py-0.5 sm:py-1 rounded-md text-white/60 text-xs sm:text-sm font-mono">www</div>
                </div>
              </div>
            </div>

            <div className="bg-[#2d1b4e]/50 backdrop-blur-xl border-x border-b border-white/20 rounded-b-xl sm:rounded-b-2xl overflow-hidden shadow-2xl">
              <div className="flex">
                <div className="w-48 bg-[#1e1433]/80 p-4 border-r border-white/10 hidden md:block">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Averon Dev</div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full inline-block"></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-white/80 py-2 px-3 bg-white/5 rounded-lg">Dashboard</div>
                    <div className="text-white/50 py-2 px-3">Projects</div>
                    <div className="text-white/50 py-2 px-3">Analytics</div>
                  </div>
                </div>

                <div className="flex-1 p-4 sm:p-6 bg-gradient-to-br from-white/5 to-white/10">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-white text-base sm:text-xl font-bold">Welcome Dashboard</h2>
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg"></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className="text-white/60 text-xs sm:text-sm mb-1">Active Projects:</div>
                    <div className="font-accent text-white text-2xl sm:text-3xl font-bold">24</div>
                  </div>
                  <div className="text-white/40 text-xs mb-3 sm:mb-4">Recent Activity</div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-emerald-400/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 h-20 sm:h-24"></div>
                    <div className="bg-purple-400/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 h-20 sm:h-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <ScrollArrow />

        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent 0%, #0f0b1e 50%, transparent 100%)',
          mixBlendMode: 'multiply',
          opacity: 0.8
        }}></div>
      </section>

      {/* Services - Progressive Scroll */}
      <section id="services" className="typography-b relative">
        <div className="text-center pt-16 sm:pt-24 pb-8 sm:pb-12 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-lg lg:text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive digital solutions tailored to accelerate your business growth
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative py-12 sm:py-20 lg:py-24"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[120px] sm:text-[180px] lg:text-[220px] font-bold text-purple-500/5 select-none pointer-events-none leading-none -z-10">
                0{index + 1}
              </div>

              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
                <motion.div
                  className="flex-shrink-0"
                  whileInView={{ scale: [0.8, 1], rotate: [0, 360] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                    <div className="text-white scale-150 sm:scale-[2] lg:scale-[2.5]">
                      {service.icon}
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="text-purple-400 text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 block">
                      Service 0{index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                      {service.title}
                    </h3>
                    <p className="text-purple-200/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              </div>

              {index < services.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 sm:py-16"
        >
          <div className="w-full h-24 sm:h-32 lg:h-40">
            <div className="flex items-center justify-center gap-8 sm:gap-16 lg:gap-20 h-full px-4">
              <a href="https://ramarasim.com" target="_blank" rel="noopener noreferrer" className="h-full flex items-center relative w-44 sm:w-56 lg:w-72">
                <Image
                  src="/trusted_logos/rasimramalogo.png"
                  alt="Rasim Rama"
                  fill
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 288px"
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </a>
              <a href="https://rubinramallari.com" target="_blank" rel="noopener noreferrer" className="h-full flex items-center relative w-44 sm:w-56 lg:w-72">
                <Image
                  src="/trusted_logos/rubin-logo.svg"
                  alt="Rubin Ramallari"
                  fill
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 288px"
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Agency Accelerator iOS15 Style Section */}
      <section id="work" className="typography-b section-ios15 relative overflow-hidden">
        <div className="padding-bottom-2 padding-xhuge">
          <div className="logo-hover-area">
            <div className="logo-ios15-wrapper flex flex-col items-center">
              <AveronLogo className="logo-glow w-72 sm:w-80 lg:w-96" />
              <Link
                href="/our-work"
                className="mt-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/50"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="section-ios15-grid" id="work-grid">
            <div className="phones-row-1">
              <div className="phone-wrapper">
                <Image
                  src="/images/luxury-watch-mockup.webp"
                  alt="Luxury Watch"
                  width={320}
                  height={480}
                  className="phone-image"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_LUXURY_WATCH_MOCKUP}
                />
              </div>
              <div className="phone-wrapper">
                <Image
                  src="/images/construction-mockup.webp"
                  alt="Construction"
                  width={320}
                  height={480}
                  className="phone-image"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_CONSTRUCTION_MOCKUP}
                />
              </div>
              <div className="phone-wrapper">
                <Image
                  src="/images/car-mockup.webp"
                  alt="Luxury Car"
                  width={600}
                  height={400}
                  className="phone-image-horizontal"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_CAR_MOCKUP}
                />
              </div>
              <div className="phone-wrapper">
                <Image
                  src="/images/jewelry-mockup.webp"
                  alt="Jewelry Store"
                  width={600}
                  height={400}
                  className="phone-image-horizontal"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_JEWELRY_MOCKUP}
                />
              </div>
            </div>

            <div className="phones-row-2">
              <div className="phone-wrapper">
                <Image
                  src="/images/restaurant-mockup.webp"
                  alt="Fine Dining"
                  width={600}
                  height={400}
                  className="phone-image-horizontal"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_RESTAURANT_MOCKUP}
                />
              </div>
              <div className="phone-wrapper">
                <Image
                  src="/images/computerstore-mockup.webp"
                  alt="Computer Store"
                  width={600}
                  height={400}
                  className="phone-image-horizontal"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_COMPUTERSTORE_MOCKUP}
                />
              </div>
              <div className="phone-wrapper">
                <Image
                  src="/images/cigars-wine-mockup.webp"
                  alt="Cigars & Wine"
                  width={320}
                  height={480}
                  className="phone-image"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_CIGARS_WINE_MOCKUP}
                />
              </div>
              <div className="phone-wrapper">
                <Image
                  src="/images/realestate-mockup.webp"
                  alt="Real Estate"
                  width={320}
                  height={480}
                  className="phone-image"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_REALESTATE_MOCKUP}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process-section" className="typography-a flex items-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 px-2">Our Process</h2>
            <p className="text-sm sm:text-xl text-purple-200 max-w-2xl mx-auto px-4 leading-relaxed">
              A proven methodology that delivers exceptional results every time
            </p>
          </div>

          <div className="relative">
            {/* Desktop SVG Path */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              style={{zIndex: 1}}
              viewBox="0 0 800 700"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="pinkPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#ff1e99', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#b200ff', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#ff1e99', stopOpacity: 1}} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                id="processPath"
                d="M 180 140 C 280 130, 360 155, 480 145 C 600 135, 680 165, 720 220 S 710 305, 630 340 C 520 380, 360 385, 220 365 C 150 355, 100 375, 90 445 C 85 495, 110 525, 220 570 C 360 630, 480 670, 400 750"
                stroke="url(#pinkPurpleGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
              />
            </svg>

            {/* Mobile Path */}
            <svg
              className="md:hidden absolute left-4 top-0 h-full pointer-events-none"
              style={{zIndex: 1, width: '40px'}}
              viewBox="0 0 40 800"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 0.9}} />
                  <stop offset="50%" style={{stopColor: '#a855f7', stopOpacity: 0.9}} />
                  <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 0.9}} />
                </linearGradient>
              </defs>
              <path
                id="mobileProcessPath"
                d="M 20 80 L 20 720"
                stroke="url(#mobileGradient)"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 0.15s ease-out',
                  filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))'
                }}
              />
            </svg>

            <div className="relative space-y-8 sm:space-y-12 md:pl-0 pl-12 sm:pl-16" style={{zIndex: 5}}>
              {/* Step 1 */}
              <div className="flex justify-start">
                <div className="relative group w-full max-w-md">
                  <div className="font-accent text-5xl sm:text-8xl font-bold text-purple-500/10 absolute -top-4 sm:-top-8 -left-2 sm:-left-4 group-hover:text-purple-500/20 transition-colors">
                    01
                  </div>
                  <div className="relative z-10 p-5 sm:p-8 bg-gradient-to-br from-black/40 to-purple-900/20 rounded-xl sm:rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" className="text-emerald-400"/>
                        <path d="M50 25 L50 50 L65 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-purple-400"/>
                        <circle cx="50" cy="50" r="4" fill="currentColor" className="text-emerald-400"/>
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Discovery</h3>
                      <p className="text-purple-200 text-sm sm:text-lg leading-relaxed">We dive deep into your business, goals, and target audience to craft the perfect strategy.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex justify-end">
                <div className="relative group w-full max-w-md">
                  <div className="font-accent text-5xl sm:text-8xl font-bold text-purple-500/10 absolute -top-4 sm:-top-8 -right-2 sm:-right-4 group-hover:text-purple-500/20 transition-colors">
                    02
                  </div>
                  <div className="relative z-10 p-5 sm:p-8 bg-gradient-to-br from-black/40 to-purple-900/20 rounded-xl sm:rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Design & Build</h3>
                      <p className="text-purple-200 text-sm sm:text-lg leading-relaxed">Our team creates stunning designs and develops robust solutions using the latest technologies.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex justify-start">
                <div className="relative group w-full max-w-md">
                  <div className="font-accent text-5xl sm:text-8xl font-bold text-purple-500/10 absolute -top-4 sm:-top-8 -left-2 sm:-left-4 group-hover:text-purple-500/20 transition-colors">
                    03
                  </div>
                  <div className="relative z-10 p-5 sm:p-8 bg-gradient-to-br from-black/40 to-purple-900/20 rounded-xl sm:rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 20 L55 40 L50 45 L45 40 Z" fill="currentColor" className="text-emerald-400" opacity="0.7"/>
                        <path d="M45 45 L30 75 L35 75 L50 50 L65 75 L70 75 L55 45 Z" fill="currentColor" className="text-purple-400" opacity="0.6"/>
                        <circle cx="50" cy="45" r="6" fill="currentColor" className="text-emerald-400"/>
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Launch & Grow</h3>
                      <p className="text-purple-200 text-sm sm:text-lg leading-relaxed">We launch your project and continue optimizing for maximum performance and growth.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="typography-b min-h-screen flex items-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="px-2 sm:px-0">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
                Everything You Need to Succeed Online
              </h2>
              <p className="text-sm sm:text-xl text-purple-200 mb-6 sm:mb-8 leading-relaxed">
                We provide comprehensive digital solutions with ongoing support to ensure your long-term success in the digital landscape.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                    <span className="text-sm sm:text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>

              {/* React Orbital Animation */}
              <div
                className="react-orbit-wrapper absolute pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'calc(100% + 80px)',
                  height: 'calc(100% + 80px)',
                  zIndex: 0
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 500 500" style={{ overflow: 'visible' }}>
                  <defs>
                    <filter id="orbitGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id="orbitGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#ff77cc', stopOpacity: 0.8}} />
                      <stop offset="100%" style={{stopColor: '#c778ff', stopOpacity: 0.8}} />
                    </linearGradient>
                    <linearGradient id="orbitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#c778ff', stopOpacity: 0.7}} />
                      <stop offset="100%" style={{stopColor: '#ff77cc', stopOpacity: 0.7}} />
                    </linearGradient>
                    <linearGradient id="orbitGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#ff77cc', stopOpacity: 0.75}} />
                      <stop offset="100%" style={{stopColor: '#c778ff', stopOpacity: 0.75}} />
                    </linearGradient>
                  </defs>
                  <g className="orbit-a">
                    <ellipse cx="250" cy="250" rx="240" ry="100" fill="none" stroke="url(#orbitGradient1)" strokeWidth="3" filter="url(#orbitGlow)" />
                  </g>
                  <g className="orbit-b">
                    <ellipse cx="250" cy="250" rx="240" ry="100" fill="none" stroke="url(#orbitGradient2)" strokeWidth="3.5" filter="url(#orbitGlow)" />
                  </g>
                  <g className="orbit-c">
                    <ellipse cx="250" cy="250" rx="240" ry="100" fill="none" stroke="url(#orbitGradient3)" strokeWidth="3" filter="url(#orbitGlow)" />
                  </g>
                </svg>
              </div>

              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-purple-500/30 p-6 sm:p-12 mx-2 sm:mx-0" style={{ zIndex: 5 }}>
                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">Technologies We Master</h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                  {techStack.map((tech) => (
                    <TechIcon key={tech.name} name={tech.name} src={tech.src} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="typography-a min-h-screen flex items-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center w-full relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Ready to Elevate Your Digital Presence?
          </h2>
          <p className="text-sm sm:text-xl text-purple-200 mb-8 sm:mb-12 leading-relaxed px-2">
            Schedule a free discovery call with our team. We'll discuss your goals and create a tailored strategy to help you succeed online.
          </p>

          <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 sm:gap-4 max-w-2xl mx-auto px-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-black/40 border border-purple-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 text-sm sm:text-base disabled:opacity-50"
            />
            <input
              type="text"
              placeholder="Your name"
              value={contactForm.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-black/40 border border-purple-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 text-sm sm:text-base disabled:opacity-50"
            />
            <textarea
              placeholder="Tell us about your project and preferences..."
              rows={6}
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-black/40 border border-purple-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 text-sm sm:text-base resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 active:from-purple-800 active:to-purple-900 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
            >
              <span>{isSubmitting ? 'Sending...' : 'Get Started'}</span>
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 sm:p-4 rounded-lg text-center font-semibold text-sm sm:text-base ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}
          </form>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-purple-300 px-4">
            Join the list of businesses that trust Averon Digital with their online presence
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 relative z-10 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-b from-purple-900/30 via-purple-950/40 to-black/90 backdrop-blur-xl rounded-t-2xl sm:rounded-t-3xl border-t border-x border-purple-500/20 pt-10 sm:pt-12 pb-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

            <div className="relative z-10 px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
                <div className="lg:col-span-2">
                  <AveronLogo className="w-36 sm:w-40 mb-4" />
                  <p className="text-purple-200/80 text-sm leading-relaxed mb-6 max-w-md">
                    Empowering businesses with cutting-edge digital solutions. From web development to brand identity, we transform your vision into reality.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-purple-600/50 rounded-lg transition-all hover:scale-105 border border-purple-500/20"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-purple-600/50 rounded-lg transition-all hover:scale-105 border border-purple-500/20"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-purple-600/50 rounded-lg transition-all hover:scale-105 border border-purple-500/20"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    <li><a href="#services" className="text-purple-200/70 hover:text-white text-sm transition-colors">Services</a></li>
                    <li><a href="#work" className="text-purple-200/70 hover:text-white text-sm transition-colors">Our Work</a></li>
                    <li><a href="#process-section" className="text-purple-200/70 hover:text-white text-sm transition-colors">Process</a></li>
                    <li><a href="#features" className="text-purple-200/70 hover:text-white text-sm transition-colors">Features</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-4">Get in Touch</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#contact" className="text-purple-200/70 hover:text-white transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        Contact Us
                      </a>
                    </li>
                    <li className="text-purple-200/70"><span className="block">Available for projects</span></li>
                    <li>
                      <a href="#contact" className="inline-block mt-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium transition-colors border border-emerald-500/30">
                        Start Project
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-purple-500/20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs sm:text-sm text-purple-400/70">
                    © {new Date().getFullYear()} Averon Digital. All rights reserved.
                  </p>
                  <div className="flex gap-6 text-xs sm:text-sm">
                    <a href="#" className="text-purple-400/70 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="text-purple-400/70 hover:text-white transition-colors">Terms of Service</a>
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
          service={services[activeServiceCard]}
          onClose={() => setActiveServiceCard(null)}
        />
      )}
    </div>
  );
};

export default AveronWebsite;
