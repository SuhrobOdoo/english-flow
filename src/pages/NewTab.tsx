import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { VocabularyWord, QuizQuestion, QuizType } from '../types/vocabulary';
import type { UserSettings } from '../types/userProgress';
import { VocabularyCard } from '../components/VocabularyCard';
import { Quiz } from '../components/Quiz';
import { CountdownTimer } from '../components/CountdownTimer';
import { selectNextWord, recordAnswer } from '../services/spacedRepetition';
import { generateQuiz } from '../services/quiz';
import {
  getUserSettings,
  isFavorite,
  saveFavorite,
  removeFavorite,
  recordQuizAttempt,
  recordWordStudied,
  addToHistory,
} from '../services/storage';
import { useKeyboard } from '../hooks/useKeyboard';
import { useAutoRotate } from '../hooks/useAutoRotate';

export const NewTab: React.FC = () => {
  const [word, setWord] = useState<VocabularyWord | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const loadNextWord = useCallback(async (currentWordId?: string) => {
    const s = settings ?? await getUserSettings();
    if (!settings) setSettings(s);

    setFadeIn(false);
    setTimeout(async () => {
      const nextWord = await selectNextWord(s.categories, s.difficulties, currentWordId);
      if (nextWord) {
        setWord(nextWord);
        setQuiz(generateQuiz(nextWord, s.quizTypes as QuizType[]));
        setQuizAnswered(false);
        const favStatus = await isFavorite(nextWord.id);
        setIsFav(favStatus);

        await recordWordStudied();
        await addToHistory({
          wordId: nextWord.id,
          word: nextWord.word,
          translation: nextWord.translation,
          lastSeen: new Date().toISOString(),
          timesCorrect: 0,
          timesWrong: 0,
        });
      }
      setLoading(false);
      setTimeout(() => setFadeIn(true), 50);
    }, 200);
  }, [settings]);

  useEffect(() => {
    loadNextWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuizAnswer = useCallback(async (correct: boolean) => {
    if (!word) return;
    setQuizAnswered(true);
    await recordAnswer(word.id, correct);
    await recordQuizAttempt(correct);
  }, [word]);

  const handleNextWord = useCallback(() => {
    if (word) {
      loadNextWord(word.id);
    }
  }, [word, loadNextWord]);

  const handleToggleFavorite = useCallback(async () => {
    if (!word) return;
    if (isFav) {
      await removeFavorite(word.id);
      setIsFav(false);
    } else {
      await saveFavorite(word.id);
      setIsFav(true);
    }
  }, [word, isFav]);

  const handlePronounce = useCallback(() => {
    if (!word) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }, [word]);

  // Keyboard navigation
  useKeyboard({
    onQuizAnswer: (index) => {
      if (!quizAnswered && quiz) {
        window.dispatchEvent(new CustomEvent('quiz-answer', { detail: index }));
      }
    },
    onNextWord: () => {
      if (quizAnswered) handleNextWord();
    },
    onToggleFavorite: handleToggleFavorite,
    onPronounce: handlePronounce,
    enabled: true,
  });

  // Auto-rotation
  const { remaining, resetTimer } = useAutoRotate({
    enabled: settings?.autoRotate ?? false,
    interval: settings?.rotateInterval ?? 0,
    onRotate: () => {
      if (quizAnswered) {
        handleNextWord();
      }
    },
    paused: !quizAnswered && Boolean(quiz),
  });

  // Reset timer when word changes
  useEffect(() => {
    resetTimer();
  }, [word?.id, resetTimer]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading your vocabulary...</p>
      </div>
    );
  }

  if (!word || !quiz) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📚</span>
        <h2>No words available</h2>
        <p>Try adjusting your category and difficulty settings.</p>
      </div>
    );
  }

  return (
    <div className={`newtab-page ${fadeIn ? 'fade-in' : 'fade-out'}`}>
      <div className="newtab-content">
        <VocabularyCard
          word={word}
          isFavorite={isFav}
          onToggleFavorite={handleToggleFavorite}
        />

        <div ref={quizRef}>
          <Quiz
            question={quiz}
            onAnswer={handleQuizAnswer}
            onNext={handleNextWord}
          />
        </div>

        <CountdownTimer
          remaining={remaining}
          enabled={settings?.autoRotate ?? false}
        />
      </div>
    </div>
  );
};
