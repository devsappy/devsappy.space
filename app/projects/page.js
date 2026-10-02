import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageCta from '@/components/PageCta';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import WorkExplorer from '@/components/WorkExplorer';
import { projects } from '@/lib/content';
import { abs, alternates, breadcrumbSchema, openGraph, PERSON_ID, projectListSchema, twitter } from '@/lib/seo';

const title = 'Work — Websites, 3D Sites & Web Apps';
const description =
  'Six live sites built by Saptarshi Chattopadhyay (Sappy): a Three.js voxel coffee bar, a running brand, a roaster catalog, an agency site, a cafe and an email app.';
const image = { url: '/og/projects.jpg', alt: 'Selected work' };

export const metadata = {
  title,
  description,
  alternates: alternates('/projects'),
  openGraph: openGraph({ path: '/projects', title, description, image }),
  twitter: twitter({ title, description, image }),
};

export default function Projects() {
  return (
    <main id="main" className="page page--dusk" data-tone="dark">
      <JsonLd
        data={[
          { '@type': 'CollectionPage', '@id': `${abs('/projects')}#page`, name: 'Selected work', url: abs('/projects'), author: { '@id': PERSON_ID } },
          projectListSchema(),
          breadcrumbSchema([{ name: 'Work', path: '/projects' }]),
        ]}
      />
      <section className="wrap" data-clip="Work" data-clip-color="#2B3E5E" data-tone="dark">
        <header className="page-head">
          <Breadcrumbs items={[{ name: 'Work', path: '/projects' }]} />
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
      <section className="case-index" data-clip="Case studies" data-clip-color="#22324C" data-tone="dark" aria-labelledby="cases-h">
        <div className="wrap">
          <Reveal as="h2" id="cases-h" className="svc-h2">Case studies</Reveal>
          <div className="pcards">
            {projects.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <PageCta />
    </main>
  );
}
