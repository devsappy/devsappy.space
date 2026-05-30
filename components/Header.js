"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/sappy' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`ahead ${mounted ? 'is-loaded' : ''}`}>
        <Link href="/" className="ahead-brand">
          SAPPY<span>STUDIO</span>
        </Link>

        <nav className="ahead-nav">
          {LINKS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className={`ahead-link ${pathname === item.href ? 'is-active' : ''}`}
              style={{ '--d': `${0.1 + i * 0.07}s` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="ahead-cta">
          <span className="ahead-cta-fill" />
          <span className="ahead-cta-label">Let&apos;s Talk</span>
        </Link>

        <button
          className={`ahead-burger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile overlay */}
      <div className={`ahead-overlay ${isMenuOpen ? 'open' : ''}`}>
        <nav className="ahead-overlay-nav">
          {[...LINKS, { label: "Let's Talk", href: '/contact' }].map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="ahead-overlay-link"
              style={{ '--d': `${0.05 + i * 0.06}s` }}
            >
              <span>{item.label}</span>
              <span className="arrow">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
