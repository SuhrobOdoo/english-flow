import type {
  UserSettings,
  WordProgress,
  FavoriteEntry,
  HistoryEntry,
  DailyActivity,
  StreakData,
} from '../types/userProgress';
import { DEFAULT_SETTINGS, DEFAULT_STREAK, DEFAULT_DAILY_ACTIVITY } from '../types/userProgress';

type StorageArea = typeof chrome.storage.local;

function getStorage(): StorageArea {
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    return chrome.storage.local;
  }
  // Fallback for development without Chrome APIs
  return {
    get: (keys: string | string[] | Record<string, unknown> | null) =>
      new Promise((resolve) => {
        const result: Record<string, unknown> = {};
        const keyList = Array.isArray(keys)
          ? keys
          : typeof keys === 'string'
            ? [keys]
            : keys
              ? Object.keys(keys)
              : [];
        for (const key of keyList) {
          const stored = localStorage.getItem(key);
          if (stored !== null) {
            try {
              result[key] = JSON.parse(stored);
            } catch {
              result[key] = stored;
            }
          } else if (keys && typeof keys === 'object' && !Array.isArray(keys)) {
            result[key] = (keys as Record<string, unknown>)[key];
          }
        }
        resolve(result);
      }),
    set: (items: Record<string, unknown>) =>
      new Promise<void>((resolve) => {
        for (const [key, value] of Object.entries(items)) {
          localStorage.setItem(key, JSON.stringify(value));
        }
        resolve();
      }),
    remove: (keys: string | string[]) =>
      new Promise<void>((resolve) => {
        const keyList = Array.isArray(keys) ? keys : [keys];
        for (const key of keyList) {
          localStorage.removeItem(key);
        }
        resolve();
      }),
    clear: () =>
      new Promise<void>((resolve) => {
        localStorage.clear();
        resolve();
      }),
  } as unknown as StorageArea;
}

const STORAGE_KEYS = {
  SETTINGS: 'ef_settings',
  WORD_PROGRESS: 'ef_word_progress',
  FAVORITES: 'ef_favorites',
  HISTORY: 'ef_history',
  DAILY_ACTIVITY: 'ef_daily_activity',
  STREAK: 'ef_streak',
} as const;

async function getStorageKey(baseKey: string): Promise<string> {
  if (baseKey === STORAGE_KEYS.SETTINGS) return baseKey;
  const settings = await getUserSettings();
  const lang = settings.targetLanguage || 'en';
  return `${baseKey}_${lang}`;
}

// ─── Settings ───

export async function getUserSettings(): Promise<UserSettings> {
  const storage = getStorage();
  const result = await storage.get({ [STORAGE_KEYS.SETTINGS]: DEFAULT_SETTINGS });
  return (result[STORAGE_KEYS.SETTINGS] as UserSettings) ?? DEFAULT_SETTINGS;
}

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  const storage = getStorage();
  await storage.set({ [STORAGE_KEYS.SETTINGS]: settings });
}

// ─── Word Progress ───

export async function getAllWordProgress(): Promise<Record<string, WordProgress>> {
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.WORD_PROGRESS);
  const result = await storage.get({ [key]: {} });
  return (result[key] as Record<string, WordProgress>) ?? {};
}

export async function getWordProgress(wordId: string): Promise<WordProgress | null> {
  const all = await getAllWordProgress();
  return all[wordId] ?? null;
}

export async function saveWordProgress(progress: WordProgress): Promise<void> {
  const all = await getAllWordProgress();
  all[progress.wordId] = progress;
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.WORD_PROGRESS);
  await storage.set({ [key]: all });
}

// ─── Favorites ───

export async function getFavorites(): Promise<FavoriteEntry[]> {
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.FAVORITES);
  const result = await storage.get({ [key]: [] });
  return (result[key] as FavoriteEntry[]) ?? [];
}

export async function saveFavorite(wordId: string): Promise<void> {
  const favorites = await getFavorites();
  if (!favorites.some((f) => f.wordId === wordId)) {
    favorites.push({ wordId, addedAt: new Date().toISOString() });
    const storage = getStorage();
    const key = await getStorageKey(STORAGE_KEYS.FAVORITES);
    await storage.set({ [key]: favorites });
  }
}

