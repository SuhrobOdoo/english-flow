import { useEffect, useCallback } from 'react';

interface KeyboardConfig {
  onQuizAnswer?: (index: number) => void;
  onNextWord?: () => void;
  onToggleFavorite?: () => void;
  onPronounce?: () => void;
  enabled?: boolean;
}

export function useKeyboard({
  onQuizAnswer,
  onNextWord,
  onToggleFavorite,
  onPronounce,
  enabled = true,
}: KeyboardConfig) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Ignore if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      // Quiz answers: 1-4 or A-D
      if (onQuizAnswer) {
        if (e.key >= '1' && e.key <= '4') {
          e.preventDefault();
          onQuizAnswer(parseInt(e.key) - 1);
          return;
        }
        const letterMap: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
        if (letterMap[e.key.toLowerCase()] !== undefined) {
          e.preventDefault();
          onQuizAnswer(letterMap[e.key.toLowerCase()]);
          return;
        }
      }

      // Enter → Next word
      if (e.key === 'Enter' && onNextWord) {
        e.preventDefault();
        onNextWord();
        return;
      }

      // S → Toggle favorite (Star)
      if (e.key.toLowerCase() === 's' && onToggleFavorite) {
        e.preventDefault();
        onToggleFavorite();
        return;
      }

      // P → Pronounce
      if (e.key.toLowerCase() === 'p' && onPronounce) {
        e.preventDefault();
        onPronounce();
        return;
      }
    },
    [enabled, onQuizAnswer, onNextWord, onToggleFavorite, onPronounce]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
