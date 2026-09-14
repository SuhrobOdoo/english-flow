import React, { useState, useEffect } from 'react';

interface GrammarRule {
  id: string;
  title: string;
  description: string;
  structure: string;
  examples: string[];
  keyPoint: string;
}

const grammarRules: GrammarRule[] = [
  {
    id: 'present_perfect',
    title: 'Present Perfect',
    description: 'We use Present Perfect for experiences, recent actions, and actions connected to the present.',
    structure: 'have / has + V3 (past participle)',
    examples: [
      'I have postponed the meeting.',
      'She has already finished the task.'
    ],
    keyPoint: 'Focus is on the result now, not when it happened.'
  },
  {
    id: 'past_simple',
    title: 'Past Simple',
    description: 'Used for completed actions in the past at a specific time.',
    structure: 'V2 (past tense) or did + V1',
    examples: [
      'I postponed the meeting yesterday.',
      'Did she finish the task?'
    ],
    keyPoint: 'Always refers to a finished time period.'
  },
  {
    id: 'present_continuous',
    title: 'Present Continuous',
    description: 'Used for actions happening right now, or temporary situations.',
    structure: 'am / is / are + V-ing',
    examples: [
      'I am working on the project now.',
      'They are studying English this month.'
    ],
    keyPoint: 'Highlights temporary or ongoing actions.'
  },
  {
    id: 'gerund_vs_infinitive',
    title: 'Gerund vs Infinitive',
    description: 'Some verbs are followed by V-ing (gerund), others by to + V1 (infinitive).',
    structure: 'Verb + V-ing / Verb + to + V1',
    examples: [
      'I enjoy reading. (enjoy + gerund)',
      'I want to read. (want + infinitive)'
    ],
    keyPoint: 'Memorize the common verbs for each group.'
  },
  {
    id: 'first_conditional',
    title: 'First Conditional',
    description: 'Used for real or possible situations in the future.',
    structure: 'If + Present Simple, will + V1',
    examples: [
      'If it rains, we will stay home.',
      'If you study hard, you will pass.'
    ],
    keyPoint: 'Condition must happen first for the result to occur.'
  },
  {
    id: 'passive_voice',
    title: 'Passive Voice',
    description: 'Focuses on the action and the object, rather than who did it.',
    structure: 'be + V3 (past participle)',
    examples: [
      'The meeting was postponed.',
      'The house is being cleaned.'
    ],
    keyPoint: 'Use when the actor is unknown or unimportant.'
  }
];

interface GrammarPanelProps {
  triggerRefresh?: string; // Change to trigger a new random rule
}

export const GrammarPanel: React.FC<GrammarPanelProps> = ({ triggerRefresh }) => {
  const [rule, setRule] = useState<GrammarRule>(grammarRules[0]);

  useEffect(() => {
    // Pick a random rule
    const randomIndex = Math.floor(Math.random() * grammarRules.length);
    setRule(grammarRules[randomIndex]);
  }, [triggerRefresh]);

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
          <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>More →</button>
        </div>
      </div>
    </div>
  );
};
