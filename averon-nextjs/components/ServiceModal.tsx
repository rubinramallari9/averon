"use client";

import React, { memo, useEffect, useState } from 'react';

// Service icon type - matches servicesData in page.tsx
type ServiceIconType = 'zap' | 'chart' | 'terminal' | 'users';

// Inline SVG icons to eliminate lucide-react dependency
const CloseIcon = memo(() => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = 'CloseIcon';

const ZapIcon = memo(() => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
));
ZapIcon.displayName = 'ZapIcon';

const ChartIcon = memo(() => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

const TerminalIcon = memo(() => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
));
TerminalIcon.displayName = 'TerminalIcon';

const UsersIcon = memo(() => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
));
UsersIcon.displayName = 'UsersIcon';

// Icon renderer component
const ServiceIcon = memo(({ iconType }: { iconType: ServiceIconType }) => {
  switch (iconType) {
    case 'zap':
      return <ZapIcon />;
    case 'chart':
      return <ChartIcon />;
    case 'terminal':
      return <TerminalIcon />;
    case 'users':
      return <UsersIcon />;
    default:
      return <ZapIcon />;
  }
});
ServiceIcon.displayName = 'ServiceIcon';

interface ServiceModalProps {
  service: {
    iconType: ServiceIconType;
    title: string;
    description: string;
  };
  onClose: () => void;
}

// CSS-only modal - eliminates framer-motion dependency (~25KiB savings)
const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger enter animation on mount
  useEffect(() => {
    // Small delay to ensure CSS transition triggers
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Handle close with exit animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match transition duration
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal Card with CSS Animation */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none px-4">
        <div
          className={`relative w-full sm:w-[80%] md:w-[70%] max-w-lg pointer-events-auto transition-all duration-300 ease-out ${
            isVisible
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-8'
          }`}
        >
          {/* Atomic Orbital Animation - Behind Card */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% + 140px)',
              height: 'calc(100% + 140px)',
              zIndex: 0
            }}
          >
            <svg
              className={`w-full h-full transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              viewBox="0 0 600 600"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="modalOrbitGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="modalOrbitGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#ff77cc', stopOpacity: 0.9}} />
                  <stop offset="100%" style={{stopColor: '#c778ff', stopOpacity: 0.9}} />
                </linearGradient>
                <linearGradient id="modalOrbitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#c778ff', stopOpacity: 0.85}} />
                  <stop offset="100%" style={{stopColor: '#ff77cc', stopOpacity: 0.85}} />
                </linearGradient>
                <linearGradient id="modalOrbitGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#ff77cc', stopOpacity: 0.9}} />
                  <stop offset="100%" style={{stopColor: '#c778ff', stopOpacity: 0.9}} />
                </linearGradient>
              </defs>

              {/* Orbit A - Clockwise 12s */}
              <g className="modal-orbit-a">
                <ellipse
                  cx="300"
                  cy="300"
                  rx="280"
                  ry="120"
                  fill="none"
                  stroke="url(#modalOrbitGradient1)"
                  strokeWidth="4"
                  filter="url(#modalOrbitGlow)"
                />
              </g>

              {/* Orbit B - Counter-clockwise 18s */}
              <g className="modal-orbit-b">
                <ellipse
                  cx="300"
                  cy="300"
                  rx="280"
                  ry="120"
                  fill="none"
                  stroke="url(#modalOrbitGradient2)"
                  strokeWidth="4.5"
                  filter="url(#modalOrbitGlow)"
                />
              </g>

              {/* Orbit C - Clockwise 24s */}
              <g className="modal-orbit-c">
                <ellipse
                  cx="300"
                  cy="300"
                  rx="280"
                  ry="120"
                  fill="none"
                  stroke="url(#modalOrbitGradient3)"
                  strokeWidth="4"
                  filter="url(#modalOrbitGlow)"
                />
              </g>
            </svg>
          </div>

          {/* Card Content */}
          <div className="relative bg-gradient-to-br from-purple-900/95 to-black/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-purple-500/50 p-6 sm:p-8 shadow-2xl shadow-purple-500/50" style={{ zIndex: 10 }}>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-purple-500/20 hover:bg-purple-500/40 active:bg-purple-500/50 border border-purple-500/30 hover:border-purple-500/60 transition-all group"
            >
              <CloseIcon />
            </button>

            {/* Service Content */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-purple-500/50">
                <ServiceIcon iconType={service.iconType} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">{service.title}</h3>
              <p className="text-base sm:text-lg text-purple-200 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceModal;
