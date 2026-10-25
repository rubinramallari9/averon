"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type ChatMessage = {
  from: 'user' | 'bot';
  time: string;
  // Delay (ms) before this message starts appearing, counted from the previous one.
  // For bot messages the typing indicator shows first, for `typing` ms.
  delay: number;
  typing?: number;
  content: React.ReactNode;
};

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const MESSAGES: ChatMessage[] = [
  {
    from: 'user',
    time: '14:32',
    delay: 200,
    content: <p className="text-white text-sm">Sa kushton menu juaj?</p>,
  },
  {
    from: 'bot',
    time: '14:32',
    delay: 300,
    typing: 900,
    content: (
      <>
        <p className="text-[var(--text-heading)] text-sm">Ja menuja me çmimet:</p>
        <p className="text-[var(--accent)] text-sm mt-1 !font-medium">📋 menu.pdf</p>
        <p className="text-[var(--text-heading)] text-sm mt-1">Doni të rezervoni?</p>
      </>
    ),
  },
  {
    from: 'user',
    time: '14:33',
    delay: 1000,
    content: <p className="text-white text-sm">Po, për 2 persona</p>,
  },
  {
    from: 'bot',
    time: '14:33',
    delay: 300,
    typing: 800,
    content: <p className="text-[var(--text-heading)] text-sm">Perfekt! Për cilën datë dhe orë?</p>,
  },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 h-5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const InstagramChatDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();

  // Number of fully visible messages, and the index currently showing typing dots (or -1)
  const [played, setPlayed] = useState(0);
  const [typingIndex, setTypingIndex] = useState(-1);
  // Reduced motion: skip the playback and show the whole conversation at once
  const visible = reducedMotion ? MESSAGES.length : played;

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 0;
    MESSAGES.forEach((msg, i) => {
      t += msg.delay;
      if (msg.from === 'bot' && msg.typing) {
        timers.push(setTimeout(() => setTypingIndex(i), t));
        t += msg.typing;
      }
      timers.push(
        setTimeout(() => {
          setTypingIndex(-1);
          setPlayed(i + 1);
        }, t)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} className="p-4 space-y-3">
      {MESSAGES.map((msg, i) => {
        const isUser = msg.from === 'user';
        const shown = i < visible;
        const typing = !reducedMotion && typingIndex === i;

        return (
          // Each slot always reserves the final message's height, so nothing below shifts
          <div key={i} className={`relative flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            {typing && (
              <motion.div
                className="absolute left-0 top-0 bg-[var(--surface-light)] rounded-2xl rounded-tl-sm px-4 py-2.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                style={{ transformOrigin: 'top left' }}
              >
                <TypingDots />
              </motion.div>
            )}
            <motion.div
              className={
                isUser
                  ? 'bg-gradient-to-br from-[#A033FF] via-[#6B5BFF] to-[#3E6AEF] rounded-2xl rounded-tr-sm px-4 py-2 max-w-[75%]'
                  : 'bg-[var(--surface-light)] rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]'
              }
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              style={{ transformOrigin: isUser ? 'top right' : 'top left' }}
              aria-hidden={!shown}
            >
              {msg.content}
              {isUser ? (
                <p className="text-white/70 text-xs mt-1 text-right">{msg.time}</p>
              ) : (
                <p className="text-[var(--text-muted)] text-xs mt-1">🤖 DM Bot • {msg.time}</p>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default InstagramChatDemo;
