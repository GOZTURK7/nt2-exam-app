import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Mic, Square, ChevronRight, CheckCircle2,
  AlertCircle, Eye, EyeOff,
} from 'lucide-react';
import { b2SprekenSim } from '../../data/b2-spreken-sim';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { useProgressStore } from '../../store/useProgressStore';
import type { SimDeel } from '../../types';

interface Props {
  onClose: () => void;
}

type Phase = 'intro' | 'preparing' | 'recording' | 'done' | 'finished';

const DEEL_COLOR: Record<SimDeel, string> = {
  'Deel 1': 'border-cyber-blue   text-cyber-blue',
  'Deel 2': 'border-cyber-yellow text-cyber-yellow',
  'Deel 3': 'border-cyber-purple text-cyber-purple',
};

const CIRCUMFERENCE = 2 * Math.PI * 40;

export default function ExamSimulation({ onClose }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const savedTaskIdx  = useProgressStore((s) => s.simTaskIdx);
  const setSimTaskIdx = useProgressStore((s) => s.setSimTaskIdx);

  const tasks = b2SprekenSim;
  const total  = tasks.length;

  const [taskIdx,    setTaskIdx]    = useState(0);
  const [phase,      setPhase]      = useState<Phase>('intro');
  const [timeLeft,   setTimeLeft]   = useState(0);
  const [showModel,  setShowModel]  = useState(false);

  const rafRef       = useRef<number>(0);
  const startRef     = useRef<number>(0);

  const { audioUrl, error, start, stop, reset, cleanup } = useAudioRecorder();
  const startFnRef = useRef(start);
  useEffect(() => { startFnRef.current = start; }, [start]);
  useEffect(() => () => cleanup(), [cleanup]);

  const task = tasks[taskIdx];

  // ── Prep countdown ───────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'preparing') return;
    setTimeLeft(task.prepSeconds);
    startRef.current = performance.now();

    const tick = () => {
      const elapsed  = performance.now() - startRef.current;
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
    if (phase !== 'recording') return;
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

  const timerMax     = phase === 'preparing' ? task.prepSeconds : task.speakSeconds;
  const progress     = timerMax > 0 ? timeLeft / timerMax : 1;
  const dashOffset   = CIRCUMFERENCE * (1 - progress);
  const isPrepping   = phase === 'preparing';
  const isRecording  = phase === 'recording';
  const ringColor    = isRecording ? '#e8ff47' : isPrepping ? '#4a9eff' : '#2a3a4a';

  // ── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const deelCounts = tasks.reduce<Record<string, number>>((acc, t) => {
      acc[t.deel] = (acc[t.deel] ?? 0) + 1;
      return acc;
    }, {});

    return (
      <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 rounded-lg border border-cyber-border text-cyber-muted hover:text-cyber-text transition-all">
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">B2 · Spreken</p>
            <h2 className="text-sm font-bold text-cyber-text">
              {lang === 'tr' ? 'Sınav Simülasyonu' : 'Exam Simulation'}
            </h2>
          </div>
        </div>

        {/* Deel cards */}
        <div className="grid grid-cols-3 gap-3">
          {(['Deel 1', 'Deel 2', 'Deel 3'] as SimDeel[]).map((d) => (
            <div key={d} className={`bg-cyber-card border rounded-xl p-3 text-center ${DEEL_COLOR[d].split(' ')[0]} ${DEEL_COLOR[d].split(' ')[1]}`}>
              <p className={`font-mono text-xs font-bold ${DEEL_COLOR[d].split(' ')[1]}`}>{d}</p>
              <p className="font-mono text-2xl font-black text-cyber-text mt-1">{deelCounts[d] ?? 0}</p>
              <p className="font-mono text-[8px] text-cyber-muted mt-0.5 uppercase tracking-wider">
                {lang === 'tr' ? 'görev' : 'tasks'}
              </p>
            </div>
          ))}
        </div>

        {/* Task list */}
        <div className="flex flex-col gap-2">
          {tasks.map((t, i) => (
            <div key={t.id} className="bg-cyber-card border border-cyber-border rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="font-mono text-[9px] text-cyber-muted w-4 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[9px] text-cyber-muted uppercase">{t.deel}</p>
                <p className="text-sm font-semibold text-cyber-text truncate">{t.topic}</p>
              </div>
              <div className="flex items-center gap-2 text-cyber-muted shrink-0">
                {t.prepSeconds > 0 && (
                  <span className="font-mono text-[9px] text-cyber-blue">{t.prepSeconds}s prep</span>
                )}
                <span className="font-mono text-[9px] text-cyber-yellow">{t.speakSeconds}s</span>
              </div>
            </div>
          ))}
        </div>

        {savedTaskIdx > 0 && savedTaskIdx < total ? (
          /* ── Mid-sim: offer continue or restart ── */
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setTaskIdx(savedTaskIdx); setPhase('preparing'); }}
              className="w-full py-3.5 rounded-xl bg-cyber-yellow text-cyber-dark font-mono text-sm font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.99]"
            >
              {lang === 'tr'
                ? `Kaldığın Yerden Devam Et — Görev ${savedTaskIdx + 1}/${total}`
                : `Continue — Task ${savedTaskIdx + 1}/${total}`}
            </button>
            <button
              onClick={() => { setSimTaskIdx(0); setTaskIdx(0); setPhase('preparing'); }}
              className="w-full py-3 rounded-xl border border-cyber-border text-cyber-muted font-mono text-sm font-bold uppercase tracking-wider hover:border-cyber-muted hover:text-cyber-text transition-all active:scale-[0.99]"
            >
              {lang === 'tr' ? 'Yeniden Başlat' : 'Restart'}
            </button>
          </div>
        ) : savedTaskIdx >= total ? (
          /* ── Already finished: restart option ── */
          <button
            onClick={() => { setSimTaskIdx(0); setTaskIdx(0); setPhase('preparing'); }}
            className="w-full py-3.5 rounded-xl bg-cyber-green/10 border border-cyber-green text-cyber-green font-mono text-sm font-black uppercase tracking-wider hover:bg-cyber-green/20 transition-all active:scale-[0.99]"
          >
            {lang === 'tr' ? 'Tekrar Başlat ✓ Tamamlandı' : 'Restart ✓ Completed'}
          </button>
        ) : (
          /* ── Fresh start ── */
          <button
            onClick={() => { setTaskIdx(0); setPhase('preparing'); }}
            className="w-full py-3.5 rounded-xl bg-cyber-yellow text-cyber-dark font-mono text-sm font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.99]"
          >
            {lang === 'tr' ? 'Simülasyonu Başlat' : 'Start Simulation'}
          </button>
        )}
      </div>
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
          onClick={onClose}
          className="font-mono text-sm font-bold text-cyber-blue border border-cyber-blue px-6 py-3 rounded-xl hover:bg-cyber-blue/10 transition-all"
        >
          {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
        </button>
      </div>
    );
  }

  // ── ACTIVE TASK ──────────────────────────────────────────────────────────
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
              {lang === 'tr' ? `Görev ${taskIdx + 1} / ${total}` : `Task ${taskIdx + 1} / ${total}`}
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

      {/* Images */}
      {task.imageUrls.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
          {task.imageUrls.map((url, i) => (
            <div key={i} className="relative shrink-0 snap-start">
              <img
                src={url}
                alt={task.imageLabels[i] ?? `Plaatje ${i + 1}`}
                className="h-36 w-auto rounded-xl border border-cyber-border object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-1 left-1 font-mono text-[8px] bg-cyber-dark/80 text-cyber-muted px-1.5 py-0.5 rounded">
                {`P${i + 1}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Image labels (accessibility / placeholder hint) */}
      {task.imageLabels.length > 0 && (
        <div className="flex flex-col gap-1">
          {task.imageLabels.map((lbl, i) => (
            <p key={i} className="font-mono text-[8px] text-cyber-muted/50 italic">{lbl}</p>
          ))}
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

      {/* Start button (task view before prep) */}
      {phase === 'done' && (
        <div className="flex flex-col gap-3">
          {/* Audio */}
          {audioUrl && (
            <div className="bg-cyber-card border border-cyber-green/30 rounded-xl p-4">
              <p className="font-mono text-[8px] text-cyber-green uppercase tracking-widest mb-2">
                {lang === 'tr' ? 'Kaydın' : 'Your recording'}
              </p>
              <audio src={audioUrl} controls className="w-full" style={{ colorScheme: 'inherit' }} />
            </div>
          )}

          {/* Model answer reveal */}
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

          {/* Next */}
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

      {/* Start task button — shown at intro landing before first prep */}
      {phase !== 'done' && !isPrepping && !isRecording && (
        <button
          onClick={startTask}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10 font-mono text-sm font-bold uppercase tracking-wider hover:bg-cyber-yellow/20 transition-all"
        >
          <Mic size={16} />
          {lang === 'tr' ? 'Görevi Başlat' : 'Start Task'}
        </button>
      )}

    </div>
  );
}
