import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark:    'rgb(var(--c-dark)    / <alpha-value>)',
          surface: 'rgb(var(--c-surface) / <alpha-value>)',
          card:    'rgb(var(--c-card)    / <alpha-value>)',
          border:  'rgb(var(--c-border)  / <alpha-value>)',
          royal:   'rgb(var(--c-royal)   / <alpha-value>)',
          yellow:  'rgb(var(--c-yellow)  / <alpha-value>)',
          blue:    'rgb(var(--c-blue)    / <alpha-value>)',
          green:   'rgb(var(--c-green)   / <alpha-value>)',
          purple:  'rgb(var(--c-purple)  / <alpha-value>)',
          orange:  'rgb(var(--c-orange)  / <alpha-value>)',
          muted:   'rgb(var(--c-muted)   / <alpha-value>)',
          text:    'rgb(var(--c-text)    / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'neon-yellow': '0 0 16px var(--shadow-yellow)',
        'neon-blue':   '0 0 16px var(--shadow-blue)',
        'neon-purple': '0 0 16px var(--shadow-purple)',
        'neon-orange': '0 0 16px var(--shadow-orange)',
        'neon-royal':  '0 0 20px var(--shadow-royal)',
        'neon-green':  '0 0 16px var(--shadow-green)',
        'card':        '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover':  '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.04)',
      },
      backgroundImage: {
        'cyber-grid': `
          linear-gradient(rgba(32,96,208,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(32,96,208,0.06) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'cyber-grid': '40px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
