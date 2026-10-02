import Link from 'next/link';
import Constellation from '@/components/Constellation';
import CopyEmail from '@/components/CopyEmail';
import Reveal from '@/components/Reveal';
import { person } from '@/lib/content';

export default function EndCard() {
  return (
    <section className="endcard" data-clip="Contact" data-clip-color="#1B2A4A" data-tone="dark" id="contact" aria-labelledby="endcard-title">
      <Reveal className="endcard-sky" as="div">
        <Constellation />
      </Reveal>

      <div className="endcard-inner">
        <p className="label">Contact</p>
        <h2 id="endcard-title" className="endcard-title">
          Have something to build — <em>or to cut?</em>
        </h2>
        <p className="endcard-lead">Tell me about it. I usually reply within 24 hours.</p>

        <div className="endcard-mail">
          <a className="endcard-email" href={`mailto:${person.email}`}>{person.email}</a>
          <CopyEmail email={person.email} />
        </div>

        <ul className="endcard-links">
          <li>
            <Link href="/contact">Project form <span aria-hidden="true">→</span></Link>
          </li>
          <li>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </li>
          <li>
            <a href={person.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </li>
        </ul>
        <p className="endcard-where">Based in {person.city}, {person.country} — working with teams anywhere.</p>
      </div>

      <p className="endcard-caption">
        <span lang="bn" className="bn">{person.bangla}</span>
        <span>
          Saptarshi — the seven sages. It’s what India calls the Big Dipper, and it’s my name.
        </span>
      </p>
    </section>
  );
}
