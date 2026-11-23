import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE } from '../data/siteContent';
import { prefersReducedMotion } from '../utils/media';
import { SectionHeading } from './UIPrimitives';

export function Journey() {
  const { label, watermark, aside, items } = SITE.journey;
  const listRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey__row',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        }
      );
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="section section--dark journey"
      id="journey"
      aria-labelledby="journey-title"
      tabIndex={-1}
    >
      <div className="container">
        <SectionHeading id="journey-title" label={label} watermark={watermark} aside={aside} />
        <ol className="journey__list" ref={listRef}>
          {items.map((item) => (
            <li key={item.title} className="journey__row">
              <div>
                <h3 className="journey__title">{item.title}</h3>
                <p className="journey__subtitle">{item.subtitle}</p>
              </div>
              <p className="journey__date">{item.date}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
