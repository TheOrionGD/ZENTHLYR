import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state: default dark for authentic visionOS
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('zenthlyr_theme') || 'dark';
  });

  // Download History
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('zenthlyr_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User Preferences
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('zenthlyr_prefs');
      return saved ? JSON.parse(saved) : {
        autoDownloadSeconds: 3,
        autoDownloadEnabled: true,
        defaultQuality: 'highest', // 'highest', '1080p', '720p', 'audio_only'
        autoClipboardDetect: true,
        spatialSoundEffects: true,
        highContrastSpecular: true
      };
    } catch {
      return {
        autoDownloadSeconds: 3,
        autoDownloadEnabled: true,
        defaultQuality: 'highest',
        autoClipboardDetect: true,
        spatialSoundEffects: true,
        highContrastSpecular: true
      };
    }
  });

  // Selected filter platform in platform matrix
  const [activePlatformFilter, setActivePlatformFilter] = useState('all');

  // Active analysis results
  const [currentMedia, setCurrentMedia] = useState(null);

  // Sync Theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('zenthlyr_theme', theme);
  }, [theme]);

  // Sync History
  useEffect(() => {
    localStorage.setItem('zenthlyr_history', JSON.stringify(history));
  }, [history]);

  // Sync Preferences
  useEffect(() => {
    localStorage.setItem('zenthlyr_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToHistory = (mediaItem) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.url !== mediaItem.url);
      return [
        {
          ...mediaItem,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
        },
        ...filtered
      ].slice(0, 50); // limit to last 50 items
    });
  };

  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        history,
        addToHistory,
        removeFromHistory,
        clearHistory,
        preferences,
        updatePreferences,
        activePlatformFilter,
        setActivePlatformFilter,
        currentMedia,
        setCurrentMedia
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
