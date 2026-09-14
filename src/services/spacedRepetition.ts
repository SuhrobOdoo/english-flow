import type { WordProgress } from '../types/userProgress';
import type { VocabularyWord } from '../types/vocabulary';
import { getAllWordProgress, saveWordProgress } from './storage';
import { filterWords } from './vocabulary';
import type { Category, DifficultyLevel } from '../types/vocabulary';

/**
 * Simplified SM-2 spaced repetition algorithm.
 *
 * Core concepts:
 * - easiness factor (EF): 1.3 – 2.5+, starts at 2.5
 * - interval: days until next review
 * - repetition: count of consecutive correct answers
 *
 * On correct answer:
 *   repetition += 1
 *   if repetition == 1: interval = 1
 *   if repetition == 2: interval = 6
 *   else: interval = interval * EF
 *   EF = max(1.3, EF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
 *
 * On wrong answer:
 *   repetition = 0
 *   interval = 0.5 (review soon)
 *   EF stays the same (don't penalize EF on a single mistake)
 */

function calculateNextReview(
  progress: WordProgress,
  correct: boolean,
  quality: number = correct ? 4 : 1 // 0–5 scale, 4 = correct, 1 = wrong
): WordProgress {
  const updated = { ...progress };
  const now = new Date();

  updated.lastSeen = now.toISOString();
  updated.timesSeen += 1;

  if (correct) {
    updated.timesCorrect += 1;
    updated.repetition += 1;

    if (updated.repetition === 1) {
      updated.interval = 1;
    } else if (updated.repetition === 2) {
      updated.interval = 6;
    } else {
      updated.interval = Math.round(updated.interval * updated.difficulty);
    }

    // Update easiness factor
    const ef = updated.difficulty + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    updated.difficulty = Math.max(1.3, ef);
  } else {
    updated.timesWrong += 1;
    updated.repetition = 0;
    updated.interval = 0.5; // Review again soon (half a day)
  }

  // Calculate next review date
  const nextReview = new Date(now);
  nextReview.setHours(nextReview.getHours() + Math.round(updated.interval * 24));
  updated.nextReview = nextReview.toISOString();

  // Mark as learned if reviewed correctly many times with good interval
  if (updated.timesCorrect >= 5 && updated.interval >= 21 && updated.repetition >= 3) {
    updated.learned = true;
  }

  return updated;
}

export function createInitialProgress(wordId: string): WordProgress {
  return {
    wordId,
    timesSeen: 0,
    timesCorrect: 0,
    timesWrong: 0,
    lastSeen: '',
    nextReview: '',
    difficulty: 2.5,
    learned: false,
    interval: 0,
    repetition: 0,
  };
}

export async function recordAnswer(
  wordId: string,
  correct: boolean
): Promise<WordProgress> {
  const allProgress = await getAllWordProgress();
  const existing = allProgress[wordId] ?? createInitialProgress(wordId);
  const updated = calculateNextReview(existing, correct);
  await saveWordProgress(updated);
  return updated;
}

/**
 * Select the next word to study using spaced repetition logic.
 *
 * Priority:
 * 1. Words that are due for review (nextReview <= now)
 * 2. Words the user has gotten wrong recently (higher priority)
 * 3. New words the user hasn't seen yet
 * 4. Random from filtered pool
 */
export async function selectNextWord(
  categories: Category[],
  levels: DifficultyLevel[],
  currentWordId?: string,
  targetLanguage: 'en' | 'ru' = 'en'
): Promise<VocabularyWord | null> {
  const allProgress = await getAllWordProgress();
  const pool = filterWords(categories, levels, targetLanguage);

  if (pool.length === 0) return null;

  const now = new Date();

  // 1. Words due for review (exclude current word)
  const dueForReview = pool
    .filter((w) => w.id !== currentWordId)
    .filter((w) => {
      const p = allProgress[w.id];
      if (!p || !p.nextReview) return false;
      return new Date(p.nextReview) <= now && !p.learned;
    })
    .sort((a, b) => {
      const pa = allProgress[a.id];
      const pb = allProgress[b.id];
      // Prioritize words with more wrong answers
      const aScore = (pa?.timesWrong ?? 0) - (pa?.timesCorrect ?? 0);
      const bScore = (pb?.timesWrong ?? 0) - (pb?.timesCorrect ?? 0);
      return bScore - aScore; // Higher wrong ratio first
    });

  if (dueForReview.length > 0) {
    // Add some randomness among top candidates
    const topCandidates = dueForReview.slice(0, Math.min(3, dueForReview.length));
    return topCandidates[Math.floor(Math.random() * topCandidates.length)];
  }

  // 2. New words (never seen)
  const newWords = pool
    .filter((w) => w.id !== currentWordId)
    .filter((w) => !allProgress[w.id] || allProgress[w.id].timesSeen === 0);

  if (newWords.length > 0) {
    return newWords[Math.floor(Math.random() * newWords.length)];
  }

  // 3. Any word that's not the current one
  const others = pool.filter((w) => w.id !== currentWordId);
  if (others.length > 0) {
    return others[Math.floor(Math.random() * others.length)];
  }

  // 4. Only word left
  return pool[0];
}

export async function getWordsNeedingReview(
  categories: Category[],
  levels: DifficultyLevel[],
  targetLanguage: 'en' | 'ru' = 'en'
): Promise<VocabularyWord[]> {
  const allProgress = await getAllWordProgress();
  const pool = filterWords(categories, levels, targetLanguage);
  const now = new Date();

  return pool.filter((w) => {
    const p = allProgress[w.id];
    if (!p || !p.nextReview) return false;
    return new Date(p.nextReview) <= now && !p.learned;
  });
}
