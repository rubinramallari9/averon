"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Users, Target, ChartNoAxesCombined, CheckCircle, Menu, X, Terminal, WifiPen} from 'lucide-react';

const AveronWebsite = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies that convert visitors into customers."
    },
    {
      icon: <ChartNoAxesCombined className="w-8 h-8" />,
      title: "SEO",
      description: "We offer a comprehensive range of services designed to boost your website’s ranking and attract organic, non-paid Google search traffic."
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Website Redesign",
      description: "Whether you need a design refresh or a complete website overhaul, we analyze your site’s pain points and opportunities to revitalize your digital presence. "
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Brand Design",
      description: "Compelling brand identities and visual experiences that resonate with your audience and stand out in the market."
    }
  ];

  const features = [
    "Lifetime support & updates",
    "Dedicated project manager",
    "Mobile-first responsive design",
    "SEO optimization included",
    "Analytics & tracking setup",
    "Fast turnaround times"
  ];

  // Averon Logo SVG Component
  const AveronLogo = ({ className = "w-40" }: { className?: string }) => (
    <img 
      src="/averon_logobg.png" 
      alt="Averon Digital" 
      className={className}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-purple-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[95%] max-w-7xl">
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl border border-purple-500/20 px-4 sm:px-6 lg:px-8 shadow-2xl shadow-purple-500/10">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <AveronLogo className="w-28 sm:w-32 lg:w-40" />
            
            <div className="hidden lg:flex space-x-8">
              <a href="#services" className="hover:text-purple-300 transition">Services</a>
              <a href="#process" className="hover:text-purple-300 transition">Process</a>
              <a href="#features" className="hover:text-purple-300 transition">Features</a>
              <a href="#contact" className="hover:text-purple-300 transition">Contact</a>
            </div>

            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={2.5} style={{ strokeLinecap: 'round' }} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-lg rounded-b-2xl border border-purple-500/20 border-t-0 mt-[-8px] overflow-hidden shadow-2xl shadow-purple-500/10">
            <div className="px-6 py-6 space-y-4">
              <a 
                href="#services" 
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#process" 
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </a>
              <a 
                href="#features" 
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#contact" 
                className="block text-lg hover:text-purple-300 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div 
            className="text-center transform transition-all duration-1000"
            style={{ 
              opacity: Math.min(1, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.3}px)` 
            }}
          >
            <div className="inline-block mb-6 px-6 py-2 bg-purple-600/20 backdrop-blur-sm rounded-full border border-purple-500/30">
              <span className="text-sm font-semibold tracking-wide">ELEVATE YOUR DIGITAL PRESENCE</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              We Build Digital
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Experiences That Convert
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your business with cutting-edge web solutions, strategic marketing, and data-driven growth strategies that deliver real results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/50">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-purple-500/50 rounded-lg font-semibold hover:bg-purple-500/10 transition-all">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to accelerate your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-purple-200 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results every time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Discovery", desc: "We dive deep into your business, goals, and target audience to craft the perfect strategy." },
              { num: "02", title: "Design & Build", desc: "Our team creates stunning designs and develops robust solutions using the latest technologies." },
              { num: "03", title: "Launch & Grow", desc: "We launch your project and continue optimizing for maximum performance and growth." }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-8xl font-bold text-purple-500/10 absolute -top-8 -left-4 group-hover:text-purple-500/20 transition-colors">
                  {step.num}
                </div>
                <div className="relative z-10 p-8 bg-gradient-to-br from-black/40 to-purple-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-purple-200 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Everything You Need to Succeed Online
              </h2>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                We provide comprehensive digital solutions with ongoing support to ensure your long-term success in the digital landscape.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-8 sm:p-12">
                <h3 className="text-2xl font-bold mb-8 text-center">Technologies We Master</h3>
                
                {/* Tech Stack Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Python */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-python.png" 
                      alt="Python" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">Python</span>
                  </div>

                  {/* TypeScript */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-ts.png" 
                      alt="TypeScript" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">TypeScript</span>
                  </div>

                  {/* JavaScript */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-js.png" 
                      alt="JavaScript" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">JavaScript</span>
                  </div>

                  {/* C++ */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-cpp.png" 
                      alt="C++" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">C++</span>
                  </div>

                  {/* C# */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-cs.png" 
                      alt="C#" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">C#</span>
                  </div>

                  {/* Java */}
                  <div className="group flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://code.visualstudio.com/assets/home/language-java.png" 
                      alt="Java" 
                      className="w-16 h-16 mb-3 object-contain"
                    />
                    <span className="text-sm font-semibold text-purple-200">Java</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Elevate Your Digital Presence?
          </h2>
          <p className="text-xl text-purple-200 mb-12 leading-relaxed">
            Schedule a free discovery call with our team. We'll discuss your goals and create a tailored strategy to help you succeed online.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-lg bg-black/40 border border-purple-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-400"
            />
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/50">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="mt-6 text-sm text-purple-300">
            Join the list of businesses that trust Averon Digital with their online presence
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 bg-black/60">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <AveronLogo className="w-40" />
          </div>
          <p className="text-purple-300 mb-4">
            Transforming businesses through innovative digital solutions
          </p>
          <p className="text-sm text-purple-400">
            © 2024 Averon Digital. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AveronWebsite;