"use client";

import React from 'react';
import { PageShell, SiteNav, SiteFooter } from '@/components/site/SiteChrome';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="py-8 border-t border-[var(--hairline)] first:border-t-0 first:pt-0">
    <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-heading)] mb-3">{title}</h2>
    <div className="text-[var(--text-body)] text-[15px] sm:text-base leading-relaxed space-y-3 [&_li]:marker:text-[var(--text-muted)]">{children}</div>
  </div>
);

const PrivacyPolicyPage = () => {
  return (
    <PageShell>
      <SiteNav backHref="/" backLabel="Back to Home" />

      {/* Content */}
      <section className="typography-a pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-medium mb-4 text-[var(--text-heading)] tracking-tight">
            Privacy <span className="brand-averon text-[var(--accent)]">Policy</span>
          </h1>
          <p className="text-[var(--text-muted)] mb-10 sm:mb-14">Averon Agency — Last updated: September 17, 2026</p>

          <div className="rounded-[2rem] bg-[var(--surface-light)] p-6 sm:p-10">

          <Section title="Overview">
            <p>
              This Privacy Policy explains how Averon Agency (&quot;we&quot;, &quot;us&quot;) collects,
              uses, and protects information when you interact with our Instagram business account
              (@averonagency) through direct messages, including automated responses from our
              messaging assistant, or through our WhatsApp Business number.
            </p>
          </Section>

          <Section title="Information We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>Your Instagram user ID and the messages you send to our account</li>
              <li>Timestamps and metadata related to your conversation with us</li>
              <li>If you choose to share it, your phone number (for example, to continue the
                conversation on WhatsApp or be contacted about a service)</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to your messages and answer questions about our services</li>
              <li>To route inquiries to the right service information or, when needed, to a
                human team member</li>
              <li>To keep a record of leads and conversations for our own customer relationship
                management</li>
            </ul>
          </Section>

          <Section title="How We Process Messages">
            <p>
              Messages you send may be processed by a third-party AI language model provider
              (Groq) solely to generate a relevant, automated reply. Conversation and lead data
              may be stored in a private Google Sheets spreadsheet accessible only to Averon
              Agency staff.
            </p>
          </Section>

          <Section title="Third Parties">
            <p>
              We use the following third-party services to operate this messaging system: Meta
              (Instagram and WhatsApp Business Platform), Groq (AI response generation), and
              Google (Google Sheets, for internal record-keeping). Each of these providers
              processes data under their own privacy policies.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain conversation records for as long as reasonably necessary to provide
              customer service and maintain business records, or until you request deletion.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>
              You may request access to, correction of, or deletion of your data at any time by
              contacting us at{' '}
              <a href="mailto:rubinramallari9@gmail.com" className="text-[var(--accent)] font-medium hover:underline underline-offset-2">
                rubinramallari9@gmail.com
              </a>.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Averon Agency<br />
              Email:{' '}
              <a href="mailto:rubinramallari9@gmail.com" className="text-[var(--accent)] font-medium hover:underline underline-offset-2">
                rubinramallari9@gmail.com
              </a>
            </p>
          </Section>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Transforming businesses through innovative digital solutions & AI automations" />
    </PageShell>
  );
};

export default PrivacyPolicyPage;
