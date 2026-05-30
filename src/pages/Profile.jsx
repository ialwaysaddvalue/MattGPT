import { useState } from 'react';
import { CONFIG } from '../config';
import { track, EVENTS } from '../hooks/useAnalytics';

const WEEK_TOOLS = [
  '✍️ ChatGPT', '🎨 Midjourney', '🎬 Runway ML', '⚡ Zapier', '💼 Stripe', '🎉 Suno AI', '💰 Monarch Money',
];

export default function Profile({
  streak, longestStreak, totalDays, completedCount, viewedCount,
  freezesAvailable, isPro, openProModal,
}) {
  const [shareFlash, setShareFlash] = useState(false);

  const handleShare = () => {
    track(EVENTS.SHARE_CLICKED, { source: 'profile', streak });
    const text = `I'm on a ${streak}-day streak on MattGPT Daily! 🔥 I've learned ${viewedCount} AI tools and completed ${completedCount} challenges. Join me → ${CONFIG.APP_URL}`;
    if (navigator.share) {
      navigator.share({ text, url: CONFIG.APP_URL }).catch(() => {});
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

      {/* Membership section */}
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
                  {isPro ? 'Pro Member' : 'Pro — Free During Beta'}
                </div>
                <div style={{ fontSize: 12, color: '#8A9DB8' }}>
                  {isPro ? 'All features unlocked' : 'Enter your email to unlock'}
                </div>
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
            {!isPro && (
              <button
                onClick={() => {
                  track(EVENTS.PRO_MODAL_OPENED, { source: 'profile' });
                  track(EVENTS.UPGRADE_CTA_CLICKED, { cta: 'profile_membership' });
                  openProModal();
                }}
                style={{
                  width: '100%',
                  background: '#C9A84C',
                  color: '#0B1F3A',
                  border: 'none',
                  borderRadius: 12, padding: '13px',
                  fontSize: 14, fontWeight: 800, cursor: 'pointer',
                }}
              >
                Join Free — Founding Member →
              </button>
            )}
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
              onClick={() => {
                track(EVENTS.UPGRADE_CTA_CLICKED, { cta: 'circle_bundle' });
                if (CONFIG.OWNER_EMAIL) {
                  window.open(`mailto:${CONFIG.OWNER_EMAIL}?subject=MattGPT Circle Bundle`, '_blank');
                }
              }}
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
    </div>
  );
}
