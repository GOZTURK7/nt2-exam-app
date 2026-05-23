import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { b2SprekenWords } from '../../data/extracted-b2-spreken';
import { categoryLabel } from '../../lib/categoryLabel';

export default function VocabDictionary() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'tr' | 'en';

  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return b2SprekenWords;
    return b2SprekenWords.filter(
      (w) =>
        w.nl.toLowerCase().includes(q) ||
        (w.translations.tr ?? '').toLowerCase().includes(q) ||
        (w.translations.en ?? '').toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q),
    );
  }, [query]);

  // Group by category preserving insertion order
  const groups = useMemo(() => {
    const map = new Map<string, typeof b2SprekenWords>();
    for (const w of filtered) {
      if (!map.has(w.category)) map.set(w.category, []);
      map.get(w.category)!.push(w);
    }
    return map;
  }, [filtered]);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const toggleWord = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };


  return (
    <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9px] text-cyber-muted uppercase tracking-widest">
          {t('flashcard.allWords')} · {filtered.length} {t('dictionary.wordCount')}
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            // Auto-open all categories when searching
            if (e.target.value) {
              setOpenCategories(new Set(Array.from(groups.keys())));
            }
          }}
          placeholder={t('dictionary.search')}
          className="
            w-full pl-9 pr-4 py-2.5 rounded-xl bg-cyber-card border border-cyber-border
            text-sm text-cyber-text placeholder:text-cyber-muted/50
            font-mono focus:outline-none focus:border-cyber-blue transition-colors
          "
        />
      </div>

      {/* No results */}
      {groups.size === 0 && (
        <p className="text-center font-mono text-xs text-cyber-muted py-8">
          {t('dictionary.noResults')}
        </p>
      )}

      {/* Category groups */}
      <div className="flex flex-col gap-2">
        {Array.from(groups.entries()).map(([cat, words]) => {
          const isOpen = openCategories.has(cat) || !!query;
          return (
            <div key={cat} className="bg-cyber-card border border-cyber-border rounded-2xl overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-cyber-surface/60 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[10px] text-cyber-yellow uppercase tracking-wider truncate">
                    {categoryLabel(cat, lang)}
                  </span>
                  <span className="font-mono text-[9px] text-cyber-muted shrink-0">
                    {words.length}
                  </span>
                </div>
                {isOpen
                  ? <ChevronUp size={13} className="text-cyber-muted shrink-0" />
                  : <ChevronDown size={13} className="text-cyber-muted shrink-0" />
                }
              </button>

              {/* Word list */}
              {isOpen && (
                <div className="border-t border-cyber-border/40">
                  {words.map((word, idx) => {
                    const isExpanded = expanded === word.id;
                    return (
                      <div
                        key={word.id}
                        className={idx < words.length - 1 ? 'border-b border-cyber-border/30' : ''}
                      >
                        {/* Word row */}
                        <button
                          onClick={() => toggleWord(word.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-cyber-surface/40 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-bold ${word.isConcreteWord ? 'text-cyber-yellow' : 'text-cyber-text'}`}>
                                {word.nl}
                              </span>
                              {word.isConcreteWord && (
                                <Zap size={9} className="text-cyber-yellow shrink-0" />
                              )}
                            </div>
                            <span className="text-xs text-cyber-blue">
                              {word.translations[lang] ?? word.translations.tr ?? word.translations.en}
                            </span>
                          </div>
                          {isExpanded
                            ? <ChevronUp size={12} className="text-cyber-muted shrink-0" />
                            : <ChevronDown size={12} className="text-cyber-muted shrink-0" />
                          }
                        </button>

                        {/* Expanded examples */}
                        {isExpanded && (
                          <div className="px-4 pb-4 flex flex-col gap-2 bg-cyber-surface/30">
                            <p className="font-mono text-[8px] text-cyber-muted/60 uppercase tracking-widest pt-1">
                              {t('flashcard.examples')}
                            </p>
                            {(word.examples && word.examples.length > 0
                              ? word.examples
                              : word.context ? [word.context] : []
                            ).map((ex, i) => (
                              <p key={i} className="text-sm text-cyber-text/80 italic leading-relaxed border-l-2 border-cyber-blue/30 pl-3">
                                {ex}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
