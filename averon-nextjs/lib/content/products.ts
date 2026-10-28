// Text for the per-product pages (/avtext-instagram, /avtext-whatsapp and the
// Albanian /sq/* versions, including /sq/avox). One object per page: the
// layout reads it for metadata + JSON-LD, the page renders it, so the
// structured data always matches the visible text.
//
// Facts only: no prices, timelines or results that Averon hasn't confirmed.
// Prices are never listed: every product is priced based on the business's needs.
import type { QA } from '@/lib/seo';

export type Lang = 'en' | 'sq';
export type ProductVisual = 'instagram' | 'whatsapp' | 'avox';

export type ProductContent = {
  path: string;
  lang: Lang;
  /** The same page in the other language. */
  alt: { href: string; label: string };
  back: { href: string; label: string };
  meta: { title: string; description: string; keywords: string[] };
  service: { name: string; serviceType: string; description: string };
  visual: ProductVisual;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  subtitle: string;
  primaryCta: string;
  whatIs: { eyebrow: string; title: string; paragraphs: string[] };
  featuresTitle: string;
  features: { title: string; desc: string }[];
  stepsTitle: string;
  steps: { title: string; desc: string }[];
  industriesTitle: string;
  industries: string[];
  pricing: { title: string; text: string };
  faqTitle: string;
  faq: QA[];
  cta: { title: string; text: string; button: string };
  footerTagline: string;
};

// The same three steps for every product: consultation → build → live.
const stepsEn = (product: string) => [
  { title: 'Free consultation', desc: `We learn how your business works: your services, prices, hours and the questions customers ask most. You tell us what ${product} should handle and when it should pass a conversation to your team.` },
  { title: 'We build it for your business', desc: `We set up ${product} with your information and your tone of voice, in Albanian and English. You test it and ask for changes before it goes live.` },
  { title: 'It goes live and we look after it', desc: `${product} starts answering customers 24/7. We keep it updated when your prices, menu or hours change.` },
];

const stepsSq = (product: string) => [
  { title: 'Konsultim falas', desc: `Mësojmë si funksionon biznesi juaj: shërbimet, çmimet, oraret dhe pyetjet që klientët bëjnë më shpesh. Ju na tregoni çfarë duhet të bëjë ${product} dhe kur duhet t’ia kalojë bisedën stafit tuaj.` },
  { title: 'E ndërtojmë për biznesin tuaj', desc: `E konfigurojmë ${product} me informacionin dhe stilin tuaj të komunikimit, në shqip dhe anglisht. Ju e provoni dhe kërkoni ndryshime përpara se të nisë.` },
  { title: 'Niset dhe ne kujdesemi për të', desc: `${product} fillon t’u përgjigjet klientëve 24/7. Ne e përditësojmë kur ndryshojnë çmimet, menuja ose oraret tuaja.` },
];

const avtextPriceEn = 'The price is set based on your needs: just answering questions, or also orders, bookings and promotions. We agree it with you after a free consultation, with no commitment.';
const avtextPriceSq = 'Çmimi përcaktohet sipas nevojave tuaja: vetëm përgjigje pyetjesh, apo edhe porosi, rezervime dhe promocione. E caktojmë bashkë me ju pas një konsultimi falas, pa asnjë detyrim.';

