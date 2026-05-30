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
  "Landing Page Design",
  "Video Editing",
  "Motion Graphics",
  "Creative Direction",
  "Immersive Experiences",
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
            Hi, I&apos;m Sappy — a Website Developer &amp; Video Editor based in India.
          </Reveal>
          <Reveal as="p" className="about-text" delay={0.05}>
            With over 4 years of experience, I specialize in crafting digital experiences
            that are not only visually stunning but also highly functional. Whether it&apos;s
            building a sleek modern web application or editing a fast-paced promotional video,
            I bring a keen eye for detail and a drive for perfection.
          </Reveal>
          <Reveal as="p" className="about-text" delay={0.1}>
            When I&apos;m not coding or editing, you can find me exploring new design trends,
            learning new tech stacks, or working on passion projects. Let&apos;s build something
            amazing together.
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
      </main>

      <SiteFooter />
    </div>
  );
}
