import React from 'react';
import type { ThemeMode } from '../types/userProgress';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: (theme: ThemeMode) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const modes: { value: ThemeMode; icon: string; label: string }[] = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'system', icon: '💻', label: 'System' },
  ];

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme selection">
      {modes.map((mode) => (
        <button
          key={mode.value}
          className={`theme-option ${theme === mode.value ? 'active' : ''}`}
          onClick={() => onToggle(mode.value)}
          role="radio"
          aria-checked={theme === mode.value}
          aria-label={`${mode.label} mode`}
          type="button"
        >
          <span className="theme-icon">{mode.icon}</span>
          <span className="theme-label">{mode.label}</span>
        </button>
      ))}
    </div>
  );
};
