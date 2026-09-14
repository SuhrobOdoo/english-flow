import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import type { ThemeMode } from '../types/userProgress';

export type Page = 'home' | 'progress' | 'favorites' | 'history' | 'settings';

interface HeaderProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-content">
        <div className="header-brand">
          <span className="brand-icon">🌊</span>
          <h1 className="brand-name">English Flow</h1>
        </div>
        <ThemeToggle theme={theme} onToggle={onThemeChange} />
      </div>
    </header>
  );
};
