import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import type { ProgramDay } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';
import { categoryLabel } from '../../lib/categoryLabel';
import { previewIntervals } from '../../lib/srs';

interface FlashcardTabProps {
  day: ProgramDay;
}

const RATING_STYLES = [
  null,
  'border-cyber-orange text-cyber-orange bg-cyber-orange/10 hover:bg-cyber-orange/20',
  'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10 hover:bg-cyber-yellow/20',
  'border-cyber-blue   text-cyber-blue   bg-cyber-blue/10   hover:bg-cyber-blue/20',
  'border-cyber-green  text-cyber-green  bg-cyber-green/10  hover:bg-cyber-green/20',
] as const;

const DOT_RATED = [
  '',
  'bg-cyber-orange',
  'bg-cyber-yellow/70',
  'bg-cyber-blue',
  'bg-cyber-green',
] as const;

export default function FlashcardTab({ day }: FlashcardTabProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const reviewWord = useProgressStore((s) => s.reviewWord);
  const getCard    = useProgressStore((s) => s.getCard);
  const srsCards   = useProgressStore((s) => s.srsCards);

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped]     = useState(false);
  const [rated, setRated]         = useState(false);

  const words   = day.vocabulary;
  const phrases = day.functionalPhrases;
  const total   = words.length;
  const word    = words[cardIndex];
  const concrete = word?.isConcreteWord ?? false;

  const card     = word ? getCard(word.id) : undefined;
  const previews = previewIntervals(card);

  const goTo = (idx: number) => {
    setFlipped(false);
    setRated(false);
    setTimeout(() => setCardIndex(Math.max(0, Math.min(idx, total - 1))), flipped ? 200 : 0);
  };

  const handleRate = (rating: 1 | 2 | 3 | 4) => {
    if (rated || !word) return;
    setRated(true);
    reviewWord(word.id, rating);
    setTimeout(() => {
      if (cardIndex < total - 1) {
        goTo(cardIndex + 1);
      } else {
        setFlipped(false);
        setRated(false);
      }
    }, 350);
  };

  if (total === 0) {
    return (
      <div className="flex items-center justify-center min-h-40 text-cyber-muted font-mono text-xs">
        {t('common.empty')}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-6">

      {/* Counter */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-[0.22em]">
          {t('spreken.vocab')} · {cardIndex + 1} {t('flashcard.of')} {total}
        </p>
        {concrete && (
          <span className="inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider text-cyber-yellow bg-cyber-yellow/10 border border-cyber-yellow/40 px-2 py-0.5 rounded-md">
            <Zap size={7} />
            {t('flashcard.concrete')}
          </span>
        )}
      </div>

      {/* Flip card */}
      <div
        style={{ perspective: '1200px' }}
        className="w-full select-none relative"
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            position: 'relative',
            width: '100%',
            minHeight: '260px',
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className={`
              absolute inset-0 rounded-2xl border flex flex-col items-center justify-center gap-4 p-8
              ${concrete
                ? 'bg-cyber-yellow/[0.07] border-cyber-yellow/60'
                : 'bg-cyber-card border-cyber-border'
              }
            `}
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

            {(word.examples && word.examples.length > 0) ? (
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

        {/* Tap zones: left = prev, center = flip, right = next */}
        <div className="absolute inset-0 flex">
          <button
            onClick={() => goTo(cardIndex - 1)}
            disabled={cardIndex === 0}
            aria-label="Previous card"
            className="w-1/4 h-full disabled:cursor-default"
          />
          <button
            onClick={() => setFlipped((f) => !f)}
            aria-label="Flip card"
            className="flex-1 h-full cursor-pointer"
          />
          <button
            onClick={() => goTo(cardIndex + 1)}
            disabled={cardIndex === total - 1}
            aria-label="Next card"
            className="w-1/4 h-full disabled:cursor-default"
          />
        </div>
      </div>

      {/* SRS rating buttons — only when card is flipped */}
      {flipped && (
        <div className="flex gap-2 w-full">
          {([1, 2, 3, 4] as const).map((rating, idx) => {
            const keys = ['again', 'hard', 'good', 'easy'] as const;
            return (
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
                <span>{t(`flashcard.${keys[idx]}`)}</span>
                <span className="text-[9px] opacity-60 mt-0.5">{previews[rating]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => goTo(cardIndex - 1)}
          disabled={cardIndex === 0}
          className="
            flex items-center gap-1 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase
            tracking-wider border border-cyber-border text-cyber-muted
            hover:border-cyber-text hover:text-cyber-text transition-all active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          "
        >
          <ChevronLeft size={14} />
          {t('flashcard.prev')}
        </button>

        {/* Dot indicators — colour reflects last rating */}
        <div className="flex-1 flex items-center justify-center gap-1.5 overflow-hidden">
          {words.map((w, i) => {
            const c = srsCards.find((x) => x.wordId === w.id);
            const lr = c?.lastRating ?? 0;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`
                  rounded-full transition-all shrink-0
                  ${i === cardIndex
                    ? 'w-4 h-2 bg-cyber-yellow'
                    : lr > 0
                      ? `w-2 h-2 ${DOT_RATED[lr]}`
                      : 'w-2 h-2 bg-cyber-border hover:bg-cyber-muted'
                  }
                `}
              />
            );
          })}
        </div>

        <button
          onClick={() => goTo(cardIndex + 1)}
          disabled={cardIndex === total - 1}
          className="
            flex items-center gap-1 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase
            tracking-wider border border-cyber-border text-cyber-muted
            hover:border-cyber-text hover:text-cyber-text transition-all active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          "
        >
          {t('flashcard.next')}
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Phrases section */}
      {phrases.length > 0 && (
        <section className="mt-2">
          <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-[0.22em] mb-3">
            {t('flashcard.phrases')} · {phrases.length}
          </p>
          <div className="flex flex-col gap-3">
            {phrases.map((phrase) => (
              <div
                key={phrase.id}
                className="bg-cyber-card border border-cyber-border rounded-2xl p-4"
              >
                <p className="text-[15px] font-bold text-cyber-text leading-snug mb-2">
                  {phrase.nl}
                </p>
                <p className="text-sm text-cyber-blue leading-relaxed">
                  {phrase.translations[lang] ?? phrase.translations.tr ?? phrase.translations.en}
                </p>
                {phrase.examples && phrase.examples.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1.5 border-t border-cyber-border/40 pt-2">
                    {phrase.examples.map((ex, i) => (
                      <p key={i} className="font-mono text-[10px] text-cyber-muted/80 italic leading-relaxed border-l-2 border-cyber-blue/30 pl-2">
                        {ex}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
