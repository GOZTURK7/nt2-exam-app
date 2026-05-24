import { useTranslation } from 'react-i18next';
import { Trophy, ChevronRight } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { examYears } from '../../data/b2-spreken-exam-tasks';
import ExamSetupCard from '../dashboard/ExamSetupCard';
import TopicFrequency from '../dashboard/TopicFrequency';
import type { Skill } from '../../types';

interface Props {
  onSimOpen: () => void;
}

const SKILLS: Skill[] = ['spreken', 'schrijven', 'lezen', 'luisteren'];

const DEEL_COLORS = ['text-cyber-blue', 'text-cyber-yellow', 'text-cyber-purple'];

export default function ExamScreen({ onSimOpen }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const simTaskIdx = useProgressStore((s) => s.simTaskIdx);

  const totalExamTasks = examYears.reduce((sum, y) => sum + y.tasks.length, 0);
  const yearCount = examYears.length;

  const deelBreakdown = examYears[examYears.length - 1].tasks.reduce<Record<string, number>>(
    (acc, t) => { acc[t.deel] = (acc[t.deel] ?? 0) + 1; return acc; },
    {},
  );

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

          {/* Year pills */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {examYears.map((y) => (
              <span
                key={y.year}
                className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-md bg-cyber-yellow/10 border border-cyber-yellow/30 text-cyber-yellow/70"
              >
                {y.year}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col">
              <span className="font-mono text-xl font-black text-cyber-text">{totalExamTasks}</span>
              <span className="font-mono text-[8px] text-cyber-muted uppercase tracking-wider">
                {lang === 'tr' ? 'gerçek görev' : 'real tasks'}
              </span>
            </div>
            <div className="w-px bg-cyber-border/40" />
            <div className="flex flex-col">
              <span className="font-mono text-xl font-black text-cyber-text">{yearCount}</span>
              <span className="font-mono text-[8px] text-cyber-muted uppercase tracking-wider">
                {lang === 'tr' ? 'sınav yılı' : 'exam years'}
              </span>
            </div>
            <div className="w-px bg-cyber-border/40" />
            <div className="flex gap-2 items-center">
              {(['Deel 1', 'Deel 2', 'Deel 3'] as const).map((d, i) => (
                <span key={d} className={`font-mono text-[9px] font-bold ${DEEL_COLORS[i]}`}>
                  D{i + 1}: {deelBreakdown[d] ?? 0}
                </span>
              ))}
            </div>
          </div>

          {/* Progress bar if mid-sim */}
          {simTaskIdx > 0 && simTaskIdx < 13 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-wider">
                  {lang === 'tr' ? 'Son Oturum' : 'Last Session'}
                </span>
                <span className="font-mono text-[9px] text-cyber-yellow">
                  {simTaskIdx}/13
                </span>
              </div>
              <div className="h-1.5 bg-cyber-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyber-yellow rounded-full transition-all"
                  style={{ width: `${(simTaskIdx / 13) * 100}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={onSimOpen}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-cyber-yellow text-cyber-dark font-mono text-sm font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.99]"
          >
            <span>
              {lang === 'tr' ? 'Yıl Seç & Başlat' : 'Choose Year & Start'}
            </span>
            <ChevronRight size={16} />
          </button>
          <p className="font-mono text-[8px] text-cyber-muted/60 mt-2 text-center">
            {lang === 'tr'
              ? `2021–2025 gerçek sınav görevleri + alıştırma seti`
              : `Real exam tasks 2021–2025 + practice set`}
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
