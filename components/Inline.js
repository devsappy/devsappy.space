import Link from 'next/link';

// Tiny inline formatter for content strings: `code`, **bold**, *em*, [text](href).
// Internal links use next/link; external links open in a new tab.
export default function Inline({ text }) {
  if (!text) return null;
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\[[^\]]+\]\([^)\s]+\))/g;
  const out = [];
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (m[1]) out.push(<code key={k++}>{t.slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={k++}>{t.slice(2, -2)}</strong>);
    else if (m[3]) out.push(<em key={k++}>{t.slice(1, -1)}</em>);
    else {
      const [, label, href] = t.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      out.push(
        href.startsWith('/') || href.startsWith('#') ? (
          <Link key={k++} href={href}>{label}</Link>
        ) : (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        )
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Strip inline markup for plain-text contexts (meta, feeds). */
export function plain(text = '') {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');
}
