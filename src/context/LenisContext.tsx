import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { prefersReducedMotion } from '../utils/media';

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { immediate?: boolean }) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis();
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, { immediate = false }: { immediate?: boolean } = {}) => {
      if (lenis) {
        lenis.scrollTo(target, { immediate, force: true });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView({
        behavior: immediate || prefersReducedMotion() ? ('instant' as ScrollBehavior) : 'smooth',
      });
    },
    [lenis]
  );

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);
  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
