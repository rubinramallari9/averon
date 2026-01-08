"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Users, Target, ChartNoAxesCombined, CheckCircle, Menu, X, Terminal, WifiPen, Instagram, Linkedin, Facebook} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollArrow from '@/components/ScrollArrow';
import ServiceCardTilt from '@/components/ServiceCardTilt';
import { apiClient } from '@/lib/api';

const AveronWebsite = () => {
  const [scrollY, setScrollY] = useState(0);
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

  useEffect(() => {
    const path = document.getElementById('processPath') as unknown as SVGPathElement;
    const mobilePath = document.getElementById('mobileProcessPath') as unknown as SVGPathElement;
    const mobileMarker = document.getElementById('mobileEndMarker');
    const section = document.getElementById('process-section');

    if (!section) return;

    // Desktop path animation
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const handleScroll = () => {
        setScrollY(window.scrollY);

        const scrollY = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        let progress = (scrollY - sectionTop + window.innerHeight * 0.5) / sectionHeight;
        progress = Math.min(Math.max(progress, 0), 1);

        const easedProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const draw = length * easedProgress;
        path.style.strokeDashoffset = `${length - draw}`;

      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Mobile path animation
    if (mobilePath && mobileMarker) {
      const mobileLength = mobilePath.getTotalLength();
      mobilePath.style.strokeDasharray = `${mobileLength}`;
      mobilePath.style.strokeDashoffset = `${mobileLength}`;

      const handleMobileScroll = () => {
        setScrollY(window.scrollY);

        const scrollY = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        let progress = (scrollY - sectionTop + window.innerHeight * 0.3) / sectionHeight;
        progress = Math.min(Math.max(progress, 0), 1);

        const easedProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const draw = mobileLength * easedProgress;
        mobilePath.style.strokeDashoffset = `${mobileLength - draw}`;

        // Animate dots
        const dots = document.querySelectorAll('.timeline-dot');
        dots.forEach((dot, index) => {
          const dotProgress = (index + 1) / 3;
          if (easedProgress >= dotProgress - 0.1) {
            (dot as HTMLElement).style.opacity = '1';
            (dot as HTMLElement).style.transform = 'scale(1)';
          } else {
            (dot as HTMLElement).style.opacity = '0.3';
            (dot as HTMLElement).style.transform = 'scale(0.8)';
          }
        });

        // X marker appears when fully drawn
        if (easedProgress >= 0.98) {
          mobileMarker.style.opacity = '1';
          mobileMarker.style.transform = 'scale(1.1)';
        } else {
          mobileMarker.style.opacity = '0';
          mobileMarker.style.transform = 'scale(0.9)';
        }
      };

      handleMobileScroll();
      window.addEventListener('scroll', handleMobileScroll);
      return () => window.removeEventListener('scroll', handleMobileScroll);
    }
  }, []);

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });

      // After scroll completes, trigger the animation
      setTimeout(() => {
        const logoHoverArea = document.querySelector('.logo-hover-area') as HTMLElement;
        const workGrid = document.getElementById('work-grid');

        if (logoHoverArea && workGrid) {
          // Manually add the hover classes to trigger animation
          workGrid.classList.add('show-images');
          logoHoverArea.classList.add('active');

          // Remove after animation completes
          setTimeout(() => {
            workGrid.classList.remove('show-images');
            logoHoverArea.classList.remove('active');
          }, 3000);
        }
      }, 800);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await apiClient.submitContact(contactForm);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We\'ll get back to you soon.',
      });
      // Clear form
      setContactForm({ email: '', name: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies that convert visitors into customers."
    },
    {
      icon: <ChartNoAxesCombined className="w-8 h-8" />,
      title: "SEO",
      description: "We offer a comprehensive range of services designed to boost your website’s ranking and attract organic, non-paid Google search traffic."
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Website Redesign",
      description: "Whether you need a design refresh or a complete website overhaul, we analyze your site’s pain points and opportunities to revitalize your digital presence. "
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Brand Design",
      description: "Compelling brand identities and visual experiences that resonate with your audience and stand out in the market."
    }
  ];

  const features = [
    "Lifetime support & updates",
    "Dedicated project manager",
    "Mobile-first responsive design",
    "SEO optimization included",
    "Analytics & tracking setup",
    "Fast turnaround times"
  ];

  // Averon Logo SVG Component
  const AveronLogo = ({ className = "w-40" }: { className?: string }) => (
    <img 
      src="/averon_logobg.png" 
      alt="Averon Digital" 
      className={className}
    />
  );

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative w-full">
      {/* Global Continuous Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a0f2e] via-[#0f0f12] to-black pointer-events-none"></div>

      {/* Radial Glow Behind Hero Headline */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Subtle Ambient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-4">
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl border border-purple-500/20 px-4 sm:px-6 lg:px-8 shadow-2xl shadow-purple-500/10">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <AveronLogo className="w-28 sm:w-32 lg:w-40" />
            
            <div className="hidden lg:flex space-x-8">
              <a href="#services" className="hover:text-purple-300 transition">Services</a>
              <a href="#work" className="hover:text-purple-300 transition" onClick={handleWorkClick}>Our Work</a>
              <a href="#process" className="hover:text-purple-300 transition">Process</a>
              <a href="#features" className="hover:text-purple-300 transition">Features</a>
              <a href="#contact" className="hover:text-purple-300 transition">Contact</a>
            </div>

            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={2.5} style={{ strokeLinecap: 'round' }} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-lg rounded-b-2xl border border-purple-500/20 border-t-0 mt-[-8px] overflow-hidden shadow-2xl shadow-purple-500/10">
            <div className="px-6 py-6 space-y-4">
              <a
                href="#services"
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#work"
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleWorkClick(e);
                }}
              >
                Our Work
              </a>
              <a
                href="#process"
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </a>
              <a
                href="#features"
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#contact"
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Payking Style */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Glow Orbs - Subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30"
            style={{ backgroundColor: '#6366f1' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-25"
            style={{ backgroundColor: '#8b5cf6' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.35, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-32 left-[15%] hidden lg:block z-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Growth Metric Card */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
              <Terminal className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                <path d="M2 18 L8 12 L14 15 L20 8 L28 2" stroke="#10b981" strokeWidth="2" fill="none"/>
              </svg>
              <span className="text-emerald-400 font-bold text-lg">+342%</span>
            </div>
          </div>
        </motion.div>

        {/* Hand-drawn Whimsical Arrow */}
        <motion.div
          className="absolute top-[45%] left-[8%] hidden lg:block z-10"
          animate={{
            rotate: [0, 2, -1, 0],
            x: [0, 5, -3, 0],
            y: [0, -3, 2, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hand-drawn wobbly path - marker sketch style */}
            <path
              d="M 15 50
                 Q 20 45, 28 48
                 T 40 52
                 Q 48 54, 55 51
                 T 68 48
                 Q 78 46, 88 49
                 T 105 52
                 Q 115 53, 122 50"
              stroke="#c4b5fd"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 8"
              opacity="0.45"
              fill="none"
            />

            {/* Simple V-shaped arrowhead - hand-drawn style */}
            <path
              d="M 115 45 L 122 50 L 117 55"
              stroke="#c4b5fd"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
              fill="none"
            />

            {/* Optional subtle second wobble line for extra sketch effect */}
            <path
              d="M 15 51
                 Q 21 46, 29 49
                 T 41 53"
              stroke="#c4b5fd"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 6"
              opacity="0.25"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Floating Code Icon */}
        <motion.div
          className="absolute top-40 right-[12%] hidden lg:block z-10"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-purple-500/20 backdrop-blur-md rounded-xl p-3 border border-purple-400/30">
            <div className="text-emerald-400 font-mono text-xs">{"</>"}</div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading - Payking Style */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 leading-tight tracking-tight">
              <span className="text-white">Control Your</span>
              <br />
              <span className="text-white">Development With </span>
              <span className="text-emerald-400">Averon</span>
            </h1>

            {/* CTA Buttons - Payking Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-4 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-emerald-500/50 text-lg"
              >
                <span>Contact</span>
              </button>
              <button
                onClick={() => {
                  const workSection = document.getElementById('work');
                  workSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold transition-all border-2 border-white/30 flex items-center space-x-2 text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                </svg>
                <span>Our Work</span>
              </button>
            </div>
          </motion.div>

          {/* Dashboard Preview - Glassmorphism with Floating Shadow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative max-w-6xl mx-auto shadow-2xl shadow-purple-900/50"
          >
            {/* Browser Window Frame */}
            <div className="bg-gradient-to-b from-purple-400/30 to-purple-500/30 backdrop-blur-xl rounded-t-2xl border border-white/20 p-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/10 px-4 py-1 rounded-md text-white/60 text-sm font-mono">www</div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-[#2d1b4e]/50 backdrop-blur-xl border-x border-b border-white/20 rounded-b-2xl overflow-hidden shadow-2xl">
              <div className="flex">
                {/* Sidebar */}
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

                {/* Main Content */}
                <div className="flex-1 p-6 bg-gradient-to-br from-white/5 to-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-bold">Welcome Dashboard</h2>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                      <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-white/60 text-sm mb-1">Active Projects:</div>
                    <div className="text-white text-3xl font-bold">24</div>
                  </div>

                  <div className="text-white/40 text-xs mb-4">Recent Activity</div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-400/90 rounded-2xl p-4 h-24"></div>
                    <div className="bg-purple-400/90 rounded-2xl p-4 h-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Arrow */}
        <ScrollArrow />
      </section>

      {/* Logo Section */}
      <section className="relative z-10 py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Logo Container */}
          <div className="w-full h-24 sm:h-32 lg:h-40">
            <div className="flex items-center justify-center gap-8 sm:gap-16 lg:gap-24 h-full">
              <div className="flex items-center justify-center h-full">
                <a href="https://rasimrama.com" target="_blank" rel="noopener noreferrer" className="h-full flex items-center">
                  <img
                    src="/trusted_logos/rasimramalogo.png"
                    alt="Rasim Rama"
                    className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </a>
              </div>
              <div className="flex items-center justify-center h-full">
                <a href="https://rubinramallari.com" target="_blank" rel="noopener noreferrer" className="h-full flex items-center">
                  <img
                    src="/trusted_logos/rubin-logo.svg"
                    alt="Rubin Ramallari"
                    className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Transparent Background for Seamless Blend */}
      <section id="services" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to accelerate your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {services.map((service, index) => (
              <ServiceCardTilt key={index}>
                <motion.div
                  className="group h-full p-8 bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer flex flex-col"
                  onClick={() => setActiveServiceCard(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 flex-shrink-0">{service.title}</h3>
                  <p className="text-purple-200 leading-relaxed flex-grow">{service.description}</p>
                </motion.div>
              </ServiceCardTilt>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Accelerator iOS15 Style Section */}
      <section id="work" className="section-ios15 relative z-10 overflow-hidden">
        <div className="padding-bottom-2 padding-xhuge">
          {/* Circular hover area */}
          <div className="logo-hover-area">
            {/* Logo with glow effect */}
            <div className="logo-ios15-wrapper flex flex-col items-center">
              <AveronLogo className="logo-glow w-96 sm:w-[480px] lg:w-[560px]" />
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
            {/* Row 1 (Top arc): vertical, vertical, horizontal, horizontal */}
            <div className="phones-row-1">
              <div className="phone-wrapper">
                <img
                  src="/images/luxury-watch-mockup.png"
                  alt="Luxury Watch"
                  className="phone-image"
                />
              </div>
              <div className="phone-wrapper">
                <img
                  src="/images/construction-mockup.png"
                  alt="Construction"
                  className="phone-image"
                />
              </div>
              <div className="phone-wrapper">
                <img
                  src="/images/car-mockup.png"
                  alt="Luxury Car"
                  className="phone-image-horizontal"
                />
              </div>
              <div className="phone-wrapper">
                <img
                  src="/images/jewelry-mockup.png"
                  alt="Jewelry Store"
                  className="phone-image-horizontal"
                />
              </div>
            </div>

            {/* Row 2 (Bottom arc): horizontal, horizontal, vertical, vertical */}
            <div className="phones-row-2">
              <div className="phone-wrapper">
                <img
                  src="/images/restaurant-mockup.png"
                  alt="Fine Dining"
                  className="phone-image-horizontal"
                />
              </div>
              <div className="phone-wrapper">
                <img
                  src="/images/computerstore-mockup.png"
                  alt="Computer Store"
                  className="phone-image-horizontal"
                />
              </div>
              <div className="phone-wrapper">
                <img
                  src="/images/cigars-wine-mockup.png"
                  alt="Cigars & Wine"
                  className="phone-image"
                />
              </div>
              <div className="phone-wrapper">
                <img
                  src="/images/realestate-mockup.png"
                  alt="Real Estate"
                  className="phone-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Snake Path */}
      <section id="process-section" className="flex items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results every time
            </p>
          </div>

          {/* Snake Path Layout */}
          <div className="relative">
            {/* Desktop Animated SVG Snake Path */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              style={{zIndex: 1}}
              viewBox="0 0 800 700"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#a855f7', stopOpacity: 0.9}} />
                  <stop offset="50%" style={{stopColor: '#ec4899', stopOpacity: 0.9}} />
                  <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 0.9}} />
                </linearGradient>
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
                d="M 180 140
                   C 280 130, 360 155, 480 145
                   C 600 135, 680 165, 720 220
                   S 710 305, 630 340
                   C 520 380, 360 385, 220 365
                   C 150 355, 100 375, 90 445
                   C 85 495, 110 525, 220 570
                   C 360 630, 480 670, 400 750"
                stroke="url(#pinkPurpleGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                style={{
                  transition: 'stroke-dashoffset 0.15s ease-out'
                }}
              />
            </svg>

            {/* Mobile Vertical Timeline */}
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

            {/* Mobile Timeline Dots */}
            <div className="md:hidden absolute left-[30px] top-[80px] timeline-dot" style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #a855f7)',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)',
              opacity: 0.3,
              transform: 'scale(0.8)',
              transition: 'all 0.4s ease',
              zIndex: 5
            }}></div>

            <div className="md:hidden absolute left-[30px] top-[370px] timeline-dot" style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              boxShadow: '0 0 12px rgba(236, 72, 153, 0.8)',
              opacity: 0.3,
              transform: 'scale(0.8)',
              transition: 'all 0.4s ease',
              zIndex: 5
            }}></div>

            <div className="md:hidden absolute left-[30px] top-[660px] timeline-dot" style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #a855f7)',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)',
              opacity: 0.3,
              transform: 'scale(0.8)',
              transition: 'all 0.4s ease',
              zIndex: 5
            }}></div>

            {/* Mobile X Marker */}
            <div
              id="mobileEndMarker"
              className="md:hidden absolute pointer-events-none"
              style={{
                left: '40px',
                top: '740px',
                fontSize: '32px',
                fontWeight: 900,
                color: '#ff6db0',
                opacity: 0,
                transition: 'opacity 0.4s ease-out, transform 0.3s ease',
                transform: 'scale(0.9)',
                textShadow: '0 0 16px rgba(255, 109, 176, 0.9), 0 0 24px rgba(168, 85, 247, 0.5)',
                zIndex: 20
              }}
            >
              ✕
            </div>

            <div className="relative space-y-12 md:pl-0 pl-16" style={{zIndex: 5}}>
              {/* Step 1 - Top Left */}
              <div className="flex justify-start">
                <div className="relative group w-full max-w-md">
                  <div className="text-8xl font-bold text-purple-500/10 absolute -top-8 -left-4 group-hover:text-purple-500/20 transition-colors">
                    01
                  </div>
                  <div className="relative z-10 p-8 bg-gradient-to-br from-black/40 to-purple-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <h3 className="text-3xl font-bold mb-4">Discovery</h3>
                    <p className="text-purple-200 text-lg leading-relaxed">We dive deep into your business, goals, and target audience to craft the perfect strategy.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Middle Right */}
              <div className="flex justify-end">
                <div className="relative group w-full max-w-md">
                  <div className="text-8xl font-bold text-purple-500/10 absolute -top-8 -right-4 group-hover:text-purple-500/20 transition-colors">
                    02
                  </div>
                  <div className="relative z-10 p-8 bg-gradient-to-br from-black/40 to-purple-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <h3 className="text-3xl font-bold mb-4">Design & Build</h3>
                    <p className="text-purple-200 text-lg leading-relaxed">Our team creates stunning designs and develops robust solutions using the latest technologies.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Bottom Left */}
              <div className="flex justify-start">
                <div className="relative group w-full max-w-md">
                  <div className="text-8xl font-bold text-purple-500/10 absolute -top-8 -left-4 group-hover:text-purple-500/20 transition-colors">
                    03
                  </div>
                  <div className="relative z-10 p-8 bg-gradient-to-br from-black/40 to-purple-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <h3 className="text-3xl font-bold mb-4">Launch & Grow</h3>
                    <p className="text-purple-200 text-lg leading-relaxed">We launch your project and continue optimizing for maximum performance and growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Everything You Need to Succeed Online
              </h2>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                We provide comprehensive digital solutions with ongoing support to ensure your long-term success in the digital landscape.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>

              {/* React Atomic Orbital Animation */}
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
                <svg
                  className="w-full h-full"
                  viewBox="0 0 500 500"
                  style={{ overflow: 'visible' }}
                >
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

                  {/* Orbit A - Clockwise 12s */}
                  <g className="orbit-a">
                    <ellipse
                      cx="250"
                      cy="250"
                      rx="240"
                      ry="100"
                      fill="none"
                      stroke="url(#orbitGradient1)"
                      strokeWidth="3"
                      filter="url(#orbitGlow)"
                    />
                  </g>

                  {/* Orbit B - Counter-clockwise 18s */}
                  <g className="orbit-b">
                    <ellipse
                      cx="250"
                      cy="250"
                      rx="240"
                      ry="100"
                      fill="none"
                      stroke="url(#orbitGradient2)"
                      strokeWidth="3.5"
                      filter="url(#orbitGlow)"
                    />
                  </g>

                  {/* Orbit C - Clockwise 24s */}
                  <g className="orbit-c">
                    <ellipse
                      cx="250"
                      cy="250"
                      rx="240"
                      ry="100"
                      fill="none"
                      stroke="url(#orbitGradient3)"
                      strokeWidth="3"
                      filter="url(#orbitGlow)"
                    />
                  </g>
                </svg>
              </div>

              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-8 sm:p-12" style={{ zIndex: 5 }}>
                <h3 className="text-2xl font-bold mb-8 text-center">Technologies We Master</h3>
                
                {/* Tech Stack Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Python */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-python.png" 
                      alt="Python" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">Python</span>
                  </div>

                  {/* TypeScript */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-ts.png" 
                      alt="TypeScript" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">TypeScript</span>
                  </div>

                  {/* JavaScript */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-js.png" 
                      alt="JavaScript" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">JavaScript</span>
                  </div>

                  {/* C++ */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-cpp.png" 
                      alt="C++" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">C++</span>
                  </div>

                  {/* C# */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-cs.png" 
                      alt="C#" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">C#</span>
                  </div>

                  {/* Java */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-java.png" 
                      alt="Java" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">Java</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Elevate Your Digital Presence?
          </h2>
          <p className="text-xl text-purple-200 mb-12 leading-relaxed">
            Schedule a free discovery call with our team. We'll discuss your goals and create a tailored strategy to help you succeed online.
          </p>
          
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-lg bg-black/40 border border-purple-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-400 disabled:opacity-50"
            />
            <input
              type="text"
              placeholder="Your name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-lg bg-black/40 border border-purple-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-400 disabled:opacity-50"
            />
            <textarea
              placeholder="Tell us about your project and preferences..."
              rows={8}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-lg bg-black/40 border border-purple-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-400 resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span>{isSubmitting ? 'Sending...' : 'Get Started'}</span>
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            {/* Success/Error Message */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg text-center font-semibold ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}
          </form>

          <p className="mt-6 text-sm text-purple-300">
            Join the list of businesses that trust Averon Digital with their online presence
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black backdrop-blur-xl rounded-t-3xl border-t border-x border-purple-500/20 pt-8 pb-6 overflow-hidden">
            {/* Fade effect background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-900/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

            <div className="relative z-10 text-center px-4">
              <div className="flex items-center justify-center mb-6">
                <AveronLogo className="w-40" />
              </div>
              <p className="text-purple-200 text-base mb-6 max-w-2xl mx-auto">
                Transforming businesses through innovative digital solutions
              </p>

              {/* Navigation Links */}
              <div className="flex justify-center gap-8 mb-6 text-sm">
                <a href="#services" className="text-purple-300 hover:text-white transition">Services</a>
                <a href="#work" className="text-purple-300 hover:text-white transition">Our Work</a>
                <a href="#process" className="text-purple-300 hover:text-white transition">Process</a>
                <a href="#contact" className="text-purple-300 hover:text-white transition">Contact</a>
              </div>

              {/* Social Media Buttons */}
              <div className="flex justify-center gap-4 mb-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110 shadow-lg shadow-purple-500/30"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110 shadow-lg shadow-purple-500/30"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-110 shadow-lg shadow-purple-500/30"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/80 to-blue-700/80 rounded-full hover:from-purple-600 hover:to-blue-700 transition-all transform hover:scale-110 shadow-lg shadow-purple-500/30"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>

              <div className="pt-6 border-t border-purple-500/20">
                <p className="text-sm text-purple-400/80">
                  © 2024 Averon Digital. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Service Card Modal with Atomic Animation */}
      <AnimatePresence>
        {activeServiceCard !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
              onClick={() => setActiveServiceCard(null)}
            />

            {/* Modal Card with Atomic Animation */}
            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.5
                }}
                className="relative w-[70%] max-w-lg pointer-events-auto"
              >
                {/* Atomic Orbital Animation - Behind Card */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'calc(100% + 140px)',
                    height: 'calc(100% + 140px)',
                    zIndex: 0
                  }}
                >
                  <motion.svg
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full h-full"
                    viewBox="0 0 600 600"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      <filter id="modalOrbitGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <linearGradient id="modalOrbitGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#ff77cc', stopOpacity: 0.9}} />
                        <stop offset="100%" style={{stopColor: '#c778ff', stopOpacity: 0.9}} />
                      </linearGradient>
                      <linearGradient id="modalOrbitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#c778ff', stopOpacity: 0.85}} />
                        <stop offset="100%" style={{stopColor: '#ff77cc', stopOpacity: 0.85}} />
                      </linearGradient>
                      <linearGradient id="modalOrbitGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#ff77cc', stopOpacity: 0.9}} />
                        <stop offset="100%" style={{stopColor: '#c778ff', stopOpacity: 0.9}} />
                      </linearGradient>
                    </defs>

                    {/* Orbit A - Clockwise 12s */}
                    <g className="modal-orbit-a">
                      <ellipse
                        cx="300"
                        cy="300"
                        rx="280"
                        ry="120"
                        fill="none"
                        stroke="url(#modalOrbitGradient1)"
                        strokeWidth="4"
                        filter="url(#modalOrbitGlow)"
                      />
                    </g>

                    {/* Orbit B - Counter-clockwise 18s */}
                    <g className="modal-orbit-b">
                      <ellipse
                        cx="300"
                        cy="300"
                        rx="280"
                        ry="120"
                        fill="none"
                        stroke="url(#modalOrbitGradient2)"
                        strokeWidth="4.5"
                        filter="url(#modalOrbitGlow)"
                      />
                    </g>

                    {/* Orbit C - Clockwise 24s */}
                    <g className="modal-orbit-c">
                      <ellipse
                        cx="300"
                        cy="300"
                        rx="280"
                        ry="120"
                        fill="none"
                        stroke="url(#modalOrbitGradient3)"
                        strokeWidth="4"
                        filter="url(#modalOrbitGlow)"
                      />
                    </g>
                  </motion.svg>
                </div>

                {/* Card Content */}
                <div className="relative bg-gradient-to-br from-purple-900/95 to-black/95 backdrop-blur-xl rounded-3xl border-2 border-purple-500/50 p-8 shadow-2xl shadow-purple-500/50" style={{ zIndex: 10 }}>
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveServiceCard(null)}
                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/30 hover:border-purple-500/60 transition-all group"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  {/* Service Content */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/50">
                      {services[activeServiceCard].icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{services[activeServiceCard].title}</h3>
                    <p className="text-lg text-purple-200 leading-relaxed">
                      {services[activeServiceCard].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AveronWebsite;