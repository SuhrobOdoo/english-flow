import type { QuizQuestion, QuizOption, QuizType, VocabularyWord } from '../types/vocabulary';
import { getRandomWords } from './vocabulary';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getDistractors(
  correctWord: VocabularyWord,
  count: number,
  targetLanguage: 'en' | 'ru'
): VocabularyWord[] {
  return getRandomWords(count, [correctWord.id], undefined, undefined, targetLanguage);
}

/**
 * Quiz Type 1: Translation Question
 * "What does 'postpone' mean?"
 * Options: Uzbek translations (one correct, three distractors)
 */
function generateTranslationQuiz(word: VocabularyWord, targetLanguage: 'en' | 'ru'): QuizQuestion {
  const distractors = getDistractors(word, 3, targetLanguage);
  const correctId = generateId();

  const options: QuizOption[] = shuffleArray([
    { id: correctId, text: word.translation, isCorrect: true },
    ...distractors.map((d) => ({
      id: generateId(),
      text: d.translation,
      isCorrect: false,
    })),
  ]);

  return {
    type: 'translation',
    question: `"${word.word}" qanday ma'noni anglatadi?`,
    options,
    correctOptionId: correctId,
    wordId: word.id,
  };
}

/**
 * Quiz Type 2: Choose the correct sentence
 * Shows multiple sentences, one uses the word correctly
 */
function generateSentenceQuiz(word: VocabularyWord, targetLanguage: 'en' | 'ru'): QuizQuestion {
  const distractors = getDistractors(word, 3, targetLanguage);
  const correctId = generateId();

  // Use a real example from the word
  const correctExample = word.examples[Math.floor(Math.random() * word.examples.length)];

  const options: QuizOption[] = shuffleArray([
    { id: correctId, text: correctExample, isCorrect: true },
    ...distractors.map((d) => ({
      id: generateId(),
      text: d.examples[Math.floor(Math.random() * d.examples.length)] || `Это было ${d.word}.`,
      isCorrect: false,
    })),
  ]);

  return {
    type: 'sentence',
    question: `Qaysi gapda "${word.word}" so'zi to'g'ri qo'llanilgan?`,
    options,
    correctOptionId: correctId,
    wordId: word.id,
  };
}

/**
 * Quiz Type 3: Fill in the blank
 * "We need to ______ the meeting because the manager is unavailable."
 */
function generateFillBlankQuiz(word: VocabularyWord, targetLanguage: 'en' | 'ru'): QuizQuestion {
  const distractors = getDistractors(word, 3, targetLanguage);
  const correctId = generateId();

  // Create blank sentence from example
  const example = word.examples[Math.floor(Math.random() * word.examples.length)];
  const wordRegex = new RegExp(`\\b${word.word}\\b`, 'gi');

  let blankSentence: string;
  if (wordRegex.test(example)) {
    blankSentence = example.replace(wordRegex, '______');
  } else {
    // Fallback: create a generic blank sentence
    blankSentence = `Bo'sh joyga to'g'ri keluvchi so'zni toping: ______ . (${word.translation})`;
  }

  const options: QuizOption[] = shuffleArray([
    { id: correctId, text: word.word, isCorrect: true },
    ...distractors.map((d) => ({
      id: generateId(),
      text: d.word,
      isCorrect: false,
    })),
  ]);

  return {
    type: 'fill-blank',
    question: 'Bo\'sh joyni to\'ldiring:',
    blankSentence,
    options,
    correctOptionId: correctId,
    wordId: word.id,
  };
}

/**
 * Quiz Type 4: Choose the correct English word
 * Shows Uzbek translation, user picks the English word
 */
function generateMeaningQuiz(word: VocabularyWord, targetLanguage: 'en' | 'ru'): QuizQuestion {
  const distractors = getDistractors(word, 3, targetLanguage);
  const correctId = generateId();

  const options: QuizOption[] = shuffleArray([
    { id: correctId, text: word.word, isCorrect: true },
    ...distractors.map((d) => ({
      id: generateId(),
      text: d.word,
      isCorrect: false,
    })),
  ]);

  return {
    type: 'meaning',
    question: `Qaysi so'z "${word.translation}" ma'nosini bildiradi?`,
    options,
    correctOptionId: correctId,
    wordId: word.id,
  };
}

/**
 * Quiz Type 5: Meaning from context
 * Shows a sentence with the word, user must pick the meaning
 */
function generateContextQuiz(word: VocabularyWord, targetLanguage: 'en' | 'ru'): QuizQuestion {
  const distractors = getDistractors(word, 3, targetLanguage);
  const correctId = generateId();
  const contextSentence = word.examples[Math.floor(Math.random() * word.examples.length)];

  const options: QuizOption[] = shuffleArray([
    { id: correctId, text: word.translation, isCorrect: true },
    ...distractors.map((d) => ({
      id: generateId(),
      text: d.translation,
      isCorrect: false,
    })),
  ]);

  return {
    type: 'context',
    question: `Ushbu gapda "${word.word}" qanday ma'noda kelgan?`,
    contextSentence,
    options,
    correctOptionId: correctId,
    wordId: word.id,
  };
}

const QUIZ_GENERATORS: Record<QuizType, (word: VocabularyWord, lang: 'en' | 'ru') => QuizQuestion> = {
  translation: generateTranslationQuiz,
  sentence: generateSentenceQuiz,
  'fill-blank': generateFillBlankQuiz,
  meaning: generateMeaningQuiz,
  context: generateContextQuiz,
};

/**
 * Generate a quiz question for a given word.
 * If allowedTypes is provided, randomly selects from those types.
 */
export function generateQuiz(
  word: VocabularyWord,
  allowedTypes?: QuizType[],
  targetLanguage: 'en' | 'ru' = 'en'
): QuizQuestion {
  const types = allowedTypes?.length
    ? allowedTypes
    : (['translation', 'sentence', 'fill-blank', 'meaning', 'context'] as QuizType[]);

  const selectedType = types[Math.floor(Math.random() * types.length)];
  const generator = QUIZ_GENERATORS[selectedType];

  return generator(word, targetLanguage);
}
