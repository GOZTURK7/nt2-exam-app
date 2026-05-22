import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../../store/useProgressStore';
import type { Level } from '../../types';

export default function AppBar() {
  const { t, i18n } = useTranslation();
  const { currentLevel, setLevel } = useProgressStore();

  const toggleLevel = () =>
    setLevel(currentLevel === 'B1' ? 'B2' : ('B1' as Level));

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');

  const isB2 = currentLevel === 'B2';

  return (
    <header className="sticky top-0 z-50 bg-cyber-surface/95 backdrop-blur border-b border-cyber-border">
      <div className="flex items-center justify-between max-w-lg mx-auto px-4 py-3">
        {/* Logo */}
        <div>
          <p className="font-mono text-[9px] text-cyber-muted tracking-[0.22em] uppercase">
            {t('appbar.brand')}
          </p>
          <h1 className="text-sm font-bold text-cyber-text leading-none mt-0.5">
            {t('appbar.title')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Level Toggle — shows code only (B1/B2), not localised */}
          <button
            onClick={toggleLevel}
            aria-label={t('level.switchLabel')}
            className={`
              px-3 py-1.5 rounded-lg border font-mono text-xs font-bold
              tracking-wider transition-all duration-200 active:scale-95
              ${
                isB2
                  ? 'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/10 shadow-neon-yellow'
                  : 'border-cyber-blue text-cyber-blue bg-cyber-blue/10 shadow-neon-blue'
              }
            `}
          >
            {currentLevel}
          </button>

          {/* Language Toggle — shows ISO code, not localised by design */}
          <button
            onClick={toggleLang}
            aria-label={i18n.language === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
            className="
              px-3 py-1.5 rounded-lg border border-cyber-border
              text-cyber-muted hover:border-cyber-yellow hover:text-cyber-yellow
              font-mono text-xs font-bold tracking-wider
              transition-all duration-200 active:scale-95
            "
          >
            {i18n.language === 'tr' ? 'TR' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
}
