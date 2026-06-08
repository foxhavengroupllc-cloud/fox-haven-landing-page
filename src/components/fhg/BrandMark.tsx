/**
 * Fox Haven Group mark — a geometric origami fox set in a hexagon,
 * rendered in the brand teal→purple gradient. Pure SVG, no deps.
 */
export default function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="fhgMark" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00B8B5" />
          <stop offset="1" stopColor="#6B3FA0" />
        </linearGradient>
      </defs>
      {/* hexagon frame */}
      <path
        d="M20 2 L35.6 11 V29 L20 38 L4.4 29 V11 Z"
        stroke="url(#fhgMark)"
        strokeWidth="1.4"
        opacity="0.55"
      />
      {/* origami fox: ears + face */}
      <path d="M11.5 11.5 L18 14.5 L13.5 20 Z" fill="url(#fhgMark)" />
      <path d="M28.5 11.5 L22 14.5 L26.5 20 Z" fill="url(#fhgMark)" />
      <path d="M20 15.5 L27 19 L20 31 L13 19 Z" fill="url(#fhgMark)" />
      {/* snout notch */}
      <path d="M20 31 L17 25.5 L23 25.5 Z" fill="#08090C" />
    </svg>
  );
}
