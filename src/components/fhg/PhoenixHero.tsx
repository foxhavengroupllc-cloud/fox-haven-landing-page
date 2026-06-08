import styles from '@/styles/fhg.module.css';

/**
 * Cinematic downtown-Phoenix-at-dusk skyline, rendered entirely in SVG so
 * it ships with zero asset weight and scales crisply. This is an intentional
 * PLACEHOLDER for the brief's "cool, cinematic rendering of downtown Phoenix
 * at dusk/night" — swap the <svg> for a real render/photo when art is ready.
 * The subtle teal nodes + horizon scan line satisfy the "systems-map / data
 * overlay" direction without overdoing the grit.
 */
const buildings: [number, number, number][] = [
  // [x, width, topY]  (base sits on y=340)
  [6, 26, 252],
  [36, 18, 214],
  [58, 30, 236],
  [92, 22, 188],
  [118, 34, 226],
  [156, 22, 150],
  [182, 16, 206],
  [202, 42, 172],
  [248, 24, 214],
  [276, 30, 194],
  [310, 18, 232],
  [332, 36, 208],
  [372, 24, 246],
];

const lights: [number, number, string][] = [
  [164, 168, '#00B8B5'],
  [167, 182, '#B88A44'],
  [212, 196, '#00B8B5'],
  [222, 210, '#B88A44'],
  [218, 230, '#00B8B5'],
  [284, 214, '#B88A44'],
  [296, 226, '#00B8B5'],
];

export default function PhoenixHero() {
  return (
    <div className={styles.skyline}>
      <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized downtown Phoenix skyline at dusk with subtle data-network overlays">
        <defs>
          <radialGradient id="dusk" cx="50%" cy="74%" r="60%">
            <stop offset="0%" stopColor="#c98a4e" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#7a3b5e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#06151c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="towers" x1="0" y1="140" x2="0" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0c1820" />
            <stop offset="100%" stopColor="#05090d" />
          </linearGradient>
        </defs>

        {/* dusk horizon glow */}
        <rect x="0" y="0" width="400" height="340" fill="url(#dusk)" />

        {/* stars */}
        {[
          [40, 40], [110, 28], [180, 52], [250, 34], [320, 46], [360, 70], [70, 80], [300, 90],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.3 : 0.8} fill="#f5f0e8" opacity={0.55} />
        ))}

        {/* data network overlay (top-right) */}
        <g stroke="#00B8B5" strokeWidth="0.6" opacity="0.5">
          <line x1="300" y1="56" x2="344" y2="40" />
          <line x1="344" y1="40" x2="368" y2="78" />
          <line x1="300" y1="56" x2="332" y2="96" />
          <line x1="368" y1="78" x2="332" y2="96" />
        </g>
        {[[300, 56], [344, 40], [368, 78], [332, 96]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#00B8B5" />
        ))}

        {/* skyline */}
        <g fill="url(#towers)">
          {buildings.map(([x, w, top], i) => (
            <rect key={i} x={x} y={top} width={w} height={340 - top} />
          ))}
          {/* a couple of antennas */}
          <rect x="166" y="132" width="2" height="18" />
          <rect x="222" y="158" width="2" height="14" />
        </g>

        {/* window lights */}
        {lights.map(([x, y, c], i) => (
          <rect key={i} x={x} y={y} width="2" height="3.4" fill={c} opacity="0.85" />
        ))}

        {/* horizon scan / data line */}
        <line x1="0" y1="300" x2="400" y2="300" stroke="#00B8B5" strokeWidth="0.5" opacity="0.3" />
        <circle cx="0" cy="300" r="2" fill="#00B8B5" opacity="0.6">
          <animate attributeName="cx" from="0" to="400" dur="6s" repeatCount="indefinite" />
        </circle>

        {/* faint base map grid */}
        <g stroke="#00B8B5" strokeWidth="0.4" opacity="0.12">
          {[316, 326, 336].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} />
          ))}
          {[60, 130, 200, 270, 340].map((x) => (
            <line key={x} x1={x} y1="305" x2={x} y2="340" />
          ))}
        </g>
      </svg>
      <span className={styles.skylineTag}>
        PHOENIX, AZ · <span>ROOTED, NATIONALLY CREDIBLE</span>
      </span>
    </div>
  );
}
