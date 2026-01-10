// 🔥 PREMIUM HERO DECORATIONS - Unified System
// Replace lines 334-419 in your hero section

{/* 🎨 DESIGN SYSTEM: Glassmorphic metric cards with synchronized motion */}

{/* 💚 Metric Card 1 - Top Left - Growth */}
<motion.div
  className="absolute top-32 left-[10%] hidden lg:block z-10"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
>
  <motion.div
    animate={{
      y: [0, -12, 0],
      rotateZ: [0, 2, 0]
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5
    }}
    className="relative group"
  >
    {/* Premium glassmorphic card */}
    <div className="relative bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent backdrop-blur-xl rounded-2xl px-5 py-4 border border-emerald-400/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

      <div className="relative flex items-center gap-4">
        {/* Icon with glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-40" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
            <Terminal className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Metric */}
        <div>
          <div className="text-xs font-medium text-emerald-300/70 mb-1">Growth</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">+342%</span>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="opacity-70">
              <path
                d="M2 14 L6 10 L10 12 L14 7 L18 9 L22 3"
                stroke="url(#growthLine)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="growthLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</motion.div>

{/* 💜 Metric Card 2 - Top Right - Projects */}
<motion.div
  className="absolute top-40 right-[12%] hidden lg:block z-10"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.7 }}
>
  <motion.div
    animate={{
      y: [0, 15, 0],
      rotateZ: [0, -2, 0]
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.3
    }}
    className="relative group"
  >
    <div className="relative bg-gradient-to-br from-purple-500/10 via-fuchsia-500/5 to-transparent backdrop-blur-xl rounded-2xl px-5 py-4 border border-purple-400/20 shadow-2xl shadow-purple-500/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-400 blur-xl opacity-40" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-purple-300/70 mb-1">Projects</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">50+</div>
        </div>
      </div>
    </div>
  </motion.div>
</motion.div>

{/* 🎯 Code Badge - Bottom Right */}
<motion.div
  className="absolute bottom-32 right-[15%] hidden lg:block z-10"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.9 }}
>
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotateZ: [0, 3, -3, 0]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="relative group cursor-pointer"
  >
    <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent backdrop-blur-xl rounded-xl p-4 border border-cyan-400/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

      <div className="relative text-center">
        <div className="text-2xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
          {"</>"}
        </div>
        <div className="text-xs font-medium text-cyan-300/70">Next.js</div>
      </div>
    </div>
  </motion.div>
</motion.div>

{/* ⚡ Quick tip: Import these at top of file */}
{/* import { Terminal, Zap } from 'lucide-react'; */}
