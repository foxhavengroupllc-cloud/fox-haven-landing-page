'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { STRATEGIC_NODES, ACCENT, type CoreNode } from './strategicCoreConfig';
import { useStrategicCoreInteraction } from './useStrategicCoreInteraction';
import { StrategicCorePanel } from './StrategicCorePanel';

// ─── Sphere constants ─────────────────────────────────────────────────────────
const CX          = 200;   // SVG centre X
const CY          = 200;   // SVG centre Y
const R_PRIMARY   = 158;   // outer orbit — initiative nodes
const R_MID       = 133;   // decorative mid-orbit ring
const R_SECONDARY = 108;   // inner orbit — info/nav nodes
const NODE_R_P    = 9.5;   // base node radius — primary
const NODE_R_S    = 6.5;   // base node radius — secondary

// ─── 3D → 2D projection ──────────────────────────────────────────────────────
interface Projected {
  x: number; y: number;
  depth: number;           // 0 = back, 1 = front
  z: number;               // raw Z for sorting
}

function project(
  phi: number, theta: number,
  rotX: number, rotY: number,
  radius: number,
): Projected {
  const toRad = (d: number) => (d * Math.PI) / 180;
  let x = Math.sin(toRad(phi)) * Math.cos(toRad(theta));
  let y = Math.cos(toRad(phi));
  let z = Math.sin(toRad(phi)) * Math.sin(toRad(theta));
  const cx = Math.cos(toRad(rotX)), sx = Math.sin(toRad(rotX));
  const y2 = y * cx - z * sx; const z2 = y * sx + z * cx;
  y = y2; z = z2;
  const cy = Math.cos(toRad(rotY)), sy = Math.sin(toRad(rotY));
  const x2 = x * cy + z * sy; const z3 = -x * sy + z * cy;
  x = x2; z = z3;
  return { x: CX + x * radius, y: CY - y * radius, depth: (z + 1) / 2, z };
}

// ─── Hex polygon helper ───────────────────────────────────────────────────────
function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
}

const HEX_INNER = hexPts(CX, CY, 26);
const HEX_OUTER = hexPts(CX, CY, 44);

// ─── Individual node renderer ─────────────────────────────────────────────────
interface NodeProps {
  node: CoreNode;
  proj: Projected;
  isHovered: boolean;
  isActive: boolean;
  onHover: (id: string | null) => void;
  onActivate: (node: CoreNode) => void;
}

