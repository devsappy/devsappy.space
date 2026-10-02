"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Monitor from '@/components/Monitor';
import { domainOf } from '@/lib/content';
import { scrollToY } from '@/lib/scroll';

// Desktop: one pinned program monitor that hard-cuts between projects as you
// scroll. Narrow screens: a plain list where each recording plays in view.
export default function Selects({ projects }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [inView, setInView] = useState(() => projects.map(() => false));
  const [near, setNear] = useState(() => projects.map(() => false));

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px) and (min-height: 600px)');
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Pinned: the active shot follows scroll progress through the track.
  useEffect(() => {
    if (!pinned) return undefined;
    const track = trackRef.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? -r.top / range : 0;
      const i = Math.min(projects.length - 1, Math.max(0, Math.floor(p * projects.length)));
      setActive((prev) => (prev === i ? prev : i));
      const near = r.top < window.innerHeight * 1.5 && r.bottom > -window.innerHeight * 0.5;
      setInView((prev) => (prev[0] === near ? prev : projects.map(() => near)));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pinned, projects]);

  // List: each recording plays while it is mostly on screen.
  useEffect(() => {
    if (pinned) return undefined;
    const items = [...trackRef.current.querySelectorAll('.shot')];
    const io = new IntersectionObserver(
      (entries) => {
        setInView((prev) => {
          const next = [...prev];
          entries.forEach((e) => {
            next[Number(e.target.dataset.index)] = e.intersectionRatio > 0.55;
          });
          return next;
        });
      },
      { threshold: [0, 0.55, 1] }
    );
    // Posters load a screen or so ahead of the visitor, not all at once.
    const ahead = new IntersectionObserver(
      (entries) => {
        setNear((prev) => {
          const next = [...prev];
          entries.forEach((e) => {
            if (e.isIntersecting) next[Number(e.target.dataset.index)] = true;
          });
          return next;
        });
      },
      { rootMargin: '150% 0px' }
    );
    items.forEach((el) => {
      io.observe(el);
      ahead.observe(el);
    });
    return () => {
      io.disconnect();
      ahead.disconnect();
    };
  }, [pinned]);

  const jumpTo = (i) => {
    const track = trackRef.current;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    scrollToY(top + ((i + 0.12) / projects.length) * range);
  };

  return (
    <div
      ref={trackRef}
      className={`selects-track ${pinned ? 'is-pinned' : ''}`}
      style={{ '--n': projects.length }}
    >
      <div className="selects-stage">
        {projects.map((p, i) => {
          const isActive = pinned ? i === active : inView[i];
          return (
            <article
              key={p.slug}
              data-index={i}
              className={`shot ${pinned && i === active ? 'is-active' : ''}`}
              aria-hidden={pinned && i !== active ? true : undefined}
            >
              <div className="shot-monitor">
                <Monitor
                  project={p}
                  active={pinned ? isActive && inView[i] : isActive}
                  near={pinned ? inView[i] && Math.abs(i - active) <= 1 : near[i]}
                />
              </div>
              <div className="shot-info">
                <p className="shot-kind">
                  {p.kind}
                  {p.client && p.client !== p.title ? <> · for {p.client}</> : null}
                </p>
                <h3 className="shot-title">{p.title}</h3>
                <p className="shot-summary">{p.summary}</p>
                <ul className="shot-stack" aria-label="Built with">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="shot-links">
                  <Link
                    className="shot-link"
                    href={`/projects/${p.path}`}
                    tabIndex={pinned && i !== active ? -1 : undefined}
                  >
                    <span>Case study</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    className="shot-link shot-link--quiet"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={pinned && i !== active ? -1 : undefined}
                  >
                    <span>Open {domainOf(p.url)}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            </article>
          );
        })}

        {pinned && (
          <ol className="selects-bin" aria-label="Jump to a project">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <button
                  type="button"
                  className={i === active ? 'is-active' : ''}
                  onClick={() => jumpTo(i)}
                  aria-current={i === active ? 'true' : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/work/${p.slug}.webp`} alt="" loading="lazy" />
                  <span>{p.title}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
