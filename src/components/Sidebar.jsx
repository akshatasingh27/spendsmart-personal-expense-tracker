// Sidebar.jsx — Left navigation panel
// Props: activePage (which page is shown), onNavigate (function to switch pages)

import { useState } from 'react';
import {
  MdDashboard, MdSwapHoriz, MdAccountBalanceWallet, MdMenu, MdClose
} from 'react-icons/md';

const NAV_ITEMS = [
  { key: 'dashboard',    label: 'Dashboard',     icon: MdDashboard },
  { key: 'transactions', label: 'Transactions',   icon: MdSwapHoriz },
  { key: 'budgets',      label: 'Budget',         icon: MdAccountBalanceWallet },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (key) => {
    onNavigate(key);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="mobile-header">
        <button className="hamburger-btn" onClick={() => setMobileOpen(true)}>
          <MdMenu size={24} />
        </button>
        <span className="mobile-logo">💰 SpendSmart</span>
      </header>

      {/* ── Overlay (mobile) ── */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Sidebar panel ── */}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-text">💰 SpendSmart</div>
          <div className="logo-sub">Personal Finance Tracker</div>
        </div>

        {/* Close button (mobile only) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px 0' }}>
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(false)}
            style={{ display: mobileOpen ? 'flex' : 'none' }}
            aria-label="Close menu"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`nav-item ${activePage === key ? 'active' : ''}`}
              onClick={() => handleNav(key)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div>Made for FSWD II</div>
          <div style={{ marginTop: 4, color: 'var(--text-muted)' }}>© 2026 SpendSmart</div>
        </div>
      </aside>
    </>
  );
}
