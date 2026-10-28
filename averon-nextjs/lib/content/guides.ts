// Guides: plain answers to questions people ask AI assistants and Google.
// Each one opens with a short "quick answer" (the part most likely to be
// quoted), then the detail. Facts only — no prices: every product is
// priced based on the business's needs, after a free consultation.
import type { Lang } from '@/lib/content/products';

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
};

export type Guide = {
  slug: string;
  lang: Lang;
  /** Slug of the same guide in the other language, if there is one. */
  altSlug?: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  quickAnswer: string;
  sections: GuideSection[];
  related: { href: string; label: string }[];
};

export const guides: Guide[] = [
  {
    slug: 'ai-receptionist-cost-albania',
    lang: 'en',
    altSlug: 'sa-kushton-recepsionist-ai',
    title: 'How much does an AI receptionist cost in Albania?',
    description: 'How the price of an AI receptionist is set for a business in Albania, what it covers, what changes it, and what to ask before you buy.',
    published: '2026-10-27',
    updated: '2026-10-27',
    quickAnswer: 'At Averon Agency in Tirana, the price of an AI receptionist is set based on your needs: which channels it covers (phone calls with Avox, Instagram and WhatsApp with Avtext) and what it should do, from answering questions to booking appointments and taking orders. You get a price after a free consultation, with no commitment.',
    sections: [
      {
        heading: 'What setting it up involves',
        paragraphs: [
          'Setting it up means building the receptionist around your business. That means learning your services, prices, opening hours and location, writing the answers to the questions your customers ask most, connecting appointment booking where you need it, and deciding when a call or chat should go to a person.',
          'You test the receptionist in Albanian and English before it goes live, and ask for changes until it answers the way you want.',
        ],
      },
      {
        heading: 'What keeping it running involves',
        paragraphs: [
          'After launch, Averon hosts, maintains and supports the receptionist: keeping it running 24/7 and updating it when your prices, services or hours change.',
        ],
      },
      {
        heading: 'What changes the price',
        list: [
          'Channels: phone calls (Avox), Instagram (Avtext Instagram), WhatsApp (Avtext WhatsApp), or a combination.',
          'What it needs to do: only answer questions, or also book appointments, take orders, capture leads or send promotions.',
          'How much there is to learn: a small menu of services is quicker to set up than a large catalog.',
          'Albanian and English are both included.',
        ],
      },
      {
        heading: 'Compared with hiring a receptionist',
        paragraphs: [
          'A week has 168 hours. A full-time receptionist covers about 40 of them, and can only take one call or chat at a time. An AI receptionist answers instantly at night, at weekends and on holidays, across phone, Instagram and WhatsApp.',
          'That doesn’t make your staff unnecessary. The AI takes the repetitive questions and the calls nobody is free to answer, and hands urgent or complex conversations to your team. For most businesses the real comparison is the cost of the AI against the customers lost to unanswered calls and messages.',
        ],
      },
      {
        heading: 'Questions to ask any AI receptionist provider',
        ordered: true,
        list: [
          'Does it speak natural Albanian, including when customers write without ë and ç?',
          'What happens when it can’t answer: does it pass the conversation to a person?',
          'Can it book appointments or take orders, or only answer questions?',
          'What is included after launch, and how quickly are changes made?',
          'Can I test it before it goes live?',
        ],
      },
    ],
    related: [
      { href: '/avox', label: 'Avox — AI voice receptionist' },
      { href: '/ai-receptionist-albania', label: 'AI receptionists for businesses in Albania' },
      { href: '/guides/ai-receptionist-vs-human-receptionist', label: 'AI receptionist vs human receptionist' },
    ],
  },
  {
    slug: 'sa-kushton-recepsionist-ai',
    lang: 'sq',
    altSlug: 'ai-receptionist-cost-albania',
    title: 'Sa kushton një recepsionist AI në Shqipëri?',
    description: 'Si përcaktohet çmimi i një recepsionisti AI për një biznes në Shqipëri, çfarë përfshin, çfarë e ndryshon dhe çfarë të pyesni para se të blini.',
    published: '2026-10-27',
    updated: '2026-10-27',
    quickAnswer: 'Te Averon Agency në Tiranë, çmimi i një recepsionisti AI përcaktohet sipas nevojave tuaja: cilat kanale mbulon (telefonata me Avox, Instagram dhe WhatsApp me Avtext) dhe çfarë duhet të bëjë, nga përgjigjet e pyetjeve te rezervimi i takimeve dhe marrja e porosive. Çmimin e merrni pas një konsultimi falas, pa asnjë detyrim.',
    sections: [
      {
        heading: 'Çfarë përfshin ngritja',
        paragraphs: [
          'Ngritja përfshin ndërtimin e recepsionistit sipas biznesit tuaj: mësimin e shërbimeve, çmimeve, orareve dhe adresës, përgatitjen e përgjigjeve për pyetjet që klientët bëjnë më shpesh, lidhjen me rezervimin e takimeve kur ju duhet, dhe vendosjen se kur një telefonatë ose bisedë duhet t’i kalojë një personi.',
          'Ju e provoni recepsionistin në shqip dhe anglisht përpara se të nisë, dhe kërkoni ndryshime derisa të përgjigjet ashtu si doni.',
        ],
      },
      {
        heading: 'Çfarë përfshin mirëmbajtja',
        paragraphs: [
          'Pas nisjes, Averon kujdeset për hostimin, mirëmbajtjen dhe suportin: që recepsionisti të punojë 24/7 dhe të përditësohet kur ndryshojnë çmimet, shërbimet ose oraret tuaja.',
        ],
      },
      {
        heading: 'Çfarë e ndryshon çmimin',
        list: [
          'Kanalet: telefonata (Avox), Instagram (Avtext Instagram), WhatsApp (Avtext WhatsApp), ose disa prej tyre.',
          'Çfarë duhet të bëjë: vetëm t’u përgjigjet pyetjeve, apo edhe të rezervojë takime, të marrë porosi, të mbledhë kontakte ose të dërgojë promocione.',
          'Sa informacion duhet të mësojë: një listë e vogël shërbimesh konfigurohet më shpejt se një katalog i madh.',
          'Shqipja dhe anglishtja përfshihen të dyja.',
        ],
      },
      {
        heading: 'Krahasuar me punësimin e një recepsionisteje',
        paragraphs: [
          'Një javë ka 168 orë. Një recepsioniste me kohë të plotë mbulon rreth 40 prej tyre dhe mund të marrë vetëm një telefonatë ose bisedë në një kohë. Një recepsionist AI përgjigjet menjëherë natën, në fundjavë dhe në festa, në telefon, Instagram dhe WhatsApp.',
          'Kjo nuk e bën stafin tuaj të panevojshëm. AI merret me pyetjet që përsëriten dhe me telefonatat kur askush nuk është i lirë, dhe ia kalon ekipit tuaj bisedat urgjente ose të ndërlikuara. Për shumicën e bizneseve krahasimi i vërtetë është kostoja e AI kundrejt klientëve të humbur nga telefonatat dhe mesazhet pa përgjigje.',
        ],
      },
      {
        heading: 'Pyetje për t’i bërë çdo ofruesi',
        ordered: true,
        list: [
          'A flet shqip natyrshëm, edhe kur klientët shkruajnë pa ë dhe ç?',
          'Çfarë ndodh kur nuk di të përgjigjet: a ia kalon bisedën një personi?',
          'A mund të rezervojë takime ose të marrë porosi, apo vetëm u përgjigjet pyetjeve?',
          'Çfarë përfshihet pas nisjes dhe sa shpejt bëhen ndryshimet?',
          'A mund ta provoj përpara se të nisë?',
        ],
      },
    ],
    related: [
      { href: '/sq/avox', label: 'Avox — recepsionist zanor AI' },
      { href: '/sq/recepsionist-ai', label: 'Recepsionist AI për biznese në Shqipëri' },
      { href: '/sq/avtext-whatsapp', label: 'Avtext WhatsApp — asistent AI për WhatsApp' },
    ],
  },
  {
    slug: 'ai-receptionist-vs-human-receptionist',
    lang: 'en',
    title: 'AI receptionist vs human receptionist: which does your business need?',
    description: 'Where an AI receptionist does better, where a person does better, and how Albanian businesses use both together.',
    published: '2026-10-27',
    updated: '2026-10-27',
    quickAnswer: 'An AI receptionist answers every call and message instantly, 24/7, in Albanian and English, and handles phone, Instagram and WhatsApp at the same time. A human receptionist is better with complex, sensitive and in-person situations. Most businesses get the best result by letting the AI answer first and hand the conversations that need a person to their team.',
    sections: [
      {
        heading: 'Where an AI receptionist does better',
        list: [
          'Hours: it answers at night, at weekends and on holidays, when most missed calls happen.',
          'Speed: every caller and every message gets an answer straight away, with no hold music.',
          'Volume: it doesn’t get overwhelmed when calls and messages arrive at once.',
          'Repetition: it answers “what time are you open?” for the hundredth time as patiently as the first.',
          'Cost: priced based on your needs, and usually far less than a salary.',
        ],
      },
      {
        heading: 'Where a person does better',
        list: [
          'Complaints and sensitive conversations that need empathy and judgement.',
          'Unusual requests that aren’t covered by your prices, services or policies.',
          'Anything in person: greeting visitors, handling payments at the desk, paperwork.',
        ],
      },
      {
        heading: 'How the two work together',
        paragraphs: [
          'The AI receptionist is the first line. It answers, books, takes orders and collects details. When a conversation is urgent, complex or simply needs a person, it hands it to your team with everything the customer has already said, so nobody repeats themselves.',
          'Your staff spend their time on the customers who need them, instead of on the phone repeating opening hours.',
        ],
      },
      {
        heading: 'Which businesses benefit most',
        paragraphs: [
          'Businesses that get a lot of calls or messages and lose customers when nobody answers: dental clinics, beauty salons, restaurants, law offices, private doctors, auto services, online shops, real estate, hotels and pharmacies.',
        ],
      },
    ],
    related: [
      { href: '/ai-receptionist-albania', label: 'AI receptionists for businesses in Albania' },
      { href: '/guides/ai-receptionist-cost-albania', label: 'How much does an AI receptionist cost in Albania?' },
      { href: '/avox', label: 'Avox — AI voice receptionist' },
    ],
  },
  {
    slug: 'automate-whatsapp-instagram-albania',
    lang: 'en',
    title: 'How to automate WhatsApp and Instagram messages for your business in Albania',
    description: 'A step-by-step guide to answering Instagram DMs and WhatsApp messages automatically with an AI assistant, in Albanian and English, without losing the personal touch.',
    published: '2026-10-27',
    updated: '2026-10-27',
    quickAnswer: 'To automate WhatsApp and Instagram messages, list the questions customers ask most, decide what the assistant should do (answer, book, take orders), give it your prices, catalog and hours, and set clear rules for when it hands the chat to a person. Then test it in Albanian and English before it goes live.',
    sections: [
      {
        heading: 'Step by step',
        ordered: true,
        list: [
          'Write down the questions customers ask most. Last month’s DMs and WhatsApp chats are the best source: prices, availability, location, delivery, opening hours.',
          'Decide the assistant’s jobs: only answering questions, or also capturing leads, taking orders, booking appointments and sending your catalog.',
          'Gather the information it needs: price list or menu, catalog, opening hours, delivery areas and times, booking link.',
          'Set the handoff rules: which conversations go straight to a person (complaints, special requests, large orders) and who on your team receives them.',
          'On Instagram, choose comment keywords such as “PRICE” or “INFO” that trigger an automatic DM with the details.',
          'Test it the way your customers really write: in Albanian and English, mixed together, and without ë and ç.',
          'Go live, then read through the conversations every week and improve the answers.',
        ],
      },
      {
        heading: 'Common mistakes',
        list: [
          'Button menus instead of conversation: customers want an answer, not a list of options.',
          'No way to reach a person: every automated chat needs a handoff to your team.',
          'Out-of-date prices or hours: update the assistant whenever they change.',
          'English only: most customers in Albania write in Albanian.',
        ],
      },
      {
        heading: 'Doing it with Averon',
        paragraphs: [
          'Averon Agency builds Avtext Instagram and Avtext WhatsApp, AI assistants that do all of the above for businesses in Albania and Kosovo, 24/7, in Albanian and English. We go through these steps with you in a free consultation, set the assistant up, and keep it updated.',
        ],
      },
    ],
    related: [
      { href: '/avtext-instagram', label: 'Avtext Instagram — AI assistant for Instagram' },
      { href: '/avtext-whatsapp', label: 'Avtext WhatsApp — AI assistant for WhatsApp' },
      { href: '/automations', label: 'All AI automations' },
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