export const avtextInstagramEn: ProductContent = {
  path: '/avtext-instagram',
  lang: 'en',
  alt: { href: '/sq/avtext-instagram', label: 'Shqip' },
  back: { href: '/automations', label: 'All Automations' },
  meta: {
    title: 'Avtext Instagram — AI Assistant for Instagram DMs in Albania',
    description: 'Avtext Instagram is an AI assistant that answers Instagram DMs, story replies and comment keywords 24/7 in Albanian and English. Captures leads and sends your catalog or booking link. Built by Averon Agency in Tirana.',
    keywords: ['Avtext Instagram', 'instagram dm bot albania', 'AI assistant instagram', 'instagram chatbot albania', 'bot instagram shqiperi', 'automatizim instagram', 'instagram automation albania', 'AI chatbot instagram shqip'],
  },
  service: {
    name: 'Avtext Instagram — AI Chat Assistant for Instagram',
    serviceType: 'AI chat assistant',
    description: 'AI assistant that replies to Instagram DMs, story replies and comment keywords 24/7 in Albanian and English, captures leads, sends catalogs and booking links, and hands the chat to staff when needed.',
  },
  visual: 'instagram',
  eyebrow: 'AI Assistant for Instagram · By Averon',
  h1: 'Avtext ',
  h1Accent: 'Instagram',
  subtitle: 'An AI assistant that answers every Instagram DM, story reply and comment in seconds, in Albanian and English, 24 hours a day. Followers get an answer while they’re still interested.',
  primaryCta: 'Get Avtext Instagram',
  whatIs: {
    eyebrow: 'What is Avtext Instagram?',
    title: 'Your Instagram inbox, answered around the clock',
    paragraphs: [
      'Avtext Instagram is an AI chat assistant built by Averon Agency for businesses in Albania and Kosovo. It reads incoming Instagram messages and replies the way a trained member of your team would: prices, availability, opening hours, location, delivery.',
      'When someone comments a keyword like “PRICE” or “INFO” on your post, Avtext sends them a DM with the details. It collects phone numbers and booking requests, sends your catalog or booking link, and passes the conversation to a person whenever it should.',
    ],
  },
  featuresTitle: 'What Avtext Instagram handles',
  features: [
    { title: 'Instant DM and comment replies', desc: 'Every incoming message gets an answer in seconds, day or night, so followers feel heard.' },
    { title: 'Comment keyword triggers', desc: 'Someone comments “PRICE” or “INFO” on a post and Avtext DMs them the answer straight away.' },
    { title: 'Lead capture', desc: 'Collects names, phone numbers and what the customer wants through a natural conversation.' },
    { title: 'Catalog and booking links', desc: 'Sends your menu, price list, catalog or booking page when a customer asks for it.' },
    { title: 'Albanian and English', desc: 'Replies in the language the customer writes in.' },
    { title: 'Human handoff', desc: 'Passes the chat to your team with the conversation so far, so the customer never repeats themselves.' },
  ],
  stepsTitle: 'How it works',
  steps: stepsEn('Avtext Instagram'),
  industriesTitle: 'Who uses Avtext Instagram',
  industries: ['Online shops', 'Clothing stores', 'Restaurants', 'Beauty salons & spas', 'Aesthetic clinics', 'Real estate', 'Gyms', 'Event venues'],
  pricing: { title: 'How much does Avtext Instagram cost?', text: avtextPriceEn },
  faqTitle: 'Avtext Instagram, answered',
  faq: [
    { question: 'What is Avtext Instagram?', answer: 'Avtext Instagram is an AI assistant by Averon Agency that answers Instagram DMs, story replies and comment keywords 24/7 in Albanian and English. It captures leads, sends your catalog or booking link, and hands the chat to your team when needed.' },
    { question: 'Can Avtext reply to Instagram comments?', answer: 'Yes. When someone comments a keyword you choose, like “PRICE” or “INFO”, on a post, Avtext sends them a DM with the answer.' },
    { question: 'Does it reply in Albanian?', answer: 'Yes. Avtext Instagram writes naturally in Albanian and English and answers in the language the customer uses.' },
    { question: 'What happens if the AI can’t answer a message?', answer: 'It hands the conversation to your team, with everything the customer has already said, so nobody has to start over.' },
    { question: 'How much does Avtext Instagram cost?', answer: avtextPriceEn },
    { question: 'Can I have Avtext on Instagram and WhatsApp together?', answer: 'Yes. Avtext Instagram and Avtext WhatsApp can run side by side, and Avox can answer your phone calls, so every channel is covered.' },
  ],
  cta: { title: 'Answer every DM, even at 3am', text: 'Tell us about your business and we’ll show you how Avtext Instagram would handle your messages. Free consultation, no commitment.', button: 'Book a free consultation' },
  footerTagline: 'Avtext Instagram — AI assistant for Instagram DMs, built by Averon Agency in Tirana',
};

