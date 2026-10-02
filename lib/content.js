// Everything the site says about Sappy lives here, so the home page, the
// work archive and the about page never drift apart.

export const person = {
  name: 'Saptarshi Chattopadhyay',
  short: 'Sappy',
  bangla: 'সপ্তর্ষি',
  banglaFull: 'সপ্তর্ষি চট্টোপাধ্যায়',
  role: 'Full-stack engineer & video editor',
  location: 'India',
  // Where the site says he's based. Kolkata comes from his current B.Tech at IEM Kolkata.
  city: 'Kolkata',
  region: 'West Bengal',
  country: 'India',
  countryCode: 'IN',
  // Add a showreel URL (YouTube or Vimeo) and the video-editing page gains a reel section.
  reel: null,
  email: 'saph.6869@gmail.com',
  linkedin: 'https://linkedin.com/in/saptarshichattopadhyay-05380622b',
  github: 'https://github.com/devsappy',
  // Vercel serves the site on www and redirects the bare domain there, so the
  // official address (canonicals, sitemap, structured data) is the www one.
  site: 'https://www.devsappy.space',
};

// Footage in /public/work was recorded from each live site (poster + scroll-through).
// Stacks are what actually runs on the deployed page, not a wish list.
export const projects = [
  {
    slug: 'coffee3d', // asset name in /public/work
    path: 'coffee-3d', // URL: /projects/coffee-3d
    title: 'Coffee 3D',
    client: 'Block & Brew',
    url: 'https://cofee3d.vercel.app',
    kind: '3D brand site',
    stack: ['React', 'Three.js', 'Vite'],
    summary:
      'A voxel coffee bar built in Three.js. Scrolling flies the camera through the shop and up to the menu board.',
  },
  {
    slug: 'vanta', // asset name in /public/work
    path: 'vanta', // URL: /projects/vanta
    title: 'Vanta',
    client: 'Vanta',
    url: 'https://vanta-ruddy.vercel.app',
    kind: 'Brand site',
    stack: ['React', 'Vite'],
    summary:
      'A running brand’s manifesto, told in motion: an aerial track photograph under heavy type, then product stories as you scroll.',
  },
  {
    slug: 'kilnforge', // asset name in /public/work
    path: 'kiln-forge', // URL: /projects/kiln-forge
    title: 'Kiln Forge',
    client: 'Kilnforge',
    url: 'https://kilnforge.vercel.app',
    kind: 'Product catalog',
    stack: ['React', 'Vite'],
    summary:
      'A catalog for coffee-roasting machines. Blueprint line drawings, an editorial serif and dossier-style detailing.',
  },
  {
    slug: 'pixelforge', // asset name in /public/work
    path: 'pixel-forge', // URL: /projects/pixel-forge
    title: 'Pixel Forge',
    client: 'GPTShopExpert',
    url: 'https://pixelforge-tau.vercel.app',
    kind: 'Agency site',
    stack: ['React', 'Vite'],
    summary:
      'For a GEO & AEO agency that gets businesses cited by AI search. A rotating 3D satellite, HUD labels and an acid-on-black system.',
  },
  {
    slug: 'cafekaleido', // asset name in /public/work
    path: 'cafe-kaleido', // URL: /projects/cafe-kaleido
    title: 'Cafe Kaleido',
    client: 'Cafe Kaleido',
    url: 'https://cafekaleido.vercel.app',
    kind: 'Brand site',
    stack: ['React', 'Vite'],
    summary:
      'A neighbourhood cafe, loud on purpose: neo-brutalist blocks, a running ticker and a colour-coded menu.',
  },
  {
    slug: 'chatterify', // asset name in /public/work
    path: 'chatterify', // URL: /projects/chatterify
    title: 'Chatterify',
    client: 'Chatterify Mail Studio',
    url: 'https://emailautomationchatterify.vercel.app',
    kind: 'Web app',
    stack: ['React', 'Three.js', 'Vite'],
    summary:
      'A workspace to compose, preview and send outbound email through your own SMTP, with readiness checks and reusable templates.',
  },
];

export const domainOf = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export const experience = [
  {
    role: 'Research & Development Specialist',
    org: 'Multiplier AI',
    start: '2026-06',
    end: null,
    track: 'Research',
    desc: 'Research across revenue and marketing to support product and business decisions.',
  },
  {
    role: 'Full Stack Engineer',
    org: 'Vibe Engine AI',
    start: '2025-08',
    end: '2026-06',
    track: 'Code',
    desc: 'Interactive, animation-driven web apps in React, Next.js and Tailwind CSS on a Python/FastAPI backend, including Three.js 3D visualisations and GSAP-driven storytelling.',
  },
  {
    role: 'Video Editor',
    org: 'OD Solution, Austria',
    start: '2025-02',
    end: '2025-10',
    track: 'Video',
    desc: 'Edited video content and motion graphics in Adobe Premiere Pro and After Effects.',
  },
  {
    role: 'Frontend & AI/ML Developer',
    org: 'Brainly',
    start: '2023-05',
    end: '2023-07',
    track: 'Code',
    desc: 'Built frontend features in React and contributed to model training.',
  },
];

export const education = [
  {
    degree: 'B.Tech, Electronics & Communication Engineering',
    school: 'Institute of Engineering and Management, Kolkata',
    start: '2023-07',
    end: '2027-05',
  },
  {
    degree: 'Higher Secondary, PCMC',
    school: 'Kalyani Public School',
    start: '2021-04',
    end: '2023-04',
  },
];

export const crafts = {
  build: {
    title: 'Build',
    line: 'Interactive web apps, end to end.',
    items: [
      ['Frontend', 'React, Next.js, Tailwind CSS'],
      ['3D & motion', 'Three.js, GSAP, WebGL'],
      ['Backend', 'Python, FastAPI'],
      ['AI', 'LLM features with the Groq API'],
    ],
  },
  cut: {
    title: 'Cut',
    line: 'Edits and motion graphics for brands.',
    items: [
      ['Edit', 'Adobe Premiere Pro'],
      ['Motion', 'Adobe After Effects'],
      ['Delivery', 'Cut for web, social and product launches'],
    ],
  },
};

export const services = [
  'Web development',
  'React & Next.js',
  '3D & WebGL (Three.js)',
  'Motion & GSAP animation',
  'Python & FastAPI backends',
  'AI / LLM integration',
  'Video editing & motion graphics',
];

export const clients = ['Multiplier AI', 'Vibe Engine AI', 'OD Solution', 'Brainly', 'Nblik'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function monthLabel(ym) {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function period(start, end) {
  return `${monthLabel(start)} — ${monthLabel(end)}`;
}
