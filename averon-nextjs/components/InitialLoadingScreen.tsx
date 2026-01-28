"use client";

import { useEffect, useState } from 'react';

/**
 * Minimal loading indicator that doesn't block content visibility
 * Only shows a subtle progress bar at the top - content remains visible
 * This preserves Speed Index by not hiding above-the-fold content
 */
export default function InitialLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Immediately start fading out - don't wait for full load
    // This ensures content is visible immediately for Speed Index
    const timer = setTimeout(() => setIsLoading(false), 100);

    // If page is already loaded, fade out even faster
    if (document.readyState === 'complete') {
      setIsLoading(false);
    }

    return () => clearTimeout(timer);
  }, []);

  // Handle fade-out completion
  useEffect(() => {
    if (!isLoading) {
      const fadeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(fadeTimer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  // Only render a minimal top progress bar - doesn't block content
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`fixed top-0 left-0 right-0 z-[9999] h-1 transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="h-full bg-purple-900/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-emerald-400 motion-safe:animate-loading-bar"
          style={{ width: '30%' }}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
