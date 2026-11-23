import React, { useEffect, useState } from 'react';
import { SITE } from '../data/siteContent';
import { useLenis } from '../context/LenisContext';
import { PillButton, StatusPill } from './UIPrimitives';

interface NavbarProps {
  counts?: Record<string, number>;
}

export function Navbar({ counts = {} }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleNavClick = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(`#${target}`);
  };

  return (
    <header className="navbar">
      <StatusPill className="navbar__status" data-hero-fade="true">
        {SITE.status}
      </StatusPill>

      <nav
        id="primary-nav"
        className={`navbar__links${menuOpen ? ' is-open' : ''}`}
        aria-label="Primary"
        data-hero-fade="true"
      >
        <ul>
          {SITE.nav.map(({ label, target, count }) => {
            const countVal = count ? counts[count] : undefined;
            return (
              <li key={target}>
                <a href={`#${target}`} onClick={handleNavClick(target)}>
                  {label}
                  {typeof countVal === 'number' && Number.isFinite(countVal) && (
                    <span className="navbar__count">
                      <span aria-hidden="true">[{countVal}]</span>
                      <span className="sr-only">({countVal} items)</span>
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="navbar__actions" data-hero-fade="true">
        <button
          type="button"
          className="navbar__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? SITE.menu.close : SITE.menu.open}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`navbar__burger${menuOpen ? ' is-open' : ''}`} aria-hidden="true" />
          {SITE.menu.label}
        </button>

        <PillButton
          href={`#${SITE.cta.nav.target}`}
          onClick={handleNavClick(SITE.cta.nav.target)}
          className="navbar__cta"
        >
          {SITE.cta.nav.label}
        </PillButton>
      </div>
    </header>
  );
}
