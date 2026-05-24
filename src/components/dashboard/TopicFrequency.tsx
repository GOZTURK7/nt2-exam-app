import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { topicFrequency } from '../../data/topicFrequency';
import type { FreqTier, SkillCode } from '../../data/topicFrequency';

const TIER_LABEL: Record<FreqTier, { tr: string; en: string; color: string }> = {
  3: { tr: 'Çok Sık', en: 'Very Often', color: 'text-cyber-green' },
  2: { tr: 'Sık',     en: 'Often',      color: 'text-cyber-yellow' },
  1: { tr: 'Ara Sıra',en: 'Sometimes',  color: 'text-cyber-muted' },
};

const SKILL_LABEL: Record<SkillCode, string> = {
  sp: 'Sp', lz: 'Lz', sw: 'Sw', ls: 'Ls',
};
const SKILL_COLOR: Record<SkillCode, string> = {
  sp: 'text-cyber-yellow border-cyber-yellow/50',
  lz: 'text-cyber-green  border-cyber-green/50',
  sw: 'text-cyber-blue   border-cyber-blue/50',
  ls: 'text-cyber-purple border-cyber-purple/50',
};

function Dots({ tier }: { tier: FreqTier }) {
  return (
    <div className="flex gap-0.5 items-center">
      {([1, 2, 3] as FreqTier[]).map((t) => (
        <span
          key={t}
          className={`w-2 h-2 rounded-full border ${
            t <= tier
              ? tier === 3 ? 'bg-cyber-green border-cyber-green'
              : tier === 2 ? 'bg-cyber-yellow border-cyber-yellow'
              : 'bg-cyber-muted border-cyber-muted'
              : 'bg-transparent border-cyber-border'
          }`}
        />
      ))}
    </div>
  );
}

interface Props {
  lang: 'tr' | 'en';
  defaultOpen?: boolean;
}

export default function TopicFrequency({ lang, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-cyber-card border border-cyber-border rounded-xl hover:border-cyber-muted/50 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-cyber-text uppercase tracking-wider">
            {lang === 'tr' ? 'Konu Frekans Analizi' : 'Topic Frequency Analysis'}
          </span>
          <span className="font-mono text-[8px] text-cyber-muted/60 border border-cyber-border rounded px-1 py-0.5 uppercase tracking-wider">
            B2
          </span>
        </div>
        {open
          ? <ChevronUp size={14} className="text-cyber-muted" />
          : <ChevronDown size={14} className="text-cyber-muted" />}
      </button>

      {open && (
        <div className="border border-t-0 border-cyber-border rounded-b-xl overflow-hidden">

          {/* Source note */}
          <div className="flex items-start gap-2 px-4 py-2.5 bg-cyber-card/50 border-b border-cyber-border/40">
            <Info size={11} className="text-cyber-muted/60 shrink-0 mt-0.5" />
            <p className="font-mono text-[8px] text-cyber-muted/60 leading-relaxed">
              {lang === 'tr'
                ? '2021–2023 DUO açık sınavları ve CvTE konu tanımlarına dayalı tahmin. Resmi yüzde verisi yayınlanmamaktadır.'
                : 'Estimate based on 2021–2023 DUO public exams and CvTE domain descriptions. No official frequency statistics are published.'}
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-4 py-2 border-b border-cyber-border/30 bg-cyber-surface/30">
            {([3, 2, 1] as FreqTier[]).map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Dots tier={t} />
                <span className={`font-mono text-[8px] uppercase tracking-wider ${TIER_LABEL[t].color}`}>
                  {lang === 'tr' ? TIER_LABEL[t].tr : TIER_LABEL[t].en}
                </span>
              </div>
            ))}
          </div>

          {/* Topic rows */}
          <div className="divide-y divide-cyber-border/30">
            {topicFrequency.map((topic) => (
              <div key={topic.id}>
                <button
                  onClick={() => setExpanded(expanded === topic.id ? null : topic.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyber-card/40 transition-all text-left"
                >
                  <Dots tier={topic.tier} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-cyber-text leading-snug">
                      {topic.nl}
                    </p>
                    <p className="font-mono text-[9px] text-cyber-muted mt-0.5">
                      {lang === 'tr' ? topic.tr : topic.en}
                    </p>
                  </div>

                  {/* Skill badges */}
                  <div className="flex gap-1 shrink-0">
                    {(['sp', 'lz', 'sw', 'ls'] as SkillCode[]).map((sk) => (
                      <span
                        key={sk}
                        className={`font-mono text-[7px] font-bold border rounded px-1 py-0.5 uppercase ${
                          topic.skills.includes(sk)
                            ? SKILL_COLOR[sk]
                            : 'text-cyber-border border-cyber-border/20 opacity-30'
                        }`}
                      >
                        {SKILL_LABEL[sk]}
                      </span>
                    ))}
                  </div>
                </button>

                {/* Expanded: example subtopics */}
                {expanded === topic.id && (
                  <div className="px-4 pb-3 -mt-1">
                    <p className="font-mono text-[8px] text-cyber-muted/70 italic leading-relaxed pl-5 border-l border-cyber-border">
                      {topic.examplesNl}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
