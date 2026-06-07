import type { Metadata } from 'next';
import { baseUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Avox — AI Voice Receptionist by Averon | Albania',
  description: 'Avox is Albania\'s first AI voice receptionist. Answers calls 24/7 in Albanian and English, books appointments, handles FAQs, and never misses a customer. Built by Averon Agency.',
  keywords: [
    'Avox',
    'Avox AI',
    'Avox voice AI',
    'Avox Albania',
    'Avox AI receptionist',
    'Avox by Averon',
    'avox receptionist',
    'AI voice receptionist Albania',
    'receptionist AI shqiperi',
    'avox shqiperi',
    'Averon Avox',
  ],
  alternates: {
    canonical: `${baseUrl}/avox`,
  },
  openGraph: {
    title: 'Avox — AI Voice Receptionist by Averon',
    description: 'Albania\'s first AI voice receptionist. Answers calls 24/7 in Albanian & English, books appointments, never misses a customer.',
    url: `${baseUrl}/avox`,
    siteName: 'Averon Agency',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avox — AI Voice Receptionist by Averon | Albania',
    description: 'Albania\'s first AI voice receptionist. Answers calls 24/7 in Albanian & English.',
    creator: '@averondigital',
  },
};

export default function AvoxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
