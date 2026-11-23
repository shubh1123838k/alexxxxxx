import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SITE, type SocialItem } from '../data/siteContent';
import { useLenis } from '../context/LenisContext';
import { deepakPhoto, prefersReducedMotion, supportsFineHover } from '../utils/media';
import { stepSpotlight, type SpotlightState } from '../utils/portfolioLogic';
import { EmailIcon, GitHubIcon, LinkedInIcon, ResumeIcon } from './Icons';
import { PillButton } from './UIPrimitives';

const SOCIAL_ICONS: Record<SocialItem['id'], React.ComponentType<{ size?: number }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
  resume: ResumeIcon,
};

function SocialPill({ id, label, href, external, download }: SocialItem) {
  const Icon = SOCIAL_ICONS[id];
  return (
    <a
      className="social-pill"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true } : {})}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </a>
  );
}

let hasPlayedIntro = false;

function SplitLetters({ text }: { text: string }) {
  return (
    <>
      {[...text].map((char, idx) => (
        <span key={idx} className="hero__letter" aria-hidden="true">
          {char}
        </span>
      ))}
    </>
  );
}

function useSpotlightCursor(frameRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !supportsFineHover()) return;

    const reduced = prefersReducedMotion();
    let state: SpotlightState = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 };
    let rafId = 0;
    let lastTime = 0;

    const applyVars = (s: SpotlightState, smoothScale: number) => {
      el.style.setProperty('--x', `${s.x}px`);
      el.style.setProperty('--y', `${s.y}px`);
      el.style.setProperty('--s', smoothScale.toFixed(3));
    };

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      const { next, smoothScale, done } = stepSpotlight(state, delta, reduced);
      state = next;
      applyVars(state, smoothScale);
      rafId = done ? 0 : requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const updateTarget = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      state.tx = e.clientX - rect.left;
      state.ty = e.clientY - rect.top;
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      updateTarget(e);
      if (state.s === 0) {
        state.x = state.tx;
        state.y = state.ty;
      }
      state.ts = 1;
      ensureLoop();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      updateTarget(e);
      ensureLoop();
    };

    const onLeave = () => {
      state.ts = 0;
      ensureLoop();
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [frameRef]);
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const [playOverlay] = useState(() => !hasPlayedIntro && !prefersReducedMotion());
  const { scrollTo } = useLenis();
  const { name, role, tagline, socials, cta } = SITE;

  useSpotlightCursor(photoFrameRef);

  useLayoutEffect(() => {
    hasPlayedIntro = true;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: playOverlay ? 0.1 : 0.7,
      });

      if (playOverlay) {
        tl.to('.hero__intro-overlay', {
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        });
      }

      tl.fromTo(
        '.hero__letter',
        { yPercent: 70, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.045 },
        playOverlay ? '-=0.2' : 0
      )
        .fromTo(
          '.hero__photo-frame',
          { yPercent: 25, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1 },
          '-=0.55'
        )
        .fromTo(
          '[data-hero-fade]',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 },
          '-=0.6'
        );
    });

    return () => ctx.revert();
  }, [playOverlay]);

  const handleCtaClick = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(`#${target}`);
  };

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-name">
      {playOverlay && <div className="hero__intro-overlay" aria-hidden="true" />}

      <h1 className="hero__name" id="hero-name" aria-label={`${name.first} ${name.last}`}>
        <span className="hero__first">
          <SplitLetters text={name.first.toUpperCase()} />
        </span>
        <span className="hero__last">
          <SplitLetters text={name.last.toUpperCase()} />
        </span>
      </h1>

      <div className="hero__photo-wrap">
        <div className="hero__photo-frame" ref={photoFrameRef} data-testid="hero-photo-frame">
          <img
            className="hero__photo"
            src={deepakPhoto}
            alt={SITE.photo.alt}
            fetchPriority="high"
            referrerPolicy="no-referrer"
          />
          <img
            className="hero__photo hero__photo--color"
            src={deepakPhoto}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="hero__intro" data-hero-fade="true">
        <h2 className="hero__role">{role}</h2>
        <p className="hero__tagline">{tagline}</p>
        <PillButton href={`#${cta.hero.target}`} onClick={handleCtaClick(cta.hero.target)}>
          {cta.hero.label}
        </PillButton>
      </div>

      <ul className="hero__socials" aria-label="Links">
        {socials.map((item) => (
          <li key={item.id} data-hero-fade="true">
            <SocialPill {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
