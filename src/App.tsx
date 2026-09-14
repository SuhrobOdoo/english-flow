import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import type { Page } from './components/Header';
import { NewTab } from './pages/NewTab';
import { Progress } from './pages/Progress';
import { Favorites } from './pages/Favorites';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const { theme, setTheme } = useTheme();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <NewTab />;
      case 'progress':
        return <Progress />;
      case 'favorites':
        return <Favorites />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <NewTab />;
    }
  };

  return (
    <div className="app">
      <Header theme={theme} onThemeChange={setTheme} />
      <main className="app-main" role="main">
        {renderPage()}
      </main>
      <Navigation activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
};

export default App;
