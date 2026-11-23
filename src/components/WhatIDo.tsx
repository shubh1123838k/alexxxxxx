import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SITE } from '../data/siteContent';
import { useLenis } from '../context/LenisContext';
import { prefersReducedMotion, resolveAssetUrl } from '../utils/media';
import { ArrowUpRightIcon, CloseIcon } from './Icons';
import { SERVICE_ILLUSTRATIONS } from './ServiceIllustrations';
import { MediaImage, SectionHeading } from './UIPrimitives';

const HOVER_DEBOUNCE_MS = 120;

export function WhatIDo() {
  const { label, watermark, items, close } = SITE.whatIDo;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [instantIndex, setInstantIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prevOpenRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const currentOpenRef = useRef<number | null>(null);
  const hoveredRowRef = useRef<number | null>(null);
  const hoveredTriggerRef = useRef<number | null>(null);
  const scrollCompensationRef = useRef<{ index: number; top: number } | null>(null);
  const { scrollTo } = useLenis();

  currentOpenRef.current = openIndex;

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const applyHoverIntent = () => {
    const rowIdx = hoveredRowRef.current;
    const openIdx = currentOpenRef.current;
    if (rowIdx === null) {
      setOpenIndex(null);
      return;
    }
    const triggerIdx = hoveredTriggerRef.current;
    if (triggerIdx !== rowIdx || triggerIdx === openIdx) return;

    if (openIdx !== null && openIdx < triggerIdx) {
      const el = document.getElementById(`service-trigger-${triggerIdx}`);
      if (el) {
        scrollCompensationRef.current = { index: triggerIdx, top: el.getBoundingClientRect().top };
        setInstantIndex(openIdx);
      }
    }
    setOpenIndex(triggerIdx);
  };

  const scheduleHoverIntent = () => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(applyHoverIntent, HOVER_DEBOUNCE_MS);
  };

  const handleRowPointerEnter = (idx: number) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      hoveredRowRef.current = idx;
    }
  };

  const handleRowPointerLeave = (idx: number) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      if (hoveredRowRef.current === idx) hoveredRowRef.current = null;
      if (hoveredTriggerRef.current === idx) hoveredTriggerRef.current = null;
      scheduleHoverIntent();
    }
  };

  const handleHeadingPointerEnter = (idx: number) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      hoveredRowRef.current = idx;
      hoveredTriggerRef.current = idx;
      scheduleHoverIntent();
    }
  };

  useEffect(() => () => clearTimeout(hoverTimerRef.current), []);

  useLayoutEffect(() => {
    const comp = scrollCompensationRef.current;
    if (!comp || comp.index !== openIndex) return;
    scrollCompensationRef.current = null;
    const el = document.getElementById(`service-trigger-${comp.index}`);
    if (el) {
      const delta = el.getBoundingClientRect().top - comp.top;
      if (Math.abs(delta) > 1) {
        scrollTo(window.scrollY + delta, { immediate: true });
      }
    }
    const raf = requestAnimationFrame(() => setInstantIndex(null));
    return () => cancelAnimationFrame(raf);
  }, [openIndex, scrollTo]);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        }
      );
    }, listRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prev = prevOpenRef.current;
    prevOpenRef.current = openIndex;
    if (prefersReducedMotion()) return;

    if (prev !== null && prev !== openIndex && imageRefs.current[prev]) {
      gsap.to(imageRefs.current[prev], {
        autoAlpha: 0,
        scale: 0.6,
        rotate: 0,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: true,
      });
    }
    if (openIndex !== null && imageRefs.current[openIndex]) {
      gsap.fromTo(
        imageRefs.current[openIndex],
        { autoAlpha: 0, yPercent: 10, scale: 0.4, rotate: -6 },
        {
          autoAlpha: 1,
          yPercent: -55,
          scale: 1,
          rotate: 8,
          duration: 1.1,
          delay: 0.15,
          ease: 'elastic.out(1, 0.55)',
          overwrite: true,
        }
      );
    }
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openIndex]);

  return (
    <section className="section services" id="what-i-do" aria-labelledby="services-title" tabIndex={-1}>
      <div className="container">
        <SectionHeading id="services-title" label={label} watermark={watermark} />

        <ul className="services__list" ref={listRef}>
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const Illustration = SERVICE_ILLUSTRATIONS[item.illustration];
            return (
              <li
                key={item.title}
                className={`service${isOpen ? ' is-open' : ''}${instantIndex === idx ? ' is-instant' : ''}`}
                onPointerEnter={handleRowPointerEnter(idx)}
                onPointerLeave={handleRowPointerLeave(idx)}
              >
                <div
                  className="service__image"
                  ref={(el) => {
                    imageRefs.current[idx] = el;
                  }}
                >
                  {item.image ? (
                    <MediaImage
                      src={resolveAssetUrl('services', item.image)}
                      alt={`Example of ${item.title.toLowerCase()} work`}
                    />
                  ) : (
                    Illustration && <Illustration />
                  )}
                </div>

                <h3 className="service__heading" onPointerEnter={handleHeadingPointerEnter(idx)}>
                  <button
                    type="button"
                    className="service__trigger"
                    id={`service-trigger-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${idx}`}
                    onClick={() => toggleIndex(idx)}
                  >
                    <span className="service__title">{item.title}</span>
                    <span className="service__icon" aria-hidden="true">
                      {isOpen ? <CloseIcon size={18} /> : <ArrowUpRightIcon size={30} />}
                    </span>
                    {isOpen && <span className="sr-only">({close})</span>}
                  </button>
                </h3>

                <div
                  className="service__panel"
                  id={`service-panel-${idx}`}
                  role="region"
                  aria-labelledby={`service-trigger-${idx}`}
                >
                  <div className="service__panel-inner">
                    <p className="service__desc">{item.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
