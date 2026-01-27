/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['var(--font-inter)', 'system-ui', 'sans-serif'],        // 60% - body text
        'secondary': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'], // 30% - headings
        'accent': ['var(--font-sora)', 'system-ui', 'sans-serif'],          // 10% - special moments
        'brand': ['var(--font-lora)', 'Georgia', 'serif'],                  // Brand signature - balanced sophistication
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],           // default
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
