"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { maxScroll, scrollToY, stopSmoothing } from '@/lib/scroll';

// The page as a sequence. Every element with data-clip="Name" becomes a clip
// whose width is the share of scroll it occupies; the playhead is the scroll
// position; timecode runs at 25 fps, so pressing play at 1× runs it in real time.
const FPS = 25;
const PX_PER_FRAME = 4.8;
const BASE_SPEED = FPS * PX_PER_FRAME; // px per second at 1×
const RATES = [1, 2, 4];

function timecode(frames) {
  const f = Math.max(0, Math.floor(frames));
  const s = Math.floor(f / FPS);
  const m = Math.floor(s / 60);
  return [Math.floor(m / 60), m % 60, s % 60, f % FPS].map((n) => String(n).padStart(2, '0')).join(':');
}

// Clips are tinted with their section's grade, so the strip doubles as the
// page's colour script; pick legible label ink for each.
function inkFor(hex) {
  const n = parseInt((hex || '#2b3e5e').replace('#', ''), 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum > 0.55 ? '#0B1220' : '#E4ECF5';
}

function isTyping(el) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

export default function Timeline() {
  const pathname = usePathname();
  const [clips, setClips] = useState([]);
  const [rate, setRate] = useState(0);
  const [current, setCurrent] = useState('');
  const rateRef = useRef(0);
  const trackRef = useRef(null);
  const headRef = useRef(null);
  const tcRef = useRef(null);
  const clipsRef = useRef([]);
  const scrubRef = useRef(null);

  const changeRate = useCallback((next) => {
    rateRef.current = next;
    setRate(next);
    if (next !== 0) stopSmoothing();
  }, []);

  // Measure the sections on this route.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = maxScroll();
        const els = [...document.querySelectorAll('[data-clip]')];
        if (max <= 0 || els.length < 2) {
          clipsRef.current = [];
          setClips([]);
          return;
        }
        const tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
        // A section is "on" once its top crosses the middle of the screen; a short last
        // section still gets a sliver of the strip instead of vanishing past max scroll.
        const half = window.innerHeight * 0.5;
        const starts = tops.map((t, i) => (i === 0 ? 0 : Math.min(0.96, Math.max(0, (t - half) / max))));
        const list = els.map((el, i) => {
          const start = starts[i];
          const end = i < els.length - 1 ? starts[i + 1] : 1;
          const color = el.dataset.clipColor || '#2B3E5E';
          return { label: el.dataset.clip, start, end, top: tops[i], color, ink: inkFor(color) };
        }).filter((c) => c.end > c.start);
        clipsRef.current = list;
        setClips(list);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('load', measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('load', measure);
    };
  }, [pathname]);

  // Stop playback when the route changes.
  useEffect(() => {
    changeRate(0);
  }, [pathname, changeRate]);

  // Per-frame: playhead + timecode from scroll, and autoplay when a rate is set.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let lastLabel = '';
    let y = window.scrollY;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const max = maxScroll();
      const r = rateRef.current;
      if (r !== 0) {
        y = Math.min(max, Math.max(0, y + r * BASE_SPEED * dt));
        scrollToY(y, { immediate: true });
        if ((r > 0 && y >= max - 0.5) || (r < 0 && y <= 0.5)) {
          rateRef.current = 0;
          setRate(0);
        }
      } else {
        y = window.scrollY;
      }
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (headRef.current) headRef.current.style.setProperty('--p', p.toFixed(5));
      if (tcRef.current) tcRef.current.textContent = timecode(y / PX_PER_FRAME);
      const list = clipsRef.current;
      let label = '';
      for (let i = 0; i < list.length; i++) if (p >= list[i].start - 0.0005) label = list[i].label;
      if (label !== lastLabel) {
        lastLabel = label;
        setCurrent(label);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // J / K / L — the shuttle keys every editor already knows.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const k = e.key.toLowerCase();
      const r = rateRef.current;
      if (k === 'l') {
        e.preventDefault();
        changeRate(r > 0 ? RATES[Math.min(RATES.length - 1, RATES.indexOf(r) + 1)] : 1);
      } else if (k === 'j') {
        e.preventDefault();
        changeRate(r < 0 ? -RATES[Math.min(RATES.length - 1, RATES.indexOf(-r) + 1)] : -1);
      } else if (k === 'k') {
        e.preventDefault();
        changeRate(0);
      } else if (r !== 0 && ['arrowdown', 'arrowup', 'pagedown', 'pageup', ' ', 'home', 'end'].includes(k)) {
        changeRate(0);
      }
    };
    // Any manual scroll intent takes the wheel back from autoplay.
    const takeOver = () => {
      if (rateRef.current !== 0) changeRate(0);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', takeOver, { passive: true });
    window.addEventListener('touchstart', takeOver, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', takeOver);
      window.removeEventListener('touchstart', takeOver);
    };
  }, [changeRate]);

  const seekToClient = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    scrollToY(p * maxScroll(), { immediate: true });
  };

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    changeRate(0);
    const clipEl = e.target.closest('[data-clip-index]');
    scrubRef.current = { x: e.clientX, moved: false, clip: clipEl ? Number(clipEl.dataset.clipIndex) : null };
    trackRef.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const s = scrubRef.current;
    if (!s) return;
    if (!s.moved && Math.abs(e.clientX - s.x) < 4) return;
    s.moved = true;
    trackRef.current.classList.add('is-scrubbing');
    seekToClient(e.clientX);
  };
  const onPointerUp = (e) => {
    const s = scrubRef.current;
    scrubRef.current = null;
    trackRef.current.classList.remove('is-scrubbing');
    if (!s || s.moved) return;
    if (s.clip !== null && clipsRef.current[s.clip]) {
      scrollToY(clipsRef.current[s.clip].top);
    } else {
      seekToClient(e.clientX);
    }
  };

  if (clips.length < 2) return null;

  const playing = rate !== 0;
  const speed = Math.abs(rate);

  return (
    <div className="tl" role="region" aria-label="Page timeline">
      <button
        type="button"
        className={`tl-play ${playing ? 'is-playing' : ''}`}
        onClick={() => changeRate(playing ? 0 : 1)}
        aria-label={playing ? 'Pause' : 'Play this page'}
        title={playing ? 'Pause (K)' : 'Play (L)'}
      >
        {playing ? (
          <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2.5" width="3.5" height="11" /><rect x="9.5" y="2.5" width="3.5" height="11" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.2v11.6L13.5 8z" /></svg>
        )}
      </button>

      <div className="tl-readout">
        <span className="tl-tc" ref={tcRef} aria-hidden="true">00:00:00:00</span>
        <span className="tl-meta">
          {playing ? `${rate < 0 ? '◂◂' : '▸▸'} ${speed}×` : current || '25p'}
        </span>
      </div>

      <span className="tl-track-label" aria-hidden="true">V1</span>
      <div
        className="tl-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <nav className="tl-clips" aria-label="Sections">
          {clips.map((c, i) => (
            <button
              type="button"
              key={c.label + i}
              data-clip-index={i}
              className={`tl-clip ${current === c.label ? 'is-current' : ''}`}
              style={{
                left: `${c.start * 100}%`,
                width: `${(c.end - c.start) * 100}%`,
                '--clip': c.color,
                '--clip-ink': c.ink,
              }}
              onClick={(e) => {
                if (e.detail === 0) scrollToY(c.top);
              }}
            >
              <span>{c.label}</span>
            </button>
          ))}
        </nav>
        <span className="tl-head" ref={headRef} aria-hidden="true" />
      </div>

      <span className="tl-keys" aria-hidden="true">
        <kbd>J</kbd><kbd>K</kbd><kbd>L</kbd>
      </span>
    </div>
  );
}
