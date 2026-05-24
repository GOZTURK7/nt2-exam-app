import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Square, Trash2, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProgramDay } from '../../types';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { saveAudio, getAudio, deleteAudio } from '../../services/audioService';
import { TOKENS } from '../../lib/tokens';

interface ExamTabProps {
  day: ProgramDay;
  onComplete?: () => void;
  isCompleted?: boolean;
}

type SimState = 'idle' | 'preparing' | 'recording' | 'done';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ExamTab({ day, onComplete, isCompleted }: ExamTabProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const speakDuration = day.examTask.durationSeconds ?? 20;
  const prepDuration = day.examTask.prepSeconds ?? 0;
  const instructionNl = day.examTask.instructionTranslations.nl ?? '';
  const instruction =
    day.examTask.instructionTranslations[lang] ??
    day.examTask.instructionTranslations['en'] ??
    '';

  const [simState, setSimState] = useState<SimState>('idle');
  const [timeLeft, setTimeLeft] = useState(speakDuration);
  const [prepLeft, setPrepLeft] = useState(prepDuration);
  const [idbUrl, setIdbUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [phrasesOpen, setPhrasesOpen] = useState(false);

  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const idbUrlRef = useRef<string | null>(null);

  const { audioUrl, error, start, stop, reset, cleanup } = useAudioRecorder();

  // Keep a stable ref to `start` so prep-phase rAF can call it without stale closure
  const startRef = useRef(start);
  useEffect(() => { startRef.current = start; }, [start]);

  // Load previous recording from IndexedDB on mount
  useEffect(() => {
    getAudio(day.examTask.id).then((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      idbUrlRef.current = url;
      setIdbUrl(url);
      setSimState('done');
    });
    return () => {
      if (idbUrlRef.current) {
        URL.revokeObjectURL(idbUrlRef.current);
        idbUrlRef.current = null;
      }
    };
  }, [day.examTask.id]);

  // Release mic on unmount
  useEffect(() => () => cleanup(), [cleanup]);

  // Preparation-phase countdown (rAF, no drift)
  useEffect(() => {
    if (simState !== 'preparing') return;
    startTimeRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const remaining = Math.max(0, prepDuration - Math.floor(elapsed / 1000));
      setPrepLeft(remaining);
      if (remaining === 0) {
        // Auto-transition to recording
        setTimeLeft(speakDuration);
        startRef.current().then((ok) => {
          setSimState(ok ? 'recording' : 'idle');
        });
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [simState, prepDuration, speakDuration]);

  // Speak-phase countdown (rAF, no drift)
  useEffect(() => {
    if (simState !== 'recording') return;
    startTimeRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const remaining = Math.max(0, speakDuration - Math.floor(elapsed / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        stop();
        setSimState('done');
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [simState, speakDuration, stop]);

  // Persist fresh recording to IndexedDB when done
  useEffect(() => {
    if (simState !== 'done' || !audioUrl) return;
    // Revoke stale IDB URL since we now have a fresh recording
    if (idbUrlRef.current) {
      URL.revokeObjectURL(idbUrlRef.current);
      idbUrlRef.current = null;
      setIdbUrl(null);
    }
    setIsSaving(true);
    fetch(audioUrl)
      .then((r) => r.blob())
      .then((blob) => saveAudio(day.examTask.id, blob))
      .finally(() => setIsSaving(false));
  }, [simState, audioUrl, day.examTask.id]);

  const handleStart = async () => {
    cancelAnimationFrame(rafRef.current);
    reset();
    // Revoke old IDB URL
    if (idbUrlRef.current) {
      URL.revokeObjectURL(idbUrlRef.current);
      idbUrlRef.current = null;
      setIdbUrl(null);
    }
    if (prepDuration > 0) {
      setPrepLeft(prepDuration);
      setSimState('preparing');
    } else {
      setTimeLeft(speakDuration);
      const ok = await start();
      if (ok) setSimState('recording');
    }
  };

  const handleStopEarly = () => {
    cancelAnimationFrame(rafRef.current);
    stop();
    setSimState('done');
  };

  const handleReset = async () => {
    cancelAnimationFrame(rafRef.current);
    reset();
    await deleteAudio(day.examTask.id);
    if (idbUrlRef.current) {
      URL.revokeObjectURL(idbUrlRef.current);
      idbUrlRef.current = null;
    }
    setIdbUrl(null);
    setTimeLeft(speakDuration);
    setPrepLeft(prepDuration);
    setSimState('idle');
  };

  // Derived display values
  const isPrepping = simState === 'preparing';
  const isSpeaking = simState === 'recording';
  const isDone = simState === 'done';

  const timerValue = isPrepping ? prepLeft : timeLeft;
  const timerMax = isPrepping ? prepDuration : speakDuration;
  const progress = timerMax > 0 ? timerValue / timerMax : 1;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const ringColor =
    isSpeaking ? TOKENS.yellow :
    isPrepping  ? TOKENS.blue   :
    isDone      ? TOKENS.green  : TOKENS.border;

  // Show the freshly recorded URL first, then fall back to the IDB-loaded one
  const displayUrl = audioUrl ?? idbUrl;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col items-center gap-6">

      {/* Exam type + duration badge */}
      <div className="w-full flex items-center gap-2">
        <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
          {day.examType}
        </span>
        <div className="flex-1 h-px bg-cyber-border/40" />
        {prepDuration > 0 && (
          <span className="font-mono text-[9px] text-cyber-blue/70 uppercase tracking-widest">
            prep {prepDuration}s
          </span>
        )}
        <span className="font-mono text-[9px] text-cyber-yellow/70 uppercase tracking-widest ml-1">
          speak {speakDuration}s
        </span>
      </div>

      {/* Practice images */}
      {day.examTask.imageUrls && day.examTask.imageUrls.length > 0 && (
        <div className="w-full">
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mb-2">
            {t('exam.practiceImages')}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
            {day.examTask.imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`${i + 1}`}
                className="rounded-xl border border-cyber-border h-44 w-auto object-cover shrink-0 snap-start"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}

      {/* Instruction card */}
      <div className="w-full bg-cyber-card border border-cyber-border rounded-2xl p-4 flex flex-col gap-3">
        <div>
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mb-1.5">
            {t('spreken.examTask')}
          </p>
          {instructionNl && (
            <p className="text-sm font-semibold text-cyber-text leading-relaxed">{instructionNl}</p>
          )}
        </div>
        {instruction && instruction !== instructionNl && (
          <div className="border-t border-cyber-border/40 pt-2.5">
            <p className="font-mono text-[8px] text-cyber-muted/60 uppercase tracking-widest mb-1">
              {lang === 'tr' ? 'Türkçe' : 'Translation'}
            </p>
            <p className="text-xs text-cyber-muted leading-relaxed">{instruction}</p>
          </div>
        )}
      </div>

      {/* Circular timer */}
      <div className="relative flex items-center justify-center">
        <svg
          width="148"
          height="148"
          viewBox="0 0 148 148"
          className="-rotate-90"
          aria-hidden
        >
          <circle cx="74" cy="74" r={RADIUS} fill="none" strokeWidth="8"
            style={{ stroke: TOKENS.border }} />
          <circle
            cx="74" cy="74" r={RADIUS}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{
              stroke: ringColor,
              transition: (isSpeaking || isPrepping)
                ? 'stroke-dashoffset 1s linear, stroke 0.4s ease'
                : 'stroke 0.4s ease',
            }}
          />
        </svg>

        {/* Center text (counter-rotates the SVG rotation) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {simState === 'idle' && (
            <>
              <span className="font-mono text-3xl font-black text-cyber-muted">{speakDuration}</span>
              <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mt-1">sec</span>
            </>
          )}
          {simState === 'preparing' && (
            <>
              <span
                className="font-mono text-4xl font-black text-cyber-blue"
                style={{ textShadow: 'var(--glow-blue)' }}
              >
                {prepLeft}
              </span>
              <span className="font-mono text-[9px] text-cyber-blue/70 uppercase tracking-widest mt-1">
                {t('spreken.timer.prepare')}
              </span>
            </>
          )}
          {simState === 'recording' && (
            <>
              <span
                className="font-mono text-4xl font-black text-cyber-yellow"
                style={{ textShadow: 'var(--glow-yellow)' }}
              >
                {timeLeft}
              </span>
              <span className="font-mono text-[9px] text-cyber-yellow/70 uppercase tracking-widest mt-1">
                {t('spreken.timer.speak')}
              </span>
            </>
          )}
          {simState === 'done' && (
            <span
              className="font-mono text-sm font-black text-cyber-green"
              style={{ textShadow: 'var(--glow-green)' }}
            >
              {t('common.done')}
            </span>
          )}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="w-full flex items-start gap-2 bg-cyber-card border border-cyber-orange/50 rounded-xl p-3">
          <AlertCircle size={15} className="text-cyber-orange shrink-0 mt-0.5" />
          <p className="text-xs text-cyber-orange leading-relaxed">
            {t('errors.audioPermission')}
          </p>
        </div>
      )}

      {/* ── Controls ── */}

      {simState === 'idle' && (
        <button
          onClick={handleStart}
          className="
            flex items-center gap-2 px-7 py-3 rounded-xl
            bg-cyber-yellow/10 border border-cyber-yellow text-cyber-yellow
            font-mono text-sm font-bold uppercase tracking-wider
            hover:bg-cyber-yellow/20 transition-all active:scale-95 shadow-neon-yellow
          "
        >
          <Mic size={18} />
          {t('spreken.recording.record')}
        </button>
      )}

      {simState === 'preparing' && (
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xs text-cyber-blue/70 text-center">
            {t('spreken.timer.ready')}
          </p>
          <button
            onClick={async () => {
              cancelAnimationFrame(rafRef.current);
              setTimeLeft(speakDuration);
              const ok = await start();
              if (ok) setSimState('recording');
            }}
            className="
              flex items-center gap-2 px-7 py-3 rounded-xl
              bg-cyber-yellow/10 border border-cyber-yellow text-cyber-yellow
              font-mono text-sm font-bold uppercase tracking-wider
              hover:bg-cyber-yellow/20 transition-all active:scale-95
            "
          >
            <Mic size={18} />
            {t('spreken.timer.go')}
          </button>
        </div>
      )}

      {simState === 'recording' && (
        <button
          onClick={handleStopEarly}
          className="
            flex items-center gap-2 px-7 py-3 rounded-xl
            bg-cyber-orange/10 border border-cyber-orange text-cyber-orange
            font-mono text-sm font-bold uppercase tracking-wider
            hover:bg-cyber-orange/20 transition-all active:scale-95
          "
        >
          <Square size={18} fill="currentColor" />
          {t('spreken.recording.stop')}
        </button>
      )}

      {simState === 'done' && (
        <div className="w-full flex flex-col gap-3">

          {/* Audio player */}
          {displayUrl ? (
            <div className="bg-cyber-card border border-cyber-green/30 rounded-2xl p-4">
              <p className="font-mono text-[9px] text-cyber-green uppercase tracking-widest mb-3">
                {isSaving ? t('common.loading') : t('spreken.recording.saved')}
              </p>
              <audio
                src={displayUrl}
                controls
                className="w-full"
                style={{ colorScheme: 'inherit' }}
              />
            </div>
          ) : (
            <div className="bg-cyber-card border border-cyber-border rounded-2xl p-4 text-center">
              <p className="font-mono text-xs text-cyber-muted">{t('common.loading')}</p>
            </div>
          )}

          {/* Delete / Re-record row */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="
                flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                border border-cyber-border text-cyber-muted
                font-mono text-xs font-bold uppercase tracking-wider
                hover:border-cyber-muted hover:text-cyber-text transition-all active:scale-95
              "
            >
              <Trash2 size={13} />
              {t('spreken.recording.delete')}
            </button>
            <button
              onClick={handleStart}
              className="
                flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                border border-cyber-blue text-cyber-blue bg-cyber-blue/10
                font-mono text-xs font-bold uppercase tracking-wider
                hover:bg-cyber-blue/20 transition-all active:scale-95
              "
            >
              <Mic size={13} />
              {t('common.retry')}
            </button>
          </div>

          {/* Mark as done */}
          {onComplete && (
            <button
              onClick={() => { if (!isCompleted) onComplete(); }}
              className={`
                w-full flex items-center justify-center gap-2 py-3 rounded-xl
                font-mono text-sm font-bold uppercase tracking-wider transition-all active:scale-95
                ${isCompleted
                  ? 'border border-cyber-green/40 text-cyber-green/50 bg-cyber-green/5 cursor-default'
                  : 'border border-cyber-green text-cyber-green bg-cyber-green/10 hover:bg-cyber-green/20'
                }
              `}
            >
              <CheckCircle2 size={16} />
              {isCompleted
                ? t('spreken.dayCompleted')
                : t('common.markDone')
              }
            </button>
          )}

        </div>
      )}

      {/* Key phrases for this task */}
      {day.functionalPhrases.length > 0 && (
        <div className="w-full">
          <button
            onClick={() => setPhrasesOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-cyber-card border border-cyber-border rounded-xl hover:border-cyber-muted/50 transition-all"
          >
            <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
              {lang === 'tr' ? 'Kullanabileceğiniz kalıplar' : 'Useful phrases'}
              <span className="ml-2 text-cyber-yellow/60">{day.functionalPhrases.length}</span>
            </span>
            {phrasesOpen
              ? <ChevronUp size={13} className="text-cyber-muted" />
              : <ChevronDown size={13} className="text-cyber-muted" />}
          </button>
          {phrasesOpen && (
            <div className="border border-t-0 border-cyber-border rounded-b-xl overflow-hidden divide-y divide-cyber-border/30">
              {day.functionalPhrases.map((p) => (
                <div key={p.id} className="px-4 py-2.5 bg-cyber-card/60">
                  <p className="text-[13px] font-semibold text-cyber-text">{p.nl}</p>
                  <p className="font-mono text-[10px] text-cyber-blue mt-0.5">
                    {p.translations[lang] ?? p.translations.tr ?? p.translations.en ?? ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
