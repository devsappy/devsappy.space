import Link from 'next/link';

// Premiere Pro shows a red "Media Offline" frame when a clip's file can't be
// found. A missing page is the same thing.
const LANGS = ['Media offline', 'Médias hors ligne', 'Medien offline', 'Media non in linea', 'メディアオフライン', 'মিডিয়া অফলাইন'];

export default function NotFound() {
  return (
    <main id="main" className="offline" data-tone="dark">
      <div className="offline-langs" aria-hidden="true">
        {LANGS.map((l) => (
          <span key={l} lang={l === 'মিডিয়া অফলাইন' ? 'bn' : undefined} className={l === 'মিডিয়া অফলাইন' ? 'bn' : undefined}>{l}</span>
        ))}
      </div>
      <div className="offline-card">
        <p className="offline-tc">Error 404 · clip not found</p>
        <h1 className="offline-title">Media offline</h1>
        <p className="offline-lead">
          This link doesn’t point to a clip any more. The page may have moved, or the address has a
          typo.
        </p>
        <nav className="offline-links" aria-label="Relink">
          <Link href="/">Home</Link>
          <Link href="/projects">Work</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </main>
  );
}
