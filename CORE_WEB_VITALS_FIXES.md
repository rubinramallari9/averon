# 🎯 Core Web Vitals - Specific Fixes

## LCP (Largest Contentful Paint) - Target: < 2.5s

### Current Issues:
- Large images delay LCP
- Hero section loads client-side
- Fonts block rendering

### Fixes:

#### Fix 1: Preload Critical Assets

Add to `app/layout.tsx` in the `<head>`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AL">
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/averon_logobg.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="http://localhost:8000"
        />

        {/* Schema markup scripts */}
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Fix 2: Priority Images

Mark above-the-fold images as priority:

```tsx
<Image
  src="/averon_logobg.png"
  alt="Averon Digital Logo"
  width={160}
  height={40}
  priority // Critical for LCP
  quality={90}
/>
```

#### Fix 3: Font Optimization

Update `app/layout.tsx`:

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Prevent invisible text
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Prevent CLS
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});
```

#### Fix 4: Server-Side Rendering for Hero

Convert hero to SSR (already covered in Phase 2)

**Expected LCP Improvement: 4-6 seconds → 1.5-2.5 seconds**

---

## CLS (Cumulative Layout Shift) - Target: < 0.1

### Current Issues:
- Images load without dimensions
- Fonts cause layout shift
- Animations trigger reflow

### Fixes:

#### Fix 1: Define Image Dimensions

Always specify width and height:

```tsx
// Before (causes CLS):
<img src="/image.png" />

// After (prevents CLS):
<Image
  src="/image.png"
  alt="Description"
  width={400}
  height={800}
  className="w-full h-auto" // Responsive but maintains aspect ratio
/>
```

#### Fix 2: Reserve Space for Dynamic Content

```tsx
// Service card modal
const ServiceModal = dynamic(() => import('./ServiceModal'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-[70%] max-w-lg h-[400px] bg-purple-900/50 rounded-3xl animate-pulse" />
    </div>
  ),
});
```

#### Fix 3: CSS for Stable Animations

```css
/* Prevent layout shift during animations */
.animate-in {
  animation: fadeIn 0.6s ease-out forwards;
  transform: translateZ(0); /* Force GPU acceleration */
  will-change: opacity; /* Don't use transform in will-change */
}

/* Remove will-change after animation */
.animation-complete {
  will-change: auto;
}
```

#### Fix 4: Fixed Heights for Sections

```tsx
<section className="min-h-screen"> {/* Fixed height prevents shifts */}
  {/* Content */}
</section>
```

#### Fix 5: Font Metric Optimization

Add to globals.css:

```css
/* Prevent CLS from font loading */
@font-face {
  font-family: 'Geist Sans';
  src: local('Arial'), local('Helvetica');
  ascent-override: 95%;
  descent-override: 25%;
  line-gap-override: 0%;
  size-adjust: 107%;
}
```

**Expected CLS Improvement: 0.25 → <0.05**

---

## FID / INP (First Input Delay / Interaction to Next Paint) - Target: < 100ms

### Current Issues:
- Heavy JavaScript blocks main thread
- Scroll listeners cause jank
- No input debouncing

### Fixes:

#### Fix 1: Debounce Form Inputs

```tsx
import { useMemo } from 'react';
import debounce from 'lodash.debounce';

export default function ContactForm() {
  const handleInputChange = useMemo(
    () =>
      debounce((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
      }, 150),
    []
  );

  return (
    <input
      onChange={(e) => handleInputChange('email', e.target.value)}
      // ...
    />
  );
}
```

#### Fix 2: Throttle Scroll Events

```tsx
import { useCallback, useEffect } from 'react';
import throttle from 'lodash.throttle';

export default function ScrollAnimation() {
  const handleScroll = useCallback(
    throttle(() => {
      // Scroll logic
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}
```

#### Fix 3: Use Passive Event Listeners

```tsx
useEffect(() => {
  const handler = () => {
    // Handle scroll
  };

  window.addEventListener('scroll', handler, {
    passive: true, // Don't block scrolling
    capture: false,
  });

  return () => window.removeEventListener('scroll', handler);
}, []);
```

#### Fix 4: Web Workers for Heavy Calculations

Create `workers/calculations.worker.ts`:

```typescript
self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === 'CALCULATE') {
    // Heavy calculation
    const result = performHeavyCalculation(data);
    self.postMessage({ type: 'RESULT', result });
  }
});

function performHeavyCalculation(data: any) {
  // Expensive operation
  return data;
}
```

Use it:

```tsx
import { useEffect, useState } from 'react';

export default function Component() {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const w = new Worker(new URL('../workers/calculations.worker.ts', import.meta.url));
    setWorker(w);

    w.addEventListener('message', (e) => {
      console.log('Result:', e.data.result);
    });

    return () => w.terminate();
  }, []);

  const handleClick = () => {
    worker?.postMessage({ type: 'CALCULATE', data: {} });
  };

  return <button onClick={handleClick}>Calculate</button>;
}
```

#### Fix 5: RequestIdleCallback for Non-Critical Work

```tsx
useEffect(() => {
  const handleIdleCallback = (deadline: IdleDeadline) => {
    while (deadline.timeRemaining() > 0) {
      // Do non-critical work
      performNonCriticalTask();
    }
  };

  const id = requestIdleCallback(handleIdleCallback);

  return () => cancelIdleCallback(id);
}, []);
```

**Expected FID Improvement: 300ms → 50-80ms**

---

## TTFB (Time to First Byte) - Target: < 600ms

### Current Issues:
- No Django caching
- Slow database queries
- No CDN

### Fixes:

#### Fix 1: Enable Redis Caching (Already in PERFORMANCE_CODE_READY.md)

#### Fix 2: Add Response Caching Headers

Update Django `SEOMiddleware`:

```python
class SEOMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # Add security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'SAMEORIGIN'

        # Cache static resources
        if request.path.startswith('/static/'):
            response['Cache-Control'] = 'public, max-age=31536000, immutable'

        # Cache API responses
        elif request.path.startswith('/api/'):
            if request.method == 'GET':
                response['Cache-Control'] = 'public, max-age=300'  # 5 min
            else:
                response['Cache-Control'] = 'no-cache, no-store, must-revalidate'

        return response
