import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { useContentStore } from '../../store/useContentStore';
import { previewIntervals } from '../../lib/srs';
import { categoryLabel } from '../../lib/categoryLabel';
import type { SRSCard, Word } from '../../types';

interface Props {
  onClose: () => void;
}

const RATING_STYLES = [
  null,
  'border-cyber-orange text-cyber-orange bg-cyber-orange/10 hover:bg-cyber-orange/20',
  'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10 hover:bg-cyber-yellow/20',
  'border-cyber-blue   text-cyber-blue   bg-cyber-blue/10   hover:bg-cyber-blue/20',
  'border-cyber-green  text-cyber-green  bg-cyber-green/10  hover:bg-cyber-green/20',
] as const;

const RATING_KEYS = ['again', 'hard', 'good', 'easy'] as const;

export default function ReviewSession({ onClose }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const getDueCards = useProgressStore((s) => s.getDueCards);
  const reviewWord  = useProgressStore((s) => s.reviewWord);
  const getWordById = useContentStore((s) => s.getWordById);

  // Build queue once at session start — filter orphan cards
  type QueueItem = { card: SRSCard; word: Word };
  const initialQueue = useMemo<QueueItem[]>(() => {
    return getDueCards()
      .map((card) => ({ card, word: getWordById(card.wordId) }))
      .filter((item): item is QueueItem => item.word !== undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [queue, setQueue]       = useState(initialQueue);
  const [againMap, setAgainMap] = useState<Map<string, number>>(new Map());
  const [doneCount, setDoneCount] = useState(0);
  const [flipped, setFlipped]   = useState(false);
  const [rated, setRated]       = useState(false);

  const total   = initialQueue.length;
  const current = queue[0];
  const isDone  = queue.length === 0;

  const handleRate = useCallback((rating: 1 | 2 | 3 | 4) => {
    if (rated || !current) return;
    setRated(true);
    reviewWord(current.card.wordId, rating);

    setTimeout(() => {
      if (rating >= 3) {
        // Good / Easy — remove from queue
        setQueue((q) => q.slice(1));
        setDoneCount((n) => n + 1);
      } else {
        // Again / Hard — put at back (max 2 extra times per session)
        const count = (againMap.get(current.card.wordId) ?? 0) + 1;
        setAgainMap((m) => new Map(m).set(current.card.wordId, count));
        if (count >= 2) {
          setQueue((q) => q.slice(1));
          setDoneCount((n) => n + 1);
        } else {
          setQueue((q) => [...q.slice(1), q[0]]);
        }
      }
      setFlipped(false);
      setRated(false);
    }, 350);
  }, [rated, current, reviewWord, againMap]);

  // ── Empty state ──────────────────────────────────────────────────────────
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 px-8">
        <CheckCircle2 size={44} className="text-cyber-green" />
        <p className="font-mono text-sm text-cyber-muted text-center">
          {lang === 'tr' ? 'Tekrar edilecek kart yok.' : 'No cards due for review.'}
        </p>
        <button
          onClick={onClose}
          className="font-mono text-xs text-cyber-blue border border-cyber-blue px-4 py-2 rounded-xl hover:bg-cyber-blue/10 transition-all"
        >
          {t('common.back')}
        </button>
      </div>
    );
  }

  // ── Session complete ─────────────────────────────────────────────────────
  if (isDone) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 px-8">
        <CheckCircle2
          size={44}
          className="text-cyber-green"
          style={{ filter: 'drop-shadow(0 0 12px rgb(var(--c-green)))' }}
        />
        <p
          className="font-mono text-xl font-black text-cyber-green"
          style={{ textShadow: 'var(--glow-green)' }}
        >
          {lang === 'tr' ? 'Oturum tamamlandı!' : 'Session complete!'}
        </p>
        <p className="font-mono text-xs text-cyber-muted">
          {doneCount} {lang === 'tr' ? 'kart incelendi' : 'cards reviewed'}
        </p>
        <button
          onClick={onClose}
          className="font-mono text-xs text-cyber-blue border border-cyber-blue px-5 py-2.5 rounded-xl hover:bg-cyber-blue/10 transition-all"
        >
          {t('common.back')}
        </button>
      </div>
    );
  }

  const { word, card } = current;
  const concrete   = word.isConcreteWord;
  const progressPct = (doneCount / total) * 100;
  const previews   = previewIntervals(card);

  return (
    <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-5">

      {/* Header + progress bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg border border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-muted transition-all active:scale-90"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
              {lang === 'tr' ? 'Tekrar' : 'Review'} · {doneCount + 1} / {total}
            </span>
            <span className="font-mono text-[9px] text-cyber-muted">
              {queue.length} {lang === 'tr' ? 'kaldı' : 'left'}
            </span>
          </div>
          <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
            <div
              className="h-full bg-cyber-green rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phase + concrete badges */}
      <div className="flex items-center gap-2">
        <span className={`font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md border ${
          card.phase === 'new'      ? 'border-cyber-muted  text-cyber-muted'  :
          card.phase === 'learning' ? 'border-cyber-orange text-cyber-orange' :
                                     'border-cyber-green  text-cyber-green'
        }`}>
          {card.phase === 'new'
            ? (lang === 'tr' ? 'Yeni'    : 'New')
            : card.phase === 'learning'
              ? (lang === 'tr' ? 'Öğrenme' : 'Learning')
              : (lang === 'tr' ? 'Tekrar'  : 'Review')}
        </span>
        {concrete && (
          <span className="inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase text-cyber-yellow bg-cyber-yellow/10 border border-cyber-yellow/40 px-2 py-0.5 rounded-md">
            <Zap size={7} />
            {t('flashcard.concrete')}
          </span>
        )}
      </div>

      {/* Flip card */}
      <div
        style={{ perspective: '1200px' }}
        className="w-full cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            position: 'relative',
            width: '100%',
            minHeight: '240px',
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className={`absolute inset-0 rounded-2xl border flex flex-col items-center justify-center gap-4 p-8 ${
              concrete
                ? 'bg-cyber-yellow/[0.07] border-cyber-yellow/60'
                : 'bg-cyber-card border-cyber-border'
            }`}
          >
            <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
              {categoryLabel(word.category, lang)}
            </p>
            <h2
              className={`text-3xl font-black text-center leading-snug ${concrete ? 'text-cyber-yellow' : 'text-cyber-text'}`}
              style={concrete ? { textShadow: '0 0 20px rgba(232,255,71,0.4)' } : {}}
            >
              {word.nl}
            </h2>
            <p className="font-mono text-[10px] text-cyber-muted/60 mt-2">
              {t('flashcard.tapToFlip')}
            </p>
          </div>

          {/* Back */}
          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute inset-0 rounded-2xl border border-cyber-blue/50 bg-cyber-surface flex flex-col p-6 overflow-auto gap-3"
          >
            <div>
              <p className="font-mono text-[8px] text-cyber-muted/60 uppercase tracking-widest mb-1">
                {lang === 'tr' ? 'Türkçe' : 'Meaning'}
              </p>
              <p className="text-xl font-bold text-cyber-blue leading-snug">
                {word.translations[lang] ?? word.translations.tr ?? word.translations.en}
              </p>
            </div>

            {word.examples && word.examples.length > 0 ? (
              <div className="border-t border-cyber-border/40 pt-3 flex flex-col gap-2">
                <p className="font-mono text-[8px] text-cyber-muted/60 uppercase tracking-widest">
                  {t('flashcard.examples')}
                </p>
                {word.examples.map((ex, i) => (
                  <p key={i} className="text-sm text-cyber-text/80 italic leading-relaxed border-l-2 border-cyber-blue/30 pl-3">
                    {ex}
                  </p>
                ))}
              </div>
            ) : word.context ? (
              <div className="border-t border-cyber-border/40 pt-3">
                <p className="font-mono text-[8px] text-cyber-muted/60 uppercase tracking-widest mb-2">
                  {t('flashcard.example')}
                </p>
                <p className="text-sm text-cyber-text/80 italic leading-relaxed border-l-2 border-cyber-blue/30 pl-3">
                  {word.context}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Rating buttons */}
      {flipped && (
        <div className="flex gap-2 w-full">
          {([1, 2, 3, 4] as const).map((rating, idx) => (
            <button
              key={rating}
              onClick={() => handleRate(rating)}
              disabled={rated}
              className={`
                flex-1 flex flex-col items-center py-2.5 rounded-xl border
                font-mono text-xs font-bold uppercase tracking-wider
                transition-all active:scale-95 disabled:opacity-50
                ${RATING_STYLES[rating]}
              `}
            >
              <span>{t(`flashcard.${RATING_KEYS[idx]}`)}</span>
              <span className="text-[9px] opacity-60 mt-0.5">{previews[rating]}</span>
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
