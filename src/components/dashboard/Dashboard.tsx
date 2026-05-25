import { useState } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic2, PenLine, BookOpen, Headphones, RotateCcw, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { useContentStore } from '../../store/useContentStore';
import type { ProgramDay, Skill } from '../../types';
import DayList from './DayList';
import CountdownClock from './CountdownClock';
import ExamSetupCard from './ExamSetupCard';
import StudyPlan from './StudyPlan';

interface DashboardProps {
  activeSkill: Skill;
  onSkillChange: (skill: Skill) => void;
  onDaySelect: (day: ProgramDay) => void;
  onReviewOpen: () => void;
  onSimOpen: () => void;
}

const SKILL_META: Record<Skill, { icon: ReactNode; colorClass: string }> = {
  spreken:   { icon: <Mic2 size={14} />,       colorClass: 'border-cyber-yellow/50 text-cyber-yellow bg-cyber-yellow/10' },
  schrijven: { icon: <PenLine size={14} />,    colorClass: 'border-cyber-blue/50 text-cyber-blue bg-cyber-blue/10' },
  lezen:     { icon: <BookOpen size={14} />,   colorClass: 'border-cyber-green/50 text-cyber-green bg-cyber-green/10' },
  luisteren: { icon: <Headphones size={14} />, colorClass: 'border-cyber-purple/50 text-cyber-purple bg-cyber-purple/10' },
};

const ALL_SKILLS: Skill[] = ['spreken', 'schrijven', 'lezen', 'luisteren'];

