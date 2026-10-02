import TracksScroller from '@/components/TracksScroller';
import { experience, education, monthLabel } from '@/lib/content';

// Career drawn the way an editor sees a sequence: one track per craft, clips
// placed by real start and end months, a ruler of years and a playhead at today.
const START = { y: 2021, m: 1 };
const END = { y: 2027, m: 12 };

const toIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return (y - START.y) * 12 + (m - 1);
};
const SPAN = (END.y - START.y) * 12 + END.m;

const TRACKS = [
  { name: 'Code', tone: 'code' },
  { name: 'Video', tone: 'video' },
  { name: 'Research', tone: 'research' },
  { name: 'Study', tone: 'study' },
];

export default function CareerTracks() {
  const today = new Date();
  const nowYm = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const nowIdx = Math.min(SPAN, Math.max(0, toIndex(nowYm) + today.getDate() / 31));

  const clips = [
    ...experience.map((e) => ({ track: e.track, label: e.org, sub: e.role, start: e.start, end: e.end || nowYm, open: !e.end })),
    ...education.map((e) => ({ track: 'Study', label: e.school.replace('Institute of Engineering and Management', 'IEM'), sub: e.degree, start: e.start, end: e.end })),
  ];

  const years = [];
  for (let y = START.y; y <= END.y; y++) years.push(y);

  const pct = (i) => `${(i / SPAN) * 100}%`;

  return (
    <TracksScroller>
      <div className="tracks-inner">
        <div className="tracks-ruler">
          {years.map((y) => (
            <span key={y} style={{ left: pct(toIndex(`${y}-01`)) }}>{y}</span>
          ))}
        </div>
        {TRACKS.map((t) => (
          <div className={`track track--${t.tone}`} key={t.name}>
            <span className="track-name">{t.name}</span>
            <div className="track-lane">
              {clips
                .filter((c) => c.track === t.name)
                .map((c) => {
                  const a = toIndex(c.start);
                  const b = c.open ? Math.max(a + 0.5, nowIdx) : Math.max(a + 1, toIndex(c.end) + 1);
                  const future = !c.open && b > nowIdx;
                  return (
                    <span
                      key={c.label + c.start}
                      className={`track-clip ${c.open ? 'is-open' : ''} ${future ? 'is-future' : ''}`}
                      style={{ left: pct(a), width: pct(b - a), '--now': future ? `${((nowIdx - a) / (b - a)) * 100}%` : '100%' }}
                      title={`${c.sub} — ${c.label}, ${monthLabel(c.start)} to ${c.open ? 'now' : monthLabel(c.end)}`}
                    >
                      <span className="track-clip-label">{c.label}</span>
                      <span className="track-clip-sub">{c.sub}</span>
                    </span>
                  );
                })}
            </div>
          </div>
        ))}
        <span className="tracks-now" style={{ '--at': nowIdx / SPAN }}>
          <span>Now</span>
        </span>
      </div>
    </TracksScroller>
  );
}
