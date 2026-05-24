import { useTranslation } from 'react-i18next';
import { Trophy, ChevronRight } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { b2SprekenSim } from '../../data/b2-spreken-sim';
import ExamSetupCard from '../dashboard/ExamSetupCard';
import TopicFrequency from '../dashboard/TopicFrequency';
import type { Skill } from '../../types';

interface Props {
  onSimOpen: () => void;
}

const SKILLS: Skill[] = ['spreken', 'schrijven', 'lezen', 'luisteren'];

export default function ExamScreen({ onSimOpen }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const simTaskIdx = useProgressStore((s) => s.simTaskIdx);
  const total = b2SprekenSim.length;

  const simLabel = (() => {
    if (simTaskIdx >= total)       return lang === 'tr' ? 'Tamamlandı · Tekrar Başlat' : 'Completed · Restart';
    if (simTaskIdx > 0)            return lang === 'tr' ? `Devam Et — Görev ${simTaskIdx + 1}/${total}` : `Continue — Task ${simTaskIdx + 1}/${total}`;
    return lang === 'tr' ? 'Simülasyonu Başlat' : 'Start Simulation';
  })();

  const simSubLabel = simTaskIdx > 0 && simTaskIdx < total
    ? lang === 'tr' ? 'Kaldığın yerden devam edebilirsin' : 'You can continue where you left off'
    : lang === 'tr' ? `13 görev · Deel 1, 2 ve 3` : '13 tasks · Deel 1, 2 and 3';

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">

      {/* ── Simulation card ── */}
      <div className="bg-cyber-card border border-cyber-yellow/30 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
                B2 · Spreken
              </p>
              <h2 className="text-lg font-black text-cyber-text mt-0.5">
                {lang === 'tr' ? 'Sınav Simülasyonu' : 'Exam Simulation'}
              </h2>
            </div>
            <Trophy size={28} className="text-cyber-yellow/40 mt-1" />
          </div>

          {/* Progress bar if mid-sim */}
          {simTaskIdx > 0 && simTaskIdx < total && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-wider">
                  {lang === 'tr' ? 'İlerleme' : 'Progress'}
                </span>
                <span className="font-mono text-[9px] text-cyber-yellow">
                  {simTaskIdx}/{total}
                </span>
              </div>
              <div className="h-1.5 bg-cyber-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyber-yellow rounded-full transition-all"
                  style={{ width: `${(simTaskIdx / total) * 100}%` }}
                />
              </div>
            </div>
          )}
          {simTaskIdx >= total && (
            <div className="mb-4 flex items-center gap-2">
              <span className="font-mono text-[9px] text-cyber-green uppercase tracking-wider">
                ✓ {lang === 'tr' ? 'Tamamlandı' : 'Completed'}
              </span>
            </div>
          )}

          <button
            onClick={onSimOpen}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-cyber-yellow text-cyber-dark font-mono text-sm font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.99]"
          >
            <span>{simLabel}</span>
            <ChevronRight size={16} />
          </button>
          <p className="font-mono text-[8px] text-cyber-muted/60 mt-2 text-center">
            {simSubLabel}
          </p>
        </div>
      </div>

      {/* ── Topic frequency ── */}
      <TopicFrequency lang={lang} defaultOpen />

      {/* ── Exam dates for each skill ── */}
      <div>
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mb-3 px-1">
          {lang === 'tr' ? 'Sınav Tarihleri' : 'Exam Dates'}
        </p>
        {SKILLS.map((skill) => (
          <ExamSetupCard key={skill} skill={skill} />
        ))}
      </div>

    </div>
  );
}
