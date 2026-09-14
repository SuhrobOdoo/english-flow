import type { VocabularyWord, QuizQuestion } from '../types/vocabulary';

/**
 * AI Service placeholder.
 *
 * This module defines the interface for future AI-powered features.
 * All methods currently throw errors — they will be implemented
 * when a backend/API is added.
 *
 * IMPORTANT: Never store API keys in the frontend.
 * These methods should call a backend service that handles API keys securely.
 */

export interface AIGeneratedWord {
  word: string;
  ipa: string;
  translation: string;
  partOfSpeech: string;
  level: string;
  category: string;
  examples: string[];
  usage: string;
  synonyms: string[];
  antonyms: string[];
}

export interface AIExplanation {
  explanation: string;
  additionalExamples: string[];
  culturalNotes?: string;
  commonMistakes?: string[];
}

export interface AIRecommendation {
  wordIds: string[];
  reason: string;
}

class AIService {
  private configured = false;

  isConfigured(): boolean {
    return this.configured;
  }

  /**
   * Generate vocabulary words based on topic, level, or user needs.
   * Future: Call LLM API to generate contextually relevant vocabulary.
   */
  async generateVocabulary(
    _topic: string,
    _count: number,
    _level?: string
  ): Promise<AIGeneratedWord[]> {
    throw new Error(
      'AI service not configured. Set up a backend API to enable AI-generated vocabulary.'
    );
  }

  /**
   * Generate additional example sentences for a word.
   * Future: Use LLM to create contextually appropriate examples.
   */
  async generateExamples(
    _word: string,
    _count: number
  ): Promise<string[]> {
    throw new Error(
      'AI service not configured. Set up a backend API to enable AI-generated examples.'
    );
  }

  /**
   * Generate quiz questions using AI for more varied and contextual quizzes.
   * Future: Use LLM to create sophisticated quiz questions.
   */
  async generateQuiz(
    _word: VocabularyWord,
    _type?: string
  ): Promise<QuizQuestion> {
    throw new Error(
      'AI service not configured. Set up a backend API to enable AI-generated quizzes.'
    );
  }

  /**
   * Get a detailed AI explanation for a word, including cultural context,
   * common mistakes, and advanced usage.
   */
  async getExplanation(
    _word: string
  ): Promise<AIExplanation> {
    throw new Error(
      'AI service not configured. Set up a backend API to enable AI explanations.'
    );
  }

  /**
   * Get personalized vocabulary recommendations based on user's learning history.
   * Future: Analyze user progress and suggest words that fill knowledge gaps.
   */
  async getRecommendations(
    _userId?: string
  ): Promise<AIRecommendation[]> {
    throw new Error(
      'AI service not configured. Set up a backend API to enable AI recommendations.'
    );
  }
}

// Singleton instance
export const aiService = new AIService();
