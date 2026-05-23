/* SVG/canvas contexts cannot use Tailwind classes — use CSS variable strings
   that resolve via the active theme (light or dark). */
export const TOKENS = {
  yellow:  'rgb(var(--c-yellow))',
  blue:    'rgb(var(--c-blue))',
  green:   'rgb(var(--c-green))',
  orange:  'rgb(var(--c-orange))',
  purple:  'rgb(var(--c-purple))',
  border:  'rgb(var(--c-border))',
} as const;
