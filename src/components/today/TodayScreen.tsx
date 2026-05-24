import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Play, ChevronRight, Mic2, PenLine, BookOpen, Headphones } from 'lucide-react';
import { useProgressStore, buildDayId } from '../../store/useProgressStore';
import { useContentStore } from '../../store/useContentStore';
import type { Skill, ProgramDay } from '../../types';

interface Props {
  onReviewOpen: () => void;
  onDaySelect: (day: ProgramDay, skill: Skill) => void;
  onGoToExam: () => void;
}

const SKILLS: Skill[] = ['spreken', 'schrijven', 'lezen', 'luisteren'];

const SKILL_META: Record<Skill, { Icon: typeof Mic2; color: string; bar: string; label: { tr: string; en: string } }> = {
  spreken:   { Icon: Mic2,       color: 'text-cyber-yellow', bar: 'bg-cyber-yellow', label: { tr: 'Konuşma', en: 'Speaking'  } },
  schrijven: { Icon: PenLine,    color: 'text-cyber-blue',   bar: 'bg-cyber-blue',   label: { tr: 'Yazma',    en: 'Writing'   } },
  lezen:     { Icon: BookOpen,   color: 'text-cyber-green',  bar: 'bg-cyber-green',  label: { tr: 'Okuma',    en: 'Reading'   } },
  luisteren: { Icon: Headphones, color: 'text-cyber-purple', bar: 'bg-cyber-purple', label: { tr: 'Dinleme',  en: 'Listening' } },
};

function calcTimeLeft(dateStr: string) {
  const diff = new Date(`${dateStr}T00:00:00`).getTime() - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60) };
}

