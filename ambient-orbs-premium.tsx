// 🔥 PREMIUM AMBIENT ORB SYSTEM
// Replace lines 318-332 in hero section

<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
  {/* 🎨 PRIMARY ORB - Emerald/Teal (matches brand) */}
  <motion.div
    className="absolute"
    style={{
      top: '20%',
      left: '15%',
      width: '600px',
      height: '600px'
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0, 0.25, 0],
      scale: [0.8, 1.1, 0.8],
      x: [0, 30, 0],
      y: [0, -40, 0]
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }}
  >
    <div
      className="w-full h-full rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(20, 184, 166, 0.2) 40%, transparent 70%)',
        filter: 'blur(80px)'
      }}
    />
  </motion.div>

  {/* 🎨 SECONDARY ORB - Purple (brand accent) */}
  <motion.div
    className="absolute"
    style={{
      bottom: '15%',
      right: '20%',
      width: '500px',
      height: '500px'
    }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{
      opacity: [0, 0.2, 0],
      scale: [0.9, 1.2, 0.9],
      x: [0, -40, 0],
      y: [0, 30, 0]
    }}
    transition={{
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      delay: 2
    }}
  >
    <div
      className="w-full h-full rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(168, 85, 247, 0.18) 40%, transparent 70%)',
        filter: 'blur(90px)'
      }}
    />
  </motion.div>

  {/* 🎨 TERTIARY ORB - Pink accent (subtle) */}
  <motion.div
    className="absolute"
    style={{
      top: '50%',
      right: '10%',
      width: '400px',
      height: '400px'
    }}
    initial={{ opacity: 0, scale: 1 }}
    animate={{
      opacity: [0, 0.15, 0],
      scale: [1, 1.15, 1],
      x: [0, 20, 0],
      y: [0, -20, 0]
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      delay: 4
    }}
  >
    <div
      className="w-full h-full rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(244, 63, 94, 0.12) 40%, transparent 70%)',
        filter: 'blur(70px)'
      }}
    />
  </motion.div>

  {/* 🌟 ACCENT SPARKLES - Tiny floating particles */}
  {[...Array(5)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
      style={{
        top: `${20 + i * 15}%`,
        left: `${30 + i * 10}%`,
        filter: 'blur(1px)'
      }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -30, -60],
        scale: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeOut",
        delay: i * 0.8
      }}
    />
  ))}
</div>
