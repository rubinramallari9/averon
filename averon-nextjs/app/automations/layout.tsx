import type { Metadata } from 'next';
import { baseUrl, generateBreadcrumbSchema } from '@/lib/seo';
import { automationFaqSchema } from './faq';

export const metadata: Metadata = {
  title: 'AI Assistants / Receptionists in Albania — Avox & Avtext',
  description: 'AI assistants, receptionists and chatbots for Albanian businesses, built in Tirana. Avox answers phone calls and Avtext answers Instagram and WhatsApp messages, 24/7 in Albanian and English. Asistent / recepsionist AI për biznesin tuaj.',
  keywords: [
    'AI assistant albania',
    'AI assistants for business albania',
    'AI chatbot albania',
    'chatbot albania',
    'asistent AI',
    'asistent AI shqip',
    'asistent virtual per biznes',
    'recepsionist AI',
    'recepsionist virtual',
    'AI receptionist for business albania',
    'chatbot per biznes shqiperi',
    'avtext instagram',
    'avtext whatsapp',
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
    title: 'AI Assistants / Receptionists for Businesses in Albania — Averon',
    description: 'Avox answers your calls, Avtext answers Instagram and WhatsApp. AI assistants and receptionists in Albanian and English, built in Tirana for businesses that never want to miss a customer.',
    url: `${baseUrl}/automations`,
    siteName: 'Averon Agency',
    locale: 'en_AL',
    alternateLocale: ['sq_AL'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Assistants / Receptionists for Albanian Businesses — Averon',
    description: 'Avox for phone calls, Avtext for Instagram and WhatsApp. AI assistants and receptionists in Albanian and English.',
    creator: '@averondigital',
  },
};

// The three assistants as named services, so AI systems can cite each one
// with its channel, languages and area.
const assistantServices = [
  {
    name: 'Avox — AI Voice Assistant',
    url: `${baseUrl}/avox`,
    description: 'AI voice assistant that answers business phone calls 24/7 in Albanian and English, books appointments, answers FAQs and transfers urgent calls to staff.',
  },
  {
    name: 'Avtext Instagram — AI Chat Assistant for Instagram',
    url: `${baseUrl}/avtext-instagram`,
    description: 'AI assistant that replies to Instagram DMs, story replies and comment keywords 24/7 in Albanian and English, captures leads and sends catalogs and booking links.',
  },
  {
    name: 'Avtext WhatsApp — AI Chat Assistant for WhatsApp',
    url: `${baseUrl}/avtext-whatsapp`,
    description: 'AI assistant for WhatsApp that answers customers, takes orders and bookings, and sends broadcast promotions 24/7 in Albanian and English, with human handoff.',
  },
];

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': assistantServices.map((service) => ({
    '@type': 'Service',
    serviceType: 'AI assistant',
    ...service,
    provider: { '@type': 'Organization', name: 'Averon Agency', url: baseUrl },
    areaServed: [
      { '@type': 'Country', name: 'Albania' },
      { '@type': 'Country', name: 'Kosovo' },
    ],
  })),
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: baseUrl },
  { name: 'AI Automations', url: `${baseUrl}/automations` },
]);

export default function AutomationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(automationFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {children}
    </>
  );
}
