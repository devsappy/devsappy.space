import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { crafts, experience } from '@/lib/content';

export default function Logline() {
  const now = experience.find((e) => !e.end);

  return (
    <section className="logline" data-clip="Logline" data-clip-color="#D6E3F2" data-tone="light" id="about" aria-labelledby="logline-label">
      <div className="wrap">
        <Reveal as="p" className="label" id="logline-label">Logline</Reveal>
        <Reveal as="p" className="logline-text" delay={0.05}>
          A full-stack engineer who edits video builds websites that <em>move like film.</em>
        </Reveal>

        <div className="crafts">
          {[
            [crafts.build, [['Website development', '/services/website-development'], ['3D & WebGL websites', '/services/3d-websites']]],
            [crafts.cut, [['Video editing', '/services/video-editing']]],
          ].map(([c, links], i) => (
            <Reveal className="craft" key={c.title} delay={0.08 * i}>
              <h2 className="craft-title">{c.title}</h2>
              <p className="craft-line">{c.line}</p>
              <dl className="craft-list">
                {c.items.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="craft-links">
                {links.map(([label, href]) => (
                  <Link key={href} href={href}>
                    {label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </p>
            </Reveal>
          ))}
        </div>

        {now && (
          <Reveal as="p" className="logline-now">
            <span className="now-dot" aria-hidden="true" />
            Now: {now.role} at {now.org}. Studying electronics &amp; communication engineering at IEM Kolkata.
          </Reveal>
        )}
      </div>
    </section>
  );
}
