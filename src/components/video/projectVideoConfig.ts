/**
 * projectVideoConfig.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Per-project teaser video configuration for the Foxhaven landing page.
 *
 * HOW TO ADD A REAL VIDEO:
 *   1. Produce a short teaser clip — ideally 15–45s, muted-safe, loopable.
 *   2. Encode as H.264 MP4 (broad compatibility) + WebM VP9 (optional, smaller).
 *   3. Upload to a CDN (Cloudinary, Vercel Blob, Bunny.net, etc.).
 *   4. Set `teaserSrc` to the CDN URL below for the relevant project.
 *   5. Optionally set `posterSrc` to a CDN-hosted thumbnail image URL.
 *
 * TARGET SPECS (teaser clips):
 *   - Duration: 15–45 seconds (loopable)
 *   - Resolution: 1280×960 (4:3) or 1920×1440
 *   - File size: < 6 MB (aim for 2–4 MB with H.264)
 *   - No audio required — all clips play muted
 *
 * The component degrades gracefully: when `teaserSrc` is null, it shows
 * the illustrated SVG visual with a subtle play icon that links to the
 * initiative's experience page.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ProjectVideoConfig {
  id: string;

  /**
   * Short loop teaser video URL (MP4 recommended).
   * null = poster-only mode — the illustrated visual is shown with a play CTA.
   *
   * Example:
   *   teaserSrc: 'https://cdn.foxhaven.org/teasers/shelter-teaser-v1.mp4',
   */
  teaserSrc: string | null;

  /**
   * Optional poster image URL shown before the video loads.
   * If omitted, the illustrated SVG visual is used as the poster.
   * Recommended: a single still frame exported from the teaser at 1–2s.
   */
  posterSrc?: string;

  /**
   * Optional full-length video URL for expanded playback.
   * Reserved for future modal/lightbox expansion. Leave null for now.
   */
  fullSrc?: string;

  /** Aspect ratio of the player container. Matches existing visual illustrations. */
  aspectRatio: '4/3' | '16/9';

  /** CTA label displayed in the play button tooltip / accessibility label. */
  ctaLabel: string;

  /** Navigation target when the play button is clicked (experience page or external URL). */
  ctaHref: string;

  /** Set true if ctaHref is an external URL (opens in new tab). */
  ctaExternal?: boolean;

  /** Project accent hex color — used for subtle glow/highlight on the play button. */
  accentHex: string;
}

export const PROJECT_VIDEOS: Record<string, ProjectVideoConfig> = {

  // ── Solar Heat Relief Shelters ─────────────────────────────────────────────
  // Video tone: dramatic heat contrast, operational humanity, future-facing.
  'heat-relief-shelters': {
    id: 'heat-relief-shelters',
    teaserSrc: null,
    // teaserSrc: 'https://cdn.foxhaven.org/teasers/shelter-teaser.mp4',
    // posterSrc: 'https://cdn.foxhaven.org/posters/shelter-poster.jpg',
    aspectRatio: '4/3',
    ctaLabel: 'Experience the shelter',
    ctaHref: '/initiatives/solar-shelter',
    accentHex: '#E8821A',
  },

  // ── Heat Relief App ────────────────────────────────────────────────────────
  // Video tone: urgency, navigation, live map, practical public-health utility.
  'heat-relief-app': {
    id: 'heat-relief-app',
    teaserSrc: null,
    // teaserSrc: 'https://cdn.foxhaven.org/teasers/heat-app-teaser.mp4',
    // posterSrc: 'https://cdn.foxhaven.org/posters/heat-app-poster.jpg',
    aspectRatio: '4/3',
    ctaLabel: 'Experience the app',
    ctaHref: '/initiatives/heat-relief-app',
    accentHex: '#1A6B9A',
  },

  // ── Balm / Family Hub ──────────────────────────────────────────────────────
  // Video tone: calm orchestration, clarity replacing overload, polished product.
  'family-hub': {
    id: 'family-hub',
    teaserSrc: null,
    // teaserSrc: 'https://cdn.foxhaven.org/teasers/balm-teaser.mp4',
    // posterSrc: 'https://cdn.foxhaven.org/posters/balm-poster.jpg',
    aspectRatio: '4/3',
    ctaLabel: 'Try Balm free',
    ctaHref: 'https://balm-puyebvbqba-uc.a.run.app/signup',
    ctaExternal: true,
    accentHex: '#22d3ee',
  },

};
