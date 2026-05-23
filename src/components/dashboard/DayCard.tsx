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
  if (examType.includes('1')) return 'border-cyber-blue text-cyber-blue bg-cyber-blue/10';
  if (examType.includes('3')) return 'border-cyber-orange text-cyber-orange bg-cyber-orange/10';
  return 'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10';
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
        bg-cyber-card border rounded-2xl p-4 transition-all duration-200 cursor-pointer
        ${isCompleted
          ? 'border-cyber-yellow/30 bg-cyber-yellow/[0.03] hover:border-cyber-yellow/50'
          : 'border-cyber-border hover:border-cyber-border/60 hover:bg-cyber-card/80'
        }
        active:scale-[0.98]
      `}
    >
      {/* Top row: day badge + exam type tag + complete toggle */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="font-mono text-[10px] font-bold text-cyber-muted tracking-widest uppercase shrink-0">
            {t('common.day')} {day.dayNumber}
          </span>
          <span
            className={`
              font-mono text-[9px] font-bold uppercase tracking-wider
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
            <CheckCircle2
              size={22}
              className="text-cyber-yellow"
              style={{ filter: 'var(--drop-yellow)' }}
            />
          ) : (
            <Circle size={22} className="text-cyber-border hover:text-cyber-muted transition-colors" />
          )}
        </button>
      </div>

      {/* Title */}
      <h3
        className={`
          text-sm font-bold leading-snug mb-3
          ${isCompleted ? 'text-cyber-muted line-through' : 'text-cyber-text'}
        `}
      >
        {title}
      </h3>

      {/* Stats row */}
      <div className="flex items-center gap-4 flex-wrap">
        <StatChip icon={<BookOpen size={12} />} value={day.vocabulary.length} color="text-cyber-blue" />
        <StatChip icon={<MessageSquare size={12} />} value={day.functionalPhrases.length} color="text-cyber-purple" />
        {day.examTask.durationSeconds != null && (
          <StatChip icon={<Timer size={12} />} value={`${day.examTask.durationSeconds}s`} color="text-cyber-orange" />
        )}
        {concreteCount > 0 && (
          <StatChip icon={<Zap size={12} />} value={concreteCount} color="text-cyber-yellow" />
        )}
      </div>
    </div>
  );
}

function StatChip({ icon, value, color }: { icon: ReactNode; value: string | number; color: string }) {
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      {icon}
      <span className="font-mono text-[11px] font-bold">{value}</span>
    </div>
  );
}
