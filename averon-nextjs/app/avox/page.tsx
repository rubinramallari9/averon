"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AvoxPage = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden relative w-full">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a0f2e] via-[#0f0f12] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      {/* Structured Data for Avox as a named product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Avox',
            alternateName: ['Avox AI', 'Avox Voice AI', 'Avox AI Receptionist'],
            description: 'Avox is Albania\'s first AI voice receptionist, built by Averon Agency. It answers calls 24/7 in Albanian and English, books appointments automatically, handles FAQs, and routes urgent calls — so businesses never miss a customer.',
            brand: {
              '@type': 'Brand',
              name: 'Averon Agency',
            },
            manufacturer: {
              '@type': 'Organization',
              name: 'Averon Agency',
              url: 'https://averon.agency',
            },
            url: 'https://averon.agency/avox',
            offers: {
              '@type': 'Offer',
              url: 'https://averon.agency/#contact',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Averon Agency',
              },
            },
            category: 'AI Automation Software',
            audience: {
              '@type': 'BusinessAudience',
              geographicArea: {
                '@type': 'Country',
                name: 'Albania',
              },
            },
          }),
        }}
      />

      {/* Navigation */}
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
              href="/automations"
              className="flex items-center space-x-2 px-6 py-2 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 rounded-full font-semibold transition-all border border-emerald-400/30 hover:border-emerald-400/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Automations</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] opacity-25 pointer-events-none" style={{ backgroundColor: '#10b981' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none" style={{ backgroundColor: '#6366f1' }} />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Product badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">By Averon Agency · Albania's First</span>
            </div>

            {/* Main heading — "Avox" is the H1 Google needs to see */}
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold mb-6 leading-none tracking-tight">
              <span className="text-emerald-400">Avox</span>
            </h1>

            <p className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Albania's First AI Voice Receptionist
            </p>

            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <svg width="160" height="16" viewBox="0 0 160 16" fill="none">
                <path d="M 4 8 Q 12 4, 20 8 T 36 8 Q 44 10, 52 6 T 68 8 Q 76 5, 84 8 T 100 8 Q 108 10, 116 6 T 132 8 Q 140 6, 148 8 L 156 8" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 5" opacity="0.7" fill="none" />
              </svg>
            </motion.div>

            <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed mb-10">
              Avox answers every call, books every appointment, and handles every FAQ — in Albanian and English — 24 hours a day, 7 days a week. Your business never sleeps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-10 py-4 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/50"
              >
                Get Avox for Your Business
              </Link>
              <Link
                href="/automations"
                className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-lg transition-all border border-white/20"
              >
                See All Automations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Avox */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4 block">What is Avox?</span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">The AI that </span>
                <span className="text-emerald-400">picks up</span>
                <span className="text-white"> when you can't</span>
              </h2>
              <p className="text-purple-200 text-lg leading-relaxed mb-6">
                Avox is an AI voice assistant created by Averon Agency — designed from the ground up for Albanian businesses. It speaks naturally in Albanian and English, understands your services, and handles calls exactly the way a trained receptionist would.
              </p>
              <p className="text-purple-200 text-lg leading-relaxed mb-8">
                Whether you run a dental clinic, a beauty salon, a restaurant, or a law office — Avox represents your business professionally on every call, every hour of the day.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "0%", label: "Missed calls" },
                  { value: "24/7", label: "Always available" },
                  { value: "< 2s", label: "Answer time" },
                  { value: "2", label: "Languages: AL + EN" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-2xl p-5 border border-emerald-500/10">
                    <p className="text-emerald-400 text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-purple-300 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock call UI */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/10 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-6 sm:p-8">
                <div className="bg-black/60 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/40 px-6 py-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <p className="text-white font-bold text-xl">Avox</p>
                    <p className="text-white/60 text-sm">by Averon Agency</p>
                    <p className="text-emerald-400 text-sm mt-2 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      In call · 00:47
                    </p>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-400 text-xs font-bold">AI</span>
                      </div>
                      <div className="bg-white/5 rounded-xl px-4 py-2 max-w-[80%]">
                        <p className="text-white text-sm">"Mirëdita! Si mund t'ju ndihmoj?"</p>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 text-xs font-bold">C</span>
                      </div>
                      <div className="bg-white/10 rounded-xl px-4 py-2 max-w-[75%]">
                        <p className="text-white text-sm">"Dua të rezervoj një vizitë"</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-400 text-xs font-bold">AI</span>
                      </div>
                      <div className="bg-white/5 rounded-xl px-4 py-2 max-w-[75%]">
                        <p className="text-white text-sm">"Të enjten: 10:00 ose 15:00?"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Everything Avox </span>
              <span className="text-emerald-400">handles for you</span>
            </h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Avox isn't just an answering machine — it's a full receptionist powered by AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "24/7 Call Answering",
                desc: "Avox picks up every call instantly — nights, weekends, holidays. No more missed customers.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                ),
                title: "Appointment Booking",
                desc: "Checks your real-time calendar and books appointments directly, sending confirmations automatically.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                ),
                title: "Albanian & English",
                desc: "Switches languages naturally mid-call, adapting to whatever the customer speaks.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                ),
                title: "FAQ Handling",
                desc: "Knows your business hours, location, pricing, and services — answers instantly without involving you.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                ),
                title: "Smart Call Routing",
                desc: "Detects urgent calls and transfers them to you or the right team member immediately.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                ),
                title: "Built for Albania",
                desc: "First of its kind in Albania — designed specifically for the Albanian market and business culture.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-emerald-400/40 transition-all duration-300 p-6 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-purple-200/70 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white">Perfect for </span>
              <span className="text-emerald-400">every business</span>
            </h2>
            <p className="text-purple-200 text-lg mb-12 max-w-2xl mx-auto">
              Any Albanian business that receives phone calls can benefit from Avox
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Dental Clinics", "Beauty Salons", "Restaurants", "Law Offices",
                "Private Doctors", "Auto Services", "Real Estate", "Pharmacies",
                "Hotels", "Gyms & Fitness", "Accountants", "Veterinarians",
              ].map((industry) => (
                <span
                  key={industry}
                  className="px-5 py-2.5 bg-white/5 border border-emerald-400/20 rounded-full text-white text-sm font-medium hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-all"
                >
                  {industry}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-emerald-900/30 to-purple-900/30 rounded-3xl border border-emerald-500/20 p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-white">Get </span>
                <span className="text-emerald-400">Avox</span>
                <span className="text-white"> today</span>
              </h2>
              <p className="text-purple-200 text-lg mb-10 max-w-xl mx-auto">
                Join the first businesses in Albania powered by Avox. Free consultation — no commitment.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-xl shadow-emerald-500/40"
              >
                Start with Avox
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <p className="text-purple-400 text-sm mt-6">Built by Averon Agency · Albania's First AI Voice Receptionist</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black backdrop-blur-xl rounded-t-3xl border-t border-x border-purple-500/20 pt-8 pb-6">
            <div className="text-center">
              <Link href="/" className="inline-block">
                <Image src="/averon_logobg.png" alt="Averon Agency" width={160} height={45} className="mx-auto mb-4 cursor-pointer" />
              </Link>
              <p className="text-purple-200 text-sm mb-1">Avox — Albania's First AI Voice Receptionist</p>
              <p className="text-purple-400 text-sm mb-4">Built by Averon Agency</p>
              <div className="pt-4 border-t border-purple-500/20">
                <p className="text-sm text-purple-400/80">© {new Date().getFullYear()} Averon Agency. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AvoxPage;
