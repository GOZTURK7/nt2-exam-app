import { AlertCircle } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="w-full flex items-start gap-2 bg-cyber-card border border-cyber-orange/50 rounded-xl p-3">
      <AlertCircle size={15} className="text-cyber-orange shrink-0 mt-0.5" />
      <p className="text-xs text-cyber-orange leading-relaxed">{message}</p>
    </div>
  );
}
