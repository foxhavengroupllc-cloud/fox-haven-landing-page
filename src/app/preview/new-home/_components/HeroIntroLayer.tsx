import styles from '../_design/design-system.module.css';

type HeroIntroLayerProps = {
  isComplete: boolean;
};

export default function HeroIntroLayer({ isComplete }: HeroIntroLayerProps) {
  return (
    <div className={`${styles.heroIntroLayer} ${isComplete ? styles.heroIntroComplete : ''}`} aria-hidden="true">
      <div className={styles.heroIntroDisc}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.heroIntroCore} />
    </div>
  );
}
