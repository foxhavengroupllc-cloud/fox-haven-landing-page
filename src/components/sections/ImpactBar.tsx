const STATS = [
  { value: '118°F', label: 'Record Phoenix Heat' },
  { value: '50K+', label: 'Residents at Risk Daily' },
  { value: '3', label: 'Active Initiatives' },
  { value: '2024', label: 'Founded' },
  { value: '1 in 3', label: 'Phoenix Days Above 110°F' },
  { value: 'Zero Cost', label: 'Heat Relief Access' },
  { value: 'Real-Time', label: 'Emergency Alerts' },
  { value: 'Family First', label: 'Core Mission' },
  { value: 'National Scale', label: 'Long-Term Vision' },
  { value: 'Open Source', label: 'Community Tools' },
];

const SEPARATOR = '◆';

export default function ImpactBar() {
  return (
    <div id="impact" className="bg-deep-slate border-y border-white/8 overflow-hidden py-3.5">
      <div className="flex ticker-track" aria-hidden="true">
        {/* Duplicated for seamless loop */}
        {[...STATS, ...STATS].map((stat, i) => (
          <span key={i} className="ticker-item">
            <span className="font-display text-heat-amber text-base">{stat.value}</span>
            <span className="font-body text-white/35 text-[11px] font-medium tracking-widest uppercase">
              {stat.label}
            </span>
            <span className="text-heat-amber/25 text-xs">{SEPARATOR}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
