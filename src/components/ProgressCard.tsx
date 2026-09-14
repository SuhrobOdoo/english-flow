import React from 'react';

interface ProgressCardProps {
  totalLearned: number;
  totalLearning: number;
  accuracy: number;
  streak: number;
  todayWords: number;
  needReview: number;
  compact?: boolean;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  totalLearned,
  totalLearning,
  accuracy,
  streak,
  todayWords,
  needReview,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="progress-card compact">
        <div className="progress-stat">
          <span className="stat-value">{totalLearned}</span>
          <span className="stat-label">Learned</span>
        </div>
        <div className="progress-stat">
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="progress-stat">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">🔥 Streak</span>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-card">
      <div className="progress-grid">
        <div className="progress-stat highlight">
          <span className="stat-icon">📚</span>
          <span className="stat-value">{totalLearned}</span>
          <span className="stat-label">Words Learned</span>
        </div>
        <div className="progress-stat">
          <span className="stat-icon">📖</span>
          <span className="stat-value">{totalLearning}</span>
          <span className="stat-label">Currently Learning</span>
        </div>
        <div className="progress-stat">
          <span className="stat-icon">🎯</span>
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="progress-stat">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{streak}</span>
          <span className="stat-label">Day Streak</span>
        </div>
        <div className="progress-stat">
          <span className="stat-icon">📅</span>
          <span className="stat-value">{todayWords}</span>
          <span className="stat-label">Today's Words</span>
        </div>
        <div className="progress-stat">
          <span className="stat-icon">🔄</span>
          <span className="stat-value">{needReview}</span>
          <span className="stat-label">Need Review</span>
        </div>
      </div>
    </div>
  );
};
