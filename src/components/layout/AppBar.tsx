import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { useThemeStore } from '../../store/useThemeStore';
import type { Level } from '../../types';

export default function AppBar() {
  const { t, i18n } = useTranslation();
  const currentLevel = useProgressStore((s) => s.currentLevel);
  const setLevel     = useProgressStore((s) => s.setLevel);
  const isDark       = useThemeStore((s) => s.isDark);
  const toggleTheme  = useThemeStore((s) => s.toggle);

  const toggleLevel = () =>
    setLevel(currentLevel === 'B1' ? 'B2' : ('B1' as Level));

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');

  const isB2 = currentLevel === 'B2';

  return (
    <header className="sticky top-0 z-50 bg-cyber-surface/95 backdrop-blur-md border-b border-cyber-border">
      <div className="flex items-center justify-between max-w-lg mx-auto px-4 py-3">
        {/* Logo */}
        <div>
          <p className="text-[10px] font-medium text-cyber-muted tracking-widest uppercase">
            {t('appbar.brand')}
          </p>
          <h1 className="text-sm font-semibold text-cyber-text leading-tight mt-0.5">
            {t('appbar.title')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Level Toggle */}
          <button
            onClick={toggleLevel}
            aria-label={t('level.switchLabel')}
            className={`
              px-3 py-1.5 rounded-xl border text-xs font-semibold
              transition-all duration-200 active:scale-95
              ${isB2
                ? 'border-cyber-yellow/40 text-cyber-yellow bg-cyber-yellow/8'
                : 'border-cyber-blue/40 text-cyber-blue bg-cyber-blue/8'
              }
            `}
          >
            {currentLevel}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            aria-label={i18n.language === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
            className="
              px-3 py-1.5 rounded-xl border border-cyber-border
              text-cyber-muted hover:text-cyber-text hover:border-cyber-muted/60
              text-xs font-medium
              transition-all duration-200 active:scale-95
            "
          >
            {i18n.language === 'tr' ? 'TR' : 'EN'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="
              p-1.5 rounded-xl border border-cyber-border
              text-cyber-muted hover:text-cyber-text hover:border-cyber-muted/60
              transition-all duration-200 active:scale-95
            "
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </header>
  );
}
