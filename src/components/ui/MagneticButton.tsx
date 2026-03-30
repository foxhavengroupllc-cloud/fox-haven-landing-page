'use client';

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import useMagneticHover from '@/hooks/useMagneticHover';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
}

export default function MagneticButton({ children, strength = 0.35, className, ...props }: MagneticButtonProps) {
  const magneticRef = useMagneticHover<HTMLButtonElement>({ strength, maxTranslate: 10 });

  return (
    <button ref={magneticRef} className={className} {...props}>
      {children}
    </button>
  );
}
