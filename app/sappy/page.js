import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import profilePic from '../../DSC_8261.JPG';

const stats = [
  { num: "4+", label: "Years experience" },
  { num: "30+", label: "Projects shipped" },
  { num: "100%", label: "Client focused" },
];

const services = [
  "Web Development",
  "React & Next.js",
  "3D & WebGL (Three.js)",
  "Motion & GSAP Animation",
  "Python & FastAPI Backends",
  "AI / LLM Integration",
  "Video Editing & Motion Graphics",
];

const experience = [
  {
    role: "Research & Development Specialist",
    org: "Multiplier AI",
    period: "Jun 2026 — Present",
    desc: "Conducting research across revenue and marketing-related aspects to support product and business decisions.",
  },
  {
    role: "Full Stack Engineer",
    org: "Vibe Engine AI",
    period: "Aug 2025 — Jun 2026",
    desc: "Built interactive, animation-driven web apps with React, Next.js, Tailwind CSS and a Python/FastAPI backend — including Three.js 3D visualizations and GSAP-driven storytelling.",
  },
  {
    role: "Video Editor",
    org: "OD Solution, Austria",
    period: "Feb 2025 — Oct 2025",
    desc: "Edited video content and motion graphics using Adobe Premiere Pro and After Effects.",
  },
  {
    role: "Frontend & AI/ML Developer",
    org: "Brainly",
    period: "May 2023 — Jul 2023",
    desc: "Built frontend features in React and contributed to model training work.",
  },
];

const education = [
  {
    degree: "B.Tech, Electronics & Communication Engineering",
    school: "Institute of Engineering and Management, Kolkata",
    period: "Jul 2023 — May 2027",
  },
  {
    degree: "Higher Secondary, PCMC",
    school: "Kalyani Public School",
    period: "Apr 2021 — Apr 2023",
  },
];

export default function Sappy() {
  return (
    <div className="apage">
      <Header />

      <main className="apage-main">
        <section className="about-hero">
          <div className="about-intro">
            <Reveal as="p" className="ap-eyebrow">[ About — Sappy ]</Reveal>
            <h1 className="ap-title">
              <span className="line-mask"><span className="line-inner is-static">CREATIVE</span></span>
              <span className="line-mask"><span className="line-inner is-static">DIGITAL</span></span>
              <span className="line-mask"><span className="line-inner is-static">PARTNER</span></span>
            </h1>
          </div>
          <Reveal className="about-portrait" delay={0.15}>
            <div className="about-portrait-inner">
              <Image src={profilePic} alt="Sappy" priority />
            </div>
          </Reveal>
        </section>

        <section className="about-body">
          <Reveal as="p" className="about-lead">
            Hi, I&apos;m Saptarshi Chattopadhyay (Sappy) — a Full Stack Engineer based in India.
          </Reveal>
          <Reveal as="p" className="about-text" delay={0.05}>
            I build interactive, performant web applications end to end — React, Next.js and
            Tailwind CSS on the frontend, Three.js and GSAP for immersive 3D and motion, and
            Python with FastAPI on the backend. I&apos;m currently applying that background to
            applied research and development work, moving comfortably between research,
            implementation and delivery.
          </Reveal>
          <Reveal as="p" className="about-text" delay={0.1}>
            Alongside development, I work with AI/LLM integrations (Groq API), edit video and
            motion graphics in Adobe Premiere Pro &amp; After Effects, and always verify what I
            ship across devices and browsers before release. Let&apos;s build something amazing
            together.
          </Reveal>
        </section>

        <section className="about-stats">
          {stats.map((s, i) => (
            <Reveal className="about-stat" key={s.label} delay={i * 0.08}>
              <span className="about-stat-num">{s.num}</span>
              <span className="about-stat-label">{s.label}</span>
            </Reveal>
          ))}
        </section>

        <section className="about-services">
          <Reveal as="h2" className="about-services-title">What I do</Reveal>
          <div className="about-services-list">
            {services.map((srv, i) => (
              <Reveal className="about-service" key={srv} delay={i * 0.05}>
                <span className="about-service-dot">✦</span>
                {srv}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="about-experience">
          <Reveal as="h2" className="about-services-title">Experience</Reveal>
          <div className="about-exp-list">
            {experience.map((exp, i) => (
              <Reveal className="about-exp-item" key={exp.role + exp.org} delay={i * 0.05}>
                <div className="about-exp-head">
                  <h3 className="about-exp-role">{exp.role}</h3>
                  <span className="about-exp-period">{exp.period}</span>
                </div>
                <span className="about-exp-org">{exp.org}</span>
                <p className="about-exp-desc">{exp.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="about-education">
          <Reveal as="h2" className="about-services-title">Education</Reveal>
          <div className="about-exp-list">
            {education.map((ed, i) => (
              <Reveal className="about-exp-item" key={ed.degree} delay={i * 0.05}>
                <div className="about-exp-head">
                  <h3 className="about-exp-role">{ed.degree}</h3>
                  <span className="about-exp-period">{ed.period}</span>
                </div>
                <span className="about-exp-org">{ed.school}</span>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
