import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation, useNavigate } from 'react-router-dom';
import { prefersReducedMotion } from '../utils/media';
import { useLenis } from './LenisContext';

type NavigateWithTransition = (to: string, options?: { target?: string | null }) => void;

const PageTransitionContext = createContext<NavigateWithTransition>(() => {});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const pendingTargetRef = useRef<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollTo } = useLenis();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    scrollTo(0, { immediate: true });
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (pendingTargetRef.current) {
        scrollTo(pendingTargetRef.current, { immediate: true });
        pendingTargetRef.current = null;
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, scrollTo]);

  const transitionTo = useCallback<NavigateWithTransition>(
    (to, { target = null } = {}) => {
      if (animatingRef.current) return;
      pendingTargetRef.current = target;
      if (prefersReducedMotion()) {
        navigate(to);
        return;
      }
      animatingRef.current = true;
      gsap
        .timeline({
          onComplete: () => {
            animatingRef.current = false;
          },
        })
        .set(curtainRef.current, { yPercent: 100, autoAlpha: 1 })
        .to(curtainRef.current, { yPercent: 0, duration: 0.6, ease: 'power4.inOut' })
        .add(() => {
          navigate(to);
        })
        .to(curtainRef.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', delay: 0.25 })
        .set(curtainRef.current, { autoAlpha: 0 });
    },
    [navigate]
  );

  return (
    <PageTransitionContext.Provider value={transitionTo}>
      {children}
      <div ref={curtainRef} className="page-transition" aria-hidden="true" />
    </PageTransitionContext.Provider>
  );
}
