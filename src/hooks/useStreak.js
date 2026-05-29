import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  streak: 'mgd_streak',
  lastVisit: 'mgd_lastVisit',
  longestStreak: 'mgd_longestStreak',
  totalDays: 'mgd_totalDays',
  freezesAvailable: 'mgd_freezesAvailable',
  lastFreezeDeposit: 'mgd_lastFreezeDeposit',
  isPro: 'mgd_isPro',
};

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const yesterdayStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const get = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

const set = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

export function useStreak() {
  const [streak, setStreak] = useState(() => get(STORAGE_KEYS.streak, 0));
  const [longestStreak, setLongestStreak] = useState(() => get(STORAGE_KEYS.longestStreak, 0));
  const [totalDays, setTotalDays] = useState(() => get(STORAGE_KEYS.totalDays, 0));
  const [freezesAvailable, setFreezesAvailable] = useState(() => get(STORAGE_KEYS.freezesAvailable, 0));
  const [isPro, setIsProState] = useState(() => get(STORAGE_KEYS.isPro, false));
  const [streakFrozenToday, setStreakFrozenToday] = useState(false);

  const recordVisit = useCallback(() => {
    const today = todayStr();
    const yesterday = yesterdayStr();
    const lastVisit = get(STORAGE_KEYS.lastVisit, null);

    if (lastVisit === today) return; // already counted today

    let newStreak;
    let frozen = false;

    if (lastVisit === yesterday) {
      // consecutive day
      newStreak = streak + 1;
    } else if (lastVisit === null) {
      // first visit ever
      newStreak = 1;
    } else {
      // missed a day — check for freeze
      const currentFreezes = get(STORAGE_KEYS.freezesAvailable, 0);
      if (isPro && currentFreezes > 0) {
        newStreak = streak; // preserve streak
        const newFreezes = currentFreezes - 1;
        set(STORAGE_KEYS.freezesAvailable, newFreezes);
        setFreezesAvailable(newFreezes);
        frozen = true;
      } else {
        newStreak = 1; // reset
      }
    }

    const newTotal = totalDays + 1;
    const newLongest = Math.max(longestStreak, newStreak);

    set(STORAGE_KEYS.streak, newStreak);
    set(STORAGE_KEYS.lastVisit, today);
    set(STORAGE_KEYS.longestStreak, newLongest);
    set(STORAGE_KEYS.totalDays, newTotal);

    setStreak(newStreak);
    setLongestStreak(newLongest);
    setTotalDays(newTotal);
    setStreakFrozenToday(frozen);
  }, [streak, longestStreak, totalDays, isPro]);

  const setIsPro = useCallback((val) => {
    set(STORAGE_KEYS.isPro, val);
    setIsProState(val);
    if (val) {
      const current = get(STORAGE_KEYS.freezesAvailable, 0);
      if (current === 0) {
        set(STORAGE_KEYS.freezesAvailable, 1);
        setFreezesAvailable(1);
      }
    }
  }, []);

  // Deposit weekly freeze for pro users
  useEffect(() => {
    if (!isPro) return;
    const today = todayStr();
    const lastDeposit = get(STORAGE_KEYS.lastFreezeDeposit, null);
    if (lastDeposit === today) return;

    const d = new Date();
    if (d.getDay() === 1) { // Monday = new week
      const current = get(STORAGE_KEYS.freezesAvailable, 0);
      const newVal = Math.min(current + 1, 3); // cap at 3
      set(STORAGE_KEYS.freezesAvailable, newVal);
      set(STORAGE_KEYS.lastFreezeDeposit, today);
      setFreezesAvailable(newVal);
    }
  }, [isPro]);

  // Record visit on mount
  useEffect(() => {
    recordVisit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const milestones = [7, 30, 100];
  const nextMilestone = milestones.find(m => streak < m) || 100;
  const prevMilestone = milestones.filter(m => streak >= m).pop() || 0;
  const milestoneProgress = nextMilestone > prevMilestone
    ? (streak - prevMilestone) / (nextMilestone - prevMilestone)
    : 1;

  return {
    streak,
    longestStreak,
    totalDays,
    freezesAvailable,
    isPro,
    setIsPro,
    streakFrozenToday,
    nextMilestone,
    milestoneProgress,
  };
}