export const avtextWhatsappEn: ProductContent = {
  path: '/avtext-whatsapp',
  lang: 'en',
  alt: { href: '/sq/avtext-whatsapp', label: 'Shqip' },
  back: { href: '/automations', label: 'All Automations' },
  meta: {
    title: 'Avtext WhatsApp — AI Assistant for WhatsApp in Albania',
    description: 'Avtext WhatsApp is an AI assistant that answers customers, takes orders and bookings, and sends promotions on WhatsApp 24/7 in Albanian and English, with human handoff. Built by Averon Agency in Tirana.',
    keywords: ['Avtext WhatsApp', 'whatsapp bot albania', 'whatsapp chatbot albania', 'AI assistant whatsapp', 'bot whatsapp shqiperi', 'chatbot whatsapp per biznes', 'whatsapp automation albania', 'automatizim whatsapp'],
  },
  service: {
    name: 'Avtext WhatsApp — AI Chat Assistant for WhatsApp',
    serviceType: 'AI chat assistant',
    description: 'AI assistant for WhatsApp that answers customers, takes orders and bookings, sends reminders and broadcast promotions 24/7 in Albanian and English, with human handoff.',
  },
  visual: 'whatsapp',
  eyebrow: 'AI Assistant for WhatsApp · By Averon',
  h1: 'Avtext ',
  h1Accent: 'WhatsApp',
  subtitle: 'An AI assistant that answers your customers on WhatsApp in seconds, takes orders and bookings, and sends promotions, in Albanian and English, 24/7.',
  primaryCta: 'Get Avtext WhatsApp',
  whatIs: {
    eyebrow: 'What is Avtext WhatsApp?',
    title: 'Customer service inside the app your customers already use',
    paragraphs: [
      'WhatsApp is where Albanian customers message businesses. Avtext WhatsApp is an AI chat assistant built by Averon Agency that answers those messages for you: prices, availability, directions, opening hours, delivery times.',
      'It takes orders and bookings, sends confirmations and reminders, shares your catalog, and lets you send promotions to your customer list. When a conversation needs a person, it passes the chat to your team.',
    ],
  },
  featuresTitle: 'What Avtext WhatsApp handles',
  features: [
    { title: 'Instant customer replies', desc: 'Answers price, availability and location questions in seconds, at any hour.' },
    { title: 'Orders and bookings', desc: 'Collects order details, confirms bookings and sends reminders, without staff typing replies.' },
    { title: 'Broadcast promotions', desc: 'Send offers and updates to your customer list in one go.' },
    { title: 'Catalog sharing', desc: 'Sends your product or service catalog when a customer asks for it.' },
    { title: 'Albanian and English', desc: 'Replies in the language the customer writes in.' },
    { title: 'Human handoff', desc: 'Passes the chat to your team with the conversation so far when a person is needed.' },
  ],
  stepsTitle: 'How it works',
  steps: stepsEn('Avtext WhatsApp'),
  industriesTitle: 'Who uses Avtext WhatsApp',
  industries: ['Restaurants & delivery', 'Online shops', 'Pharmacies', 'Travel agencies', 'Repair services', 'Clinics', 'Hotels', 'Car rentals'],
  pricing: { title: 'How much does Avtext WhatsApp cost?', text: avtextPriceEn },
  faqTitle: 'Avtext WhatsApp, answered',
  faq: [
    { question: 'What is Avtext WhatsApp?', answer: 'Avtext WhatsApp is an AI assistant by Averon Agency that answers customer messages on WhatsApp 24/7 in Albanian and English. It takes orders and bookings, sends reminders, catalogs and promotions, and hands the chat to your team when needed.' },
    { question: 'Can a WhatsApp chatbot take orders?', answer: 'Yes. Avtext WhatsApp collects the order details in the chat, confirms the order with the customer and can tell them the expected delivery time you set.' },
    { question: 'Does it speak Albanian?', answer: 'Yes. Avtext WhatsApp writes naturally in Albanian and English and answers in the language the customer uses.' },
    { question: 'Can I still answer customers myself?', answer: 'Yes. Your team can take over any conversation, and Avtext hands chats over on its own when a person is needed.' },
    { question: 'How much does Avtext WhatsApp cost?', answer: avtextPriceEn },
    { question: 'Can Avtext also handle Instagram and phone calls?', answer: 'Avtext Instagram covers Instagram DMs and comments, and Avox answers phone calls. They can run together so every channel is covered.' },
  ],
  cta: { title: 'Never leave a WhatsApp message on read', text: 'Tell us about your business and we’ll show you how Avtext WhatsApp would handle your customers. Free consultation, no commitment.', button: 'Book a free consultation' },
  footerTagline: 'Avtext WhatsApp — AI assistant for WhatsApp, built by Averon Agency in Tirana',
};

