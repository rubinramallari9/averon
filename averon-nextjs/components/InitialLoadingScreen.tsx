"use client";

import { useEffect, useState } from 'react';

/**
 * Initial loading screen that shows on first site visit
 * Fades out once the page is fully loaded
 */
export default function InitialLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      // Small delay to ensure smooth experience
      setTimeout(() => setIsLoading(false), 800);
    } else {
      // Wait for page to fully load
      const handleLoad = () => {
        setTimeout(() => setIsLoading(false), 500);
      };
      window.addEventListener('load', handleLoad);

      // Fallback timeout in case load event already fired
      const fallbackTimer = setTimeout(() => setIsLoading(false), 2500);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  // Handle fade-out completion
  useEffect(() => {
    if (!isLoading) {
      const fadeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match transition duration
      return () => clearTimeout(fadeTimer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading website"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        background: '#FFFFFF',
      }}
    >
      {/* Ambient glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[120px] motion-safe:animate-pulse"
          style={{ backgroundColor: 'rgba(62, 106, 239, 0.12)' }}
        />
      </div>

      {/* Logo and spinner container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Averon Logo Text */}
        <div className="mb-8">
          <span
            className="text-5xl sm:text-6xl font-medium text-[#3E6AEF]"
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontStyle: 'italic',
              letterSpacing: '-0.005em',
            }}
          >
            Averon
          </span>
        </div>

        {/* Spinner */}
        <div className="relative w-14 h-14">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#3E6AEF]/15"
            aria-hidden="true"
          />
          {/* Spinning gradient arc */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent motion-safe:animate-spin"
            style={{
              borderTopColor: '#3E6AEF',
              borderRightColor: '#6B8EFF',
              animationDuration: '0.8s',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            aria-hidden="true"
          />
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#3E6AEF] motion-safe:animate-pulse"
            aria-hidden="true"
          />
        </div>

        {/* Screen reader text */}
        <span className="sr-only">Loading website, please wait...</span>
      </div>
    </div>
  );
}
