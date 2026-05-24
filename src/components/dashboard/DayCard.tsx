import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Circle, BookOpen, MessageSquare, Timer, Zap } from 'lucide-react';
import type { ProgramDay } from '../../types';

interface DayCardProps {
  day: ProgramDay;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpen: () => void;
}

function examTypeStyle(examType: string) {
  if (examType.includes('1')) return 'border-cyber-blue/40 text-cyber-blue bg-cyber-blue/8';
  if (examType.includes('3')) return 'border-cyber-orange/40 text-cyber-orange bg-cyber-orange/8';
  return 'border-cyber-yellow/40 text-cyber-yellow bg-cyber-yellow/8';
}

export default function DayCard({ day, isCompleted, onToggleComplete, onOpen }: DayCardProps) {
  const { t, i18n } = useTranslation();

  const lang = i18n.language as 'tr' | 'en';
  const title = day.titleTranslations[lang] ?? day.titleTranslations['en'] ?? '';
  const concreteCount = day.vocabulary.filter((w) => w.isConcreteWord).length;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      className={`
        bg-cyber-card border rounded-xl p-4 transition-all duration-200 cursor-pointer
        shadow-card hover:shadow-card-hover
        ${isCompleted
          ? 'border-cyber-border/50 opacity-70'
          : 'border-cyber-border hover:border-cyber-muted/40'
        }
        active:scale-[0.98]
      `}
    >
      {/* Top row: day badge + exam type tag + complete toggle */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="text-[10px] font-semibold text-cyber-muted tracking-wider uppercase shrink-0">
            {t('common.day')} {day.dayNumber}
          </span>
          <span
            className={`
              text-[9px] font-semibold uppercase tracking-wide
              px-2 py-0.5 rounded-md border
              ${examTypeStyle(day.examType)}
            `}
          >
            {day.examType}
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}
          aria-label={isCompleted ? t('common.complete') : t('common.markDone')}
          className="shrink-0 transition-transform active:scale-90 mt-0.5"
        >
          {isCompleted ? (
            <CheckCircle2 size={21} className="text-cyber-yellow" />
          ) : (
            <Circle size={21} className="text-cyber-border hover:text-cyber-muted transition-colors" />
          )}
        </button>
      </div>

      {/* Title */}
      <h3
        className={`
          text-sm font-semibold leading-snug mb-3
          ${isCompleted ? 'text-cyber-muted line-through' : 'text-cyber-text'}
        `}
      >
        {title}
      </h3>

      {/* Stats row */}
      <div className="flex items-center gap-4 flex-wrap">
        <StatChip icon={<BookOpen size={11} />} value={day.vocabulary.length} color="text-cyber-blue" tooltip={t('spreken.vocab')} />
        <StatChip icon={<MessageSquare size={11} />} value={day.functionalPhrases.length} color="text-cyber-purple" tooltip={t('spreken.phrases')} />
        {day.examTask.durationSeconds != null && (
          <StatChip icon={<Timer size={11} />} value={`${day.examTask.durationSeconds}s`} color="text-cyber-orange" tooltip={t('spreken.examTask')} />
        )}
        {concreteCount > 0 && (
          <StatChip icon={<Zap size={11} />} value={concreteCount} color="text-cyber-yellow" tooltip={t('spreken.concrete')} />
        )}
      </div>
    </div>
  );
}

function StatChip({ icon, value, color, tooltip }: { icon: ReactNode; value: string | number; color: string; tooltip: string }) {
  return (
    <div className={`relative group flex items-center gap-1 ${color}`}>
      {icon}
      <span className="text-[11px] font-semibold">{value}</span>
      <div className="
        absolute top-full left-1/2 -translate-x-1/2 mt-2
        px-2 py-1 rounded-lg
        bg-cyber-surface border border-cyber-border shadow-card
        text-[10px] font-medium text-cyber-text whitespace-nowrap
        opacity-0 group-hover:opacity-100
        transition-opacity duration-150
        pointer-events-none z-20
      ">
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-cyber-border" />
        {tooltip}
      </div>
    </div>
  );
}
