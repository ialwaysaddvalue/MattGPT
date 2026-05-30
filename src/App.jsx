import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useStreak } from './hooks/useStreak';
import { useProgress } from './hooks/useProgress';
import BottomNav from './components/BottomNav';
import ProModal from './components/ProModal';
import Home from './pages/Home';
import ToolBreakdown from './pages/ToolBreakdown';
import Library from './pages/Library';
import Streak from './pages/Streak';
import Profile from './pages/Profile';
import History from './pages/History';
import Privacy from './pages/Privacy';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page" style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 40, textAlign: 'center',
    }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
      <div style={{ fontSize: 20, fontWeight: 900, color: '#FAF7F0', marginBottom: 8 }}>
        Page Not Found
      </div>
      <div style={{ fontSize: 14, color: '#6B7E99', marginBottom: 24 }}>
        That route doesn't exist.
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#C9A84C', color: '#0B1F3A',
          border: 'none', borderRadius: 12, padding: '12px 22px',
          fontSize: 14, fontWeight: 800, cursor: 'pointer',
        }}
      >
        Go to Today's Tool
      </button>
    </div>
  );
}

export default function App() {
  const {
    streak, longestStreak, totalDays,
    freezesAvailable, isPro, setIsPro, streakFrozenToday,
  } = useStreak();

  const {
    completedCount, viewedCount,
    markComplete, markViewed,
    isCompleted, isViewed,
    getCompletedDate,
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
              isPro={isPro}
              openProModal={openProModal}
            />
          }
        />
        <Route
          path="/history"
          element={
            <History
              isPro={isPro}
              isCompleted={isCompleted}
              getCompletedDate={getCompletedDate}
              openProModal={openProModal}
            />
          }
        />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
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