export async function removeFavorite(wordId: string): Promise<void> {
  let favorites = await getFavorites();
  favorites = favorites.filter((f) => f.wordId !== wordId);
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.FAVORITES);
  await storage.set({ [key]: favorites });
}

export async function isFavorite(wordId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((f) => f.wordId === wordId);
}

// ─── History ───

export async function getHistory(): Promise<HistoryEntry[]> {
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.HISTORY);
  const result = await storage.get({ [key]: [] });
  return (result[key] as HistoryEntry[]) ?? [];
}

export async function addToHistory(entry: HistoryEntry): Promise<void> {
  let history = await getHistory();
  // Remove existing entry for this word (to move it to top)
  history = history.filter((h) => h.wordId !== entry.wordId);
  // Add to the beginning
  history.unshift(entry);
  // Keep only last 200 entries
  if (history.length > 200) {
    history = history.slice(0, 200);
  }
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.HISTORY);
  await storage.set({ [key]: history });
}

// ─── Daily Activity ───

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export async function getDailyActivity(): Promise<DailyActivity> {
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.DAILY_ACTIVITY);
  const result = await storage.get({ [key]: DEFAULT_DAILY_ACTIVITY });
  const activity = (result[key] as DailyActivity) ?? DEFAULT_DAILY_ACTIVITY;

  // Reset if it's a new day
  if (activity.date !== getTodayDate()) {
    const newActivity: DailyActivity = {
      ...DEFAULT_DAILY_ACTIVITY,
      date: getTodayDate(),
    };
    await saveDailyActivity(newActivity);
    return newActivity;
  }

  return activity;
}

export async function saveDailyActivity(activity: DailyActivity): Promise<void> {
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.DAILY_ACTIVITY);
  await storage.set({ [key]: activity });
}

export async function recordQuizAttempt(correct: boolean): Promise<void> {
  const activity = await getDailyActivity();
  activity.quizzesCompleted += 1;
  if (correct) {
    activity.correctAnswers += 1;
  } else {
    activity.wrongAnswers += 1;
  }
  await saveDailyActivity(activity);
  await updateStreak();
}

export async function recordWordStudied(): Promise<void> {
  const activity = await getDailyActivity();
  activity.wordsStudied += 1;
  await saveDailyActivity(activity);
}

// ─── Streak ───

export async function getStreak(): Promise<StreakData> {
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.STREAK);
  const result = await storage.get({ [key]: DEFAULT_STREAK });
  return (result[key] as StreakData) ?? DEFAULT_STREAK;
}

export async function saveStreak(streak: StreakData): Promise<void> {
  const storage = getStorage();
  const key = await getStorageKey(STORAGE_KEYS.STREAK);
  await storage.set({ [key]: streak });
}

export async function updateStreak(): Promise<void> {
  const streak = await getStreak();
  const today = getTodayDate();

  if (streak.lastActiveDate === today) {
    // Already active today, nothing to update
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (streak.lastActiveDate === yesterdayStr) {
    // Consecutive day
    streak.currentStreak += 1;
  } else if (streak.lastActiveDate === '') {
    // First ever activity
    streak.currentStreak = 1;
  } else {
    // Missed at least one day — reset streak
    streak.currentStreak = 1;
  }

  streak.lastActiveDate = today;
  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak;
  }

  await saveStreak(streak);
}

// ─── Combined Statistics ───

export async function getStatistics() {
  const allProgress = await getAllWordProgress();
  const activity = await getDailyActivity();
  const streak = await getStreak();

  const progressEntries = Object.values(allProgress);
  const totalWordsLearned = progressEntries.filter((p) => p.learned).length;
  const totalWordsLearning = progressEntries.filter((p) => p.timesSeen > 0 && !p.learned).length;
  const totalCorrect = progressEntries.reduce((sum, p) => sum + p.timesCorrect, 0);
  const totalWrong = progressEntries.reduce((sum, p) => sum + p.timesWrong, 0);
  const accuracy = totalCorrect + totalWrong > 0
    ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100)
    : 0;

  const now = new Date();
  const wordsNeedReview = progressEntries.filter((p) => {
    if (!p.nextReview) return false;
    return new Date(p.nextReview) <= now && !p.learned;
  }).length;

  return {
    totalWordsLearned,
    totalWordsLearning,
    totalCorrect,
    totalWrong,
    accuracy,
    streak,
    todayActivity: activity,
    wordsNeedReview,
  };
}
