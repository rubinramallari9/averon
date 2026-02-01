import type { Metadata } from "next";
import { Inter, Space_Grotesk, Sora, Lora } from "next/font/google";
import "./globals.css";
import {
  defaultSEO,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo";
import DeferredStyles from "@/components/DeferredStyles";

// PRIMARY (60%) - Inter for body text, descriptions, most content
// Using 'swap' for immediate text rendering with fallback
// Reduced weights: removed 700 (not used for Inter)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '500', '600'],
});

// SECONDARY (30%) - Space Grotesk for major headings, navigation, buttons
// Reduced weights: removed 500 (not used for Space Grotesk)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['600', '700'],
});

// TERTIARY (10%) - Sora for hero accents, special callouts, stats
// Using 'optional' - if font doesn't load in time, use fallback permanently (faster Speed Index)
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: 'optional',
  preload: false, // Not critical for initial render
  adjustFontFallback: true,
  weight: ['600', '700'],
});

// BRAND FONT - Lora for "Averon" signature (balanced, sophisticated)
// Using 'optional' - non-critical, can use fallback
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: 'optional',
  preload: false, // Not critical for initial render
  adjustFontFallback: true,
  weight: ['500', '600'],
  style: ['italic'],
});

// SEO Metadata
export const metadata: Metadata = {
  ...defaultSEO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical LCP image - WebP format for smaller size */}
        <link
          rel="preload"
          href="/averon_logobg.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable} ${lora.variable} antialiased`}
      >
        <DeferredStyles />
        {children}
      </body>
    </html>
  );
}
