import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToolByDay, getTodaysTool, CATEGORY_COLORS, CATEGORY_ICONS } from '../data/tools';

export default function ToolBreakdown({ isPro, markComplete, isCompleted, markViewed }) {
  const { day } = useParams();
  const navigate = useNavigate();
  const tool = getToolByDay(day);
  const todayTool = getTodaysTool();
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    if (tool) markViewed(tool.day);
  }, [tool, markViewed]);

  if (!tool) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ color: '#6B7E99', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div>Tool not found</div>
        </div>
      </div>
    );
  }

  const color = CATEGORY_COLORS[tool.category];
  const icon = CATEGORY_ICONS[tool.category];
  const isToday = todayTool?.day === tool.day;
  const completed = isCompleted(tool.day);

  const handleComplete = () => {
    markComplete(tool.day);
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 2000);
  };

  const Section = ({ label, children, locked }) => (
    <div style={{
      background: '#1E2D42',
      border: `1px solid rgba(255,255,255,0.06)`,
      borderRadius: 16, padding: '18px',
      marginBottom: 10,
      position: 'relative',
      overflow: locked ? 'hidden' : 'visible',
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{
        fontSize: 14, color: '#BFD0E8', lineHeight: 1.7,
        filter: locked ? 'blur(5px)' : 'none',
        userSelect: locked ? 'none' : 'auto',
      }}>
        {children}
      </div>
      {locked && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(11,31,58,0.85)',
          borderRadius: 16,
        }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🔒</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#FAF7F0', marginBottom: 4 }}>Pro Tip — Upgrade to Unlock</div>
          <button
            onClick={() => navigate('/profile')}
            style={{
              background: '#C9A84C', color: '#0B1F3A',
              border: 'none', borderRadius: 10, padding: '8px 16px',
              fontSize: 12, fontWeight: 800, cursor: 'pointer', marginTop: 4,
            }}
          >
            Go Pro — $4.99/mo
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="page" style={{ background: '#0B1F3A' }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '52px 20px 12px',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.06)', border: 'none',
            borderRadius: 10, width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FAF7F0', fontSize: 16, cursor: 'pointer', flexShrink: 0,
          }}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              background: `${color}18`, border: `1px solid ${color}40`,
              borderRadius: 20, padding: '3px 10px',
              fontSize: 11, fontWeight: 700, color, letterSpacing: 0.5,
            }}>
              {icon} {tool.category}
            </span>
            {isToday && (
              <span style={{
                background: 'rgba(46,204,122,0.12)', border: '1px solid rgba(46,204,122,0.3)',
                borderRadius: 20, padding: '3px 10px',
                fontSize: 11, fontWeight: 700, color: '#2ECC7A',
              }}>
                Today
              </span>
            )}
          </div>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 10, padding: '8px 12px',
            fontSize: 12, fontWeight: 700, color: '#C9A84C',
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Open ↗
        </a>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Tool name + tagline */}
        <div className="fade-up">
          <div style={{ fontSize: 30, fontWeight: 900, color: '#FAF7F0', letterSpacing: -0.5, marginBottom: 6 }}>
            {tool.name}
          </div>
          <div style={{ fontSize: 16, color, fontWeight: 600, lineHeight: 1.4, marginBottom: 20 }}>
            {tool.tagline}
          </div>
        </div>

        {/* Sections */}
        <div className="fade-up fade-up-1">
          <Section label="WHAT IT DOES">{tool.whatItDoes}</Section>
        </div>

        <div className="fade-up fade-up-2">
          <Section label="WHO IT'S FOR">{tool.whoItsFor}</Section>
        </div>

        <div className="fade-up fade-up-3">
          <Section label="TRY IT TODAY — 5-MINUTE CHALLENGE">
            {tool.tryItToday}
          </Section>
        </div>

        <div className="fade-up fade-up-4">
          <Section label="PRO TIP" locked={!isPro}>
            {tool.proTip}
          </Section>
        </div>

        {/* Complete button */}
        <div className="fade-up fade-up-5" style={{ marginTop: 6, paddingBottom: 32 }}>
          {completed ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: 'rgba(46,204,122,0.12)', border: '1px solid rgba(46,204,122,0.3)',
              borderRadius: 14, padding: '15px',
            }}>
              <span style={{ fontSize: 18 }}>✅</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#2ECC7A' }}>
                Challenge Complete!
              </span>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              style={{
                width: '100%',
                background: justCompleted ? '#2ECC7A' : color,
                color: '#0B1F3A', border: 'none', borderRadius: 14,
                padding: '16px', fontSize: 15, fontWeight: 800,
                cursor: 'pointer',
                transition: 'background 0.3s, transform 0.15s',
                transform: justCompleted ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              {justCompleted ? '✅ Marked Complete!' : 'Mark Challenge Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
