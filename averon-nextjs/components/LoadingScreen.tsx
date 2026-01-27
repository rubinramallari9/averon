"use client";

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  /** Minimum display time in ms to prevent flash */
  minDisplayTime?: number;
  /** Show the Averon logo */
  showLogo?: boolean;
  /** Optional loading text */
  loadingText?: string;
}

/**
 * Full-screen loading component with brand styling
 * - Respects prefers-reduced-motion
 * - Smooth fade-out transition
 * - No layout shift (fixed positioning)
 */
export default function LoadingScreen({
  minDisplayTime = 300,
  showLogo = true,
  loadingText,
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Ensure minimum display time to prevent flash
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  // Handle fade-out completion
  useEffect(() => {
    if (!isVisible) {
      const fadeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
      return () => clearTimeout(fadeTimer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
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
        {showLogo && (
          <div className="mb-8 motion-safe:animate-fade-in">
            {/* Averon Logo Text */}
            <span
              className="text-4xl sm:text-5xl font-medium text-emerald-400"
              style={{
                fontFamily: 'var(--font-lora), Georgia, serif',
                fontStyle: 'italic',
                letterSpacing: '-0.005em',
              }}
            >
              Averon
            </span>
          </div>
        )}

        {/* Spinner */}
        <div className="relative w-12 h-12">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-purple-500/20"
            aria-hidden="true"
          />
          {/* Spinning gradient arc */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent motion-safe:animate-spin"
            style={{
              borderTopColor: '#a855f7',
              borderRightColor: '#8b5cf6',
              animationDuration: '1s',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            aria-hidden="true"
          />
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 motion-safe:animate-pulse"
            aria-hidden="true"
          />
        </div>

        {/* Loading text */}
        {loadingText && (
          <p className="mt-6 text-sm text-purple-300/80 motion-safe:animate-fade-in">
            {loadingText}
          </p>
        )}

        {/* Screen reader text */}
        <span className="sr-only">Loading, please wait...</span>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-900/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-emerald-400 motion-safe:animate-loading-bar"
          style={{
            width: '30%',
          }}
        />
      </div>
    </div>
  );
}

/**
 * Minimal skeleton loader for content areas
 */
export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-purple-900/20 rounded-lg motion-safe:animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton card for loading states
 */
export function SkeletonCard() {
  return (
    <div className="p-6 bg-purple-900/20 rounded-2xl border border-purple-500/10 space-y-4">
      <SkeletonLoader className="h-12 w-12 rounded-xl" />
      <SkeletonLoader className="h-6 w-3/4" />
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-5/6" />
    </div>
  );
}
