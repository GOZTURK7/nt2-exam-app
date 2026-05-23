import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import type { Skill } from '../../types';

interface ExamSetupCardProps {
  skill: Skill;
  forceOpen?: boolean;
}

export default function ExamSetupCard({ skill, forceOpen = false }: ExamSetupCardProps) {
  const { t } = useTranslation();
  const setExamSchedule = useProgressStore((s) => s.setExamSchedule);
  const getExamSchedule = useProgressStore((s) => s.getExamSchedule);

  const existing = getExamSchedule(skill);

  const todayStr = new Date().toISOString().split('T')[0];
  const [open, setOpen] = useState(forceOpen || !existing);
  const [localDate, setLocalDate] = useState(existing?.examDate ?? '');
  const [localHours, setLocalHours] = useState(existing?.dailyStudyHours ?? 2);

  function handleSave() {
    if (!localDate) return;
    setExamSchedule(skill, localDate, localHours);
    setOpen(false);
  }

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden mb-4">
      {/* Header row — always visible */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <CalendarDays size={14} className="text-cyber-yellow" />
          <span className="font-mono text-xs font-bold text-cyber-text uppercase tracking-wider">
            {t('dashboard.examDate')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {existing && !open && (
            <span className="font-mono text-[10px] text-cyber-muted">
              {existing.examDate} · {existing.dailyStudyHours} {t('dashboard.hoursPerDay')}
            </span>
          )}
          {open ? (
            <ChevronUp size={14} className="text-cyber-muted" />
          ) : (
            <ChevronDown size={14} className="text-cyber-muted" />
          )}
        </div>
      </button>

      {/* Collapsible form */}
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-cyber-border">
          {/* Date input */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
              {t('dashboard.examDate')}
            </label>
            <input
              type="date"
              min={todayStr}
              value={localDate}
              onChange={(e) => setLocalDate(e.target.value)}
              className="
                w-full bg-cyber-surface border border-cyber-border rounded-lg
                px-3 py-2 font-mono text-sm text-cyber-text
                focus:outline-none focus:border-cyber-yellow
              "
            />
          </div>

          {/* Hours input */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
              {t('dashboard.dailyHours')}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.5"
                max="12"
                step="0.5"
                value={localHours}
                onChange={(e) => setLocalHours(Number(e.target.value))}
                className="flex-1 accent-cyber-yellow"
              />
              <span className="font-mono text-sm font-bold text-cyber-yellow w-14 text-right">
                {localHours} {t('dashboard.hoursUnit')}
              </span>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!localDate}
            className="
              mt-1 w-full py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-widest
              bg-cyber-yellow text-cyber-dark
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-opacity
            "
          >
            {t('common.save')}
          </button>
        </div>
      )}
    </div>
  );
}
