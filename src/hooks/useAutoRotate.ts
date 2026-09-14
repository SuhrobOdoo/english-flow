import { useState, useEffect, useRef, useCallback } from 'react';
import type { RotateInterval } from '../types/userProgress';

interface AutoRotateConfig {
  enabled: boolean;
  interval: RotateInterval;
  onRotate: () => void;
  /** If true, pause the timer (e.g., user is answering a quiz) */
  paused?: boolean;
}

export function useAutoRotate({ enabled, interval, onRotate, paused = false }: AutoRotateConfig) {
  const [remaining, setRemaining] = useState<number>(interval);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rotateCallbackRef = useRef(onRotate);

  // Keep callback ref fresh
  rotateCallbackRef.current = onRotate;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    if (!enabled || interval === 0) return;
    setRemaining(interval);
  }, [enabled, interval, clearTimer]);

  useEffect(() => {
    clearTimer();

    if (!enabled || interval === 0 || paused) {
      return;
    }

    setRemaining(interval);

    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          rotateCallbackRef.current();
          return interval; // Reset for next cycle
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [enabled, interval, paused, clearTimer]);

  return { remaining, resetTimer };
}
