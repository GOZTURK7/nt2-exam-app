import type { ExamContent } from '../types';
import { b2SprekenWords, b2SprekenPhrases } from './extracted-b2-spreken';

const EMPTY = { words: [], phrases: [] };

export const examContent: ExamContent = {
  version: '2.0.0',

  B1: {
    spreken:   EMPTY,
    schrijven: EMPTY,
    lezen:     EMPTY,
    luisteren: EMPTY,
  },

  B2: {
    spreken:   { words: b2SprekenWords, phrases: b2SprekenPhrases },
    schrijven: EMPTY,
    lezen:     EMPTY,
    luisteren: EMPTY,
  },
};
