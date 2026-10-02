"use client";

import { useEffect, useRef, useState } from 'react';
import { createMist } from '@/lib/mist';
import { person } from '@/lib/content';

// The opening shot. Sappy's photograph is split into a clean sky plate and a keyed
// foreground (hills, trees, him); the title sits between them, so it reads as if
// it were hung in the sky behind his head. Mist drifts on both sides of the cut-out.
const AR = 2400 / 1347;
const SUBJECT_X = 0.47; // head centre, image space
const HEAD_TOP = 0.215; // top of the hair, image space
const OVERLAP = 0.42; // how much of the letters his head covers
const MIST = '#D6E3F2';

const CUES = [
  'I build for the web — React, Next.js, Three.js.',
  'And I cut video — Premiere Pro, After Effects.',
  null, // filled per input type
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function measureTitle(word) {
  const cs = getComputedStyle(word);
  const prev = word.style.fontSize;
  word.style.fontSize = '100px';
  const width = word.getBoundingClientRect().width / 100;
  word.style.fontSize = prev;
  let cap = 0.7;
  let asc = 0.95;
  let desc = 0.25;
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
    const h = ctx.measureText('H');
    if (h.actualBoundingBoxAscent) cap = h.actualBoundingBoxAscent / 100;
    if (h.fontBoundingBoxAscent) asc = h.fontBoundingBoxAscent / 100;
    if (h.fontBoundingBoxDescent) desc = h.fontBoundingBoxDescent / 100;
  } catch {
    /* keep defaults */
  }
  return { width, cap, capTop: (1 + asc - desc) / 2 - cap };
}

function computeLayout(fw, fh, m) {
  const landscape = fw / fh >= 1.05;
  let bw;
  if (landscape) {
    bw = Math.max(fw, fh * AR);
  } else {
    bw = fw * clamp((fh / fw) * 1.22, 1.5, 2.9);
  }
  const bh = bw / AR;
  const bx = clamp(fw * 0.5 - SUBJECT_X * bw, fw - bw, 0);
  let by = fh - bh;

  const gutter = Math.max(16, fw * (landscape ? 0.035 : 0.055));
  let size = (fw - gutter * 2) / m.width;
  size = Math.min(size, (fh * 0.36) / m.cap);
  const capH = size * m.cap;
  const headTop = by + HEAD_TOP * bh;
  let capTop = headTop + capH * OVERLAP - capH;
  const minTop = Math.max(84, fh * (landscape ? 0.13 : 0.16));
  if (capTop < minTop) {
    const shift = minTop - capTop;
    by += shift;
    capTop += shift;
  }
  const titleW = size * m.width;
  return {
    bw, bh, bx, by,
    size,
    tx: (fw - titleW) / 2,
    ty: capTop - m.capTop * size,
  };
}

