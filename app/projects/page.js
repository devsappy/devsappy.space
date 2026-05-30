import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

const projects = [
  {
    title: "Pixel Forge",
    url: "https://pixelforge-tau.vercel.app",
    tags: ["Web Design", "Development"],
    description: "A creative digital forge emphasizing pixel-perfect design and modern web development.",
  },
  {
    title: "Coffee 3D",
    url: "https://cofee3d.vercel.app",
    tags: ["WebGL", "3D", "Interactive"],
    description: "An interactive, immersive 3D coffee shop experience built with WebGL to showcase advanced front-end capabilities.",
  },
  {
    title: "Vanta",
    url: "https://vanta-ruddy.vercel.app",
    tags: ["Landing Page", "Animation"],
    description: "A sleek, dark-themed product landing page featuring dynamic Vanta.js background animations.",
  },
  {
    title: "Kiln Forge",
    url: "https://kilnforge.vercel.app",
    tags: ["Web Platform", "UI"],
    description: "A robust web platform tailored for artisans and industrial design, with a solid and clean interface.",
  },
  {
    title: "Cafe Kaleido",
    url: "https://cafekaleido.vercel.app",
    tags: ["Branding", "Web Design"],
    description: "A vibrant, dynamic website designed for a modern cafe, showcasing lively culinary branding.",
  },
  {
    title: "Chatterify",
    url: "https://emailautomationchatterify.vercel.app",
    tags: ["SaaS", "Automation"],
    description: "An automated email marketing tool and SaaS platform built to streamline communication and engagement.",
  },
];

export default function Projects() {
  return (
    <div className="apage">
      <Header />

      <main className="apage-main">
        <section className="ap-hero">
          <Reveal as="p" className="ap-eyebrow">[ Selected Work — 2021 / 2026 ]</Reveal>
          <h1 className="ap-title">
            <span className="line-mask"><span className="line-inner is-static">SELECTED</span></span>
            <span className="line-mask"><span className="line-inner is-static">PROJECTS</span></span>
          </h1>
          <Reveal as="p" className="ap-lead" delay={0.1}>
            A handpicked set of digital products, landing pages and immersive
            experiences — built end to end, from concept to launch.
          </Reveal>
        </section>

        <section className="work-list">
          {projects.map((proj, idx) => (
            <Reveal className="work-item" key={proj.title} delay={(idx % 2) * 0.08}>
              <div className="work-preview">
                <div className="work-browser">
                  <div className="work-browser-bar">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                    <span className="work-url">{proj.url.replace('https://', '')}</span>
                  </div>
                  <div className="work-frame">
                    <iframe src={proj.url} title={proj.title} loading="lazy" />
                  </div>
                </div>
              </div>

              <div className="work-info">
                <span className="work-index">{String(idx + 1).padStart(2, '0')}</span>
                <h2 className="work-title">{proj.title}</h2>
                <div className="work-tags">
                  {proj.tags.map((t) => (
                    <span className="work-tag" key={t}>{t}</span>
                  ))}
                </div>
                <p className="work-desc">{proj.description}</p>
                <a href={proj.url} target="_blank" rel="noopener noreferrer" className="work-link">
                  <span>Visit Site</span>
                  <span className="arrow">↗</span>
                </a>
              </div>
            </Reveal>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