export default function TodayScreen({ onReviewOpen, onDaySelect, onGoToExam }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const currentLevel    = useProgressStore((s) => s.currentLevel);
  const completedDays   = useProgressStore((s) => s.completedDays);
  const getDueCards     = useProgressStore((s) => s.getDueCards);
  const getExamSchedule = useProgressStore((s) => s.getExamSchedule);
  const getDays         = useContentStore((s) => s.getDays);

  const dueCount = getDueCards().length;

  // Most urgent exam schedule
  const urgentSchedule = useMemo(() => {
    return SKILLS
      .map((sk) => ({ sk, sc: getExamSchedule(sk) }))
      .filter((x) => x.sc)
      .sort((a, b) => a.sc!.examDate.localeCompare(b.sc!.examDate))[0] ?? null;
  }, [getExamSchedule]);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState(() =>
    urgentSchedule ? calcTimeLeft(urgentSchedule.sc!.examDate) : null
  );
  useEffect(() => {
    if (!urgentSchedule) return;
    const id = setInterval(() => setTimeLeft(calcTimeLeft(urgentSchedule.sc!.examDate)), 1000);
    return () => clearInterval(id);
  }, [urgentSchedule]);

  // Next recommended lesson (first skill with schedule & uncompleted days)
  const nextLesson = useMemo(() => {
    const priority = urgentSchedule
      ? [urgentSchedule.sk, ...SKILLS.filter((s) => s !== urgentSchedule.sk)]
      : SKILLS;
    for (const skill of priority) {
      const sc = getExamSchedule(skill);
      const days = getDays(currentLevel, skill, sc ?? undefined);
      const next = days.find((d) => !completedDays.includes(buildDayId(currentLevel, skill, d.dayNumber)));
      if (next) return { skill, day: next };
    }
    return null;
  }, [currentLevel, completedDays, getDays, getExamSchedule, urgentSchedule]);

  // Per-skill progress
  const skillProgress = useMemo(() =>
    SKILLS.map((skill) => {
      const sc = getExamSchedule(skill);
      const days = getDays(currentLevel, skill, sc ?? undefined);
      const done = completedDays.filter((id) => id.startsWith(`${currentLevel}_${skill}_`)).length;
      return { skill, done, total: days.length };
    }),
  [currentLevel, completedDays, getDays, getExamSchedule]);

  const hasAnything = dueCount > 0 || nextLesson !== null;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">

      {/* ── Countdown hero ── */}
      {urgentSchedule && timeLeft ? (
        <div className="bg-cyber-card border border-cyber-yellow/30 rounded-2xl px-5 py-5">
          <div className="flex items-center gap-2 mb-4">
            {(() => { const { Icon } = SKILL_META[urgentSchedule.sk]; return <Icon size={13} className="text-cyber-yellow" />; })()}
            <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-[0.2em]">
              {lang === 'tr'
                ? `${urgentSchedule.sk.toUpperCase()} · ${currentLevel} · ${urgentSchedule.sc!.examDate}`
                : `${urgentSchedule.sk.toUpperCase()} · ${currentLevel} · ${urgentSchedule.sc!.examDate}`}
            </p>
          </div>
          <div className="flex items-end gap-4">
            {[
              { val: timeLeft.days,  label: lang === 'tr' ? 'GÜN'    : 'DAYS'  },
              { val: timeLeft.hours, label: lang === 'tr' ? 'SAAT'   : 'HRS'   },
              { val: timeLeft.mins,  label: lang === 'tr' ? 'DAKİKA' : 'MINS'  },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-start">
                <span
                  className="font-mono font-black text-5xl tabular-nums text-cyber-yellow leading-none"
                  style={{ textShadow: 'var(--glow-yellow)' }}
                >
                  {String(val).padStart(2, '0')}
                </span>
                <span className="font-mono text-[8px] text-cyber-muted uppercase tracking-[0.18em] mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-cyber-muted/60 mt-3">
            {lang === 'tr'
              ? `Günlük ${urgentSchedule.sc!.dailyStudyHours} saat çalışma`
              : `${urgentSchedule.sc!.dailyStudyHours}h study per day`}
          </p>
        </div>
      ) : (
        <div className="bg-cyber-card border border-dashed border-cyber-border rounded-2xl px-5 py-5 flex flex-col gap-3">
          <p className="font-mono text-xs font-bold text-cyber-muted">
            {lang === 'tr' ? 'Sınav tarihi ayarlanmamış' : 'No exam date set'}
          </p>
          <button
            onClick={onGoToExam}
            className="self-start flex items-center gap-2 font-mono text-xs text-cyber-yellow border border-cyber-yellow/50 rounded-lg px-3 py-1.5 hover:bg-cyber-yellow/10 transition-all"
          >
            {lang === 'tr' ? 'Sınav sekmesinden ayarla' : 'Set in Exam tab'}
            <ChevronRight size={12} />
          </button>
        </div>
      )}

      {/* ── Actions ── */}
      {hasAnything && (
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest px-1">
            {lang === 'tr' ? 'Şu an yapılacaklar' : 'Up next'}
          </p>

          {dueCount > 0 && (
            <button
              onClick={onReviewOpen}
              className="flex items-center gap-4 bg-cyber-green/[0.07] border border-cyber-green/50 rounded-xl px-4 py-3.5 hover:bg-cyber-green/[0.12] transition-all active:scale-[0.99]"
            >
              <span className="w-8 h-8 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center font-mono text-sm font-black text-cyber-green shrink-0"
                style={{ textShadow: 'var(--glow-green)' }}>
                {dueCount}
              </span>
              <div className="flex-1 text-left">
                <p className="font-mono text-xs font-bold text-cyber-green uppercase tracking-wider">
                  {lang === 'tr' ? 'Kart tekrar zamanı' : 'Cards due for review'}
                </p>
                <p className="font-mono text-[9px] text-cyber-green/60 mt-0.5">
                  {lang === 'tr' ? 'SRS · Boşluk tekrarı' : 'SRS · Spaced repetition'}
                </p>
              </div>
              <RotateCcw size={16} className="text-cyber-green shrink-0" />
            </button>
          )}

          {nextLesson && (
            <button
              onClick={() => onDaySelect(nextLesson.day, nextLesson.skill)}
              className="flex items-center gap-4 bg-cyber-yellow/[0.07] border border-cyber-yellow/50 rounded-xl px-4 py-3.5 hover:bg-cyber-yellow/[0.12] transition-all active:scale-[0.99]"
            >
              {(() => { const { Icon } = SKILL_META[nextLesson.skill]; return <Icon size={18} className="text-cyber-yellow shrink-0" />; })()}
              <div className="flex-1 text-left">
                <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
                  {lang === 'tr'
                    ? `Gün ${nextLesson.day.dayNumber} · ${SKILL_META[nextLesson.skill].label.tr}`
                    : `Day ${nextLesson.day.dayNumber} · ${SKILL_META[nextLesson.skill].label.en}`}
                </p>
                <p className="font-mono text-sm font-bold text-cyber-yellow mt-0.5 truncate">
                  {nextLesson.day.titleTranslations[lang] ?? nextLesson.day.titleTranslations['en']}
                </p>
              </div>
              <Play size={16} className="text-cyber-yellow shrink-0" />
            </button>
          )}
        </div>
      )}

      {/* ── Skill progress ── */}
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest px-1 mb-1">
          {lang === 'tr' ? 'Beceri İlerlemesi' : 'Skill Progress'}
        </p>
        {skillProgress.map(({ skill, done, total }) => {
          const { Icon, color, bar, label } = SKILL_META[skill];
          const pct = total > 0 ? (done / total) * 100 : 0;
          return (
            <div key={skill} className="flex items-center gap-3 bg-cyber-card border border-cyber-border rounded-xl px-3 py-2.5">
              <Icon size={14} className={`${color} shrink-0`} />
              <span className={`font-mono text-[9px] uppercase tracking-wider w-16 shrink-0 ${color}`}>
                {lang === 'tr' ? label.tr : label.en}
              </span>
              <div className="flex-1 h-1.5 bg-cyber-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-cyber-muted tabular-nums w-10 text-right shrink-0">
                {done}/{total}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
