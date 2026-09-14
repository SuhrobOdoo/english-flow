import type { Category, DifficultyLevel, QuizType } from './vocabulary';

export type ThemeMode = 'light' | 'dark' | 'system';

export type RotateInterval = 10 | 20 | 30 | 60 | 0; // 0 = OFF

export type DailyWordCount = 5 | 10 | 20 | 30;

export interface UserSettings {
  dailyWords: DailyWordCount;
  difficulties: DifficultyLevel[];
  categories: Category[];
  quizTypes: QuizType[];
  autoRotate: boolean;
  rotateInterval: RotateInterval;
  theme: ThemeMode;
}

export interface WordProgress {
  wordId: string;
  timesSeen: number;
  timesCorrect: number;
  timesWrong: number;
  lastSeen: string; // ISO date string
  nextReview: string; // ISO date string
  difficulty: number; // SM-2 easiness factor (1.3–2.5+)
  learned: boolean;
  interval: number; // days until next review
  repetition: number; // successful consecutive reviews
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  wordsStudied: number;
  quizzesCompleted: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
}

export interface UserStatistics {
  totalWordsLearned: number;
  totalWordsLearning: number;
  totalCorrect: number;
  totalWrong: number;
  accuracy: number;
  streak: StreakData;
  todayActivity: DailyActivity;
  wordsNeedReview: number;
}

export interface HistoryEntry {
  wordId: string;
  word: string;
  translation: string;
  lastSeen: string; // ISO date string
  timesCorrect: number;
  timesWrong: number;
}

export interface FavoriteEntry {
  wordId: string;
  addedAt: string; // ISO date string
}

export const DEFAULT_SETTINGS: UserSettings = {
  dailyWords: 10,
  difficulties: ['A1', 'A2', 'B1', 'B2'],
  categories: ['general'],
  quizTypes: ['translation', 'context', 'fill-blank', 'meaning', 'sentence'],
  autoRotate: false,
  rotateInterval: 30,
  theme: 'system',
};

export const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
};

export const DEFAULT_DAILY_ACTIVITY: DailyActivity = {
  date: new Date().toISOString().split('T')[0],
  wordsStudied: 0,
  quizzesCompleted: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};
