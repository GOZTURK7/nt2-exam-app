import { useState, useEffect, useMemo } from 'react';
import { RotateCcw, Play, ChevronRight, Mic2, PenLine, BookOpen, Headphones, AlertCircle } from 'lucide-react';
import { useProgressStore, buildDayId } from '../../store/useProgressStore';
import { useContentStore } from '../../store/useContentStore';
import type { Skill, Level, ProgramDay, ExamSchedule } from '../../types';

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

function buildScheduledLessons(
  allDays: ProgramDay[],
  completedDays: string[],
  schedule: ExamSchedule,
  level: Level,
  skill: Skill,
): { overdue: { day: ProgramDay; daysLate: number }[]; today: ProgramDay[] } {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayStr = todayDate.toISOString().slice(0, 10);

  const startDate = schedule.startDate
    ? new Date(`${schedule.startDate}T00:00:00`)
    : todayDate;
  startDate.setHours(0, 0, 0, 0);

  const examDate = new Date(`${schedule.examDate}T00:00:00`);
  const totalCalDays = Math.max(1, Math.ceil((examDate.getTime() - startDate.getTime()) / 86400000));
  const N = allDays.length;
  if (N === 0) return { overdue: [], today: [] };

  const perDay = N / totalCalDays;
  const overdue: { day: ProgramDay; daysLate: number }[] = [];
  const today: ProgramDay[] = [];
  let idx = 0;

  for (let d = 0; d < totalCalDays && idx < N; d++) {
    const targetIdx = Math.round((d + 1) * perDay);
    if (targetIdx <= idx) continue;

    const batchEnd = Math.min(N, targetIdx);
    const slotDate = new Date(startDate);
    slotDate.setDate(startDate.getDate() + d);
    const slotStr = slotDate.toISOString().slice(0, 10);

    if (slotStr <= todayStr) {
      for (let i = idx; i < batchEnd; i++) {
        const day = allDays[i];
        const done = completedDays.includes(buildDayId(level, skill, day.dayNumber));
        if (!done) {
          if (slotStr < todayStr) {
            const diff = Math.round((todayDate.getTime() - slotDate.getTime()) / 86400000);
            overdue.push({ day, daysLate: diff });
          } else {
            today.push(day);
          }
        }
      }
    }
    idx = batchEnd;
  }

  return { overdue, today };
}

