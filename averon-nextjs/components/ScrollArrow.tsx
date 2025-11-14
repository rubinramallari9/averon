"use client";

import React, { useEffect, useState } from 'react';

const ScrollArrow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    // Initial fade in after hero text appears (1.5s delay)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    // Hide arrow when scrolling past hero section
    const handleScroll = () => {
      const heroSection = document.querySelector('section'); // First section (hero)
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;

        // Hide arrow if scrolled past 70% of hero section
        setShowArrow(scrollPosition < heroBottom * 0.7);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
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
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer transition-opacity duration-700 ${
        isVisible && showArrow ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleScrollClick}
      role="button"
      aria-label="Scroll to services section"
    >
      {/* Arrow with fade + move animation */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 -inset-2 blur-xl opacity-50 group-hover:opacity-70 transition-opacity">
          <div className="w-full h-full bg-gradient-to-b from-[#a855f7] to-[#ec4899] rounded-full"></div>
        </div>

        {/* Chevron Arrow SVG */}
        <svg
          className="relative w-8 h-8 text-[#a855f7] group-hover:text-[#ec4899] transition-colors drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
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
