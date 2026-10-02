import Link from 'next/link';
import { person, projects } from '@/lib/content';
import { services } from '@/lib/services';

export default function SiteFooter() {
  return (
    <footer className="site-foot" data-tone="dark">
      <div className="site-foot-grid">
        <div className="foot-brand">
          <Link href="/" className="brand" aria-label={`${person.short} — home`}>
            <span className="brand-word">SAPPY</span>
            <span className="brand-bn bn" lang="bn" aria-hidden="true">{person.bangla}</span>
          </Link>
          <p className="foot-bio">
            {person.name} — full-stack engineer and video editor in {person.city}, {person.country}.
            Websites, 3D and video for teams anywhere.
          </p>
          <a className="foot-mail" href={`mailto:${person.email}`}>{person.email}</a>
          <p className="site-foot-status">Available for work</p>
        </div>

        <nav className="foot-col" aria-label="Work">
          <p className="foot-h">Work</p>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}><Link href={`/projects/${p.path}`}>{p.title}</Link></li>
            ))}
            <li><Link href="/projects">All work</Link></li>
          </ul>
        </nav>

        <nav className="foot-col" aria-label="Services">
          <p className="foot-h">Services</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
            ))}
            <li><Link href="/services">All services</Link></li>
          </ul>
        </nav>

        <nav className="foot-col" aria-label="Site">
          <p className="foot-h">Site</p>
          <ul>
            <li><Link href="/sappy">About</Link></li>
            <li><Link href="/blog">Journal</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><a href="/rss.xml">RSS feed</a></li>
          </ul>
          <p className="foot-h foot-h--gap">Elsewhere</p>
          <ul>
            <li><a href={person.linkedin} target="_blank" rel="noopener noreferrer me">LinkedIn ↗</a></li>
            <li><a href={person.github} target="_blank" rel="noopener noreferrer me">GitHub ↗</a></li>
          </ul>
        </nav>
      </div>

      <div className="site-foot-bottom">
        <p>© {new Date().getFullYear()} {person.name}</p>
        <p className="site-foot-keys">
          Press <kbd>L</kbd> to play this page, <kbd>K</kbd> to stop
        </p>
      </div>
    </footer>
  );
}
