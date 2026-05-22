"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="desktop-links">
          <Link href="/" className="header-item">Home</Link>
          <Link href="/projects" className="header-item">Project</Link>
          <Link href="/sappy" className="header-item">Sappy</Link>
          <Link href="/blog" className="header-item">Blog</Link>
          <Link href="/contact" className="header-item">Contact</Link>
        </div>
        
        {/* Mobile Header Bar */}
        <div className="mobile-header">
          <div className="mobile-logo">Sappy.</div>
          <button 
            className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link href="/" className="mobile-nav-link">Home</Link>
          <Link href="/projects" className="mobile-nav-link">Project</Link>
          <Link href="/sappy" className="mobile-nav-link">Sappy</Link>
          <Link href="/blog" className="mobile-nav-link">Blog</Link>
          <Link href="/contact" className="mobile-nav-link">Contact</Link>
        </nav>
      </div>
    </>
  );
}
