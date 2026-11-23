import React, { useEffect } from 'react';
import { PROJECTS, SITE } from '../data/siteContent';
import { ContactCTA } from '../components/ContactCTA';
import { Hero } from '../components/Hero';
import { Journey } from '../components/Journey';
import { Navbar } from '../components/Navbar';
import { SelectedWork } from '../components/SelectedWork';
import { WhatIDo } from '../components/WhatIDo';

export function HomePage() {
  useEffect(() => {
    document.title = `${SITE.name.first} ${SITE.name.last} | ${SITE.role}`;
  }, []);

  const counts = {
    projects: PROJECTS.length,
    whatIDo: SITE.whatIDo.items.length,
    journey: SITE.journey.items.length,
  };

  return (
    <>
      <Navbar counts={counts} />
      <main id="main">
        <Hero />
        <SelectedWork />
        <WhatIDo />
        <Journey />
        <ContactCTA />
      </main>
    </>
  );
}
