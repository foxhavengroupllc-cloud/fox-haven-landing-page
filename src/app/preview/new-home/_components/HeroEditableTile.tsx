'use client';

import type { PointerEvent, ReactNode } from 'react';
import styles from '../_design/design-system.module.css';

export type TileLayout = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type HeroEditableTileProps = {
  id: string;
  label: string;
  layout: TileLayout;
  editMode: boolean;
  children: ReactNode;
  onChange: (id: string, layout: TileLayout) => void;
};

const minLayout = {
  w: 12,
  h: 9,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function HeroEditableTile({
  id,
  label,
  layout,
  editMode,
  children,
  onChange,
}: HeroEditableTileProps) {
  function startMove(event: PointerEvent<HTMLDivElement>) {
    if (!editMode || event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest('[data-resize-handle="true"]')) return;

    const parent = event.currentTarget.parentElement;
    if (!parent) return;

    event.preventDefault();

    const tileElement = event.currentTarget;
    tileElement.setPointerCapture(event.pointerId);

    const bounds = parent.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startLayout = { ...layout };

    function move(pointerEvent: globalThis.PointerEvent) {
      const dx = ((pointerEvent.clientX - startX) / bounds.width) * 100;
      const dy = ((pointerEvent.clientY - startY) / bounds.height) * 100;
      onChange(id, {
        ...startLayout,
        x: clamp(startLayout.x + dx, 0, 100 - startLayout.w),
        y: clamp(startLayout.y + dy, 0, 100 - startLayout.h),
      });
    }

    function stop(pointerEvent: globalThis.PointerEvent) {
      if (tileElement.hasPointerCapture(pointerEvent.pointerId)) {
        tileElement.releasePointerCapture(pointerEvent.pointerId);
      }
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop, { once: true });
    window.addEventListener('pointercancel', stop, { once: true });
  }

  function startResize(event: PointerEvent<HTMLButtonElement>) {
    if (!editMode || event.button !== 0) return;

    const parent = event.currentTarget.closest(`.${styles.heroDashboard}`) as HTMLElement | null;
    if (!parent) return;

    event.preventDefault();

    const handleElement = event.currentTarget;
    handleElement.setPointerCapture(event.pointerId);

    const bounds = parent.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startLayout = { ...layout };

    function move(pointerEvent: globalThis.PointerEvent) {
      const dw = ((pointerEvent.clientX - startX) / bounds.width) * 100;
      const dh = ((pointerEvent.clientY - startY) / bounds.height) * 100;
      onChange(id, {
        ...startLayout,
        w: clamp(startLayout.w + dw, minLayout.w, 100 - startLayout.x),
        h: clamp(startLayout.h + dh, minLayout.h, 100 - startLayout.y),
      });
    }

    function stop(pointerEvent: globalThis.PointerEvent) {
      if (handleElement.hasPointerCapture(pointerEvent.pointerId)) {
        handleElement.releasePointerCapture(pointerEvent.pointerId);
      }
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop, { once: true });
    window.addEventListener('pointercancel', stop, { once: true });
  }

  return (
    <div
      className={`${styles.editableTile} ${editMode ? styles.editableTileActive : ''}`}
      style={{
        left: `${layout.x}%`,
        top: `${layout.y}%`,
        width: `${layout.w}%`,
        height: `${layout.h}%`,
      }}
      onPointerDown={startMove}
    >
      {children}
      {editMode ? (
        <>
          <span className={styles.editableTileLabel}>{label}</span>
          <button
            className={styles.resizeHandle}
            type="button"
            aria-label={`Resize ${label}`}
            data-resize-handle="true"
            onPointerDown={startResize}
          />
        </>
      ) : null}
    </div>
  );
}