export const avtextInstagramSq: ProductContent = {
  path: '/sq/avtext-instagram',
  lang: 'sq',
  alt: { href: '/avtext-instagram', label: 'English' },
  back: { href: '/sq/recepsionist-ai', label: 'Të gjitha shërbimet' },
  meta: {
    title: 'Avtext Instagram — Asistent AI për mesazhet në Instagram',
    description: 'Avtext Instagram është asistent AI që u përgjigjet mesazheve (DM), përgjigjeve në story dhe komenteve në Instagram 24/7, në shqip dhe anglisht. Mbledh kontakte dhe dërgon katalogun ose linkun e rezervimit. Nga Averon Agency, Tiranë.',
    keywords: ['Avtext Instagram', 'bot instagram shqiperi', 'asistent AI instagram', 'chatbot instagram shqip', 'automatizim instagram', 'automatizim mesazhesh instagram', 'pergjigje automatike instagram'],
  },
  service: {
    name: 'Avtext Instagram — Asistent AI për Instagram',
    serviceType: 'Asistent AI për chat',
    description: 'Asistent AI që u përgjigjet mesazheve, përgjigjeve në story dhe komenteve me fjalë kyçe në Instagram 24/7, në shqip dhe anglisht, mbledh kontakte, dërgon katalogë dhe linke rezervimi, dhe ia kalon bisedën stafit kur duhet.',
  },
  visual: 'instagram',
  eyebrow: 'Asistent AI për Instagram · Nga Averon',
  h1: 'Avtext ',
  h1Accent: 'Instagram',
  subtitle: 'Një asistent AI që u përgjigjet brenda sekondave çdo mesazhi, përgjigjeje në story dhe komenti në Instagram, në shqip dhe anglisht, 24 orë në ditë. Ndjekësit marrin përgjigje sa janë ende të interesuar.',
  primaryCta: 'Merr Avtext Instagram',
  whatIs: {
    eyebrow: 'Çfarë është Avtext Instagram?',
    title: 'Mesazhet e Instagramit, me përgjigje në çdo orë',
    paragraphs: [
      'Avtext Instagram është asistent AI për chat, i ndërtuar nga Averon Agency për bizneset në Shqipëri dhe Kosovë. Lexon mesazhet që vijnë në Instagram dhe përgjigjet ashtu si do të përgjigjej një punonjës i trajnuar: çmime, disponueshmëri, orare, vendndodhje, dërgesa.',
      'Kur dikush komenton një fjalë kyçe si “ÇMIMI” ose “INFO” në postimin tuaj, Avtext i dërgon një mesazh me detajet. Mbledh numra telefoni dhe kërkesa për rezervim, dërgon katalogun ose linkun e rezervimit, dhe ia kalon bisedën një personi sa herë që duhet.',
    ],
  },
  featuresTitle: 'Çfarë bën Avtext Instagram',
  features: [
    { title: 'Përgjigje të menjëhershme në mesazhe dhe komente', desc: 'Çdo mesazh merr përgjigje brenda sekondave, ditë e natë, që ndjekësit të ndihen të dëgjuar.' },
    { title: 'Komente me fjalë kyçe', desc: 'Dikush komenton “ÇMIMI” ose “INFO” në një postim dhe Avtext i dërgon menjëherë përgjigjen në mesazh.' },
    { title: 'Mbledhje kontaktesh', desc: 'Merr emrin, numrin e telefonit dhe çfarë kërkon klienti, përmes një bisede të natyrshme.' },
    { title: 'Katalog dhe link rezervimi', desc: 'Dërgon menunë, listën e çmimeve, katalogun ose faqen e rezervimit kur klienti i kërkon.' },
    { title: 'Shqip dhe anglisht', desc: 'Përgjigjet në gjuhën në të cilën shkruan klienti.' },
    { title: 'Kalim te stafi', desc: 'Ia kalon bisedën ekipit tuaj bashkë me gjithçka është thënë, që klienti të mos përsërisë asgjë.' },
  ],
  stepsTitle: 'Si funksionon',
  steps: stepsSq('Avtext Instagram'),
  industriesTitle: 'Kush e përdor Avtext Instagram',
  industries: ['Dyqane online', 'Dyqane veshjesh', 'Restorante', 'Salone bukurie & spa', 'Klinika estetike', 'Agjenci imobiliare', 'Palestra', 'Salla eventesh'],
  pricing: { title: 'Sa kushton Avtext Instagram?', text: avtextPriceSq },
  faqTitle: 'Pyetje për Avtext Instagram',
  faq: [
    { question: 'Çfarë është Avtext Instagram?', answer: 'Avtext Instagram është asistent AI nga Averon Agency që u përgjigjet mesazheve, përgjigjeve në story dhe komenteve me fjalë kyçe në Instagram 24/7, në shqip dhe anglisht. Mbledh kontakte, dërgon katalogun ose linkun e rezervimit dhe ia kalon bisedën stafit kur duhet.' },
    { question: 'A mund t’u përgjigjet Avtext komenteve në Instagram?', answer: 'Po. Kur dikush komenton një fjalë kyçe që zgjidhni ju, si “ÇMIMI” ose “INFO”, Avtext i dërgon përgjigjen në mesazh.' },
    { question: 'A shkruan shqip?', answer: 'Po. Avtext Instagram shkruan natyrshëm në shqip dhe anglisht dhe përgjigjet në gjuhën që përdor klienti.' },
    { question: 'Çfarë ndodh kur AI nuk di të përgjigjet?', answer: 'Ia kalon bisedën ekipit tuaj, bashkë me gjithçka që ka thënë klienti, që askush të mos nisë nga e para.' },
    { question: 'Sa kushton Avtext Instagram?', answer: avtextPriceSq },
    { question: 'A mund ta kem Avtext në Instagram dhe WhatsApp njëkohësisht?', answer: 'Po. Avtext Instagram dhe Avtext WhatsApp punojnë bashkë, dhe Avox mund t’u përgjigjet telefonatave, që çdo kanal të jetë i mbuluar.' },
  ],
  cta: { title: 'Përgjigjuni çdo mesazhi, edhe në 3 të natës', text: 'Na tregoni për biznesin tuaj dhe do t’ju tregojmë si do t’i trajtonte Avtext Instagram mesazhet tuaja. Konsultim falas, pa detyrim.', button: 'Rezervo konsultim falas' },
  footerTagline: 'Avtext Instagram — asistent AI për mesazhet në Instagram, nga Averon Agency në Tiranë',
};

