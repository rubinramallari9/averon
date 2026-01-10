"use client";

import React, { useRef, useState, useEffect } from 'react';

interface ServiceCardTiltProps {
  children: React.ReactNode;
}

const ServiceCardTilt: React.FC<ServiceCardTiltProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // 📱 Detect mobile to disable tilt
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 🚫 Disable on mobile/tablet
    if (isMobile || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    // 🎯 REFINED: Reduced to 3deg (was 6deg) for subtle luxury feel
    const maxTilt = 3;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

    // ✨ PREMIUM: Add smooth easing + minimal scale
    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)', // Apple easing
    });
  };

  const handleMouseLeave = () => {
    // 🎯 Smooth return to original position
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Slower return
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="will-change-transform"
    >
      {children}
    </div>
  );
};

export default ServiceCardTilt;
