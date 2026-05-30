// ─── App configuration ────────────────────────────────────────────────────────
// Edit these values to wire up real services.

export const CONFIG = {
  // Tool rotation launch date
  LAUNCH_DATE: new Date(2026, 4, 29), // May 29 2026

  // Analytics ── create a free account at plausible.io, add your domain, paste it here
  PLAUSIBLE_DOMAIN: 'ialwaysaddvalue.github.io',

  // Pro waitlist email collection ── create a free form at formspree.io
  // Paste the form endpoint (e.g. "https://formspree.io/f/abcdefgh")
  // Leave empty to collect emails in localStorage only
  FORMSPREE_ENDPOINT: '',

  // Stripe Payment Link ── create one in your Stripe dashboard (no backend needed)
  // e.g. "https://buy.stripe.com/your_link_here"
  STRIPE_LINK: '',

  // Owner contact email shown in the waitlist confirmation
  OWNER_EMAIL: 'iamlane9@gmail.com',

  // GitHub Pages URL for sharing
  APP_URL: 'https://ialwaysaddvalue.github.io/MattGPT/',
};
