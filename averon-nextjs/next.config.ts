import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* SEO & Performance Optimizations */

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features
  experimental: {
    // optimizeCss: true,  // Disabled - requires 'critters' package
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Image optimization - Aggressive caching and modern formats
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },

  // Output configuration
  output: 'standalone', // For Docker deployment

  // Compression
  compress: true,

  // PoweredBy header removal for security
  poweredByHeader: false,

  // Trailing slash preference
  trailingSlash: false,

  // React strict mode
  reactStrictMode: true,

  // Redirects (add as needed)
  async redirects() {
    return [
      // Example: redirect old URLs to new ones
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Headers for security and caching
  async headers() {
    // Extract origin from API URL (remove /api path completely)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    let apiOrigin = 'http://localhost:8000';

    try {
      // Parse URL and extract only origin (protocol + host + port)
      apiOrigin = new URL(apiUrl).origin;
    } catch (e) {
      // Fallback: remove /api if URL parsing fails
      apiOrigin = apiUrl.split('/api')[0];
    }

    // Environment-based configuration
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Development: allow localhost, 127.0.0.1, and WebSockets for React Fast Refresh
    // Production: use only the configured API origin
    const connectSrcOrigins = isDevelopment
      ? 'http://localhost:8000 http://127.0.0.1:8000 ws://localhost:3000 ws://127.0.0.1:3000 ws://localhost:* ws://127.0.0.1:*'
      : apiOrigin;

    // Content Security Policy
    // Note: upgrade-insecure-requests removed for development (localhost doesn't support HTTPS)
    const ContentSecurityPolicy = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:;
      font-src 'self' data:;
      connect-src 'self' ${connectSrcOrigins};
      form-action 'self' ${apiOrigin};
      media-src 'self';
      object-src 'none';
      frame-ancestors 'self';
      base-uri 'self';
      ${isDevelopment ? '' : 'upgrade-insecure-requests;'}
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Turbopack configuration (Next.js 16+)
  // Empty config to silence webpack/turbopack warning
  turbopack: {},

  // Webpack optimization (fallback for --webpack flag)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle these on client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Optimize bundle
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };

    return config;
  },
};

export default bundleAnalyzer(nextConfig);
