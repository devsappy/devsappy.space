"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import profilePic from '../DSC_8261.JPG';
import accentPic from '../image.png';

export default function Home() {
  const rootRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // trigger entrance on next frame
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Mouse parallax -> CSS variables on the root
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;  // -0.5 .. 0.5
        const my = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--mx', mx.toFixed(4));
        el.style.setProperty('--my', my.toFixed(4));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const splitChars = (word) =>
    word.split('').map((c, i) => (
      <span className="ch" style={{ '--i': i }} key={i}>
        {c}
      </span>
    ));

  return (
    <div ref={rootRef} className={`agency ${loaded ? 'is-loaded' : ''}`}>
      {/* Giant watermark */}
      <span className="agency-watermark" aria-hidden="true">©</span>

      {/* Top bar */}
      <div className="agency-topbar">
        {/* Corner navigation */}
        <nav className="agency-nav">
          {[
            { label: 'Home', href: '/' },
            { label: 'Work', href: '/projects' },
            { label: 'About', href: '/sappy' },
          ].map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="agency-nav-link"
              style={{ '--d': `${0.15 + i * 0.08}s` }}
            >
              <span>{item.label}</span>
              <span className="arrow">↗</span>
            </Link>
          ))}
        </nav>

        {/* Centered brand cluster */}
        <div className="agency-brand-cluster">
          <div className="agency-brand">
            <span className="brand-word">{splitChars('SAPPY')}</span>
            <span className="brand-word brand-word--2">{splitChars('STUDIO')}</span>
          </div>
          <span className="agency-plus" aria-hidden="true">+</span>
          <div className="agency-location">
            <span className="loc-name">India</span>
            <span className="loc-since">[ Since 2021 ]</span>
          </div>
        </div>

        {/* CTA */}
        <Link href="/contact" className="agency-talk">
          <span className="agency-talk-fill" />
          <span className="agency-talk-label">Let&apos;s Talk</span>
        </Link>
      </div>

      {/* Hero editorial image */}
      <div className="agency-hero-image">
        <div className="agency-hero-inner">
          <Image src={profilePic} alt="Sappy" priority />
        </div>
      </div>

      {/* Sparkle accent */}
      <span className="agency-sparkle" aria-hidden="true">✦</span>

      {/* Giant headline */}
      <h1 className="agency-headline">
        <span className="line-mask">
          <span className="line-inner" style={{ '--d': '0.45s' }}>CREATIVE DIGITAL</span>
        </span>
        <span className="line-mask line-mid">
          <span className="line-inner" style={{ '--d': '0.58s' }}>DEVELOPER</span>
          <span className="agency-float">
            <Image src={accentPic} alt="" />
          </span>
          <span className="line-inner" style={{ '--d': '0.66s' }}>VIDEO</span>
        </span>
        <span className="line-mask">
          <span className="line-inner" style={{ '--d': '0.74s' }}>EDITOR</span>
        </span>
      </h1>

      {/* Scroll / status ticker */}
      <div className="agency-ticker" aria-hidden="true">
        <div className="agency-ticker-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              WEB DEVELOPMENT &nbsp;✦&nbsp; MOTION DESIGN &nbsp;✦&nbsp; VIDEO EDITING
              &nbsp;✦&nbsp; CREATIVE DIRECTION &nbsp;✦&nbsp; LANDING PAGES &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
