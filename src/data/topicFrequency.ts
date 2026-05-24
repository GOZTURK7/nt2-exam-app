export type FreqTier = 1 | 2 | 3; // 1=Ara Sıra, 2=Sık, 3=Çok Sık
export type SkillCode = 'sp' | 'lz' | 'sw' | 'ls';

export interface TopicFreq {
  id: string;
  nl: string;
  tr: string;
  en: string;
  tier: FreqTier;
  skills: SkillCode[];
  examplesNl: string;
}

// Source: 2021–2023 DUO public exams (staatsexamensnt2.nl) +
//         CvTE domain descriptions + denieuwenederlanders.nl B2 topic guide.
// Tier 3 = appears in virtually every exam across all skills.
// Tier 2 = appears in most exams; dominant in ≥2 skills.
// Tier 1 = documented but infrequent; confirmed in ≥1 public exam.
export const topicFrequency: TopicFreq[] = [
  {
    id: 'werk',
    nl: 'Werk & Loopbaan',
    tr: 'İş & Kariyer',
    en: 'Work & Career',
    tier: 3,
    skills: ['sp', 'lz', 'sw', 'ls'],
    examplesNl: 'thuiswerken, solliciteren, functioneringsgesprek, werkdruk, loopbaanverandering',
  },
  {
    id: 'onderwijs',
    nl: 'Onderwijs & Studie',
    tr: 'Eğitim & Çalışma',
    en: 'Education & Study',
    tier: 3,
    skills: ['sp', 'lz', 'sw', 'ls'],
    examplesNl: 'studiekeuze, zelfstudie vs. klassikaal, Nederlandstalig hoger onderwijs, bijscholing',
  },
  {
    id: 'gezondheid',
    nl: 'Gezondheid & Zorg',
    tr: 'Sağlık & Bakım',
    en: 'Health & Care',
    tier: 3,
    skills: ['sp', 'lz', 'sw', 'ls'],
    examplesNl: 'preventie, mentale gezondheid, zorgstelselvergelijking, placebo-effect, eigen verantwoordelijkheid',
  },
  {
    id: 'maatschappij',
    nl: 'Maatschappij & Politiek',
    tr: 'Toplum & Siyaset',
    en: 'Society & Politics',
    tier: 2,
    skills: ['lz', 'ls', 'sp', 'sw'],
    examplesNl: 'sociale veiligheid, integratie, democratie, vrijwilligerswerk, ongelijkheid',
  },
  {
    id: 'milieu',
    nl: 'Milieu & Duurzaamheid',
    tr: 'Çevre & Sürdürülebilirlik',
    en: 'Environment & Sustainability',
    tier: 2,
    skills: ['sp', 'lz', 'sw', 'ls'],
    examplesNl: 'klimaatbeleid, bewust consumeren, mobiliteit, individuele vs. collectieve verantwoordelijkheid',
  },
  {
    id: 'media',
    nl: 'Media & Technologie',
    tr: 'Medya & Teknoloji',
    en: 'Media & Technology',
    tier: 2,
    skills: ['sp', 'lz', 'sw', 'ls'],
    examplesNl: 'sociale media, desinformatie, traditionele vs. online media, privacy, AI',
  },
  {
    id: 'wonen',
    nl: 'Wonen & Buurt',
    tr: 'Yaşam & Mahalle',
    en: 'Housing & Neighbourhood',
    tier: 2,
    skills: ['lz', 'ls', 'sw'],
    examplesNl: 'woningtekort, multicultureel samenleven, huurmarkt, buurtinitiatieven',
  },
  {
    id: 'wetenschap',
    nl: 'Wetenschap & Onderzoek',
    tr: 'Bilim & Araştırma',
    en: 'Science & Research',
    tier: 2,
    skills: ['lz', 'ls'],
    examplesNl: 'onderzoeksresultaten interpreteren, statistieken, innovatie, medische studies',
  },
  {
    id: 'sport',
    nl: 'Sport & Topsport',
    tr: 'Spor & Elit Spor',
    en: 'Sport & Elite Sport',
    tier: 1,
    skills: ['lz', 'ls', 'sp'],
    examplesNl: 'topsportbeleid, sport en gezondheid, vrouwen in de sport, dopingbeleid',
  },
  {
    id: 'cultuur',
    nl: 'Cultuur & Vrije Tijd',
    tr: 'Kültür & Boş Zaman',
    en: 'Culture & Leisure',
    tier: 1,
    skills: ['sp', 'lz'],
    examplesNl: 'kunst en samenleving, musea, vrijetijdsbesteding, technologie en ontspanning',
  },
  {
    id: 'verkeer',
    nl: 'Verkeer & Veiligheid',
    tr: 'Trafik & Güvenlik',
    en: 'Traffic & Safety',
    tier: 1,
    skills: ['lz', 'ls'],
    examplesNl: 'verkeersveiligheid, duurzaam transport, openbaar vervoer, fietsbeleid',
  },
];
