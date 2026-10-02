"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { setLenis, getLenis } from '@/lib/scroll';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return undefined;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: true });
    setLenis(lenis);
    document.documentElement.classList.add('has-smooth');

    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove('has-smooth');
    };
  }, []);

  // Each route starts at the top; Lenis has to be told, or it eases back.
  useEffect(() => {
    const lenis = getLenis();
    if (lenis && !window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
