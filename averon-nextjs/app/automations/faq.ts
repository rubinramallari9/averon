// Single source for the /automations FAQ: rendered visibly on the page and
// emitted as FAQPage JSON-LD by the layout, so the markup always matches what
// visitors (and AI crawlers) actually read. Answers stick to facts stated
// elsewhere on the site — don't add prices or timelines that aren't real.
export type AutomationFaq = { question: string; answer: string };

export const automationFaqs: AutomationFaq[] = [
  {
    question: 'Who builds AI assistants and receptionists for businesses in Albania?',
    answer:
      'Averon Agency, based in Tirana, builds AI assistants and receptionists for Albanian businesses: Avox, an AI voice receptionist that answers phone calls, and Avtext, an AI chat assistant for Instagram and WhatsApp. All of them speak Albanian and English and work 24/7.',
  },
  {
    question: 'What can an AI assistant do for my business?',
    answer:
      'It answers customers the moment they reach out, by phone, Instagram DM or WhatsApp, at any hour. It replies to common questions (prices, hours, location, services), books appointments, takes orders, captures leads, and hands the conversation to your team when a person is needed.',
  },
  {
    question: 'How much does an AI assistant / receptionist cost in Albania?',
    answer:
      'Avox, the AI voice receptionist, costs €300 one-time setup plus €50/month. Avtext for Instagram and WhatsApp is priced per business after a free consultation, depending on what it needs to handle.',
  },
  {
    question: 'Does the AI assistant speak Albanian?',
    answer:
      'Yes. Avox and Avtext are built for Albanian businesses and talk naturally in both Albanian and English, switching to whichever language the customer uses.',
  },
  {
    question: 'Can an AI chatbot answer Instagram and WhatsApp messages?',
    answer:
      'Yes. Avtext Instagram replies to DMs, story replies and comment keywords (like "PRICE" or "INFO"), and sends your catalog or booking link. Avtext WhatsApp handles customer questions, orders, bookings and broadcast promotions inside WhatsApp.',
  },
  {
    question: 'What happens when the AI assistant can’t answer something?',
    answer:
      'It hands over to a person. Avox transfers urgent or complex calls to your staff, and Avtext passes the chat to your team with the conversation so far, so the customer never has to repeat themselves.',
  },
  {
    question: 'Which businesses use AI assistants?',
    answer:
      'Any business that gets a lot of calls or messages: dental clinics, beauty salons, restaurants, law offices, private doctors, auto services, online shops, real estate, travel agencies and pharmacies.',
  },
  {
    question: 'Sa kushton një asistent / recepsionist AI për biznesin tim në Shqipëri?',
    answer:
      'Avox, recepsionisti zanor AI që u përgjigjet telefonatave, kushton €300 për instalimin dhe €50 në muaj. Çmimi i Avtext për Instagram dhe WhatsApp përcaktohet sipas biznesit, pas një konsultimi falas.',
  },
  {
    question: 'A flet shqip asistenti / recepsionisti AI?',
    answer:
      'Po. Avox dhe Avtext flasin shqip dhe anglisht, 24 orë në ditë, dhe u përgjigjen klientëve në telefon, Instagram dhe WhatsApp. I ndërton Averon Agency në Tiranë.',
  },
];

export const automationFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: automationFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};
