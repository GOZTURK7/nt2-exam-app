import type { Word, Phrase, ProgramDay, ExamSchedule, Skill } from '../types';
import { categoryLabel } from './categoryLabel';

const WORDS_PER_HOUR = 8;
const MIN_WORDS = 5;
const MAX_WORDS = 30;

const DEFAULT_INSTRUCTION = {
  tr: 'Resmi tanımlayın veya soruya yanıt verin.',
  en: 'Describe the picture or answer the question.',
};

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

  return wordChunks.map((slice, i) => {
    const dayNumber = i + 1;
    const cat = dominantCategory(slice);
    const trLabel = cat ? ` – ${categoryLabel(cat, 'tr')}` : '';
    const enLabel = cat ? ` – ${categoryLabel(cat, 'en')}` : '';

    return {
      dayNumber,
      titleTranslations: {
        tr: `Gün ${dayNumber}${trLabel}`,
        en: `Day ${dayNumber}${enLabel}`,
      },
      examType: 'Deel 2 – Plaatjes',
      vocabulary: slice,
      functionalPhrases: phrases.slice(i * phrasesPerDay, (i + 1) * phrasesPerDay),
      examTask: {
        id: `task_${skill}_day${dayNumber}`,
        type: 'audio' as const,
        instructionTranslations: DEFAULT_INSTRUCTION,
        durationSeconds: 30,
        prepSeconds: 0,
        imageUrls: [
          `https://picsum.photos/seed/${dayNumber * 3}/600/400`,
          `https://picsum.photos/seed/${dayNumber * 3 + 1}/600/400`,
          `https://picsum.photos/seed/${dayNumber * 3 + 2}/600/400`,
        ],
      },
    };
  });
}
