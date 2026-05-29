import { Routes, Route } from 'react-router-dom';
import { useStreak } from './hooks/useStreak';
import { useProgress } from './hooks/useProgress';
import BottomNav from './components/BottomNav';
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
              setIsPro={setIsPro}
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
              setIsPro={setIsPro}
            />
          }
        />
      </Routes>
      <BottomNav />
    </div>
  );
}
