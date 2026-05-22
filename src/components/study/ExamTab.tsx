import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Square, Trash2, AlertCircle } from 'lucide-react';
import type { ProgramDay } from '../../types';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';

interface ExamTabProps {
  day: ProgramDay;
}

type SimState = 'ready' | 'recording' | 'done';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ExamTab({ day }: ExamTabProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const duration = day.examTask.durationSeconds ?? 20;
  const instruction =
    day.examTask.instructionTranslations[lang] ??
    day.examTask.instructionTranslations['en'] ??
    '';

  const [simState, setSimState] = useState<SimState>('ready');
  const [timeLeft, setTimeLeft] = useState(duration);

  const { audioUrl, error, start, stop, reset } = useAudioRecorder();

  /* countdown — only runs while recording */
  useEffect(() => {
    if (simState !== 'recording') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stop();
          setSimState('done');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [simState, stop]);

  const handleStart = async () => {
    reset();
    setTimeLeft(duration);
    const ok = await start();
    if (ok) setSimState('recording');
  };

  const handleStopEarly = () => {
    stop();
    setSimState('done');
  };

  const handleReset = () => {
    reset();
    setTimeLeft(duration);
    setSimState('ready');
  };

  /* ring progress: 1 = full, 0 = empty */
  const progress = timeLeft / duration;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const ringColor =
    simState === 'recording'
      ? '#e8ff47'
      : simState === 'done'
      ? '#47ffb4'
      : '#47b4ff';

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col items-center gap-6">

      {/* Instruction card */}
      <div className="w-full bg-cyber-card border border-cyber-border rounded-2xl p-4">
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mb-2">
          {t('spreken.examTask')}
        </p>
        <p className="text-sm text-cyber-text leading-relaxed">{instruction}</p>
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
          {/* Track */}
          <circle
            cx="74" cy="74" r={RADIUS}
            fill="none" stroke="#2a2a38" strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="74" cy="74" r={RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{
              transition: simState === 'recording'
                ? 'stroke-dashoffset 1s linear, stroke 0.4s ease'
                : 'stroke 0.4s ease',
            }}
          />
        </svg>

        {/* Center overlay (counter-rotates the text) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {simState === 'ready' && (
            <>
              <span className="font-mono text-3xl font-black text-cyber-muted">{duration}</span>
              <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest mt-1">sec</span>
            </>
          )}
          {simState === 'recording' && (
            <>
              <span
                className="font-mono text-4xl font-black text-cyber-yellow"
                style={{ textShadow: '0 0 18px rgba(232,255,71,0.55)' }}
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
              style={{ textShadow: '0 0 12px rgba(71,255,180,0.4)' }}
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

      {/* Controls */}
      {simState === 'ready' && (
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
          {audioUrl ? (
            <div className="bg-cyber-card border border-cyber-green/30 rounded-2xl p-4">
              <p className="font-mono text-[9px] text-cyber-green uppercase tracking-widest mb-3">
                {t('spreken.recording.saved')}
              </p>
              <audio
                src={audioUrl}
                controls
                className="w-full"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          ) : (
            <div className="bg-cyber-card border border-cyber-border rounded-2xl p-4 text-center">
              <p className="font-mono text-xs text-cyber-muted">{t('common.loading')}</p>
            </div>
          )}

          {/* Action row */}
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
              onClick={handleReset}
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
        </div>
      )}

    </div>
  );
}
