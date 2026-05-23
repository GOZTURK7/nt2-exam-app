import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const now = new Date();
  // Target: start of the exam day in local time
  const target = new Date(`${targetDate}T00:00:00`);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, expired: false };
}

interface CountdownClockProps {
  targetDate: string; // "YYYY-MM-DD"
}

export default function CountdownClock({ targetDate }: CountdownClockProps) {
  const { t } = useTranslation();
  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(targetDate));

  useEffect(() => {
    setTime(calcTimeLeft(targetDate));
    const id = setInterval(() => {
      setTime(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (time.expired) {
    return (
      <div className="text-center py-2">
        <p className="font-mono text-sm font-bold text-cyber-blue">
          {t('dashboard.examPassed')}
        </p>
      </div>
    );
  }

  const blocks = [
    { value: time.days,    label: t('dashboard.daysUnit') },
    { value: time.hours,   label: t('dashboard.hoursUnit') },
    { value: time.minutes, label: t('dashboard.minutesUnit') },
    { value: time.seconds, label: t('dashboard.secondsUnit') },
  ];

  return (
    <div>
      <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-[0.22em] text-right mb-1">
        {t('dashboard.countdown')}
      </p>
      <div className="flex items-end justify-end gap-1.5">
        {blocks.map(({ value, label }, i) => (
          <div key={i} className="flex flex-col items-center">
            <span
              className="text-2xl font-black font-mono text-cyber-yellow tabular-nums"
              style={{ textShadow: 'var(--glow-yellow)' }}
            >
              {String(value).padStart(2, '0')}
            </span>
            <span className="font-mono text-[8px] text-cyber-muted uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
