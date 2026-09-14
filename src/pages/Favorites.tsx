import React, { useEffect, useState, useCallback } from 'react';
import { getFavorites, removeFavorite } from '../services/storage';
import { getWordById } from '../services/vocabulary';
import type { VocabularyWord } from '../types/vocabulary';
import { SearchBar } from '../components/SearchBar';

interface FavoriteWordEntry {
  word: VocabularyWord;
  addedAt: string;
}

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteWordEntry[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteWordEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    const favEntries = await getFavorites();
    const words: FavoriteWordEntry[] = [];
    for (const fav of favEntries) {
      const word = getWordById(fav.wordId);
      if (word) {
        words.push({ word, addedAt: fav.addedAt });
      }
    }
    setFavorites(words);
    setFilteredFavorites(words);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemove = async (wordId: string) => {
    await removeFavorite(wordId);
    await loadFavorites();
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredFavorites(favorites);
      return;
    }
    const q = query.toLowerCase();
    setFilteredFavorites(
      favorites.filter(
        (f) =>
          f.word.word.toLowerCase().includes(q) ||
          f.word.translation.toLowerCase().includes(q)
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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">⭐ Favorites</h1>
        <p className="page-subtitle">{favorites.length} saved word{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      {favorites.length > 0 && (
        <SearchBar onSearch={handleSearch} placeholder="Search favorites..." />
      )}

      {filteredFavorites.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">⭐</span>
          <h2>No favorites yet</h2>
          <p>Star words while learning to add them here.</p>
        </div>
      ) : (
        <div className="word-list">
          {filteredFavorites.map(({ word, addedAt }) => (
            <div key={word.id} className="word-list-item">
              <div className="word-list-main">
                <div className="word-list-header">
                  <h3 className="word-list-word">{word.word}</h3>
                  <span className="word-list-ipa">{word.ipa}</span>
                  <button
                    className="btn-icon"
                    onClick={() => handlePronounce(word.word)}
                    aria-label={`Pronounce ${word.word}`}
                    type="button"
                  >
                    🔊
                  </button>
                </div>
                <p className="word-list-translation">{word.translation}</p>
                <div className="word-list-badges">
                  <span className="badge badge-level">{word.level}</span>
                  <span className="badge badge-category">{word.category}</span>
                </div>
              </div>
              <div className="word-list-actions">
                <span className="word-list-date">
                  Added {new Date(addedAt).toLocaleDateString()}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(word.id)}
                  aria-label={`Remove ${word.word} from favorites`}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
