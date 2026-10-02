"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/lib/scroll';
import { person } from '@/lib/content';

const LINKS = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/sappy' },
  { label: 'Journal', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState('light');
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef(null);
  const menuRef = useRef(null);

  // Ink on mist, frost on night: read the tone of whatever section is under the bar.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = 34;
      let t = 'light';
      document.querySelectorAll('[data-tone]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) t = el.dataset.tone;
      });
      setTone(t);
      const hero = document.querySelector('.hero');
      const limit = hero ? hero.offsetHeight - window.innerHeight * 0.6 : 40;
      setScrolled(window.scrollY > limit);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Menu open: hold the page still, move focus in, Escape closes.
  useEffect(() => {
    const lenis = getLenis();
    if (!open) {
      lenis && lenis.start();
      document.documentElement.classList.remove('menu-open');
      return undefined;
    }
    lenis && lenis.stop();
    document.documentElement.classList.add('menu-open');
    const first = menuRef.current && menuRef.current.querySelector('a');
    first && first.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current && burgerRef.current.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`site-head tone-${open ? 'light' : tone} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <Link href="/" className="brand" aria-label={`${person.short} — home`}>
          <span className="brand-word">SAPPY</span>
          <span className="brand-bn bn" lang="bn" aria-hidden="true">{person.bangla}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? 'is-active' : ''}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={`site-cta ${isActive('/contact') ? 'is-active' : ''}`}>
            Contact
          </Link>
        </nav>

        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger-lines" aria-hidden="true"><i /><i /></span>
          <span className="burger-label">{open ? 'Close' : 'Menu'}</span>
        </button>
      </header>

      <div id="site-menu" ref={menuRef} className={`menu ${open ? 'is-open' : ''}`} inert={open ? undefined : ''}>
        <nav aria-label="Menu">
          {[{ label: 'Home', href: '/' }, ...LINKS, { label: 'Contact', href: '/contact' }].map((item, i) => (
            <Link key={item.href} href={item.href} style={{ '--i': i }} aria-current={pathname === item.href ? 'page' : undefined}>
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <p className="menu-foot">
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
      </div>
    </>
  );
}
