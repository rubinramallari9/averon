// 🔥 PREMIUM MOBILE TIMELINE PATH
// Replace lines 740-765 (mobile path SVG)

<svg
  className="md:hidden absolute left-6 top-0 h-full pointer-events-none"
  style={{zIndex: 1, width: '60px'}}
  viewBox="0 0 60 800"
  preserveAspectRatio="none"
>
  <defs>
    {/* 🎨 Premium mobile gradient */}
    <linearGradient id="mobileGradientPremium" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.8}} />
      <stop offset="25%" style={{stopColor: '#14b8a6', stopOpacity: 0.85}} />
      <stop offset="50%" style={{stopColor: '#a78bfa', stopOpacity: 0.9}} />
      <stop offset="75%" style={{stopColor: '#ec4899', stopOpacity: 0.85}} />
      <stop offset="100%" style={{stopColor: '#fb923c', stopOpacity: 0.8}} />
    </linearGradient>

    {/* ✨ Shimmer overlay */}
    <linearGradient id="mobileShimmer" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.2}} />
      <stop offset="50%" style={{stopColor: '#ffffff', stopOpacity: 0.4}} />
      <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0.2}} />
    </linearGradient>

    {/* 🌟 Premium glow filter */}
    <filter id="mobileGlow">
      <feGaussianBlur stdDeviation="2" result="blur1"/>
      <feGaussianBlur stdDeviation="4" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  {/* 📍 Shadow layer for depth */}
  <path
    d="M 30 80 L 30 720"
    stroke="#000000"
    strokeWidth="12"
    fill="none"
    strokeLinecap="round"
    opacity="0.3"
    style={{
      transform: 'translate(2px, 3px)',
      filter: 'blur(3px)'
    }}
  />

  {/* 🎯 Main path */}
  <path
    id="mobileProcessPath"
    d="M 30 80 L 30 720"
    stroke="url(#mobileGradientPremium)"
    strokeWidth="8"
    fill="none"
    strokeLinecap="round"
    filter="url(#mobileGlow)"
    style={{
      transition: 'stroke-dashoffset 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  />

  {/* ✨ Shimmer overlay */}
  <path
    d="M 30 80 L 30 720"
    stroke="url(#mobileShimmer)"
    strokeWidth="3"
    fill="none"
    strokeLinecap="round"
    opacity="0.6"
  />
</svg>

{/* 🎯 PREMIUM TIMELINE DOTS - Replace lines 768-802 */}
{/* Step 1 Marker */}
<div className="md:hidden absolute timeline-dot"
  style={{
    left: '21px',
    top: '80px',
    width: '28px',
    height: '28px',
    zIndex: 5
  }}
>
  {/* Shadow */}
  <div className="absolute inset-0 rounded-full bg-black opacity-30"
    style={{transform: 'translate(2px, 3px)'}}
  />
  {/* Glow ring */}
  <div className="absolute inset-0 rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent 70%)',
      transform: 'scale(1.5)',
      filter: 'blur(4px)'
    }}
  />
  {/* Main dot */}
  <div className="absolute inset-0 rounded-full"
    style={{
      background: 'linear-gradient(135deg, #10b981, #14b8a6)',
      border: '2px solid rgba(255,255,255,0.3)'
    }}
  />
  {/* Inner highlight */}
  <div className="absolute inset-[6px] rounded-full bg-white opacity-60" />
</div>

{/* Step 2 Marker */}
<div className="md:hidden absolute timeline-dot"
  style={{
    left: '21px',
    top: '370px',
    width: '28px',
    height: '28px',
    zIndex: 5
  }}
>
  <div className="absolute inset-0 rounded-full bg-black opacity-30"
    style={{transform: 'translate(2px, 3px)'}}
  />
  <div className="absolute inset-0 rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4), transparent 70%)',
      transform: 'scale(1.5)',
      filter: 'blur(4px)'
    }}
  />
  <div className="absolute inset-0 rounded-full"
    style={{
      background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
      border: '2px solid rgba(255,255,255,0.3)'
    }}
  />
  <div className="absolute inset-[6px] rounded-full bg-white opacity-60" />
</div>

{/* Step 3 Marker */}
<div className="md:hidden absolute timeline-dot"
  style={{
    left: '21px',
    top: '660px',
    width: '28px',
    height: '28px',
    zIndex: 5
  }}
>
  <div className="absolute inset-0 rounded-full bg-black opacity-30"
    style={{transform: 'translate(2px, 3px)'}}
  />
  <div className="absolute inset-0 rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4), transparent 70%)',
      transform: 'scale(1.5)',
      filter: 'blur(4px)'
    }}
  />
  <div className="absolute inset-0 rounded-full"
    style={{
      background: 'linear-gradient(135deg, #fb923c, #f43f5e)',
      border: '2px solid rgba(255,255,255,0.3)'
    }}
  />
  <div className="absolute inset-[6px] rounded-full bg-white opacity-60" />
</div>

{/* 💫 END MARKER - Replace lines 805-822 */}
<div
  id="mobileEndMarker"
  className="md:hidden absolute pointer-events-none"
  style={{
    left: '52px',
    top: '740px',
    zIndex: 20
  }}
>
  <div className="relative">
    {/* Glow effect */}
    <div className="absolute inset-[-10px] rounded-full bg-gradient-to-r from-orange-400 to-pink-500 opacity-40 blur-xl" />

    {/* X mark */}
    <div
      className="relative text-4xl font-black"
      style={{
        background: 'linear-gradient(135deg, #fb923c, #f43f5e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 8px rgba(251, 146, 60, 0.6))'
      }}
    >
      ✕
    </div>
  </div>
</div>
