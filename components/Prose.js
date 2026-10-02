import Inline from '@/components/Inline';

// Renders journal sections. Each section is a clip on the page timeline, so the
// timeline doubles as reading progress and a table of contents.
const TINTS = ['#D6E3F2', '#BFD2E8'];

function Block({ b }) {
  switch (b.type) {
    case 'p':
      return <p><Inline text={b.text} /></p>;
    case 'h3':
      return <h3><Inline text={b.text} /></h3>;
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return (
        <Tag>
          {b.items.map((t, i) => (
            <li key={i}><Inline text={t} /></li>
          ))}
        </Tag>
      );
    }
    case 'code':
      return (
        <figure className="code">
          {b.lang && <span className="code-lang" aria-hidden="true">{b.lang}</span>}
          <pre tabIndex={0}><code>{b.code.replace(/^\n+|\s+$/g, '')}</code></pre>
          {b.caption && <figcaption><Inline text={b.caption} /></figcaption>}
        </figure>
      );
    case 'quote':
      return (
        <blockquote>
          <p><Inline text={b.text} /></p>
          {b.cite && <cite>{b.cite}</cite>}
        </blockquote>
      );
    case 'table':
      return (
        <div className="table-wrap" tabIndex={0} role="region" aria-label="Table">
          <table>
            <thead>
              <tr>{b.head.map((h, i) => <th key={i} scope="col"><Inline text={h} /></th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j}><Inline text={c} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'figure':
      return (
        <figure className="fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" decoding="async" />
          {b.caption && <figcaption><Inline text={b.caption} /></figcaption>}
        </figure>
      );
    case 'note':
      return <aside className="note"><Inline text={b.text} /></aside>;
    default:
      return null;
  }
}

export default function Prose({ sections }) {
  return sections.map((s, i) => (
    <section
      key={s.id}
      id={s.id}
      className="prose-section"
      data-clip={s.clip || s.heading}
      data-clip-color={TINTS[i % 2]}
      data-tone="light"
      aria-labelledby={`${s.id}-h`}
    >
      <h2 id={`${s.id}-h`}>{s.heading}</h2>
      {s.blocks.map((b, j) => (
        <Block key={j} b={b} />
      ))}
    </section>
  ));
}
