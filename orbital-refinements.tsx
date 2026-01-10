// 🔥 PREMIUM ORBITAL ANIMATION SYSTEM
// Copy this into your Features section (replace lines 893-975)

<div className="react-orbit-wrapper absolute pointer-events-none"
  style={{
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% + 120px)',
    height: 'calc(100% + 120px)',
    zIndex: 0
  }}
>
  <svg className="w-full h-full" viewBox="0 0 600 600" style={{ overflow: 'visible' }}>
    <defs>
      {/* 🎨 REFINED GRADIENTS - Multi-stop for depth */}
      <linearGradient id="premiumOrbit1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity: 0.3}} />
        <stop offset="30%" style={{stopColor: '#ec4899', stopOpacity: 0.5}} />
        <stop offset="60%" style={{stopColor: '#8b5cf6', stopOpacity: 0.4}} />
        <stop offset="100%" style={{stopColor: '#a78bfa', stopOpacity: 0.2}} />
      </linearGradient>

      <linearGradient id="premiumOrbit2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.4}} />
        <stop offset="50%" style={{stopColor: '#a78bfa', stopOpacity: 0.5}} />
        <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 0.3}} />
      </linearGradient>

      <linearGradient id="premiumOrbit3" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 0.25}} />
        <stop offset="50%" style={{stopColor: '#a78bfa', stopOpacity: 0.4}} />
        <stop offset="100%" style={{stopColor: '#10b981', stopOpacity: 0.3}} />
      </linearGradient>

      {/* ✨ PREMIUM GLOW - Layered for depth */}
      <filter id="premiumGlow">
        <feGaussianBlur stdDeviation="4" result="blur1"/>
        <feGaussianBlur stdDeviation="8" result="blur2"/>
        <feGaussianBlur stdDeviation="12" result="blur3"/>
        <feMerge>
          <feMergeNode in="blur3"/>
          <feMergeNode in="blur2"/>
          <feMergeNode in="blur1"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* 🌟 Shine effect for premium feel */}
      <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0}} />
        <stop offset="50%" style={{stopColor: '#ffffff', stopOpacity: 0.3}} />
        <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0}} />
      </linearGradient>
    </defs>

    {/* 🎯 ORBIT 1 - Outer ring, slow, thick */}
    <g className="orbit-a">
      {/* Background shadow for depth */}
      <ellipse
        cx="300" cy="300" rx="260" ry="110"
        fill="none"
        stroke="#000000"
        strokeWidth="8"
        opacity="0.3"
        style={{ transform: 'translate(2px, 4px)' }}
      />

      {/* Main orbit */}
      <ellipse
        cx="300" cy="300" rx="260" ry="110"
        fill="none"
        stroke="url(#premiumOrbit1)"
        strokeWidth="5"
        filter="url(#premiumGlow)"
        strokeLinecap="round"
      />

      {/* Shine overlay */}
      <ellipse
        cx="300" cy="300" rx="260" ry="110"
        fill="none"
        stroke="url(#shineGradient)"
        strokeWidth="2"
        opacity="0.6"
      />
    </g>

    {/* 🎯 ORBIT 2 - Middle ring, medium speed, medium */}
    <g className="orbit-b">
      <ellipse
        cx="300" cy="300" rx="260" ry="110"
        fill="none"
        stroke="#000000"
        strokeWidth="6"
        opacity="0.25"
        style={{ transform: 'translate(1px, 3px)' }}
      />

      <ellipse
        cx="300" cy="300" rx="260" ry="110"
        fill="none"
        stroke="url(#premiumOrbit2)"
        strokeWidth="3.5"
        filter="url(#premiumGlow)"
        strokeLinecap="round"
      />
    </g>

    {/* 🎯 ORBIT 3 - Inner ring, fast, thin */}
    <g className="orbit-c">
      <ellipse
        cx="300" cy="300" rx="260" ry="110"
        fill="none"
        stroke="url(#premiumOrbit3)"
        strokeWidth="2"
        filter="url(#premiumGlow)"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>

    {/* ⭐ CENTER GLOW - Nucleus effect */}
    <circle
      cx="300" cy="300" r="20"
      fill="url(#premiumOrbit1)"
      opacity="0.6"
      filter="url(#premiumGlow)"
      className="animate-pulse"
    />
  </svg>
</div>
