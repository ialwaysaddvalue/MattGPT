import { useNavigate } from 'react-router-dom';

export default function Paywall({ onUnlock }) {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(to bottom, transparent 0%, #0B1F3A 40%)',
      padding: '24px',
      zIndex: 10,
    }}>
      <div style={{
        background: '#1E2D42',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: 20,
        padding: '28px 24px',
        textAlign: 'center',
        width: '100%',
        maxWidth: 320,
      }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
        <div style={{
          fontSize: 18, fontWeight: 800, color: '#FAF7F0', marginBottom: 8,
        }}>
          Full Archive — Pro Only
        </div>
        <div style={{ fontSize: 13, color: '#8A9DB8', lineHeight: 1.6, marginBottom: 20 }}>
          Free users see the last 7 days. Upgrade to Pro to unlock all 60 tools plus the full growing archive.
        </div>

        <div style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 12,
          padding: '12px 16px',
          marginBottom: 20,
          textAlign: 'left',
        }}>
          {['Full tool archive (60+ tools)', '1 streak freeze per week', 'Challenge history', 'Extended weekly digest'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: i < 3 ? 6 : 0 }}>
              <span style={{ color: '#C9A84C', fontSize: 13 }}>✓</span>
              <span style={{ color: '#BFD0E8', fontSize: 13 }}>{f}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onUnlock}
          style={{
            width: '100%', background: '#C9A84C', color: '#0B1F3A',
            border: 'none', borderRadius: 12, padding: '14px',
            fontSize: 15, fontWeight: 800, cursor: 'pointer',
            marginBottom: 10,
          }}
        >
          Upgrade to Pro — $4.99/mo
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: '100%', background: 'transparent', color: '#6B7E99',
            border: 'none', borderRadius: 12, padding: '10px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
