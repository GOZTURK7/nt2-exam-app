import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Mic, Square, ChevronRight, CheckCircle2,
  AlertCircle, Eye, EyeOff, Calendar, ChevronDown, ChevronUp,
  Image as ImageIcon, Play,
} from 'lucide-react';
import { b2SprekenSimSets } from '../../data/b2-spreken-sim';
import { examYears } from '../../data/b2-spreken-exam-tasks';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { useProgressStore } from '../../store/useProgressStore';
import type { ExamSimTask, SimDeel } from '../../types';

interface Props {
  onClose: () => void;
}

type Phase = 'year-select' | 'intro' | 'preparing' | 'recording' | 'done' | 'finished';

const DEEL_COLOR: Record<SimDeel, string> = {
  'Deel 1': 'border-cyber-blue   text-cyber-blue',
  'Deel 2': 'border-cyber-yellow text-cyber-yellow',
  'Deel 3': 'border-cyber-purple text-cyber-purple',
};

const CIRCUMFERENCE = 2 * Math.PI * 40;

type YearKey = string | number;

interface YearOption {
  key: YearKey;
  label: string;
  tasks: ExamSimTask[];
}

const YEAR_OPTIONS: YearOption[] = [
  ...b2SprekenSimSets.map((s) => ({ key: s.id, label: s.label, tasks: s.tasks })),
  ...examYears.map((y) => ({ key: y.year, label: String(y.year), tasks: y.tasks })),
];

