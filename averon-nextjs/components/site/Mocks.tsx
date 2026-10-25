import React from 'react';

// Light-theme product mock-ups shared by /automations and /avox. They sit
// inside a surface-light panel, so the mock itself is a white "device" card.

export const PhoneGlyph = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

/** Rounded panel that frames a mock — the homepage's surface-light card. */
export const MockPanel = ({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) => (
  <div className="relative rounded-[2rem] bg-[var(--surface-light)] p-4 sm:p-8">
    <div className="rounded-2xl bg-white border border-[var(--hairline)] shadow-[0_1px_2px_rgba(14,23,38,0.04),0_12px_32px_-12px_rgba(14,23,38,0.12)] overflow-hidden">
      {children}
    </div>
    {footer}
  </div>
);

/** Three-up stat row that sits under a mock inside MockPanel. */
export const MockStats = ({ stats }: { stats: { label: string; value: string }[] }) => (
  <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
    {stats.map((stat) => (
      <div key={stat.label} className="rounded-xl bg-white border border-[var(--hairline)] px-2 py-3 text-center">
        <p className="text-[var(--text-heading)] !font-semibold text-lg sm:text-xl tracking-tight">{stat.value}</p>
        <p className="text-[var(--text-muted)] text-[11px] sm:text-xs mt-0.5">{stat.label}</p>
      </div>
    ))}
  </div>
);

const AiAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-[#3E6AEF]/10 flex items-center justify-center flex-shrink-0">
    <span className="text-[var(--accent)] text-xs font-bold">AI</span>
  </div>
);

const CallerAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-[var(--card-navy)] flex items-center justify-center flex-shrink-0">
    <span className="text-white text-xs font-bold">C</span>
  </div>
);

/** Avox in-call screen: caller card on top, transcript below. */
export const AvoxCallMock = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <>
    <div className="bg-gradient-to-b from-[#EEF2FF] to-white px-6 py-8 text-center">
      <div className="relative w-20 h-20 mx-auto mb-4">
        <span className="absolute inset-0 rounded-full bg-[#3E6AEF]/15 motion-safe:animate-ping [animation-duration:2.4s]" aria-hidden="true" />
        <div className="relative w-20 h-20 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[#3E6AEF]/30 text-white">
          <PhoneGlyph className="w-9 h-9" />
        </div>
      </div>
      <p className="text-[var(--text-heading)] !font-semibold text-lg">{title}</p>
      {subtitle && <p className="text-[var(--text-muted)] text-sm">{subtitle}</p>}
      <p className="text-[var(--accent)] text-sm mt-1.5 flex items-center justify-center gap-2 !font-medium">
        <span className="w-2 h-2 bg-[#22C55E] rounded-full motion-safe:animate-pulse" />
        In call · 00:47
      </p>
    </div>
    <div className="p-4 sm:p-5 space-y-3 border-t border-[var(--hairline)]">
      <div className="flex gap-3">
        <AiAvatar />
        <div className="bg-[var(--surface-light)] rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
          <p className="text-[var(--text-heading)] text-sm">&quot;Mirëdita! Si mund t&apos;ju ndihmoj?&quot;</p>
        </div>
      </div>
      <div className="flex gap-3 flex-row-reverse">
        <CallerAvatar />
        <div className="bg-[var(--accent)] rounded-2xl rounded-tr-sm px-4 py-2 max-w-[75%]">
          <p className="text-white text-sm">&quot;Dua të rezervoj një vizitë&quot;</p>
        </div>
      </div>
      <div className="flex gap-3">
        <AiAvatar />
        <div className="bg-[var(--surface-light)] rounded-2xl rounded-tl-sm px-4 py-2 max-w-[75%]">
          <p className="text-[var(--text-heading)] text-sm">&quot;Të enjten: 10:00 ose 15:00?&quot;</p>
        </div>
      </div>
    </div>
  </>
);
