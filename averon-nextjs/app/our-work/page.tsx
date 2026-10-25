"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig } from 'framer-motion';
import {
  PageShell, SiteNav, PageHero, Reveal, CtaCard, SiteFooter, ArrowRightIcon,
} from '@/components/site/SiteChrome';

const ExternalArrow = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

// Shared card body: title, description, tech chips and an always-visible
// link label (the affordance isn't hidden behind hover, so touch gets it too).
const CardBody = ({ title, description, tech, linkLabel }: { title: string; description: string; tech: string[]; linkLabel: string }) => (
  <div className="p-6 sm:p-7 flex flex-col flex-1">
    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[var(--text-heading)]">{title}</h3>
    <p className="text-[var(--text-muted)] text-[15px] mb-6 leading-relaxed">{description}</p>
    <div className="mt-auto flex items-end justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {tech.map((t, techIndex) => (
          <span key={techIndex} className="px-3 py-1 bg-[var(--surface-light)] rounded-full text-[var(--text-heading)]/75 text-xs font-medium">
            {t}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] whitespace-nowrap">
        {linkLabel}
        <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ExternalArrow /></span>
      </span>
    </div>
  </div>
);

const cardShell =
  "group h-full flex flex-col overflow-hidden rounded-[1.75rem] bg-white border border-[var(--hairline)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_24px_48px_-24px_rgba(14,23,38,0.25)] hover:-translate-y-1 active:scale-[0.99]";

const OurWorkPage = () => {
  // Portfolio projects data
  const demos = [
    {
      id: 3,
      title: "Dental Studio Dr. Kedri Peza",
      description: "A concept showcase built to demonstrate a professional web presence for a family dental clinic",
      image: "/trusted_logos/dental-studio-kedri-peza-logo.png",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://dental-studio-dr-kedri-peza.vercel.app/"
    },
    {
      id: 1,
      title: "MobilTech",
      description: "A concept showcase built to demonstrate mobile tech solutions for a prospective client",
      image: "/trusted_logos/logoDemo1.jpg",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://mobiltech.vercel.app/"
    },
    {
      id: 2,
      title: "Brate Moto Servis",
      description: "A concept showcase built to demonstrate a modern web presence for a motorcycle service shop",
      image: "/trusted_logos/logobratemotoservis.jpg",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://bratemotoservis.vercel.app/"
    }
  ];

  const projects = [
    {
      id: 6,
      title: "Arena Restaurant",
      description: "Restaurant & cocktail bar website with the full menu, table reservations and one-tap calling",
      image: "/trusted_logos/arena-filxhani.png",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://arenarestaurant.al",
      blur: undefined
    },
    {
      id: 5,
      title: "Lumina Aesthetic",
      description: "Modern aesthetic clinic website with elegant design and seamless user experience",
      image: "/trusted_logos/logo-white.png",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://lumina.al",
      blur: undefined
    },
    {
      id: 3,
      title: "Rasim Rama",
      description: "Personal portfolio website showcasing professional work and achievements",
      image: "/trusted_logos/rasimramalogo.png",
      tech: ["React", "Next.js", "Tailwind"],
      link: "https://ramarasim.com",
      blur: undefined
    },
    {
      id: 1,
      title: "TimeTrader",
      description: "Luxury watch marketplace for Albania & the Balkans — connecting verified buyers and sellers of premium timepieces across Southeast Europe",
      image: "/trusted_logos/logo.svg",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://timetrader-kappa.vercel.app/",
      blur: undefined
    }
  ];

  return (
    <MotionConfig reducedMotion="user">
    <PageShell>
      <SiteNav backHref="/" backLabel="Back to Home" />

      <PageHero>
        <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-8xl font-medium mb-6 leading-[1.05] tracking-tight text-white">
          Our <span className="brand-averon text-[#8FABFF]">Work</span>
        </h1>
        <p className="text-base sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed">
          Explore our portfolio of cutting-edge digital solutions crafted for ambitious businesses
        </p>
      </PageHero>

      {/* Portfolio Grid */}
      <section className="typography-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06} className="h-full">
              <a
                href={project.link}
                target={project.link !== "#" ? "_blank" : "_self"}
                rel={project.link !== "#" ? "noopener noreferrer" : ""}
                className={cardShell}
              >
                {/* Client logos are white marks, so they sit on the navy card */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-[var(--card-navy)] flex items-center justify-center">
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_20%,rgba(62,106,239,0.35),transparent_60%)]" />
                  {project.id === 1 ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.description} by Averon Agency`}
                      width={260}
                      height={46}
                      className="relative object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-8 sm:inset-10">
                      <Image
                        src={project.image}
                        alt={`${project.title} - ${project.description} by Averon Agency`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                        {...(project.blur ? { placeholder: "blur" as const, blurDataURL: project.blur } : {})}
                      />
                    </div>
                  )}
                </div>
                <CardBody title={project.title} description={project.description} tech={project.tech} linkLabel="View Project" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Concept Showcases Section */}
      <section className="typography-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-heading)]">
              Concept <span className="text-[var(--accent)]">Showcases</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Prototype builds crafted to demonstrate our capabilities to future clients
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {demos.map((demo, index) => (
              <Reveal key={demo.id} delay={index * 0.06} className="h-full">
                <a href={demo.link} target="_blank" rel="noopener noreferrer" className={cardShell}>
                  {/* Square brand marks shown as app-icon tiles */}
                  <div className="relative h-56 sm:h-64 bg-[var(--surface-light)] flex items-center justify-center">
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-[1.75rem] overflow-hidden bg-white shadow-[0_12px_32px_-12px_rgba(14,23,38,0.25)] transition-transform duration-500 group-hover:scale-[1.04]">
                      <Image
                        src={demo.image}
                        alt={`${demo.title} - ${demo.description} by Averon Agency`}
                        fill
                        sizes="144px"
                        quality={75}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <CardBody title={demo.title} description={demo.description} tech={demo.tech} linkLabel="View Showcase" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaCard>
        <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-white">
          Ready to Start Your Project?
        </h2>
        <p className="text-base sm:text-xl text-[var(--card-navy-text)] mb-10 leading-relaxed">
          Let&apos;s create something amazing together. Get in touch to discuss your vision.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-[var(--card-navy)] rounded-full font-semibold text-base sm:text-lg transition-[background-color,transform] duration-150 active:scale-[0.97]"
        >
          <span>Contact Us</span>
          <ArrowRightIcon />
        </Link>
      </CtaCard>

      <SiteFooter tagline="Transforming businesses through innovative digital solutions" />
    </PageShell>
    </MotionConfig>
  );
};

export default OurWorkPage;
