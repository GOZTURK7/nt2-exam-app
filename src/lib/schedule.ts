import type { Word, Phrase, ProgramDay, ExamSchedule, Skill } from '../types';
import { categoryLabel } from './categoryLabel';

const WORDS_PER_HOUR = 8;
const MIN_WORDS = 5;
const MAX_WORDS = 30;

// ── Deel classification ───────────────────────────────────────────────────────
// Deel 1: kort monoloog, situatie beschrijven, instructie geven, klacht melden
const DEEL1_CATS = new Set([
  'sabah ruti̇ni̇', 'gi̇ysi̇ eylemleri̇', 'ev i̇şleri̇', 'elektroni̇k',
  'telefoon kaliplari', 'telefon açma / kapama', 'kantoor / werk',
  'bezorgdienst / pakket', 'klantenservice / wachttijden [2025]',
  'brandveiligheid [2025]', 'siralamali eylemler',
  'zi̇ekenhui̇s / tali̇mat', 'arbo / nek & rug [2025]',
  'kelime atlatma (stres strateji̇si̇)',
  'şi̇kayet di̇li̇ (yeni̇)', 'konut problemleri̇', 'buurt & gemeente',
]);

// Deel 2: plaatjes beschrijven (1-3 afbeeldingen)
const DEEL2_CATS = new Set([
  'gi̇ysi̇ parçalari', 'aksesuar', 'vücut parçalari', 'blessure',
  'zi̇ekenhui̇s', 'hareket fi̇i̇lleri̇', 'ulaşim araçlari',
  'trendeki̇ detaylar', 'ki̇nderen & vri̇je ti̇jd [2025 deel 3]',
  'gönüllüleri̇ çalişma',
]);

// Everything else → Deel 3: mening geven, vergelijken, discussie

type DeelType = 1 | 2 | 3;

interface TaskTemplate {
  deel: DeelType;
  deelLabel: string;
  prepSeconds: number;
  speakSeconds: number;
  nl: string;
  tr: string;
  en: string;
}

const DEEL1: TaskTemplate[] = [
  {
    deel: 1, deelLabel: 'Deel 1 – Situatie beschrijven',
    prepSeconds: 5, speakSeconds: 20,
    nl: 'U hebt onlangs iets meegemaakt. Bel een vriend(in) en leg in het kort uit wat er is gebeurd.',
    tr: 'Yakın zamanda bir şey yaşadınız. Bir arkadaşınızı arayın ve kısaca ne olduğunu anlatın.',
    en: 'You recently experienced something. Call a friend and briefly explain what happened.',
  },
  {
    deel: 1, deelLabel: 'Deel 1 – Instructie geven',
    prepSeconds: 5, speakSeconds: 20,
    nl: 'U moet een collega uitleggen hoe een taak stap voor stap uitgevoerd moet worden. Geef de instructies zo duidelijk mogelijk.',
    tr: 'Bir meslektaşınıza bir görevi adım adım nasıl yapacağını açıklamanız gerekiyor. Talimatları olabildiğince net verin.',
    en: 'You need to explain to a colleague how to perform a task step by step. Give the instructions as clearly as possible.',
  },
  {
    deel: 1, deelLabel: 'Deel 1 – Klacht melden',
    prepSeconds: 5, speakSeconds: 20,
    nl: 'U hebt een probleem en belt de klantenservice of een instantie. Leg het probleem uit en zeg wat u verwacht.',
    tr: 'Bir sorununuz var ve müşteri hizmetlerini ya da bir kurumu arıyorsunuz. Sorunu açıklayın ve ne beklediğinizi söyleyin.',
    en: 'You have a problem and are calling customer service or an organization. Explain the problem and say what you expect.',
  },
  {
    deel: 1, deelLabel: 'Deel 1 – Nieuws vertellen',
    prepSeconds: 5, speakSeconds: 20,
    nl: 'U belt een collega of vriend(in) om nieuws te vertellen. Beschrijf de situatie en geef relevante details.',
    tr: 'Bir haber vermek için bir meslektaşınızı ya da arkadaşınızı arıyorsunuz. Durumu açıklayın ve ilgili ayrıntıları verin.',
    en: 'You call a colleague or friend to share some news. Describe the situation and give relevant details.',
  },
];

const DEEL2: TaskTemplate[] = [
  {
    deel: 2, deelLabel: 'Deel 2 – Plaatjes beschrijven',
    prepSeconds: 5, speakSeconds: 40,
    nl: 'Kijk naar de plaatjes. Beschrijf zo nauwkeurig mogelijk wat u ziet. Wat doen de mensen? Wat staat er op de achtergrond?',
    tr: 'Resimlere bakın. Gördüklerinizi mümkün olduğunca ayrıntılı açıklayın. İnsanlar ne yapıyor? Arka planda ne var?',
    en: 'Look at the pictures. Describe what you see as accurately as possible. What are the people doing? What is in the background?',
  },
  {
    deel: 2, deelLabel: 'Deel 2 – Plaatjes vergelijken',
    prepSeconds: 5, speakSeconds: 40,
    nl: 'U ziet twee afbeeldingen. Beschrijf beide plaatjes en geef aan wat de overeenkomsten en verschillen zijn.',
    tr: 'İki resim görüyorsunuz. Her ikisini de açıklayın ve benzerlikler ile farklılıkları belirtin.',
    en: 'You see two images. Describe both pictures and indicate the similarities and differences.',
  },
  {
    deel: 2, deelLabel: 'Deel 2 – Situatie beschrijven',
    prepSeconds: 5, speakSeconds: 40,
    nl: 'Bekijk de plaatjes goed. Beschrijf de situatie. Vertel ook wat er net voor of net na dit moment kan zijn gebeurd.',
    tr: 'Resimlere dikkatlice bakın. Durumu açıklayın. Bu andan hemen önce veya sonra ne olmuş olabileceğini de anlatın.',
    en: 'Look at the pictures carefully. Describe the situation. Also say what might have happened just before or after this moment.',
  },
];

