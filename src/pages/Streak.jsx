import { useNavigate } from 'react-router-dom';

const MILESTONES = [7, 30, 100];

function Ring({ radius, strokeWidth, progress, color }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(progress, 1));
  return (
    <svg
      width={(radius + strokeWidth) * 2}
      height={(radius + strokeWidth) * 2}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)' }}
    >
      <circle
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  );
}

export default function Streak({ streak, longestStreak, totalDays, freezesAvailable, isPro, streakFrozenToday }) {
  const navigate = useNavigate();

  const nextMilestone = MILESTONES.find(m => streak < m) || 365;
  const prevMilestone = MILESTONES.filter(m => streak >= m).pop() || 0;
  const progress = nextMilestone > prevMilestone
    ? (streak - prevMilestone) / (nextMilestone - prevMilestone)
    : 1;

  const flameSize = streak === 0 ? 64 : streak >= 30 ? 96 : streak >= 7 ? 80 : 72;

  const getMessage = () => {
    if (streak === 0) return "Start your streak today";
    if (streak === 1) return "Day 1 — you showed up 🎯";
    if (streak < 7) return `${7 - streak} days to your first milestone`;
    if (streak === 7) return "7-day milestone reached! 🏆";
    if (streak < 30) return `${30 - streak} days to 30-day milestone`;
    if (streak === 30) return "30 days. Unstoppable. 🔥";
    if (streak < 100) return `${100 - streak} days to legend status`;
    return "Legend status. 100+ days. 🔥";
  };

  return (
    <div className="page" style={{ background: '#0B1F3A' }}>
      <div style={{ padding: '52px 20px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#FAF7F0', letterSpacing: -0.5 }}>
          Your Streak
        </div>
        <div style={{ fontSize: 13, color: '#6B7E99', marginTop: 2 }}>
          Keep showing up. Consistency compounds.
        </div>
      </div>

      {/* Flame + ring */}
      <div className="fade-up" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '32px 20px 24px',
      }}>
        <div style={{
          position: 'relative',
          width: 180, height: 180,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Ring radius={76} strokeWidth={8} progress={progress} color="#C9A84C" />

          <div style={{
            fontSize: flameSize,
            animation: streak > 0 ? 'flame-pulse 2.5s ease-in-out infinite' : 'none',
            filter: streak > 0 ? 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' : 'grayscale(1)',
          }}>
            🔥
          </div>
        </div>

        {/* Streak count */}
        <div style={{
          fontSize: 64, fontWeight: 900, color: '#FAF7F0',
          letterSpacing: -2, lineHeight: 1, marginTop: 8,
        }}>
          {streak}
        </div>
        <div style={{ fontSize: 14, color: '#6B7E99', fontWeight: 600, marginTop: 4 }}>
          day{streak !== 1 ? 's' : ''} in a row
        </div>
        <div style={{
          marginTop: 8, fontSize: 14, color: '#C9A84C', fontWeight: 600,
          textAlign: 'center', maxWidth: 240,
        }}>
          {getMessage()}
        </div>

        {/* Milestone progress */}
        {streak < 100 && (
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#6B7E99' }}>
              {Math.round(progress * 100)}% to {nextMilestone}-day milestone
            </div>
          </div>
        )}
      </div>

      {/* Milestones */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 10 }}>
          MILESTONES
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {MILESTONES.map(m => {
            const achieved = streak >= m;
            return (
              <div key={m} style={{
                flex: 1,
                background: achieved ? 'rgba(201,168,76,0.12)' : '#1E2D42',
                border: `1px solid ${achieved ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 14, padding: '14px 10px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>
                  {achieved ? '🏆' : m === 7 ? '⭐' : m === 30 ? '🥇' : '👑'}
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: achieved ? '#C9A84C' : '#FAF7F0' }}>
                  {m}
                </div>
                <div style={{ fontSize: 10, color: '#6B7E99', fontWeight: 600, marginTop: 2 }}>
                  days
                </div>
                {achieved && (
                  <div style={{ fontSize: 10, color: '#2ECC7A', fontWeight: 700, marginTop: 4 }}>
                    ACHIEVED ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 10 }}>
          ALL-TIME STATS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Current Streak', value: streak, unit: 'days', emoji: '🔥' },
            { label: 'Longest Streak', value: longestStreak, unit: 'days', emoji: '🏆' },
            { label: 'Total Days', value: totalDays, unit: 'opened', emoji: '📅' },
            { label: 'Streak Freezes', value: freezesAvailable, unit: isPro ? 'available' : 'Pro only', emoji: '🧊' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#1E2D42',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '14px',
              opacity: !isPro && s.label === 'Streak Freezes' ? 0.5 : 1,
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#FAF7F0' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6B7E99', marginTop: 2 }}>{s.unit}</div>
              <div style={{ fontSize: 11, color: '#8A9DB8', fontWeight: 600, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak frozen notice */}
      {streakFrozenToday && (
        <div style={{
          margin: '16px 20px',
          background: 'rgba(91,184,255,0.1)', border: '1px solid rgba(91,184,255,0.3)',
          borderRadius: 12, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>🧊</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#5BB8FF' }}>Streak Protected!</div>
            <div style={{ fontSize: 12, color: '#8A9DB8' }}>A freeze was used. Your streak is safe.</div>
          </div>
        </div>
      )}

      {/* Freeze upgrade */}
      {!isPro && (
        <div style={{ padding: '16px 20px 24px' }}>
          <button
            onClick={() => navigate('/profile')}
            style={{
              width: '100%',
              background: 'rgba(91,184,255,0.08)', border: '1px solid rgba(91,184,255,0.25)',
              borderRadius: 14, padding: '14px',
              color: '#5BB8FF', fontSize: 13, fontWeight: 700,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <span>🧊</span> Upgrade to Pro for Streak Freezes
          </button>
        </div>
      )}
    </div>
  );
}
