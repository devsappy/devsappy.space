"use client";

import { useEffect, useRef, useState } from 'react';
import { domainOf } from '@/lib/content';

const FPS = 25;
const tc = (sec) => {
  const f = Math.max(0, Math.floor(sec * FPS));
  const s = Math.floor(f / FPS);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f % FPS).padStart(2, '0')}`;
};

/**
 * A program monitor for one project: its recorded scroll-through plays while
 * `active`; with `live`, the real site is mounted in an iframe instead.
 */
export default function Monitor({ project, active, live = false, priority = false, near = true }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const tcRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Play when this shot is on screen; cut back to the head of the clip when it leaves.
  // With reduced motion nothing autoplays — the play control still works.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || live) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (active && !reduced) {
      v.preload = 'auto';
      const p = v.play();
      if (p && p.catch) p.catch(() => setPlaying(false));
    } else {
      v.pause();
      if (!active) {
        try {
          v.currentTime = 0;
        } catch {
          /* not loaded yet */
        }
      }
    }
  }, [active, live]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || live) return undefined;
    let raf = 0;
    const draw = () => {
      const d = v.duration || 1;
      if (barRef.current) barRef.current.style.setProperty('--t', (v.currentTime / d).toFixed(4));
      if (tcRef.current) tcRef.current.textContent = tc(v.currentTime);
      if (!v.paused) raf = requestAnimationFrame(draw);
    };
    const onPlay = () => {
      setPlaying(true);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const onPause = () => {
      setPlaying(false);
      draw();
    };
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('seeked', draw);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('seeked', draw);
    };
  }, [live]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.preload = 'auto';
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const domain = domainOf(project.url);

  return (
    <figure className={`monitor ${live ? 'is-live' : ''}`}>
      <div className="monitor-screen">
        {live ? (
          <iframe src={project.url} title={`${project.title} — live site`} loading="lazy" />
        ) : (
          <video
            ref={videoRef}
            src={`/work/${project.slug}.mp4`}
            poster={near || active ? `/work/${project.slug}.webp` : undefined}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            aria-label={`Screen recording of ${project.title}`}
          />
        )}
      </div>
      <figcaption className="monitor-bar">
        {live ? (
          <span className="monitor-state"><i className="monitor-dot is-live" />Live</span>
        ) : (
          <button type="button" className="monitor-state" onClick={toggle} aria-label={playing ? `Pause ${project.title} recording` : `Play ${project.title} recording`}>
            <i className={`monitor-dot ${playing ? 'is-on' : ''}`} />
            {playing ? 'Playing' : 'Paused'}
          </button>
        )}
        <span className="monitor-src">{domain}</span>
        {!live && (
          <>
            <span className="monitor-progress" ref={barRef} aria-hidden="true"><i /></span>
            <span className="monitor-tc" ref={tcRef} aria-hidden="true">00:00:00</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
