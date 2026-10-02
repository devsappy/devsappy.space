import Link from 'next/link';
import { person } from '@/lib/content';

export default function SiteFooter() {
  return (
    <footer className="site-foot" data-tone="dark">
      <div className="site-foot-inner">
        <p className="site-foot-copy">© {new Date().getFullYear()} {person.name}</p>
        <nav className="site-foot-nav" aria-label="Footer">
          <Link href="/projects">Work</Link>
          <Link href="/sappy">About</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <p className="site-foot-keys">
          Press <kbd>L</kbd> to play this page, <kbd>K</kbd> to stop
        </p>
        <p className="site-foot-status">Available for work</p>
      </div>
    </footer>
  );
}
