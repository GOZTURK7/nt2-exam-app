import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark:    '#0a0a0f',
          surface: '#13131a',
          card:    '#1c1c26',
          border:  '#2a2a38',
          yellow:  '#e8ff47',
          blue:    '#47b4ff',
          purple:  '#b447ff',
          orange:  '#ff6b47',
          green:   '#47ffb4',
          muted:   '#6b6b80',
          text:    '#e8e8f0',
        },
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'neon-yellow': '0 0 18px rgba(232,255,71,0.25)',
        'neon-blue':   '0 0 18px rgba(71,180,255,0.25)',
        'neon-purple': '0 0 18px rgba(180,71,255,0.25)',
        'neon-orange': '0 0 18px rgba(255,107,71,0.25)',
      },
      backgroundImage: {
        'cyber-grid': `
          linear-gradient(rgba(71,180,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(71,180,255,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'cyber-grid': '44px 44px',
      },
    },
  },
  plugins: [],
};

export default config;
