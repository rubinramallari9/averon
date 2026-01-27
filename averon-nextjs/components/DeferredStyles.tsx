"use client";

import { useEffect } from 'react';

/**
 * Deferred Styles Loader
 * Loads non-critical CSS after first paint to reduce render-blocking
 */
export default function DeferredStyles() {
  useEffect(() => {
    // Load animations CSS after first paint
    const loadDeferredStyles = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/animations.css';
      link.media = 'print'; // Load without blocking
      link.onload = () => {
        link.media = 'all'; // Apply styles after load
      };
      document.head.appendChild(link);
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadDeferredStyles, { timeout: 2000 });
    } else {
      setTimeout(loadDeferredStyles, 100);
    }
  }, []);

  return null;
}