export const avtextWhatsappSq: ProductContent = {
  path: '/sq/avtext-whatsapp',
  lang: 'sq',
  alt: { href: '/avtext-whatsapp', label: 'English' },
  back: { href: '/sq/recepsionist-ai', label: 'Të gjitha shërbimet' },
  meta: {
    title: 'Avtext WhatsApp — Asistent AI për WhatsApp në Shqipëri',
    description: 'Avtext WhatsApp është asistent AI që u përgjigjet klientëve, merr porosi dhe rezervime, dhe dërgon promocione në WhatsApp 24/7, në shqip dhe anglisht. Nga Averon Agency, Tiranë.',
    keywords: ['Avtext WhatsApp', 'bot whatsapp shqiperi', 'chatbot whatsapp shqip', 'chatbot whatsapp per biznes', 'asistent AI whatsapp', 'automatizim whatsapp', 'porosi ne whatsapp automatike'],
  },
  service: {
    name: 'Avtext WhatsApp — Asistent AI për WhatsApp',
    serviceType: 'Asistent AI për chat',
    description: 'Asistent AI për WhatsApp që u përgjigjet klientëve, merr porosi dhe rezervime, dërgon kujtesa dhe promocione 24/7, në shqip dhe anglisht, dhe ia kalon bisedën stafit kur duhet.',
  },
  visual: 'whatsapp',
  eyebrow: 'Asistent AI për WhatsApp · Nga Averon',
  h1: 'Avtext ',
  h1Accent: 'WhatsApp',
  subtitle: 'Një asistent AI që u përgjigjet klientëve tuaj në WhatsApp brenda sekondave, merr porosi dhe rezervime, dhe dërgon promocione, në shqip dhe anglisht, 24/7.',
  primaryCta: 'Merr Avtext WhatsApp',
  whatIs: {
    eyebrow: 'Çfarë është Avtext WhatsApp?',
    title: 'Shërbim klienti brenda aplikacionit që klientët përdorin çdo ditë',
    paragraphs: [
      'Në Shqipëri klientët u shkruajnë bizneseve në WhatsApp. Avtext WhatsApp është asistent AI për chat, i ndërtuar nga Averon Agency, që u përgjigjet këtyre mesazheve për ju: çmime, disponueshmëri, adresa, orare, kohë dërgese.',
      'Merr porosi dhe rezervime, dërgon konfirmime dhe kujtesa, ndan katalogun tuaj dhe ju lejon të dërgoni promocione te lista e klientëve. Kur biseda ka nevojë për një person, ia kalon ekipit tuaj.',
    ],
  },
  featuresTitle: 'Çfarë bën Avtext WhatsApp',
  features: [
    { title: 'Përgjigje të menjëhershme', desc: 'U përgjigjet pyetjeve për çmime, disponueshmëri dhe vendndodhje brenda sekondave, në çdo orë.' },
    { title: 'Porosi dhe rezervime', desc: 'Merr detajet e porosisë, konfirmon rezervimet dhe dërgon kujtesa, pa pasur nevojë që stafi të shkruajë.' },
    { title: 'Promocione për të gjithë klientët', desc: 'Dërgoni oferta dhe njoftime te lista e klientëve me një hap.' },
    { title: 'Ndarje katalogu', desc: 'Dërgon katalogun e produkteve ose shërbimeve kur klienti e kërkon.' },
    { title: 'Shqip dhe anglisht', desc: 'Përgjigjet në gjuhën në të cilën shkruan klienti.' },
    { title: 'Kalim te stafi', desc: 'Ia kalon bisedën ekipit tuaj bashkë me gjithçka është thënë, kur duhet një person.' },
  ],
  stepsTitle: 'Si funksionon',
  steps: stepsSq('Avtext WhatsApp'),
  industriesTitle: 'Kush e përdor Avtext WhatsApp',
  industries: ['Restorante & dërgesa', 'Dyqane online', 'Farmaci', 'Agjenci udhëtimi', 'Servise riparimi', 'Klinika', 'Hotele', 'Makina me qira'],
  pricing: { title: 'Sa kushton Avtext WhatsApp?', text: avtextPriceSq },
  faqTitle: 'Pyetje për Avtext WhatsApp',
  faq: [
    { question: 'Çfarë është Avtext WhatsApp?', answer: 'Avtext WhatsApp është asistent AI nga Averon Agency që u përgjigjet mesazheve të klientëve në WhatsApp 24/7, në shqip dhe anglisht. Merr porosi dhe rezervime, dërgon kujtesa, katalogë dhe promocione, dhe ia kalon bisedën stafit kur duhet.' },
    { question: 'A mund të marrë porosi një chatbot në WhatsApp?', answer: 'Po. Avtext WhatsApp merr detajet e porosisë në chat, ia konfirmon klientit dhe mund t’i tregojë kohën e dërgesës që caktoni ju.' },
    { question: 'A flet shqip?', answer: 'Po. Avtext WhatsApp shkruan natyrshëm në shqip dhe anglisht dhe përgjigjet në gjuhën që përdor klienti.' },
    { question: 'A mund t’u përgjigjem klientëve edhe vetë?', answer: 'Po. Ekipi juaj mund ta marrë çdo bisedë në dorë, dhe Avtext ia kalon vetë bisedën stafit kur duhet një person.' },
    { question: 'Sa kushton Avtext WhatsApp?', answer: avtextPriceSq },
    { question: 'A mund të përgjigjet Avtext edhe në Instagram dhe në telefon?', answer: 'Avtext Instagram mbulon mesazhet dhe komentet në Instagram, ndërsa Avox u përgjigjet telefonatave. Mund të punojnë bashkë që çdo kanal të jetë i mbuluar.' },
  ],
  cta: { title: 'Asnjë mesazh në WhatsApp pa përgjigje', text: 'Na tregoni për biznesin tuaj dhe do t’ju tregojmë si do t’i trajtonte Avtext WhatsApp klientët tuaj. Konsultim falas, pa detyrim.', button: 'Rezervo konsultim falas' },
  footerTagline: 'Avtext WhatsApp — asistent AI për WhatsApp, nga Averon Agency në Tiranë',
};

