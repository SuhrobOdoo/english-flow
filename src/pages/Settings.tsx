import React, { useEffect, useState, useCallback } from 'react';
import type { UserSettings, DailyWordCount, RotateInterval } from '../types/userProgress';
import type { Category, DifficultyLevel, QuizType } from '../types/vocabulary';
import { CATEGORY_LABELS, DIFFICULTY_LABELS, QUIZ_TYPE_LABELS } from '../types/vocabulary';
import { DEFAULT_SETTINGS } from '../types/userProgress';
import { getUserSettings, saveUserSettings } from '../services/storage';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getUserSettings().then(setSettings);
  }, []);

  const updateSettings = useCallback(async (partial: Partial<UserSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    await saveUserSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [settings]);

  const toggleArrayItem = <T extends string>(arr: T[], item: T): T[] => {
    if (arr.includes(item)) {
      const filtered = arr.filter((i) => i !== item);
      return filtered.length > 0 ? filtered : [item]; // Keep at least one
    }
    return [...arr, item];
  };

  const dailyWordOptions: DailyWordCount[] = [5, 10, 20, 30];
  const rotateOptions: { value: RotateInterval; label: string }[] = [
    { value: 0, label: 'OFF' },
    { value: 10, label: '10 sec' },
    { value: 20, label: '20 sec' },
    { value: 30, label: '30 sec' },
    { value: 60, label: '60 sec' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">⚙️ Settings</h1>
        <p className="page-subtitle">Customize your learning experience</p>
      </div>

      {saved && (
        <div className="save-toast" role="status">
          ✓ Settings saved
        </div>
      )}

      {/* Target Language */}
      <div className="settings-section">
        <h2 className="settings-section-title">Language to Learn</h2>
        <p className="settings-description">Choose which language you want to learn</p>
        <div className="settings-option-group">
          <button
            className={`settings-option ${settings.targetLanguage === 'en' ? 'active' : ''}`}
            onClick={() => updateSettings({ targetLanguage: 'en' })}
            type="button"
          >
            🇬🇧 English
          </button>
          <button
            className={`settings-option ${settings.targetLanguage === 'ru' ? 'active' : ''}`}
            onClick={() => updateSettings({ targetLanguage: 'ru' })}
            type="button"
          >
            🇷🇺 Русский
          </button>
        </div>
      </div>

      {/* Daily Words */}
      <div className="settings-section">
        <h2 className="settings-section-title">Daily Words</h2>
        <p className="settings-description">How many words to learn per day</p>
        <div className="settings-option-group">
          {dailyWordOptions.map((count) => (
            <button
              key={count}
              className={`settings-option ${settings.dailyWords === count ? 'active' : ''}`}
              onClick={() => updateSettings({ dailyWords: count })}
              type="button"
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Levels */}
      <div className="settings-section">
        <h2 className="settings-section-title">Difficulty Level</h2>
        <p className="settings-description">Select one or more levels</p>
        <div className="settings-option-group wrap">
          {(Object.keys(DIFFICULTY_LABELS) as DifficultyLevel[]).map((level) => (
            <button
              key={level}
              className={`settings-option ${settings.difficulties.includes(level) ? 'active' : ''}`}
              onClick={() =>
                updateSettings({
                  difficulties: toggleArrayItem(settings.difficulties, level),
                })
              }
              type="button"
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="settings-section">
        <h2 className="settings-section-title">Categories</h2>
        <p className="settings-description">Select vocabulary categories</p>
        <div className="settings-option-group wrap">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
            <button
              key={cat}
              className={`settings-option ${settings.categories.includes(cat) ? 'active' : ''}`}
              onClick={() =>
                updateSettings({
                  categories: toggleArrayItem(settings.categories, cat),
                })
              }
              type="button"
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Types */}
      <div className="settings-section">
        <h2 className="settings-section-title">Quiz Types</h2>
        <p className="settings-description">Select quiz question types</p>
        <div className="settings-option-group wrap">
          {(Object.keys(QUIZ_TYPE_LABELS) as QuizType[]).map((type) => (
            <button
              key={type}
              className={`settings-option ${settings.quizTypes.includes(type) ? 'active' : ''}`}
              onClick={() =>
                updateSettings({
                  quizTypes: toggleArrayItem(settings.quizTypes, type),
                })
              }
              type="button"
            >
              {QUIZ_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Auto Rotation */}
      <div className="settings-section">
        <h2 className="settings-section-title">Auto Rotation</h2>
        <p className="settings-description">Automatically show next word after a period</p>
        <div className="settings-toggle-row">
          <label className="toggle-label">
            <span>Enable auto rotation</span>
            <button
              className={`toggle-switch ${settings.autoRotate ? 'active' : ''}`}
              onClick={() => updateSettings({ autoRotate: !settings.autoRotate })}
              role="switch"
              aria-checked={settings.autoRotate}
              type="button"
            >
              <span className="toggle-knob" />
            </button>
          </label>
        </div>
        {settings.autoRotate && (
          <div className="settings-option-group">
            {rotateOptions.filter(o => o.value > 0).map((opt) => (
              <button
                key={opt.value}
                className={`settings-option ${settings.rotateInterval === opt.value ? 'active' : ''}`}
                onClick={() => updateSettings({ rotateInterval: opt.value })}
                type="button"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
