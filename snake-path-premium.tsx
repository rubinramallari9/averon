// 🔥 PREMIUM SNAKE PATH ANIMATION
// Replace your Process section SVG (lines 692-737)

<svg
  className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
  style={{zIndex: 1}}
  viewBox="0 0 800 700"
  preserveAspectRatio="xMidYMid meet"
>
  <defs>
    {/* 🎨 PREMIUM GRADIENT - Multi-stop with depth */}
    <linearGradient id="luxurySnakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.8}} />
      <stop offset="15%" style={{stopColor: '#14b8a6', stopOpacity: 0.85}} />
      <stop offset="35%" style={{stopColor: '#a78bfa', stopOpacity: 0.9}} />
      <stop offset="55%" style={{stopColor: '#ec4899', stopOpacity: 0.95}} />
      <stop offset="75%" style={{stopColor: '#f43f5e', stopOpacity: 0.9}} />
      <stop offset="100%" style={{stopColor: '#fb923c', stopOpacity: 0.85}} />
    </linearGradient>

    {/* ✨ SHIMMER OVERLAY - Creates metallic effect */}
    <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.1}} />
      <stop offset="20%" style={{stopColor: '#ffffff', stopOpacity: 0.3}} />
      <stop offset="40%" style={{stopColor: '#ffffff', stopOpacity: 0.1}} />
      <stop offset="60%" style={{stopColor: '#ffffff', stopOpacity: 0.2}} />
      <stop offset="80%" style={{stopColor: '#ffffff', stopOpacity: 0.1}} />
      <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0.15}} />
    </linearGradient>

    {/* 🌟 PREMIUM GLOW - Layered blur for depth */}
    <filter id="premiumPathGlow">
      <feGaussianBlur stdDeviation="3" result="blur1"/>
      <feGaussianBlur stdDeviation="6" result="blur2"/>
      <feGaussianBlur stdDeviation="10" result="blur3"/>
      <feMerge>
        <feMergeNode in="blur3"/>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    {/* 💫 ANIMATED SHIMMER - Travels along path */}
    <linearGradient id="animatedShine">
      <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0}}>
        <animate
          attributeName="stop-opacity"
          values="0;0.6;0"
          dur="3s"
          repeatCount="indefinite"
        />
      </stop>
      <stop offset="50%" style={{stopColor: '#ffffff', stopOpacity: 0.4}}>
        <animate
          attributeName="stop-opacity"
          values="0.4;1;0.4"
          dur="3s"
          repeatCount="indefinite"
        />
      </stop>
      <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0}}>
        <animate
          attributeName="stop-opacity"
          values="0;0.6;0"
          dur="3s"
          repeatCount="indefinite"
        />
      </stop>
    </linearGradient>
  </defs>

  {/* 📍 SHADOW LAYER - Depth effect */}
  <path
    d="M 180 140
       C 280 130, 360 155, 480 145
       C 600 135, 680 165, 720 220
       S 710 305, 630 340
       C 520 380, 360 385, 220 365
       C 150 355, 100 375, 90 445
       C 85 495, 110 525, 220 570
       C 360 630, 480 670, 400 750"
    stroke="#000000"
    strokeWidth="18"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity="0.4"
    style={{
      transform: 'translate(3px, 5px)',
      filter: 'blur(4px)'
    }}
  />

  {/* 🎯 MAIN PATH - Animated draw */}
  <path
    id="processPath"
    d="M 180 140
       C 280 130, 360 155, 480 145
       C 600 135, 680 165, 720 220
       S 710 305, 630 340
       C 520 380, 360 385, 220 365
       C 150 355, 100 375, 90 445
       C 85 495, 110 525, 220 570
       C 360 630, 480 670, 400 750"
    stroke="url(#luxurySnakeGradient)"
    strokeWidth="14"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    filter="url(#premiumPathGlow)"
    style={{
      transition: 'stroke-dashoffset 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  />

  {/* ✨ SHIMMER OVERLAY */}
  <path
    d="M 180 140
       C 280 130, 360 155, 480 145
       C 600 135, 680 165, 720 220
       S 710 305, 630 340
       C 520 380, 360 385, 220 365
       C 150 355, 100 375, 90 445
       C 85 495, 110 525, 220 570
       C 360 630, 480 670, 400 750"
    stroke="url(#shimmerGradient)"
    strokeWidth="6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity="0.6"
    style={{
      transition: 'stroke-dashoffset 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  />

  {/* 💫 ANIMATED SHINE TRAVELING */}
  <path
    d="M 180 140
       C 280 130, 360 155, 480 145
       C 600 135, 680 165, 720 220
       S 710 305, 630 340
       C 520 380, 360 385, 220 365
       C 150 355, 100 375, 90 445
       C 85 495, 110 525, 220 570
       C 360 630, 480 670, 400 750"
    stroke="url(#animatedShine)"
    strokeWidth="3"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* 🎯 STEP MARKERS - Premium dots with halos */}
  {/* Step 1 - Discovery */}
  <g>
    <circle cx="180" cy="140" r="16" fill="#000000" opacity="0.3" style={{transform: 'translate(2px, 3px)'}} />
    <circle cx="180" cy="140" r="24" fill="url(#luxurySnakeGradient)" opacity="0.2" filter="url(#premiumPathGlow)" />
    <circle cx="180" cy="140" r="14" fill="url(#luxurySnakeGradient)" filter="url(#premiumPathGlow)" />
    <circle cx="180" cy="140" r="8" fill="#ffffff" opacity="0.9" />
  </g>

  {/* Step 2 - Design */}
  <g>
    <circle cx="630" cy="340" r="16" fill="#000000" opacity="0.3" style={{transform: 'translate(2px, 3px)'}} />
    <circle cx="630" cy="340" r="24" fill="url(#luxurySnakeGradient)" opacity="0.2" filter="url(#premiumPathGlow)" />
    <circle cx="630" cy="340" r="14" fill="url(#luxurySnakeGradient)" filter="url(#premiumPathGlow)" />
    <circle cx="630" cy="340" r="8" fill="#ffffff" opacity="0.9" />
  </g>

  {/* Step 3 - Launch */}
  <g>
    <circle cx="220" cy="570" r="16" fill="#000000" opacity="0.3" style={{transform: 'translate(2px, 3px)'}} />
    <circle cx="220" cy="570" r="24" fill="url(#luxurySnakeGradient)" opacity="0.2" filter="url(#premiumPathGlow)" />
    <circle cx="220" cy="570" r="14" fill="url(#luxurySnakeGradient)" filter="url(#premiumPathGlow)" />
    <circle cx="220" cy="570" r="8" fill="#ffffff" opacity="0.9" />
  </g>
</svg>