```

#### Fix 3: Database Query Optimization

```python
# Before (N+1 query problem):
contacts = Contacts.objects.all()
for contact in contacts:
    print(contact.user.name)  # Hits database each time

# After (optimized):
contacts = Contacts.objects.all().select_related('user')  # Single query
```

#### Fix 4: Add Database Indexes (Already in PERFORMANCE_CODE_READY.md)

#### Fix 5: Use Edge Functions (Vercel/Cloudflare)

For Next.js API routes:

```typescript
// app/api/contact/route.ts
export const runtime = 'edge'; // Run on edge network

export async function POST(request: Request) {
  // Handle request
}
```

**Expected TTFB Improvement: 1500ms → 300-500ms**

---

## FCP (First Contentful Paint) - Target: < 1.8s

### Fixes:

#### Fix 1: Inline Critical CSS

Create `app/critical.css`:

```css
/* Only critical above-the-fold styles */
.hero {
  min-height: 100vh;
  background: linear-gradient(to bottom, #000, #581c87, #000);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
}
```

Inline in `layout.tsx`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const criticalCSS = `
  .hero { min-height: 100vh; background: linear-gradient(to bottom, #000, #581c87, #000); }
  .hero-title { font-size: 3rem; font-weight: 700; color: white; }
`;
```

#### Fix 2: Defer Non-Critical CSS

```tsx
<link
  rel="stylesheet"
  href="/styles/non-critical.css"
  media="print"
  onLoad="this.media='all'"
/>
```

#### Fix 3: Remove Render-Blocking Resources

Move all `<script>` tags to bottom of `<body>` or use `defer`:

```tsx
<Script
  src="/analytics.js"
  strategy="afterInteractive" // Load after page is interactive
/>
```

**Expected FCP Improvement: 2.5s → 1.0-1.5s**

---

## COMBINED OPTIMIZATION IMPACT

### Before Optimization:
```
Performance Score: 40-50/100
LCP: 8-12s ❌
FID: 300ms ❌
CLS: 0.25 ❌
TTFB: 1.5s ❌
FCP: 2.5s ❌
```

### After Optimization:
```
Performance Score: 90-95/100 ✅
LCP: 1.5-2.5s ✅ (80% improvement)
FID: 50-80ms ✅ (73% improvement)
CLS: <0.05 ✅ (80% improvement)
TTFB: 300-500ms ✅ (70% improvement)
FCP: 1.0-1.5s ✅ (60% improvement)
```

---

## MONITORING & TESTING

### Step 1: Install Lighthouse CI

```bash
npm install --save-dev @lhci/cli
```

Create `.lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

Add script:

```json
{
  "scripts": {
    "lighthouse": "lhci autorun"
  }
}
```

### Step 2: Web Vitals Monitoring

Create `app/components/WebVitals.tsx`:

```tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to your analytics service
    console.log(metric);

    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return null;
}
```

Add to `layout.tsx`:

```tsx
import { WebVitals } from './components/WebVitals';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
```

### Step 3: Bundle Size Monitoring

Add to CI/CD:

```yaml
# .github/workflows/performance.yml
name: Performance Check

on: [pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse
```

---

## DEPLOYMENT CHECKLIST

### Vercel Deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL
```

### Environment Variables:

```env
# Production .env
NEXT_PUBLIC_API_URL=https://api.averon.al
NODE_ENV=production
ANALYZE=false
```

### Django Production:

```bash
# Collect static files
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn core.wsgi:application -c gunicorn.conf.py

# Or with Docker
docker-compose up -d
```

---

## FINAL VERIFICATION

### 1. Run PageSpeed Insights:
- Visit: https://pagespeed.web.dev/
- Enter: https://averon.al
- Check all metrics are green

### 2. Test Mobile Performance:
- Use Chrome DevTools device emulation
- Test on real devices
- Check all Core Web Vitals

### 3. Verify Caching:
```bash
curl -I https://averon.al
# Should see: Cache-Control, ETag headers
```

### 4. Check Bundle Size:
```bash
npm run build
npm run analyze
# Review bundle analyzer report
```

### 5. Monitor Real User Metrics:
- Set up Google Analytics
- Monitor Web Vitals dashboard
- Track performance over time

---

## ESTIMATED TIMELINE

| Phase | Time | Impact |
|-------|------|--------|
| Image Optimization | 2-3 hours | Huge |
| Server Components | 4-6 hours | Huge |
| Code Splitting | 2-3 hours | High |
| Django Caching | 2-3 hours | High |
| Animations | 2-3 hours | Medium |
| Memoization | 1-2 hours | Medium |
| Font Optimization | 1 hour | Medium |
| Monitoring Setup | 1-2 hours | Low |
| **Total** | **15-23 hours** | **90%+ improvement** |

---

## PRIORITY ORDER

### Week 1 (Critical - Do First):
1. ✅ Optimize images (biggest win)
2. ✅ Server component refactor
3. ✅ Django caching setup
4. ✅ Add bundle analyzer

### Week 2 (High Priority):
5. ✅ Code splitting implementation
6. ✅ Memoization & re-render fixes
7. ✅ Font optimization
8. ✅ Animation optimization

### Week 3 (Polish):
9. ✅ Monitoring setup
10. ✅ Final testing & deployment

---

*You now have everything needed for 90%+ performance improvement!*
