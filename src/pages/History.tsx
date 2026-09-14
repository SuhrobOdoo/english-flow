import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/storage';
import { getWordById } from '../services/vocabulary';
import type { HistoryEntry } from '../types/userProgress';
import type { VocabularyWord } from '../types/vocabulary';
import { SearchBar } from '../components/SearchBar';

interface HistoryWordEntry extends HistoryEntry {
  fullWord?: VocabularyWord;
}

export const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryWordEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryWordEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const entries = await getHistory();
      const enriched: HistoryWordEntry[] = entries.map((entry) => ({
        ...entry,
        fullWord: getWordById(entry.wordId),
      }));
      setHistory(enriched);
      setFilteredHistory(enriched);
      setLoading(false);
    }
    load();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredHistory(history);
      return;
    }
    const q = query.toLowerCase();
    setFilteredHistory(
      history.filter(
        (h) =>
          h.word.toLowerCase().includes(q) ||
          h.translation.toLowerCase().includes(q)
      )
    );
  };

  const handlePronounce = (wordText: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">📋 History</h1>
        <p className="page-subtitle">
          {history.length} word{history.length !== 1 ? 's' : ''} viewed
        </p>
      </div>

      {history.length > 0 && (
        <SearchBar onSearch={handleSearch} placeholder="Search history..." />
      )}

      {filteredHistory.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h2>No history yet</h2>
          <p>Words you study will appear here.</p>
        </div>
      ) : (
        <div className="word-list">
          {filteredHistory.map((entry, index) => (
            <div key={`${entry.wordId}-${index}`} className="word-list-item">
              <div className="word-list-main">
                <div className="word-list-header">
                  <h3 className="word-list-word">{entry.word}</h3>
                  {entry.fullWord && (
                    <span className="word-list-ipa">{entry.fullWord.ipa}</span>
                  )}
                  <button
                    className="btn-icon"
                    onClick={() => handlePronounce(entry.word)}
                    aria-label={`Pronounce ${entry.word}`}
                    type="button"
                  >
                    🔊
                  </button>
                </div>
                <p className="word-list-translation">{entry.translation}</p>
              </div>
              <div className="word-list-actions">
                <span className="word-list-date">{formatTime(entry.lastSeen)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
