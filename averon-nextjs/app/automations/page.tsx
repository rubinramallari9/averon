"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';


const AutomationsPage = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden relative w-full">
      {/* Background — matches homepage */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a0f2e] via-[#0f0f12] to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

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
              href="/"
              className="flex items-center space-x-2 px-6 py-2 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 rounded-full font-semibold transition-all border border-emerald-400/30 hover:border-emerald-400/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[55vh] flex flex-col items-center justify-center pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 pointer-events-none" style={{ backgroundColor: '#6366f1' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: '#10b981' }} />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-6 block">AI-Powered Solutions</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="text-white">Business </span>
              <span className="text-emerald-400">Automations</span>
            </h1>

            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <svg width="200" height="20" viewBox="0 0 200 20" fill="none">
                <path
                  d="M 5 10 Q 15 5, 25 10 T 45 10 Q 55 12, 65 8 T 85 10 Q 95 6, 105 10 T 125 10 Q 135 12, 145 8 T 165 10 Q 175 7, 185 10 L 195 10"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 6"
                  opacity="0.6"
                  fill="none"
                />
              </svg>
            </motion.div>

            <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Stop losing customers to missed messages and unanswered calls. Our AI automations work around the clock so your business never sleeps.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ——————————————————————————————————————
          01 — AVOX
      —————————————————————————————————————— */}
      <section id="avox" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Visual Panel */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-6 sm:p-8">
                <div className="bg-black/60 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/40 px-6 py-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-lg">Avox by Averon</p>
                    <p className="text-emerald-400 text-sm mt-1 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      In call · 00:47
                    </p>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-400 text-xs font-bold">AI</span>
                      </div>
                      <div className="bg-white/5 rounded-xl px-4 py-2 max-w-[85%]">
                        <p className="text-white text-sm">&quot;Mirëdita! Si mund t&apos;ju ndihmoj?&quot;</p>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 text-xs font-bold">C</span>
                      </div>
                      <div className="bg-white/10 rounded-xl px-4 py-2 max-w-[75%]">
                        <p className="text-white text-sm">&quot;Dua të rezervoj një vizitë&quot;</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-400 text-xs font-bold">AI</span>
                      </div>
                      <div className="bg-white/5 rounded-xl px-4 py-2 max-w-[75%]">
                        <p className="text-white text-sm">&quot;Të enjten: 10:00 ose 15:00?&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Availability", value: "24/7" },
                    { label: "Languages", value: "AL/EN" },
                    { label: "Missed Calls", value: "0%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center border border-purple-500/10">
                      <p className="text-emerald-400 font-bold text-lg">{stat.value}</p>
                      <p className="text-purple-300 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Voice AI</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">Meet </span>
                <span className="text-emerald-400">Avox</span>
              </h2>

              <p className="text-purple-200 text-lg leading-relaxed mb-8">
                Your business phone never goes unanswered again. Avox speaks Albanian and English naturally, books appointments, answers FAQs, and seamlessly transfers urgent calls to you — built from the ground up by Averon.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { title: "24/7 Call Answering", desc: "Never miss a call again — Avox picks up instantly, day or night, weekends and holidays." },
                  { title: "Appointment Booking", desc: "Checks your calendar and books appointments directly, sending confirmations by SMS or WhatsApp." },
                  { title: "Albanian & English", desc: "Speaks naturally in both languages, adapting to whichever the caller prefers." },
                  { title: "FAQ Handling", desc: "Answers common questions: hours, location, services, prices — without involving you." },
                  { title: "Smart Call Routing", desc: "Detects urgent situations and transfers the call to the right person immediately." },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-purple-500/10 hover:border-emerald-500/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{feature.title}</p>
                      <p className="text-purple-200/70 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Dental Clinics", "Beauty Salons", "Law Offices", "Restaurants", "Private Doctors", "Auto Services"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/40"
              >
                Get Avox
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      </div>

      {/* ——————————————————————————————————————
          02 — INSTAGRAM DM BOT
      —————————————————————————————————————— */}
      <section id="instagram-dm-bot" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Instagram Automation</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">Instagram </span>
                <span className="text-pink-400">DM Bot</span>
              </h2>

              <p className="text-purple-200 text-lg leading-relaxed mb-8">
                Every comment, every story reply, every DM — answered instantly. Our Instagram DM Bot turns your followers into customers by engaging them the moment they reach out, even at 3am.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { title: "Instant DM & Comment Replies", desc: "Responds to every incoming message in seconds, keeping followers engaged and feeling heard." },
                  { title: "Lead Capture Sequences", desc: "Collects phone numbers, emails, and preferences through natural conversation flows." },
                  { title: "Product Catalog Delivery", desc: "Sends your menu, price list, or product catalog automatically when triggered by keywords." },
                  { title: "Story & Post Triggers", desc: "When someone comments a keyword on your post ('PRICE', 'INFO'), the bot DMs them instantly." },
                  { title: "Appointment & Booking Links", desc: "Directs interested followers to your booking page or collects details for you to follow up." },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-purple-500/10 hover:border-pink-500/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{feature.title}</p>
                      <p className="text-purple-200/70 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {["E-commerce", "Restaurants", "Salons & Spas", "Clothing Stores", "Real Estate", "Clinics"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-pink-400/10 border border-pink-400/30 rounded-full text-pink-300 text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-pink-500/30"
              >
                Get Your DM Bot
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Visual Panel */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-6 sm:p-8">
                <div className="bg-black/60 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400" />
                    <div>
                      <p className="text-white text-sm font-semibold">your_business</p>
                      <p className="text-purple-400 text-xs">Instagram DM</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[75%]">
                        <p className="text-white text-sm">Sa kushton menu juaj?</p>
                        <p className="text-white/50 text-xs mt-1 text-right">14:32</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                        <p className="text-white text-sm">Pershendetje! 👋 Ja menuja jone e plotë me çmimet:</p>
                        <p className="text-emerald-400 text-sm mt-1 font-medium">📋 menu.pdf</p>
                        <p className="text-white text-sm mt-1">Doni të rezervoni tavolinë?</p>
                        <p className="text-purple-400 text-xs mt-1">🤖 DM Bot • 14:32</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[60%]">
                        <p className="text-white text-sm">Po, për 2 persona</p>
                        <p className="text-white/50 text-xs mt-1 text-right">14:33</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                        <p className="text-white text-sm">Perfekt! Për çfarë date dhe ore preferoni?</p>
                        <p className="text-purple-400 text-xs mt-1">🤖 DM Bot • 14:33</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Avg. Response", value: "< 2s" },
                    { label: "DMs Handled", value: "24/7" },
                    { label: "Conversion", value: "+68%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center border border-purple-500/10">
                      <p className="text-pink-400 font-bold text-lg">{stat.value}</p>
                      <p className="text-purple-300 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      </div>

      {/* ——————————————————————————————————————
          03 — WHATSAPP BOT
      —————————————————————————————————————— */}
      <section id="whatsapp-bot" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Visual Panel */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-6 sm:p-8">
                <div className="bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#1a2733]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Business WhatsApp</p>
                      <p className="text-green-400 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        Online
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3 bg-[#0b141a]">
                    <div className="flex justify-end">
                      <div className="bg-[#005c4b] rounded-xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                        <p className="text-white text-sm">Keni burgers ne menyu?</p>
                        <p className="text-white/40 text-xs mt-1 text-right">18:42 ✓✓</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#202c33] rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                        <p className="text-white text-sm">Po, kemi 6 lloje burgerash! 🍔</p>
                        <p className="text-green-400 text-sm font-medium mt-1">📋 Shiko menunë tonë</p>
                        <p className="text-white text-sm mt-1">Doni të porosisni tani?</p>
                        <p className="text-white/40 text-xs mt-1">18:42 🤖</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#005c4b] rounded-xl rounded-tr-sm px-3 py-2 max-w-[60%]">
                        <p className="text-white text-sm">Po! 1x Cheeseburger</p>
                        <p className="text-white/40 text-xs mt-1 text-right">18:43 ✓✓</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#202c33] rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                        <p className="text-white text-sm">✅ Porosia u konfirmua!</p>
                        <p className="text-green-400 text-sm">Dërgesa në ~30 min</p>
                        <p className="text-white/40 text-xs mt-1">18:43 🤖</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Open Rate", value: "98%" },
                    { label: "Response", value: "< 1s" },
                    { label: "Orders Auto", value: "82%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center border border-purple-500/10">
                      <p className="text-green-400 font-bold text-lg">{stat.value}</p>
                      <p className="text-purple-300 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">WhatsApp Automation</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">WhatsApp </span>
                <span className="text-green-400">Bot</span>
              </h2>

              <p className="text-purple-200 text-lg leading-relaxed mb-8">
                WhatsApp is where Albanian customers live. Our bot handles customer service, orders, bookings, and promotions directly inside the app your customers already use every day.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { title: "Instant Customer Replies", desc: "Responds to every message in under 2 seconds — price inquiries, availability, directions, and more." },
                  { title: "Order & Booking Management", desc: "Collects order details, confirms bookings, and sends reminders automatically — no staff required." },
                  { title: "Broadcast Promotions", desc: "Send targeted promotions and updates to your entire customer list with a single click." },
                  { title: "Catalog Sharing", desc: "Automatically sends your full product or service catalog when customers ask for it." },
                  { title: "Human Handoff", desc: "When a conversation needs a human touch, the bot seamlessly transfers it to your team." },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-purple-500/10 hover:border-green-500/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{feature.title}</p>
                      <p className="text-purple-200/70 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Delivery Services", "Restaurants", "Online Shops", "Travel Agencies", "Pharmacies", "Repair Services"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-green-400/10 border border-green-400/30 rounded-full text-green-300 text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg shadow-green-500/30"
              >
                Get Your WhatsApp Bot
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white">Ready to </span>
              <span className="text-emerald-400">Automate?</span>
            </h2>
            <p className="text-xl text-purple-200 mb-10 leading-relaxed max-w-2xl mx-auto">
              Tell us about your business and we&apos;ll build the right automation for you. Free consultation, no commitment.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/50 text-lg"
            >
              <span>Start for Free</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black backdrop-blur-xl rounded-t-3xl border-t border-x border-purple-500/20 pt-8 pb-6">
            <div className="text-center">
              <Link href="/" className="inline-block">
                <Image
                  src="/averon_logobg.png"
                  alt="Averon Agency"
                  width={160}
                  height={45}
                  className="mx-auto mb-4 cursor-pointer"
                />
              </Link>
              <p className="text-purple-200 text-sm mb-4">
                Transforming businesses through innovative digital solutions & AI automations
              </p>
              <div className="pt-4 border-t border-purple-500/20">
                <p className="text-sm text-purple-400/80">
                  © {new Date().getFullYear()} Averon Agency. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutomationsPage;
