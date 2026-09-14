import React, { useEffect, useState } from 'react';
import { ProgressCard } from './components/ProgressCard';
import { getStatistics } from './services/storage';
import type { UserStatistics } from './types/userProgress';

const Popup: React.FC = () => {
  const [stats, setStats] = useState<UserStatistics | null>(null);

  useEffect(() => {
    getStatistics().then(setStats);
  }, []);

  const openNewTab = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({});
    } else {
      window.open('newtab.html', '_blank');
    }
  };

  const openPage = (page: string) => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: `newtab.html#${page}` });
    } else {
      window.open(`newtab.html#${page}`, '_blank');
    }
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <span className="brand-icon">🌊</span>
        <h1 className="popup-title">English Flow</h1>
      </div>

      {stats && (
        <>
          <div className="popup-section">
            <h2 className="popup-section-title">Today's Progress</h2>
            <ProgressCard
              totalLearned={stats.totalWordsLearned}
              totalLearning={stats.totalWordsLearning}
              accuracy={stats.accuracy}
              streak={stats.streak.currentStreak}
              todayWords={stats.todayActivity.wordsStudied}
              needReview={stats.wordsNeedReview}
              compact
            />
          </div>

          <div className="popup-stats-row">
            <div className="popup-stat">
              <span className="popup-stat-value">{stats.todayActivity.wordsStudied}</span>
              <span className="popup-stat-label">Words today</span>
            </div>
            <div className="popup-stat">
              <span className="popup-stat-value">{stats.todayActivity.quizzesCompleted}</span>
              <span className="popup-stat-label">Quizzes</span>
            </div>
          </div>
        </>
      )}

      <div className="popup-actions">
        <button className="btn btn-primary popup-btn" onClick={openNewTab} type="button">
          📚 Open New Tab
        </button>
        <button className="btn btn-secondary popup-btn" onClick={() => openPage('progress')} type="button">
          📊 Progress
        </button>
        <button className="btn btn-secondary popup-btn" onClick={() => openPage('settings')} type="button">
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
};

export default Popup;
