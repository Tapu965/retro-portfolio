/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        desktop: '#0a2a2a',
        'desktop-dark': '#061616',
        phosphor: '#7ef0d4',
        'phosphor-dim': '#2a7a6a',
        'phosphor-bright': '#b5ffe8',
        window: '#0c2222',
        'window-header': '#1c4d4d',
        'window-border': '#55bbaa',
        'bevel-light': '#b5ffe0',
        'bevel-dark': '#1e5148',
        warn: '#f5b842',
        danger: '#ff5f5f',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['VT323', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        // retro bevels
        bevel: 'inset 1px 1px 0 #b5ffe0, inset -1px -1px 0 #1e5148',
        'bevel-in': 'inset -1px -1px 0 #b5ffe0, inset 1px 1px 0 #1e5148',
        window: '4px 4px 0 #051010, 6px 6px 0 rgba(0,0,0,0.6)',
        glow: '0 0 8px rgba(126, 240, 212, 0.6)',
        'glow-lg': '0 0 20px rgba(126, 240, 212, 0.4)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.96' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        flicker: 'flicker 3s infinite',
        scanline: 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
};