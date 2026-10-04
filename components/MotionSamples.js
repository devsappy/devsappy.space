"use client";

import { useEffect, useRef, useState } from 'react';

const FPS = 25;
const tc = (sec) => {
  const f = Math.max(0, Math.floor(sec * FPS));
  const s = Math.floor(f / FPS);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f % FPS).padStart(2, '0')}`;
};

/**
 * One short motion piece in a small program monitor. It loops silently while
 * it is on screen and stops when it leaves; once the viewer pauses it, it
 * stays paused. With reduced motion nothing autoplays.
 */
function Sample({ clip }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const tcRef = useRef(null);
  const heldRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (reduced || heldRef.current) return;
          v.preload = 'auto';
          v.play().catch(() => setPlaying(false));
        } else {
          v.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
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
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      heldRef.current = false;
      v.preload = 'auto';
      v.play().catch(() => {});
    } else {
      heldRef.current = true;
      v.pause();
    }
  };

  return (
    <figure className="sample">
      <div className="monitor">
        <div className="monitor-screen monitor-screen--wide">
          <video
            ref={videoRef}
            src={`/motion/${clip.slug}.mp4`}
            poster={`/motion/${clip.slug}.webp`}
            muted
            loop
            playsInline
            preload="none"
            aria-label={clip.alt}
          />
        </div>
        <div className="monitor-bar">
          <button type="button" className="monitor-state" onClick={toggle} aria-label={playing ? `Pause ${clip.title}` : `Play ${clip.title}`}>
            <i className={`monitor-dot ${playing ? 'is-on' : ''}`} />
            {playing ? 'Playing' : 'Paused'}
          </button>
          <span className="monitor-src">{clip.kind}</span>
          <span className="monitor-progress" ref={barRef} aria-hidden="true"><i /></span>
          <span className="monitor-tc" ref={tcRef} aria-hidden="true">00:00:00</span>
        </div>
      </div>
      <figcaption>
        <span className="sample-title">{clip.title}</span>
        <span className="sample-text">{clip.text}</span>
      </figcaption>
    </figure>
  );
}

export default function MotionSamples({ clips }) {
  return (
    <div className="samples">
      {clips.map((clip) => (
        <Sample key={clip.slug} clip={clip} />
      ))}
    </div>
  );
}
