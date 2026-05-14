import Link from 'next/link';
import { Snowflake, Droplets, Truck, Tent } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import ResourceMapLoader from '@/components/resource-nodes/ResourceMapLoader';
import styles from '@/styles/design-system.module.css';
import {
  RESOURCE_NODES,
  RESOURCE_TYPE_META,
  countsByType,
  nodesByType,
  type ResourceNodeType,
} from '@/lib/resource-nodes/locations';

/**
 * /resource-nodes — Phoenix Heat Relief Network resource map
 *
 * Static Phoenix basemap with the resource catalog overlaid as colored
 * pins, plus a per-category list of every node. The Resource Nodes tile
 * in the homepage hero links here.
 *
 * Seed data lives in src/lib/resource-nodes/locations.ts.
 */

const TYPE_ORDER: ResourceNodeType[] = [
  'cooling-center',
  'hydration-station',
  'mobile-unit',
  'shelter',
];

const TYPE_ICONS: Record<ResourceNodeType, LucideIcon> = {
  'cooling-center': Snowflake,
  'hydration-station': Droplets,
  'mobile-unit': Truck,
  shelter: Tent,
};

function StatusPill({ status }: { status: string }) {
  const tone =
    status === 'Open'
      ? 'border-[#9ed8b2]/40 text-[#9ed8b2]'
      : status === 'Roving'
        ? 'border-[#f1a13a]/40 text-[#f1a13a]'
        : status === 'Limited'
          ? 'border-[#fff4df]/24 text-[#fff4df]/72'
          : 'border-[#ff8b6d]/40 text-[#ff8b6d]';
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.12em] ${tone}`}
    >
      {status}
    </span>
  );
}

export default function ResourceNodesPage() {
  const counts = countsByType();
  const total = RESOURCE_NODES.length;

  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="Phoenix Heat Relief Network — Resource Nodes"
        className="relative isolate min-h-screen overflow-hidden bg-[#030711] text-[#f4ede0]"
      >
        {/* Background gradients + grid overlay (matches /population-flow chrome) */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 72% 18%, rgba(255,156,58,0.18), transparent 19rem), radial-gradient(circle at 27% 72%, rgba(244,237,224,0.07), transparent 22rem), linear-gradient(135deg, #07111c 0%, #02060d 58%, #050912 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(244,237,224,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(244,237,224,0.026)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="grid gap-5 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[390px_minmax(0,1fr)] lg:px-10 lg:pt-10">
          {/* ── Left aside: briefing + legend ── */}
          <aside className="relative z-10 rounded-[8px] border border-[#f1a13a]/18 bg-[#04101a]/86 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur">
            <div className="mb-5">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#f1a13a]">
                Phoenix Heat Relief Network
              </p>
              <h1 className="mt-2 font-display text-[2.4rem] font-light leading-[0.94] text-[#fff4df]">
                Resource Nodes
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#f4ede0]/62">
                Every cooling center, hydration station, mobile unit, and overnight shelter
                the Heat Relief App routes residents to — mapped to where it actually is in
                the metro.
              </p>
            </div>

            {/* Legend */}
            <div className="rounded-[8px] border border-[#f4ede0]/10 bg-[#02070d]/66 p-4">
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#fff4df]/56">
                Legend · {total} nodes mapped
              </p>
              <ul className="mt-3 grid gap-2">
                {TYPE_ORDER.map((type) => {
                  const meta = RESOURCE_TYPE_META[type];
                  const Icon = TYPE_ICONS[type];
                  return (
                    <li
                      key={type}
                      className="flex items-center justify-between gap-3 rounded-[6px] border border-[#f4ede0]/8 bg-[#02070d]/44 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border"
                          style={{
                            borderColor: meta.color,
                            color: meta.color,
                            backgroundColor: 'rgba(2,7,13,0.65)',
                          }}
                        >
                          <Icon size={13} strokeWidth={2.2} />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-[#fff4df]/82">
                            {meta.label}
                          </p>
                          <p className="font-mono text-[0.56rem] uppercase tracking-[0.1em] text-[#f4ede0]/48">
                            {counts[type]} active
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-mono text-[0.78rem] font-bold"
                        style={{ color: meta.color }}
                      >
                        {String(counts[type]).padStart(2, '0')}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Source provenance */}
            <div className="mt-4 rounded-[8px] border border-[#f1a13a]/18 bg-[#07111c]/68 p-3">
              <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[#f1a13a]">
                Data provenance
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/56">
                Seed locations cross-referenced from MAG Heat Relief Network, Phoenix Open
                Data, and Fox Haven partner outreach. Live status integration with the
                operator app is in pilot — until that lands, status fields reflect the
                published schedule.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/initiatives/heat-relief-app"
              >
                See the app it powers <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#f1a13a]/40 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/partner"
              >
                Add a partner site <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>

          {/* ── Main: map + per-type lists ── */}
          <div className="relative z-10 grid gap-5">
            {/* Map */}
            <div className="relative overflow-hidden rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/62 shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 border-b border-[#f1a13a]/14 bg-[#02070d]/80 px-4 py-3 backdrop-blur">
                <div>
                  <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.16em] text-[#f1a13a]">
                    Phoenix Metro · Resource Map
                  </p>
                  <p className="mt-1 text-[0.68rem] text-[#f4ede0]/54">
                    {total} nodes plotted · scheduled status · refreshed nightly
                  </p>
                </div>
                <span className="rounded-full border border-[#f1a13a]/30 px-2.5 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                  Pilot dataset
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full">
                <ResourceMapLoader />
              </div>
            </div>

            {/* Per-type cards strip */}
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {TYPE_ORDER.map((type) => {
                const meta = RESOURCE_TYPE_META[type];
                const Icon = TYPE_ICONS[type];
                const list = nodesByType(type);
                return (
                  <article
                    key={type}
                    className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/56 p-4"
                  >
                    <header className="mb-3 flex items-center justify-between gap-2">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full border"
                        style={{ borderColor: meta.color, color: meta.color }}
                      >
                        <Icon size={16} strokeWidth={2.2} />
                      </span>
                      <span
                        className="font-mono text-[1.4rem] font-bold leading-none"
                        style={{ color: meta.color }}
                      >
                        {String(counts[type]).padStart(2, '0')}
                      </span>
                    </header>
                    <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                      {meta.label}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                      {meta.description}
                    </p>
                    <ul className="mt-3 grid gap-2 border-t border-[#f4ede0]/8 pt-3">
                      {list.map((node) => (
                        <li
                          key={node.id}
                          className="flex items-center justify-between gap-2 text-[0.72rem]"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[#fff4df]/82">{node.name}</p>
                            <p className="font-mono text-[0.56rem] uppercase tracking-[0.1em] text-[#f4ede0]/46">
                              {node.district} · {node.hours}
                            </p>
                          </div>
                          <StatusPill status={node.status} />
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            {/* CTA strip */}
            <section className="grid gap-3 rounded-[8px] border border-[#f1a13a]/20 bg-[#04101a]/74 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                  Run a site that belongs on this map?
                </p>
                <h2 className="mt-2 font-display text-[1.5rem] font-light leading-tight text-[#fff4df]">
                  Add your cooling center, hydration station, or shelter.
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#f4ede0]/56">
                  We onboard partner sites in batches every two weeks. Faster during active
                  heat operations.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#fff4df] shadow-[0_12px_28px_rgba(241,107,29,0.32)]"
                  href="/partner"
                >
                  Partner with us <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="inline-flex items-center gap-2 rounded-full border border-[#f1a13a]/40 px-4 py-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                  href="/contact"
                >
                  Ask a question <span aria-hidden="true">→</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
