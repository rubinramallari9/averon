# Averon Digital - SEO Action Plan

> Complete checklist to rank `averon.agency` on Google

---

## Phase 1: Foundation (Day 1-3)

### Google Search Console Setup
- [ ] Verify ownership at https://search.google.com/search-console *(DONE)*
- [ ] Submit sitemap: `sitemap.xml`
- [ ] Request indexing for `https://averon.agency`
- [ ] Request indexing for `https://averon.agency/our-work`
- [ ] Check for any crawl errors in **Coverage** report
- [ ] Set up email alerts for critical issues

### Google Business Profile
- [ ] Create listing at https://business.google.com
- [ ] Business name: "Averon Digital" or "Averon - Web Development Agency"
- [ ] Category: "Web Designer" + "Software Company" + "Internet Marketing Service"
- [ ] Add address: Rruga e Kavajes, Tirana, Albania
- [ ] Add phone number
- [ ] Add website: https://averon.agency
- [ ] Add business hours
- [ ] Upload logo and cover photo
- [ ] Upload 5-10 photos of work/office
- [ ] Write business description with keywords
- [ ] Verify the listing (postcard/phone)

### Missing Assets
- [ ] Create `og-image.jpg` (1200x630px) - for Facebook/LinkedIn shares
- [ ] Create `twitter-image.jpg` (1200x630px) - for Twitter/X shares
- [ ] Add images to `/public` folder
- [ ] Create favicon set (16x16, 32x32, 180x180 apple-touch-icon)

---

## Phase 2: Social Presence (Week 1)

### Create Social Media Profiles
All profiles should link back to https://averon.agency

- [ ] **LinkedIn Company Page**
  - URL: linkedin.com/company/averon-digital
  - Complete all sections
  - Add services, logo, banner

- [ ] **Instagram Business**
  - URL: instagram.com/averondigital
  - Bio with website link
  - Post portfolio pieces

- [ ] **Facebook Business Page**
  - URL: facebook.com/averondigital
  - Complete about section
  - Add services and contact info

- [ ] **Twitter/X** (optional)
  - URL: twitter.com/averondigital

- [ ] **Behance** (for portfolio)
  - Showcase your best work
  - Link back to website

- [ ] **Dribbble** (for design work)
  - Showcase UI/UX work

### Update Schema.org with Social Links
After creating profiles, update `lib/seo.ts`:
```typescript
sameAs: [
  'https://www.linkedin.com/company/averon-digital',
  'https://www.instagram.com/averondigital',
  'https://www.facebook.com/averondigital',
  // add others
],
```

---

## Phase 3: Backlink Building (Week 2-4)

### High-Quality Directory Listings

#### International Web Agency Directories
- [ ] **Clutch.co** - https://clutch.co/profile (high authority)
- [ ] **DesignRush** - https://www.designrush.com
- [ ] **GoodFirms** - https://www.goodfirms.co
- [ ] **TopDevelopers** - https://www.topdevelopers.co
- [ ] **UpCity** - https://upcity.com
- [ ] **Agency Spotter** - https://www.agencyspotter.com
- [ ] **Digital Agency Network** - https://digitalagencynetwork.com

#### Developer/Tech Directories
- [ ] **GitHub** - Create organization, link to website
- [ ] **StackShare** - List your tech stack
- [ ] **Product Hunt** - If you launch any tools
- [ ] **Awwwards** - Submit your best work (paid)
- [ ] **CSS Design Awards** - Submit portfolio pieces

#### Albanian/Balkan Directories
- [ ] Albanian Yellow Pages
- [ ] Local business directories in Tirana
- [ ] Kosovo business directories
- [ ] Balkan tech/startup directories
- [ ] Chamber of Commerce listings

### Partner/Client Backlinks
- [ ] Ask clients to add "Website by Averon" link
- [ ] Get listed on client testimonial pages
- [ ] Partner with complementary businesses (photographers, marketers)

---

## Phase 4: Content Strategy (Month 1-2)

### Create Additional Pages
Each page = more keywords to rank for

- [ ] **Services Pages** (separate pages, not just sections)
  - `/services/web-development`
  - `/services/ecommerce-development`
  - `/services/seo-optimization`
  - `/services/website-redesign`
  - `/services/brand-design`

- [ ] **About Page** (`/about`)
  - Team info
  - Company story
  - Values and mission

- [ ] **Contact Page** (`/contact`)
  - Contact form
  - Map embed
  - Multiple contact methods

- [ ] **FAQ Page** (`/faq`)
  - Common questions
  - Use FAQ schema markup

- [ ] **Privacy Policy** (`/privacy-policy`)
- [ ] **Terms of Service** (`/terms`)

### Start a Blog
Blog = long-term organic traffic

- [ ] Create `/blog` page
- [ ] Write 2-4 articles per month
- [ ] Target long-tail keywords

