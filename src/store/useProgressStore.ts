import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, Level } from '../types';

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

  // Failed words (spaced-repetition queue)
  addFailedWord: (wordId: string) => void;
  removeFailedWord: (wordId: string) => void;
  toggleFailedWord: (wordId: string) => void;
  isFailedWord: (wordId: string) => boolean;

  // Audio recordings
  addRecording: (taskId: string, audioBlobUrl: string) => void;
  removeRecording: (taskId: string) => void;
  getRecording: (taskId: string) => string | undefined;

  // Reset
  resetProgress: () => void;
}

// ── Default state ─────────────────────────────────────────────────────────────
const DEFAULT_STATE: UserProgress = {
  userId: 'local-user',
  currentLevel: 'B2',
  completedDays: [],
  failedWords: [],
  savedRecordings: [],
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

      // ── Failed words ────────────────────────────────────────────────────
      addFailedWord: (wordId) =>
        set((state) => ({
          failedWords: state.failedWords.includes(wordId)
            ? state.failedWords
            : [...state.failedWords, wordId],
        })),

      removeFailedWord: (wordId) =>
        set((state) => ({
          failedWords: state.failedWords.filter((id) => id !== wordId),
        })),

      // Convenience: adds if not present, removes if already present
      toggleFailedWord: (wordId) => {
        const { failedWords } = get();
        if (failedWords.includes(wordId)) {
          set({ failedWords: failedWords.filter((id) => id !== wordId) });
        } else {
          set({ failedWords: [...failedWords, wordId] });
        }
      },

      isFailedWord: (wordId) => get().failedWords.includes(wordId),

      // ── Recordings ──────────────────────────────────────────────────────
      addRecording: (taskId, audioBlobUrl) =>
        set((state) => ({
          savedRecordings: [
            ...state.savedRecordings.filter((r) => r.taskId !== taskId),
            { taskId, audioBlobUrl, timestamp: Date.now() },
          ],
        })),

      removeRecording: (taskId) =>
        set((state) => ({
          savedRecordings: state.savedRecordings.filter((r) => r.taskId !== taskId),
        })),

      getRecording: (taskId) =>
        get().savedRecordings.find((r) => r.taskId === taskId)?.audioBlobUrl,

      // ── Reset ────────────────────────────────────────────────────────────
      resetProgress: () => set({ ...DEFAULT_STATE, currentLevel: get().currentLevel }),
    }),
    {
      name: 'nt2-progress',
      // Only persist the UserProgress fields, not the action functions
      partialize: (state) => ({
        userId: state.userId,
        currentLevel: state.currentLevel,
        completedDays: state.completedDays,
        failedWords: state.failedWords,
        savedRecordings: state.savedRecordings,
      }),
    }
  )
);
