import React, { useState, useEffect } from 'react';

import type { GrammarRule } from '../data/grammar';
import { englishGrammarRules, russianGrammarRules } from '../data/grammar';

interface GrammarPanelProps {
  triggerRefresh?: string;
  targetLanguage: 'en' | 'ru';
}

export const GrammarPanel: React.FC<GrammarPanelProps> = ({ triggerRefresh, targetLanguage }) => {
  const rules = targetLanguage === 'ru' ? russianGrammarRules : englishGrammarRules;
  const [rule, setRule] = useState<GrammarRule>(rules[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Pick a random rule from the correct language array
    const currentRules = targetLanguage === 'ru' ? russianGrammarRules : englishGrammarRules;
    const randomIndex = Math.floor(Math.random() * currentRules.length);
    setRule(currentRules[randomIndex]);
  }, [triggerRefresh, targetLanguage]);

  return (
    <div className="newtab-panel grammar-panel">
      <div className="panel-inner-scroll">
        <h2 className="card-section-title">GRAMMAR</h2>
        <h1 className="card-word compact" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{rule.title}</h1>
        
        <p className="card-usage compact" style={{ marginBottom: '12px', background: 'transparent', padding: '0', fontSize: '0.9rem' }}>
          {rule.description}
        </p>

        <div className="card-section compact-section">
          <h2 className="card-section-title">Structure</h2>
          <div className="card-translation compact" style={{ background: 'var(--accent-info-light)', color: 'var(--accent-info)', marginBottom: '0' }}>
            {rule.structure}
          </div>
        </div>

        <div className="card-section compact-section">
          <h2 className="card-section-title">Examples</h2>
          <ul className="card-examples">
            {rule.examples.map((example, i) => (
              <li key={i} className="card-example compact" style={{ borderLeftColor: 'var(--accent-info)' }}>
                {example}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-section compact-section" style={{ marginTop: 'auto', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '8px' }}>
          <h2 className="card-section-title" style={{ color: 'var(--accent-primary)' }}>KEY POINT</h2>
          <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{rule.keyPoint}</p>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ width: '100%' }}
            onClick={() => setIsModalOpen(true)}
          >
            More →
          </button>
        </div>
      </div>
      
      {/* Grammar Detail Modal Overlay */}
      {isModalOpen && (
        <div className="grammar-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="grammar-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="grammar-modal-header">
              <h2>{rule.title}</h2>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <div className="grammar-modal-body">
              <p className="grammar-modal-desc">{rule.description}</p>
              
              <div className="grammar-modal-section">
                <h3>Structure</h3>
                <div className="grammar-modal-structure">{rule.structure}</div>
              </div>
              
              <div className="grammar-modal-section">
                <h3>Detailed Explanation</h3>
                <p>{rule.detailedExplanation}</p>
              </div>

              <div className="grammar-modal-section">
                <h3>Examples</h3>
                <ul className="grammar-modal-examples">
                  {rule.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>

              <div className="grammar-modal-key">
                <strong>Key Point:</strong> {rule.keyPoint}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
