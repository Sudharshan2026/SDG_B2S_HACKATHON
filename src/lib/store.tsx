'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Panel } from './types';

interface AppState {
  panel: Panel;
  setPanel: (p: Panel) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const AppContext = createContext<AppState | null>(null);

const BOOKMARK_KEY = 'hometown-bookmarks';

export function AppProvider({ children }: { children: ReactNode }) {
  const [panel, setPanelState] = useState<Panel>('user');
  const [bookmarks, setBookmarksState] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const s = localStorage.getItem(BOOKMARK_KEY);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const setBookmarks = useCallback((ids: string[]) => {
    setBookmarksState(ids);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids));
      } catch (_) {}
    }
  }, []);

  const toggleBookmark = useCallback(
    (id: string) => {
      setBookmarks(
        bookmarks.includes(id) ? bookmarks.filter((b) => b !== id) : [...bookmarks, id]
      );
    },
    [bookmarks, setBookmarks]
  );

  const setPanel = useCallback((p: Panel) => {
    setPanelState(p);
  }, []);

  return (
    <AppContext.Provider value={{ panel, setPanel, bookmarks, toggleBookmark }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
