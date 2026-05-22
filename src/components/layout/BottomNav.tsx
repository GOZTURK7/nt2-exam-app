import { Mic2, PenLine, BookOpen, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Skill } from '../../types';

interface NavItem {
  skill: Skill;
  Icon: React.ComponentType<{ size?: number }>;
  activeClass: string;
  indicatorClass: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    skill: 'spreken',
    Icon: Mic2,
    activeClass: 'text-cyber-yellow',
    indicatorClass: 'bg-cyber-yellow shadow-neon-yellow',
  },
  {
    skill: 'schrijven',
    Icon: PenLine,
    activeClass: 'text-cyber-blue',
    indicatorClass: 'bg-cyber-blue shadow-neon-blue',
  },
  {
    skill: 'lezen',
    Icon: BookOpen,
    activeClass: 'text-cyber-purple',
    indicatorClass: 'bg-cyber-purple shadow-neon-purple',
  },
  {
    skill: 'luisteren',
    Icon: Headphones,
    activeClass: 'text-cyber-orange',
    indicatorClass: 'bg-cyber-orange shadow-neon-orange',
  },
];

interface BottomNavProps {
  activeSkill: Skill;
  onSkillChange: (skill: Skill) => void;
}

export default function BottomNav({ activeSkill, onSkillChange }: BottomNavProps) {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cyber-surface/95 backdrop-blur border-t border-cyber-border safe-area-inset-bottom">
      <div className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map(({ skill, Icon, activeClass, indicatorClass }) => {
          const isActive = activeSkill === skill;
          return (
            <button
              key={skill}
              onClick={() => onSkillChange(skill)}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-1
                py-3 transition-all duration-200 active:scale-95
                ${isActive ? activeClass : 'text-cyber-muted hover:text-cyber-text'}
              `}
            >
              {/* Top indicator line */}
              {isActive && (
                <span
                  className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-b-full ${indicatorClass}`}
                />
              )}
              <Icon size={20} />
              <span className="font-mono text-[9px] uppercase tracking-widest">
                {t(`nav.${skill}`)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
