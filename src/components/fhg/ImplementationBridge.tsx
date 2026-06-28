import type { LucideIcon } from 'lucide-react';
import { Search, Users, PenTool, Wrench, Activity, RefreshCw } from 'lucide-react';
import styles from '@/styles/fhg.module.css';

export type BridgeStep = {
  num: string;
  title: string;
  short: string;
  long: string;
  Icon: LucideIcon;
};

/** The Implementation Bridge™ — six steps. Shared by Home (compact) and Method (detail). */
export const bridgeSteps: BridgeStep[] = [
  {
    num: '01',
    title: 'Clarify',
    short: 'Surface the problem, define success, and align on goals.',
    long: 'Before a team can implement well, everyone needs to agree on what is being implemented, why it matters, who it serves, and what success looks like.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'Engage',
    short: 'Build trust and co-design with those most affected.',
    long: 'This is where we build trust. Implementation fails when the people expected to carry the work were not meaningfully involved in shaping it.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Design',
    short: 'Translate evidence into context-informed, actionable strategies.',
    long: 'This is where evidence becomes a workplan. We translate research, policy, and best practice into strategies built for real-world local conditions.',
    Icon: PenTool,
  },
  {
    num: '04',
    title: 'Prepare',
    short: 'Strengthen capacity, infrastructure, governance, and conditions.',
    long: 'By building readiness we ensure that good plans are able to hold. Here we strengthen the conditions that support successful implementation: capacity, governance, roles, data infrastructure, funding alignment, and the workgroup model that carries the work.',
    Icon: Wrench,
  },
  {
    num: '05',
    title: 'Implement',
    short: 'Put strategies into action with fidelity, adaptation, and support.',
    long: 'Put strategies into motion! This includes coaching, technical assistance, troubleshooting, adaptation logs, and fidelity support.',
    Icon: Activity,
  },
  {
    num: '06',
    title: 'Learn & Adapt',
    short: 'Evaluate, learn, refine, and iterate for sustained impact.',
    long: 'Build the learning system that turns activity into insight so impact compounds long after the engagement ends. We help teams adapt without abandoning the core components that make a strategy work.',
    Icon: RefreshCw,
  },
];

/** Compact six-across band used on the homepage. */
export default function ImplementationBridge() {
  return (
    <div className={styles.bridge}>
      {bridgeSteps.map(({ num, title, short, Icon }) => (
        <article className={styles.bridgeStep} key={num}>
          <span className={styles.bridgeNum}>{num}</span>
          <span className={styles.bridgeIcon}>
            <Icon size={20} strokeWidth={1.5} />
          </span>
          <h3>{title}</h3>
          <p>{short}</p>
        </article>
      ))}
    </div>
  );
}
