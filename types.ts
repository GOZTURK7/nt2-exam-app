// Sınav Seviyeleri ve Modüller
export type Level = "B1" | "B2";
export type Skill = "spreken" | "schrijven" | "lezen" | "luisteren";
export type SupportedLanguage = "tr" | "en" | string; // Genişletilebilir dil kodları

// Okunabilir (Read-only) Sınav İçeriği Veri Tipleri
export interface Word {
  id: string;
  nl: string;
  translations: Record<SupportedLanguage, string>; // Çoklu dil desteği (örn: { tr: "fermuar", en: "zipper" })
  context: string;
  category: string;
  isConcreteWord: boolean; // Stres altında unutulan somut kelimeler
}

export interface Phrase {
  id: string;
  nl: string;
  translations: Record<SupportedLanguage, string>;
}

export interface ExamTask {
  id: string;
  type: "audio" | "text" | "multiple-choice";
  instructionTranslations: Record<SupportedLanguage, string>;
  durationSeconds?: number; // Spreken için
  maxWords?: number; // Schrijven için
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

// Yazılabilir (Read/Write) Kullanıcı İlerlemesi Veri Tipleri
export interface UserProgress {
  userId: string;
  currentLevel: Level;
  completedDays: string[]; // Örn: ["B2_spreken_day1"]
  failedWords: string[]; // Hata yapılan kelimelerin ID'leri
  savedRecordings: {
    taskId: string;
    audioBlobUrl: string; // İleride Supabase URL'si olacak
    timestamp: number;
  }[];
}