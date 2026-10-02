import WorkExplorer from '@/components/WorkExplorer';
import PageCta from '@/components/PageCta';
import Reveal from '@/components/Reveal';
import { projects } from '@/lib/content';

export const metadata = {
  title: 'Work',
  description:
    'Six live sites designed and built by Saptarshi Chattopadhyay — 3D brand sites, product catalogs and web apps in React, Three.js and Vite. Watch the recordings or open them live.',
  alternates: { canonical: '/projects' },
};

export default function Projects() {
  return (
    <main id="main" className="page page--dusk" data-tone="dark">
      <section className="wrap" data-clip="Work" data-clip-color="#2B3E5E" data-tone="dark">
        <header className="page-head">
          <Reveal as="p" className="label">Work</Reveal>
          <h1 className="page-title">
            <Reveal as="span" className="line">Selected work</Reveal>
          </h1>
          <Reveal as="p" className="page-lead" delay={0.1}>
            Every project here is live. Pick one to watch a recording of it, or switch the monitor
            to the live site and use it right here.
          </Reveal>
        </header>
        <WorkExplorer projects={projects} />
      </section>
      <PageCta />
    </main>
  );
}