export const avoxSq: ProductContent = {
  path: '/sq/avox',
  lang: 'sq',
  alt: { href: '/avox', label: 'English' },
  back: { href: '/sq/recepsionist-ai', label: 'Të gjitha shërbimet' },
  meta: {
    title: 'Avox — Recepsionist AI që u përgjigjet telefonatave, në shqip',
    description: 'Avox është recepsionist zanor AI që u përgjigjet telefonatave të biznesit tuaj 24/7 në shqip dhe anglisht, rezervon takime dhe kalon telefonatat urgjente te stafi. Çmimi sipas nevojave tuaja. Nga Averon Agency, Tiranë.',
    keywords: ['Avox', 'recepsionist AI', 'recepsionist virtual', 'recepsionist AI shqip', 'asistent zanor AI', 'pergjigje automatike telefonatave', 'sekretare virtuale', 'receptionist AI shqiperi'],
  },
  service: {
    name: 'Avox — Recepsionist zanor AI',
    serviceType: 'Recepsionist AI',
    description: 'Recepsionist zanor AI që u përgjigjet telefonatave të biznesit 24/7 në shqip dhe anglisht, rezervon takime, u përgjigjet pyetjeve të shpeshta dhe kalon telefonatat urgjente te stafi.',
  },
  visual: 'avox',
  eyebrow: 'Recepsionist AI · Nga Averon',
  h1: '',
  h1Accent: 'Avox',
  subtitle: 'Recepsionisti AI që u përgjigjet çdo telefonate, rezervon takime dhe u përgjigjet pyetjeve të klientëve, në shqip dhe anglisht, 24 orë në ditë, 7 ditë në javë.',
  primaryCta: 'Merr Avox për biznesin tënd',
  whatIs: {
    eyebrow: 'Çfarë është Avox?',
    title: 'AI që përgjigjet kur ju nuk mundeni',
    paragraphs: [
      'Avox është recepsionist zanor AI, i krijuar nga Averon Agency për bizneset shqiptare. Flet natyrshëm shqip dhe anglisht, njeh shërbimet tuaja dhe i trajton telefonatat ashtu si do t’i trajtonte një recepsioniste e trajnuar.',
      'Qoftë klinikë dentare, sallon bukurie, restorant apo zyrë avokatie, Avox e përfaqëson biznesin tuaj në çdo telefonatë, në çdo orë të ditës. Kur telefonata është urgjente, ua kalon menjëherë juve ose personit të duhur.',
    ],
  },
  featuresTitle: 'Çfarë bën Avox',
  features: [
    { title: 'Përgjigjet 24/7', desc: 'Merr çdo telefonatë menjëherë: natën, në fundjavë dhe në festa. Asnjë klient i humbur.' },
    { title: 'Rezervon takime', desc: 'Shikon kalendarin tuaj dhe rezervon takimin, duke dërguar konfirmim me SMS ose WhatsApp.' },
    { title: 'Shqip dhe anglisht', desc: 'Kalon natyrshëm nga një gjuhë te tjetra, sipas gjuhës së klientit.' },
    { title: 'Pyetjet e shpeshta', desc: 'U përgjigjet pyetjeve për orare, adresë, shërbime dhe çmime, pa ju shqetësuar.' },
    { title: 'Kalim i telefonatave urgjente', desc: 'Kupton kur telefonata është urgjente dhe e kalon te personi i duhur menjëherë.' },
    { title: 'I ndërtuar për Shqipërinë', desc: 'I krijuar posaçërisht për tregun shqiptar dhe mënyrën si punojnë bizneset këtu.' },
  ],
  stepsTitle: 'Si funksionon',
  steps: stepsSq('Avox'),
  industriesTitle: 'Për cilat biznese është Avox',
  industries: ['Klinika dentare', 'Salone bukurie', 'Restorante', 'Zyra avokatie', 'Mjekë privatë', 'Servise makinash', 'Agjenci imobiliare', 'Farmaci', 'Hotele', 'Palestra', 'Kontabilistë', 'Veterinerë'],
  pricing: { title: 'Sa kushton Avox?', text: 'Çmimi i Avox përcaktohet sipas nevojave të biznesit tuaj, pas një konsultimi falas: sa telefonata merrni dhe çfarë duhet të bëjë, nga përgjigjet e pyetjeve te rezervimi i takimeve. Konsultimi është falas dhe pa detyrim.' },
  faqTitle: 'Pyetje për Avox',
  faq: [
    { question: 'Çfarë është Avox?', answer: 'Avox është recepsionist zanor AI nga Averon Agency që u përgjigjet telefonatave të biznesit tuaj 24/7 në shqip dhe anglisht, rezervon takime, u përgjigjet pyetjeve të shpeshta dhe kalon telefonatat urgjente te stafi.' },
    { question: 'Sa kushton Avox?', answer: 'Çmimi i Avox përcaktohet sipas nevojave të biznesit tuaj, pas një konsultimi falas.' },
    { question: 'A flet shqip Avox?', answer: 'Po. Avox flet natyrshëm shqip dhe anglisht dhe kalon nga njëra gjuhë te tjetra sipas gjuhës së klientit.' },
    { question: 'A mund të rezervojë takime Avox?', answer: 'Po. Avox shikon kalendarin tuaj, rezervon takimin dhe i dërgon klientit konfirmim me SMS ose WhatsApp.' },
    { question: 'Çfarë ndodh me telefonatat urgjente?', answer: 'Avox kupton kur një telefonatë është urgjente ose e ndërlikuar dhe ua kalon menjëherë juve ose personit të duhur në staf.' },
    { question: 'Për çfarë bizneseve është Avox?', answer: 'Për çdo biznes që merr shumë telefonata: klinika dentare, salone bukurie, restorante, zyra avokatie, mjekë privatë, servise makinash, agjenci imobiliare, farmaci, hotele dhe palestra.' },
  ],
  cta: { title: 'Merrni Avox sot', text: 'Bëhuni nga bizneset e para në Shqipëri me recepsionist AI. Konsultim falas, pa detyrim.', button: 'Fillo me Avox' },
  footerTagline: 'Avox — recepsionist zanor AI, nga Averon Agency në Tiranë',
};

export const productPages = {
  avtextInstagramEn,
  avtextWhatsappEn,
  avtextInstagramSq,
  avtextWhatsappSq,
  avoxSq,
};
