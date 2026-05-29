import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOOLS, CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS, getTodaysTool } from '../data/tools';

const LAUNCH = new Date(2026, 4, 29);
function getTodayDayIndex() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.floor((today - LAUNCH) / (1000 * 60 * 60 * 24));
  return ((diff % 60) + 60) % 60; // 0-indexed
}

export default function Library({ isPro, isCompleted, isViewed, setIsPro }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const todayTool = getTodaysTool();
  const todayIndex = getTodayDayIndex();

  // Tools that are "available" (have been shown) based on launch date cycling
  // Free users: only last 7 days
  // Pro users: all 60
  const availableTools = useMemo(() => {
    const result = [];
    for (let i = 0; i <= todayIndex; i++) {
      result.push({ ...TOOLS[i], locked: false });
    }
    // Remaining tools are locked for free, available for pro
    for (let i = todayIndex + 1; i < 60; i++) {
      result.push({ ...TOOLS[i], locked: !isPro });
    }
    return result;
  }, [todayIndex, isPro]);

  const freeLimit = 7;

  const filtered = useMemo(() => {
    return availableTools.filter(t => {
      const matchCat = activeCategory === 'All' || t.category === activeCategory;
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tagline.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [availableTools, activeCategory, search]);

  // Determine which tools are accessible (within free 7-day window from today)
  const isAccessible = (dayNum) => {
    if (isPro) return true;
    // Find position in the cycle relative to today
    const toolIndex = TOOLS.findIndex(t => t.day === dayNum);
    const daysAgo = ((todayIndex - toolIndex) + 60) % 60;
    return daysAgo < freeLimit;
  };

  return (
    <div className="page" style={{ background: '#0B1F3A' }}>
      {/* Header */}
      <div style={{ padding: '52px 20px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#FAF7F0', letterSpacing: -0.5, marginBottom: 4 }}>
          Tool Library
        </div>
        <div style={{ fontSize: 13, color: '#6B7E99', marginBottom: 16 }}>
          {isPro ? 'All 60 tools unlocked' : `Last ${freeLimit} days free · Upgrade for full archive`}
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#1E2D42', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '0 14px', marginBottom: 14,
        }}>
          <span style={{ color: '#6B7E99', fontSize: 15 }}>⌕</span>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#FAF7F0', fontSize: 14, padding: '12px 0',
              fontFamily: 'inherit',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: 'none', border: 'none', color: '#6B7E99', cursor: 'pointer', fontSize: 16 }}
            >×</button>
          )}
        </div>

        {/* Category filters */}
        <div style={{
          display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4,
          scrollbarWidth: 'none',
        }}>
          {['All', ...CATEGORIES].map(cat => {
            const isActive = cat === activeCategory;
            const color = cat === 'All' ? '#C9A84C' : CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  background: isActive ? `${color}20` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? color + '50' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 20, padding: '6px 14px',
                  color: isActive ? color : '#8A9DB8',
                  fontSize: 12, fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                {cat !== 'All' ? `${CATEGORY_ICONS[cat]} ` : ''}{cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool grid */}
      <div style={{ padding: '12px 20px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6B7E99' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div>No tools found</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {filtered.map((tool) => {
              const accessible = isAccessible(tool.day);
              const color = CATEGORY_COLORS[tool.category];
              const isToday = todayTool?.day === tool.day;
              const done = isCompleted(tool.day);
              const seen = isViewed(tool.day);

              return (
                <div
                  key={tool.day}
                  onClick={() => {
                    if (accessible) {
                      navigate(`/tool/${tool.day}`);
                    } else {
                      // Show paywall / upgrade prompt
                      navigate('/profile');
                    }
                  }}
                  style={{
                    background: '#1E2D42',
                    border: `1px solid ${isToday ? color + '60' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 14, padding: '14px',
                    cursor: 'pointer', position: 'relative',
                    opacity: !accessible ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {/* Day badge + lock */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: '#6B7E99', letterSpacing: 0.5,
                    }}>
                      Day {tool.day}
                    </div>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      {done && <span style={{ fontSize: 12 }}>✅</span>}
                      {!accessible && <span style={{ fontSize: 12 }}>🔒</span>}
                      {isToday && (
                        <span style={{
                          background: `${color}20`, border: `1px solid ${color}40`,
                          borderRadius: 20, padding: '1px 6px',
                          fontSize: 9, fontWeight: 700, color,
                        }}>TODAY</span>
                      )}
                    </div>
                  </div>

                  {/* Category icon */}
                  <div style={{ fontSize: 20, marginBottom: 6 }}>
                    {CATEGORY_ICONS[tool.category]}
                  </div>

                  {/* Tool name */}
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: '#FAF7F0', marginBottom: 4,
                    lineHeight: 1.2,
                  }}>
                    {tool.name}
                  </div>

                  {/* Tagline */}
                  <div style={{
                    fontSize: 11, color: color, fontWeight: 500, lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {tool.tagline}
                  </div>

                  {/* Blur overlay for locked */}
                  {!accessible && (
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(11,31,58,0.5)',
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20 }}>🔒</div>
                        <div style={{ fontSize: 10, color: '#C9A84C', fontWeight: 700, marginTop: 4 }}>PRO</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Upgrade banner for free users */}
        {!isPro && (
          <div style={{
            marginTop: 16,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 16, padding: '16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🔓</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#FAF7F0', marginBottom: 4 }}>
              Unlock All 60 Tools
            </div>
            <div style={{ fontSize: 12, color: '#8A9DB8', marginBottom: 12 }}>
              Go Pro for the full archive, streak freezes, and challenge history.
            </div>
            <button
              onClick={() => navigate('/profile')}
              style={{
                background: '#C9A84C', color: '#0B1F3A',
                border: 'none', borderRadius: 10, padding: '10px 20px',
                fontSize: 13, fontWeight: 800, cursor: 'pointer',
              }}
            >
              Upgrade to Pro — $4.99/mo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
