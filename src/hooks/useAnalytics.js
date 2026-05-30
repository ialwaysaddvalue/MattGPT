// Analytics thin wrapper.
// Fires window.plausible() when available (Plausible Analytics).
// Always writes to a localStorage debug queue so you can inspect events
// in DevTools → Application → Local Storage → mgd_events.

export const EVENTS = {
  TOOL_OPENED:          'Tool Opened',
  CHALLENGE_COMPLETED:  'Challenge Completed',
  PRO_MODAL_OPENED:     'Pro Modal Opened',
  WAITLIST_SUBMITTED:   'Waitlist Submitted',
  PRO_UNLOCKED:         'Pro Unlocked',
  SHARE_CLICKED:        'Share Clicked',
  LIBRARY_SEARCHED:     'Library Searched',
  CATEGORY_FILTERED:    'Category Filtered',
  STREAK_VIEWED:        'Streak Viewed',
  UPGRADE_CTA_CLICKED:  'Upgrade CTA Clicked',
};

export function track(eventName, props = {}) {
  // Plausible
  try {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props });
    }
  } catch {}

  // localStorage debug queue (last 300 events)
  try {
    const raw = localStorage.getItem('mgd_events');
    const events = raw ? JSON.parse(raw) : [];
    events.push({ event: eventName, props, ts: Date.now() });
    localStorage.setItem('mgd_events', JSON.stringify(events.slice(-300)));
  } catch {}
}
