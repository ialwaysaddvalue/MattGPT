import { useState } from 'react';
import { CONFIG } from '../config';
import { track, EVENTS } from '../hooks/useAnalytics';

const FEATURES = [
  'Full archive — all 60 tools, not just 7 days',
  'Pro Tips unlocked on every breakdown',
  '1 streak freeze per week (auto-used on missed days)',
  'Challenge history across all tools',
  'Extended weekly AI digest',
];

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

async function submitEmail(email) {
  const endpoint = CONFIG.FORMSPREE_ENDPOINT;
  if (!endpoint) return; // localStorage-only mode
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, source: 'MattGPT Daily Pro Waitlist' }),
  });
}

export default function ProModal({ onClose, onUnlock }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await submitEmail(email);
      // Store locally regardless
      localStorage.setItem('mgd_pro_email', email);
      track(EVENTS.WAITLIST_SUBMITTED, { email_domain: email.split('@')[1] });
      setDone(true);
      // Unlock Pro immediately — founding member benefit
      setTimeout(() => {
        track(EVENTS.PRO_UNLOCKED, { method: 'founding_member' });
        onUnlock();
        onClose();
      }, 2200);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStripe = () => {
    track(EVENTS.UPGRADE_CTA_CLICKED, { cta: 'stripe_payment_link' });
    if (CONFIG.STRIPE_LINK) {
      window.open(CONFIG.STRIPE_LINK, '_blank', 'noopener');
    } else {
      window.open(`mailto:${CONFIG.OWNER_EMAIL}?subject=MattGPT Daily Pro`, '_blank');
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(7,21,42,0.92)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0 0 env(safe-area-inset-bottom,0px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1A2C42',
          border: '1px solid rgba(201,168,76,0.35)',
          borderRadius: '24px 24px 0 0',
          padding: '28px 24px 32px',
          width: '100%',
          maxWidth: 430,
        }}
      >
        {/* Drag handle */}
        <div style={{
          width: 40, height: 4, background: 'rgba(255,255,255,0.15)',
          borderRadius: 2, margin: '0 auto 20px',
        }} />

        {done ? (
          /* ── Success state ── */
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#FAF7F0', marginBottom: 8 }}>
              Welcome, Founding Member!
            </div>
            <div style={{ fontSize: 14, color: '#8A9DB8', lineHeight: 1.6 }}>
              Pro is unlocked. You're in — enjoy the full archive and all Pro features.
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: 20, padding: '4px 12px', marginBottom: 10,
              }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#C9A84C', letterSpacing: 1 }}>
                  FOUNDING MEMBER — FREE DURING BETA
                </span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FAF7F0', marginBottom: 6 }}>
                Get full access to MattGPT Daily
              </div>
              <div style={{ fontSize: 14, color: '#8A9DB8', lineHeight: 1.5 }}>
                Enter your email to unlock Pro free while we're in beta. No credit card needed.
              </div>
            </div>

            {/* Features */}
            <div style={{
              background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: 14, padding: '14px 16px', marginBottom: 20,
            }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < FEATURES.length - 1 ? 8 : 0 }}>
                  <span style={{ color: '#C9A84C', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ color: '#BFD0E8', fontSize: 13, lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Email input */}
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              style={{
                width: '100%', background: '#0B1F3A',
                border: `1px solid ${error ? '#E05555' : 'rgba(255,255,255,0.12)'}`,
                borderRadius: 12, padding: '14px 16px',
                color: '#FAF7F0', fontSize: 15, fontFamily: 'inherit',
                outline: 'none', marginBottom: error ? 6 : 12,
                boxSizing: 'border-box',
              }}
            />
            {error && (
              <div style={{ fontSize: 12, color: '#E05555', marginBottom: 10 }}>{error}</div>
            )}

            {/* Join button */}
            <button
              onClick={handleJoin}
              disabled={loading}
              style={{
                width: '100%', background: loading ? '#8A6A2A' : '#C9A84C',
                color: '#0B1F3A', border: 'none', borderRadius: 14,
                padding: '15px', fontSize: 15, fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 10,
              }}
            >
              {loading ? 'Joining…' : 'Join & Unlock Pro Free →'}
            </button>

            {/* Stripe / pay option */}
            <button
              onClick={handleStripe}
              style={{
                width: '100%', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                padding: '12px', color: '#8A9DB8', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', marginBottom: 14,
              }}
            >
              {CONFIG.STRIPE_LINK ? 'Pay $4.99/mo instead →' : 'Contact us to subscribe →'}
            </button>

            <div style={{ fontSize: 11, color: '#4A5E75', textAlign: 'center', lineHeight: 1.6 }}>
              No spam. No payment required during beta. Founding members lock in free access.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
