// Saptarshi — the seven sages — is the Indian name for the Big Dipper. Star
// positions are J2000 coordinates, gnomonic-projected and drawn north-up, east-left.
const STARS = [
  { id: 'dubhe', sage: 'Kratu', name: 'Dubhe', ra: 165.932, dec: 61.751, mag: 1.79 },
  { id: 'merak', sage: 'Pulaha', name: 'Merak', ra: 165.46, dec: 56.383, mag: 2.37 },
  { id: 'phecda', sage: 'Pulastya', name: 'Phecda', ra: 178.457, dec: 53.695, mag: 2.44 },
  { id: 'megrez', sage: 'Atri', name: 'Megrez', ra: 183.857, dec: 57.033, mag: 3.31 },
  { id: 'alioth', sage: 'Angiras', name: 'Alioth', ra: 193.507, dec: 55.96, mag: 1.77 },
  { id: 'mizar', sage: 'Vashistha', name: 'Mizar', ra: 200.981, dec: 54.925, mag: 2.27 },
  { id: 'alkaid', sage: 'Marichi', name: 'Alkaid', ra: 206.885, dec: 49.313, mag: 1.86 },
  { id: 'alcor', sage: 'Arundhati', name: 'Alcor', ra: 201.306, dec: 54.988, mag: 3.99, companion: true },
];

const LINES = [
  ['dubhe', 'merak'], ['merak', 'phecda'], ['phecda', 'megrez'], ['megrez', 'dubhe'],
  ['megrez', 'alioth'], ['alioth', 'mizar'], ['mizar', 'alkaid'],
];

const RAD = Math.PI / 180;
const RA0 = 186 * RAD;
const DEC0 = 55.6 * RAD;

function project(ra, dec) {
  const a = ra * RAD;
  const d = dec * RAD;
  const D = Math.sin(DEC0) * Math.sin(d) + Math.cos(DEC0) * Math.cos(d) * Math.cos(a - RA0);
  const x = (Math.cos(d) * Math.sin(a - RA0)) / D;
  const y = (Math.cos(DEC0) * Math.sin(d) - Math.sin(DEC0) * Math.cos(d) * Math.cos(a - RA0)) / D;
  return [-x, -y];
}

const raw = STARS.map((s) => ({ ...s, xy: project(s.ra, s.dec) }));
const xs = raw.map((s) => s.xy[0]);
const ys = raw.map((s) => s.xy[1]);
const minX = Math.min(...xs);
const minY = Math.min(...ys);
const W = 1000;
const PAD_L = 40;
const PAD_R = 150; // the bowl sits west (right); its labels need room
const PAD_Y = 70;
const S = (W - PAD_L - PAD_R) / (Math.max(...xs) - minX);
const POS = Object.fromEntries(
  raw.map((s) => [s.id, { ...s, x: PAD_L + (s.xy[0] - minX) * S, y: PAD_Y + (s.xy[1] - minY) * S }])
);
const H = Math.ceil((Math.max(...ys) - minY) * S + PAD_Y * 2);

// label placement per star: [dx, dy, anchor]
const LABEL = {
  dubhe: [18, -14, 'start'],
  merak: [18, 30, 'start'],
  phecda: [0, 44, 'middle'],
  megrez: [0, -26, 'middle'],
  alioth: [0, -26, 'middle'],
  mizar: [0, 44, 'middle'],
  alkaid: [0, 44, 'middle'],
};
const LABEL_TEXT = { mizar: 'Vashistha · Arundhati' };

export default function Constellation({ className = '' }) {
  return (
    <svg
      className={`constellation ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
    >
      <g className="constellation-lines">
        {LINES.map(([a, b], i) => (
          <line
            key={a + b}
            x1={POS[a].x}
            y1={POS[a].y}
            x2={POS[b].x}
            y2={POS[b].y}
            pathLength="1"
            style={{ '--i': i }}
          />
        ))}
      </g>
      {Object.values(POS).map((s, i) => {
        const r = Math.max(1.8, (4.6 - s.mag) * 2.6);
        const label = LABEL[s.id];
        return (
          <g key={s.id} className={`star ${s.companion ? 'star--companion' : ''}`} style={{ '--i': i }}>
            <circle className="star-glow" cx={s.x} cy={s.y} r={r * 4.5} />
            <circle className="star-core" cx={s.x} cy={s.y} r={r} />
            {label && (
              <text className="star-label" x={s.x + label[0]} y={s.y + label[1]} textAnchor={label[2]}>
                {LABEL_TEXT[s.id] || s.sage}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
