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
        background: 'radial-gradient(ellipse at center top, #2d1b4e, #1a122f, #0a0816, #000000)',
      }}
    >
      {/* Ambient glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[120px] motion-safe:animate-pulse"
          style={{ backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
        />
      </div>

      {/* Logo and spinner container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Averon Logo Text */}
        <div className="mb-8">
          <span
            className="text-5xl sm:text-6xl font-medium text-emerald-400"
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
            className="absolute inset-0 rounded-full border-2 border-purple-500/20"
            aria-hidden="true"
          />
          {/* Spinning gradient arc */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent motion-safe:animate-spin"
            style={{
              borderTopColor: '#a855f7',
              borderRightColor: '#8b5cf6',
              animationDuration: '0.8s',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            aria-hidden="true"
          />
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 motion-safe:animate-pulse"
            aria-hidden="true"
          />
        </div>

        {/* Screen reader text */}
        <span className="sr-only">Loading website, please wait...</span>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-900/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-emerald-400 motion-safe:animate-loading-bar"
          style={{ width: '30%' }}
        />
      </div>
    </div>
  );
}