export default function Dashboard({ activeSkill, onSkillChange, onDaySelect, onReviewOpen, onSimOpen }: DashboardProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const [planOpen, setPlanOpen] = useState(false);

  const currentLevel    = useProgressStore((s) => s.currentLevel);
  const completedDays   = useProgressStore((s) => s.completedDays);
  const getDueCards     = useProgressStore((s) => s.getDueCards);
  const getExamSchedule = useProgressStore((s) => s.getExamSchedule);
  const getDays         = useContentStore((s) => s.getDays);

  const dueCount = getDueCards().length;
  const schedule = getExamSchedule(activeSkill);
  const days = getDays(currentLevel, activeSkill, schedule);
  const completedCount = completedDays.filter((id) =>
    id.startsWith(`${currentLevel}_${activeSkill}_`)
  ).length;

  const { icon, colorClass } = SKILL_META[activeSkill];
  const activeColor = colorClass.split(' ')[1];

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
      const color = perDay > 1.5 ? 'text-cyber-orange' : perDay > 1.0 ? 'text-cyber-yellow' : 'text-cyber-blue';
      intensityNode = (
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[9px] font-medium text-cyber-muted uppercase tracking-wider">
            {t('dashboard.intensityLabel')}
          </span>
          <span className={`text-xs font-semibold ${color}`}>
            {perDay.toFixed(1)} {t('dashboard.perDay')} · {schedule.dailyStudyHours} {t('dashboard.hoursPerDay')}
          </span>
        </div>
      );
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-5">

      {/* ── Hero: level + countdown ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[10px] font-medium text-cyber-muted tracking-widest uppercase">
            {t('dashboard.subtitle')}
          </p>
          <h2 className="text-xl font-bold text-cyber-text mt-1 leading-tight">
            {currentLevel === 'B2' ? t('level.B2') : t('level.B1')}
          </h2>
          <p className="text-[11px] text-cyber-muted mt-1 max-w-[200px] leading-relaxed">
            {currentLevel === 'B2' ? t('level.B2_desc') : t('level.B1_desc')}
          </p>
        </div>
        <div className="text-right ml-4 shrink-0">
          {schedule ? (
            <CountdownClock targetDate={schedule.examDate} />
          ) : (
            <div className="flex flex-col items-end gap-1">
              <p className="text-[10px] font-medium text-cyber-muted uppercase tracking-wider">
                {t('dashboard.countdown')}
              </p>
              <p className="text-[10px] text-cyber-muted italic">
                {t('dashboard.noExamDate')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent mb-5" />

      {/* ── Shortcuts: review + sim ── */}
      <div className="flex flex-col gap-2 mb-4">
        {dueCount > 0 && (
          <button
            onClick={onReviewOpen}
            className="flex items-center gap-3 bg-cyber-green/8 border border-cyber-green/40 rounded-xl px-4 py-3 hover:bg-cyber-green/12 transition-all active:scale-[0.99]"
          >
            <span className="w-7 h-7 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center text-xs font-bold text-cyber-green shrink-0">
              {dueCount}
            </span>
            <span className="flex-1 text-left text-xs font-semibold text-cyber-green uppercase tracking-wide">
              {lang === 'tr' ? 'Kart Tekrar Zamanı' : 'Cards due for review'}
            </span>
            <RotateCcw size={14} className="text-cyber-green shrink-0" />
          </button>
        )}
        <button
          onClick={onSimOpen}
          className="flex items-center gap-3 bg-cyber-yellow/8 border border-cyber-yellow/40 rounded-xl px-4 py-3 hover:bg-cyber-yellow/12 transition-all active:scale-[0.99]"
        >
          <Play size={14} className="text-cyber-yellow shrink-0" />
          <span className="flex-1 text-left text-xs font-semibold text-cyber-yellow uppercase tracking-wide">
            {lang === 'tr' ? 'Sınav Simülasyonu — B2 Spreken' : 'Exam Simulation — B2 Spreken'}
          </span>
        </button>
      </div>

      {/* ── Exam setup (default closed) ── */}
      <ExamSetupCard skill={activeSkill} />

      {/* ── Skill selector tabs ── */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
        {ALL_SKILLS.map((skill) => {
          const { icon: sIcon, colorClass: sColor } = SKILL_META[skill];
          const isActive = skill === activeSkill;
          return (
            <button
              key={skill}
              onClick={() => onSkillChange(skill)}
              className={`
                flex items-center gap-1.5 px-3.5 py-2 rounded-xl border shrink-0
                text-xs font-semibold transition-all duration-200
                ${isActive ? sColor : 'border-cyber-border text-cyber-muted hover:border-cyber-muted/40 hover:text-cyber-text'}
              `}
            >
              {sIcon}
              {t(`skill.${skill}.name`)}
            </button>
          );
        })}
      </div>

      {/* ── Active skill header + progress ── */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${colorClass}`}>
          {icon}
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t(`skill.${activeSkill}.name`)}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-cyber-text">
            <span className={activeColor}>{completedCount}</span>
            <span className="text-cyber-muted"> / {days.length}</span>
          </p>
          <p className="text-[9px] font-medium text-cyber-muted uppercase tracking-wider mt-0.5">
            {t('dashboard.progress')}
          </p>
        </div>
      </div>

      {/* ── Intensity strip ── */}
      {intensityNode}

      {/* ── Study Plan (collapsible, default closed) ── */}
      {schedule && (
        <div className="mb-4">
          <button
            onClick={() => setPlanOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-muted/60 transition-all text-xs font-medium mb-2"
          >
            <span>{lang === 'tr' ? 'Çalışma Planı' : 'Study Plan'}</span>
            {planOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          {planOpen && (
            <StudyPlan
              days={days}
              completedDays={completedDays}
              schedule={schedule}
              level={currentLevel}
              skill={activeSkill}
              onDaySelect={onDaySelect}
              lang={lang}
            />
          )}
        </div>
      )}

      {/* ── Day list ── */}
      <DayList skill={activeSkill} level={currentLevel} onDaySelect={onDaySelect} />

      {/* ── Stats strip ── */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { key: 'streak'    as const, value: 0,                    color: 'text-cyber-yellow' },
          { key: 'completed' as const, value: completedDays.length, color: 'text-cyber-blue' },
          { key: 'words'     as const, value: 0,                    color: 'text-cyber-purple' },
        ].map(({ key, value, color }) => (
          <div key={key} className="bg-cyber-card border border-cyber-border rounded-xl p-3 text-center shadow-card">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-[9px] font-medium text-cyber-muted uppercase tracking-wider mt-1">
              {t(`dashboard.stats.${key}`)}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
