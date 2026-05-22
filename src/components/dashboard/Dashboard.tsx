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

const EXAM_DATE = new Date('2026-06-24');

const SKILL_META: Record<Skill, { icon: ReactNode; colorClass: string }> = {
  spreken:   { icon: <Mic2 size={15} />,       colorClass: 'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10' },
  schrijven: { icon: <PenLine size={15} />,    colorClass: 'border-cyber-blue text-cyber-blue bg-cyber-blue/10' },
  lezen:     { icon: <BookOpen size={15} />,   colorClass: 'border-cyber-green text-cyber-green bg-cyber-green/10' },
  luisteren: { icon: <Headphones size={15} />, colorClass: 'border-cyber-purple text-cyber-purple bg-cyber-purple/10' },
};

function daysUntilExam(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((EXAM_DATE.getTime() - today.getTime()) / 86_400_000));
}

export default function Dashboard({ activeSkill, onDaySelect }: DashboardProps) {
  const { t } = useTranslation();
  const { currentLevel, completedDays } = useProgressStore();
  const { getDays } = useContentStore();

  const countdown = daysUntilExam();
  const days = getDays(currentLevel, activeSkill);
  const completedCount = completedDays.filter((id) =>
    id.startsWith(`${currentLevel}_${activeSkill}_`)
  ).length;

  const { icon, colorClass } = SKILL_META[activeSkill];

  return (
    <div className="max-w-lg mx-auto px-4 py-6">

      {/* ── Compact header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-[0.22em]">
            {t('dashboard.subtitle')}
          </p>
          <h2 className="text-xl font-black text-cyber-text mt-1 leading-tight">
            {currentLevel === 'B2' ? t('level.B2') : t('level.B1')}
          </h2>
          <p className="text-[11px] text-cyber-muted mt-1 max-w-[200px] leading-relaxed">
            {currentLevel === 'B2' ? t('level.B2_desc') : t('level.B1_desc')}
          </p>
        </div>

        {/* Countdown */}
        <div className="text-right ml-4 shrink-0">
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
            {t('dashboard.examIn')}
          </p>
          <div className="flex items-baseline gap-1 mt-1 justify-end">
            <span
              className="text-4xl font-black text-cyber-yellow"
              style={{ textShadow: '0 0 16px rgba(232,255,71,0.45)' }}
            >
              {countdown}
            </span>
          </div>
          <p className="font-mono text-[9px] text-cyber-muted mt-0.5">
            {t('dashboard.days')}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent mb-5" />

      {/* ── Active skill header ── */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colorClass}`}>
          {icon}
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            {t(`skill.${activeSkill}.name`)}
          </span>
        </div>

        {/* Progress count */}
        <div className="text-right">
          <p className="font-mono text-sm font-bold text-cyber-text">
            <span className="text-cyber-yellow">{completedCount}</span>
            <span className="text-cyber-muted"> / {days.length}</span>
          </p>
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mt-0.5">
            {t('dashboard.progress')}
          </p>
        </div>
      </div>

      {/* ── Day list ── */}
      <DayList skill={activeSkill} level={currentLevel} onDaySelect={onDaySelect} />

      {/* ── Stats strip ── */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { key: 'streak'    as const, value: 0,                    color: 'text-cyber-yellow' },
          { key: 'completed' as const, value: completedDays.length, color: 'text-cyber-blue' },
          { key: 'words'     as const, value: 0,                    color: 'text-cyber-purple' },
        ].map(({ key, value, color }) => (
          <div
            key={key}
            className="bg-cyber-card border border-cyber-border rounded-xl p-3 text-center"
          >
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-wider mt-1">
              {t(`dashboard.stats.${key}`)}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
