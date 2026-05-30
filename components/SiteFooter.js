import Link from 'next/link';

const CLIENTS = ['Nblik', 'Brianly', 'Od Solution', 'Vibe Engine', 'Chatterify'];

export default function SiteFooter() {
  return (
    <footer className="afoot">
      <div className="afoot-marquee" aria-hidden="true">
        <div className="afoot-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              {CLIENTS.map((c) => (
                <span className="afoot-client" key={c}>
                  {c} <em>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="afoot-bottom">
        <span className="afoot-copy">© {new Date().getFullYear()} Sappy Studio — India</span>
        <div className="afoot-links">
          <Link href="/projects">Work</Link>
          <Link href="/sappy">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <span className="afoot-tag">Available for work</span>
      </div>
    </footer>
  );
}
