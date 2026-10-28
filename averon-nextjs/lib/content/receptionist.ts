// "AI receptionist in Albania" landing page, English + Albanian. One plain
// page per question people ask AI assistants ("AI receptionist Albania",
// "recepsionist AI"), linking out to the three product pages.
import type { QA } from '@/lib/seo';
import type { Lang } from '@/lib/content/products';

export type ReceptionistContent = {
  path: string;
  lang: Lang;
  alt: { href: string; label: string };
  back: { href: string; label: string };
  meta: { title: string; description: string; keywords: string[] };
  eyebrow: string;
  h1: string;
  h1Accent: string;
  subtitle: string;
  primaryCta: string;
  definition: { title: string; paragraphs: string[] };
  doesTitle: string;
  does: string[];
  productsTitle: string;
  products: { name: string; channel: string; desc: string; price: string; href: string; link: string }[];
  compare: { title: string; intro: string; head: [string, string, string]; rows: [string, string, string][]; note: string };
  forTitle: string;
  forList: string[];
  faqTitle: string;
  faq: QA[];
  guide: { text: string; href: string; link: string };
  cta: { title: string; text: string; button: string };
  footerTagline: string;
};

export const receptionistEn: ReceptionistContent = {
  path: '/ai-receptionist-albania',
  lang: 'en',
  alt: { href: '/sq/recepsionist-ai', label: 'Shqip' },
  back: { href: '/automations', label: 'All Automations' },
  meta: {
    title: 'AI Receptionist for Businesses in Albania — Calls, Instagram & WhatsApp',
    description: 'An AI receptionist answers your phone calls, Instagram DMs and WhatsApp messages 24/7 in Albanian and English. Averon Agency in Tirana builds them: Avox for calls and Avtext for Instagram and WhatsApp, priced based on your needs.',
    keywords: ['AI receptionist albania', 'AI receptionist tirana', 'virtual receptionist albania', 'AI assistant for business albania', 'AI phone answering albania', 'AI receptionist albanian language', 'recepsionist AI', 'AI receptionist kosovo'],
  },
  eyebrow: 'AI Receptionist · Albania & Kosovo',
  h1: 'AI Receptionist for ',
  h1Accent: 'Businesses in Albania',
  subtitle: 'Answer every phone call, Instagram DM and WhatsApp message, in Albanian and English, 24 hours a day. Built in Tirana by Averon Agency.',
  primaryCta: 'Book a free consultation',
  definition: {
    title: 'What is an AI receptionist?',
    paragraphs: [
      'An AI receptionist is an assistant that answers your business’s calls and messages for you. It knows your services, prices, opening hours and location, answers customers’ questions, books appointments or takes orders, and passes the conversation to a person when it needs one.',
      'Averon Agency builds AI receptionists for businesses in Albania and Kosovo. They speak Albanian and English and work 24/7: Avox answers phone calls, Avtext Instagram answers Instagram DMs and comments, and Avtext WhatsApp answers WhatsApp messages.',
    ],
  },
  doesTitle: 'What an AI receptionist does for you',
  does: [
    'Answers every call and message instantly, at night, at weekends and on holidays',
    'Answers common questions: prices, hours, location, services, delivery',
    'Books appointments and sends confirmations',
    'Takes orders and collects customer details',
    'Speaks Albanian and English, switching to the customer’s language',
    'Hands urgent or complex conversations to your staff',
  ],
  productsTitle: 'One AI receptionist for every channel',
  products: [
    { name: 'Avox', channel: 'Phone calls', desc: 'AI voice receptionist that answers your business phone, books appointments and transfers urgent calls.', price: 'Priced based on your needs', href: '/avox', link: 'About Avox' },
    { name: 'Avtext Instagram', channel: 'Instagram DMs & comments', desc: 'Replies to DMs, story replies and comment keywords, captures leads and sends your catalog or booking link.', price: 'Priced based on your needs', href: '/avtext-instagram', link: 'About Avtext Instagram' },
    { name: 'Avtext WhatsApp', channel: 'WhatsApp', desc: 'Answers customers, takes orders and bookings, sends reminders and promotions.', price: 'Priced based on your needs', href: '/avtext-whatsapp', link: 'About Avtext WhatsApp' },
  ],
  compare: {
    title: 'AI receptionist or human receptionist?',
    intro: 'Most businesses use both: the AI handles the volume and the off-hours, and your team handles what needs a person.',
    head: ['', 'AI receptionist', 'Human receptionist'],
    rows: [
      ['Hours', '24/7, including nights, weekends and holidays', 'Working hours and shifts'],
      ['Answer time', 'Instant, every time', 'Depends on how busy they are'],
      ['Languages', 'Albanian and English', 'Depends on the person'],
      ['Phone, Instagram and WhatsApp', 'All three at once', 'One conversation at a time'],
      ['Complex or sensitive cases', 'Hands over to your staff', 'Handles them directly'],
      ['Cost', 'Set based on your needs, usually far less than a salary', 'A full salary and contributions'],
    ],
    note: 'There are 168 hours in a week. A full-time receptionist covers about 40 of them.',
  },
  forTitle: 'Who uses an AI receptionist',
  forList: ['Dental clinics', 'Beauty salons', 'Restaurants', 'Law offices', 'Private doctors', 'Auto services', 'Online shops', 'Real estate', 'Hotels', 'Pharmacies', 'Travel agencies', 'Gyms'],
  faqTitle: 'AI receptionists in Albania, answered',
  faq: [
    { question: 'What is an AI receptionist?', answer: 'An AI receptionist is an assistant that answers a business’s phone calls and messages automatically. It answers questions about prices, hours and services, books appointments or takes orders, and passes the conversation to a person when needed.' },
    { question: 'Who builds AI receptionists in Albania?', answer: 'Averon Agency in Tirana builds AI receptionists for businesses in Albania and Kosovo: Avox for phone calls, and Avtext for Instagram and WhatsApp. All of them speak Albanian and English and work 24/7.' },
    { question: 'How much does an AI receptionist cost in Albania?', answer: 'It depends on what your business needs: which channels (phone, Instagram, WhatsApp) and what the assistant should do, from answering questions to taking bookings and orders. Averon sets the price based on your needs, after a free consultation.' },
    { question: 'Does the AI receptionist speak Albanian?', answer: 'Yes. Avox and Avtext speak Albanian and English naturally and answer in whichever language the customer uses.' },
    { question: 'Can an AI receptionist book appointments?', answer: 'Yes. Avox checks your calendar and books the appointment during the call, then sends a confirmation by SMS or WhatsApp. Avtext can collect booking requests or send your booking link in Instagram and WhatsApp chats.' },
    { question: 'Will an AI receptionist replace my staff?', answer: 'No. It takes the repetitive questions and the calls and messages that come in when nobody is available, and hands anything urgent or complex to your team.' },
    { question: 'Does it work for businesses in Kosovo?', answer: 'Yes. Averon builds AI receptionists for businesses in Kosovo as well as Albania, in Albanian and English.' },
  ],
  guide: { text: 'Comparing costs?', href: '/guides/ai-receptionist-cost-albania', link: 'Read: How much does an AI receptionist cost in Albania?' },
  cta: { title: 'Never miss a customer again', text: 'Tell us how customers reach you and we’ll show you how an AI receptionist would handle it. Free consultation, no commitment.', button: 'Book a free consultation' },
  footerTagline: 'AI receptionists for businesses in Albania and Kosovo, built by Averon Agency in Tirana',
};

