// Service pages. `answer` is the self-contained summary search engines and AI
// assistants can quote; everything else is the page body. Strings support the
// same inline syntax as journal posts: `code`, **bold**, *em*, [links](/path).

export const services = [
  {
    slug: 'website-development',
    title: 'Website development',
    nav: 'Websites',
    metaTitle: 'Freelance Website Developer in Kolkata — Next.js & React',
    description:
      'Hire Saptarshi Chattopadhyay (Sappy), a freelance website developer in Kolkata, India: fast, animated websites and web apps in Next.js, React and Three.js.',
    lead: 'Fast, animated websites and web apps — designed and built end to end in Next.js and React.',
    answer:
      'Saptarshi Chattopadhyay (Sappy) is a freelance website developer based in Kolkata, India, working with clients worldwide. He designs and builds websites and web apps end to end: React and Next.js on the front end, Python and FastAPI behind them, and motion or 3D with GSAP and Three.js where it helps the story.',
    deliverables: [
      ['Design and build', 'A site designed around your content and built in Next.js and React, styled with Tailwind CSS or plain CSS.'],
      ['Motion and 3D', 'Scroll storytelling with GSAP and Three.js when it serves the message — and restraint when it doesn’t.'],
      ['Back end and AI features', 'APIs in Python and FastAPI, working forms, and LLM features through APIs such as Groq.'],
      ['Search and speed', 'Static rendering, right-sized images and fonts, structured data and clean metadata, so pages load fast and are easy to find.'],
      ['Checked everywhere', 'Tested across devices and browsers before release.'],
    ],
    process: [
      ['Brief', 'You share the goal, the audience, references and timing. I reply with questions and an estimate.'],
      ['Design', 'Structure and look are agreed first, before any code.'],
      ['Build', 'The site is built in small steps you can review on a live preview link.'],
      ['Launch', 'Deployed, checked across devices, and handed over with notes on how to update it.'],
    ],
    related: ['kilnforge', 'cafekaleido', 'pixelforge', 'vanta'],
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'GSAP', 'Python', 'FastAPI', 'Vercel'],
    faq: [
      ['Do you work with clients outside India?', 'Yes. I’m based in Kolkata and work remotely with teams anywhere.'],
      ['What do you build websites with?', 'React and Next.js for the front end, Tailwind CSS or plain CSS for styling, Three.js and GSAP for 3D and motion, and Python with FastAPI for back ends and APIs.'],
      ['Can you make the launch video as well?', 'Yes. I also edit video and motion graphics in Premiere Pro and After Effects, so the site and its film can come from one person. See [video editing](/services/video-editing).'],
      ['Will the site be fast and easy to find?', 'Pages are statically rendered where possible, with right-sized images and fonts, structured data, a sitemap and clean metadata — the same setup this site runs on.'],
      ['How do I get a quote?', 'Send a short brief through the [contact form](/contact): what you’re making, who it’s for and when it needs to ship. I usually reply within 24 hours.'],
    ],
  },
  {
    slug: 'video-editing',
    title: 'Video editing',
    nav: 'Video',
    metaTitle: 'Freelance Video Editor in Kolkata — Premiere & After Effects',
    description:
      'Freelance video editor in Kolkata, India: brand and product videos and motion graphics, edited in Adobe Premiere Pro and After Effects. Remote worldwide.',
    lead: 'Edits and motion graphics for brands, products and launches — cut in Premiere Pro, finished in After Effects.',
    answer:
      'Saptarshi Chattopadhyay (Sappy) is a freelance video editor based in Kolkata, India. He edits brand and product videos and creates motion graphics in Adobe Premiere Pro and After Effects, and edited video content and motion graphics for OD Solution in Austria in 2025.',
    deliverables: [
      ['Edits', 'Brand, product and explainer videos, cut for pace and clarity.'],
      ['Motion graphics', 'Titles, lower thirds and animated graphics built in After Effects.'],
      ['Video for websites', 'Silent autoplay loops and product reels encoded small enough for the web — like the recordings on this site, about 1 MB for 14 seconds at 1200 px wide.'],
      ['Exports for every screen', 'Versions sized and encoded for where they’ll play: web pages, social feeds and presentations.'],
    ],
    credential: {
      role: 'Video Editor',
      org: 'OD Solution, Austria',
      period: 'Feb 2025 — Oct 2025',
      text: 'Edited video content and motion graphics using Adobe Premiere Pro and After Effects.',
    },
    process: [
      ['Brief', 'You share the footage, the goal and where the video will run.'],
      ['Rough cut', 'A first cut that settles structure and pace.'],
      ['Revisions', 'Rounds of notes on timing, graphics and sound.'],
      ['Delivery', 'Final exports in the formats each platform needs.'],
    ],
    related: [],
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'FFmpeg'],
    faq: [
      ['What do you edit with?', 'Adobe Premiere Pro for the edit and Adobe After Effects for motion graphics.'],
      ['Can you edit video for a website?', 'Yes. Video inside a page needs different choices — silent autoplay, short loops, small files. The project recordings on this site are about 1 MB for 14 seconds at 1200 px wide. More in [Mastering Video Editing for the Web](/blog/mastering-video-editing-for-the-web).'],
      ['Do you work remotely?', 'Yes. I’m based in Kolkata, India and work with clients anywhere.'],
      ['Can you also build the website the video lives on?', 'Yes — see [website development](/services/website-development). Having one person on both keeps the film and the page in the same voice.'],
      ['How do I get a quote?', 'Send a short brief through the [contact form](/contact) with the length, format and deadline. I usually reply within 24 hours.'],
    ],
  },
  {
    slug: '3d-websites',
    title: '3D & WebGL websites',
    nav: '3D & WebGL',
    metaTitle: '3D Website Developer — Three.js & WebGL Experiences',
    description:
      'Interactive 3D websites built with Three.js, WebGL shaders and GSAP scroll storytelling by Saptarshi Chattopadhyay (Sappy), a creative developer in India.',
    lead: 'Scroll-driven 3D scenes, shaders and interactive product stories — built with Three.js, raw WebGL and GSAP.',
    answer:
      'Saptarshi Chattopadhyay (Sappy) builds interactive 3D websites with Three.js, WebGL and GSAP. His work includes Coffee 3D, a voxel coffee bar in Three.js where scrolling flies the camera through the scene, and Three.js visualisations with GSAP-driven storytelling built as a full-stack engineer at Vibe Engine AI.',
    deliverables: [
      ['3D scenes', 'Interactive scenes in Three.js, with camera moves tied to scroll.'],
      ['Shaders', 'Custom GLSL effects — like the drifting mist in this site’s opening shot — kept light enough for laptops and phones.'],
      ['Scroll storytelling', 'GSAP-driven sequences that pace a story as the visitor scrolls.'],
      ['Performance budgets', 'Reduced-resolution rendering, drawing paused when the scene is off screen, and a still frame when motion is reduced.'],
    ],
    process: [
      ['Brief', 'What should the visitor feel, see and do? References help most here.'],
      ['Prototype', 'A rough scene to test the idea, the camera and performance early.'],
      ['Build', 'The full scene and page, reviewed on a live preview link.'],
      ['Launch', 'Tested on real phones and laptops, with fallbacks in place.'],
    ],
    related: ['coffee3d', 'chatterify', 'pixelforge'],
    tools: ['Three.js', 'WebGL / GLSL', 'GSAP', 'React', 'Next.js'],
    faq: [
      ['Will a 3D website be slow on phones?', 'It doesn’t have to be. Render at reduced resolution, stop drawing when the scene leaves the screen, and show a still when motion is reduced. The mist on this site renders at half resolution and pauses when you scroll away.'],
      ['Three.js or raw WebGL?', 'Three.js for scenes with models, lights and cameras; raw WebGL for single full-screen effects. The mist on this site is one fragment shader and needs no library at all.'],
      ['Can a 3D site still rank in search?', 'Yes, when the content is real HTML and the 3D is an enhancement on top. Every page on this site is static HTML; the WebGL layers load over it.'],
      ['How do I get a quote?', 'Send a short brief through the [contact form](/contact) with references and a deadline. I usually reply within 24 hours.'],
    ],
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
