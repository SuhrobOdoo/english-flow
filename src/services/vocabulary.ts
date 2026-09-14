import type { VocabularyWord, Category, DifficultyLevel } from '../types/vocabulary';
import vocabularyData from '../data/vocabulary.json';

let cachedVocabulary: VocabularyWord[] | null = null;

function loadVocabulary(): VocabularyWord[] {
  if (cachedVocabulary) return cachedVocabulary;
  try {
    cachedVocabulary = (vocabularyData as VocabularyWord[]).filter(
      (word) => word.id && word.word && word.translation
    );
  } catch {
    cachedVocabulary = [];
  }
  return cachedVocabulary;
}

export function getAllWords(): VocabularyWord[] {
  return loadVocabulary();
}

export function getWordById(id: string): VocabularyWord | undefined {
  return loadVocabulary().find((w) => w.id === id);
}

export function getWordsByCategory(category: Category): VocabularyWord[] {
  return loadVocabulary().filter((w) => w.category === category);
}

export function getWordsByLevel(level: DifficultyLevel): VocabularyWord[] {
  return loadVocabulary().filter((w) => w.level === level);
}

export function filterWords(
  categories: Category[],
  levels: DifficultyLevel[]
): VocabularyWord[] {
  return loadVocabulary().filter(
    (w) => categories.includes(w.category) && levels.includes(w.level)
  );
}

export function searchWords(query: string): VocabularyWord[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return loadVocabulary().filter(
    (w) =>
      w.word.toLowerCase().includes(q) ||
      w.translation.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q) ||
      w.synonyms.some((s) => s.toLowerCase().includes(q)) ||
      w.examples.some((e) => e.toLowerCase().includes(q))
  );
}

export function getRandomWords(
  count: number,
  exclude: string[] = [],
  categories?: Category[],
  levels?: DifficultyLevel[]
): VocabularyWord[] {
  let pool = loadVocabulary().filter((w) => !exclude.includes(w.id));
  if (categories?.length) {
    pool = pool.filter((w) => categories.includes(w.category));
  }
  if (levels?.length) {
    pool = pool.filter((w) => levels.includes(w.level));
  }
  // Fisher-Yates shuffle
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function getWordCount(): number {
  return loadVocabulary().length;
}

export function getCategoryCount(category: Category): number {
  return getWordsByCategory(category).length;
}
