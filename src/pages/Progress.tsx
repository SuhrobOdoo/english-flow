import React, { useEffect, useState } from 'react';
import { ProgressCard } from '../components/ProgressCard';
import { getStatistics, getAllWordProgress } from '../services/storage';
import type { UserStatistics } from '../types/userProgress';
import type { WordProgress } from '../types/userProgress';

export const Progress: React.FC = () => {
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [recentWords, setRecentWords] = useState<(WordProgress & { wordId: string })[]>([]);

  useEffect(() => {
    async function load() {
      const s = await getStatistics();
      setStats(s);

      const allProgress = await getAllWordProgress();
      const progressList = Object.values(allProgress)
        .filter((p) => p.timesSeen > 0)
        .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
        .slice(0, 20);
      setRecentWords(progressList);
    }
    load();
  }, []);

  if (!stats) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading progress...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Your Progress</h1>
        <p className="page-subtitle">Track your English learning journey</p>
      </div>

      <ProgressCard
        totalLearned={stats.totalWordsLearned}
        totalLearning={stats.totalWordsLearning}
        accuracy={stats.accuracy}
        streak={stats.streak.currentStreak}
        todayWords={stats.todayActivity.wordsStudied}
        needReview={stats.wordsNeedReview}
      />

      {/* Today's Activity */}
      <div className="section-card">
        <h2 className="section-title">Today's Activity</h2>
        <div className="activity-stats">
          <div className="activity-stat">
            <span className="activity-value">{stats.todayActivity.wordsStudied}</span>
            <span className="activity-label">Words Studied</span>
          </div>
          <div className="activity-stat">
            <span className="activity-value">{stats.todayActivity.quizzesCompleted}</span>
            <span className="activity-label">Quizzes</span>
          </div>
          <div className="activity-stat">
            <span className="activity-value">{stats.todayActivity.correctAnswers}</span>
            <span className="activity-label">Correct</span>
          </div>
          <div className="activity-stat">
            <span className="activity-value">{stats.todayActivity.wrongAnswers}</span>
            <span className="activity-label">Wrong</span>
          </div>
        </div>
      </div>

      {/* Streak Info */}
      <div className="section-card">
        <h2 className="section-title">Streak</h2>
        <div className="streak-display">
          <div className="streak-current">
            <span className="streak-fire">🔥</span>
            <span className="streak-number">{stats.streak.currentStreak}</span>
            <span className="streak-label">Day{stats.streak.currentStreak !== 1 ? 's' : ''}</span>
          </div>
          <div className="streak-best">
            Best: {stats.streak.longestStreak} day{stats.streak.longestStreak !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Recent Word Progress */}
      {recentWords.length > 0 && (
        <div className="section-card">
          <h2 className="section-title">Recent Words</h2>
          <div className="word-progress-list">
            {recentWords.map((wp) => (
              <div key={wp.wordId} className="word-progress-item">
                <div className="wp-word">{wp.wordId}</div>
                <div className="wp-stats">
                  <span className="wp-seen">Seen: {wp.timesSeen}</span>
                  <span className="wp-correct">✓ {wp.timesCorrect}</span>
                  <span className="wp-wrong">✗ {wp.timesWrong}</span>
                </div>
                <div className="wp-status">
                  {wp.learned ? (
                    <span className="wp-badge learned">Learned</span>
                  ) : (
                    <span className="wp-badge learning">Learning</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
