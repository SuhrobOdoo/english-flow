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
    <div className="newtab-panel vocabulary-panel" role="article" aria-label={`Vocabulary: ${word.word}`}>
      <div className="panel-inner-scroll">
        {/* Header badges */}
        <div className="card-badges compact">
          <span className="badge badge-category">{CATEGORY_LABELS[word.category]}</span>
          <span className="badge badge-level">{word.level}</span>
        </div>

        {/* Main word and actions */}
        <div className="card-word-header">
          <div>
            <h1 className="card-word compact">{word.word}</h1>
            <div className="card-ipa">{word.ipa}</div>
          </div>
          <div className="card-actions-compact">
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
            <AudioButton word={word.word} />
          </div>
        </div>

        <div className="card-translation compact">{word.translation}</div>

      {/* Examples */}
      <div className="card-section compact-section">
        <h2 className="card-section-title">Examples</h2>
        <ul className="card-examples">
          {word.examples.map((example, i) => (
            <li key={i} className="card-example compact">
              <span className="example-quote">"</span>
              {example}
              <span className="example-quote">"</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Usage */}
      {word.usage && (
        <div className="card-section compact-section">
          <h2 className="card-section-title">Usage</h2>
          <p className="card-usage compact">{word.usage}</p>
        </div>
      )}

      {/* Synonyms & Antonyms */}
      <div className="card-meta-row compact">
        {word.synonyms.length > 0 && (
          <div className="card-section card-meta compact-section">
            <h2 className="card-section-title">Synonyms</h2>
            <div className="card-tags">
              {word.synonyms.map((s, i) => (
                <span key={i} className="tag tag-synonym">{s}</span>
              ))}
            </div>
          </div>
        )}
        {word.antonyms.length > 0 && (
          <div className="card-section card-meta compact-section">
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
    </div>
  );
};
