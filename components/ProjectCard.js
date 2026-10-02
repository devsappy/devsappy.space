import Link from 'next/link';

export default function ProjectCard({ project: p, label }) {
  return (
    <Link href={`/projects/${p.path}`} className="pcard">
      <span className="pcard-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/work/${p.slug}.webp`} alt="" width={1200} height={750} loading="lazy" decoding="async" />
      </span>
      <span className="pcard-kind">{label || p.kind}</span>
      <span className="pcard-title">{p.title}</span>
      <span className="pcard-summary">{p.summary}</span>
      <span className="pcard-cta" aria-hidden="true">Case study →</span>
    </Link>
  );
}
