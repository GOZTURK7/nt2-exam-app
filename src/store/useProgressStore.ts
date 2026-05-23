import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, Level, SRSCard, Skill, ExamSchedule } from '../types';
import { initCard, reviewCard, getDueCards as srsGetDue } from '../lib/srs';

// ── Derived key helpers ───────────────────────────────────────────────────────
// Day IDs follow the pattern: "B2_spreken_day1"
export const buildDayId = (level: Level, skill: string, dayNumber: number) =>
  `${level}_${skill}_day${dayNumber}`;

// ── Store interface ───────────────────────────────────────────────────────────
interface ProgressStore extends UserProgress {
  // Level
  setLevel: (level: Level) => void;

  // Day completion
  completeDay: (dayId: string) => void;
  uncompleteDay: (dayId: string) => void;
  isDayCompleted: (dayId: string) => boolean;

  // SRS (spaced-repetition)
  addToSRS: (wordId: string) => void;
  removeFromSRS: (wordId: string) => void;
  reviewWord: (wordId: string, rating: 1 | 2 | 3 | 4) => void;
  getCard: (wordId: string) => SRSCard | undefined;
  isInSRS: (wordId: string) => boolean;
  getDueCards: () => SRSCard[];

  // Audio recordings
  addRecording: (taskId: string, audioKey: string) => void;
  removeRecording: (taskId: string) => void;
  getRecording: (taskId: string) => string | undefined;

  // Exam schedules
  setExamSchedule: (skill: Skill, examDate: string, dailyStudyHours: number) => void;
  getExamSchedule: (skill: Skill) => ExamSchedule | undefined;

  // Reset
  resetProgress: () => void;
}

// ── Default state ─────────────────────────────────────────────────────────────
const DEFAULT_STATE: UserProgress = {
  userId: 'local-user',
  currentLevel: 'B2',
  contentVersion: '0',
  completedDays: [],
  srsCards: [],
  savedRecordings: [],
  examSchedules: [],
};

// ── Store ─────────────────────────────────────────────────────────────────────
export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      // ── Level ──────────────────────────────────────────────────────────
      setLevel: (level) => set({ currentLevel: level }),

      // ── Day completion ──────────────────────────────────────────────────
      completeDay: (dayId) =>
        set((state) => ({
          completedDays: state.completedDays.includes(dayId)
            ? state.completedDays
            : [...state.completedDays, dayId],
        })),

      uncompleteDay: (dayId) =>
        set((state) => ({
          completedDays: state.completedDays.filter((id) => id !== dayId),
        })),

      isDayCompleted: (dayId) => get().completedDays.includes(dayId),

      // ── SRS (spaced-repetition) ─────────────────────────────────────────
      addToSRS: (wordId) =>
        set((state) => ({
          srsCards: state.srsCards.some((c) => c.wordId === wordId)
            ? state.srsCards
            : [...state.srsCards, initCard(wordId)],
        })),

      removeFromSRS: (wordId) =>
        set((state) => ({
          srsCards: state.srsCards.filter((c) => c.wordId !== wordId),
        })),

      reviewWord: (wordId, rating) =>
        set((state) => {
          const existing = state.srsCards.find((c) => c.wordId === wordId);
          const card = existing ?? initCard(wordId);
          const updated = reviewCard(card, rating);
          return {
            srsCards: existing
              ? state.srsCards.map((c) => (c.wordId === wordId ? updated : c))
              : [...state.srsCards, updated],
          };
        }),

      getCard: (wordId) => get().srsCards.find((c) => c.wordId === wordId),

      isInSRS: (wordId) => get().srsCards.some((c) => c.wordId === wordId),

      getDueCards: () => srsGetDue(get().srsCards),

      // ── Recordings ──────────────────────────────────────────────────────
      addRecording: (taskId, audioKey) =>
        set((state) => ({
          savedRecordings: [
            ...state.savedRecordings.filter((r) => r.taskId !== taskId),
            { taskId, audioKey, timestamp: Date.now() },
          ],
        })),

      removeRecording: (taskId) =>
        set((state) => ({
          savedRecordings: state.savedRecordings.filter((r) => r.taskId !== taskId),
        })),

      getRecording: (taskId) =>
        get().savedRecordings.find((r) => r.taskId === taskId)?.audioKey,

      // ── Exam schedules ───────────────────────────────────────────────────
      setExamSchedule: (skill, examDate, dailyStudyHours) =>
        set((state) => ({
          examSchedules: [
            ...state.examSchedules.filter((s) => s.skill !== skill),
            { skill, examDate, dailyStudyHours },
          ],
        })),

      getExamSchedule: (skill) => get().examSchedules.find((s) => s.skill === skill),

      // ── Reset ────────────────────────────────────────────────────────────
      resetProgress: () => set({ ...DEFAULT_STATE, currentLevel: get().currentLevel }),
    }),
    {
      name: 'nt2-progress',
      version: 4,
      migrate: (persisted: unknown, version: number): UserProgress => {
        const state = persisted as Record<string, unknown>;

        if (version < 3) {
          const failedWords = (state.failedWords as string[] | undefined) ?? [];
          return {
            userId: (state.userId as string | undefined) ?? 'local-user',
            currentLevel: (state.currentLevel as Level | undefined) ?? 'B2',
            contentVersion: '0',
            completedDays: (state.completedDays as string[] | undefined) ?? [],
            srsCards: failedWords.map((id: string) => initCard(id)),
            savedRecordings: [],
            examSchedules: [],
          };
        }

        // v3 → v4: nextReviewDate (string) → nextReviewMs (number), add phase
        const oldCards = (state.srsCards as Array<Record<string, unknown>> | undefined) ?? [];
        const srsCards: SRSCard[] = oldCards.map((c) => {
          const dateStr = c.nextReviewDate as string | undefined;
          const nextReviewMs = dateStr ? new Date(dateStr).getTime() : Date.now();
          const reps = (c.repetitions as number | undefined) ?? 0;
          const interval = (c.interval as number | undefined) ?? 0;
          const phase: SRSCard['phase'] =
            reps === 0 ? 'new' : interval >= 1 ? 'review' : 'learning';
          return {
            wordId: c.wordId as string,
            interval,
            easeFactor: (c.easeFactor as number | undefined) ?? 2.5,
            repetitions: reps,
            nextReviewMs,
            lastRating: Math.min(4, (c.lastRating as number | undefined) ?? 0) as SRSCard['lastRating'],
            phase,
          };
        });

        return {
          userId: (state.userId as string | undefined) ?? 'local-user',
          currentLevel: (state.currentLevel as Level | undefined) ?? 'B2',
          contentVersion: (state.contentVersion as string | undefined) ?? '0',
          completedDays: (state.completedDays as string[] | undefined) ?? [],
          srsCards,
          savedRecordings: (state.savedRecordings as UserProgress['savedRecordings'] | undefined) ?? [],
          examSchedules: (state.examSchedules as ExamSchedule[] | undefined) ?? [],
        };
      },
      partialize: (state) => ({
        userId: state.userId,
        currentLevel: state.currentLevel,
        contentVersion: state.contentVersion,
        completedDays: state.completedDays,
        srsCards: state.srsCards,
        savedRecordings: state.savedRecordings,
        examSchedules: state.examSchedules,
      }),
    }
  )
);
