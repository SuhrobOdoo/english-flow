import type { VocabularyWord, Category, DifficultyLevel } from '../types/vocabulary';
import vocabularyDataEn from '../data/vocabulary.json';
import vocabularyDataRu from '../data/vocabulary_ru.json';

const cachedVocabulary: Record<'en' | 'ru', VocabularyWord[] | null> = {
  en: null,
  ru: null
};

function loadVocabulary(lang: 'en' | 'ru'): VocabularyWord[] {
  if (cachedVocabulary[lang]) return cachedVocabulary[lang]!;
  try {
    const rawData = lang === 'ru' ? vocabularyDataRu : vocabularyDataEn;
    cachedVocabulary[lang] = (rawData as VocabularyWord[]).filter(
      (word) => word.id && word.word && word.translation
    );
  } catch {
    cachedVocabulary[lang] = [];
  }
  return cachedVocabulary[lang]!;
}

export function getAllWords(lang: 'en' | 'ru'): VocabularyWord[] {
  return loadVocabulary(lang);
}

export function getWordById(id: string, lang: 'en' | 'ru'): VocabularyWord | undefined {
  return loadVocabulary(lang).find((w) => w.id === id);
}

export function getWordsByCategory(category: Category, lang: 'en' | 'ru'): VocabularyWord[] {
  return loadVocabulary(lang).filter((w) => w.category === category);
}

export function getWordsByLevel(level: DifficultyLevel, lang: 'en' | 'ru'): VocabularyWord[] {
  return loadVocabulary(lang).filter((w) => w.level === level);
}

export function filterWords(
  categories: Category[],
  levels: DifficultyLevel[],
  lang: 'en' | 'ru'
): VocabularyWord[] {
  const all = loadVocabulary(lang);
  if (all.length === 0) return [];

  // Exact match
  const exact = all.filter(
    (w) =>
      (categories.length === 0 || categories.includes(w.category)) &&
      (levels.length === 0 || levels.includes(w.level))
  );
  if (exact.length > 0) return exact;

  // Fallback 1: match requested levels from any category
  if (levels.length > 0) {
    const levelMatch = all.filter((w) => levels.includes(w.level));
    if (levelMatch.length > 0) return levelMatch;
  }

  // Fallback 2: match requested categories from any level
  if (categories.length > 0) {
    const catMatch = all.filter((w) => categories.includes(w.category));
    if (catMatch.length > 0) return catMatch;
  }

  // Fallback 3: return all words
  return all;
}

export function searchWords(query: string, lang: 'en' | 'ru'): VocabularyWord[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return loadVocabulary(lang).filter(
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
  levels?: DifficultyLevel[],
  lang: 'en' | 'ru' = 'en'
): VocabularyWord[] {
  let pool = loadVocabulary(lang).filter((w) => !exclude.includes(w.id));
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

export function getWordCount(lang: 'en' | 'ru'): number {
  return loadVocabulary(lang).length;
}

export function getCategoryCount(category: Category, lang: 'en' | 'ru'): number {
  return getWordsByCategory(category, lang).length;
}
