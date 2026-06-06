import type { Metadata } from 'next';
import { baseUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Automations Albania — Avox, Instagram DM Bot, WhatsApp Bot',
  description: 'Averon is the first AI automation agency in Albania. Meet Avox — our AI voice receptionist answering calls 24/7 in Albanian & English. Plus Instagram DM bots and WhatsApp bots built for Albanian businesses.',
  keywords: [
    'AI automation albania',
    'avox voice ai albania',
    'instagram dm bot albania',
    'whatsapp bot albania',
    'ai receptionist albania',
    'automatizim AI shqiperi',
    'bot instagram shqiperi',
    'bot whatsapp shqiperi',
    'receptionist AI shqiperi',
    'agjencia e pare AI shqiperi',
    'first ai agency albania',
  ],
  alternates: {
    canonical: `${baseUrl}/automations`,
  },
  openGraph: {
    title: 'AI Business Automations in Albania — Averon',
    description: 'Albania\'s first AI automation agency. Avox voice AI, Instagram DM Bot, WhatsApp Bot — built for Albanian businesses that never want to miss a customer.',
    url: `${baseUrl}/automations`,
    siteName: 'Averon Digital',
    locale: 'en_AL',
    alternateLocale: ['sq_AL'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automations for Albanian Businesses — Averon',
    description: 'Avox voice AI, Instagram DM Bot, WhatsApp Bot. Albania\'s first AI automation agency.',
    creator: '@averondigital',
  },
};

export default function AutomationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