export default function ExamSimulation({ onClose }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const savedTaskIdx  = useProgressStore((s) => s.simTaskIdx);
  const setSimTaskIdx = useProgressStore((s) => s.setSimTaskIdx);

  const [selectedYear, setSelectedYear] = useState<YearKey | null>(null);
  const [tasks,        setTasks]        = useState<ExamSimTask[]>([]);
  const [taskIdx,    setTaskIdx]    = useState(0);
  const [phase,      setPhase]      = useState<Phase>('year-select');
  const [timeLeft,   setTimeLeft]   = useState(0);
  const [showModel,  setShowModel]  = useState(false);

  const rafRef       = useRef<number>(0);
  const startRef     = useRef<number>(0);

  const { audioUrl, error, start, stop, reset, cleanup } = useAudioRecorder();
  const startFnRef = useRef(start);
  useEffect(() => { startFnRef.current = start; }, [start]);
  useEffect(() => () => cleanup(), [cleanup]);

  const total = tasks.length;
  const task  = tasks[taskIdx] as ExamSimTask | undefined;

  const handleYearSelect = (option: YearOption) => {
    setSelectedYear(option.key);
    setTasks(option.tasks);
    setTaskIdx(0);
    setSimTaskIdx(0);
    setPhase('intro');
  };

  // ── Prep countdown ───────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'preparing' || !task) return;
    setTimeLeft(task.prepSeconds);
    startRef.current = performance.now();

    const tick = () => {
      const elapsed   = performance.now() - startRef.current;
      const remaining = Math.max(0, task.prepSeconds - Math.floor(elapsed / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        startFnRef.current().then((ok) => {
          if (ok) {
            setTimeLeft(task.speakSeconds);
            setPhase('recording');
          } else {
            setPhase('intro');
          }
        });
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, taskIdx]);

  // ── Speaking countdown ───────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'recording' || !task) return;
    startRef.current = performance.now();

    const tick = () => {
      const elapsed   = performance.now() - startRef.current;
      const remaining = Math.max(0, task.speakSeconds - Math.floor(elapsed / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        stop();
        setPhase('done');
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, taskIdx]);

  const startTask = async () => {
    if (!task) return;
    cancelAnimationFrame(rafRef.current);
    reset();
    setShowModel(false);
    if (task.prepSeconds > 0) {
      setPhase('preparing');
    } else {
      const ok = await start();
      if (ok) {
        setTimeLeft(task.speakSeconds);
        setPhase('recording');
      }
    }
  };

  const stopEarly = () => {
    cancelAnimationFrame(rafRef.current);
    stop();
    setPhase('done');
  };

  const nextTask = () => {
    cancelAnimationFrame(rafRef.current);
    reset();
    setShowModel(false);
    const next = taskIdx + 1;
    if (next >= total) {
      setSimTaskIdx(total);
      setPhase('finished');
    } else {
      setSimTaskIdx(next);
      setTaskIdx(next);
      setPhase('preparing');
    }
  };

  // ── YEAR SELECT ──────────────────────────────────────────────────────────
  if (phase === 'year-select') {
    return (
      <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 rounded-lg border border-cyber-border text-cyber-muted hover:text-cyber-text transition-all">
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">B2 · Spreken</p>
            <h2 className="text-sm font-bold text-cyber-text">
              {lang === 'tr' ? 'Sınav Seç' : 'Choose Exam'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {YEAR_OPTIONS.map((opt) => (
            <button
              key={String(opt.key)}
              onClick={() => handleYearSelect(opt)}
              className="
                bg-cyber-card border border-cyber-border rounded-xl p-4
                text-left hover:border-cyber-yellow/60 transition-all active:scale-[0.98]
                flex flex-col gap-1.5
              "
            >
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-cyber-muted shrink-0" />
                <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-wider">
                  {opt.key === 'practice'
                    ? (lang === 'tr' ? 'Alıştırma' : 'Practice')
                    : 'Staatsexamen'}
                </span>
              </div>
              <p className="font-mono text-xl font-black text-cyber-text">{opt.label}</p>
              <p className="font-mono text-[9px] text-cyber-muted">
                {opt.tasks.length} {lang === 'tr' ? 'görev' : 'tasks'}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro' && tasks.length > 0) {
    const deelCounts = tasks.reduce<Record<string, number>>((acc, t) => {
      acc[t.deel] = (acc[t.deel] ?? 0) + 1;
      return acc;
    }, {});
    const yearLabel = selectedYear === 'practice'
      ? (lang === 'tr' ? 'Oefening' : 'Practice')
      : String(selectedYear);

    return (
      <IntroScreen
        lang={lang}
        yearLabel={yearLabel}
        tasks={tasks}
        total={total}
        savedTaskIdx={savedTaskIdx}
        deelCounts={deelCounts}
        onBack={() => { setPhase('year-select'); setTasks([]); }}
        onStart={(fromIdx) => { setTaskIdx(fromIdx); setSimTaskIdx(fromIdx); setPhase('preparing'); }}
        onRestart={() => { setSimTaskIdx(0); setTaskIdx(0); setPhase('preparing'); }}
      />
    );
  }

  // ── FINISHED ─────────────────────────────────────────────────────────────
  if (phase === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-24 px-8">
        <CheckCircle2
          size={52}
          className="text-cyber-green"
          style={{ filter: 'drop-shadow(0 0 14px rgb(var(--c-green)))' }}
        />
        <p className="font-mono text-xl font-black text-cyber-green" style={{ textShadow: 'var(--glow-green)' }}>
          {lang === 'tr' ? 'Simülasyon tamamlandı!' : 'Simulation complete!'}
        </p>
        <p className="font-mono text-xs text-cyber-muted text-center max-w-xs">
          {lang === 'tr'
            ? `${total} görevin hepsini tamamladın. Kayıtlarını dinle ve model cevaplarla karşılaştır.`
            : `All ${total} tasks completed. Listen to your recordings and compare with model answers.`}
        </p>
        <button
          onClick={() => { setPhase('year-select'); setTasks([]); }}
          className="font-mono text-sm font-bold text-cyber-blue border border-cyber-blue px-6 py-3 rounded-xl hover:bg-cyber-blue/10 transition-all"
        >
          {lang === 'tr' ? 'Başka Yıl Seç' : 'Choose Another Year'}
        </button>
        <button
          onClick={onClose}
          className="font-mono text-xs text-cyber-muted hover:text-cyber-text transition-all"
        >
          {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
        </button>
      </div>
    );
  }

  // ── ACTIVE TASK ──────────────────────────────────────────────────────────
  if (!task) return null;

  const timerMax   = phase === 'preparing' ? task.prepSeconds : task.speakSeconds;
  const progress   = timerMax > 0 ? timeLeft / timerMax : 1;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const isPrepping  = phase === 'preparing';
  const isRecording = phase === 'recording';
  const ringColor   = isRecording ? '#e8ff47' : isPrepping ? '#4a9eff' : '#2a3a4a';

  const yearLabel = selectedYear === 'practice'
    ? (lang === 'tr' ? 'Oefening' : 'Practice')
    : String(selectedYear);

  return (
    <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { cancelAnimationFrame(rafRef.current); reset(); setPhase('intro'); }}
          className="p-1.5 rounded-lg border border-cyber-border text-cyber-muted hover:text-cyber-text transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
              {yearLabel} · {lang === 'tr' ? `Görev ${taskIdx + 1} / ${total}` : `Task ${taskIdx + 1} / ${total}`}
            </span>
            <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-md border bg-transparent ${DEEL_COLOR[task.deel]}`}>
              {task.deel}
            </span>
          </div>
          <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
            <div
              className="h-full bg-cyber-yellow rounded-full transition-all duration-300"
              style={{ width: `${((taskIdx) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topic */}
      <div>
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mb-0.5">
          {lang === 'tr' ? 'Konu' : 'Topic'}
        </p>
        <h3 className="text-base font-bold text-cyber-text">{task.topic}</h3>
      </div>

      {/* Images / placeholder cards */}
      {(task.imageUrls.length > 0 || task.imageLabels.length > 0) && (
        <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
          {(task.imageLabels.length > 0 ? task.imageLabels : task.imageUrls).map((_, i) => {
            const url = task.imageUrls[i];
            const label = task.imageLabels[i] ?? `Plaatje ${i + 1}`;
            const isPlaceholder = !url || url.includes('picsum.photos');
            return isPlaceholder ? (
              <div
                key={i}
                className="shrink-0 snap-start h-36 w-52 rounded-xl border border-dashed border-cyber-border/60 bg-cyber-card flex flex-col justify-between p-3"
              >
                <span className="font-mono text-[8px] text-cyber-muted uppercase tracking-wider">
                  Plaatje {i + 1}
                </span>
                <p className="text-xs text-cyber-text/80 leading-snug">{label}</p>
                <span className="font-mono text-[7px] text-cyber-muted/40 italic">
                  {lang === 'tr' ? 'resim hazırlanıyor' : 'image pending'}
                </span>
              </div>
            ) : (
              <div key={i} className="relative shrink-0 snap-start">
                <img
                  src={url}
                  alt={label}
                  className="h-36 w-auto rounded-xl border border-cyber-border object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-1 left-1 font-mono text-[8px] bg-cyber-dark/80 text-cyber-muted px-1.5 py-0.5 rounded">
                  P{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      {task.tableData && (
        <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
          <p className="font-mono text-[8px] text-cyber-muted uppercase tracking-widest mb-2">Tabel</p>
          {task.tableData.split('\n').map((row, i) => (
            <p key={i} className="text-sm text-cyber-text leading-relaxed">
              {row}
            </p>
          ))}
        </div>
      )}

      {/* Instruction */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
        <p className="font-mono text-[8px] text-cyber-muted uppercase tracking-widest mb-2">
          {lang === 'tr' ? 'Görev' : 'Task'}
        </p>
        <p className="text-sm text-cyber-text leading-relaxed">{task.instructionNl}</p>
      </div>

      {/* Circular timer */}
      {(isPrepping || isRecording) && (
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center">
            <svg width="108" height="108" viewBox="0 0 108 108" className="-rotate-90" aria-hidden>
              <circle cx="54" cy="54" r="40" fill="none" strokeWidth="6" stroke="rgba(42,58,74,1)" />
              <circle
                cx="54" cy="54" r="40" fill="none" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ stroke: ringColor, transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`font-mono text-3xl font-black ${isRecording ? 'text-cyber-yellow' : 'text-cyber-blue'}`}
                style={{ textShadow: isRecording ? 'var(--glow-yellow)' : 'var(--glow-blue)' }}
              >
                {timeLeft}
              </span>
              <span className={`font-mono text-[8px] uppercase tracking-widest mt-0.5 ${isRecording ? 'text-cyber-yellow/70' : 'text-cyber-blue/70'}`}>
                {isPrepping
                  ? (lang === 'tr' ? 'hazırlık' : 'prepare')
                  : (lang === 'tr' ? 'konuş' : 'speak')}
              </span>
            </div>
          </div>

          {isPrepping && (
            <button
              onClick={async () => {
                cancelAnimationFrame(rafRef.current);
                const ok = await start();
                if (ok) { setTimeLeft(task.speakSeconds); setPhase('recording'); }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyber-yellow/20 transition-all"
            >
              <Mic size={14} />
              {lang === 'tr' ? 'Hemen Başla' : 'Start Now'}
            </button>
          )}

          {isRecording && (
            <button
              onClick={stopEarly}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyber-orange text-cyber-orange bg-cyber-orange/10 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyber-orange/20 transition-all"
            >
              <Square size={14} fill="currentColor" />
              {lang === 'tr' ? 'Durdur' : 'Stop'}
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-cyber-card border border-cyber-orange/50 rounded-xl p-3">
          <AlertCircle size={14} className="text-cyber-orange shrink-0 mt-0.5" />
          <p className="text-xs text-cyber-orange">
            {lang === 'tr' ? 'Mikrofon erişimi reddedildi.' : 'Microphone access denied.'}
          </p>
        </div>
      )}

      {/* Start task button — shown before prep/recording begins */}
      {phase !== 'done' && !isPrepping && !isRecording && (
        <button
          onClick={startTask}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10 font-mono text-sm font-bold uppercase tracking-wider hover:bg-cyber-yellow/20 transition-all"
        >
          <Mic size={16} />
          {lang === 'tr' ? 'Görevi Başlat' : 'Start Task'}
        </button>
      )}

      {/* Done state */}
      {phase === 'done' && (
        <div className="flex flex-col gap-3">
          {audioUrl && (
            <div className="bg-cyber-card border border-cyber-green/30 rounded-xl p-4">
              <p className="font-mono text-[8px] text-cyber-green uppercase tracking-widest mb-2">
                {lang === 'tr' ? 'Kaydın' : 'Your recording'}
              </p>
              <audio src={audioUrl} controls className="w-full" style={{ colorScheme: 'inherit' }} />
            </div>
          )}

          <button
            onClick={() => setShowModel((v) => !v)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-cyber-purple text-cyber-purple bg-cyber-purple/5 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyber-purple/10 transition-all"
          >
            <span>{lang === 'tr' ? 'Model Cevabı' : 'Model Answer'}</span>
            {showModel ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          {showModel && (
            <div className="bg-cyber-card border border-cyber-purple/40 rounded-xl p-4">
              <p className="text-sm text-cyber-text/90 leading-relaxed italic">
                "{task.modelAnswer}"
              </p>
            </div>
          )}

          <button
            onClick={nextTask}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyber-yellow text-cyber-dark font-mono text-sm font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.99]"
          >
            {taskIdx + 1 >= total
              ? (lang === 'tr' ? 'Tamamla' : 'Finish')
              : (lang === 'tr' ? 'Sonraki Görev' : 'Next Task')}
            <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}

// ─── IntroScreen ─────────────────────────────────────────────────────────────

interface IntroProps {
  lang: 'tr' | 'en';
  yearLabel: string;
  tasks: ExamSimTask[];
  total: number;
  savedTaskIdx: number;
  deelCounts: Record<string, number>;
  onBack: () => void;
  onStart: (fromIdx: number) => void;
  onRestart: () => void;
}

function TaskImages({ task, lang }: { task: ExamSimTask; lang: 'tr' | 'en' }) {
  if (task.imageUrls.length === 0 && task.imageLabels.length === 0) return null;
  const count = Math.max(task.imageUrls.length, task.imageLabels.length);
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
      {Array.from({ length: count }).map((_, i) => {
        const url = task.imageUrls[i];
        const label = task.imageLabels[i] ?? `Plaatje ${i + 1}`;
        const isPlaceholder = !url || url.includes('picsum.photos');
        return isPlaceholder ? (
          <div
            key={i}
            className="shrink-0 snap-start h-28 w-44 rounded-xl border border-dashed border-cyber-border/60 bg-cyber-dark flex flex-col justify-between p-2.5"
          >
            <span className="font-mono text-[7px] text-cyber-muted uppercase tracking-wider">
              Plaatje {i + 1}
            </span>
            <p className="text-[10px] text-cyber-text/80 leading-snug">{label}</p>
            <span className="font-mono text-[7px] text-cyber-muted/40 italic">
              {lang === 'tr' ? 'resim bekleniyor' : 'image pending'}
            </span>
          </div>
        ) : (
          <div key={i} className="relative shrink-0 snap-start">
            <img
              src={url}
              alt={label}
              className="h-28 w-auto rounded-xl border border-cyber-border object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-1 left-1 font-mono text-[7px] bg-cyber-dark/80 text-cyber-muted px-1 py-0.5 rounded">
              P{i + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function IntroScreen({
  lang, yearLabel, tasks, total, savedTaskIdx,
  deelCounts, onBack, onStart, onRestart,
}: IntroProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg border border-cyber-border text-cyber-muted hover:text-cyber-text transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
            B2 · Spreken · {yearLabel}
          </p>
          <h2 className="text-sm font-bold text-cyber-text">
            {lang === 'tr' ? 'Sınav Simülasyonu' : 'Exam Simulation'}
          </h2>
        </div>
      </div>

      {/* Deel summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {(['Deel 1', 'Deel 2', 'Deel 3'] as SimDeel[]).map((d) => (
          <div
            key={d}
            className={`bg-cyber-card border rounded-xl p-3 text-center ${DEEL_COLOR[d].split(' ')[0]} ${DEEL_COLOR[d].split(' ')[1]}`}
          >
            <p className={`font-mono text-xs font-bold ${DEEL_COLOR[d].split(' ')[1]}`}>{d}</p>
            <p className="font-mono text-2xl font-black text-cyber-text mt-1">{deelCounts[d] ?? 0}</p>
            <p className="font-mono text-[8px] text-cyber-muted mt-0.5 uppercase tracking-wider">
              {lang === 'tr' ? 'görev' : 'tasks'}
            </p>
          </div>
        ))}
      </div>

      {/* Task list — expandable */}
      <div className="flex flex-col gap-2">
        {tasks.map((t, i) => {
          const isOpen = expandedId === t.id;
          const hasMedia = t.imageUrls.length > 0 || t.imageLabels.length > 0;
          const hasTable = !!t.tableData;
          return (
            <div
              key={t.id}
              className={`bg-cyber-card border rounded-xl overflow-hidden transition-all ${
                isOpen ? 'border-cyber-yellow/50' : 'border-cyber-border'
              }`}
            >
              {/* Card header — always visible, tap to toggle */}
              <button
                onClick={() => toggle(t.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
              >
                <span className="font-mono text-[9px] text-cyber-muted w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-mono text-[9px] uppercase ${DEEL_COLOR[t.deel].split(' ')[1]}`}>
                    {t.deel}
                  </p>
                  <p className="text-sm font-semibold text-cyber-text truncate">{t.topic}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {hasMedia && (
                    <ImageIcon size={11} className="text-cyber-blue/70" />
                  )}
                  {hasTable && (
                    <span className="font-mono text-[8px] text-cyber-purple/70 border border-cyber-purple/30 px-1 rounded">
                      tbl
                    </span>
                  )}
                  {t.prepSeconds > 0 && (
                    <span className="font-mono text-[9px] text-cyber-blue">{t.prepSeconds}s</span>
                  )}
                  <span className="font-mono text-[9px] text-cyber-yellow">{t.speakSeconds}s</span>
                  {isOpen
                    ? <ChevronUp size={13} className="text-cyber-muted ml-1" />
                    : <ChevronDown size={13} className="text-cyber-muted ml-1" />}
                </div>
              </button>

              {/* Expanded detail */}
              {isOpen && (
                <div className="border-t border-cyber-border/40 px-4 pb-4 flex flex-col gap-3">
                  {/* Instruction */}
                  <div className="pt-3">
                    <p className="font-mono text-[8px] text-cyber-muted uppercase tracking-widest mb-1.5">
                      {lang === 'tr' ? 'Görev (Hollandaca)' : 'Task (Dutch)'}
                    </p>
                    <p className="text-sm text-cyber-text leading-relaxed">{t.instructionNl}</p>
                  </div>

                  {/* Images */}
                  <TaskImages task={t} lang={lang} />

                  {/* Table */}
                  {t.tableData && (
                    <div className="bg-cyber-dark border border-cyber-border/40 rounded-xl p-3">
                      <p className="font-mono text-[8px] text-cyber-muted uppercase tracking-widest mb-1.5">
                        Tabel
                      </p>
                      {t.tableData.split('\n').map((row, ri) => (
                        <p key={ri} className="text-xs text-cyber-text leading-relaxed">{row}</p>
                      ))}
                    </div>
                  )}

                  {/* Timing row */}
                  <div className="flex items-center gap-3 pt-1">
                    {t.prepSeconds > 0 && (
                      <span className="font-mono text-[9px] text-cyber-blue border border-cyber-blue/30 bg-cyber-blue/5 px-2 py-1 rounded-lg">
                        {t.prepSeconds}s {lang === 'tr' ? 'hazırlık' : 'prep'}
                      </span>
                    )}
                    <span className="font-mono text-[9px] text-cyber-yellow border border-cyber-yellow/30 bg-cyber-yellow/5 px-2 py-1 rounded-lg">
                      {t.speakSeconds}s {lang === 'tr' ? 'konuşma' : 'speak'}
                    </span>
                  </div>

                  {/* Direct start button */}
                  <button
                    onClick={() => onStart(i)}
                    className="
                      w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                      border border-cyber-yellow bg-cyber-yellow/10 text-cyber-yellow
                      font-mono text-xs font-bold uppercase tracking-wider
                      hover:bg-cyber-yellow/20 transition-all active:scale-[0.99]
                    "
                  >
                    <Play size={13} />
                    {lang === 'tr'
                      ? `${i + 1}. Görevden Başla`
                      : `Start from Task ${i + 1}`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Start / continue buttons */}
      {savedTaskIdx > 0 && savedTaskIdx < total ? (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onStart(savedTaskIdx)}
            className="w-full py-3.5 rounded-xl bg-cyber-yellow text-cyber-dark font-mono text-sm font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.99]"
          >
            {lang === 'tr'
              ? `Kaldığın Yerden Devam Et — Görev ${savedTaskIdx + 1}/${total}`
              : `Continue — Task ${savedTaskIdx + 1}/${total}`}
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl border border-cyber-border text-cyber-muted font-mono text-sm font-bold uppercase tracking-wider hover:border-cyber-muted hover:text-cyber-text transition-all active:scale-[0.99]"
          >
            {lang === 'tr' ? 'Baştan Başlat' : 'Restart'}
          </button>
        </div>
      ) : savedTaskIdx >= total ? (
        <button
          onClick={onRestart}
          className="w-full py-3.5 rounded-xl bg-cyber-green/10 border border-cyber-green text-cyber-green font-mono text-sm font-black uppercase tracking-wider hover:bg-cyber-green/20 transition-all active:scale-[0.99]"
        >
          {lang === 'tr' ? 'Tekrar Başlat ✓ Tamamlandı' : 'Restart ✓ Completed'}
        </button>
      ) : (
        <button
          onClick={() => onStart(0)}
          className="w-full py-3.5 rounded-xl bg-cyber-yellow text-cyber-dark font-mono text-sm font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.99]"
        >
          {lang === 'tr' ? 'Simülasyonu Başlat' : 'Start Simulation'}
        </button>
      )}
    </div>
  );
}
