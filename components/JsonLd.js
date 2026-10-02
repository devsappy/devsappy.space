// Renders one JSON-LD graph. Pass an array of schema nodes (no @context needed).
export default function JsonLd({ data }) {
  const graph = (Array.isArray(data) ? data : [data]).filter(Boolean);
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
