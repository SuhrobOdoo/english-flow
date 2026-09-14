import React from 'react';
import type { Page } from './Header';

interface NavigationProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { page: Page; icon: string; label: string }[] = [
  { page: 'home', icon: '🏠', label: 'Home' },
  { page: 'progress', icon: '📊', label: 'Progress' },
  { page: 'favorites', icon: '⭐', label: 'Favorites' },
  { page: 'history', icon: '📋', label: 'History' },
  { page: 'settings', icon: '⚙️', label: 'Settings' },
];

export const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  return (
    <nav className="app-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-items">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            className={`nav-item ${activePage === item.page ? 'active' : ''}`}
            onClick={() => onNavigate(item.page)}
            aria-current={activePage === item.page ? 'page' : undefined}
            aria-label={item.label}
            type="button"
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
