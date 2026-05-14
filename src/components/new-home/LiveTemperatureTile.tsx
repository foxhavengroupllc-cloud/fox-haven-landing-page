'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/design-system.module.css';
import useReducedMotion from './useReducedMotion';

const REFRESH_MS = 300_000;
const ROTATE_MS = 3600;

type WeatherPayload = {
  temp: number;
  feelsLike: number;
  heatRisk: 'EXTREME' | 'DANGEROUS' | 'HIGH' | 'MODERATE' | 'NORMAL';
  humidity: number | null;
  uvIndex: number | null;
  uvRisk: string | null;
  sunset: string | null;
  airQualityIndex: number | null;
  airQualityLabel: string | null;
  location: string;
  updatedAt: string;
};

const riskLabels: Record<WeatherPayload['heatRisk'], string> = {
  EXTREME: 'Extreme Risk',
  DANGEROUS: 'Dangerous',
  HIGH: 'High Risk',
  MODERATE: 'Moderate',
  NORMAL: 'Normal',
};

function getDisplayTemp(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : null;
}

function clampProgress(value: number | null, max: number) {
  if (value === null) return 0.18;
  return Math.min(1, Math.max(0.08, value / max));
}

export default function LiveTemperatureTile() {
  const [weather, setWeather] = useState<WeatherPayload | null>(null);
  const [hasError, setHasError] = useState(false);
  const [metricIndex, setMetricIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    async function loadWeather() {
      try {
        const response = await fetch('/api/weather', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Weather ${response.status}`);
        }

        const payload = (await response.json()) as WeatherPayload;
        if (active) {
          setWeather(payload);
          setHasError(false);
        }
      } catch {
        if (active) {
          setHasError(true);
        }
      }
    }

    void loadWeather();
    const interval = window.setInterval(() => {
      void loadWeather();
    }, REFRESH_MS);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const temp = getDisplayTemp(weather?.temp);
  const riskText = useMemo(() => {
    if (!weather) return hasError ? 'UNKNOWN' : 'Loading';
    return riskLabels[weather.heatRisk] ?? 'UNKNOWN';
  }, [hasError, weather]);

  const conditionMetrics = useMemo(() => {
    const aqi = weather?.airQualityIndex ?? null;
    const uvIndex = weather?.uvIndex ?? null;
    const humidity = weather?.humidity ?? null;

    return [
      {
        label: 'Air Quality',
        value: aqi === null ? 'AQI --' : `AQI ${aqi}`,
        detail: weather?.airQualityLabel ?? (hasError ? 'Unavailable' : 'Updating'),
        progress: clampProgress(aqi, 150),
      },
      {
        label: 'UV Index',
        value: uvIndex === null ? '--' : String(uvIndex),
        detail: weather?.uvRisk ?? (hasError ? 'Unavailable' : 'Updating'),
        progress: clampProgress(uvIndex, 11),
      },
      {
        label: 'Humidity',
        value: humidity === null ? '--%' : `${humidity}%`,
        detail: 'Relative humidity',
        progress: clampProgress(humidity, 100),
      },
      {
        label: 'Sunset',
        value: weather?.sunset ?? '--:--',
        detail: 'Phoenix local time',
        progress: 0.74,
      },
    ];
  }, [hasError, weather]);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setMetricIndex((index) => (index + 1) % conditionMetrics.length);
    }, ROTATE_MS);

    return () => window.clearInterval(interval);
  }, [conditionMetrics.length, reducedMotion]);

  const activeMetric = conditionMetrics[metricIndex % conditionMetrics.length];
  const metricStyle = {
    '--metric-progress': `${Math.round(activeMetric.progress * 100)}%`,
  } as CSSProperties;

  return (
    <div className={styles.liveHeatTile} aria-live="polite">
      <p>HEAT RISK</p>
      <span>Current Temp</span>
      <strong>
        {temp ?? 'UNKNOWN'}
        {temp !== null ? <small>&deg;F</small> : null}
      </strong>
      <em>{riskText}</em>
      <div className={styles.liveConditionTracker} style={metricStyle}>
        <div className={styles.liveMetricDial} aria-hidden="true">
          <span />
        </div>
        <div className={styles.liveMetricCopy}>
          <span>{activeMetric.label}</span>
          <strong>{activeMetric.value}</strong>
          <small>{activeMetric.detail}</small>
        </div>
        <div className={styles.liveMetricRail} aria-hidden="true">
          <span />
        </div>
        <div className={styles.liveMetricDots} aria-hidden="true">
          {conditionMetrics.map((metric, index) => (
            <span
              className={index === metricIndex % conditionMetrics.length ? styles.liveMetricDotActive : undefined}
              key={metric.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
