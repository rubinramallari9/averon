// When each public page's content last really changed. The sitemap reports
// these as lastModified and the pages show them as "Last updated", so bump a
// date only when that page's text changes — a fake "updated today" on every
// build teaches search engines to ignore the field.
export const pageUpdated: Record<string, string> = {
  '/': '2026-10-26',
  '/automations': '2026-10-27',
  '/avox': '2026-10-26',
  '/avtext-instagram': '2026-10-27',
  '/avtext-whatsapp': '2026-10-27',
  '/ai-receptionist-albania': '2026-10-27',
  '/our-work': '2026-10-25',
  '/about': '2026-10-27',
  '/guides': '2026-10-27',
  '/privacy-policy': '2026-09-17',
  '/sq/recepsionist-ai': '2026-10-27',
  '/sq/avox': '2026-10-27',
  '/sq/avtext-instagram': '2026-10-27',
  '/sq/avtext-whatsapp': '2026-10-27',
};

// English page ↔ Albanian page. Used for hreflang in page metadata, in the
// sitemap, and for the language switch on each page.
export const languagePairs: [en: string, sq: string][] = [
  ['/ai-receptionist-albania', '/sq/recepsionist-ai'],
  ['/avox', '/sq/avox'],
  ['/avtext-instagram', '/sq/avtext-instagram'],
  ['/avtext-whatsapp', '/sq/avtext-whatsapp'],
  ['/guides/ai-receptionist-cost-albania', '/guides/sa-kushton-recepsionist-ai'],
];

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  sq: ['janar', 'shkurt', 'mars', 'prill', 'maj', 'qershor', 'korrik', 'gusht', 'shtator', 'tetor', 'nëntor', 'dhjetor'],
};

/** "27 October 2026" / "27 tetor 2026" — formatted by hand so server and client match. */
export function formatDate(iso: string, lang: 'en' | 'sq' = 'en') {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[lang][m - 1]} ${y}`;
}
