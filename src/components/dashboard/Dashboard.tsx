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
  spreken:   { icon: <Mic2 size={15} />,       colorClass: 'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10' },
  schrijven: { icon: <PenLine size={15} />,    colorClass: 'border-cyber-blue text-cyber-blue bg-cyber-blue/10' },
  lezen:     { icon: <BookOpen size={15} />,   colorClass: 'border-cyber-green text-cyber-green bg-cyber-green/10' },
  luisteren: { icon: <Headphones size={15} />, colorClass: 'border-cyber-purple text-cyber-purple bg-cyber-purple/10' },
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

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-6">

      {/* ── Skill selector tabs ── */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
        {ALL_SKILLS.map((skill) => {
          const { icon, colorClass } = SKILL_META[skill];
          const isActive = skill === activeSkill;
          return (
            <button
              key={skill}
              onClick={() => onSkillChange(skill)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shrink-0
                font-mono text-xs font-bold uppercase tracking-wider transition-all
                ${isActive ? colorClass : 'border-cyber-border text-cyber-muted hover:border-cyber-muted/50'}
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
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
          {lang === 'tr' ? 'Ders Günleri' : 'Study Days'}
        </p>
        <p className="font-mono text-sm font-bold text-cyber-text">
          <span className={SKILL_META[activeSkill].colorClass.split(' ')[1]}>{completedCount}</span>
          <span className="text-cyber-muted"> / {days.length}</span>
        </p>
      </div>

      {/* ── Day list ── */}
      <DayList skill={activeSkill} level={currentLevel} onDaySelect={onDaySelect} />

    </div>
  );
}
