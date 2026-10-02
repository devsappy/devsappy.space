"use client";

import Link from 'next/link';
import { useRef, useState } from 'react';
import Monitor from '@/components/Monitor';
import { domainOf } from '@/lib/content';

// The bin on the left, the program monitor on the right. Every project can be
// watched as a recording or opened live inside the monitor.
export default function WorkExplorer({ projects }) {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const viewRef = useRef(null);
  const p = projects[active];

  const select = (i) => {
    setActive(i);
    setLive(false);
    if (window.matchMedia('(max-width: 960px)').matches && viewRef.current) {
      viewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="explorer">
      <div className="explorer-view" ref={viewRef}>
        <div className="explorer-sticky">
          <div className="explorer-modes" role="group" aria-label="Preview">
            <button type="button" aria-pressed={!live} onClick={() => setLive(false)}>
              Recording
            </button>
            <button type="button" aria-pressed={live} onClick={() => setLive(true)}>
              Live site
            </button>
          </div>

          <Monitor key={`${p.slug}-${live ? 'live' : 'rec'}`} project={p} active live={live} priority />

          <div className="explorer-meta" aria-live="polite">
            <p className="shot-kind">
              {p.kind}
              {p.client && p.client !== p.title ? <> · for {p.client}</> : null}
            </p>
            <h2 className="explorer-title">{p.title}</h2>
            <p className="explorer-summary">{p.summary}</p>
            <ul className="shot-stack" aria-label="Built with">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="shot-links">
              <Link className="shot-link" href={`/projects/${p.path}`}>
                <span>Read the case study</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a className="shot-link shot-link--quiet" href={p.url} target="_blank" rel="noopener noreferrer">
                <span>Open {domainOf(p.url)}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </div>

      <ol className="explorer-bin" aria-label="Projects">
        {projects.map((proj, i) => (
          <li key={proj.slug}>
            <button
              type="button"
              className={i === active ? 'is-active' : ''}
              aria-pressed={i === active}
              onClick={() => select(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/work/${proj.slug}.webp`} alt="" loading="lazy" />
              <span className="explorer-bin-text">
                <span className="explorer-bin-title">{proj.title}</span>
                <span className="explorer-bin-kind">{proj.kind} · {proj.stack.join(', ')}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
