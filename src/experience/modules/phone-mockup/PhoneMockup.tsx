'use client';
/**
 * PhoneMockup, Reusable smartphone frame component
 *
 * Renders a styled phone outline with status bar and screen area.
 * Content is passed as children and rendered inside the screen.
 *
 * Reusable: contains no project-specific content, colors, or text.
 * Used by: Heat Relief App experience, Family Hub experience.
 */

import React from 'react';

export interface PhoneMockupProps {
  /** Screen content rendered inside the phone frame */
  children: React.ReactNode;
  /** Additional className for the outermost wrapper */
  className?: string;
  /** className applied to the screen area only, use for bg-gradient etc. */
  screenClassName?: string;
  /** Status bar time. Default: "14:22" */
  statusTime?: string;
  /** Optional CSS box-shadow / glow class on the phone shell */
  glowClass?: string;
  /** ARIA label for the phone frame region */
  ariaLabel?: string;
  /** Width of the phone frame in CSS (e.g. "220px"). Default: "200px" */
  width?: string;
}

export function PhoneMockup({
  children,
  className = '',
  screenClassName = '',
  statusTime = '14:22',
  glowClass = '',
  ariaLabel = 'Phone screen preview',
  width = '200px',
}: PhoneMockupProps) {
  return (
    <div
      className={`relative inline-block shrink-0 ${className}`}
      role="img"
      aria-label={ariaLabel}
      style={{ width }}
    >
      {/* Phone shell */}
      <div
        className={`relative bg-slate-900 rounded-[2.2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col ${glowClass}`}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 bg-black/40 shrink-0">
          <span className="text-white text-[9px] font-semibold tabular-nums leading-none">
            {statusTime}
          </span>
          <div className="flex items-center gap-1">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px]" aria-hidden="true">
              {[2, 3, 4, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-white/70 rounded-[1px]"
                  style={{ height: `${h * 2}px` }}
                />
              ))}
            </div>
            {/* Battery */}
            <div
              className="ml-1 relative flex items-center"
              style={{ width: '16px', height: '8px' }}
              aria-hidden="true"
            >
              <div className="w-[14px] h-full border border-white/50 rounded-[2px] overflow-hidden">
                <div className="w-3/4 h-full bg-white/70" />
              </div>
              <div className="absolute -right-[2px] w-[2px] h-[4px] bg-white/50 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Dynamic island */}
        <div className="flex justify-center pb-1 bg-black/40 shrink-0" aria-hidden="true">
          <div className="w-16 h-[14px] bg-black rounded-full" />
        </div>

        {/* Screen area */}
        <div className={`flex-1 overflow-hidden ${screenClassName}`}>
          {children}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2 bg-black/20 shrink-0" aria-hidden="true">
          <div className="w-20 h-[4px] bg-white/25 rounded-full" />
        </div>
      </div>
    </div>
  );
}
