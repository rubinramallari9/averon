"use client";

import React, { useEffect, useState, useRef } from 'react';

const ScrollArrow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

  // Cache layout values to prevent forced reflow
  const heroHeightRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Initial fade in after hero text appears (1.5s delay)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    // Cache hero section height once on mount (avoid repeated reads)
    const cacheHeroHeight = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        heroHeightRef.current = heroSection.offsetHeight;
      }
    };

    // Initial cache
    cacheHeroHeight();

    // Update cache on resize using ResizeObserver (more efficient than scroll)
    const resizeObserver = new ResizeObserver(() => {
      cacheHeroHeight();
    });

    const heroSection = document.querySelector('section');
    if (heroSection) {
      resizeObserver.observe(heroSection);
    }

    // Optimized scroll handler - uses cached value, batched with RAF
    const handleScroll = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const heroBottom = heroHeightRef.current;

        // Hide arrow if scrolled past 70% of hero section
        setShowArrow(scrollPosition < heroBottom * 0.7);
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handleScrollClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`absolute bottom-10 left-1/2 cursor-pointer transition-opacity duration-700 ${
        isVisible && showArrow ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        // Use transform for positioning (GPU-composited)
        transform: 'translateX(-50%)',
      }}
      onClick={handleScrollClick}
      role="button"
      aria-label="Scroll to services section"
    >
      {/* Arrow with fade + move animation */}
      <div className="relative group">
        {/* Glow effect - use transform+opacity only for GPU compositing */}
        <div
          className="absolute inset-0 -inset-2 rounded-full transition-opacity group-hover:opacity-70"
          style={{
            // Use box-shadow instead of blur filter for better compositing
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
            opacity: 0.5,
          }}
        />

        {/* Chevron Arrow SVG */}
        <svg
          className="relative w-8 h-8 text-[#a855f7] group-hover:text-[#ec4899] transition-colors"
          style={{
            // Use filter sparingly - drop-shadow is composited
            filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.6))',
          }}
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollArrow;
