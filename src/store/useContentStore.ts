import { create } from 'zustand';
import type { ExamContent, Level, ProgramDay, Skill } from '../types';
import { examContent } from '../data/content';

interface ContentStore {
  content: ExamContent;
  getDays: (level: Level, skill: Skill) => ProgramDay[];
  getDay: (level: Level, skill: Skill, dayNumber: number) => ProgramDay | undefined;
}

export const useContentStore = create<ContentStore>()((_, get) => ({
  content: examContent,

  getDays: (level, skill) => get().content[level][skill],

  getDay: (level, skill, dayNumber) =>
    get().content[level][skill].find((d) => d.dayNumber === dayNumber),
}));
