type Variant = 'primary' | 'secondary' | 'danger' | 'success';

const VARIANTS: Record<Variant, string> = {
  primary:   'border-cyber-yellow/40 text-cyber-yellow bg-cyber-yellow/10',
  secondary: 'border-cyber-blue/40   text-cyber-blue   bg-cyber-blue/10',
  danger:    'border-cyber-orange/40 text-cyber-orange bg-cyber-orange/10',
  success:   'border-cyber-green/40  text-cyber-green  bg-cyber-green/10',
};

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
}

export default function Badge({ variant = 'primary', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider border px-1.5 py-0.5 rounded-md ${VARIANTS[variant]}`}>
      {children}
    </span>
  );
}
