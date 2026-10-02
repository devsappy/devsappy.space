"use client";

import { useEffect, useRef } from 'react';

// On narrow screens the career chart scrolls sideways; open it at "now", not 2021.
export default function TracksScroller({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const now = el && el.querySelector('.tracks-now');
    if (!el || !now || el.scrollWidth <= el.clientWidth) return;
    const x = now.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    el.scrollLeft = Math.max(0, x - el.clientWidth * 0.7);
  }, []);

  return (
    <div ref={ref} className="tracks" aria-hidden="true">
      {children}
    </div>
  );
}
