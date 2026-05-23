import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import type { ProgramDay, Skill } from '../../types';
import { useProgressStore, buildDayId } from '../../store/useProgressStore';
import FlashcardTab from './FlashcardTab';
import ExamTab from './ExamTab';
import VocabDictionary from './VocabDictionary';

type Tab = 'flashcard' | 'exam' | 'dictionary';

interface StudyScreenProps {
  day: ProgramDay;
  skill: Skill;
  onBack: () => void;
}

export default function StudyScreen({ day, skill, onBack }: StudyScreenProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('flashcard');

  const currentLevel = useProgressStore((s) => s.currentLevel);
  const completeDay = useProgressStore((s) => s.completeDay);
  const isDayCompleted = useProgressStore((s) => s.isDayCompleted);

  const dayId = buildDayId(currentLevel, skill, day.dayNumber);
  const isCompleted = isDayCompleted(dayId);

  const lang = i18n.language as 'tr' | 'en';
  const title = day.titleTranslations[lang] ?? day.titleTranslations['en'] ?? '';

  return (
    <div className="min-h-dvh flex flex-col bg-cyber-dark">

      {/* ── Study header ── */}
      <header className="sticky top-0 z-50 bg-cyber-surface/95 backdrop-blur border-b border-cyber-border">
        <div className="flex items-center gap-3 max-w-lg mx-auto px-4 py-3">
          <button
            onClick={onBack}
            aria-label={t('common.back')}
            className="
              p-1.5 rounded-lg border border-cyber-border
              text-cyber-muted hover:text-cyber-text hover:border-cyber-muted
              transition-all active:scale-90
            "
          >
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
              {t('common.day')} {day.dayNumber}
              {isCompleted && (
                <span className="ml-2 text-cyber-green">✓</span>
              )}
            </p>
            <h2 className="text-sm font-bold text-cyber-text leading-snug truncate">
              {title}
            </h2>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex max-w-lg mx-auto px-4 border-t border-cyber-border/40">
          {(['flashcard', 'exam', 'dictionary'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-1 py-2.5 font-mono text-xs font-bold uppercase tracking-wider
                border-b-2 transition-all duration-200
                ${activeTab === tab
                  ? 'border-cyber-yellow text-cyber-yellow'
                  : 'border-transparent text-cyber-muted hover:text-cyber-text'
                }
              `}
            >
              {t(`study.tabs.${tab}`)}
            </button>
          ))}
        </div>
      </header>

      {/* ── Tab content ── */}
      <main className="flex-1 overflow-y-auto pb-8">
        {activeTab === 'flashcard' && <FlashcardTab day={day} />}
        {activeTab === 'exam' && (
          <ExamTab
            day={day}
            isCompleted={isCompleted}
            onComplete={() => completeDay(dayId)}
          />
        )}
        {activeTab === 'dictionary' && <VocabDictionary />}
      </main>

    </div>
  );
}
