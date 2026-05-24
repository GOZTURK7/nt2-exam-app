import { useMemo, useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProgramDay, Skill, Level, ExamSchedule } from '../../types';
import { buildDayId } from '../../store/useProgressStore';

interface Props {
  days: ProgramDay[];
  completedDays: string[];
  schedule: ExamSchedule;
  level: Level;
  skill: Skill;
  onDaySelect: (day: ProgramDay) => void;
  lang: 'tr' | 'en';
}

interface CalSlot {
  date: Date;
  dateStr: string;
  programDays: ProgramDay[];
  isToday: boolean;
}

function buildSlots(
  allDays: ProgramDay[],
  completedDays: string[],
  schedule: ExamSchedule,
  level: Level,
  skill: Skill,
): CalSlot[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  const exam = new Date(`${schedule.examDate}T00:00:00`);
  const daysLeft = Math.ceil((exam.getTime() - today.getTime()) / 86_400_000);
  if (daysLeft <= 0) return [];

  const remaining = allDays.filter(
    (d) => !completedDays.includes(buildDayId(level, skill, d.dayNumber)),
  );
  if (remaining.length === 0) return [];

  const slots: CalSlot[] = [];
  const perDay = remaining.length / daysLeft;
  let idx = 0;

  for (let d = 0; d < daysLeft && idx < remaining.length; d++) {
    const targetIdx = Math.round((d + 1) * perDay);
    if (targetIdx <= idx) continue; // rest day

    const endIdx = Math.min(remaining.length, targetIdx);
    const batch = remaining.slice(idx, endIdx);

    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = date.toISOString().slice(0, 10);

    slots.push({ date, dateStr, programDays: batch, isToday: dateStr === todayStr });
    idx = endIdx;
  }

  return slots;
}

