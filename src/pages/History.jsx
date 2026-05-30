import { useNavigate } from 'react-router-dom';
import { TOOLS, CATEGORY_COLORS, CATEGORY_ICONS } from '../data/tools';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(iso) {
  const d = new Date(iso);
  return `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function History({ isPro, isCompleted, getCompletedDate, openProModal }) {
  const navigate = useNavigate();

  const completedTools = TOOLS
    .filter(t => isCompleted(t.day))
    .map(t => ({ ...t, completedAt: getCompletedDate(t.day) }))
    .sort((a, b) => {
      if (!a.completedAt && !b.completedAt) return 0;
      if (!a.completedAt) return 1;
      if (!b.completedAt) return -1;
      return new Date(b.completedAt) - new Date(a.completedAt);
    });

  return (
    <div className="page" style={{ background: '#0B1F3A' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '52px 20px 12px',
      }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{
            background: 'rgba(255,255,255,0.06)', border: 'none',
            borderRadius: 10, width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FAF7F0', fontSize: 16, cursor: 'pointer', flexShrink: 0,
          }}
        >
          ←
        </button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#FAF7F0', letterSpacing: -0.5 }}>
            Challenge History
          </div>
          <div style={{ fontSize: 12, color: '#6B7E99' }}>
            {completedTools.length} challenge{completedTools.length !== 1 ? 's' : ''} completed
          </div>
        </div>
      </div>

      {!isPro ? (
        /* Free user paywall */
        <div style={{ padding: '24px 20px' }}>
          <div style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 20, padding: '28px 20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📜</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#FAF7F0', marginBottom: 8 }}>
              Challenge History is Pro
            </div>
            <div style={{ fontSize: 13, color: '#8A9DB8', lineHeight: 1.6, marginBottom: 20 }}>
              See every challenge you've completed, when you did it, and how far you've come. Founding members get this free during beta.
            </div>
            <button
              onClick={openProModal}
              style={{
                background: '#C9A84C', color: '#0B1F3A',
                border: 'none', borderRadius: 12, padding: '13px 24px',
                fontSize: 14, fontWeight: 800, cursor: 'pointer',
              }}
            >
              Unlock Free During Beta →
            </button>
          </div>
        </div>
      ) : completedTools.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: '#6B7E99' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#FAF7F0', marginBottom: 8 }}>
            No completions yet
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            Open today's tool and mark the challenge complete to start your history.
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: 20, background: '#C9A84C', color: '#0B1F3A',
              border: 'none', borderRadius: 12, padding: '12px 22px',
              fontSize: 14, fontWeight: 800, cursor: 'pointer',
            }}
          >
            Go to Today's Tool →
          </button>
        </div>
      ) : (
        <div style={{ padding: '8px 20px 24px' }}>
          {completedTools.map((tool) => {
            const color = CATEGORY_COLORS[tool.category];
            return (
              <div
                key={tool.day}
                onClick={() => navigate(`/tool/${tool.day}`)}
                style={{
                  background: '#1E2D42',
                  border: `1px solid ${color}25`,
                  borderRadius: 14, padding: '14px 16px',
                  marginBottom: 8, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${color}15`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>
                  {CATEGORY_ICONS[tool.category]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#FAF7F0', marginBottom: 2 }}>
                    {tool.name}
                  </div>
                  <div style={{ fontSize: 11, color, fontWeight: 600, marginBottom: 3 }}>
                    Day {tool.day} · {tool.category}
                  </div>
                  {tool.completedAt && (
                    <div style={{ fontSize: 11, color: '#6B7E99' }}>
                      Completed {formatDate(tool.completedAt)}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 16, flexShrink: 0 }}>✅</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
