export type Level = 'B1' | 'B2';
export type Skill = 'spreken' | 'schrijven' | 'lezen' | 'luisteren';
export type SupportedLanguage = 'tr' | 'en' | string;

export interface Word {
  id: string;
  nl: string;
  translations: Record<SupportedLanguage, string>;
  context: string;
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
  maxWords?: number;
}

export interface ProgramDay {
  dayNumber: number;
  titleTranslations: Record<SupportedLanguage, string>;
  examType: string;
  vocabulary: Word[];
  functionalPhrases: Phrase[];
  examTask: ExamTask;
}

export interface ExamContent {
  version: string;
  B1: Record<Skill, ProgramDay[]>;
  B2: Record<Skill, ProgramDay[]>;
}

export interface UserProgress {
  userId: string;
  currentLevel: Level;
  completedDays: string[];
  failedWords: string[];
  savedRecordings: {
    taskId: string;
    audioBlobUrl: string;
    timestamp: number;
  }[];
}
