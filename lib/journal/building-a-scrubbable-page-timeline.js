export const post = {
  slug: 'building-a-scrubbable-page-timeline',
  title: 'Building a page timeline you can scrub',
  description:
    'How the timeline strip on devsappy.space works: sections measured into clips, 25 fps timecode that runs in real time, J/K/L playback and pointer scrubbing.',
  date: '2026-10-02',
  updated: '2026-10-02',
  category: 'Development',
  tags: ['javascript', 'react', 'scroll', 'timecode', 'pointer events', 'accessibility', 'ux'],
  summary:
    'Every section on this site is a clip on a timeline pinned to the bottom of the screen. Clip widths come from each section’s share of the scroll, the playhead is the scroll position, and timecode runs at 25 fps, so playback at 1× is real time. Drag to scrub, click to jump, or use J, K and L.',
  sections: [
    {
      id: 'what-it-is',
      heading: 'What the timeline is',
      clip: 'Overview',
      blocks: [
        {
          type: 'p',
          text: 'The timeline is a fixed strip at the bottom of every page that treats the page like a sequence in an editing app. Each section is a clip, the red line is the playhead, and the readout on the left is timecode: hours, minutes, seconds and frames, worked out from how far down the page you are. One control does three jobs: navigation, progress bar and table of contents.',
        },
        {
          type: 'p',
          text: 'It behaves the way an editor would expect:',
        },
        {
          type: 'list',
          items: [
            'Drag anywhere on the strip to scrub through the page.',
            'Click a clip to jump to the start of that section.',
            'Press L to play forward, J to play backward and K to stop. Press L or J again for 2× and then 4×.',
            'Scroll normally at any time. Manual input always takes over from playback.',
          ],
        },
        {
          type: 'figure',
          src: '/journal/building-a-scrubbable-page-timeline/timeline-desktop.webp',
          alt: 'The timeline strip: a play button, the timecode 00:00:45:00 with SELECTS beneath it, and coloured clips labelled Opening, Logline, Selects and Credits, with a red playhead inside Selects.',
          caption: 'The desktop strip, 5,400 px down the home page. 5,400 ÷ 4.8 = 1,125 frames, which is 00:00:45:00 at 25 fps.',
          width: 1216,
          height: 94,
        },
      ],
    },
    {
      id: 'sections-into-clips',
      heading: 'Turning sections into clips',
      clip: 'Clips',
      blocks: [
        {
          type: 'p',
          text: 'Any element with a `data-clip` attribute becomes a clip. On [the home page](/) that means Opening, Logline, Selects, Credits and Contact. The component finds them after each route change, measures where each one starts, and converts those positions into fractions of the page’s total scroll range.',
        },
        {
          type: 'code',
          lang: 'js',
          code: `const max = maxScroll();
const els = [...document.querySelectorAll('[data-clip]')];
// …
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
}).filter((c) => c.end > c.start);`,
          caption: 'Measuring clips in components/Timeline.js.',
        },
        {
          type: 'p',
          text: 'The first version placed each clip at its section’s top divided by the maximum scroll position, and that broke on short pages. A closing section shorter than the screen starts *below* the deepest point you can scroll to, so its clip started at 1, ended at 1 and was filtered out as zero-width. Inner pages were left with a single clip, and because the strip only renders with two or more, the whole timeline disappeared.',
        },
        {
          type: 'p',
          text: 'The rule now is that a section becomes current once its top crosses the middle of the screen, and no clip may start later than 96% of the strip. Even a short end card keeps a visible sliver. Clips are re-measured whenever the page body resizes (through [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)), after the window’s load event and on every route change, so late images and fonts can’t leave the strip out of date.',
        },
      ],
    },
    {
      id: 'timecode',
      heading: 'Timecode that runs in real time',
      clip: 'Timecode',
      blocks: [
        {
          type: 'p',
          text: 'Timecode is the HH:MM:SS:FF address of a frame in video: hours, minutes, seconds and frames. The strip runs at 25 frames per second, the PAL rate used for broadcast in India, and counts one frame for every 4.8 pixels of scroll. The two numbers were chosen together. Playback at 1× moves 25 × 4.8 = 120 pixels per second, so when the page plays itself, the timecode advances exactly one second per second.',
        },
        {
          type: 'code',
          lang: 'js',
          code: `const FPS = 25;
const PX_PER_FRAME = 4.8;
const BASE_SPEED = FPS * PX_PER_FRAME; // px per second at 1×
const RATES = [1, 2, 4];

function timecode(frames) {
  const f = Math.max(0, Math.floor(frames));
  const s = Math.floor(f / FPS);
  const m = Math.floor(s / 60);
  return [Math.floor(m / 60), m % 60, s % 60, f % FPS].map((n) => String(n).padStart(2, '0')).join(':');
}`,
        },
        {
          type: 'p',
          text: 'An automated browser test checked this directly: pressing L and waiting two seconds moved the readout from 00:00:00:00 to 00:00:02:00. One later run read 00:00:02:01, one frame of timing slack.',
        },
        {
          type: 'p',
          text: 'The strip doesn’t listen for scroll events. A single `requestAnimationFrame` loop reads the position every frame, moves the playhead by setting one CSS custom property, writes the timecode text, and touches React state only when something visible changes, such as the name of the current section. A strip that redraws on every frame shouldn’t re-render a component on every frame too.',
        },
      ],
    },
    {
      id: 'j-k-l',
      heading: 'J, K and L',
      clip: 'Shuttle',
      blocks: [
        {
          type: 'p',
          text: 'J, K and L are the shuttle keys in almost every editing application: L plays forward, J plays in reverse, K stops, and pressing L or J again speeds up. The strip does the same, at 1×, 2× and 4×.',
        },
        {
          type: 'code',
          lang: 'js',
          code: `const onKey = (e) => {
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
};`,
        },
        {
          type: 'p',
          text: 'Playback is scrolling driven from the same animation loop. Each frame adds the rate × 120 pixels per second × the frame time, which is capped at 50 ms so the page doesn’t leap after a stall, and scrolls there immediately. Playback stops at either end of the page. The keys are ignored while you type in a form field or hold a modifier, so shortcuts such as Ctrl+L still reach the browser.',
        },
        {
          type: 'p',
          text: 'Manual input always wins. Any wheel or touch event stops playback, and so do the up and down arrow keys, Page Up, Page Down, Space, Home and End. The site smooths scrolling with Lenis, so starting playback also cancels any smooth scroll still easing toward an old target. Without that, the two would fight over the same scroll position.',
        },
      ],
    },
    {
      id: 'scrubbing',
      heading: 'Scrubbing with pointer capture',
      clip: 'Scrub',
      blocks: [
        {
          type: 'p',
          text: 'Scrubbing means dragging the playhead to move through material. On the strip, pressing anywhere captures the pointer with [setPointerCapture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture). The drag keeps working even when the cursor leaves the strip, and every movement maps the pointer’s x position straight to a scroll position.',
        },
        {
          type: 'code',
          lang: 'js',
          code: `const onPointerDown = (e) => {
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
};`,
        },
        {
          type: 'p',
          text: 'The same gesture also has to work as a click. The handler records where the press began and which clip it landed on, and nothing moves until the pointer travels 4 pixels. A press that never crosses that threshold counts as a tap: on a clip it smooth-scrolls to that section, anywhere else it seeks to that point. Because the track holds the pointer capture, taps are resolved in `pointerup` rather than in each button’s click handler. The buttons’ own `onClick` acts only on keyboard activation, which reports [event.detail](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail) as 0.',
        },
        {
          type: 'p',
          text: 'In the automated test, dragging from 10% to 50% of the strip left the page at exactly 0.500 of its scroll range.',
        },
      ],
    },
    {
      id: 'colour-script',
      heading: 'A colour script for free',
      clip: 'Colour',
      blocks: [
        {
          type: 'p',
          text: 'A colour script is a strip of small frames showing how a film’s colour changes from scene to scene. Each section on this site sets `data-clip-color` to its own background colour, so the clips form exactly that: pale sky for the opening, mist for the logline, then dusk, black and night as the page moves toward the end card.',
        },
        {
          type: 'table',
          head: ['Clip', 'Colour', 'Label ink'],
          rows: [
            ['Opening', '`#A9C3E3`', 'Dark'],
            ['Logline', '`#D6E3F2`', 'Dark'],
            ['Selects', '`#2B3E5E`', 'Light'],
            ['Credits', '`#262A33`', 'Light'],
            ['Contact', '`#1B2A4A`', 'Light'],
          ],
        },
        {
          type: 'p',
          text: 'The label colour is computed, not picked by hand. The component weights each clip colour’s red, green and blue channels into one brightness value and uses near-black ink above 0.55 and near-white below. New sections stay legible without any extra settings.',
        },
        {
          type: 'p',
          text: 'On phones the strip shrinks: the labels and the J/K/L hint are hidden, and the clips become a row of colour blocks, which is where the colour-script reading is clearest.',
        },
        {
          type: 'figure',
          src: '/journal/building-a-scrubbable-page-timeline/timeline-phone.webp',
          alt: 'The compact phone strip: a play button, the timecode 00:00:00:00 with OPENING beneath it, and five unlabelled colour blocks.',
          caption: 'On phones the labels drop away and the clips read as a colour script.',
          width: 780,
          height: 128,
        },
      ],
    },
    {
      id: 'access',
      heading: 'Keyboard, focus and a covered button',
      clip: 'Access',
      blocks: [
        {
          type: 'p',
          text: 'Every control in the strip is a real button. The play button announces “Play this page” or “Pause”. The clips sit in a `nav` labelled Sections, so Tab and Enter can jump between them. The timecode is hidden from screen readers, because it changes constantly and means nothing read aloud.',
        },
        {
          type: 'p',
          text: 'A fixed bar at the bottom of the screen can cover things, and an automated test found a real case. On the contact form, submitting with empty fields adds three error messages, which pushed the “Send via email” button down to 824 pixels in a 900-pixel-tall window. It was technically on screen, so nothing scrolled, but a hit test at the button’s centre landed on a timeline clip. WCAG 2.2 has a success criterion for this, Focus Not Obscured: a control with keyboard focus must not be entirely hidden by sticky content.',
        },
        {
          type: 'p',
          text: 'Two changes fixed it. [scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding) on the root element tells the browser to keep scroll targets clear of fixed bars, and it applies to focus scrolling, `scrollIntoView` and anchor jumps alike. The values are 88 pixels at the top for the header, and the strip’s height plus 36 pixels at the bottom. The form was also tightened so the button stays above the strip even with errors showing. The footer carries bottom padding of the strip’s height plus 40 pixels, so the last line of every page can scroll clear.',
        },
        {
          type: 'code',
          lang: 'css',
          code: `html {
  /* Focus and in-page jumps never park an element under the fixed header or timeline. */
  scroll-padding-top: 88px;
  scroll-padding-bottom: calc(var(--tl-h) + 36px);
}`,
          caption: 'The strip is 46 px tall on desktop and 42 px on phones; --tl-h holds that height.',
        },
        {
          type: 'p',
          text: 'The behaviour above is checked by an automated browser suite that drives the production build:',
        },
        {
          type: 'table',
          head: ['Check', 'Result'],
          rows: [
            ['Clips on the home page', 'Opening, Logline, Selects, Credits, Contact'],
            ['Press L, wait two seconds', 'Timecode 00:00:00:00 → 00:00:02:00'],
            ['Press L again', 'Readout shows 2×'],
            ['Press K', 'Position unchanged (under 3 px) after 0.8 s'],
            ['Wheel during playback', 'Playback stops'],
            ['Click the Credits clip', 'Credits lands at the top of the viewport (0 px)'],
            ['Drag from 10% to 50% of the strip', 'Page at 0.500 of its scroll range'],
          ],
        },
        {
          type: 'note',
          text: 'The timeline is the structural half of the site’s film grammar; the [opening shot](/blog/keying-a-title-behind-a-portrait) is the visual half. For the work itself, see the [projects](/projects), or the [website development](/services/website-development) and [video editing](/services/video-editing) services.',
        },
      ],
    },
  ],
};
