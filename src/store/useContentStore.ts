import { create } from 'zustand';
import type { ExamContent, Level, ProgramDay, Skill, ExamSchedule } from '../types';
import { examContent } from '../data/content';
import { computeDays } from '../lib/schedule';

interface ContentStore {
  content: ExamContent;
  getDays: (level: Level, skill: Skill, schedule?: ExamSchedule) => ProgramDay[];
  getDay: (level: Level, skill: Skill, dayNumber: number, schedule?: ExamSchedule) => ProgramDay | undefined;
}

export const useContentStore = create<ContentStore>()((_, get) => ({
  content: examContent,

  getDays: (level, skill, schedule) => {
    const sc = get().content[level][skill];
    return computeDays(sc.words, sc.phrases, skill, schedule);
  },

  getDay: (level, skill, dayNumber, schedule) =>
    get().getDays(level, skill, schedule).find((d) => d.dayNumber === dayNumber),
}));
