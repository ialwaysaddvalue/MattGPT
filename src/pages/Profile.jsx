import { useState } from 'react';

const WEEK_TOOLS = [
  '✍️ ChatGPT', '🎨 Midjourney', '🎬 Runway ML', '⚡ Zapier', '💼 Stripe', '🎉 Suno AI', '💰 Monarch Money',
];

export default function Profile({
  streak, longestStreak, totalDays, completedCount, viewedCount,
  freezesAvailable, isPro, setIsPro,
}) {
  const [showProConfirm, setShowProConfirm] = useState(false);
  const [shareFlash, setShareFlash] = useState(false);

  const handleProToggle = () => {
    if (isPro) {
      setIsPro(false);
    } else {
      setShowProConfirm(true);
    }
  };

  const confirmPro = () => {
    setIsPro(true);
    setShowProConfirm(false);
  };

  const handleShare = () => {
    const text = `I'm on a ${streak}-day streak on MattGPT Daily! 🔥 I've learned ${viewedCount} AI tools and completed ${completedCount} challenges. Join me → mattgptdaily.com`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text).then(() => {
        setShareFlash(true);
        setTimeout(() => setShareFlash(false), 2000);
      });
    }
  };

  const initials = 'M';

  return (
    <div className="page" style={{ background: '#0B1F3A' }}>
      {/* Header */}
      <div style={{ padding: '52px 20px 24px', textAlign: 'center' }}>
        {/* Avatar */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
          fontSize: 28, fontWeight: 900, color: '#0B1F3A',
        }}>
          {initials}
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: '#FAF7F0', marginBottom: 4 }}>
          Your AI Journey
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: isPro ? 'rgba(201,168,76,0.15)' : 'rgba(107,126,153,0.15)',
          border: `1px solid ${isPro ? 'rgba(201,168,76,0.4)' : 'rgba(107,126,153,0.3)'}`,
          borderRadius: 20, padding: '4px 14px',
        }}>
          <span style={{ fontSize: 12 }}>{isPro ? '⭐' : '◎'}</span>
          <span style={{
            fontSize: 12, fontWeight: 700,
            color: isPro ? '#C9A84C' : '#8A9DB8',
          }}>
            {isPro ? 'Pro Member' : 'Free Account'}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 10 }}>
          YOUR PROGRESS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
          {[
            { emoji: '🔥', value: streak, label: 'Day Streak' },
            { emoji: '🏆', value: longestStreak, label: 'Best Streak' },
            { emoji: '📅', value: totalDays, label: 'Days Active' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#1E2D42', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '14px 10px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FAF7F0' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#6B7E99', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { emoji: '🛠️', value: viewedCount, label: 'Tools Learned', color: '#9B8FFF' },
            { emoji: '✅', value: completedCount, label: 'Challenges Done', color: '#2ECC7A' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#1E2D42', border: `1px solid ${s.color}20`,
              borderRadius: 14, padding: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#8A9DB8', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly digest preview */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 10 }}>
          THIS WEEK IN AI
        </div>
        <div style={{
          background: '#1E2D42', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: '16px',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {WEEK_TOOLS.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: 8,
                padding: '6px 10px', fontSize: 12, color: '#BFD0E8',
              }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share card */}
      <div style={{ padding: '0 20px 20px' }}>
        <button
          onClick={handleShare}
          style={{
            width: '100%',
            background: shareFlash ? 'rgba(46,204,122,0.15)' : 'rgba(201,168,76,0.08)',
            border: `1px solid ${shareFlash ? 'rgba(46,204,122,0.4)' : 'rgba(201,168,76,0.25)'}`,
            borderRadius: 14, padding: '14px',
            color: shareFlash ? '#2ECC7A' : '#C9A84C',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {shareFlash ? '✓ Copied to clipboard!' : '📲 Share My Progress'}
        </button>
      </div>

      {/* Pro section */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#6B7E99', letterSpacing: 1.5, marginBottom: 10 }}>
          MEMBERSHIP
        </div>

        <div style={{
          background: '#1E2D42',
          border: `1px solid ${isPro ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 16, overflow: 'hidden',
        }}>
          {/* Pro tier */}
          <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#FAF7F0', marginBottom: 2 }}>
                  Pro — $4.99/mo
                </div>
                <div style={{ fontSize: 12, color: '#8A9DB8' }}>or $39.99/year (save 33%)</div>
              </div>
              {isPro && (
                <div style={{
                  background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
                  borderRadius: 8, padding: '4px 10px',
                  fontSize: 11, fontWeight: 700, color: '#C9A84C',
                }}>
                  Active ✓
                </div>
              )}
            </div>
            <div style={{ marginBottom: 14 }}>
              {[
                'Full tool archive (all 60 tools)',
                '1 streak freeze per week',
                'Challenge history',
                'Pro Tips unlocked on every breakdown',
                'Extended weekly digest',
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                  <span style={{ color: '#C9A84C', fontSize: 12 }}>✓</span>
                  <span style={{ color: '#BFD0E8', fontSize: 13 }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleProToggle}
              style={{
                width: '100%',
                background: isPro ? 'transparent' : '#C9A84C',
                color: isPro ? '#6B7E99' : '#0B1F3A',
                border: isPro ? '1px solid rgba(255,255,255,0.1)' : 'none',
                borderRadius: 12, padding: '13px',
                fontSize: 14, fontWeight: 800, cursor: 'pointer',
              }}
            >
              {isPro ? 'Cancel Pro (Demo)' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Circle Bundle */}
          <div style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#FAF7F0', marginBottom: 4 }}>
              Circle Bundle — $9/mo
            </div>
            <div style={{ fontSize: 12, color: '#8A9DB8', marginBottom: 10 }}>
              Pro app + The Finisher's Circle community access + Circle badge on profile
            </div>
            <button
              style={{
                width: '100%',
                background: 'rgba(255,107,157,0.1)',
                border: '1px solid rgba(255,107,157,0.3)',
                borderRadius: 12, padding: '12px',
                color: '#FF6B9D', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Join The Finisher's Circle →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#3A4E66', marginBottom: 4 }}>
          MattGPT Daily v1.0
        </div>
        <div style={{ fontSize: 11, color: '#3A4E66' }}>
          One AI Tool. Every Day.
        </div>
      </div>

      {/* Pro confirm modal */}
      {showProConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{
            background: '#1E2D42', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 20, padding: '24px',
            width: '100%', maxWidth: 320,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⭐</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FAF7F0', marginBottom: 8 }}>
              Activate Pro (Demo)
            </div>
            <div style={{ fontSize: 13, color: '#8A9DB8', lineHeight: 1.6, marginBottom: 20 }}>
              This activates the Pro experience for testing. In the real app, this connects to Stripe for $4.99/mo.
            </div>
            <button
              onClick={confirmPro}
              style={{
                width: '100%', background: '#C9A84C', color: '#0B1F3A',
                border: 'none', borderRadius: 12, padding: '14px',
                fontSize: 15, fontWeight: 800, cursor: 'pointer', marginBottom: 10,
              }}
            >
              Activate Pro Mode
            </button>
            <button
              onClick={() => setShowProConfirm(false)}
              style={{
                width: '100%', background: 'transparent', color: '#6B7E99',
                border: 'none', padding: '10px', fontSize: 13, cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
