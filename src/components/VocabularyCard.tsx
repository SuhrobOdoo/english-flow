import React from 'react';
import type { VocabularyWord } from '../types/vocabulary';
import { CATEGORY_LABELS } from '../types/vocabulary';
import { AudioButton } from './AudioButton';
import { FavoriteButton } from './FavoriteButton';

interface VocabularyCardProps {
  word: VocabularyWord;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="vocabulary-card" role="article" aria-label={`Vocabulary: ${word.word}`}>
      {/* Header badges */}
      <div className="card-badges">
        <span className="badge badge-category">{CATEGORY_LABELS[word.category]}</span>
        <span className="badge badge-level">{word.level}</span>
        <span className="badge badge-pos">{word.partOfSpeech}</span>
      </div>

      {/* Main word */}
      <div className="card-word-section">
        <h1 className="card-word">{word.word}</h1>
        <div className="card-ipa">{word.ipa}</div>
        <div className="card-translation">{word.translation}</div>
      </div>

      {/* Action buttons */}
      <div className="card-actions">
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
        <AudioButton word={word.word} />
      </div>

      {/* Examples */}
      <div className="card-section">
        <h2 className="card-section-title">Examples</h2>
        <ul className="card-examples">
          {word.examples.map((example, i) => (
            <li key={i} className="card-example">
              <span className="example-quote">"</span>
              {example}
              <span className="example-quote">"</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Usage */}
      {word.usage && (
        <div className="card-section">
          <h2 className="card-section-title">Usage</h2>
          <p className="card-usage">{word.usage}</p>
        </div>
      )}

      {/* Synonyms & Antonyms */}
      <div className="card-meta-row">
        {word.synonyms.length > 0 && (
          <div className="card-section card-meta">
            <h2 className="card-section-title">Synonyms</h2>
            <div className="card-tags">
              {word.synonyms.map((s, i) => (
                <span key={i} className="tag tag-synonym">{s}</span>
              ))}
            </div>
          </div>
        )}
        {word.antonyms.length > 0 && (
          <div className="card-section card-meta">
            <h2 className="card-section-title">Antonyms</h2>
            <div className="card-tags">
              {word.antonyms.map((a, i) => (
                <span key={i} className="tag tag-antonym">{a}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
