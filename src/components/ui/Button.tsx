import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'success';

const VARIANTS: Record<Variant, string> = {
  primary:   'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10 hover:bg-cyber-yellow/20 shadow-neon-yellow',
  secondary: 'border-cyber-blue   text-cyber-blue   bg-cyber-blue/10   hover:bg-cyber-blue/20',
  danger:    'border-cyber-orange text-cyber-orange bg-cyber-orange/10 hover:bg-cyber-orange/20',
  success:   'border-cyber-green  text-cyber-green  bg-cyber-green/10  hover:bg-cyber-green/20',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl border
        font-mono text-sm font-bold uppercase tracking-wider
        transition-all active:scale-95 ${VARIANTS[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
