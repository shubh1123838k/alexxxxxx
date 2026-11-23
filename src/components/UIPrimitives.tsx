import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../utils/media';
import { ArrowUpRightIcon } from './Icons';

interface PillButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  variant?: 'dark' | 'light';
  arrow?: boolean;
  icon?: React.ReactNode;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
}

export function PillButton({
  href,
  variant = 'dark',
  arrow = true,
  icon = null,
  external = false,
  className = '',
  children,
  type = 'button',
  disabled,
  ...rest
}: PillButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        className={`pill-button pill-button--${variant} ${className}`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {icon}
        <span>{children}</span>
        {arrow && (
          <span className="pill-button__arrow">
            <ArrowUpRightIcon />
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`pill-button pill-button--${variant} ${className}`}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon}
      <span>{children}</span>
      {arrow && (
        <span className="pill-button__arrow">
          <ArrowUpRightIcon />
        </span>
      )}
    </button>
  );
}

export function StatusPill({
  children,
  className = '',
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`status-pill ${className}`} {...rest}>
      <span className="status-pill__dot" aria-hidden="true" />
      {children}
    </p>
  );
}

export function TagPill({
  children,
  tone = 'grey',
}: {
  children: React.ReactNode;
  tone?: 'grey' | 'white';
}) {
  return <span className={`tag-pill tag-pill--${tone}`}>{children}</span>;
}

export function MediaImage({
  src,
  alt,
  className = '',
  fit,
  bg,
}: {
  src: string | null;
  alt: string;
  className?: string;
  fit?: 'contain' | 'cover';
  bg?: string;
}) {
  if (src) {
    const style = fit || bg ? { objectFit: fit, background: bg } : undefined;
    return (
      <img
        className={`media ${className}`}
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        style={style}
      />
    );
  }
  return (
    <div className={`media media--placeholder ${className}`} role="img" aria-label={`${alt} (image coming soon)`}>
      <span aria-hidden="true">Image coming soon</span>
    </div>
  );
}

export function SectionHeading({
  label,
  watermark,
  aside,
  id,
}: {
  label: string;
  watermark: string;
  aside?: string;
  id: string;
}) {
  const headingRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !headingRef.current) return;
    const sectionEl = headingRef.current.closest('section') ?? headingRef.current;
    const ctx = gsap.context(() => {
      const triggerConfig = { trigger: headingRef.current, start: 'top 85%' };
      gsap.fromTo(
        '.section-heading__mark',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: triggerConfig }
      );
      gsap.fromTo(
        '.section-heading__title, .section-heading__aside',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: triggerConfig }
      );
      gsap.to('.section-heading__mark-inner', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, headingRef);
    return () => ctx.revert();
  }, []);

  return (
    <header className="section-heading" ref={headingRef}>
      <p className="section-heading__mark" aria-hidden="true">
        <span className="section-heading__mark-inner">{watermark}</span>
      </p>
      <h2 className="section-heading__title" id={id}>
        {label}
      </h2>
      {aside && <p className="section-heading__aside">{aside}</p>}
    </header>
  );
}
