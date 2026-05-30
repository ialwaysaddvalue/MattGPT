import { useState, useCallback } from 'react';

const STORAGE_KEYS = {
  completed: 'mgd_completed',
  viewed: 'mgd_viewed',
  completedDates: 'mgd_completed_dates',
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

const getMap = (key) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : {};
  } catch {
    return {};
  }
};

const saveMap = (key, m) => {
  try { localStorage.setItem(key, JSON.stringify(m)); } catch {}
};

export function useProgress() {
  const [completedDays, setCompletedDays] = useState(() => getSet(STORAGE_KEYS.completed));
  const [viewedDays, setViewedDays] = useState(() => getSet(STORAGE_KEYS.viewed));
  const [completedDates, setCompletedDates] = useState(() => getMap(STORAGE_KEYS.completedDates));

  const markComplete = useCallback((dayNumber) => {
    setCompletedDays(prev => {
      const next = new Set(prev);
      next.add(dayNumber);
      saveSet(STORAGE_KEYS.completed, next);
      return next;
    });
    setCompletedDates(prev => {
      if (prev[dayNumber]) return prev;
      const next = { ...prev, [dayNumber]: new Date().toISOString() };
      saveMap(STORAGE_KEYS.completedDates, next);
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
  const getCompletedDate = useCallback((dayNumber) => completedDates[dayNumber] || null, [completedDates]);

  return {
    completedCount: completedDays.size,
    viewedCount: viewedDays.size,
    markComplete,
    markViewed,
    isCompleted,
    isViewed,
    getCompletedDate,
    completedDates,
  };
}
