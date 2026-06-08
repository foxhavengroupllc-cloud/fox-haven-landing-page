import styles from '@/styles/fhg.module.css';

/**
 * "The Implementation Gap" systems diagram — six civic forces
 * (Policy, Funding, Data, Programs, Workforce, Community) converging
 * on the gap at the center. Tuned for high visibility on the torn-paper band.
 */
const TEAL = '#0a8f8c';
const PURPLE = '#6b3fa0';
const INK = '#0c0d12';

const spokes: { label: string; tx: number; ty: number; anchor: 'start' | 'middle' | 'end'; n: [number, number]; e: [number, number] }[] = [
  { label: 'POLICY', tx: 120, ty: 34, anchor: 'middle', n: [140, 54], e: [186, 146] },
  { label: 'FUNDING', tx: 360, ty: 34, anchor: 'middle', n: [340, 54], e: [294, 146] },
  { label: 'DATA', tx: 436, ty: 190, anchor: 'start', n: [410, 185], e: [334, 185] },
  { label: 'PROGRAMS', tx: 360, ty: 342, anchor: 'middle', n: [340, 320], e: [294, 224] },
  { label: 'WORKFORCE', tx: 120, ty: 342, anchor: 'middle', n: [140, 320], e: [186, 224] },
  { label: 'COMMUNITY', tx: 44, ty: 190, anchor: 'end', n: [70, 185], e: [146, 185] },
];

export default function SystemsMap() {
  return (
    <div className={styles.systemsMap}>
      <svg
        viewBox="-58 0 540 372"
        role="img"
        aria-label="Diagram: policy, funding, data, programs, workforce, and community converging on the implementation gap"
        style={{ fontFamily: 'var(--fhg-mono)' }}
      >
        <defs>
          <marker id="gapArrow" markerWidth="9" markerHeight="9" refX="6" refY="3.2" orient="auto">
            <path d="M0 0 L6.5 3.2 L0 6.4 Z" fill={TEAL} />
          </marker>
        </defs>

        {/* spoke lines */}
        {spokes.map((s) => (
          <line
            key={s.label}
            x1={s.n[0]}
            y1={s.n[1]}
            x2={s.e[0]}
            y2={s.e[1]}
            stroke={TEAL}
            strokeWidth="2.4"
            markerEnd="url(#gapArrow)"
          />
        ))}

        {/* outer nodes + labels */}
        {spokes.map((s) => (
          <g key={`n-${s.label}`}>
            <circle cx={s.n[0]} cy={s.n[1]} r="6" fill={PURPLE} stroke="#f4ead9" strokeWidth="2" />
            <text
              x={s.tx}
              y={s.ty}
              textAnchor={s.anchor}
              fontSize="15"
              letterSpacing="1.2"
              fill={INK}
              fontWeight="700"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* the gap */}
        <ellipse cx="240" cy="185" rx="99" ry="65" fill="none" stroke={PURPLE} strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
        <ellipse cx="240" cy="185" rx="92" ry="60" fill="#f4ead9" stroke={PURPLE} strokeWidth="3" />
        <text x="240" y="172" textAnchor="middle" fontSize="12" letterSpacing="2.5" fill={PURPLE} fontWeight="700">THE</text>
        <text x="240" y="191" textAnchor="middle" fontSize="17" letterSpacing="1" fill={INK} fontWeight="800">IMPLEMENTATION</text>
        <text x="240" y="210" textAnchor="middle" fontSize="17" letterSpacing="4" fill={PURPLE} fontWeight="800">GAP</text>
      </svg>
    </div>
  );
}