function SphereNode({ node, proj, isHovered, isActive, onHover, onActivate }: NodeProps) {
  const { dot, label: labelColor } = ACCENT[node.accent];
  const { x, y, depth } = proj;
  const isPrimary = node.tier === 'primary';

  const opacity   = 0.15 + depth * 0.85;
  const nodeScale = 0.58 + depth * 0.42;
  const baseR     = isPrimary ? NODE_R_P : NODE_R_S;
  const r         = baseR * nodeScale;

  // Adaptive label placement — guards against viewBox edge clipping
  const dx     = x - CX;
  const LPAD   = 11;
  const EDGE   = 8;
  const CWIDTH = isPrimary ? 6.8 : 5.8;
  const textW  = node.label.length * CWIDTH;

  let labelX: number;
  let anchor: 'start' | 'end';

  if (dx >= 0) {
    const rightX = x + r + LPAD;
    if (rightX + textW > 400 - EDGE) { labelX = x - r - LPAD; anchor = 'end'; }
    else                              { labelX = rightX;        anchor = 'start'; }
  } else {
    const leftX = x - r - LPAD;
    if (leftX - textW < EDGE) { labelX = x + r + LPAD; anchor = 'start'; }
    else                      { labelX = leftX;         anchor = 'end'; }
  }

  const highlighted  = isHovered || isActive;
  const haloR  = highlighted ? r + (isPrimary ? 16 : 11) : isPrimary ? r + 7 : r + 4;
  const haloOp = highlighted ? isPrimary ? 0.40 : 0.28   : isPrimary ? 0.18 : 0.09;
  const showLabel    = isPrimary ? depth > 0.15 : depth > 0.42 || highlighted;
  const showSublabel = highlighted;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${node.label} — ${node.sublabel}`}
      aria-pressed={isActive}
      style={{ opacity, cursor: 'pointer', outline: 'none' }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onActivate(node)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(node); }
      }}
    >
      {/* ── Connection line: centre → node ─────────────────────────── */}
      {isHovered ? (
        <>
          {/* Soft glow behind the crisp line */}
          <line x1={CX} y1={CY} x2={x} y2={y}
            stroke={dot} strokeWidth={5} strokeOpacity={0.14}
            filter="url(#sc-glow-line)" />
          {/* Crisp bright line */}
          <line x1={CX} y1={CY} x2={x} y2={y}
            stroke={dot}
            strokeWidth={isPrimary ? 1.1 : 0.85}
            strokeOpacity={isPrimary ? 0.65 : 0.44}
          />
        </>
      ) : (
        <line x1={CX} y1={CY} x2={x} y2={y}
          stroke={dot}
          strokeWidth={isPrimary ? 0.9 : 0.65}
          strokeOpacity={isPrimary ? 0.48 : 0.30}
          strokeDasharray={isPrimary ? '4 7' : '2 9'}
        />
      )}

      {/* Active state: solid line with glow */}
      {isActive && !isHovered && (
        <>
          <line x1={CX} y1={CY} x2={x} y2={y}
            stroke={dot} strokeWidth={4} strokeOpacity={0.12}
            filter="url(#sc-glow-line)" />
          <line x1={CX} y1={CY} x2={x} y2={y}
            stroke={dot}
            strokeWidth={isPrimary ? 0.9 : 0.7}
            strokeOpacity={isPrimary ? 0.50 : 0.35}
          />
        </>
      )}

      {/* ── Signal pulse: travels from centre → node on hover ──────── */}
      {isHovered && (
        <>
          <circle r="3" fill={dot}>
            <animate attributeName="cx" from={`${CX}`} to={`${x}`} dur="0.95s" repeatCount="indefinite" />
            <animate attributeName="cy" from={`${CY}`} to={`${y}`} dur="0.95s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.6;1" dur="0.95s" repeatCount="indefinite" />
          </circle>
          <circle r="1.8" fill={dot}>
            <animate attributeName="cx" from={`${CX}`} to={`${x}`} dur="0.95s" begin="0.475s" repeatCount="indefinite" />
            <animate attributeName="cy" from={`${CY}`} to={`${y}`} dur="0.95s" begin="0.475s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.55;0" keyTimes="0;0.6;1" dur="0.95s" begin="0.475s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* ── Ambient glow halo ─────────────────────────────────────── */}
      <circle cx={x} cy={y} r={haloR} fill={dot} fillOpacity={haloOp} />

      {/* ── Interaction ring (hover / active) ───────────────────────── */}
      {highlighted && (
        <circle cx={x} cy={y} r={r + (isPrimary ? 20 : 14)}
          fill="none" stroke={dot} strokeWidth={0.8} strokeOpacity={0.22} />
      )}

      {/* ── Active echo rings ─────────────────────────────────────── */}
      {isActive && (
        <>
          <circle cx={x} cy={y} r={r + (isPrimary ? 28 : 20)}
            fill="none" stroke={dot} strokeWidth={0.5} strokeOpacity={0.14} />
          <circle cx={x} cy={y} r={r + (isPrimary ? 36 : 27)}
            fill="none" stroke={dot} strokeWidth={0.3} strokeOpacity={0.08} />
        </>
      )}

      {/* ── Primary decorative ring (resting) ─────────────────────── */}
      {isPrimary && !highlighted && (
        <circle cx={x} cy={y} r={r + 5.5}
          fill="none" stroke={dot} strokeWidth={0.5} strokeOpacity={0.14} />
      )}

      {/* ── Node body ─────────────────────────────────────────────── */}
      <circle cx={x} cy={y} r={r} fill={dot}
        fillOpacity={highlighted ? 1.0 : isPrimary ? 0.80 : 0.58} />

      {/* ── Inner bright core ─────────────────────────────────────── */}
      <circle cx={x} cy={y} r={r * 0.36}
        fill={highlighted ? '#fff' : dot}
        fillOpacity={highlighted ? 0.92 : 0.48} />

      {/* ── Label ─────────────────────────────────────────────────── */}
      {showLabel && (
        <text
          x={labelX} y={y + (showSublabel ? -6 : 1)}
          textAnchor={anchor}
          fontSize={isPrimary ? 10.5 : 9}
          fontFamily="system-ui, sans-serif"
          fontWeight={highlighted ? 700 : isPrimary ? 500 : 400}
          fill={highlighted ? '#fff' : labelColor}
          fillOpacity={highlighted ? 1 : Math.max(0, (depth - 0.12) * 1.25)}
        >
          {node.label}
        </text>
      )}

      {/* ── Sublabel (hover only) ─────────────────────────────────── */}
      {showSublabel && (
        <text x={labelX} y={y + 8} textAnchor={anchor}
          fontSize={7.5} fontFamily="system-ui, sans-serif"
          fill={labelColor} fillOpacity={0.70}>
          {node.sublabel}
        </text>
      )}
    </g>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StrategicCore() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<CoreNode | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Panel position frozen at click time so it doesn't chase the rotating sphere
  const [activeProjPos, setActiveProjPos] = useState<{ x: number; y: number } | null>(null);

  // Click ripple
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);
  const rippleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { rot, startDrag, moveDrag, endDrag, wasDrag } =
    useStrategicCoreInteraction(reducedMotion);

  const projectedNodes = useMemo(() =>
    STRATEGIC_NODES.map(node => ({
      node,
      proj: project(node.phi, node.theta, rot.x, rot.y,
        node.tier === 'primary' ? R_PRIMARY : R_SECONDARY),
    })),
    [rot.x, rot.y],
  );

  const sorted = useMemo(() =>
    [...projectedNodes].sort((a, b) => a.proj.z - b.proj.z),
    [projectedNodes],
  );

  // Equatorial ring tilt factor — shared by all 3 orbit ellipses
  const orbitTilt = Math.abs(Math.cos((rot.x * Math.PI) / 180)) * 0.30;

  // ── Node activation — freeze panel position at click moment ────────────
  const activateNode = useCallback((node: CoreNode) => {
    if (wasDrag()) return;
    const entry = projectedNodes.find(p => p.node.id === node.id);

    if (entry) {
      // Ripple
      if (rippleTimer.current) clearTimeout(rippleTimer.current);
      setRipple({ x: entry.proj.x, y: entry.proj.y, key: Date.now() });
      rippleTimer.current = setTimeout(() => setRipple(null), 750);
    }

    setActiveNode(prev => {
      if (prev?.id === node.id) {
        setActiveProjPos(null);
        return null;
      }
      setActiveProjPos(entry ? { x: entry.proj.x, y: entry.proj.y } : null);
      return node;
    });
  }, [wasDrag, projectedNodes]);

  const closePanel = useCallback(() => {
    setActiveNode(null);
    setActiveProjPos(null);
  }, []);

  // ── Drag handlers ──────────────────────────────────────────────────────
  function onMouseDown(e: React.MouseEvent) {
    if ((e.target as SVGElement).closest('[role="button"]')) return;
    setIsDragging(true);
    startDrag(e.clientX, e.clientY);
  }
  function onMouseMove(e: React.MouseEvent) { if (!isDragging) return; moveDrag(e.clientX, e.clientY); }
  function onMouseUp() { setIsDragging(false); endDrag(); }
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]; setIsDragging(true); startDrag(t.clientX, t.clientY);
  }
  function onTouchMove(e: React.TouchEvent) { moveDrag(e.touches[0].clientX, e.touches[0].clientY); }
  function onTouchEnd() { setIsDragging(false); endDrag(); }
  function onSvgClick(e: React.MouseEvent) {
    if ((e.target as SVGElement).closest('[role="button"]')) return;
    if (!wasDrag()) closePanel();
  }

  return (
    <div className="relative select-none w-full">

      <svg
        viewBox="0 0 400 400"
        className="w-full aspect-square"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Foxhaven Strategic Core — interactive exploration map"
        style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onSvgClick}
      >
        <defs>
          <radialGradient id="sc-bg-deep" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0D4F73" stopOpacity="0.35" />
            <stop offset="45%"  stopColor="#0D4F73" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#0F1923" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="sc-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F2C94C" stopOpacity="0.95" />
            <stop offset="55%"  stopColor="#E8821A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E8821A" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="sc-center-mid" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F5A64A" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#E8821A" stopOpacity="0"    />
          </radialGradient>

          {/* Blur filter for connection-line hover glow */}
          <filter id="sc-glow-line" x="-60%" y="-300%" width="220%" height="700%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* ── Background sphere glow ────────────────────────────────── */}
        <circle cx={CX} cy={CY} r="196" fill="url(#sc-bg-deep)" />

        {/* ── Outer boundary marker ─────────────────────────────────── */}
        <circle cx={CX} cy={CY} r="188"
          stroke="#F2C94C" strokeWidth="0.4" strokeOpacity="0.05" fill="none" />

        {/* ════════════════════════════════════════════════════════════
            ORBIT RINGS — 3 layers, inner strongest → outer weakest
            Each ring: glow halo (wide, static) + dashed animated line
            ════════════════════════════════════════════════════════════ */}

        {/* ── Inner ring (secondary nodes, R=108) — amber, CW 9s ─── */}
        <ellipse cx={CX} cy={CY} rx={R_SECONDARY} ry={R_SECONDARY * orbitTilt}
          stroke="#F2C94C" strokeWidth={5} strokeOpacity={0.14} fill="none" />
        <ellipse cx={CX} cy={CY} rx={R_SECONDARY} ry={R_SECONDARY * orbitTilt}
          stroke="#F2C94C" strokeWidth={1.0} strokeOpacity={0.42}
          strokeDasharray="3 10" fill="none"
          className="sc-orbit-secondary" />

        {/* ── Mid ring (decorative, R=133) — warm gold, CCW 13s ─── */}
        <ellipse cx={CX} cy={CY} rx={R_MID} ry={R_MID * orbitTilt}
          stroke="#E8A030" strokeWidth={4} strokeOpacity={0.10} fill="none" />
        <ellipse cx={CX} cy={CY} rx={R_MID} ry={R_MID * orbitTilt}
          stroke="#E8A030" strokeWidth={0.85} strokeOpacity={0.28}
          strokeDasharray="4 14" fill="none"
          className="sc-orbit-mid" />

        {/* ── Outer ring (primary nodes, R=158) — blue, CW 20s ───── */}
        <ellipse cx={CX} cy={CY} rx={R_PRIMARY} ry={R_PRIMARY * orbitTilt}
          stroke="#38bdf8" strokeWidth={4.5} strokeOpacity={0.12} fill="none" />
        <ellipse cx={CX} cy={CY} rx={R_PRIMARY} ry={R_PRIMARY * orbitTilt}
          stroke="#38bdf8" strokeWidth={0.85} strokeOpacity={0.24}
          strokeDasharray="5 20" fill="none"
          className="sc-orbit-primary" />

        {/* ── Nodes — sorted back-to-front ─────────────────────────── */}
        {sorted.map(({ node, proj }) => (
          <SphereNode
            key={node.id}
            node={node}
            proj={proj}
            isHovered={hoveredId === node.id}
            isActive={activeNode?.id === node.id}
            onHover={setHoveredId}
            onActivate={activateNode}
          />
        ))}

        {/* ── Click ripple ──────────────────────────────────────────── */}
        {ripple && (
          <circle key={ripple.key} cx={ripple.x} cy={ripple.y} r="10"
            fill="none" stroke="#F2C94C" strokeWidth="1.5"
            className="sc-node-ripple" />
        )}

        {/* ── Centre energy system ──────────────────────────────────── */}
        {!reducedMotion && (
          <>
            <circle cx={CX} cy={CY} r="15" fill="#F5A64A" fillOpacity="0.28" className="sc-core-pulse" />
            <circle cx={CX} cy={CY} r="15" fill="#F5A64A" fillOpacity="0.28" className="sc-core-pulse" style={{ animationDelay: '0.95s' }} />
            <circle cx={CX} cy={CY} r="15" fill="#F5A64A" fillOpacity="0.28" className="sc-core-pulse" style={{ animationDelay: '1.90s' }} />
          </>
        )}
        <circle cx={CX} cy={CY} r="52"  fill="url(#sc-center-mid)"  opacity="0.65" />
        <polygon points={HEX_OUTER} stroke="#F2C94C" strokeWidth="0.5" strokeOpacity="0.14" fill="none" />
        <polygon points={HEX_INNER} stroke="#F2C94C" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
        <circle cx={CX} cy={CY} r="40"  fill="url(#sc-center-glow)" opacity="0.60" />
        <circle cx={CX} cy={CY} r="12"  fill="#F2C94C" opacity="0.98" />
        <circle cx={CX} cy={CY} r="5"   fill="#fff"    opacity="0.88" />
        <text x={CX} y={CY + 27} textAnchor="middle" fontSize={7.5}
          fontFamily="system-ui, sans-serif" letterSpacing="0.15em"
          fill="#F2C94C" fillOpacity="0.38">FOXHAVEN</text>
      </svg>

      {/* ── Drag hint ────────────────────────────────────────────────── */}
      <p className="absolute bottom-2 left-0 right-0 text-center font-body text-[9px] text-white/20 tracking-wider uppercase pointer-events-none" aria-hidden="true">
        {reducedMotion ? 'tap a node to explore' : 'drag to rotate · tap to explore'}
      </p>

      {/* ── Contextual panel — anchored near activated node ──────────── */}
      {activeNode && (
        <StrategicCorePanel
          node={activeNode}
          onClose={closePanel}
          projPos={activeProjPos}
        />
      )}
    </div>
  );
}
