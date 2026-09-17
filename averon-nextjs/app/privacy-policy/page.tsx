"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
    <div className="text-white/70 leading-relaxed space-y-3">{children}</div>
  </div>
);

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden relative w-full">
      {/* Global Continuous Gradient Background - Same as home page */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a0f2e] via-[#0f0f12] to-black pointer-events-none"></div>

      {/* Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-4">
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl border border-purple-500/20 px-4 sm:px-6 lg:px-8 shadow-2xl shadow-purple-500/10">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/">
              <Image
                src="/averon_logobg.png"
                alt="Averon Agency"
                width={160}
                height={45}
                className="w-28 sm:w-32 lg:w-40 cursor-pointer"
                priority
              />
            </Link>

            <Link
              href="/"
              className="flex items-center space-x-2 px-6 py-2 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 rounded-full font-semibold transition-all border border-emerald-400/30 hover:border-emerald-400/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">
            Privacy <span className="text-emerald-400">Policy</span>
          </h1>
          <p className="text-white/50 mb-12">Averon Agency — Last updated: September 17, 2026</p>

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
              <a href="mailto:rubinramallari9@gmail.com" className="text-emerald-400 hover:underline">
                rubinramallari9@gmail.com
              </a>.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Averon Agency<br />
              Email:{' '}
              <a href="mailto:rubinramallari9@gmail.com" className="text-emerald-400 hover:underline">
                rubinramallari9@gmail.com
              </a>
            </p>
          </Section>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
