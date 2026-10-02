"use client";

import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