export const receptionistSq: ReceptionistContent = {
  path: '/sq/recepsionist-ai',
  lang: 'sq',
  alt: { href: '/ai-receptionist-albania', label: 'English' },
  back: { href: '/', label: 'Kreu' },
  meta: {
    title: 'Recepsionist AI dhe asistent AI për biznese në Shqipëri',
    description: 'Recepsionisti AI u përgjigjet telefonatave, mesazheve në Instagram dhe WhatsApp 24/7, në shqip dhe anglisht. Averon Agency në Tiranë: Avox për telefonata dhe Avtext për Instagram dhe WhatsApp, me çmim sipas nevojave tuaja.',
    keywords: ['recepsionist AI', 'recepsionist virtual', 'asistent AI', 'asistent AI per biznes', 'asistent virtual shqip', 'sekretare virtuale', 'chatbot per biznes shqiperi', 'pergjigje automatike telefonatave', 'recepsionist AI tirane', 'recepsionist AI kosove'],
  },
  eyebrow: 'Recepsionist AI · Shqipëri & Kosovë',
  h1: 'Recepsionist AI për ',
  h1Accent: 'biznese në Shqipëri',
  subtitle: 'Përgjigjuni çdo telefonate, mesazhi në Instagram dhe WhatsApp, në shqip dhe anglisht, 24 orë në ditë. I ndërtuar në Tiranë nga Averon Agency.',
  primaryCta: 'Rezervo konsultim falas',
  definition: {
    title: 'Çfarë është një recepsionist AI?',
    paragraphs: [
      'Një recepsionist AI (ose asistent AI) është një asistent që u përgjigjet telefonatave dhe mesazheve të biznesit tuaj në vendin tuaj. Njeh shërbimet, çmimet, oraret dhe adresën tuaj, u përgjigjet pyetjeve të klientëve, rezervon takime ose merr porosi, dhe ia kalon bisedën një personi kur duhet.',
      'Averon Agency ndërton recepsionistë AI për biznese në Shqipëri dhe Kosovë. Flasin shqip dhe anglisht dhe punojnë 24/7: Avox u përgjigjet telefonatave, Avtext Instagram mesazheve dhe komenteve në Instagram, dhe Avtext WhatsApp mesazheve në WhatsApp.',
    ],
  },
  doesTitle: 'Çfarë bën për ju një recepsionist AI',
  does: [
    'U përgjigjet menjëherë çdo telefonate dhe mesazhi, natën, në fundjavë dhe në festa',
    'U përgjigjet pyetjeve të shpeshta: çmime, orare, adresë, shërbime, dërgesa',
    'Rezervon takime dhe dërgon konfirmime',
    'Merr porosi dhe të dhënat e klientit',
    'Flet shqip dhe anglisht, sipas gjuhës së klientit',
    'Ia kalon stafit tuaj bisedat urgjente ose të ndërlikuara',
  ],
  productsTitle: 'Një recepsionist AI për çdo kanal',
  products: [
    { name: 'Avox', channel: 'Telefonata', desc: 'Recepsionist zanor AI që i përgjigjet telefonit të biznesit, rezervon takime dhe kalon telefonatat urgjente.', price: 'Çmimi sipas nevojave tuaja', href: '/sq/avox', link: 'Më shumë për Avox' },
    { name: 'Avtext Instagram', channel: 'Mesazhe & komente në Instagram', desc: 'U përgjigjet mesazheve, përgjigjeve në story dhe komenteve me fjalë kyçe, mbledh kontakte dhe dërgon katalogun ose linkun e rezervimit.', price: 'Çmimi sipas nevojave tuaja', href: '/sq/avtext-instagram', link: 'Më shumë për Avtext Instagram' },
    { name: 'Avtext WhatsApp', channel: 'WhatsApp', desc: 'U përgjigjet klientëve, merr porosi dhe rezervime, dërgon kujtesa dhe promocione.', price: 'Çmimi sipas nevojave tuaja', href: '/sq/avtext-whatsapp', link: 'Më shumë për Avtext WhatsApp' },
  ],
  compare: {
    title: 'Recepsionist AI apo recepsionist njeri?',
    intro: 'Shumica e bizneseve përdorin të dyja: AI merret me volumin dhe orët jashtë punës, ndërsa ekipi juaj me atë që kërkon një person.',
    head: ['', 'Recepsionist AI', 'Recepsionist njeri'],
    rows: [
      ['Orari', '24/7, edhe natën, në fundjavë dhe në festa', 'Orari i punës dhe turnet'],
      ['Koha e përgjigjes', 'Menjëherë, çdo herë', 'Varet sa i zënë është'],
      ['Gjuhët', 'Shqip dhe anglisht', 'Varet nga personi'],
      ['Telefon, Instagram dhe WhatsApp', 'Të treja njëkohësisht', 'Një bisedë në një kohë'],
      ['Raste të ndërlikuara ose delikate', 'Ia kalon stafit tuaj', 'I trajton vetë'],
      ['Kostoja', 'Sipas nevojave tuaja, zakonisht shumë më pak se një pagë', 'Një pagë e plotë dhe kontributet'],
    ],
    note: 'Një javë ka 168 orë. Një recepsioniste me kohë të plotë mbulon rreth 40 prej tyre.',
  },
  forTitle: 'Kush e përdor një recepsionist AI',
  forList: ['Klinika dentare', 'Salone bukurie', 'Restorante', 'Zyra avokatie', 'Mjekë privatë', 'Servise makinash', 'Dyqane online', 'Agjenci imobiliare', 'Hotele', 'Farmaci', 'Agjenci udhëtimi', 'Palestra'],
  faqTitle: 'Pyetje për recepsionistin AI',
  faq: [
    { question: 'Çfarë është një recepsionist AI?', answer: 'Një recepsionist AI është asistent që u përgjigjet automatikisht telefonatave dhe mesazheve të një biznesi. U përgjigjet pyetjeve për çmime, orare dhe shërbime, rezervon takime ose merr porosi, dhe ia kalon bisedën një personi kur duhet.' },
    { question: 'Kush ndërton recepsionistë AI në Shqipëri?', answer: 'Averon Agency në Tiranë ndërton recepsionistë dhe asistentë AI për biznese në Shqipëri dhe Kosovë: Avox për telefonata, dhe Avtext për Instagram dhe WhatsApp. Të gjithë flasin shqip dhe anglisht dhe punojnë 24/7.' },
    { question: 'Sa kushton një recepsionist AI në Shqipëri?', answer: 'Varet nga nevojat e biznesit tuaj: cilat kanale (telefon, Instagram, WhatsApp) dhe çfarë duhet të bëjë asistenti, nga përgjigjet e pyetjeve te rezervimet dhe porositë. Averon e përcakton çmimin sipas nevojave tuaja, pas një konsultimi falas.' },
    { question: 'A flet shqip recepsionisti AI?', answer: 'Po. Avox dhe Avtext flasin natyrshëm shqip dhe anglisht dhe përgjigjen në gjuhën që përdor klienti.' },
    { question: 'A mund të rezervojë takime një recepsionist AI?', answer: 'Po. Avox shikon kalendarin tuaj dhe rezervon takimin gjatë telefonatës, pastaj dërgon konfirmim me SMS ose WhatsApp. Avtext mund të marrë kërkesa për rezervim ose të dërgojë linkun e rezervimit në Instagram dhe WhatsApp.' },
    { question: 'A do ta zëvendësojë stafin tim recepsionisti AI?', answer: 'Jo. Merret me pyetjet që përsëriten dhe me telefonatat e mesazhet që vijnë kur nuk ka njeri të lirë, dhe ia kalon ekipit tuaj çdo gjë urgjente ose të ndërlikuar.' },
    { question: 'A punon edhe për biznese në Kosovë?', answer: 'Po. Averon ndërton recepsionistë AI edhe për biznese në Kosovë, jo vetëm në Shqipëri, në shqip dhe anglisht.' },
  ],
  guide: { text: 'Po krahasoni kostot?', href: '/guides/sa-kushton-recepsionist-ai', link: 'Lexoni: Sa kushton një recepsionist AI në Shqipëri?' },
  cta: { title: 'Asnjë klient i humbur më', text: 'Na tregoni si ju kontaktojnë klientët dhe do t’ju tregojmë si do ta trajtonte një recepsionist AI. Konsultim falas, pa detyrim.', button: 'Rezervo konsultim falas' },
  footerTagline: 'Recepsionistë AI për biznese në Shqipëri dhe Kosovë, nga Averon Agency në Tiranë',
};