function getWeekStart(d: Date): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const dow = date.getDay();
  date.setDate(date.getDate() - (dow === 0 ? 6 : dow - 1)); // Monday
  return date;
}

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export default function StudyPlan({ days, completedDays, schedule, level, skill, onDaySelect, lang }: Props) {
  const [showFull, setShowFull] = useState(false);
  const locale = lang === 'tr' ? 'tr-TR' : 'en-GB';

  const slots = useMemo(
    () => buildSlots(days, completedDays, schedule, level, skill),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [days.length, completedDays.length, schedule, level, skill],
  );

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);

  if (slots.length === 0) return null;

  const todaySlot = slots.find((s) => s.isToday);

  // Next 7 days starting from today
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 6);

  const weekRow = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().slice(0, 10);
    return { date, slot: slots.find((s) => s.dateStr === dateStr) ?? null };
  });

  // Group all slots by calendar week for full plan
  const weekGroups: Map<string, CalSlot[]> = new Map();
  for (const slot of slots) {
    const ws = getWeekStart(slot.date);
    const key = ws.toISOString().slice(0, 10);
    if (!weekGroups.has(key)) weekGroups.set(key, []);
    weekGroups.get(key)!.push(slot);
  }

  const fmt = (date: Date, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, opts).format(date);

  const DayPill = ({ pd, highlight }: { pd: ProgramDay; highlight?: boolean }) => (
    <button
      onClick={() => onDaySelect(pd)}
      className={`
        font-mono text-[9px] px-2 py-0.5 rounded-md border transition-colors
        ${highlight
          ? 'border-cyber-yellow/60 text-cyber-yellow bg-cyber-yellow/10 hover:bg-cyber-yellow/20'
          : 'border-cyber-border text-cyber-muted hover:border-cyber-blue hover:text-cyber-blue'
        }
      `}
    >
      {lang === 'tr' ? `Gün ${pd.dayNumber}` : `Day ${pd.dayNumber}`}
    </button>
  );

  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* ── Bugün / Today ── */}
      {todaySlot && (
        <div className="bg-cyber-card border border-cyber-yellow/40 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cyber-border/40">
            <span className="font-mono text-[9px] font-bold text-cyber-yellow uppercase tracking-[0.2em]">
              {lang === 'tr' ? 'BUGÜN' : 'TODAY'}
            </span>
            <span className="font-mono text-[9px] text-cyber-muted">
              · {fmt(todaySlot.date, { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <div className="divide-y divide-cyber-border/20">
            {todaySlot.programDays.map((pd) => (
              <button
                key={pd.dayNumber}
                onClick={() => onDaySelect(pd)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-cyber-surface transition-colors text-left gap-3"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-mono text-[8px] text-cyber-muted/70 uppercase tracking-wider">
                    {lang === 'tr' ? `Gün ${pd.dayNumber}` : `Day ${pd.dayNumber}`}
                  </span>
                  <span className="text-xs font-semibold text-cyber-text truncate">
                    {pd.titleTranslations[lang] ?? pd.titleTranslations.en}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-cyber-muted shrink-0">
                  <BookOpen size={11} />
                  <span className="font-mono text-[10px]">{pd.vocabulary.length}</span>
                  <ChevronRight size={11} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Bu Hafta / This Week ── */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cyber-border/40">
          <span className="font-mono text-[9px] font-bold text-cyber-blue uppercase tracking-[0.2em]">
            {lang === 'tr' ? 'SONRAKİ 7 GÜN' : 'NEXT 7 DAYS'}
          </span>
          <span className="font-mono text-[9px] text-cyber-muted">
            · {fmt(today, { day: 'numeric', month: 'short' })}
            {' – '}
            {fmt(weekEnd, { day: 'numeric', month: 'short' })}
          </span>
        </div>
        <div className="divide-y divide-cyber-border/20">
          {weekRow.map(({ date, slot }) => {
            const isToday = isSameDay(date, today);
            const isPast = date < today && !isToday;
            return (
              <div
                key={date.toISOString()}
                className={`flex items-center gap-3 px-4 py-2.5 ${isPast ? 'opacity-40' : ''}`}
              >
                <span className={`font-mono text-[9px] uppercase tracking-wider w-8 shrink-0 ${isToday ? 'text-cyber-yellow font-bold' : 'text-cyber-muted'}`}>
                  {fmt(date, { weekday: 'short' })}
                </span>
                <span className="font-mono text-[9px] text-cyber-muted/50 w-14 shrink-0">
                  {fmt(date, { day: 'numeric', month: 'short' })}
                </span>
                {slot ? (
                  <div className="flex flex-wrap gap-1.5">
                    {slot.programDays.map((pd) => (
                      <DayPill key={pd.dayNumber} pd={pd} highlight={isToday} />
                    ))}
                  </div>
                ) : (
                  <span className="font-mono text-[9px] text-cyber-border italic">
                    {lang === 'tr' ? 'dinlenme' : 'rest'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tüm Plan / Full Plan (collapsible) ── */}
      <button
        onClick={() => setShowFull((v) => !v)}
        className="
          flex items-center justify-between w-full px-3 py-2.5 rounded-xl
          border border-cyber-border text-cyber-muted
          hover:text-cyber-text hover:border-cyber-muted
          transition-all font-mono text-[9px] uppercase tracking-widest
        "
      >
        <span>
          {lang === 'tr' ? 'Tüm Plan' : 'Full Plan'}
          {' · '}
          {slots.length}
          {' '}
          {lang === 'tr' ? 'ders günü' : 'study days'}
        </span>
        {showFull ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {showFull && (
        <div className="flex flex-col gap-2">
          {Array.from(weekGroups.entries()).map(([key, wSlots]) => {
            const ws = new Date(key);
            const we = new Date(key);
            we.setDate(ws.getDate() + 6);
            const isPastWeek = we < today;
            return (
              <div
                key={key}
                className={`bg-cyber-card border border-cyber-border rounded-xl overflow-hidden ${isPastWeek ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-cyber-border/40">
                  <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-wider">
                    {fmt(ws, { day: 'numeric', month: 'short' })}
                    {' – '}
                    {fmt(we, { day: 'numeric', month: 'short' })}
                  </span>
                  <span className="font-mono text-[9px] text-cyber-border">
                    {wSlots.reduce((a, s) => a + s.programDays.length, 0)}
                    {' '}
                    {lang === 'tr' ? 'gün' : 'days'}
                  </span>
                </div>
                <div className="divide-y divide-cyber-border/20">
                  {wSlots.map((slot) => (
                    <div key={slot.dateStr} className="flex items-center gap-3 px-4 py-2">
                      <span className="font-mono text-[9px] text-cyber-muted/60 w-24 shrink-0">
                        {fmt(slot.date, { weekday: 'short', day: 'numeric', month: 'short' })}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {slot.programDays.map((pd) => (
                          <DayPill key={pd.dayNumber} pd={pd} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
