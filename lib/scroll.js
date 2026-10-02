// One shared smooth-scroll instance. Components that move the page
// (timeline scrubbing, autoplay, section jumps) go through these helpers so
// they work the same with or without Lenis (reduced motion turns it off).

let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

export function scrollToY(y, { immediate = false } = {}) {
  const target = Math.min(Math.max(0, y), maxScroll());
  if (lenis) {
    lenis.scrollTo(target, { immediate, force: true, lock: false });
  } else {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function stopSmoothing() {
  if (lenis) lenis.scrollTo(window.scrollY, { immediate: true, force: true });
}
