export type Level = 'B1' | 'B2';
export type Skill = 'spreken' | 'schrijven' | 'lezen' | 'luisteren';
export type SupportedLanguage = 'tr' | 'en' | string;

export interface Word {
  id: string;
  nl: string;
  translations: Record<SupportedLanguage, string>;
  context: string;
  examples?: string[];
  category: string;
  isConcreteWord: boolean;
}

export interface Phrase {
  id: string;
  nl: string;
  translations: Record<SupportedLanguage, string>;
}

export interface ExamTask {
  id: string;
  type: 'audio' | 'text' | 'multiple-choice';
  instructionTranslations: Record<SupportedLanguage, string>;
  durationSeconds?: number;
  prepSeconds?: number;
  maxWords?: number;
  imageUrls?: string[];
}

export interface ProgramDay {
  dayNumber: number;
  titleTranslations: Record<SupportedLanguage, string>;
  examType: string;
  vocabulary: Word[];
  functionalPhrases: Phrase[];
  examTask: ExamTask;
}

export interface ReadingQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'open';
  options?: string[];
  answer: string;
}

export interface ReadingText {
  id: string;
  year: number;
  title: string;
  text: string;
  level: Level;
  theme: string;
  questions?: ReadingQuestion[];
}

export interface SkillContent {
  words: Word[];
  phrases: Phrase[];
  texts?: ReadingText[];
}

export interface ExamContent {
  version: string;
  B1: Record<Skill, SkillContent>;
  B2: Record<Skill, SkillContent>;
}

export interface SRSCard {
  wordId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReviewMs: number;
  lastRating: 0 | 1 | 2 | 3 | 4;
  phase: 'new' | 'learning' | 'review';
}

export interface ExamSchedule {
  skill: Skill;
  examDate: string;        // "YYYY-MM-DD"
  dailyStudyHours: number;
}

export interface UserProgress {
  userId: string;
  currentLevel: Level;
  contentVersion: string;
  completedDays: string[];
  srsCards: SRSCard[];
  savedRecordings: {
    taskId: string;
    audioKey: string;
    timestamp: number;
  }[];
  examSchedules: ExamSchedule[];
}
