/**
 * In-memory session event store.
 *
 * Collects all interaction events for the current browser session.
 * Events are lost on page reload, this is intentional for a session-scoped store.
 *
 * For persistent analytics, forward events to a real provider via the integration
 * point in utils/analytics.ts (emitSceneEvent). The store is for local reporting
 * and the development console only.
 *
 * Development: window.__foxhavenAnalytics.getEvents() returns the full log.
 */

import type { InteractionEvent, PhaseEventPayload, CtaEventPayload } from './interactionEvents';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StoredEvent {
  id: string;
  timestamp: number;
  event: InteractionEvent;
  payload: PhaseEventPayload | CtaEventPayload;
}

// ─── Store ────────────────────────────────────────────────────────────────────

let _events: StoredEvent[] = [];
let _counter = 0;

export function storeEvent(
  event: InteractionEvent,
  payload: PhaseEventPayload | CtaEventPayload
): void {
  const stored: StoredEvent = {
    id: `evt_${++_counter}`,
    timestamp: Date.now(),
    event,
    payload,
  };
  _events.push(stored);

  if (process.env.NODE_ENV === 'development') {
    console.debug(
      `%c[interaction-analytics] ${event}`,
      'color: #a855f7; font-weight: bold',
      payload
    );
  }
}

export function getEvents(): readonly StoredEvent[] {
  return _events;
}

export function resetStore(): void {
  _events = [];
  _counter = 0;
}

// ─── Dev console exposure ─────────────────────────────────────────────────────
// Accessible in browser DevTools: window.__foxhavenAnalytics.getEvents()

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as unknown as Record<string, unknown>).__foxhavenAnalytics = {
    getEvents,
    resetStore,
  };
}
