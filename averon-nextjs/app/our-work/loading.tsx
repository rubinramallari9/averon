"use client";

/**
 * Our Work page loading state
 * Shows skeleton cards for projects while loading
 */
export default function Loading() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: 'radial-gradient(ellipse at center top, #2d1b4e, #1a122f, #0a0816, #000000)',
      }}
    >
      {/* Header skeleton */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Title skeleton */}
          <div className="h-12 sm:h-16 w-64 sm:w-80 bg-purple-900/30 rounded-lg mx-auto mb-4 motion-safe:animate-pulse" />
          {/* Subtitle skeleton */}
          <div className="h-6 w-full max-w-xl bg-purple-900/20 rounded-lg mx-auto motion-safe:animate-pulse" />
        </div>
      </div>

      {/* Project grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Skeleton cards */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-900/10"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image skeleton */}
              <div className="aspect-[4/3] bg-purple-900/30 motion-safe:animate-pulse" />

              {/* Content skeleton */}
              <div className="p-5 sm:p-6 space-y-3">
                {/* Title skeleton */}
                <div className="h-6 w-3/4 bg-purple-900/30 rounded motion-safe:animate-pulse" />
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-purple-900/20 rounded motion-safe:animate-pulse" />
                  <div className="h-4 w-5/6 bg-purple-900/20 rounded motion-safe:animate-pulse" />
                </div>
                {/* Tags skeleton */}
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-purple-500/20 rounded-full motion-safe:animate-pulse" />
                  <div className="h-6 w-20 bg-purple-500/20 rounded-full motion-safe:animate-pulse" />
                  <div className="h-6 w-14 bg-purple-500/20 rounded-full motion-safe:animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading indicator at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-purple-900/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-emerald-400 motion-safe:animate-loading-bar"
          style={{ width: '30%' }}
        />
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Loading portfolio projects...</span>
    </div>
  );
}