export default function TodayScreen({ onReviewOpen, onDaySelect, onGoToExam }: Props) {
  const lang = (localStorage.getItem('i18nextLng') ?? 'tr') as 'tr' | 'en';

  const currentLevel    = useProgressStore((s) => s.currentLevel);
  const completedDays   = useProgressStore((s) => s.completedDays);
  const getDueCards     = useProgressStore((s) => s.getDueCards);
  const getExamSchedule = useProgressStore((s) => s.getExamSchedule);
  const getDays         = useContentStore((s) => s.getDays);

  const dueCount = getDueCards().length;

  const urgentSchedule = useMemo(() => {
    return SKILLS
      .map((sk) => ({ sk, sc: getExamSchedule(sk) }))
      .filter((x) => x.sc)
      .sort((a, b) => a.sc!.examDate.localeCompare(b.sc!.examDate))[0] ?? null;
  }, [getExamSchedule]);

  const [timeLeft, setTimeLeft] = useState(() =>
    urgentSchedule ? calcTimeLeft(urgentSchedule.sc!.examDate) : null
  );
  useEffect(() => {
    if (!urgentSchedule) return;
    const id = setInterval(() => setTimeLeft(calcTimeLeft(urgentSchedule.sc!.examDate)), 1000);
    return () => clearInterval(id);
  }, [urgentSchedule]);

  // Calendar-based: overdue + today for each skill
  const scheduledItems = useMemo(() => {
    const allOverdue: { skill: Skill; day: ProgramDay; daysLate: number }[] = [];
    const allToday:   { skill: Skill; day: ProgramDay }[] = [];

    for (const skill of SKILLS) {
      const sc = getExamSchedule(skill);
      if (!sc) continue;
      const days = getDays(currentLevel, skill, sc);
      const { overdue, today } = buildScheduledLessons(days, completedDays, sc, currentLevel, skill);
      overdue.forEach((o) => allOverdue.push({ skill, ...o }));
      today.forEach((d) => allToday.push({ skill, day: d }));
    }

    // Sort overdue: most late first
    allOverdue.sort((a, b) => b.daysLate - a.daysLate);
    return { overdue: allOverdue, today: allToday };
  }, [currentLevel, completedDays, getDays, getExamSchedule]);

  const skillProgress = useMemo(() =>
    SKILLS.map((skill) => {
      const sc = getExamSchedule(skill);
      const days = getDays(currentLevel, skill, sc ?? undefined);
      const done = completedDays.filter((id) => id.startsWith(`${currentLevel}_${skill}_`)).length;
      return { skill, done, total: days.length };
    }),
  [currentLevel, completedDays, getDays, getExamSchedule]);

  const hasActions = dueCount > 0 || scheduledItems.overdue.length > 0 || scheduledItems.today.length > 0;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">

      {/* ── Countdown hero ── */}
      {urgentSchedule && timeLeft ? (
        <div className="bg-cyber-card border border-cyber-yellow/30 rounded-2xl px-5 py-5">
          <div className="flex items-center gap-2 mb-4">
            {(() => { const { Icon } = SKILL_META[urgentSchedule.sk]; return <Icon size={13} className="text-cyber-yellow" />; })()}
            <p className="text-[9px] font-medium text-cyber-muted uppercase tracking-[0.2em]">
              {urgentSchedule.sk.toUpperCase()} · {currentLevel} · {urgentSchedule.sc!.examDate}
            </p>
          </div>
          <div className="flex items-end gap-4">
            {[
              { val: timeLeft.days,  label: lang === 'tr' ? 'GÜN'    : 'DAYS'  },
              { val: timeLeft.hours, label: lang === 'tr' ? 'SAAT'   : 'HRS'   },
              { val: timeLeft.mins,  label: lang === 'tr' ? 'DAKİKA' : 'MINS'  },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-start">
                <span className="font-mono font-black text-5xl tabular-nums text-cyber-yellow leading-none"
                  style={{ textShadow: 'var(--glow-yellow)' }}>
                  {String(val).padStart(2, '0')}
                </span>
                <span className="text-[8px] font-medium text-cyber-muted uppercase tracking-[0.18em] mt-1">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-cyber-muted/60 mt-3 font-medium">
            {lang === 'tr'
              ? `Günlük ${urgentSchedule.sc!.dailyStudyHours} saat çalışma`
              : `${urgentSchedule.sc!.dailyStudyHours}h study per day`}
          </p>
        </div>
      ) : (
        <div className="bg-cyber-card border border-dashed border-cyber-border rounded-2xl px-5 py-5 flex flex-col gap-3">
          <p className="text-xs font-semibold text-cyber-muted">
            {lang === 'tr' ? 'Sınav tarihi ayarlanmamış' : 'No exam date set'}
          </p>
          <button
            onClick={onGoToExam}
            className="self-start flex items-center gap-2 text-xs font-medium text-cyber-yellow border border-cyber-yellow/50 rounded-lg px-3 py-1.5 hover:bg-cyber-yellow/10 transition-all"
          >
            {lang === 'tr' ? 'Sınav sekmesinden ayarla' : 'Set in Exam tab'}
            <ChevronRight size={12} />
          </button>
        </div>
      )}

      {/* ── Actions ── */}
      {hasActions && (
        <div className="flex flex-col gap-2">
          <p className="text-[9px] font-semibold text-cyber-muted uppercase tracking-widest px-1">
            {lang === 'tr' ? 'Şu an yapılacaklar' : 'Up next'}
          </p>

          {/* SRS review */}
          {dueCount > 0 && (
            <button
              onClick={onReviewOpen}
              className="flex items-center gap-4 bg-cyber-green/[0.07] border border-cyber-green/50 rounded-xl px-4 py-3.5 hover:bg-cyber-green/[0.12] transition-all active:scale-[0.99]"
            >
              <span className="w-8 h-8 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center text-sm font-bold text-cyber-green shrink-0">
                {dueCount}
              </span>
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-cyber-green uppercase tracking-wider">
                  {lang === 'tr' ? 'Kart tekrar zamanı' : 'Cards due for review'}
                </p>
                <p className="text-[9px] text-cyber-green/60 mt-0.5 font-medium">
                  {lang === 'tr' ? 'SRS · Boşluk tekrarı' : 'SRS · Spaced repetition'}
                </p>
              </div>
              <RotateCcw size={16} className="text-cyber-green shrink-0" />
            </button>
          )}

          {/* Overdue lessons */}
          {scheduledItems.overdue.map(({ skill, day, daysLate }) => {
            const { color } = SKILL_META[skill];
            const title = day.titleTranslations[lang] ?? day.titleTranslations['en'];
            return (
              <button
                key={`overdue_${skill}_${day.dayNumber}`}
                onClick={() => onDaySelect(day, skill)}
                className="flex items-center gap-4 bg-cyber-orange/[0.07] border border-cyber-orange/50 rounded-xl px-4 py-3.5 hover:bg-cyber-orange/[0.12] transition-all active:scale-[0.99]"
              >
                <div className="w-8 h-8 rounded-full bg-cyber-orange/20 border border-cyber-orange flex items-center justify-center shrink-0">
                  <AlertCircle size={15} className="text-cyber-orange" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[9px] font-semibold text-cyber-orange uppercase tracking-wider">
                      {lang === 'tr' ? `${daysLate} gün gecikmiş` : `${daysLate}d overdue`}
                    </p>
                    <span className={`text-[9px] font-medium ${color}`}>· {skill}</span>
                  </div>
                  <p className="text-xs font-semibold text-cyber-text truncate">{title}</p>
                </div>
                <Play size={14} className="text-cyber-orange shrink-0" />
              </button>
            );
          })}

          {/* Today's lessons */}
          {scheduledItems.today.map(({ skill, day }) => {
            const { Icon } = SKILL_META[skill];
            const title = day.titleTranslations[lang] ?? day.titleTranslations['en'];
            return (
              <button
                key={`today_${skill}_${day.dayNumber}`}
                onClick={() => onDaySelect(day, skill)}
                className="flex items-center gap-4 bg-cyber-yellow/[0.07] border border-cyber-yellow/50 rounded-xl px-4 py-3.5 hover:bg-cyber-yellow/[0.12] transition-all active:scale-[0.99]"
              >
                <Icon size={18} className="text-cyber-yellow shrink-0" />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[9px] font-medium text-cyber-muted uppercase tracking-widest">
                    {lang === 'tr'
                      ? `Gün ${day.dayNumber} · ${SKILL_META[skill].label.tr}`
                      : `Day ${day.dayNumber} · ${SKILL_META[skill].label.en}`}
                  </p>
                  <p className="text-sm font-semibold text-cyber-yellow mt-0.5 truncate">{title}</p>
                </div>
                <Play size={16} className="text-cyber-yellow shrink-0" />
              </button>
            );
          })}
        </div>
      )}

      {/* ── Skill progress ── */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[9px] font-semibold text-cyber-muted uppercase tracking-widest px-1 mb-1">
          {lang === 'tr' ? 'Beceri İlerlemesi' : 'Skill Progress'}
        </p>
        {skillProgress.map(({ skill, done, total }) => {
          const { Icon, color, bar, label } = SKILL_META[skill];
          const pct = total > 0 ? (done / total) * 100 : 0;
          return (
            <div key={skill} className="flex items-center gap-3 bg-cyber-card border border-cyber-border rounded-xl px-3 py-2.5">
              <Icon size={14} className={`${color} shrink-0`} />
              <span className={`text-[9px] font-semibold uppercase tracking-wider w-16 shrink-0 ${color}`}>
                {lang === 'tr' ? label.tr : label.en}
              </span>
              <div className="flex-1 h-1.5 bg-cyber-border rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${bar}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[9px] font-medium text-cyber-muted tabular-nums w-10 text-right shrink-0">
                {done}/{total}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
