import { useTranslation } from 'react-i18next';
import { Zap, X, Check } from 'lucide-react';
import type { ProgramDay } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';

interface FlashcardTabProps {
  day: ProgramDay;
}

export default function FlashcardTab({ day }: FlashcardTabProps) {
  const { t, i18n } = useTranslation();
  const { toggleFailedWord, isFailedWord } = useProgressStore();

  const lang = i18n.language as 'tr' | 'en';

  return (
    <div className="max-w-lg mx-auto px-4 py-5 space-y-8">

      {/* ── Vocabulary ── */}
      <section>
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-[0.22em] mb-3">
          {t('spreken.vocab')} · {day.vocabulary.length}
        </p>
        <div className="flex flex-col gap-3">
          {day.vocabulary.map((word) => {
            const failed = isFailedWord(word.id);
            const concrete = word.isConcreteWord;

            return (
              <div
                key={word.id}
                className={`
                  rounded-2xl p-4 border transition-all duration-200
                  ${concrete
                    ? 'bg-cyber-yellow/[0.06] border-cyber-yellow/50'
                    : 'bg-cyber-card border-cyber-border'
                  }
                `}
              >
                {/* Top row */}
                <div className="flex items-start gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span
                        className={`text-[15px] font-bold leading-tight ${concrete ? 'text-cyber-yellow' : 'text-cyber-text'}`}
                        style={concrete ? { textShadow: '0 0 12px rgba(232,255,71,0.4)' } : {}}
                      >
                        {word.nl}
                      </span>
                      {concrete && (
                        <span className="inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider text-cyber-yellow bg-cyber-yellow/10 border border-cyber-yellow/40 px-1.5 py-0.5 rounded-md shrink-0">
                          <Zap size={7} />
                          {t('spreken.concrete')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-cyber-blue font-medium">
                      {word.translations[lang] ?? word.translations['en']}
                    </p>
                  </div>

                  {/* Failed toggle */}
                  <button
                    onClick={() => toggleFailedWord(word.id)}
                    aria-label={failed ? t('flashcard.correct') : t('flashcard.wrong')}
                    className={`
                      shrink-0 flex items-center gap-1 font-mono text-[9px] font-bold uppercase
                      tracking-wider px-2 py-1 rounded-lg border transition-all active:scale-90
                      ${failed
                        ? 'border-cyber-orange text-cyber-orange bg-cyber-orange/10'
                        : 'border-cyber-border text-cyber-muted hover:border-cyber-green hover:text-cyber-green'
                      }
                    `}
                  >
                    {failed ? <X size={10} /> : <Check size={10} />}
                  </button>
                </div>

                {/* Context sentence */}
                <div className="border-t border-cyber-border/40 pt-2 mt-1">
                  <p className="font-mono text-[11px] text-cyber-muted italic leading-relaxed">
                    {word.context}
                  </p>
                  <p className="font-mono text-[8px] text-cyber-muted/60 uppercase tracking-widest mt-1.5">
                    {t('flashcard.category')}: {word.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Functional phrases ── */}
      <section>
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-[0.22em] mb-3">
          {t('spreken.phrases')} · {day.functionalPhrases.length}
        </p>
        <div className="flex flex-col gap-3">
          {day.functionalPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="bg-cyber-card border border-cyber-border rounded-2xl p-4"
            >
              <p className="text-sm font-bold text-cyber-text leading-snug mb-1.5">
                {phrase.nl}
              </p>
              <p className="text-sm text-cyber-blue leading-relaxed">
                {phrase.translations[lang] ?? phrase.translations['en']}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
