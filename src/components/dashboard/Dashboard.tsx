import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic2, PenLine, BookOpen, Headphones } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { useContentStore } from '../../store/useContentStore';
import type { ProgramDay, Skill } from '../../types';
import DayList from './DayList';

interface DashboardProps {
  activeSkill: Skill;
  onSkillChange: (skill: Skill) => void;
  onDaySelect: (day: ProgramDay) => void;
}

const SKILL_META: Record<Skill, { icon: ReactNode; colorClass: string }> = {
  spreken:   { icon: <Mic2 size={14} />,       colorClass: 'border-cyber-yellow/50 text-cyber-yellow bg-cyber-yellow/10' },
  schrijven: { icon: <PenLine size={14} />,    colorClass: 'border-cyber-blue/50 text-cyber-blue bg-cyber-blue/10' },
  lezen:     { icon: <BookOpen size={14} />,   colorClass: 'border-cyber-green/50 text-cyber-green bg-cyber-green/10' },
  luisteren: { icon: <Headphones size={14} />, colorClass: 'border-cyber-purple/50 text-cyber-purple bg-cyber-purple/10' },
};

const ALL_SKILLS: Skill[] = ['spreken', 'schrijven', 'lezen', 'luisteren'];

export default function Dashboard({ activeSkill, onSkillChange, onDaySelect }: DashboardProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const currentLevel    = useProgressStore((s) => s.currentLevel);
  const completedDays   = useProgressStore((s) => s.completedDays);
  const getExamSchedule = useProgressStore((s) => s.getExamSchedule);
  const getDays         = useContentStore((s) => s.getDays);

  const schedule = getExamSchedule(activeSkill);
  const days = getDays(currentLevel, activeSkill, schedule);
  const completedCount = completedDays.filter((id) =>
    id.startsWith(`${currentLevel}_${activeSkill}_`)
  ).length;

  const activeColor = SKILL_META[activeSkill].colorClass.split(' ')[1];

  return (
    <div className="max-w-lg mx-auto px-4 pt-5 pb-6">

      {/* ── Skill selector tabs ── */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {ALL_SKILLS.map((skill) => {
          const { icon, colorClass } = SKILL_META[skill];
          const isActive = skill === activeSkill;
          return (
            <button
              key={skill}
              onClick={() => onSkillChange(skill)}
              className={`
                flex items-center gap-1.5 px-3.5 py-2 rounded-xl border shrink-0
                text-xs font-semibold transition-all duration-200
                ${isActive
                  ? colorClass
                  : 'border-cyber-border text-cyber-muted bg-transparent hover:border-cyber-muted/40 hover:text-cyber-text'
                }
              `}
            >
              {icon}
              {t(`skill.${skill}.name`)}
            </button>
          );
        })}
      </div>

      {/* ── Progress header ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-cyber-muted">
          {lang === 'tr' ? 'Ders Günleri' : 'Study Days'}
        </p>
        <p className="text-sm font-semibold text-cyber-text">
          <span className={activeColor}>{completedCount}</span>
          <span className="text-cyber-muted"> / {days.length}</span>
        </p>
      </div>

      {/* ── Day list ── */}
      <DayList skill={activeSkill} level={currentLevel} onDaySelect={onDaySelect} />

    </div>
  );
}
