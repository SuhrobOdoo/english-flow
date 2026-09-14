export type DifficultyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type Category =
  | 'general'
  | 'business'
  | 'it'
  | 'odoo'
  | 'ielts';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'pronoun'
  | 'interjection'
  | 'phrasal verb';

export type QuizType =
  | 'translation'
  | 'context'
  | 'fill-blank'
  | 'meaning'
  | 'sentence';

export interface VocabularyWord {
  id: string;
  word: string;
  ipa: string;
  translation: string;
  partOfSpeech: PartOfSpeech;
  level: DifficultyLevel;
  category: Category;
  examples: string[];
  usage: string;
  synonyms: string[];
  antonyms: string[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  type: QuizType;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  wordId: string;
  /** For fill-blank type: the sentence with a blank */
  blankSentence?: string;
  /** For context type: additional context */
  contextSentence?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  general: 'General English',
  business: 'Business English',
  it: 'IT English',
  odoo: 'Odoo English',
  ielts: 'IELTS Vocabulary',
};

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  A1: 'A1 — Beginner',
  A2: 'A2 — Elementary',
  B1: 'B1 — Intermediate',
  B2: 'B2 — Upper Intermediate',
  C1: 'C1 — Advanced',
  C2: 'C2 — Proficiency',
};

export const QUIZ_TYPE_LABELS: Record<QuizType, string> = {
  translation: 'Translation',
  context: 'Meaning from Context',
  'fill-blank': 'Fill in the Blank',
  meaning: 'Choose Correct English Word',
  sentence: 'Choose the Correct Sentence',
};
