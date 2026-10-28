// Homepage FAQ: rendered visibly in the homepage FAQ section and emitted as
// FAQPage JSON-LD next to it, so the markup always matches what's on screen.
// AI-assistant questions (Avox / Avtext, pricing, Albanian) live on
// /automations — see app/automations/faq.ts. Keep answers factual: no
// "best"/"only"/"leading" claims, no prices or timelines that aren't real.
import { baseUrl } from '@/lib/seo';

export type FaqItem = { question: string; answer: string };

export const homeFaqs: FaqItem[] = [
  {
    question: 'What is Averon Agency?',
    answer:
      'Averon Agency is an AI automation agency and web development studio in Tirana, Albania, founded in 2024. We build AI assistants and receptionists — Avox for phone calls and Avtext for Instagram and WhatsApp — and professional websites for businesses in Albania and Kosovo.',
  },
  {
    question: 'Where is Averon Agency located?',
    answer:
      'Our office is on Rruga e Kavajës in Tirana, Albania. We work with clients across Albania, Kosovo, North Macedonia and the Western Balkans, Monday to Friday, 09:00–18:00.',
  },
  {
    question: 'What services does Averon Agency offer?',
    answer:
      'Two service lines: AI automations (Avox AI voice receptionist, Avtext Instagram and Avtext WhatsApp chat assistants) and web services (custom websites, e-commerce, website redesign and SEO). Everything works in Albanian and English.',
  },
  {
    question: 'Does Averon build AI assistants, receptionists and chatbots?',
    answer:
      'Yes. Avox answers your business phone 24/7 and books appointments; Avtext answers Instagram DMs and WhatsApp messages, takes orders and captures leads. Both speak Albanian and English. The price is set based on your needs; details are on our AI automations page.',
  },
  {
    question: 'How long does it take to build a website with Averon?',
    answer:
      'A standard business website usually takes 1–3 weeks from kickoff to launch, depending on how ready the content is. E-commerce and custom web apps take longer. You get a clear timeline at the start of every project.',
  },
  {
    question: 'Sa kushton krijimi i një faqe interneti profesionale në Shqipëri?',
    answer:
      'Çmimi varet nga madhësia dhe kërkesat e faqes. Averon Agency ofron paketa të personalizuara për biznese në Shqipëri dhe Kosovë. Na kontaktoni për një ofertë falas, pa asnjë detyrim.',
  },
  {
    question: 'What technologies does Averon use to build websites?',
    answer:
      'Next.js, React, TypeScript and Tailwind CSS on the frontend, and Django for backends. Every site is mobile-first, fast and built with SEO in mind.',
  },
  {
    question: 'Does Averon Agency work with clients in Kosovo?',
    answer:
      'Yes. We work with businesses in Kosovo as well as Albania, North Macedonia and the wider Western Balkans, in Albanian and English.',
  },
  {
    question: 'What is AIEO, and how is it different from SEO?',
    answer:
      'SEO helps your website rank in Google and Bing. AIEO (AI Engine Optimization) helps AI assistants like ChatGPT, Perplexity, Claude and Gemini understand your business and recommend it when people ask about services you offer. Averon offers both.',
  },
  {
    question: 'How do I get my business recommended by ChatGPT or Perplexity?',
    answer:
      'Make your website easy for AI to read and trust: clear pages that answer real customer questions, structured data (schema markup), an llms.txt file, and the same name, address and phone everywhere online. Reviews and mentions on other sites matter too. This is what our AIEO service sets up.',
  },
];

export const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${baseUrl}/#faq`,
  mainEntity: homeFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};
