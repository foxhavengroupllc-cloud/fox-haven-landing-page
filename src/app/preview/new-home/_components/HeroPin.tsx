import type { CSSProperties } from 'react';
import type { HeroPin as HeroPinConfig } from './heroPins';
import styles from '../_design/design-system.module.css';

type HeroPinProps = {
  pin: HeroPinConfig;
  isInteractive: boolean;
};

type PinStyle = CSSProperties & {
  '--pin-x': string;
  '--pin-y': string;
  '--pin-tablet-x': string;
  '--pin-tablet-y': string;
  '--pin-mobile-x': string;
  '--pin-mobile-y': string;
};

export default function HeroPin({ pin, isInteractive }: HeroPinProps) {
  const style: PinStyle = {
    '--pin-x': pin.desktop.x,
    '--pin-y': pin.desktop.y,
    '--pin-tablet-x': pin.tablet.x,
    '--pin-tablet-y': pin.tablet.y,
    '--pin-mobile-x': pin.mobile.x,
    '--pin-mobile-y': pin.mobile.y,
  };

  return (
    <a
      aria-label={pin.label}
      className={styles.heroPin}
      href={pin.href}
      style={style}
      tabIndex={isInteractive ? 0 : -1}
    >
      <span className={styles.heroPinDot} aria-hidden="true" />
      <span className={styles.heroPinLabel}>{pin.label}</span>
    </a>
  );
}
