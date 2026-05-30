import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/',        icon: '✦',  label: 'Today'   },
  { to: '/library', icon: '◫',  label: 'Library' },
  { to: '/streak',  icon: '🔥', label: 'Streak'  },
  { to: '/profile', icon: '◉',  label: 'Profile' },
];

const S = {
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    background: '#1A2C42',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    alignItems: 'stretch',
    zIndex: 100,
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    color: '#5A7090',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.3,
    transition: 'color 0.15s',
    textDecoration: 'none',
  },
  icon: {
    fontSize: 20,
    lineHeight: 1,
  },
};

export default function BottomNav() {
  return (
    <nav style={S.nav} aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          aria-label={label}
          style={({ isActive }) => ({
            ...S.item,
            color: isActive ? '#C9A84C' : '#5A7090',
          })}
        >
          <span style={S.icon} aria-hidden="true">{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
