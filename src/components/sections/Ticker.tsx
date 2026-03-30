const ITEMS = [
  '50K+ Residents at Risk Daily',
  '3 Active Initiatives',
  'Phoenix \u00B7 Arizona',
  '1 in 3 Days Above 110\u00B0F',
  'Zero Cost Heat Relief',
  'Real-Time Emergency Alerts',
  'Family First \u00B7 National Scale',
];

function TickerItem({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 whitespace-nowrap px-7 text-xs font-semibold uppercase tracking-[.1em] text-white">
      {text}
      <span className="inline-block h-[3px] w-[3px] rounded-full bg-white/60" />
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="overflow-hidden bg-orange py-[13px]">
      <div
        className="ticker-track"
        style={{ animation: 'ticker 28s linear infinite' }}
        aria-hidden="true"
      >
        {/* Two copies for seamless loop */}
        {ITEMS.map((item, i) => (
          <TickerItem key={`a-${i}`} text={item} />
        ))}
        {ITEMS.map((item, i) => (
          <TickerItem key={`b-${i}`} text={item} />
        ))}
      </div>
    </div>
  );
}
