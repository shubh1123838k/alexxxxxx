import React, { useEffect } from 'react';
import { SITE } from '../data/siteContent';
import { usePageTransition } from '../context/PageTransitionContext';
import { PillButton, StatusPill } from '../components/UIPrimitives';

export function NotFoundPage() {
  const transitionTo = usePageTransition();
  const { errors } = SITE;

  useEffect(() => {
    document.title = `404 | ${SITE.name.first} ${SITE.name.last}`;
  }, []);

  return (
    <main id="main" className="not-found">
      <StatusPill>{SITE.status}</StatusPill>
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">{errors.notFound}</p>
      <PillButton
        href="/"
        onClick={(e) => {
          e.preventDefault();
          transitionTo('/');
        }}
      >
        {errors.home}
      </PillButton>
    </main>
  );
}