const DEEL3: TaskTemplate[] = [
  {
    deel: 3, deelLabel: 'Deel 3 – Mening geven',
    prepSeconds: 10, speakSeconds: 60,
    nl: 'Geef uw mening over dit onderwerp. Gebruik minstens twee argumenten. Sluit af met een duidelijke conclusie.',
    tr: 'Bu konu hakkındaki görüşünüzü belirtin. En az iki argüman kullanın. Net bir sonuçla bitirin.',
    en: 'Give your opinion on this topic. Use at least two arguments. End with a clear conclusion.',
  },
  {
    deel: 3, deelLabel: 'Deel 3 – Vergelijken en kiezen',
    prepSeconds: 10, speakSeconds: 60,
    nl: 'Vergelijk de twee opties. Noem de voor- en nadelen van elke optie. Welke optie kiest u en waarom?',
    tr: 'İki seçeneği karşılaştırın. Her seçeneğin avantaj ve dezavantajlarını belirtin. Hangi seçeneği seçersiniz ve neden?',
    en: 'Compare the two options. Mention the advantages and disadvantages of each option. Which option do you choose and why?',
  },
  {
    deel: 3, deelLabel: 'Deel 3 – Oplossing beargumenteren',
    prepSeconds: 10, speakSeconds: 60,
    nl: 'Er zijn twee manieren om dit probleem op te lossen. Bespreek beide oplossingen en geef uw aanbeveling.',
    tr: 'Bu sorunu çözmenin iki yolu var. Her iki çözümü de tartışın ve önerinizi belirtin.',
    en: 'There are two ways to solve this problem. Discuss both solutions and give your recommendation.',
  },
  {
    deel: 3, deelLabel: 'Deel 3 – Overtuigen',
    prepSeconds: 10, speakSeconds: 60,
    nl: 'U moet iemand overtuigen van uw standpunt. Presenteer uw argumenten en kom tot een aanbeveling.',
    tr: 'Birini kendi görüşünüze ikna etmeniz gerekiyor. Argümanlarınızı sunun ve bir öneriyle bitirin.',
    en: 'You need to convince someone of your point of view. Present your arguments and end with a recommendation.',
  },
];

function getDeelType(category: string): DeelType {
  if (DEEL1_CATS.has(category)) return 1;
  if (DEEL2_CATS.has(category)) return 2;
  return 3;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function dominantCategory(words: Word[]): string {
  const counts: Record<string, number> = {};
  for (const w of words) counts[w.category] = (counts[w.category] ?? 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
}

export function computeDays(
  words: Word[],
  phrases: Phrase[],
  skill: Skill,
  schedule?: ExamSchedule,
): ProgramDay[] {
  if (words.length === 0) return [];

  const wordsPerDay = schedule
    ? Math.min(MAX_WORDS, Math.max(MIN_WORDS, Math.round(schedule.dailyStudyHours * WORDS_PER_HOUR)))
    : 15;

  const wordChunks = chunk(words, wordsPerDay);
  const phrasesPerDay = Math.max(3, Math.ceil(phrases.length / wordChunks.length));

  // Track cycling index per deel type so templates rotate across days
  const deelCount: Record<DeelType, number> = { 1: 0, 2: 0, 3: 0 };

  return wordChunks.map((slice, i) => {
    const dayNumber = i + 1;
    const cat = dominantCategory(slice);
    const deelType = getDeelType(cat);

    const templates = deelType === 1 ? DEEL1 : deelType === 2 ? DEEL2 : DEEL3;
    const template = templates[deelCount[deelType] % templates.length];
    deelCount[deelType]++;

    const trLabel = cat ? ` – ${categoryLabel(cat, 'tr')}` : '';
    const enLabel = cat ? ` – ${categoryLabel(cat, 'en')}` : '';

    return {
      dayNumber,
      titleTranslations: {
        tr: `Gün ${dayNumber}${trLabel}`,
        en: `Day ${dayNumber}${enLabel}`,
      },
      examType: template.deelLabel,
      vocabulary: slice,
      functionalPhrases: phrases.slice(i * phrasesPerDay, (i + 1) * phrasesPerDay),
      examTask: {
        id: `task_${skill}_day${dayNumber}`,
        type: 'audio' as const,
        instructionTranslations: { nl: template.nl, tr: template.tr, en: template.en },
        durationSeconds: template.speakSeconds,
        prepSeconds: template.prepSeconds,
        imageUrls: [
          `https://picsum.photos/seed/${skill}${dayNumber}a/600/400`,
          `https://picsum.photos/seed/${skill}${dayNumber}b/600/400`,
          ...(deelType === 2 ? [`https://picsum.photos/seed/${skill}${dayNumber}c/600/400`] : []),
        ],
      },
    };
  });
}