**Blog Topic Ideas:**
- "How Much Does a Website Cost in Albania 2026"
- "Best E-commerce Platforms for Albanian Businesses"
- "Why Your Business Needs a Mobile-Responsive Website"
- "SEO Guide for Albanian Small Businesses"
- "Next.js vs WordPress: Which is Better for Your Business"
- "Web Design Trends 2026"
- "How to Choose a Web Development Agency in Tirana"

### Portfolio Case Studies
- [ ] Create detailed case study pages for each project
- [ ] Include: challenge, solution, results, testimonials
- [ ] Add before/after screenshots
- [ ] Include metrics if available

---

## Phase 5: Technical SEO (Ongoing)

### Performance Optimization
- [ ] Test Core Web Vitals: https://pagespeed.web.dev
- [ ] Target scores: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Optimize images (WebP/AVIF format)
- [ ] Enable caching headers
- [ ] Minimize JavaScript bundle size

### Mobile Optimization
- [ ] Test mobile usability in Search Console
- [ ] Ensure all buttons/links are tap-friendly
- [ ] Text readable without zooming
- [ ] No horizontal scrolling

### Security
- [ ] HTTPS enabled (Vercel does this automatically)
- [ ] Security headers configured (already done in next.config.ts)
- [ ] No mixed content warnings

### Structured Data
Already implemented, but verify:
- [ ] Test at https://search.google.com/test/rich-results
- [ ] Organization schema
- [ ] LocalBusiness schema
- [ ] Website schema
- [ ] Add FAQ schema when FAQ page is created
- [ ] Add Article schema for blog posts

---

## Phase 6: Local SEO (Albania Focus)

### Albanian Keywords to Target
Add these naturally to your content:

**English:**
- web development albania
- web design tirana
- website development albania
- ecommerce albania
- best web agency tirana
- affordable website albania

**Albanian:**
- krijim faqe interneti
- dizajn web tiranë
- zhvillim web shqipëri
- agjenci digjitale tiranë
- faqe interneti profesionale

### Local Citations
Ensure consistent NAP (Name, Address, Phone) across:
- [ ] Google Business Profile
- [ ] Facebook
- [ ] LinkedIn
- [ ] All directory listings
- [ ] Website footer/contact page

### Reviews Strategy
- [ ] Ask happy clients for Google reviews
- [ ] Respond to all reviews (positive and negative)
- [ ] Target: 10+ reviews with 4.5+ average
- [ ] Add review schema when you have testimonials

---

## Phase 7: Monitoring & Maintenance (Weekly)

### Weekly Tasks
- [ ] Check Google Search Console for errors
- [ ] Monitor keyword rankings
- [ ] Review traffic in analytics
- [ ] Respond to any inquiries

### Monthly Tasks
- [ ] Publish 2-4 blog posts
- [ ] Update portfolio with new projects
- [ ] Build 2-5 new backlinks
- [ ] Check Core Web Vitals
- [ ] Update sitemap if new pages added

### Quarterly Tasks
- [ ] Comprehensive SEO audit
- [ ] Competitor analysis
- [ ] Content refresh (update old posts)
- [ ] Review and update keywords strategy

---

## Tools to Use

### Free Tools
| Tool | Purpose | URL |
|------|---------|-----|
| Google Search Console | Monitor search performance | search.google.com/search-console |
| Google Analytics | Track website traffic | analytics.google.com |
| PageSpeed Insights | Performance testing | pagespeed.web.dev |
| Rich Results Test | Validate structured data | search.google.com/test/rich-results |
| Mobile-Friendly Test | Check mobile usability | search.google.com/test/mobile-friendly |

### Recommended Paid Tools (Optional)
| Tool | Purpose | Price |
|------|---------|-------|
| Ahrefs | Backlink analysis, keyword research | $99/mo |
| SEMrush | All-in-one SEO | $120/mo |
| Screaming Frog | Technical SEO audits | Free up to 500 URLs |

---

## Expected Timeline

| Milestone | Timeframe |
|-----------|-----------|
| Site indexed by Google | 1-2 weeks |
| Start appearing in search results | 2-4 weeks |
| Ranking for brand name "Averon" | 1-2 months |
| Ranking for low-competition keywords | 2-3 months |
| Ranking for medium-competition keywords | 3-6 months |
| Ranking for high-competition keywords | 6-12 months |

---

## Quick Wins Checklist

Do these FIRST for fastest impact:

1. [ ] Submit sitemap to Google Search Console
2. [ ] Request indexing for main pages
3. [ ] Create Google Business Profile
4. [ ] Create LinkedIn company page
5. [ ] Create OG image for social sharing
6. [ ] Get listed on Clutch.co
7. [ ] Ask 3 clients for Google reviews
8. [ ] Write first blog post targeting "web development albania"

---

## Notes

- SEO is a marathon, not a sprint - expect 3-6 months for significant results
- Quality over quantity - 1 good backlink > 100 spam links
- Content is king - more useful content = more keywords = more traffic
- Mobile-first - Google primarily uses mobile version for ranking
- User experience matters - fast, easy to navigate, valuable content

---

*Last updated: January 2026*
*Domain: averon.agency*
