import { useState, useCallback } from 'react';

const STORAGE_KEYS = {
  completed: 'mgd_completed',
  viewed: 'mgd_viewed',
};

const getSet = (key) => {
  try {
    const v = localStorage.getItem(key);
    return v ? new Set(JSON.parse(v)) : new Set();
  } catch {
    return new Set();
  }
};

const saveSet = (key, s) => {
  try { localStorage.setItem(key, JSON.stringify([...s])); } catch {}
};

export function useProgress() {
  const [completedDays, setCompletedDays] = useState(() => getSet(STORAGE_KEYS.completed));
  const [viewedDays, setViewedDays] = useState(() => getSet(STORAGE_KEYS.viewed));

  const markComplete = useCallback((dayNumber) => {
    setCompletedDays(prev => {
      const next = new Set(prev);
      next.add(dayNumber);
      saveSet(STORAGE_KEYS.completed, next);
      return next;
    });
  }, []);

  const markViewed = useCallback((dayNumber) => {
    setViewedDays(prev => {
      if (prev.has(dayNumber)) return prev;
      const next = new Set(prev);
      next.add(dayNumber);
      saveSet(STORAGE_KEYS.viewed, next);
      return next;
    });
  }, []);

  const isCompleted = useCallback((dayNumber) => completedDays.has(dayNumber), [completedDays]);
  const isViewed = useCallback((dayNumber) => viewedDays.has(dayNumber), [viewedDays]);

  return {
    completedCount: completedDays.size,
    viewedCount: viewedDays.size,
    markComplete,
    markViewed,
    isCompleted,
    isViewed,
  };
}
