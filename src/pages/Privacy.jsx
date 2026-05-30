import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';

export default function Privacy() {
  const navigate = useNavigate();

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
        <div style={{ fontSize: 20, fontWeight: 900, color: '#FAF7F0' }}>
          Privacy & Terms
        </div>
      </div>

      <div style={{ padding: '12px 20px 40px', fontSize: 13, color: '#BFD0E8', lineHeight: 1.8 }}>
        <Section title="What We Collect">
          <p>When you join the Pro waitlist, we collect your email address to notify you about the product and send you a founding member confirmation.</p>
          <p style={{ marginTop: 8 }}>We use <strong style={{ color: '#FAF7F0' }}>Plausible Analytics</strong>, a privacy-friendly analytics tool that uses no cookies and collects no personal data. Page views and custom events (tool opens, challenge completions) are recorded anonymously against a domain, not against individual users.</p>
          <p style={{ marginTop: 8 }}>All progress data (streak, completed tools, Pro status) is stored exclusively in your browser's <strong style={{ color: '#FAF7F0' }}>localStorage</strong>. We do not have access to this data. Clearing your browser data will erase it.</p>
        </Section>

        <Section title="How We Use Your Email">
          <p>If you provide your email address, we use it only to:</p>
          <ul style={{ paddingLeft: 18, marginTop: 6 }}>
            <li>Confirm your founding member status</li>
            <li>Send product updates and the weekly AI digest (when available)</li>
            <li>Notify you about pricing changes before beta ends</li>
          </ul>
          <p style={{ marginTop: 8 }}>We do not sell, share, or rent your email to third parties.</p>
        </Section>

        <Section title="Local Storage">
          <p>This app stores the following data locally in your browser:</p>
          <ul style={{ paddingLeft: 18, marginTop: 6 }}>
            <li><code style={{ color: '#C9A84C' }}>mgd_streak</code> — your current streak count</li>
            <li><code style={{ color: '#C9A84C' }}>mgd_completed</code> — which tools you've marked complete</li>
            <li><code style={{ color: '#C9A84C' }}>mgd_viewed</code> — which tools you've opened</li>
            <li><code style={{ color: '#C9A84C' }}>mgd_isPro</code> — your Pro status</li>
            <li><code style={{ color: '#C9A84C' }}>mgd_events</code> — a local debug queue of analytics events</li>
            <li><code style={{ color: '#C9A84C' }}>mgd_pro_email</code> — the email you used to join Pro</li>
          </ul>
          <p style={{ marginTop: 8 }}>This data never leaves your device. You can clear it at any time in your browser settings.</p>
        </Section>

        <Section title="Terms of Use">
          <p>MattGPT Daily is provided "as is" for educational purposes. Tool descriptions are our own summaries — always verify current pricing and features directly with each tool's official website.</p>
          <p style={{ marginTop: 8 }}>During beta, Pro access is free for founding members. We'll give at least 30 days' notice before any pricing changes.</p>
        </Section>

        <Section title="Contact">
          <p>Questions, data requests, or unsubscribe requests:</p>
          <a
            href={`mailto:${CONFIG.OWNER_EMAIL}`}
            style={{ color: '#C9A84C', fontWeight: 700 }}
          >
            {CONFIG.OWNER_EMAIL}
          </a>
        </Section>

        <div style={{ marginTop: 24, fontSize: 11, color: '#4A5E75', textAlign: 'center' }}>
          Last updated May 2026
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 10, fontWeight: 800, color: '#6B7E99',
        letterSpacing: 1.5, marginBottom: 10,
        textTransform: 'uppercase',
      }}>
        {title}
      </div>
      <div style={{
        background: '#1E2D42', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 14, padding: '14px 16px',
      }}>
        {children}
      </div>
    </div>
  );
}
