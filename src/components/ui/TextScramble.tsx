'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const SCRAMBLE_CHARS =
  '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  speed?: number;
}

export default function TextScramble({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  speed = 1,
}: TextScrambleProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [displayText, setDisplayText] = useState(text);
  const [resolved, setResolved] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const randomChar = useCallback(() => {
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }, []);

  const runScramble = useCallback(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const chars = text.split('');
    const length = chars.length;

    // Calculate stagger so total duration caps at ~2s
    const baseStagger = 40 / speed;
    const maxDuration = 2000;
    const stagger = Math.min(baseStagger, maxDuration / Math.max(length, 1));

    // Track which characters have resolved
    const resolvedFlags = new Array<boolean>(length).fill(false);
    // Current display buffer
    const buffer = chars.map((ch) => (ch === ' ' ? ' ' : randomChar()));

    // Mark spaces as already resolved
    chars.forEach((ch, i) => {
      if (ch === ' ') resolvedFlags[i] = true;
    });

    // Start the scramble cycling for unresolved characters
    const scrambleInterval = 30 / speed;
    let lastScrambleTime = 0;

    const tick = (time: number) => {
      if (time - lastScrambleTime >= scrambleInterval) {
        lastScrambleTime = time;
        for (let i = 0; i < length; i++) {
          if (!resolvedFlags[i]) {
            buffer[i] = randomChar();
          }
        }
        setDisplayText(buffer.join(''));
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    // Start cycling
    setDisplayText(buffer.join(''));
    frameRef.current = requestAnimationFrame(tick);

    // Schedule each character to resolve left-to-right
    for (let i = 0; i < length; i++) {
      if (chars[i] === ' ') continue;
      const t = setTimeout(() => {
        resolvedFlags[i] = true;
        buffer[i] = chars[i];
        setDisplayText(buffer.join(''));

        // Check if all resolved
        if (resolvedFlags.every(Boolean)) {
          if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
          }
          setResolved(true);
        }
      }, i * stagger);
      timeoutsRef.current.push(t);
    }
  }, [text, speed, randomChar]);

  // IntersectionObserver to trigger animation on scroll into view
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setResolved(true);
      return;
    }

    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            observer.disconnect();
            if (delay > 0) {
              const t = setTimeout(runScramble, delay);
              timeoutsRef.current.push(t);
            } else {
              runScramble();
            }
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [prefersReducedMotion, delay, runScramble, text]);

  // Reset if text prop changes
  useEffect(() => {
    hasAnimatedRef.current = false;
    setResolved(false);
    setDisplayText(text);
  }, [text]);

  return (
    <Tag
      ref={elRef}
      className={`${!resolved ? 'font-mono' : ''} ${className}`.trim()}
    >
      {displayText}
    </Tag>
  );
}
