import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodaysTool, CATEGORY_COLORS, CATEGORY_ICONS, TOOLS } from '../data/tools';

const LAUNCH = new Date(2026, 4, 29);
function getDayNumber() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.floor((today - LAUNCH) / (1000 * 60 * 60 * 24));
  return ((diff % 60) + 60) % 60 + 1;
}

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Home({ streak, markViewed }) {
  const navigate = useNavigate();
  const tool = getTodaysTool();
  const dayNumber = getDayNumber();

  useEffect(() => {
    if (tool) markViewed(tool.day);
  }, [tool, markViewed]);

  if (!tool) return null;

  const now = new Date();
  const dateStr = `${MONTH_NAMES[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const color = CATEGORY_COLORS[tool.category];
  const icon = CATEGORY_ICONS[tool.category];

  // Pick a few "coming up" tools
  const upcoming = [];
  for (let i = 1; i <= 3; i++) {
    const idx = ((dayNumber - 1 + i) % 60);
    upcoming.push(TOOLS[idx]);
  }

  return (
    <div className="page" style={{ background: '#0B1F3A' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '52px 20px 0',
      }}>
        <div>
          <div style={{ fontSize: 11, color: '#6B7E99', fontWeight: 700, letterSpacing: 1 }}>
            {dateStr.toUpperCase()}
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#FAF7F0', letterSpacing: -0.5 }}>
            MattGPT Daily
          </div>
        </div>
        <button
          onClick={() => navigate('/streak')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 24, padding: '8px 14px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 18, animation: streak > 0 ? 'flame-pulse 2s ease-in-out infinite' : 'none' }}>🔥</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#C9A84C' }}>{streak}</span>
        </button>
      </div>

      {/* Day label */}
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          background: `${color}18`, border: `1px solid ${color}40`,
          borderRadius: 20, padding: '4px 12px',
          fontSize: 11, fontWeight: 700, color, letterSpacing: 0.5,
        }}>
          {icon} {tool.category}
        </div>
        <div style={{ fontSize: 11, color: '#6B7E99', fontWeight: 600 }}>
          Day {dayNumber} of 60
        </div>
      </div>

      {/* Main Tool Card */}
      <div
        className="fade-up fade-up-1"
        onClick={() => navigate(`/tool/${tool.day}`)}
        style={{
          margin: '12px 20px 0',
          background: '#1E2D42',
          border: `1px solid ${color}30`,
          borderRadius: 20,
          padding: '24px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow accent */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Tool name */}
        <div style={{
          fontSize: 28, fontWeight: 900, color: '#FAF7F0',
          letterSpacing: -0.5, marginBottom: 6,
        }}>
          {tool.name}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 15, color: color, fontWeight: 600,
          marginBottom: 16, lineHeight: 1.4,
        }}>
          {tool.tagline}
        </div>

        {/* What it does preview */}
        <div style={{
          fontSize: 14, color: '#8A9DB8', lineHeight: 1.6,
          marginBottom: 20,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {tool.whatItDoes}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: color, borderRadius: 12,
          padding: '13px 18px', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#0B1F3A' }}>
            Read Breakdown
          </span>
          <span style={{ fontSize: 14, color: '#0B1F3A' }}>→</span>
        </div>
      </div>

      {/* Try it today quick glance */}
      <div
        className="fade-up fade-up-2"
        style={{
          margin: '12px 20px 0',
          background: '#1E2D42',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: '16px 18px',
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 8 }}>
          TODAY'S 5-MINUTE CHALLENGE
        </div>
        <div style={{ fontSize: 14, color: '#BFD0E8', lineHeight: 1.6 }}>
          {tool.tryItToday}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/tool/${tool.day}`); }}
          style={{
            marginTop: 12, background: 'transparent',
            border: `1px solid ${color}40`, borderRadius: 10,
            padding: '9px 14px', color, fontSize: 13, fontWeight: 700,
            cursor: 'pointer', width: '100%',
          }}
        >
          Mark Challenge Complete →
        </button>
      </div>

      {/* Coming up */}
      <div className="fade-up fade-up-3" style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 10 }}>
          COMING UP
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {upcoming.map((t, i) => {
            const c = CATEGORY_COLORS[t.category];
            return (
              <div
                key={i}
                onClick={() => navigate(`/tool/${t.day}`)}
                style={{
                  flex: 1, background: '#1E2D42',
                  border: `1px solid ${c}20`, borderRadius: 12,
                  padding: '12px 10px', cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 14, marginBottom: 4 }}>{CATEGORY_ICONS[t.category]}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#FAF7F0', marginBottom: 2 }}>{t.name}</div>
                <div style={{ fontSize: 10, color: c, fontWeight: 600 }}>Day {t.day}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* URL link */}
      <div className="fade-up fade-up-4" style={{ padding: '16px 20px 24px' }}>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '12px 16px',
            color: '#8A9DB8', fontSize: 13,
            textDecoration: 'none',
          }}
        >
          <span>{tool.url.replace('https://', '')}</span>
          <span style={{ color: '#C9A84C' }}>↗</span>
        </a>
      </div>
    </div>
  );
}
