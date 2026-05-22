import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import type { ProgramDay } from '../../types';
import FlashcardTab from './FlashcardTab';
import ExamTab from './ExamTab';

type Tab = 'flashcard' | 'exam';

interface StudyScreenProps {
  day: ProgramDay;
  onBack: () => void;
}

export default function StudyScreen({ day, onBack }: StudyScreenProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('flashcard');

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
            </p>
            <h2 className="text-sm font-bold text-cyber-text leading-snug truncate">
              {title}
            </h2>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex max-w-lg mx-auto px-4 border-t border-cyber-border/40">
          {(['flashcard', 'exam'] as Tab[]).map((tab) => (
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
              {tab === 'flashcard' ? t('study.tabs.flashcard') : t('study.tabs.exam')}
            </button>
          ))}
        </div>
      </header>

      {/* ── Tab content ── */}
      <main className="flex-1 overflow-y-auto pb-8">
        {activeTab === 'flashcard'
          ? <FlashcardTab day={day} />
          : <ExamTab day={day} />
        }
      </main>

    </div>
  );
}
