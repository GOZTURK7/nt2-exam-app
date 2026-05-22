import { Mic2, PenLine, BookOpen, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Skill } from '../../types';

const SKILL_STYLE: Record<
  Skill,
  { Icon: React.ComponentType<{ size?: number }>; text: string; bar: string; aura: string; border: string; shadow: string }
> = {
  spreken: {
    Icon: Mic2,
    text: 'text-cyber-yellow',
    bar: 'bg-cyber-yellow',
    aura: 'bg-cyber-yellow',
    border: 'border-cyber-yellow/50',
    shadow: 'shadow-neon-yellow',
  },
  schrijven: {
    Icon: PenLine,
    text: 'text-cyber-blue',
    bar: 'bg-cyber-blue',
    aura: 'bg-cyber-blue',
    border: 'border-cyber-blue/50',
    shadow: 'shadow-neon-blue',
  },
  lezen: {
    Icon: BookOpen,
    text: 'text-cyber-purple',
    bar: 'bg-cyber-purple',
    aura: 'bg-cyber-purple',
    border: 'border-cyber-purple/50',
    shadow: 'shadow-neon-purple',
  },
  luisteren: {
    Icon: Headphones,
    text: 'text-cyber-orange',
    bar: 'bg-cyber-orange',
    aura: 'bg-cyber-orange',
    border: 'border-cyber-orange/50',
    shadow: 'shadow-neon-orange',
  },
};

interface SkillCardProps {
  skill: Skill;
  total: number;
  done: number;
  pct: number;
  isActive: boolean;
  onClick: () => void;
}

export default function SkillCard({ skill, total, done, pct, isActive, onClick }: SkillCardProps) {
  const { t } = useTranslation();
  const s = SKILL_STYLE[skill];
  const { Icon } = s;

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl bg-cyber-card text-left w-full
        border transition-all duration-200 active:scale-[0.97]
        ${isActive ? `${s.border} ${s.shadow}` : 'border-cyber-border hover:border-cyber-border/60'}
      `}
    >
      {/* Ambient aura */}
      <div
        className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${s.aura} opacity-10 blur-2xl pointer-events-none`}
      />

      <div className="p-4">
        <Icon size={22} className={`${s.text} mb-3`} />

        <h3 className={`font-extrabold text-[15px] leading-tight ${s.text}`}>
          {t(`skill.${skill}.name`)}
        </h3>
        <p className="text-[11px] text-cyber-muted leading-relaxed mt-0.5 mb-4">
          {t(`skill.${skill}.desc`)}
        </p>

        {/* Progress */}
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
            {t('dashboard.progress')}
          </span>
          <span className={`font-mono text-[9px] ${s.text}`}>
            {done}/{total || '–'}
          </span>
        </div>
        <div className="h-0.5 bg-cyber-border rounded-full overflow-hidden">
          <div
            className={`h-full ${s.bar} rounded-full transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </button>
  );
}
