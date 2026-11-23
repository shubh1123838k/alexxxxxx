import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SITE } from '../data/siteContent';
import { prefersReducedMotion } from '../utils/media';
import { ContactModal } from './ContactModal';
import { PillButton, StatusPill } from './UIPrimitives';

export function ContactCTA() {
  const { contact, status } = SITE;
  const [modalOpen, setModalOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !innerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: innerRef.current, start: 'top 85%' },
        }
      );
    }, innerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section contact-cta" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container contact-cta__inner" ref={innerRef}>
        <StatusPill>{status}</StatusPill>
        <h2 className="contact-cta__title" id="contact-title">
          {contact.heading}
        </h2>
        <p className="contact-cta__text">{contact.text}</p>
        <PillButton onClick={() => setModalOpen(true)} aria-haspopup="dialog">
          {contact.button}
        </PillButton>
      </div>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
