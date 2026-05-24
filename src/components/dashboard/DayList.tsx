import { useTranslation } from 'react-i18next';
import { useContentStore } from '../../store/useContentStore';
import { useProgressStore, buildDayId } from '../../store/useProgressStore';
import type { Level, ProgramDay, Skill } from '../../types';
import DayCard from './DayCard';

interface DayListProps {
  skill: Skill;
  level: Level;
  onDaySelect: (day: ProgramDay) => void;
}

export default function DayList({ skill, level, onDaySelect }: DayListProps) {
  const { t } = useTranslation();
  const getDays = useContentStore((s) => s.getDays);
  const isDayCompleted = useProgressStore((s) => s.isDayCompleted);
  const completeDay = useProgressStore((s) => s.completeDay);
  const uncompleteDay = useProgressStore((s) => s.uncompleteDay);
  const schedule = useProgressStore((s) => s.examSchedules.find((e) => e.skill === skill));
  const days = getDays(level, skill, schedule);

  if (days.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-11 h-11 rounded-full bg-cyber-card border border-cyber-border flex items-center justify-center">
          <span className="text-xl text-cyber-muted select-none">—</span>
        </div>
        <p className="text-xs font-medium text-cyber-muted">
          {t('common.empty')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {days.map((day) => {
        const dayId = buildDayId(level, skill, day.dayNumber);
        const completed = isDayCompleted(dayId);
        return (
          <DayCard
            key={dayId}
            day={day}
            isCompleted={completed}
            onToggleComplete={() =>
              completed ? uncompleteDay(dayId) : completeDay(dayId)
            }
            onOpen={() => onDaySelect(day)}
          />
        );
      })}
    </div>
  );
}
