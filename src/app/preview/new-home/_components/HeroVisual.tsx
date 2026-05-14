'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeroEditableTile, { type TileLayout } from './HeroEditableTile';
import HeroIntroLayer from './HeroIntroLayer';
import HeroPinLayer from './HeroPinLayer';
import LiveTemperatureTile from './LiveTemperatureTile';
// Lightweight static stand-in for the sandbox's PopulationFlowTile.
// The real component pulls from /api/urban-pulse + framer-motion + a
// types lib that doesn't exist in production. For the preview we just
// need the visual block at the right position — restore the live tile
// once the urban-pulse data layer is ported (or remove if we don't want
// it here in production).
function PopulationFlowTile({ disabled: _disabled }: { disabled?: boolean }) {
  return (
    <div className={styles.previewFlowTile}>
      <div className={styles.previewFlowTileHeader}>
        <span className={styles.previewFlowTileEyebrow}>POPULATION FLOW</span>
        <span className={styles.previewFlowTileArrow} aria-hidden="true">
          ↗
        </span>
      </div>
      <div className={styles.previewFlowTileLabel}>Urban activity pulse</div>
      <div className={styles.previewFlowTileScore}>18</div>
      <div className={styles.previewFlowTileMeta}>
        <span>LOW</span>
        <span>LIVE</span>
        <span>Public signals</span>
      </div>
    </div>
  );
}
import styles from '../_design/design-system.module.css';
import useReducedMotion from './useReducedMotion';

const resources = ['Cooling Centers', 'Hydration Stations', 'Mobile Units', 'Shelters'];
const networkNodes = ['18', '26', '34', '42', '50', '58', '66', '74', '82'];
const INTRO_DURATION_MS = 3600;
const PIN_REVEAL_DELAY_MS = 420;
const DASHBOARD_LAYOUT_STORAGE_KEY = 'foxhaven.homepageRedesign.heroDashboardLayout.v1';

const defaultDashboardLayouts = {
  location: { x: 6, y: 6, w: 22, h: 12 },
  heat: { x: 6, y: 28, w: 18, h: 19 },
  resource: { x: 6, y: 62, w: 24, h: 22 },
  layer: { x: 36, y: 70, w: 31, h: 14 },
  health: { x: 76, y: 8, w: 18, h: 17 },
  flow: { x: 76, y: 35, w: 20, h: 18 },
} satisfies Record<string, TileLayout>;

type DashboardTileId = keyof typeof defaultDashboardLayouts;
type DashboardLayouts = Record<DashboardTileId, TileLayout>;

function readSavedLayouts(): DashboardLayouts {
  if (typeof window === 'undefined') return defaultDashboardLayouts;

  try {
    const saved = window.localStorage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);
    if (!saved) return defaultDashboardLayouts;
    return {
      ...defaultDashboardLayouts,
      ...(JSON.parse(saved) as Partial<DashboardLayouts>),
    };
  } catch {
    return defaultDashboardLayouts;
  }
}

export default function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const [pinsInteractive, setPinsInteractive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dashboardLayouts, setDashboardLayouts] = useState<DashboardLayouts>(defaultDashboardLayouts);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDashboardLayouts(readSavedLayouts());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateDashboardLayout(id: string, layout: TileLayout) {
    const tileId = id as DashboardTileId;
    setDashboardLayouts((current) => {
      const next = { ...current, [tileId]: layout };
      window.localStorage.setItem(DASHBOARD_LAYOUT_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function resetDashboardLayout() {
    setDashboardLayouts(defaultDashboardLayouts);
    window.localStorage.removeItem(DASHBOARD_LAYOUT_STORAGE_KEY);
  }

  useEffect(() => {
    const introTimer = window.setTimeout(
      () => setIntroComplete(true),
      reducedMotion ? 0 : INTRO_DURATION_MS,
    );
    const pinTimer = window.setTimeout(
      () => setPinsInteractive(true),
      reducedMotion ? 0 : INTRO_DURATION_MS + PIN_REVEAL_DELAY_MS,
    );

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(pinTimer);
    };
  }, [reducedMotion]);

  return (
    <div className={styles.heroVisual} aria-label="PHOENIX, AZ">
      <div className={styles.heroScene} aria-hidden="true">
        <Image
          className={styles.heroPosterImage}
          src="/images/new-design/homepage-redesign/city-wireframe-placeholder.png"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 63vw"
        />
        <div className={styles.horizonGlow} />
        <div className={styles.heroOrbitField}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.networkNodes}>
          {networkNodes.map((node) => (
            <span key={node} />
          ))}
        </div>
      </div>

      <HeroIntroLayer isComplete={introComplete} />
      <HeroPinLayer isInteractive={pinsInteractive} />

      <div className={`${styles.heroDashboard} ${editMode ? styles.heroDashboardEditing : ''}`}>
        <div className={styles.layoutToolbar}>
          <button type="button" onClick={() => setEditMode((current) => !current)}>
            {editMode ? 'Done' : 'Edit Layout'}
          </button>
          {editMode ? (
            <button type="button" onClick={resetDashboardLayout}>
              Reset
            </button>
          ) : null}
        </div>

        <HeroEditableTile
          id="location"
          label="PHOENIX, AZ"
          layout={dashboardLayouts.location}
          editMode={editMode}
          onChange={updateDashboardLayout}
        >
          <article className={`${styles.dashboardTile} ${styles.locationTile}`}>
            <p>PHOENIX, AZ</p>
            <span>Live Civic Intelligence</span>
          </article>
        </HeroEditableTile>

        <HeroEditableTile
          id="heat"
          label="HEAT RISK"
          layout={dashboardLayouts.heat}
          editMode={editMode}
          onChange={updateDashboardLayout}
        >
          <LiveTemperatureTile />
        </HeroEditableTile>

        <HeroEditableTile
          id="resource"
          label="RESOURCE NODES"
          layout={dashboardLayouts.resource}
          editMode={editMode}
          onChange={updateDashboardLayout}
        >
          <article className={`${styles.dashboardTile} ${styles.resourceTile}`}>
            <p>RESOURCE NODES</p>
            <ul className={styles.resourceList}>
              {resources.map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          </article>
        </HeroEditableTile>

        <HeroEditableTile
          id="layer"
          label="AI COORDINATION LAYER"
          layout={dashboardLayouts.layer}
          editMode={editMode}
          onChange={updateDashboardLayout}
        >
          <article className={`${styles.dashboardTile} ${styles.layerTile}`}>
            <p>AI COORDINATION LAYER</p>
            <span>Active operations across 128 zones</span>
          </article>
        </HeroEditableTile>

        <HeroEditableTile
          id="health"
          label="SYSTEM HEALTH"
          layout={dashboardLayouts.health}
          editMode={editMode}
          onChange={updateDashboardLayout}
        >
          <article className={`${styles.dashboardTile} ${styles.healthTile}`}>
            <p>SYSTEM HEALTH</p>
            <strong>86</strong>
            <span>Good</span>
          </article>
        </HeroEditableTile>

        <HeroEditableTile
          id="flow"
          label="POPULATION FLOW"
          layout={dashboardLayouts.flow}
          editMode={editMode}
          onChange={updateDashboardLayout}
        >
          <PopulationFlowTile disabled={editMode} />
        </HeroEditableTile>
      </div>
    </div>
  );
}
