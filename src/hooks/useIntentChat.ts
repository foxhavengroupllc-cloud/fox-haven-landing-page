'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message, WidgetState, IntentResponse, Action } from '@/lib/intent-types';
import { isEmergencyIntent } from '@/lib/intent-config';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function scrollToTarget(target: string): void {
  const el = document.querySelector(target);
  if (!el) return;
  const offset = 80;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export function useIntentChat() {
  const [state, setState] = useState<WidgetState>({
    isOpen: false,
    isEmergency: false,
    messages: [],
    isLoading: false,
    error: null,
  });

  const abortRef = useRef<AbortController | null>(null);
  // Store messages in ref to avoid stale closure in the event listener
  const messagesRef = useRef<Message[]>([]);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    messagesRef.current = state.messages;
    isLoadingRef.current = state.isLoading;
  }, [state.messages, state.isLoading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoadingRef.current) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    const isEmergency = isEmergencyIntent(text);

    setState((s) => ({
      ...s,
      messages: [...s.messages, userMessage],
      isLoading: true,
      isEmergency: isEmergency || s.isEmergency,
      error: null,
    }));

    const history = messagesRef.current.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
        signal: AbortSignal.timeout(15_000),
      });

      if (!res.ok && res.status !== 200) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: IntentResponse = await res.json();

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.response,
        actions: data.actions,
        classification: data.classification,
        timestamp: new Date(),
      };

      setState((s) => ({
        ...s,
        messages: [...s.messages, assistantMessage],
        isLoading: false,
        isEmergency: data.classification === 'emergency' || s.isEmergency,
        error: null,
      }));
    } catch (err) {
      const isAbort =
        err instanceof Error &&
        (err.name === 'AbortError' || err.name === 'TimeoutError');

      if (!isAbort) {
        const fallback: Message = {
          id: generateId(),
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. You can scroll down to explore our initiatives or reach out directly.",
          actions: [
            { label: 'See initiatives', scrollTo: '#initiatives' },
            { label: 'Get in touch', scrollTo: '#cta' },
          ],
          timestamp: new Date(),
        };
        setState((s) => ({
          ...s,
          isLoading: false,
          error: 'Connection issue, please try again.',
          messages: [...s.messages, fallback],
        }));
      } else {
        setState((s) => ({ ...s, isLoading: false }));
      }
    }
  }, []); // stable, uses refs for current values

  // Listen for external open events (e.g., from Hero intent bar)
  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<{ message?: string }>).detail;
      setState((s) => ({ ...s, isOpen: true }));
      if (detail?.message) {
        // Small delay so widget renders before sending
        setTimeout(() => sendMessage(detail.message!), 100);
      }
    }

    window.addEventListener('foxhaven:open-widget', handleOpen);
    return () => window.removeEventListener('foxhaven:open-widget', handleOpen);
  }, [sendMessage]);

  const open = useCallback(() => setState((s) => ({ ...s, isOpen: true })), []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const toggleOpen = useCallback(
    () => setState((s) => ({ ...s, isOpen: !s.isOpen })),
    []
  );
  const resetEmergency = useCallback(
    () => setState((s) => ({ ...s, isEmergency: false })),
    []
  );

  const handleActionClick = useCallback(
    (action: Action) => {
      if (action.scrollTo) {
        scrollToTarget(action.scrollTo);
        close();
      } else if (action.href) {
        close();
        // Internal paths (e.g. /initiatives/heat-relief-app?phase=3) navigate
        // in the same tab; external URLs open in a new tab.
        if (action.href.startsWith('/')) {
          window.location.href = action.href;
        } else {
          window.open(action.href, '_blank', 'noopener,noreferrer');
        }
      }
    },
    [close]
  );

  return {
    state,
    open,
    close,
    toggleOpen,
    sendMessage,
    handleActionClick,
    resetEmergency,
  };
}
