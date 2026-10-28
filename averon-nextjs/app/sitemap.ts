import { MetadataRoute } from 'next'
import { pageUpdated, languagePairs } from '@/lib/pages'
import { guides } from '@/lib/content/guides'

const baseUrl = 'https://averon.agency'

// Real pages only (no #anchors — search engines treat those as the same
// URL), each with the date its content last changed and, where a
// translation exists, its English/Albanian pair as hreflang alternates.
const priorities: Record<string, number> = {
  '/': 1.0,
  '/automations': 0.95,
  '/avox': 0.95,
  '/ai-receptionist-albania': 0.95,
  '/sq/recepsionist-ai': 0.95,
  '/avtext-instagram': 0.9,
  '/avtext-whatsapp': 0.9,
  '/sq/avox': 0.9,
  '/sq/avtext-instagram': 0.85,
  '/sq/avtext-whatsapp': 0.85,
  '/our-work': 0.8,
  '/about': 0.7,
  '/guides': 0.7,
  '/privacy-policy': 0.2,
}

function languages(path: string) {
  const pair = languagePairs.find(([en, sq]) => en === path || sq === path)
  return pair ? { languages: { en: `${baseUrl}${pair[0]}`, sq: `${baseUrl}${pair[1]}` } } : {}
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = Object.entries(pageUpdated).map(([path, updated]) => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: updated,
    changeFrequency: path === '/privacy-policy' ? 'yearly' : 'monthly',
    priority: priorities[path] ?? 0.5,
    alternates: languages(path),
  }))

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: g.updated,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: languages(`/guides/${g.slug}`),
  }))

  return [...pages, ...guidePages]
}