export default function Hero() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const wordRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [graded, setGraded] = useState(false);
  const [cue, setCue] = useState(-1);
  const [finalCue, setFinalCue] = useState('This site is my timeline. Scroll to scrub, or press L to play.');

  // Layout: place the picture and size the title to the viewport.
  useEffect(() => {
    const frame = frameRef.current;
    const word = wordRef.current;
    let metrics = null;
    let cancelled = false;

    const apply = () => {
      if (!metrics) return;
      const fw = frame.clientWidth;
      const fh = frame.clientHeight;
      const L = computeLayout(fw, fh, metrics);
      const st = frame.style;
      st.setProperty('--bw', `${L.bw}px`);
      st.setProperty('--bh', `${L.bh}px`);
      st.setProperty('--bx', `${L.bx}px`);
      st.setProperty('--by', `${L.by}px`);
      st.setProperty('--ts', `${L.size}px`);
      st.setProperty('--tx', `${L.tx}px`);
      st.setProperty('--ty', `${L.ty}px`);
    };

    const imgs = [...frame.querySelectorAll('img')];
    const decoded = Promise.all(imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())));
    // Wait for the actual title face, not just "whatever is loading right now":
    // measuring the fallback font would size the title wrong.
    const cs = getComputedStyle(word);
    const fontReady = document.fonts
      ? document.fonts.load(`${cs.fontWeight} 100px ${cs.fontFamily}`, 'SAPPY').catch(() => {}).then(() => document.fonts.ready)
      : Promise.resolve();
    const remeasure = () => {
      if (cancelled) return;
      metrics = measureTitle(word);
      apply();
    };

    fontReady.then(() => {
      remeasure();
      return decoded;
    }).then(() => {
      if (!cancelled) requestAnimationFrame(() => setReady(true));
    });

    if (document.fonts) document.fonts.addEventListener('loadingdone', remeasure);
    const ro = new ResizeObserver(apply);
    ro.observe(frame);
    return () => {
      cancelled = true;
      ro.disconnect();
      if (document.fonts) document.fonts.removeEventListener('loadingdone', remeasure);
    };
  }, []);

  // Pointer parallax, scroll push-in and the two mist layers share one loop.
  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none)').matches;
    setFinalCue(
      coarse
        ? 'This site is my timeline. Scroll to scrub, or tap ▶ to play.'
        : 'This site is my timeline. Scroll to scrub, or press L to play.'
    );

    const scale = coarse ? 0.32 : 0.5;
    const back = backRef.current ? createMist(backRef.current, { density: 0.55, low: 0.35, seed: 3.1, color: MIST, scale }) : null;
    const front = frontRef.current ? createMist(frontRef.current, { density: 0.42, low: 1, top: 0.5, seed: 11.7, color: MIST, scale }) : null;

    const s = { px: 0, py: 0, tx: 0, ty: 0, mx: 0.5, my: 0.5, tmx: 0.5, tmy: 0.5, amt: 0, tamt: 0, visible: true };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      s.tx = x * 2 - 1;
      s.ty = y * 2 - 1;
      s.tmx = x;
      s.tmy = 1 - y;
      s.tamt = 1;
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
      s.tamt = 0;
    };
    frame.addEventListener('pointermove', onMove);
    frame.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
    });
    io.observe(section);

    const onResize = () => {
      back && back.resize();
      front && front.resize();
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    let lastP = -1;
    const t0 = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!s.visible || document.hidden) return;

      const rect = section.getBoundingClientRect();
      const range = Math.max(1, rect.height - frame.clientHeight);
      const p = clamp(-rect.top / range, 0, 1);
      // With reduced motion the mist is a still; only redraw when scroll moves it.
      if (reduce && p === lastP) return;
      lastP = p;

      s.px += (s.tx - s.px) * 0.06;
      s.py += (s.ty - s.py) * 0.06;
      s.mx += (s.tmx - s.mx) * 0.08;
      s.my += (s.tmy - s.my) * 0.08;
      s.amt += (s.tamt - s.amt) * 0.04;

      const st = frame.style;
      if (!reduce) {
        st.setProperty('--px', s.px.toFixed(4));
        st.setProperty('--py', s.py.toFixed(4));
      }
      st.setProperty('--p', p.toFixed(4));

      const time = reduce ? 4 : (now - t0) / 1000;
      const dissolve = clamp((p - 0.12) / 0.4, 0, 1);
      const m = { time, mouseX: s.mx, mouseY: s.my, mouseAmt: reduce ? 0 : s.amt };
      back && back.render({ ...m, dissolve: 0 });
      front && front.render({ ...m, dissolve: dissolve * dissolve });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      frame.removeEventListener('pointermove', onMove);
      frame.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      back && back.destroy();
      front && front.destroy();
    };
  }, []);

  // Once the grade-in and focus pull finish, drop the filters so nothing keeps compositing.
  useEffect(() => {
    if (!ready) return undefined;
    const t = setTimeout(() => setGraded(true), 2900);
    return () => clearTimeout(t);
  }, [ready]);

  // Subtitles: three cues, then rest on the last one.
  useEffect(() => {
    if (!ready) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCue(2);
      return undefined;
    }
    const timers = [
      setTimeout(() => setCue(0), 1500),
      setTimeout(() => setCue(1), 5100),
      setTimeout(() => setCue(2), 8700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [ready]);

  const cues = CUES.map((c, i) => (i === 2 ? finalCue : c));

  return (
    <section ref={sectionRef} className="hero" data-clip="Opening" data-clip-color="#A9C3E3" data-tone="light" aria-labelledby="hero-title">
      <noscript>
        <style>{'.hero-picture,.hero-slate{opacity:1;filter:none;transform:none}.hero-word{opacity:1;filter:none;transform:none}'}</style>
      </noscript>
      <div ref={frameRef} className={`hero-frame ${ready ? 'is-ready' : ''} ${graded ? 'is-graded' : ''}`}>
        <div className="hero-picture">
          <div className="hero-layer hero-layer--plate" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/plate.jpg" alt="" decoding="async" />
          </div>

          <h1 id="hero-title" className="hero-title">
            <span ref={wordRef} className="hero-word" aria-hidden="true">SAPPY</span>
            <span className="sr-only">{person.name} — {person.role}, {person.location}</span>
          </h1>

          <canvas ref={backRef} className="hero-mist hero-mist--back" aria-hidden="true" />

          <div className="hero-layer hero-layer--fg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/fg-1600.webp"
              srcSet="/hero/fg-1000.webp 1000w, /hero/fg-1600.webp 1600w, /hero/fg-1800.webp 1800w, /hero/fg-2400.webp 2400w"
              sizes="(orientation: portrait) 160vw, max(100vw, 178vh)"
              alt={`${person.name} on a misty hillside, looking away from the camera`}
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <canvas ref={frontRef} className="hero-mist hero-mist--front" aria-hidden="true" />
          <div className="hero-veil" aria-hidden="true" />
        </div>

        <div className="hero-ui">
          <p className="hero-slate">
            <span className="hero-slate-name">{person.name}</span>
            <span className="hero-slate-role">
              {person.role} · <span lang="bn" className="bn">{person.bangla}</span> · {person.location}
            </span>
          </p>
          <div className="hero-subs" aria-hidden="true">
            {cues.map((text, i) => (
              <p key={i} className={`hero-sub ${cue === i ? 'is-on' : ''}`}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
