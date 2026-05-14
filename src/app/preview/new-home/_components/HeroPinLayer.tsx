import HeroPin from './HeroPin';
import { heroPins } from './heroPins';
import styles from '../_design/design-system.module.css';

type HeroPinLayerProps = {
  isInteractive: boolean;
};

export default function HeroPinLayer({ isInteractive }: HeroPinLayerProps) {
  return (
    <div className={`${styles.heroPinSystem} ${isInteractive ? styles.heroPinsVisible : ''}`}>
      <div className={styles.heroPinLayer} aria-hidden={!isInteractive}>
        {heroPins.map((pin) => (
          <HeroPin key={pin.id} pin={pin} isInteractive={isInteractive} />
        ))}
      </div>

      <nav className={styles.heroPinFallback} aria-label="Hero links" aria-hidden={!isInteractive}>
        {heroPins.map((pin) => (
          <a key={pin.id} href={pin.href} tabIndex={isInteractive ? 0 : -1}>
            {pin.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
