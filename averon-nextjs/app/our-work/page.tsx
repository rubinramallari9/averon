"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const OurWorkPage = () => {
  // Portfolio projects data
  const projects = [
    {
      id: 1,
      title: "Rasim Rama",
      description: "Personal portfolio website showcasing professional work and achievements",
      image: "/trusted_logos/rasimramalogo.png",
      tech: ["React", "Next.js", "Tailwind"],
      link: "https://rasimrama.com"
    },
    {
      id: 2,
      title: "Rubin Ramallari",
      description: "Professional portfolio website with modern design and smooth animations",
      image: "/trusted_logos/rubin-logo.svg",
      tech: ["Next.js", "TypeScript", "Framer Motion"],
      link: "https://rubinramallari.com"
    },
    {
      id: 3,
      title: "Luxury Watch E-commerce",
      description: "Premium timepiece marketplace with real-time inventory and secure checkout",
      image: "/images/luxury-watch-mockup.png",
      tech: ["React", "Next.js", "Stripe"],
      link: "#"
    },
    {
      id: 4,
      title: "Construction Company Site",
      description: "Modern portfolio showcasing projects with interactive galleries",
      image: "/images/construction-mockup.png",
      tech: ["Tailwind", "AI", "CMS"],
      link: "#"
    },
    {
      id: 5,
      title: "Luxury Car Dealership",
      description: "Immersive automotive experience with 3D vehicle showcases",
      image: "/images/car-mockup.png",
      tech: ["Three.js", "React", "API"],
      link: "#"
    },
    {
      id: 6,
      title: "Fine Jewelry Store",
      description: "Elegant online boutique with custom product configurator",
      image: "/images/jewelry-mockup.png",
      tech: ["Next.js", "E-commerce", "SEO"],
      link: "#"
    },
    {
      id: 7,
      title: "Fine Dining Restaurant",
      description: "Reservation system with dynamic menu and event management",
      image: "/images/restaurant-mockup.png",
      tech: ["React", "Database", "Maps"],
      link: "#"
    },
    {
      id: 8,
      title: "Computer Store",
      description: "Tech retailer with advanced filtering and comparison tools",
      image: "/images/computerstore-mockup.png",
      tech: ["Next.js", "AI", "Analytics"],
      link: "#"
    },
    {
      id: 9,
      title: "Cigars & Wine Collection",
      description: "Curated marketplace for premium cigars and fine wines",
      image: "/images/cigars-wine-mockup.png",
      tech: ["React", "E-commerce", "Tailwind"],
      link: "#"
    },
    {
      id: 10,
      title: "Real Estate Platform",
      description: "Property listings with virtual tours and mortgage calculators",
      image: "/images/realestate-mockup.png",
      tech: ["Next.js", "Maps", "CRM"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative w-full">
      {/* Global Continuous Gradient Background - Same as home page */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a0f2e] via-[#0f0f12] to-black pointer-events-none"></div>

      {/* Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Subtle Ambient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-4">
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl border border-purple-500/20 px-4 sm:px-6 lg:px-8 shadow-2xl shadow-purple-500/10">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/">
              <img
                src="/averon_logobg.png"
                alt="Averon Digital"
                className="w-28 sm:w-32 lg:w-40 cursor-pointer"
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

      {/* Hero Section */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 leading-tight tracking-tight">
              <span className="text-white">Our </span>
              <span className="text-emerald-400">Work</span>
            </h1>

            {/* Hand-drawn Squiggle Decoration */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 5 10
                     Q 15 5, 25 10
                     T 45 10
                     Q 55 12, 65 8
                     T 85 10
                     Q 95 6, 105 10
                     T 125 10
                     Q 135 12, 145 8
                     T 165 10
                     Q 175 7, 185 10
                     L 195 10"
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

            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of cutting-edge digital solutions crafted for ambitious businesses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target={project.link !== "#" ? "_blank" : "_self"}
                rel={project.link !== "#" ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative block"
              >
                {/* Glassmorphism Card */}
                <div className="h-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer">
                  {/* Project Thumbnail */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-900/30 to-black/30 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`${
                        project.id === 2
                          ? 'w-1/2 h-auto object-contain group-hover:scale-110'
                          : 'w-full h-full object-cover group-hover:scale-110'
                      } transition-transform duration-500`}
                      onError={(e) => {
                        // Fallback gradient if image doesn't load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                        <span>View Project</span>
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-purple-200 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips - Bottom Corner */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 rounded-full text-emerald-400 text-xs font-semibold backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-purple-200 mb-8 leading-relaxed">
            Let's create something amazing together. Get in touch to discuss your vision.
          </p>

          <Link
            href="/#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/50 text-lg"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black backdrop-blur-xl rounded-t-3xl border-t border-x border-purple-500/20 pt-8 pb-6">
            <div className="text-center">
              <Link href="/">
                <img
                  src="/averon_logobg.png"
                  alt="Averon Digital"
                  className="w-40 mx-auto mb-4 cursor-pointer"
                />
              </Link>
              <p className="text-purple-200 text-sm mb-4">
                Transforming businesses through innovative digital solutions
              </p>
              <div className="pt-4 border-t border-purple-500/20">
                <p className="text-sm text-purple-400/80">
                  © 2024 Averon Digital. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OurWorkPage;
