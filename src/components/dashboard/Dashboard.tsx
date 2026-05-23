import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic2, PenLine, BookOpen, Headphones } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { useContentStore } from '../../store/useContentStore';
import type { ProgramDay, Skill } from '../../types';
import DayList from './DayList';
import CountdownClock from './CountdownClock';
import ExamSetupCard from './ExamSetupCard';

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

export default function Dashboard({ activeSkill, onDaySelect }: DashboardProps) {
  const { t } = useTranslation();
  const currentLevel    = useProgressStore((s) => s.currentLevel);
  const completedDays   = useProgressStore((s) => s.completedDays);
  const getExamSchedule = useProgressStore((s) => s.getExamSchedule);
  const getDays         = useContentStore((s) => s.getDays);

  const schedule = getExamSchedule(activeSkill);
  const days = getDays(currentLevel, activeSkill);
  const completedCount = completedDays.filter((id) =>
    id.startsWith(`${currentLevel}_${activeSkill}_`)
  ).length;

  const { icon, colorClass } = SKILL_META[activeSkill];

  // Intensity calculation
  let intensityNode: ReactNode = null;
  if (schedule) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDay = new Date(`${schedule.examDate}T00:00:00`);
    const daysLeft = Math.max(0, Math.ceil((examDay.getTime() - today.getTime()) / 86_400_000));
    const remaining = days.length - completedCount;

    if (daysLeft > 0) {
      const perDay = remaining / daysLeft;
      const perDayStr = perDay.toFixed(1);
      const color =
        perDay > 1.5 ? 'text-cyber-orange' :
        perDay > 1.0 ? 'text-cyber-yellow' :
        'text-cyber-blue';

      intensityNode = (
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
            {t('dashboard.intensityLabel')}
          </span>
          <span className={`font-mono text-xs font-bold ${color}`}>
            {perDayStr} {t('dashboard.perDay')} · {schedule.dailyStudyHours} {t('dashboard.hoursPerDay')}
          </span>
        </div>
      );
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">

      {/* ── Hero header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-mono text-[9px] text-cyber-royal/80 uppercase tracking-[0.22em]">
            {t('dashboard.subtitle')}
          </p>
          <h2 className="text-xl font-black text-cyber-text mt-1 leading-tight">
            {currentLevel === 'B2' ? t('level.B2') : t('level.B1')}
          </h2>
          <p className="text-[11px] text-cyber-muted mt-1 max-w-[200px] leading-relaxed">
            {currentLevel === 'B2' ? t('level.B2_desc') : t('level.B1_desc')}
          </p>
        </div>

        {/* Countdown — dynamic or prompt */}
        <div className="text-right ml-4 shrink-0">
          {schedule ? (
            <CountdownClock targetDate={schedule.examDate} />
          ) : (
            <div className="flex flex-col items-end gap-1">
              <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
                {t('dashboard.countdown')}
              </p>
              <p className="font-mono text-[10px] text-cyber-muted italic">
                {t('dashboard.noExamDate')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-royal/40 to-transparent mb-5" />

      {/* ── Exam setup card ── */}
      <ExamSetupCard skill={activeSkill} />

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

      {/* ── Intensity strip ── */}
      {intensityNode}

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
