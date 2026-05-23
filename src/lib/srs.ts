import type { SRSCard } from '../types';

const AGAIN_MS   = 10 * 60 * 1000;
const EASY_MS    =  4 * 24 * 60 * 60 * 1000;
const GOOD_MS    =  1 * 24 * 60 * 60 * 1000;
const DAY_MS     =  1 * 24 * 60 * 60 * 1000;

export function initCard(wordId: string): SRSCard {
  return {
    wordId,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewMs: Date.now(),
    lastRating: 0,
    phase: 'new',
  };
}

export function reviewCard(card: SRSCard, rating: 1 | 2 | 3 | 4): SRSCard {
  const now = Date.now();
  let { interval, easeFactor, repetitions, phase } = card;
  let nextReviewMs: number;

  if (phase === 'new' || phase === 'learning') {
    if (rating <= 2) {
      nextReviewMs = now + AGAIN_MS;
      phase = 'learning';
      interval = 0;
    } else if (rating === 3) {
      nextReviewMs = now + GOOD_MS;
      phase = 'review';
      interval = 1;
      repetitions = 1;
    } else {
      nextReviewMs = now + EASY_MS;
      phase = 'review';
      interval = 4;
      easeFactor = Math.min(easeFactor + 0.15, 3.5);
      repetitions = 1;
    }
  } else {
    // review phase
    if (rating === 1) {
      nextReviewMs = now + AGAIN_MS;
      phase = 'learning';
      interval = 0;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    } else if (rating === 2) {
      interval = Math.max(1, Math.round(interval * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      nextReviewMs = now + interval * DAY_MS;
      repetitions += 1;
    } else if (rating === 3) {
      interval = Math.max(1, Math.round(interval * easeFactor));
      nextReviewMs = now + interval * DAY_MS;
      repetitions += 1;
    } else {
      interval = Math.max(1, Math.round(interval * easeFactor * 1.3));
      easeFactor = Math.min(3.5, easeFactor + 0.15);
      nextReviewMs = now + interval * DAY_MS;
      repetitions += 1;
    }
  }

  return { ...card, interval, easeFactor, repetitions, nextReviewMs, lastRating: rating, phase };
}

function fmtMs(ms: number): string {
  const min = Math.round(ms / 60_000);
  if (min < 60) return `${min}m`;
  const h = Math.round(ms / 3_600_000);
  if (h < 24) return `${h}h`;
  return `${Math.round(ms / DAY_MS)}d`;
}

export function previewIntervals(card?: SRSCard): Record<1 | 2 | 3 | 4, string> {
  if (!card || card.phase === 'new' || card.phase === 'learning') {
    return { 1: '10m', 2: '10m', 3: '1d', 4: '4d' };
  }
  const { interval, easeFactor } = card;
  return {
    1: '10m',
    2: fmtMs(Math.max(1, Math.round(interval * 1.2)) * DAY_MS),
    3: fmtMs(Math.max(1, Math.round(interval * easeFactor)) * DAY_MS),
    4: fmtMs(Math.max(1, Math.round(interval * easeFactor * 1.3)) * DAY_MS),
  };
}

export function getDueCards(cards: SRSCard[], nowMs = Date.now()): SRSCard[] {
  return cards
    .filter((c) => c.nextReviewMs <= nowMs)
    .sort((a, b) => a.nextReviewMs - b.nextReviewMs);
}

export function getCardStats(cards: SRSCard[]): {
  due: number; new: number; learning: number; mature: number;
} {
  const now = Date.now();
  return {
    due:      cards.filter((c) => c.nextReviewMs <= now).length,
    new:      cards.filter((c) => c.phase === 'new').length,
    learning: cards.filter((c) => c.phase === 'learning').length,
    mature:   cards.filter((c) => c.phase === 'review' && c.interval >= 21).length,
  };
}
