import { Home, Layers, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type MainTab = 'today' | 'study' | 'exam';

interface NavItem {
  tab: MainTab;
  Icon: LucideIcon;
  label: { tr: string; en: string };
  activeClass: string;
  indicatorClass: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    tab: 'today',
    Icon: Home,
    label: { tr: 'Bugün', en: 'Today' },
    activeClass: 'text-cyber-yellow',
    indicatorClass: 'bg-cyber-yellow',
  },
  {
    tab: 'study',
    Icon: Layers,
    label: { tr: 'Çalış', en: 'Study' },
    activeClass: 'text-cyber-blue',
    indicatorClass: 'bg-cyber-blue',
  },
  {
    tab: 'exam',
    Icon: GraduationCap,
    label: { tr: 'Sınav', en: 'Exam' },
    activeClass: 'text-cyber-purple',
    indicatorClass: 'bg-cyber-purple',
  },
];

interface BottomNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  lang: 'tr' | 'en';
}

export default function BottomNav({ activeTab, onTabChange, lang }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cyber-surface/95 backdrop-blur border-t border-cyber-border safe-area-inset-bottom">
      <div className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map(({ tab, Icon, label, activeClass, indicatorClass }) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-1
                py-3 transition-all duration-200 active:scale-95
                ${isActive ? activeClass : 'text-cyber-muted hover:text-cyber-text'}
              `}
            >
              {isActive && (
                <span className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-b-full ${indicatorClass}`} />
              )}
              <Icon size={20} />
              <span className="font-mono text-[9px] uppercase tracking-widest">
                {lang === 'tr' ? label.tr : label.en}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
