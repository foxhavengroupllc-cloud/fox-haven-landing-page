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
    long: 'Surface the real problem beneath the symptoms, define what success looks like in measurable terms, and align partners on shared goals before a single dollar of effort is spent in the wrong direction.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'Engage',
    short: 'Build trust and co-design with those most affected.',
    long: 'Build the trust that implementation runs on. We map stakeholders, convene the right people, and co-design with those closest to the work — because strategy imposed from outside rarely survives the field.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Design',
    short: 'Translate evidence into context-informed, actionable strategies.',
    long: 'Translate research, policy, and best practice into strategies built for real-world conditions — context-informed, sequenced, and concrete enough to act on Monday morning.',
    Icon: PenTool,
  },
  {
    num: '04',
    title: 'Prepare',
    short: 'Strengthen capacity, infrastructure, governance, and conditions.',
    long: 'Strengthen the enabling conditions that determine whether good plans hold: capacity, governance, roles, data infrastructure, funding alignment, and the workgroup model that carries the work.',
    Icon: Wrench,
  },
  {
    num: '05',
    title: 'Implement',
    short: 'Put strategies into action with fidelity, adaptation, and support.',
    long: 'Put strategies into motion with fidelity to what works and the flexibility to adapt to what is actually happening — backed by coaching, technical assistance, and hands-on troubleshooting.',
    Icon: Activity,
  },
  {
    num: '06',
    title: 'Learn & Adapt',
    short: 'Evaluate, learn, refine, and iterate for sustained impact.',
    long: 'Build the learning system that turns activity into insight: evaluate what matters, feed findings back into the work, refine, and sustain — so impact compounds long after the engagement ends.',
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
