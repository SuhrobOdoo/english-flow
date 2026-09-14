import React, { useState } from 'react';
import type { QuizQuestion } from '../types/vocabulary';
import { QUIZ_TYPE_LABELS } from '../types/vocabulary';

interface QuizProps {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ question, onAnswer, onNext }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const isCorrect = selectedId === question.correctOptionId;

  const handleSelect = (optionId: string) => {
    if (answered) return;
    setSelectedId(optionId);
    setAnswered(true);
    onAnswer(optionId === question.correctOptionId);
  };

  const handleNext = () => {
    setSelectedId(null);
    setAnswered(false);
    onNext();
  };

  // Allow external quiz answer via index (for keyboard support)
  const handleSelectByIndex = (index: number) => {
    if (answered || index >= question.options.length) return;
    handleSelect(question.options[index].id);
  };

  // Expose to parent via data attribute for keyboard hook
  React.useEffect(() => {
    const handler = (e: CustomEvent) => {
      handleSelectByIndex(e.detail);
    };
    window.addEventListener('quiz-answer' as string, handler as EventListener);
    return () => window.removeEventListener('quiz-answer' as string, handler as EventListener);
  });

  const getOptionClass = (optionId: string) => {
    if (!answered) return 'quiz-option';
    if (optionId === question.correctOptionId) return 'quiz-option correct';
    if (optionId === selectedId) return 'quiz-option incorrect';
    return 'quiz-option disabled';
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="quiz-section" role="region" aria-label="Quiz">
      <div className="quiz-header">
        <span className="quiz-type-badge">{QUIZ_TYPE_LABELS[question.type]}</span>
        <h2 className="quiz-title">Quiz</h2>
      </div>

      {/* Context sentence for context-type questions */}
      {question.contextSentence && (
        <div className="quiz-context">
          <p className="context-sentence">"{question.contextSentence}"</p>
        </div>
      )}

      {/* Blank sentence for fill-blank type */}
      {question.blankSentence && (
        <div className="quiz-blank">
          <p className="blank-sentence">{question.blankSentence}</p>
        </div>
      )}

      <p className="quiz-question">{question.question}</p>

      <div className="quiz-options" role="listbox" aria-label="Quiz options">
        {question.options.map((option, index) => (
          <button
            key={option.id}
            className={getOptionClass(option.id)}
            onClick={() => handleSelect(option.id)}
            disabled={answered}
            role="option"
            aria-selected={selectedId === option.id}
            type="button"
          >
            <span className="option-letter">{optionLetters[index]}</span>
            <span className="option-text">{option.text}</span>
            {answered && option.id === question.correctOptionId && (
              <span className="option-indicator correct-indicator">✓</span>
            )}
            {answered && option.id === selectedId && option.id !== question.correctOptionId && (
              <span className="option-indicator incorrect-indicator">✗</span>
            )}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <div className="feedback-message">
            {isCorrect ? (
              <>
                <span className="feedback-icon">🎉</span>
                <span>Correct! Well done!</span>
              </>
            ) : (
              <>
                <span className="feedback-icon">💡</span>
                <span>
                  Not quite. The correct answer is:{' '}
                  <strong>
                    {question.options.find((o) => o.id === question.correctOptionId)?.text}
                  </strong>
                </span>
              </>
            )}
          </div>
          <button
            className="btn btn-primary btn-next"
            onClick={handleNext}
            aria-label="Next word"
            type="button"
          >
            Next Word
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}

      {!answered && (
        <p className="quiz-hint">Press 1-4 or A-D to answer, Enter for next</p>
      )}
    </div>
  );
};
