import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStreak } from './hooks/useStreak';
import { useProgress } from './hooks/useProgress';
import BottomNav from './components/BottomNav';
import ProModal from './components/ProModal';
import Home from './pages/Home';
import ToolBreakdown from './pages/ToolBreakdown';
import Library from './pages/Library';
import Streak from './pages/Streak';
import Profile from './pages/Profile';

export default function App() {
  const {
    streak, longestStreak, totalDays,
    freezesAvailable, isPro, setIsPro, streakFrozenToday,
    nextMilestone, milestoneProgress,
  } = useStreak();

  const {
    completedCount, viewedCount,
    markComplete, markViewed,
    isCompleted, isViewed,
  } = useProgress();

  const [proModalOpen, setProModalOpen] = useState(false);
  const openProModal = () => setProModalOpen(true);

  return (
    <div className="app-shell">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              streak={streak}
              markViewed={markViewed}
            />
          }
        />
        <Route
          path="/tool/:day"
          element={
            <ToolBreakdown
              isPro={isPro}
              markComplete={markComplete}
              isCompleted={isCompleted}
              markViewed={markViewed}
              openProModal={openProModal}
            />
          }
        />
        <Route
          path="/library"
          element={
            <Library
              isPro={isPro}
              isCompleted={isCompleted}
              isViewed={isViewed}
              openProModal={openProModal}
            />
          }
        />
        <Route
          path="/streak"
          element={
            <Streak
              streak={streak}
              longestStreak={longestStreak}
              totalDays={totalDays}
              freezesAvailable={freezesAvailable}
              isPro={isPro}
              streakFrozenToday={streakFrozenToday}
              openProModal={openProModal}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              streak={streak}
              longestStreak={longestStreak}
              totalDays={totalDays}
              completedCount={completedCount}
              viewedCount={viewedCount}
              freezesAvailable={freezesAvailable}
              isPro={isPro}
              openProModal={openProModal}
            />
          }
        />
      </Routes>
      <BottomNav />

      {proModalOpen && (
        <ProModal
          onClose={() => setProModalOpen(false)}
          onUnlock={() => setIsPro(true)}
        />
      )}
    </div>
  );
}
