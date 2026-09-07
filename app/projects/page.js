"use client";

import { useState } from 'react';
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
  const [activeIdx, setActiveIdx] = useState(0);
  const active = projects[activeIdx];

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
            experiences — built end to end, from concept to launch. Pick a
            project to preview it live.
          </Reveal>
        </section>

        <Reveal className="work-explorer">
          <div className="work-rows">
            {projects.map((proj, idx) => (
              <div
                key={proj.title}
                role="button"
                tabIndex={0}
                className={`work-row ${idx === activeIdx ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIdx(idx);
                  }
                }}
              >
                <span className="work-row-num">{String(idx + 1).padStart(2, '0')}</span>
                <span className="work-row-body">
                  <span className="work-row-title">{proj.title}</span>
                  <span className="work-row-tags">{proj.tags.join(' · ')}</span>
                </span>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-row-visit"
                  aria-label={`Open ${proj.title} in a new tab`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="arrow">↗</span>
                </a>
              </div>
            ))}
          </div>

          <div className="work-preview">
            <div className="work-browser" key={active.url}>
              <div className="work-browser-bar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="work-url">{active.url.replace('https://', '')}</span>
              </div>
              <div className="work-frame">
                <iframe src={active.url} title={active.title} loading="lazy" />
              </div>
            </div>
            <p className="work-preview-desc">{active.description}</p>
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-preview-link"
            >
              <span>Visit Site</span>
              <span className="arrow">↗</span>
            </a>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
